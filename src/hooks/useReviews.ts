import { useQuery } from '@tanstack/react-query';
import { getMyGatheringJoined } from '@/axios/mypage/api';
import { UserGatheringJoined } from '@/types/mypage.types';

export const UseReviews = ({
  reviewed,
  offset = 0,
  limit = 10,
}: {
  reviewed: boolean;
  offset?: number;
  limit?: number;
}) => {
  return useQuery<UserGatheringJoined[]>({
    queryKey: ['myReviews', reviewed, offset, limit],
    queryFn: () => getMyGatheringJoined({ reviewed, offset, limit }),
  });
};
