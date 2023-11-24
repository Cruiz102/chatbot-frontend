import React, { useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconFolderPlus, IconMistOff, IconPlus } from '@tabler/icons-react';
import { DatabaseSelectModal } from '../Promptbar/components/DatabaseModal';
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

  const tabs = ['Chats', 'Folders', 'Database']; // Add more tabs as needed
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showDatabasePopup, setShowDatabasePopup] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);

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
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Chats':
        return itemComponent;
      case 'Folders':
        return folderComponent;
      case 'Database':
        return (
          <button onClick={() => setShowDatabasePopup(true)}>
            Connect to Database
          </button>
        );
      default:
        return null;
    }
  };

  return isOpen ? (
    <div className={`sidebar ${side} ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        {renderTabHeader()}
        <Search
          placeholder={t('Search...')}
          searchTerm={searchTerm}
          onSearch={handleSearchTerm}
        />
      </div>
      <div className="sidebar-content">
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
    </div>
  ) : (
    <OpenSidebarButton onClick={toggleOpen} side={side} />
  );
};

export default SidebarTabs;
