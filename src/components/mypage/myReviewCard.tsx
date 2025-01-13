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

  const li_dropdowns = [
    { label: '수정하기', clickHandler: openEditModalHandler },
    { label: '삭제하기', clickHandler: openDeleteModalHandler },
  ];

  return (
    <article className="bg-default-tertiary relative flex w-full flex-col gap-2 rounded-xl md:max-h-[200px] md:flex-row xl:max-h-[170px]">
      <Image
        src={Gathering.image}
        alt={Gathering.themeName}
        width={240}
        height={170}
        quality={100}
        className="bg-default-tertiary w-full rounded-t-xl md:w-60 md:rounded-l-xl md:rounded-t-none"
      />

      <div className="mx-3 my-2 flex flex-1 flex-col justify-between md:mx-6 md:my-4">
        <div className="flex flex-col gap-[7px]">
          <div className="group relative flex items-center justify-between">
            <Rating rating={score} width={120} height={24} />
            <div className="relative">
              <Image
                src={'/see_more_icon.png'}
                width={24}
                height={24}
                alt="드롭다운 클릭 버튼"
                className="cursor-pointer"
              />
              <ul className="bg-secondary-80 -right-15 absolute top-full z-50 mt-2 hidden w-32 rounded-md shadow-md group-hover:pointer-events-auto group-hover:block">
                {li_dropdowns.map((li_dropdown) => (
                  <li
                    key={li_dropdown.label}
                    onClick={li_dropdown.clickHandler}
                    className="hover:bg-secondary-60 cursor-pointer px-4 py-2"
                  >
                    {li_dropdown.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="text-xs font-medium text-[#b5b5b5]">
            {Gathering.themeName}
          </h2>
          <p className="text-sm font-medium text-white md:mt-5">{comment}</p>
        </div>
        {/* <div className="mt-3 flex gap-3">
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
        </div> */}
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
