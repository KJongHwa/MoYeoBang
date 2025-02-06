import { publicAxiosInstance } from '@/axios/axiosInstance';
import { API_PATH } from '../config/path';

export const getLikeGatherings = async (gatheringIds: number[]) => {
  const params = new URLSearchParams();
  gatheringIds.forEach((id) => params.append('gatheringId', id.toString()));

  const URL =
    gatheringIds.length === 0
      ? `${API_PATH.gathering.zzim}?gatheringId=0`
      : `${API_PATH.gathering.zzim}?${params.toString()}`;

  const response = await publicAxiosInstance.get(URL);
  return response.data ?? [];
};
