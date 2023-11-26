// components/Databases.tsx
import React from 'react';
import { DatabaseItem } from '@/types/databaseItem';
import { DatabaseItemComponent } from './DatabaseItemComponent';

interface DatabasesProps {
  databases: DatabaseItem[];
  // Add more props as needed for event handling, etc.
}

export const Databases: React.FC<DatabasesProps> = ({ databases }) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {databases.map((databaseItem, index) => (
        <DatabaseItemComponent key={databaseItem.id} databaseItem={databaseItem} />
      ))}
    </div>
  );
};
