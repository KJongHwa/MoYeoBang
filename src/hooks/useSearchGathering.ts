import { getSearchGathering } from '@/axios/search/api';
import { GatheringProps } from '@/types/gathering.types';
import { useQuery } from '@tanstack/react-query';

export const useSearchGathering = (search: string) => {
  return useQuery<GatheringProps['card'][]>({
    queryKey: ['searchGathering', search],
    queryFn: () => getSearchGathering({ keyword: search }),
    enabled: !!search,
  });
};
