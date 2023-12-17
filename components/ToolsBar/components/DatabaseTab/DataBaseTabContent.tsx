import React, { useState } from 'react';
import { IconDatabase, IconFilePlus, IconSchema } from '@tabler/icons-react';
import { SelectDatabaseModal } from './SelectDatabaseModal';
import { SchemaCreationModal } from './SchemaCreationModal';

const DatabaseTab: React.FC = () => {
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

  const handleSaveSchema = (schemaDetails) => {
    // Your save logic here
  };

  const handleSelectDatabase = (database: string) => {
    // Logic after selecting a database
    setShowDatabasePopup(false);
  };

  return (
    <div>
      {/* Database Button */}
      <button onClick={() => setShowDatabasePopup(true)} /* style object */>
        <IconDatabase />
      </button>

      {/* Add Document Button */}
      <button onClick={handleAddDocument} /* style object */>
        <IconFilePlus />
      </button>

      {/* Schema Creation Button */}
      <button onClick={handleCreateSchema} /* style object */>
        <IconSchema />
      </button>

      {/* Database Popup */}
      {showDatabasePopup && (
        <SelectDatabaseModal
          databases={['Database1', 'Database2', 'Database3']}
          onClose={() => setShowDatabasePopup(false)}
          onSelectDatabase={handleSelectDatabase}
        />
      )}

      {/* Schema Creation Modal */}
      {showSchemaModal && (
        <SchemaCreationModal
          onClose={() => setShowSchemaModal(false)}
          onSaveSchema={handleSaveSchema}
        />
      )}
    </div>
  );
};

export default DatabaseTab;
