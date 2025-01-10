'use client';

import { useState } from 'react';

import { ReviewDto } from '@/types/review.types';
import { yearMonthDay } from '@/utils/dateUtils';
import Image from 'next/image';
import Rating from '../@shared/Rating';
import Button from '../@shared/Button';
import MyReviewModal from './myReviewModal';

export default function MyReviewCard({
  score,
  comment,
  createdAt,
  Gathering,
  User,
}: ReviewDto['get']) {
  const [isModal, setIsModal] = useState(false);

  const openModalHandler = () => {
    setIsModal(true);
  };
  return (
    <article className="flex w-full flex-col gap-6 rounded-[20px] bg-[#2e2e2e] md:flex-row md:gap-5">
      <div className="relative h-[156px] w-full md:h-[172px] md:w-[320px]">
        <Image
          src={Gathering.image}
          alt={Gathering.themeName}
          fill
          className="rounded-[20px]"
        />
      </div>
      <div className="flex flex-col justify-center gap-[13px] p-4 md:w-[723px] md:p-0 md:px-10">
        <div className="flex flex-col gap-[7px]">
          <Rating rating={score} width={120} height={24} />
          <h2 className="text-xs font-medium text-[#b5b5b5]">
            {Gathering.themeName}
          </h2>
          <p className="text-sm font-medium text-white">{comment}</p>
        </div>
        <div className="mt-3 flex gap-3">
          <Button
            variant="secondary"
            size="large"
            font="14"
            onClick={() => openModalHandler()}
          >
            수정하기
          </Button>
          <Button variant="primary" size="large" font="14" disabled>
            삭제하기
          </Button>
        </div>
      </div>
      <MyReviewModal
        isModal={isModal}
        setIsModal={setIsModal}
        comment={comment}
        score={score}
      />
    </article>
  );
}
