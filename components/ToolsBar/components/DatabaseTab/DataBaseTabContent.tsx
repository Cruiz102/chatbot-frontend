import React, { useState } from 'react';
import { IconDatabase, IconFilePlus, IconSchema } from '@tabler/icons-react';
import { SelectDatabaseModal } from './SelectDatabaseModal';
import { SchemaCreationModal } from './SchemaCreationModal';
import { Database, DatabaseName } from '@/types/database';
interface DatabaseTabProps{
  databases: Database[],
  // databasesClassDocuments: any, // TODO: Create a interface for saving documents inside a Weaviate class for seeing the files in a folder
  handleSearchTerm: (term: string) => void;
  handleCreateClass:() => void;


}


const DatabaseTab: React.FC<DatabaseTabProps> = ({ databases, handleSearchTerm, handleCreateClass }) => {
  const [showDatabasePopup, setShowDatabasePopup] = useState(false);
  const [showSchemaModal, setShowSchemaModal] = useState(false);
  const [databaseSelected, setDatabaseSelected] = useState<DatabaseName>(DatabaseName.NoneDatabase);

  const handleAddDocument = () => {
    // Logic for adding new document information
    console.log('Add new document information');
  };

  const handleCreateSchema = () => {
    console.log('Create new database schema');
    setShowSchemaModal(true);
  };

// This will set the databases selected from the DatabaseSelectionModal
  const handleSelectDatabase = (database: DatabaseName) => {
    setDatabaseSelected(database);

    // Disable the modal when a database has been selected
    setShowDatabasePopup(false)
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
  

  {/* /////////////////////////////////// */}
  {/* ////////POP UP MODALS//////////////// */}
  {/* /////////////////////////////////// */}
      {/* Database Popup */}
      {showDatabasePopup && (
        <SelectDatabaseModal
          databasesNames= {databases.map((Database) => Database.name)}
          onClose={() => setShowDatabasePopup(false)}
          onSelectDatabase={handleSelectDatabase}
   
        />
      )}

          {/* Schema Creation Modal */}
        {showSchemaModal && (
        <SchemaCreationModal
          onClose={() => setShowSchemaModal(false)}
          onSaveSchema={handleCreateSchema}
        />
      )}

  {/* /////////////////////////////////// */}



  

      {/* Separate Row for the Last Two Buttons */}
      {(databaseSelected === DatabaseName.WEAVIATE) && (
        <div style={{ display: 'flex', marginTop: '20px' }}>
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
  

    </div>
  );
  
};

export default DatabaseTab;
