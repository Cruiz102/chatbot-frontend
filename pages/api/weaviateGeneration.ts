// This is the local next.js api for handleing the Get requests
//  with GraphQL.


import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
import { OpenAIError, OpenAIStream } from '@/utils/server';

import { ChatBody, Message } from '@/types/chat';

// @ts-expect-error
import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';

import tiktokenModel from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { Tiktoken, init } from '@dqbd/tiktoken/lite/init';

import { WeaviateSchemaDetails, WeaviateProperty, WeaviateDataType, WeaviateBody } from '@/types/weaviate';
import { GetWeaviateCollectionRequestProps } from '@/services/useApiService';
import type { NextApiRequest, NextApiResponse } from 'next';

// Function to map JSON data types to Weaviate data types
const mapDataType = (jsonDataType: string): WeaviateDataType => {
  const dataTypeMapping: { [key: string]: WeaviateDataType } = {
    'text': WeaviateDataType.TEXT,
    'int': WeaviateDataType.INT,
    // Add other mappings as needed
  };
  return dataTypeMapping[jsonDataType] || WeaviateDataType.OBJECT;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body: WeaviateBody = req.body;
    const model = body.model;
    const messages = body.messages;
    const key = body.key;
    const prompt = body.prompt;
    const temperature = body.temperature;
    const weaviateURL = body.weaviateURL;
    const weaviateAPI = body.weaviateAPI;
    const weaviateClass = body.className;


  
    const response = await fetch(weaviateURL, {
      headers: {
        'Authorization': `Bearer ${weaviateAPI}`,
        'X-OpenAI-Api-Key': key
      },
    });

    if (response.status === 401) {
      return res.status(500).json({ error: 'Unauthorized' });
    } else if (response.status !== 200) {
      const errorText = await response.text();
      console.error(`Weaviate API returned an error ${response.status}: ${errorText}`);
      return res.status(500).json({ error: 'Weaviate API returned an error' });
    }


    await init((imports) => WebAssembly.instantiate(wasm, imports));
    const encoding = new Tiktoken(
      tiktokenModel.bpe_ranks,
      tiktokenModel.special_tokens,
      tiktokenModel.pat_str,
    );

    let promptToSend = prompt;
    if (!promptToSend) {
      promptToSend = DEFAULT_SYSTEM_PROMPT;
    }

    let temperatureToUse = temperature;
    if (temperatureToUse == null) {
      temperatureToUse = DEFAULT_TEMPERATURE;
    }

    const prompt_tokens = encoding.encode(promptToSend);

    let tokenCount = prompt_tokens.length;
    let messagesToSend: Message[] = [];

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const tokens = encoding.encode(message.content);

      if (tokenCount + tokens.length + 1000 > model.tokenLimit) {
        break;
      }
      tokenCount += tokens.length;
      messagesToSend = [message, ...messagesToSend];
    }

    encoding.free();

    const stream = await OpenAIStream(model, promptToSend, temperatureToUse, key, messagesToSend );

    return new Response(stream);
  } catch (error) {
    console.error(error);
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler;
