// types/databaseItem.ts


export interface DatabaseItem {
    id: string;
    name: string;
    // other properties as needed, such as connection status, etc.
  }
  

export interface DatabaseClass {
  name: string;
  items: DatabaseItem;
}

  export interface Property {
    dataType: string[];
    description: string;
    name: string;
  }
  
  export interface SchemaDetails {
    class: string;
    description: string;
    properties: Property[];
    vectorizer: string;
  }
  
  