// DatabaseContent.tsx

import React, { useState, useEffect } from 'react';
import { getDatabaseData } from '@/services/DatabaseService';

interface DatabaseContentProps {
  databaseName: string;
}

const DatabaseContent: React.FC<DatabaseContentProps> = ({ databaseName }) => {
  const [data, setData] = useState<any>(null); // Replace 'any' with a more specific type as needed
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const fetchedData = await getDatabaseData(databaseName);
        setData(fetchedData);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (databaseName) {
      loadData();
    }
  }, [databaseName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Database Content: {databaseName}</h2>
      {/* Render your data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DatabaseContent;
