'use client';

import RatingSection from '@/components/allReview/RatingSection';
import ReviewGenreFilter from '@/components/allReview/ReviewGenreFilter';
import ReviewSection from '@/components/allReview/ReviewSection';
import { useState } from 'react';

export default function AllReview() {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('createdAt');

  return (
    <main className="relative mx-10 mb-5 mt-[142px] h-full xl:mx-auto xl:w-[1166px]">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">모든 리뷰</h1>
        <p className="text-sm font-medium">모여방 리뷰를 확인해 보세요</p>
      </header>

      <section className="relative py-12">
        <ReviewGenreFilter
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </section>

      <section className="relative">
        <RatingSection selectedGenre={selectedGenre} />
      </section>

      <section className="relative top-12 pb-10">
        <ReviewSection
          selectedGenre={selectedGenre}
          selectedLocation={selectedLocation}
          selectedDate={selectedDate}
          selectedSort={selectedSort}
          onLocatingChange={setSelectedLocation}
          onDateChange={setSelectedDate}
          onSortingChange={setSelectedSort}
        />
      </section>
    </main>
  );
}
