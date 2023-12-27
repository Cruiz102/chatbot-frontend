import { WeaviateSchemaDetails, WeaviateProperty, WeaviateDataType } from '@/types/weaviate';
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
    const body: GetWeaviateCollectionRequestProps = req.body;
    const url = body.url;
    const key = body.key;

    const weaviateURL = `${url}/v1/schema`;

    const response = await fetch(weaviateURL, {
      headers: {
        'Authorization': `Bearer ${key}`,
      },
    });

    if (response.status === 401) {
      return res.status(500).json({ error: 'Unauthorized' });
    } else if (response.status !== 200) {
      const errorText = await response.text();
      console.error(`Weaviate API returned an error ${response.status}: ${errorText}`);
      return res.status(500).json({ error: 'Weaviate API returned an error' });
    }

    const json = await response.json();
    console.log(json)

    const weaviateSchemas: WeaviateSchemaDetails[] = json.classes.map((cls: any) => {
      return {
        class: cls.class,
        description: cls.description,
        properties: cls.properties.map((prop: any) => {
          return {
            dataType: mapDataType(prop.dataType[0]),
            description: prop.description,
            name: prop.name
          } as WeaviateProperty;
        }),
        vectorizer: cls.vectorizer,
      };
    });
    return res.status(200).json(weaviateSchemas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error', details: error});
    
  }
};

export default handler;
