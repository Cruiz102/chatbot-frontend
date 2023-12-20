import React from 'react';
import { PluginKey } from '@/types/plugin';
import { KeyValuePair } from '@/types/data';

interface PluginInputsProps {
  pluginKey: PluginKey;
  handlePluginKeyChange: (pluginKey: PluginKey) => void;
}

const PluginInputs: React.FC<PluginInputsProps> = ({ pluginKey, handlePluginKeyChange }) => {
  const handleInputChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPluginKey: PluginKey = {
      ...pluginKey,
      requiredKeys: pluginKey.requiredKeys.map((keyValue) => 
        keyValue.key === key ? { ...keyValue, value: event.target.value } : keyValue
      ),
    };
    handlePluginKeyChange(updatedPluginKey);
  };

  return (
    <div>
      {pluginKey.requiredKeys.map((keyValue) => (
        <div key={keyValue.key} className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor={keyValue.key}>
            {keyValue.key}
          </label>
          <input
            className="mt-2 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-[#40414F] dark:text-neutral-100"
            type="password" // You might want to adjust this type based on the key
            value={keyValue.value}
            onChange={handleInputChange(keyValue.key)}
          />
        </div>
      ))}
    </div>
  );
};

export default PluginInputs;
