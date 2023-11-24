import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { IconCheck, IconX } from '@tabler/icons-react';

interface DatabaseSelectModalProps {
  onClose: () => void;
  onSelectDatabase: (database: string) => void; // Callback when a database is selected
  databases: string[]; // Array of database names
}

export const DatabaseSelectModal: React.FC<DatabaseSelectModalProps> = ({
  onClose,
  onSelectDatabase,
  databases,
}) => {
  const { t } = useTranslation('sidebar');
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        ref={modalRef}
        className="inline-block max-h-[400px] overflow-y-auto rounded-lg border bg-white shadow-xl transition-all p-6 align-middle"
        role="dialog"
      >
        <div className="mb-4 text-lg font-bold">{t('Select a Database')}</div>
        <ul className="mb-4">
          {databases.map((db, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onSelectDatabase(db)}>
              {db}
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-2">
          <button
            className="flex items-center gap-1 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() => onClose()}
          >
            <IconCheck size={18} />
            {t('Close')}
          </button>
          <button
            className="flex items-center gap-1 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={() => onClose()}
          >
            <IconX size={18} />
            {t('Cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};
