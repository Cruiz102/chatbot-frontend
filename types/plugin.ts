import { KeyValuePair } from './data';

export interface Plugin {
  id: PluginID;
  name: PluginName;
  requiredKeys: KeyValuePair[];
}

export interface PluginKey {
  pluginId: PluginID;
  requiredKeys: KeyValuePair[];
}

export enum PluginID {
  GOOGLE_SEARCH = 'google-search',
  WEAVIATE_SEARCH = 'weaviate-search',  // New enum value for Weaviate
}

export enum PluginName {
  GOOGLE_SEARCH = 'Google Search',
  WEAVIATE_SEARCH = 'Weaviate Search',  // New enum value for Weaviate
}

// New interface for Weaviate credentials
export interface WeaviateCredentials {
  weaviateUrl: string;
  weaviateApiKey: string; 
  className: string; 
}

// New type for Plugin with Weaviate
export type WeaviatePlugin = {
  id: PluginID.WEAVIATE_SEARCH;
  name: PluginName.WEAVIATE_SEARCH;
  credentials: WeaviateCredentials;
};

export const Plugins: Record<PluginID, Plugin> = {
  [PluginID.GOOGLE_SEARCH]: {
    id: PluginID.GOOGLE_SEARCH,
    name: PluginName.GOOGLE_SEARCH,
    requiredKeys: [
      {
        key: 'GOOGLE_API_KEY',
        value: '',
      },
      {
        key: 'GOOGLE_CSE_ID',
        value: '',
      },
    ],
  },
  [PluginID.WEAVIATE_SEARCH]: {  // New entry for Weaviate
    id: PluginID.WEAVIATE_SEARCH,
    name: PluginName.WEAVIATE_SEARCH,
    requiredKeys: [
      {
        key: 'WEAVIATE_URL',
        value: '',
      },
      {
        key: 'WEAVIATE_API_KEY',
        value: '',
      },
      { key: 'CLASS_NAME', 
        value: '' }, 
    ],
  },
};

export const PluginKeys: Record<PluginID, PluginKey> = {
  [PluginID.GOOGLE_SEARCH]: {
    pluginId: PluginID.GOOGLE_SEARCH,
    requiredKeys: [
      {
        key: 'GOOGLE_API_KEY',
        value: '',
      },
      {
        key: 'GOOGLE_CSE_ID',
        value: '',
      },
    ],
  },
  [PluginID.WEAVIATE_SEARCH]: {  // New entry for Weaviate
    pluginId: PluginID.WEAVIATE_SEARCH,
    requiredKeys: [
      {
        key: 'WEAVIATE_URL',
        value: '',
      },
      {
        key: 'WEAVIATE_API_KEY',
        value: '',
      },
      { key: 'CLASS_NAME', 
        value: '' }, 
    ],
  },
};

export const PluginList = Object.values(Plugins);
export const PluginKeysList = Object.values(PluginKeys);
console.log(PluginList)



