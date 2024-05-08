// types/databaseItem.ts
import { KeyValuePair } from "./data";
import { WeaviateDataType, WeaviateSchemaDetails } from "./weaviate";


export enum DatabasesID {
  WEAVIATE = 'weaviate',
  // GOOGLE_DRIVE = 'google_drive',
  // ONE_DRIVE = 'one_drive',
  // NOTION = 'notion', 
  // PINECONE = 'pinecone'
}

export enum DatabaseName{
  WEAVIATE = "Weaviate Database",
  GOOGLE_DRIVE= "Google Drive",
  ONE_DRIVE= "One Drive",
  NOTION= "Notion",
  PINECONE= "Pinecone",
  NoneDatabase = "None"

}

type AcceptedFileTypes =   | "json" | "txt";



export interface Database {
  id: DatabasesID;
  name: DatabaseName;
  DatabaseClass: WeaviateSchemaDetails; // Add a union of more types in here for future databases.
}





export const Databases: Record<DatabasesID, Database> = {
  [DatabasesID.WEAVIATE]: {
    id: DatabasesID.WEAVIATE,
    name: DatabaseName.WEAVIATE,
    DatabaseClass: {
      class: "",
      description: "",
      vectorizer: "",
      properties: [{
        dataType: WeaviateDataType.TEXT,
        description: "",
        name: ""
      }
      ],
    }
  },
};


export const DatabasesList = Object.values(Databases);