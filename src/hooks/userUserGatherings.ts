import { useQuery } from '@tanstack/react-query';
import { getMyGatheringJoied } from '@/axios/mypage/api';
import { UserGatheringJoined } from '@/types/mypage.types';

export const useUserGatherings = () => {
  return useQuery<UserGatheringJoined[]>({
    queryKey: ['myGatheringJoined'],
    queryFn: getMyGatheringJoied,
  });
};
