import React from 'react';
import { IconFolderPlus, IconMistOff, IconPlus } from '@tabler/icons-react';
import Search from '../../../Search'; // Adjust the import path as necessary
import { Prompt } from '@/types/prompt';
import { useTranslation } from 'react-i18next';
interface PromptsTabProps {
  addItemButtonTitle: string;
  searchTerm: string;
  handleSearchTerm: (term: string) => void;
  handleCreateItem: () => void;
  handleCreateFolder: () => void;
  handleDrop: (e: any) => void;
  items: Prompt[];
  itemComponent: React.ReactNode;
  folderComponent: React.ReactNode;
}

const PromptsTab: React.FC<PromptsTabProps> = ({
  addItemButtonTitle,
  searchTerm,
  handleSearchTerm,
  handleCreateItem,
  handleCreateFolder,
  handleDrop,
  items,
  itemComponent,
  folderComponent
}) => {

  const { t } = useTranslation('promptbar');

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const highlightDrop = (e: any) => {
    e.target.style.background = '#343541';
  };

  const removeHighlight = (e: any) => {
    e.target.style.background = 'none';
  };

  return (
    <div>
      <div className="flex items-center">
        <button
          className="text-sidebar flex w-[190px] flex-shrink-0 cursor-pointer select-none items-center gap-3 rounded-md border border-white/20 p-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
          onClick={() => {
            handleCreateItem();
            handleSearchTerm('');
          }}
        >
          <IconPlus size={16} />
          {addItemButtonTitle}
        </button>

        <button
          className="ml-2 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-white/20 p-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10"
          onClick={handleCreateFolder}
        >
          <IconFolderPlus size={16} />
        </button>
      </div>

      <Search
        placeholder="Search..."
        searchTerm={searchTerm}
        onSearch={handleSearchTerm}
      />


<div className="flex-grow overflow-auto">
          {items?.length > 0 && (
            <div className="flex border-b border-white/20 pb-2">
              {folderComponent}
            </div>
          )}



          {items?.length > 0 ? (
            <div
              className="pt-2"
              onDrop={handleDrop}
              onDragOver={allowDrop}
              onDragEnter={highlightDrop}
              onDragLeave={removeHighlight}
            >
              {itemComponent}
            </div>
          ) : (
            <div className="mt-8 select-none text-center text-white opacity-50">
              <IconMistOff className="mx-auto mb-3" />
              <span className="text-[14px] leading-normal">
                {t('No data.')}
              </span>
            </div>
          )}

      
    </div>
    </div>
  );
};

export default PromptsTab;
