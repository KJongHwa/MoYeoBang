import { publicAxiosInstance } from '@/axios/axiosInstance';
import { GatheringProps } from '@/types/gathering.types';
import { API_PATH } from '../config/path';

export const getSearchGathering = async ({ keyword }: { keyword: string }) => {
  const params = { keyword };
  const response = await publicAxiosInstance.get<GatheringProps['card'][]>(
    `${API_PATH.gathering.default}`,
    { params }
  );
  return response.data ?? [];
};
