'use client';

import { AllReviewListProps } from '@/types/review.types';
import { useState } from 'react';
import { hyphenYearMonthDay } from '@/utils/dateUtils';
import ReviewCard from './ReviewCard';
import ReviewFilters from './ReviewFilters';
import EmptyElement from '../@shared/EmptyElement';
import GenreFilter from '../@shared/GenreFilter';
import RatingSection from './RatingSection';

export default function AllReviewList({ allReviews }: AllReviewListProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('createdAt');

  const filteredReviews = allReviews
    .filter((review) => {
      const genreMatches =
        selectedGenre === 'all' || review.Gathering.genre === selectedGenre;
      const locationMatches =
        selectedLocation === 'all' ||
        review.Gathering.location === selectedLocation;
      const dateMatches =
        selectedDate === '' ||
        hyphenYearMonthDay(review.createdAt) === selectedDate;
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
          return b.Gathering.participantCount - a.Gathering.participantCount;
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
        Gathering={review.Gathering}
        User={review.User}
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
