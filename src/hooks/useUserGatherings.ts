import { useQuery } from '@tanstack/react-query';
import { getMyGatheringJoined } from '@/axios/mypage/api';
import { UserGatheringJoined } from '@/types/mypage.types';

// ✅ host 또는 reviewed 중 하나를 필수로 받도록 변경
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
    queryKey: ['myGatheringJoined', isHost, reviewed, offset, limit], // 캐싱을 위해 key에 포함
    queryFn: () => getMyGatheringJoined({ isHost, reviewed, offset, limit }),
    enabled: isHost !== undefined || reviewed !== undefined, // 필수 조건이 없으면 쿼리 실행 안 함
  });
};
