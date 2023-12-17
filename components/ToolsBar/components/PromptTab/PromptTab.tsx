import React from 'react';
import { IconPlus, IconFolderPlus } from '@tabler/icons-react';
import Search from '../../../Search'; // Adjust the import path as necessary

interface PromptsTabProps {
  addItemButtonTitle: string;
  searchTerm: string;
  handleSearchTerm: (term: string) => void;
  handleCreateItem: () => void;
  handleCreateFolder: () => void;
  itemComponent: React.ReactNode;
  folderComponent: React.ReactNode;
}

const PromptsTab: React.FC<PromptsTabProps> = ({
  addItemButtonTitle,
  searchTerm,
  handleSearchTerm,
  handleCreateItem,
  handleCreateFolder,
  itemComponent,
  folderComponent
}) => {
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

      {itemComponent}
      {folderComponent}
    </div>
  );
};

export default PromptsTab;
