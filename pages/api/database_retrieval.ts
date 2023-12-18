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