import { ChatBody } from './chat';

export interface WeaviateBody extends ChatBody {
  weaviateURL: string;
  weaviateAPI: string;
  className: string;
  limit: number;
  offset: number ;
  distanceThreshhold: number;
  similarity: number;
  QueryType: 'GET' | 'AGGRETATE';
  properties: WeaviateProperty [];

}


export interface WeaviateWhereFilter {
  operator: 'LIKE' |'AND' | 'OR'
  valueText: string;
  valueDate: string;
  valueBoolean: boolean;
  path: string[];


}

export enum WeaviateVectorizer {
  OpenAI = 'openai',
  COHERE = 'cohere',  
  TEXT2VEC_AWS = 'text2vec-aws',
  


}

export enum WeaviateDataType {
  TEXT = "text",
  TEXT_ARRAY = "text[]",
  OBJECT = "object",
  OBJECT_ARRAY = "object[]",
  INT = "int",
  INT_ARRAY = "int[]",
  BOOLEAN = "boolean",
  BOOLEAN_ARRAY = "boolean[]",
  NUMBER = "number",
  NUMBER_ARRAY = "number[]",
  DATE = "date",
  DATE_ARRAY = "date[]",
  UUID = "uuid",
  UUID_ARRAY = "uuid[]",
  GEO_COORDINATES = "geoCoordinates",
  PHONE_NUMBER = "phoneNumber",
  BLOB = "blob"
}


export interface WeaviateProperty {
  dataType: WeaviateDataType;
  description: string;
  name: string;
}

export interface WeaviateSchemaDetails {
  class: string;
  description: string;
  properties: WeaviateProperty[];
  vectorizer: string;
}

// If no Scheme is porportinoned this are the 
// default properties.
const defaultProperties = [
    {
        name: "document",
        dataType: WeaviateDataType.TEXT,
        description: "Name of the document",
    },
    {
      name: 'text',
      dataType: WeaviateDataType.TEXT,
      description: "Content of the Chunk",
    },
    {
      name: 'page',
      dataType: WeaviateDataType.INT,
      description: "Page of the document where is the chunk",
    },
]
