import React, { useState } from 'react';
import { IconDatabase, IconFilePlus, IconSchema } from '@tabler/icons-react';
import { SelectDatabaseModal } from './SelectDatabaseModal';
import { SchemaCreationModal } from './SchemaCreationModal';
import { Database } from '@/types/database';
interface DatabaseTabProps{
  databases: Database[],
  // databasesClassDocuments: any, // TODO: Create a interface for saving documents inside a Weaviate class for seeing the files in a folder
  handleSearchTerm: (term: string) => void;
  handleCreateClass:() => void;


}


const DatabaseTab: React.FC<DatabaseTabProps> = () => {
  const [showDatabasePopup, setShowDatabasePopup] = useState(false);
  const [showSchemaModal, setShowSchemaModal] = useState(false);

  const handleAddDocument = () => {
    // Logic for adding new document information
    console.log('Add new document information');
  };

  const handleCreateSchema = () => {
    console.log('Create new database schema');
    setShowSchemaModal(true);
  };


  const handleSelectDatabase = (database: string) => {
    // Logic after selecting a database
    setShowDatabasePopup(false);
  };

  return (
    <div>
      <button
        className="flex justify-center items-center w-full px-4 py-2 my-2 mx-auto
                   text-white border-b border-white/20 pb-2 rounded-md border 
                   hover:bg-gray-500/10"
        onClick={() => setShowDatabasePopup(true)}
      >
        <IconDatabase size={24} />
      </button>
  

  
      {/* Database Popup */}
      {showDatabasePopup && (
        <SelectDatabaseModal
          databasesNames= {databases.map((Database) => Database.name)}
          onClose={() => setShowDatabasePopup(false)}
          onSelectDatabase={handleSelectDatabase}
        />
      )}
  
      {/* Separate Row for the Last Two Buttons */}
      {showDatabasePopup && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {/* Add Document Button */}
          <button onClick={handleAddDocument} /* style object */>
            <IconFilePlus />
          </button>
  
          {/* Schema Creation Button */}
          <button onClick={handleCreateSchema} /* style object */>
            <IconSchema />
          </button>
        </div>
      )}
  
      {/* Schema Creation Modal */}
      {showSchemaModal && (
        <SchemaCreationModal
          onClose={() => setShowSchemaModal(false)}
          onSaveSchema={handleCreateSchema}
        />
      )}
    </div>
  );
  
};

export default DatabaseTab;
