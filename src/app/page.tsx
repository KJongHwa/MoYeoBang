'use client';

import Image from 'next/image';

import GatheringCard from '@/components/gathering/GatheringCard';
import GatheringFilters from '@/components/gathering/GatheringFilters';
import GenreFilters from '@/components/gathering/GenreFilters';

import { mockGatherings } from '@/data/mockGatherings';

export default function Gathering() {
  return (
    <main className="mx-auto flex h-full max-w-6xl flex-col gap-12 px-4 py-48">
      <section className="mx-1 flex flex-col gap-2 text-white xl:mx-5">
        <p className="text-sm font-medium">함께 할 사람이 없나요?</p>
        <h1 className="text-2xl font-semibold">지금 여기로 모여방</h1>
      </section>

      <section className="mx-1 flex flex-col xl:mx-5">
        <div className="flex flex-col gap-6">
          <GenreFilters />
          <div className="flex justify-between text-text-secondary">
            <GatheringFilters />
            <ul>정렬</ul>
          </div>
        </div>
      </section>

      <section className="mx-auto grid h-full w-full grid-cols-1 gap-3 text-white xl:grid-cols-2">
        {mockGatherings.map((gathering: any) => (
          <GatheringCard
            registrationEnd={gathering.registrationEnd}
            key={gathering.gatheringId}
            location={gathering.location}
            dateTime={gathering.dateTime}
            level={gathering.level.toString()}
            capacity={gathering.capacity}
            name={gathering.name}
            themeName={gathering.themeName}
            image={gathering.image}
            participantCount={gathering.participantCount.toString()}
          />
        ))}
      </section>
      <button
        type="button"
        className="xl:right-1/5 fixed bottom-12 right-8 xl:bottom-16"
      >
        <Image
          src="/icons/creator.svg"
          alt="모임 생성 아이콘"
          width={64}
          height={64}
          quality={100}
          className="h-14 w-14 md:h-16 md:w-16"
        />
      </button>
    </main>
  );
}
