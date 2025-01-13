/* eslint-disable prettier/prettier */

'use client';

import { useState } from 'react';

import { ReviewDto } from '@/types/review.types';
import { yearMonthDay } from '@/utils/dateUtils';
import Image from 'next/image';
import Rating from '../@shared/Rating';
import Button from '../@shared/Button';
import MyReviewModal from './myReviewModal';
import DeleteModal from './deleteModal';

export default function MyReviewCard({
  score,
  comment,
  createdAt,
  Gathering,
  User,
}: ReviewDto['get']) {
  const [isEditModal, setEditIsModal] = useState(false);
  const [isDeleteModal, setDeleteIsModal] = useState(false);
  const openEditModalHandler = () => {
    setEditIsModal(true);
  };
  const openDeleteModalHandler = () => {
    setDeleteIsModal(true);
  };
  return (
    <article className="relative flex max-h-[170px] w-full flex-col gap-6 rounded-xl bg-[#2e2e2e] md:flex-row md:gap-5">
      <Image
        src={Gathering.image}
        alt={Gathering.themeName}
        width={240}
        height={170}
        quality={100}
        className="bg-brand-secondary w-28 rounded-l-xl md:w-60"
      />

      <div className="mx-3 my-2 flex flex-1 flex-col justify-between md:mx-6 md:my-4">
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
            size="small"
            font="14"
            onClick={() => openEditModalHandler()}
          >
            수정하기
          </Button>
          <Button
            variant="primary"
            size="small"
            font="14"
            onClick={() => openDeleteModalHandler()}
          >
            삭제하기
          </Button>
        </div>
      </div>
      <MyReviewModal
        isModal={isEditModal}
        setIsModal={setEditIsModal}
        comment={comment}
        score={score}
      />
      <DeleteModal isModal={isDeleteModal} setIsModal={setDeleteIsModal} />
    </article>
  );
}
