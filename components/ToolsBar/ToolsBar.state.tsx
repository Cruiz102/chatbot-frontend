import { Prompt } from '@/types/prompt';

export interface ToolsInitialState {
  searchTerm: string;
  filteredPrompts: Prompt[];
}

export const initialState: ToolsbarInitialState = {
  searchTerm: '',
  filteredPrompts: [],
};
