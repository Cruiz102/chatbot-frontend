import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'https',
  host: 'some-endpoint.weaviate.network',  // Replace with your endpoint
});

const response = await client
  .schema
  .getter()
  .do();
console.log(response);




import { PLUGIN_API_HOST, PLUGIN_API_VERSION } from '@/utils/app/const';
import { Plugin, PluginID, Plugins } from '@/types/plugins';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { key } = (await req.json()) as {
      key: string;
    };

    let url = `${PLUGIN_API_HOST}/api/plugins?version=${PLUGIN_API_VERSION}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key ? key : process.env.PLUGIN_API_KEY}`,
      },
    });

    if (response.status === 401) {
      return new Response(response.body, {
        status: 500,
        headers: response.headers,
      });
    } else if (response.status !== 200) {
      console.error(
        `Plugin API returned an error ${
          response.status
        }: ${await response.text()}`,
      );
      throw new Error('Plugin API returned an error');
    }

    const json = await response.json();

    const pluginData: Plugin[] = json.data
      .map((plugin: any) => {
        const pluginId = plugin.id as PluginID;
        if (pluginId in Plugins) {
          return {
            id: plugin.id,
            name: Plugins[pluginId].name,
            requiredKeys: Plugins[pluginId].requiredKeys,
          };
        }
      })
      .filter(Boolean);

    return new Response(JSON.stringify(pluginData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
