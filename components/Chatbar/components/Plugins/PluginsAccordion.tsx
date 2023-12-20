import React, { useState, PropsWithChildren } from 'react';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { PluginID, PluginKey } from '@/types/plugin';

// Define the props including children
interface PluginAccordionProps {
  plugin: PluginKey;
  handlePluginKeyChange: (pluginKey: PluginKey) => void;
  handleClearPluginKey: (pluginKey: PluginKey) => void;
}

const PluginAccordion: React.FC<PropsWithChildren<PluginAccordionProps>> = ({
  plugin,
  handlePluginKeyChange,
  handleClearPluginKey,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="rounded border mb-4">
      <button 
        className="flex justify-between items-center w-full p-4 text-left text-xl font-bold"
        onClick={toggleOpen}
      >
        {plugin.pluginId}
        {isOpen ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="p-4">
          {children} {/* Render the children here */}
        </div>
      )}
    </div>
  );
};

export default PluginAccordion;


