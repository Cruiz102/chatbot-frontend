import React, { useState, FC } from 'react';

interface LocalModelPopupProps {
  onClose: () => void;
}

const LocalModelPopup: FC<LocalModelPopupProps> = ({ onClose }) => {
  const [modelName, setModelName] = useState<string>('');
  const [modelDetails, setModelDetails] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for the submission of the new local model
    console.log("Model Name:", modelName, "Model Details:", modelDetails);
    onClose(); // Close the popup after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add Local Model</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="modelName" className="block text-sm font-medium text-gray-700">Model Name</label>
            <input
              type="text"
              id="modelName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="modelDetails" className="block text-sm font-medium text-gray-700">Model Details</label>
            <textarea
              id="modelDetails"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              rows= {3}
              value={modelDetails}
              onChange={(e) => setModelDetails(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Model
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocalModelPopup;
