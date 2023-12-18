import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateReducer } from '@/hooks/useCreateReducer';

import { savePrompts } from '@/utils/app/prompts';

import { OpenAIModels } from '@/types/openai';
import { Prompt } from '@/types/prompt';

import HomeContext from '@/pages/api/home/home.context';

import { PromptFolders } from './components/PromptTab/PromptFolders';
import { PromptbarSettings } from './components/PromptTab/PromptbarSettings';
import { Prompts } from './components/PromptTab/Prompts';
import PromptsTab from './components/PromptTab/PromptTab';
import Sidebar from '../Sidebar';
import SidebarTabs from '../Sidebar/SidebarTabs';
import TabConfig from '../Sidebar/SidebarTabs';


import DatabaseTab from './components/DatabaseTab/DataBaseTabContent'
import ToolsbarContext from './ToolsBar.context';
import { ToolsInitialState, initialState } from './ToolsBar.state';
import { Databases } from './components/DatabaseTab/Databases';
import { v4 as uuidv4 } from 'uuid';
import { Databaseclasses } from '@/types/databaseItem';

const ToolsbBar = () => {
  const { t } = useTranslation('promptbar');


  // ---------------------------------------------------------
  // ------------PROMPT HANDLERERS----------------------------
  // ---------------------------------------------------------
  const promptBarContextValue = useCreateReducer<ToolsInitialState>({
    initialState,
  });

  const {
    state: { prompts, defaultModelId, showPromptbar,Databaseclasses },
    dispatch: homeDispatch,
    handleCreateFolder,
  } = useContext(HomeContext);

  const {
    state: { searchTerm, filteredPrompts , },
    dispatch: promptDispatch,
  } = promptBarContextValue;

  const handleTogglePromptbar = () => {
    homeDispatch({ field: 'showPromptbar', value: !showPromptbar });
    localStorage.setItem('showPromptbar', JSON.stringify(!showPromptbar));
  };

  const handleCreatePrompt = () => {
    if (defaultModelId) {
      const newPrompt: Prompt = {
        id: uuidv4(),
        name: `Prompt ${prompts.length + 1}`,
        description: '',
        content: '',
        model: OpenAIModels[defaultModelId],
        folderId: null,
      };

      const updatedPrompts = [...prompts, newPrompt];

      homeDispatch({ field: 'prompts', value: updatedPrompts });

      savePrompts(updatedPrompts);
    }
  };

  const handleDeletePrompt = (prompt: Prompt) => {
    const updatedPrompts = prompts.filter((p) => p.id !== prompt.id);

    homeDispatch({ field: 'prompts', value: updatedPrompts });
    savePrompts(updatedPrompts);
  };

  const handleUpdatePrompt = (prompt: Prompt) => {
    const updatedPrompts = prompts.map((p) => {
      if (p.id === prompt.id) {
        return prompt;
      }

      return p;
    });
    homeDispatch({ field: 'prompts', value: updatedPrompts });

    savePrompts(updatedPrompts);
  };

  const handleDrop = (e: any) => {
    if (e.dataTransfer) {
      const prompt = JSON.parse(e.dataTransfer.getData('prompt'));

      const updatedPrompt = {
        ...prompt,
        folderId: e.target.dataset.folderId,
      };

      handleUpdatePrompt(updatedPrompt);

      e.target.style.background = 'none';
    }
  };

  useEffect(() => {
    if (searchTerm) {
      promptDispatch({
        field: 'filteredPrompts',
        value: prompts.filter((prompt) => {
          const searchable =
            prompt.name.toLowerCase() +
            ' ' +
            prompt.description.toLowerCase() +
            ' ' +
            prompt.content.toLowerCase();
          return searchable.includes(searchTerm.toLowerCase());
        }),
      });
    } else {
      promptDispatch({ field: 'filteredPrompts', value: prompts });
    }
  }, [searchTerm, prompts]);



  // ---------------------------------------------------------
  // ------------DATABASE HANDLERERS----------------------------
  // ---------------------------------------------------------

  const [filteredDatabases, setFilteredDatabases] = useState<Databaseclasses[]>([]);
  useEffect(() => {
    // Filter logic
    const newFilteredDatabases = Databaseclasses.filter((databaseItem) => {
      const searchable = databaseItem.name.toLowerCase() + ' ' + databaseItem.name.toLowerCase();
      return searchable.includes(searchTerm.toLowerCase());
    });

    // Update the state
    setFilteredDatabases(newFilteredDatabases);
  }, [searchTerm, Databaseclasses]);





  // ---------------------------------------------------------
  // ------------TABS HANDLERERS----------------------------
  // ---------------------------------------------------------


// Define the configuration for each tab
const tabsConfig = [
  {
    title: 'Chats',
    components: [<PromptsTab 
      addItemButtonTitle={t('New prompt')}
      searchTerm={searchTerm}
      handleSearchTerm={(searchTerm: string) =>
        promptDispatch({ field: 'searchTerm', value: searchTerm })
      }
      handleCreateFolder={() => handleCreateFolder(t('New folder'), 'prompt')}
      handleCreateItem={handleCreatePrompt}
      handleDrop={handleDrop}
      items={filteredPrompts}
      itemComponent={
        <Prompts
          prompts={filteredPrompts.filter((prompt) => !prompt.folderId)}
        />
      }
      folderComponent={<PromptFolders />}
    />], // Array of components for the Chats tab
  },
  {
    title: 'Database',
    components: [<DatabaseTab />], // Array of components for the Database tab
  },
  // ... more tabs ...
];

  return (
    <ToolsbarContext.Provider
      value={{
        ...promptBarContextValue,
        handleCreatePrompt,
        handleDeletePrompt,
        handleUpdatePrompt,
      }}
    >
      <SidebarTabs
        side={'right'}
        isOpen={showPromptbar}
        addItemButtonTitle={t('New prompt')}
        tabs={tabsConfig}
        

        searchTerm={searchTerm}
        handleSearchTerm={(searchTerm: string) =>
          promptDispatch({ field: 'searchTerm', value: searchTerm })
        }
        toggleOpen={handleTogglePromptbar}
        handleCreateItem={handleCreatePrompt}
        handleCreateFolder={() => handleCreateFolder(t('New folder'), 'prompt')}
        handleDrop={handleDrop}
      />
    </ToolsbarContext.Provider>
  );
};

export default ToolsbBar;
