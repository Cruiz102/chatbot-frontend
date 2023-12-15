import React, { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';
import { SchemaDetails, Property } from '@/types/database';

interface SchemaCreationModalProps {
  onClose: () => void;
  onSaveSchema: (schemaDetails: SchemaDetails) => void;
}

export const SchemaCreationModal: React.FC<SchemaCreationModalProps> = ({
  onClose,
  onSaveSchema,
}) => {
  // Define state for the schema details
  const [className, setClassName] = useState('');
  const [description, setDescription] = useState('');
  const [properties, setProperties] = useState<Property[]>([
    { dataType: ['text'], description: '', name: '' },
    { dataType: ['text'], description: '', name: '' },
    { dataType: ['text'], description: '', name: '' },
  ]);
  const [vectorizer, setVectorizer] = useState('text2vec-openai');

  const handleSave = () => {
    // Construct the schema object
    const schemaDetails: SchemaDetails = {
      class: className,
      description: description,
      properties: properties,
      vectorizer: vectorizer,
    };
    onSaveSchema(schemaDetails);
    onClose(); // Close the modal after saving
  };

  // Function to update properties
  const updateProperty = (index: number, field: keyof Property, value: string) => {
    const updatedProperties = properties.map((prop, propIndex) =>
      index === propIndex ? { ...prop, [field]: field === 'dataType' ? [value] : value } : prop
    );
    setProperties(updatedProperties);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-[#202123] p-4 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="className" className="text-white">Class Name:</label>
          <input
            id="className"
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="border-2 border-[#555657] bg-[#313235] text-white rounded p-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-white">Description:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-[#555657] bg-[#313235] text-white rounded p-1"
          />
        </div>
        {properties.map((prop, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`property-name-${index}`} className="text-white">Property Name:</label>
            <input
              id={`property-name-${index}`}
              type="text"
              value={prop.name}
              onChange={(e) => updateProperty(index, 'name', e.target.value)}
              className="border-2 border-[#555657] bg-[#313235] text-white rounded p-1"
            />
            <label htmlFor={`property-description-${index}`} className="text-white">Property Description:</label>
            <input
              id={`property-description-${index}`}
              type="text"
              value={prop.description}
              onChange={(e) => updateProperty(index, 'description', e.target.value)}
              className="border-2 border-[#555657] bg-[#313235] text-white rounded p-1"
            />
            {/* Add inputs for other fields like dataType if needed */}
          </div>
        ))}
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={handleSave} className="bg-[#0F9D58] hover:bg-[#0F9D58]/90 text-white px-4 py-2 rounded">
            <IconCheck size={18} />
            Save
          </button>
          <button onClick={onClose} className="bg-[#DB4437] hover:bg-[#DB4437]/90 text-white px-4 py-2 rounded">
            <IconX size={18} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
  
};
