// DatabaseService.ts

const getDatabaseData = async (databaseName: string): Promise<any> => { // Replace 'any' with a more specific type
    try {
      const response = await fetch(`https://your-api.com/data?db=${databaseName}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export { getDatabaseData };
  