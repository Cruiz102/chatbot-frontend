import React, { useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconFolderPlus, IconMistOff, IconPlus } from '@tabler/icons-react';
import { IconDatabase, IconFilePlus, IconSchema   } from '@tabler/icons-react';
import {SchemaDetails} from '../../types/database';
import { SchemaCreationModal } from '../ToolsBar/components/DatabaseTab/SchemaCreationModal';
import {
  CloseSidebarButton,
  OpenSidebarButton,
} from './components/OpenCloseButton';
import Search from '../Search';


interface TabConfig{
  title: string; // Tab title
  components: ReactNode[]; // Component to render in the tab
  // Add any other props or handlers needed for the tab content
}

interface SidebarTabsProps {
  isOpen: boolean;
  addItemButtonTitle: string;
  side: 'left' | 'right';
  tabs: TabConfig[];
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
  

const SidebarTabs = ({
  isOpen,
  addItemButtonTitle,
  side,
  tabs,
  footerComponent,
  searchTerm,
  handleSearchTerm,
  toggleOpen,
  handleCreateItem,
  handleCreateFolder,
  handleDrop,
}: SidebarTabsProps) => {
  const { t } = useTranslation('sidebar');
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
          key={tab.title}
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
          {t(tab.title)}
        </button>
      ))}
    </div>
  );

  const renderTabContent = () => {
    const activeTabConfig = tabs.find(tab => tab.title === activeTab.title);
    return activeTabConfig ? (
      <div>
        {activeTabConfig.components.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
      </div>
    ) : null;
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
      
      


    </div>
  ) : (
    <OpenSidebarButton onClick={toggleOpen} side={side} />
  );
};


export default SidebarTabs;
