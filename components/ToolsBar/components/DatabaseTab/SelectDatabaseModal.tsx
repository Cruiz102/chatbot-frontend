import React, { useState, useEffect, useRef, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { IconCheck, IconX } from '@tabler/icons-react';
import HomeContext from '@/pages/api/home/home.context';
interface SelectDatabaseModalProps {
  onClose: () => void;
  onSelectDatabase: (database: string) => void;
  databasesNames: string[];
}

export const SelectDatabaseModal: React.FC<SelectDatabaseModalProps> = ({
  onClose,
  onSelectDatabase,
  databasesNames,
}) => {
  const { t } = useTranslation('sidebar');
  const modalRef = useRef<HTMLDivElement>(null);
  useContext(HomeContext); // Use context to update HomeState







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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="dark:border-netural-400 inline-block max-h-[400px] transform overflow-y-auto rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
        role="dialog"
      >
        <div className="mb-4 text-lg font-bold">{t('Select a Database')}</div>
        <ul className="mb-4">
          {databasesNames.map((db, index) => (
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
