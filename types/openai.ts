import { AIModel } from "./llmModel";
export enum OpenAIModelID {
  GPT_3_5 = 'gpt-3.5-turbo',
  GPT_3_5_16k = 'gpt-3.5-turbo-16k',
  GPT_4 = 'gpt-4',
  GPT_4_Turbo_128K = 'gpt-4-1106-preview', 
}

// in case the `DEFAULT_MODEL` environment variable is not set or set to an unsupported model
export const fallbackModelID = OpenAIModelID.GPT_3_5;

export const OpenAIModels: Record<OpenAIModelID, AIModel> = {
  [OpenAIModelID.GPT_3_5]: {
    id: OpenAIModelID.GPT_3_5,
    name: 'GPT-3.5 (4k)',
    maxLength: 12000,
    tokenLimit: 4000,
    category: 'OpenAI',
    ApiURL: ""
  },
  [OpenAIModelID.GPT_3_5_16k]: {
    id: OpenAIModelID.GPT_3_5_16k,
    name: 'GPT-3.5 (16k)',
    maxLength: 12000,
    tokenLimit: 16_000,
    category: "OpenAI",
    ApiURL: ""
  },
  [OpenAIModelID.GPT_4]: {
    id: OpenAIModelID.GPT_4,
    name: 'GPT-4 (8k)',
    maxLength: 24000,
    tokenLimit: 8000,
    category: "OpenAI",
    ApiURL: ""
  },
  [OpenAIModelID.GPT_4_Turbo_128K]: {
    id: OpenAIModelID.GPT_4_Turbo_128K,
    name: 'GPT-4-TURBO (128k)',
    maxLength: 96000,
    tokenLimit: 128_000,
    category: 'OpenAI',
    ApiURL: ""
  },
};
