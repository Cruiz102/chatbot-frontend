import { ChatBody, Message } from './chat';

export interface WeaviateBody extends ChatBody {
  weaviateURL: string;
  weaviateAPI: string;
  className: string;
}

export interface WeaviateProperty {
  dataType: string[];
  description: string;
  name: string;
}

export interface WeaviateSchemaDetails {
  class: string;
  description: string;
  properties: WeaviateProperty[];
  vectorizer: string;
}

