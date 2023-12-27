import { Conversation, Message } from '@/types/chat';
import { WeaviateSchemaDetails } from '@/types/weaviate';
import { ErrorMessage } from '@/types/error';
import { FolderInterface } from '@/types/folder';
import { OpenAIModelID } from '@/types/openai';
import { AIModel } from '@/types/llmModel';
import { PluginKey, PluginKeysList } from '@/types/plugin';
import { Prompt } from '@/types/prompt';
import { Database, DatabasesList } from '@/types/database';

export interface HomeInitialState {
  apiKey: string;
  pluginKeys: PluginKey[];
  databases: Database[];
  loading: boolean;
  lightMode: 'light' | 'dark';
  messageIsStreaming: boolean;
  modelError: ErrorMessage | null;
  models: AIModel[];
  folders: FolderInterface[];
  conversations: Conversation[];
  selectedConversation: Conversation | undefined;
  currentMessage: Message | undefined;
  prompts: Prompt[];
  temperature: number;
  showChatbar: boolean;
  showPromptbar: boolean;
  currentFolder: FolderInterface | undefined;
  messageError: boolean;
  searchTerm: string;
  defaultModelId: OpenAIModelID | undefined;
  serverSideApiKeyIsSet: boolean;
  serverSidePluginKeysSet: boolean;
}

export const initialState: HomeInitialState = {
  apiKey: '',
  loading: false,
  pluginKeys: PluginKeysList,
  databases: DatabasesList,
  lightMode: 'dark',
  messageIsStreaming: false,
  modelError: null,
  models: [],
  folders: [],
  conversations: [],
  selectedConversation: undefined,
  currentMessage: undefined,
  prompts: [],
  temperature: 1,
  showPromptbar: true,
  showChatbar: true,
  currentFolder: undefined,
  messageError: false,
  searchTerm: '',
  defaultModelId: undefined,
  serverSideApiKeyIsSet: false,
  serverSidePluginKeysSet: false,
};
