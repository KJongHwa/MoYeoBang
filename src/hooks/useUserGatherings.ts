import { useQuery } from '@tanstack/react-query';
import { getMyGatheringJoined } from '@/axios/mypage/api';
import { UserGatheringJoined } from '@/types/mypage.types';

// host 또는 reviewed 중 하나를 필수로 받도록 변경
export const useUserGatherings = ({
  isHost,
  reviewed,
  offset = 0,
  limit = 10,
}: {
  isHost?: boolean;
  reviewed?: boolean;
  offset?: number;
  limit?: number;
}) => {
  return useQuery<UserGatheringJoined[]>({
    queryKey: ['myGatheringJoined', isHost, reviewed, offset, limit],
    queryFn: () => getMyGatheringJoined({ isHost, reviewed, offset, limit }),
    enabled: isHost !== undefined || reviewed !== undefined,
  });
};
