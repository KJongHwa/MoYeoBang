'use client';

import GenreFilter from '@/components/@shared/GenreFilter';
import { LikesGatheringListProps } from '@/types/gathering.types';
import { useState } from 'react';
import GatheringCard from '../gathering/GatheringCard';
import EmptyElement from '../@shared/EmptyElement';

export default function LikesGatheringList({
  likesGatherings,
}: LikesGatheringListProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const filteredGatherings = likesGatherings.filter((gathering) => {
    const genreMatches =
      selectedGenre === 'all' || gathering.genre === selectedGenre;
    return genreMatches;
  });

  return (
    <>
      <section className="relative py-12">
        <GenreFilter
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </section>

      {filteredGatherings.length === 0 ? (
        <section key={selectedGenre} className="mt-10 flex flex-col gap-6">
          <EmptyElement>
            <p>아직 찜한 모임이 없어요</p>
            <p>지금 바로 마음에 드는 모임을 찜해보세요</p>
          </EmptyElement>
        </section>
      ) : (
        <section
          key={selectedGenre}
          className="mx-auto grid h-full w-full grid-cols-1 gap-3 pb-10 text-white xl:grid-cols-2"
        >
          {filteredGatherings.map((gathering) => (
            <GatheringCard
              key={gathering.gatheringId}
              gatheringId={gathering.gatheringId}
              name={gathering.name}
              location={gathering.location}
              themeName={gathering.themeName}
              image={gathering.image}
              level={gathering.level}
              dateTime={gathering.dateTime}
              registrationEnd={gathering.registrationEnd}
              capacity={gathering.capacity.toString()}
              participantCount={gathering.participantCount.toString()}
            />
          ))}
        </section>
      )}
    </>
  );
}
