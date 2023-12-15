// components/DatabaseItemComponent.tsx
import React from 'react';
import { DatabaseItem } from '@/types/databaseItem';
import { IconDatabase } from '@tabler/icons-react';

interface DatabaseItemProps {
  databaseItem: DatabaseItem;
  // Add more props as needed for event handling, etc.
}

export const DatabaseItemComponent: React.FC<DatabaseItemProps> = ({ databaseItem }) => {
  // Event handlers and state here as needed

  return (
    <div className="relative flex items-center">
      <button
        className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-[#343541]/90"
        // Add more event handlers as needed
      >
        <IconDatabase size={18} />
        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {databaseItem.name}
        </div>
      </button>
      {/* Add more interactive elements as needed */}
    </div>
  );
};
