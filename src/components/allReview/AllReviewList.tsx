'use client';

import { AllReviewListProps } from '@/types/review.types';
import { useState } from 'react';
import { slashYearMonthDay } from '@/utils/dateUtils';
import ReviewCard from '@/components/allReview/ReviewCard';
import ReviewFilters from '@/components/allReview/ReviewFilters';
import EmptyElement from '@/components/@shared/EmptyElement';
import GenreFilter from '@/components/@shared/GenreFilter';
import RatingSection from '@/components/allReview/RatingSection';
import { useQuery } from '@tanstack/react-query';
import { getAllReviews } from '@/axios/allReview/apis';

export default function AllReviewList() {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('createdAt');

  const { data: reviewsData = [], isLoading } = useQuery<
    AllReviewListProps['allReviews']
  >({
    queryKey: ['reviews'],
    queryFn: () => getAllReviews(selectedGenre),
  });

  if (isLoading)
    return (
      <div className="flex h-dvh items-center justify-center">Loading...</div>
    );

  const filteredReviews = reviewsData
    .filter((review) => {
      const genreMatches =
        selectedGenre === 'all' || review.gathering.genre === selectedGenre;
      const locationMatches =
        selectedLocation === 'all' ||
        review.gathering.location === selectedLocation;
      const dateMatches =
        selectedDate === '' ||
        slashYearMonthDay(review.createdAt) === selectedDate;
      return genreMatches && locationMatches && dateMatches;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case 'createdAt':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case 'score':
          return b.score - a.score;
        case 'participantCount':
          return b.gathering.participantCount - a.gathering.participantCount;
        default:
          return 0;
      }
    });

  const renderReviews = () => {
    if (filteredReviews.length === 0) {
      return <EmptyElement>아직 리뷰가 없어요</EmptyElement>;
    }
    return filteredReviews.map((review) => (
      <ReviewCard
        key={review.reviewId}
        score={review.score}
        comment={review.comment}
        createdAt={review.createdAt}
        Gathering={review.gathering}
        User={review.user}
      />
    ));
  };

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
    </>
  );
}
