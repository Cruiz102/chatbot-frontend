// types/databaseItem.ts



export enum DatabasesID {
  NO_DATABASE = 'none',
  WEAVIATE = 'weaviate',
  // GOOGLE_DRIVE = 'google_drive',
  // ONE_DRIVE = 'one_drive',
  // NOTION = 'notion', 
}

type AcceptedFileTypes =   | "json" | "txt";



// Add a property to store the file extension
export interface DatabaseItem {
  id: string;
  name: string;
  fileExtension: AcceptedFileTypes; // Add this property to store the file extension
  isDownload: boolean
}

export interface DatabaseFolder {
  name: string;
  items: DatabaseItem[];
}

export interface UploadDocumentRequest {
  name: string,
  status: string,


}