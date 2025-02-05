import { useQuery } from '@tanstack/react-query';
import { getGatheringDetail, getHostProfile } from '@/axios/gather/apis';

export function useGatheringDetail(gatheringId: number) {
  return useQuery({
    queryKey: ['gathering-detail', gatheringId],
    queryFn: () => getGatheringDetail(gatheringId),
    enabled: !!gatheringId,
  });
}

export function useHostProfile(hostId: number) {
  return useQuery({
    queryKey: ['host-profile', hostId],
    queryFn: () => getHostProfile(hostId),
    enabled: !!hostId,
  });
}

export function useGatheringWithHost(gatheringId: number) {
  const gatheringQuery = useGatheringDetail(gatheringId);
  const hostId = gatheringQuery.data?.hostId;

  const hostQuery = useHostProfile(hostId ?? 0);

  return {
    gatheringData: gatheringQuery.data,
    hostData: hostQuery.data,
    isLoading: gatheringQuery.isLoading || (!!hostId && hostQuery.isLoading),
    isError: gatheringQuery.isError || (!!hostId && hostQuery.isError),
  };
}
