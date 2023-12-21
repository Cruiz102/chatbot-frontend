export interface AIModel {
    id: string;
    name: string;
    maxLength: number; // maximum length of a message
    tokenLimit: number;
    category: 'finetuned' | 'OpenAI' | 'local';
    ApiURL: string

  }
  