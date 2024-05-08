// components/Databases.tsx
import React from 'react';
import { Database } from '@/types/database';
import { DatabaseItemComponent } from './DatabaseItemComponent';

interface DatabasesProps {
  databases: Database[];
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
