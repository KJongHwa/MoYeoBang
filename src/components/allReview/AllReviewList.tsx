'use client';

import { useInView } from 'react-intersection-observer';
import { AllReviewListProps } from '@/types/review.types';
import { useEffect, useState } from 'react';
import ReviewCard from '@/components/allReview/ReviewCard';
import ReviewFilters from '@/components/allReview/ReviewFilters';
import EmptyElement from '@/components/@shared/EmptyElement';
import GenreFilter from '@/components/@shared/GenreFilter';
import RatingSection from '@/components/allReview/RatingSection';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { getAllReviews } from '@/axios/allReview/apis';
import { hyphenYearMonthDay } from '@/utils/dateUtils';

export default function AllReviewList() {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('createdAt');
  const { ref, inView } = useInView();

  const PAGE_LIMIT = 10;

  const filters = {
    genre: selectedGenre,
    location: selectedLocation,
    date: selectedDate ? hyphenYearMonthDay(selectedDate) : '',
    sortBy: selectedSort,
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery<AllReviewListProps['allReviews']>({
      queryKey: ['reviews', filters],
      queryFn: ({ pageParam = 0 }) =>
        getAllReviews({
          ...filters,
          limit: PAGE_LIMIT,
          offset: pageParam as number,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) =>
        lastPage.length < PAGE_LIMIT
          ? undefined
          : (lastPageParam as number) + PAGE_LIMIT,
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading)
    return (
      <div className="flex h-dvh items-center justify-center">Loading...</div>
    );

  const reviewsData = data?.pages.flat() || [];

  const renderReviews = () =>
    reviewsData?.length > 0 ? (
      reviewsData?.map((review) => (
        <ReviewCard
          key={review.reviewId}
          score={review.score}
          comment={review.comment}
          createdAt={review.createdAt}
          Gathering={review.gathering}
          User={review.user}
        />
      ))
    ) : (
      <EmptyElement>아직 리뷰가 없어요</EmptyElement>
    );

  return (
    <>
      <section className="relative py-12">
        <GenreFilter
          onGenreChange={setSelectedGenre}
          selectedGenre={selectedGenre}
        />
      </section>

      <section className="relative border-b-[1px] border-solid border-[#646464] pb-4 md:pb-6">
        <RatingSection selectedGenre={selectedGenre} />
      </section>

      <section className="relative top-12 pb-10">
        <ReviewFilters
          onLocatingChange={setSelectedLocation}
          onDateChange={setSelectedDate}
          onSortingChange={setSelectedSort}
        />
        <div key={selectedGenre} className="mt-10 flex flex-col gap-6">
          {renderReviews()}
        </div>
      </section>

      <div ref={ref} className="flex h-10 items-center justify-center">
        {isFetchingNextPage ? 'Loading...' : ''}
      </div>
    </>
  );
}
