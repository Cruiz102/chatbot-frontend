

import React from 'react';
import { PluginID, PluginKey } from '@/types/plugin';
import { KeyValuePair } from '../../../../types/data'
interface PluginInputsProps {
  pluginKey: PluginKey;
  handlePluginKeyChange: (pluginKey: PluginKey) => void;
}

const PluginInputs: React.FC<PluginInputsProps> = ({ pluginKey, handlePluginKeyChange }) => {
  const handleInputChange = (keyValuePair: KeyValuePair) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPluginKey: PluginKey = {
      ...pluginKey,
      requiredKeys: pluginKey.requiredKeys.map((keyValue) => 
        keyValue.key === keyValuePair.key ? { ...keyValue, value: event.target.value } : keyValue
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
                    type="password"
                    value={
                      pluginKeys
                        .find((p) => p.pluginId === PluginID.WEAVIATE_SEARCH)
                        ?.requiredKeys.find((k) => k.key === 'WEAVIATE_URL')
                        ?.value
                    }
                    onChange={(e) => {
                      const pluginKey = pluginKeys.find(
                        (p) => p.pluginId === PluginID.WEAVIATE_SEARCH,
                      );

                      if (pluginKey) {
                        const requiredKey = pluginKey.requiredKeys.find(
                          (k) => k.key === 'WEAVIATE_URL',
                        );

                        if (requiredKey) {
                          const updatedPluginKey = {
                            ...pluginKey,
                            requiredKeys: pluginKey.requiredKeys.map((k) => {
                              if (k.key === 'WEAVIATE_URL') {
                                return {
                                  ...k,
                                  value: e.target.value,
                                };
                              }

                              return k;
                            }),
                          };

                          handlePluginKeyChange(updatedPluginKey);
                        }
                        //  Adding this else in the case that 
                        //  the PluginKey was not found so in that
                        //  case we build it for the first time.
                      } else {
                        const newPluginKey: PluginKey = {
                          pluginId: PluginID.WEAVIATE_SEARCH,
                          requiredKeys: [
                            {
                              key: 'WEAVIATE_URL',
                              value: e.target.value,
                            },
                            {
                              key: 'WEAVIATE_API_KEY',
                              value: '',
                            },
                            {
                              key: 'CLASS_NAME',
                              value: '',
                            },
                          ],
                        };

                        handlePluginKeyChange(newPluginKey);
                      }
                    }}
                  />
        </div>
      ))}
    </div>
  );
};

export default PluginInputs;





