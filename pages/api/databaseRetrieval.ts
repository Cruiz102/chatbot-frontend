import { WeaviateSchemaDetails, WeaviateProperty, WeaviateDataType} from '@/types/weaviate'; // Adjust the import path as needed

const handler = async (req: Request): Promise<Response> => {
  try {
    const { key, url } = (await req.json()) as {
      key: string;
      url: string;
    };

    const weaviateURL = `${url}/v1/schema`;

    const response = await fetch(weaviateURL, {
      headers: {
        'Authorization': `Bearer ${key}`,
      },
    });

    if (response.status === 401) {
      return new Response(response.body, {
        status: 500,
        headers: response.headers,
      });
    } else if (response.status !== 200) {
      console.error(`Weaviate API returned an error ${response.status}: ${await response.text()}`);
      throw new Error('Weaviate API returned an error');
    }

    const json = await response.json();

    const weaviateSchemas: WeaviateSchemaDetails[] = json.classes.map((cls: any) => {
      return {
        class: cls.class,
        description: cls.description,
        properties: cls.properties.map((prop: any) => {
          return {
            dataType: WeaviateDataType[prop.dataType.toUpperCase().replace(/[\[\]]/g, '') as keyof typeof WeaviateDataType],
            description: prop.description,
            name: prop.name
          } as WeaviateProperty;
        }),
        vectorizer: cls.vectorizer,
      };
    });

    return new Response(JSON.stringify(weaviateSchemas), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
