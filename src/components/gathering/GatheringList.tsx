'use client';

import { useState, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import type { GatheringDto, GatheringFilters } from '@/types/gathering.types';
import { getGatherings } from '@/axios/gather/apis';
import { sortList } from '@/constants/sortList';
import { INIT_GATHRING } from '@/constants/initialValues';
import { QueryProvider } from '@/components/@shared/QueryProvider';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import EmptyElement from '@/components/@shared/EmptyElement';
import GatheringCard from '@/components/gathering/GatheringCard';
import DateDropdown from '@/components/@shared/dropdown/DateDropdown';
import LocationDropdown from '@/components/@shared/dropdown/LocationDropdown';
import LevelDropdown from '@/components/@shared/dropdown/LevelDropdown';
import SortDropdown from '@/components/@shared/dropdown/SortDropdown';
import GenreFilter from '@/components/@shared/GenreFilter';

export default function GatheringList() {
  const [selectedSort, setSelectedSort] = useState<string>('dateTime');
  const [filters, setFilters] = useState<GatheringFilters>(
    INIT_GATHRING.FILTER
  );
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [allGatherings, setAllGatherings] = useState<GatheringDto['get'][]>([]);

  const { data: gatherings } = useSuspenseQuery({
    queryKey: ['gatherings', filters, selectedSort, offset],
    queryFn: () =>
      getGatherings({
        limit: 10,
        sortOrder: 'asc',
        sortBy: selectedSort,
        level: filters.level,
        location: filters.location,
        genre: filters.genre,
        date: filters.date,
        offset,
      }),
  });

  // 데이터 누적 로직
  useEffect(() => {
    if (!gatherings) return;

    setAllGatherings((prev) => [
      ...prev,
      ...gatherings.filter(
        (gathering: GatheringDto['get']) =>
          !prev.some((item) => item.gatheringId === gathering.gatheringId)
      ),
    ]);

    // 남아있는 데이터 확인
    setHasMore(gatherings.length > 0);
  }, [gatherings]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setAllGatherings([]); // 기존 데이터 리셋
    setOffset(0); // 오프셋 리셋
    setHasMore(true);
  };

  const onSortingChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    setAllGatherings([]);
    setOffset(0);
    setHasMore(true);
  };

  // 추가 데이터 요청 함수
  const loadMore = () => {
    if (hasMore) {
      setOffset((prev) => {
        const newOffset = prev + 1;
        return newOffset;
      });
    }
  };

  const { targetRef } = useInfiniteScroll(loadMore, hasMore);

  return (
    <QueryProvider>
      <section className="flex flex-col">
        <div className="flex flex-col gap-5 md:gap-7">
          <GenreFilter
            onGenreChange={(value) => handleFilterChange('genre', value)}
            selectedGenre={filters.genre}
          />
          <div className="flex items-center justify-between text-text-secondary">
            <div className="flex justify-between">
              <div className="mr-2 flex gap-2">
                <LocationDropdown
                  onLocatingChange={(value) =>
                    handleFilterChange('location', value)
                  }
                  selectedLocation={filters.location}
                />
                <DateDropdown
                  onDateChange={(value) => handleFilterChange('date', value)}
                  selectedDate={filters.date}
                />
                <LevelDropdown
                  onLevelChange={(value) => handleFilterChange('level', value)}
                  selectedLevel={filters.level}
                />
              </div>
            </div>
            <SortDropdown
              onSortingChange={onSortingChange}
              sortList={sortList.gathering}
            />
          </div>
        </div>
      </section>

      {allGatherings.length > 0 ? (
        <section className="mx-auto grid h-full w-full grid-cols-1 gap-3 text-white xl:grid-cols-2">
          {allGatherings.map((gathering: GatheringDto['get']) => (
            <GatheringCard key={gathering.gatheringId} {...gathering} />
          ))}
        </section>
      ) : (
        <EmptyElement>
          아직 모임이 없어요,
          <br />
          지금 바로 모임을 만들어보세요
        </EmptyElement>
      )}
      <div ref={targetRef} style={{ height: '1px' }} />
    </QueryProvider>
  );
}
