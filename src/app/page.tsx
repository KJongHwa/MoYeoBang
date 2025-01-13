'use client';

import { useState } from 'react';
import { mockGatherings } from '@/data/mockGatherings';

import CreateGatheringBtn from '@/components/gathering/CreateGatheringBtn';
import GatheringCard from '@/components/gathering/GatheringCard';
import GatheringFilters from '@/components/gathering/GatheringFilters';

export default function Gathering() {
  const [filteredGatherings, setFilteredGatherings] = useState(mockGatherings);

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col gap-12 px-4 py-32 md:py-48">
      <header className="mx-1 flex flex-col gap-2 text-white xl:mx-5">
        <p className="text-sm font-medium">함께 할 사람이 없나요?</p>
        <h1 className="text-2xl font-semibold">지금 여기로 모여방</h1>
      </header>

      <main className="flex flex-col gap-10 md:gap-12">
        <GatheringFilters
          gatherings={mockGatherings}
          setFilteredGatherings={setFilteredGatherings}
        />

        <section className="mx-auto grid h-full w-full grid-cols-1 gap-3 text-white xl:grid-cols-2">
          {filteredGatherings.map((gathering: any) => (
            <GatheringCard key={gathering.gatheringId} {...gathering} />
          ))}
        </section>

        <CreateGatheringBtn />
      </main>
    </div>
  );
}
