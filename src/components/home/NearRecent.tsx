'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { QueryProvider } from '@/components/@shared/QueryProvider';
import EmptyElement from '@/components/@shared/EmptyElement';
import GatheringCard from '@/components/gathering/GatheringCard';

import { getGatheringsDateTime } from '@/axios/gather/apis';

export default function NearRecent() {
  const { data: gatherings } = useSuspenseQuery({
    queryKey: ['gatherings/dateTime'],
    queryFn: getGatheringsDateTime,
  });

  return (
    <QueryProvider>
      {gatherings.length > 0 ? (
        <section className="grid h-full w-full grid-cols-1 grid-rows-2 gap-4 md:gap-7 xl:grid-cols-2 xl:grid-rows-2 xl:gap-9">
          {gatherings.map((gathering: any) => (
            <GatheringCard key={gathering.gatheringId} {...gathering} />
          ))}
        </section>
      ) : (
        <EmptyElement className="w-full">
          모집 중인 모임을 불러오지 못했어요.
        </EmptyElement>
      )}
    </QueryProvider>
  );
}
