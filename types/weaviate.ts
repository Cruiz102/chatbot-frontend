import { ChatBody, Message } from './chat';

export interface WeaviateBody extends ChatBody {
  weaviateURL: string;
  weaviateAPI: string;
  className: string;
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

