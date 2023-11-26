// interfaces/UploadPDFRequest.ts
export interface UploadPDFRequest {
    url: string;
    weaviateApiKey: string;
    openaiApiKey: string;
    className: string;
    file: File;
  }
  
  export interface CreateClassRequest {
    url: string;
    weaviateApiKey: string;
    openaiApiKey: string;
    className: string;
  }
  