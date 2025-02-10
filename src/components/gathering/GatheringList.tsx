'use client';

import { useState } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import type { GatheringDto } from '@/types/gathering.types';
import { getGatherings } from '@/axios/gather/apis';
import { sortList } from '@/constants/sortList';
import { INIT_GATHERING } from '@/constants/initialValues';
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
  const [selectedSort, setSelectedSort] = useState('dateTime');
  const [filters, setFilters] = useState(INIT_GATHERING.FILTER);

  const {
    data: gatherings,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['gatherings', filters, selectedSort],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getGatherings({
        limit: 10,
        sortOrder: 'asc',
        sortBy: selectedSort,
        level: filters.level,
        location: filters.location,
        genre: filters.genre,
        date: filters.date,
        offset: pageParam,
      });

      return response;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      // 추가 데이터 요청 여부 판별
      if (!lastPage || lastPage.length < 10) return undefined;

      // offset이 page처럼 동작, 1씩 증가하도록 설정
      return lastPageParam + 1;
    },
    initialPageParam: 0,
  });

  const allGatherings = gatherings.pages.flat();

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    fetchNextPage();
  };

  const onSortingChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    fetchNextPage();
  };

  // 추가 데이터 요청 함수
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const { targetRef } = useInfiniteScroll(loadMore, hasNextPage);

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
