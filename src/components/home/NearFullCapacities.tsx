'use client';

import { useQuery } from '@tanstack/react-query';

import GatheringCard from '@/components/gathering/GatheringCard';
import { QueryProvider } from '@/components/@shared/QueryProvider';

import { getGatheringsByParticipantCount } from '@/axios/gather/apis';

export default function NearFullCapacities() {
  const {
    data: gatherings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['gatherings/participants'],
    queryFn: getGatheringsByParticipantCount,
    initialData: [],
  });

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-dvh items-center justify-center">에러 발생!</div>
    );
  }

  return (
    <QueryProvider>
      <section className="grid h-full w-full grid-cols-1 grid-rows-2 gap-4 md:gap-7 xl:grid-cols-2 xl:grid-rows-2 xl:gap-9">
        {gatherings.map((gathering: any) => (
          <GatheringCard key={gathering.gatheringId} {...gathering} />
        ))}
      </section>
    </QueryProvider>
  );
}
