import React, { useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconFolderPlus, IconMistOff, IconPlus } from '@tabler/icons-react';
import { IconDatabase, IconFilePlus, IconSchema   } from '@tabler/icons-react';
import {SchemaDetails} from '../../types/database';
import { DatabaseSelectModal } from '../Promptbar/components/DatabaseModal';
import { SchemaCreationModal } from '../Promptbar/components/SchemaCreationModal';
import {
  CloseSidebarButton,
  OpenSidebarButton,
} from './components/OpenCloseButton';
import Search from '../Search';

interface SidebarTabsProps<T> {
  isOpen: boolean;
  addItemButtonTitle: string;
  side: 'left' | 'right';
  items: T[];
  itemComponent: ReactNode;
  databaseComponent: ReactNode;
  folderComponent: ReactNode;
  footerComponent?: ReactNode;
  searchTerm: string;
  handleSearchTerm: (searchTerm: string) => void;
  toggleOpen: () => void;
  handleCreateItem: () => void;
  handleCreateFolder: () => void;
  handleDrop: (e: any) => void;
}

interface DatabaseListPopupProps {
    isVisible: boolean;
    onClose: () => void;
    databases: string[];
  }
  
  const DatabaseListPopup: React.FC<DatabaseListPopupProps> = ({
    isVisible,
    onClose,
    databases
  }) => {
    if (!isVisible) return null;
  
    return (
      <div className="database-popup">
        {/* styling for popup can be added here or in an external CSS file */}
        <ul>
          {databases.map((db, index) => (
            <li key={index}>{db}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
  

const SidebarTabs = <T,>({
  isOpen,
  addItemButtonTitle,
  side,
  items,
  itemComponent,
  folderComponent,
  footerComponent,
  searchTerm,
  handleSearchTerm,
  toggleOpen,
  handleCreateItem,
  handleCreateFolder,
  handleDrop,
}: SidebarTabsProps<T>) => {
  const { t } = useTranslation('sidebar');

  const tabs = ['Chats', 'Database']; // Add more tabs as needed
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showDatabasePopup, setShowDatabasePopup] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [showSchemaModal, setShowSchemaModal] = useState(false);

  // ... your existing renderTabHeader and other functions

  const handleSelectDatabase = (database: string) => {
    setSelectedDatabase(database);
    setShowDatabasePopup(false); // Close the modal after selection
    // Here you can also do other actions after selecting a database
  };

  const renderTabHeader = () => (
    <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0' }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          style={{
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: activeTab === tab ? '#4CAF50' : '#f7f7f7',
            color: activeTab === tab ? 'white' : 'black',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease',
          }}
          onClick={() => setActiveTab(tab)}
        >
          {t(tab)}
        </button>
      ))}
    </div>
  );

  // Handler for the new button
const handleAddDocument = () => {
  // Logic for adding new document information
  // This could open a modal, a form, etc.
  console.log('Add new document information');
};

const handleCreateSchema = () => {
  console.log('Create new database schema');
  setShowSchemaModal(true);
};

const handleSaveSchema = (schemaDetails: SchemaDetails) => {
  // Your save logic here
};


  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Chats':
        return (
          <div>
            {/* Add your buttons here */}
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
              placeholder={t('Search...')}
              searchTerm={searchTerm}
              onSearch={handleSearchTerm}
            />
  
            {/* Rest of your chats tab content */}
            {itemComponent}
            {folderComponent}
          </div>
        );
      case 'Database':
        return (
          <div>
          <button
            onClick={() => setShowDatabasePopup(true)}
            style={{
              backgroundColor: '#4CAF50', // Example background color
              color: 'white', // Text color
              padding: '10px 20px', // Padding around the text
              border: 'none', // No border
              borderRadius: '5px', // Rounded corners
              cursor: 'pointer', // Cursor on hover
              margin: '10px', // Margin around the button
              // Add more styling as needed
            }}
          >
               <IconDatabase /> {/* Replaced text with icon */}
          </button>
            {/* Button for adding new document information */}
            <button
            onClick={handleAddDocument}
            style={{
              backgroundColor: '#4CAF50', /* keep background color consistent */
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              // display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px', /* adds space between the buttons */
              /* other styles as needed */
            }}
          >
            <IconFilePlus /> {/* Replaced text with icon */}
          </button>


          {/* New Button for Creating Database Schema */}
          <button
            onClick={handleCreateSchema}
            style={{
              backgroundColor: '#4CAF50', /* keep background color consistent */
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              // display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
              marginLeft: '10px' /* adds space between the buttons */
              /* other styles as needed */
            }}
            >
            <IconSchema /> {/* Schema Creation Button */}
          </button>


          </div>



        );
      default:
        return null;
    }
  };

  return isOpen ? (
    <div className={`sidebar ${side} ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        {renderTabHeader()}

        {/* Add your buttons here */}
      
      </div>

      <div className="sidebar-content" style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        {renderTabContent()}
      </div>

      {footerComponent}
      <CloseSidebarButton onClick={toggleOpen} side={side} />
      
      {showDatabasePopup && (
        <DatabaseSelectModal
          databases={['Database1', 'Database2', 'Database3']}
          onClose={() => setShowDatabasePopup(false)}
          onSelectDatabase={handleSelectDatabase}
        />
      )}

   {showSchemaModal && (
    <SchemaCreationModal
      onClose={() => setShowSchemaModal(false)}
      onSaveSchema={handleSaveSchema}
    />
  )}


    </div>
  ) : (
    <OpenSidebarButton onClick={toggleOpen} side={side} />
  );
};


export default SidebarTabs;
