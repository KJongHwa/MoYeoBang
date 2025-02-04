import { useQuery } from '@tanstack/react-query';
import { getMyGatheringJoined } from '@/axios/mypage/api';
import { UserGatheringJoined } from '@/types/mypage.types';

export const useUserGatherings = ({
  isHost,
  offset = 0,
  limit = 10,
}: {
  isHost: boolean;
  offset?: number;
  limit?: number;
}) => {
  return useQuery<UserGatheringJoined[]>({
    queryKey: ['myGatheringJoined', isHost, offset, limit],
    queryFn: () => getMyGatheringJoined({ isHost, offset, limit }),
  });
};
