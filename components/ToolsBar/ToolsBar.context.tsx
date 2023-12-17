import { Dispatch, createContext } from 'react';

import { ActionType } from '@/hooks/useCreateReducer';

import { Prompt } from '@/types/prompt';

import { ToolsInitialState } from './ToolsBar.state';

export interface ToolsbarContextProps {
  state: ToolsInitialState;
  dispatch: Dispatch<ActionType<ToolsInitialState>>;
  handleCreatePrompt: () => void;
  handleDeletePrompt: (prompt: Prompt) => void;
  handleUpdatePrompt: (prompt: Prompt) => void;
}

const ToolsbarContext = createContext<ToolsbarContextProps>(undefined!);

export default ToolsbarContext;
