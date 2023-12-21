import React, { useState, FC } from 'react';

interface LocalModelPopupProps {
  onClose: () => void;
  onSubmit: (model: AIModel) => void; // Callback function to handle the submission of the new local model
}

const LocalModelPopup: FC<LocalModelPopupProps> = ({ onClose, onSubmit }) => {
  const [modelName, setModelName] = useState<string>('');
  const [maxLength, setMaxLength] = useState<number>(0);
  const [tokenLimit, setTokenLimit] = useState<number>(0);
  const [category, setCategory] = useState<'finetuned' | 'OpenAI' | 'local'>('local');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newModel = {
      id: modelName.replace(/\s+/g, '-').toLowerCase(), // Generate an ID from the model name
      name: modelName,
      maxLength,
      tokenLimit,
      category,
    };
    onSubmit(newModel);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className=" p-4 rounded-lg bg-white p-4 rounded-lg max-w-[800px] w-[90%]">
        <h2 className="text-xl font-bold mb-4">Add Local Model</h2>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
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

          {/* Max Length */}
          <div className="mb-4">
            <label htmlFor="maxLength" className="block text-sm font-medium text-gray-700">Max Length</label>
            <input
              type="number"
              id="maxLength"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              value={maxLength}
              onChange={(e) => setMaxLength(Number(e.target.value))}
              required
            />
          </div>

          {/* Token Limit */}
          <div className="mb-4">
            <label htmlFor="tokenLimit" className="block text-sm font-medium text-gray-700">Token Limit</label>
            <input
              type="number"
              id="tokenLimit"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              value={tokenLimit}
              onChange={(e) => setTokenLimit(Number(e.target.value))}
              required
            />
          </div>

          {/* Model Name */}
          <div className="mb-4">
            <label htmlFor="modelName" className="block text-sm font-medium text-gray-700">API URL</label>
            <input
              type="text"
              id="modelName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-gray-700"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
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
