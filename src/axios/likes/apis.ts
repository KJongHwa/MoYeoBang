import { publicAxiosInstance } from '@/axios/axiosInstance';
import { API_PATH } from '../config/path';

export const getLikeGatherings = async (gatheringIds: number[]) => {
  const params = new URLSearchParams();
  gatheringIds.forEach((id) => params.append('gatheringId', id.toString()));

  const response = await publicAxiosInstance.get(
    `${API_PATH.gathering.zzim}?${params.toString()}`
  );
  return response.data ?? [];
};
