import { useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';

export interface GetModelsRequestProps {
  key: string;
}
export interface GetWeaviateCollectionRequestProps{
  key: string,
  url: string
}

const useApiService = () => {
  const fetchService = useFetch();

  // const getModels = useCallback(
  // 	(
  // 		params: GetManagementRoutineInstanceDetailedParams,
  // 		signal?: AbortSignal
  // 	) => {
  // 		return fetchService.get<GetManagementRoutineInstanceDetailed>(
  // 			`/v1/ManagementRoutines/${params.managementRoutineId}/instances/${params.instanceId
  // 			}?sensorGroupIds=${params.sensorGroupId ?? ''}`,
  // 			{
  // 				signal,
  // 			}
  // 		);
  // 	},
  // 	[fetchService]
  // );

  const getModels = useCallback(
    (params: GetModelsRequestProps, signal?: AbortSignal) => {
      return fetchService.post<GetModelsRequestProps>(`/api/models`, {
        body: { key: params.key },
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
      });
    },
    [fetchService],
  );
  

  const getWeaviateCollection = useCallback(
    (params: GetWeaviateCollectionRequestProps, signal?: AbortSignal) => {
      console.log(params.key, params.url)
      return fetchService.post<GetWeaviateCollectionRequestProps>(`/api/database`, {
        body: { url: params.url, key: params.key},
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
    });
  },
    [fetchService],
  );

  return {
    getModels,
    getWeaviateCollection
  };
};

export default useApiService;
