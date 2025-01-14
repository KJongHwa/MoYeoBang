'use client';

import HeaderTitle from '@/components/@shared/HeaderTitle';
import PageContainer from '@/components/@shared/PageContainer';
import RatingSection from '@/components/allReview/RatingSection';
import ReviewSection from '@/components/allReview/ReviewSection';
import GenreFilter from '@/components/@shared/GenreFilter';
import { useState } from 'react';

export default function AllReview() {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('createdAt');

  return (
    <PageContainer>
      <HeaderTitle title="모든 리뷰" content="모여방 리뷰를 확인해 보세요" />

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
    </PageContainer>
  );
}
