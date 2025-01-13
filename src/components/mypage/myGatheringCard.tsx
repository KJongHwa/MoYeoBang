/* eslint-disable prettier/prettier */

'use client';

import { useState } from 'react';

import Image from 'next/image';

import { formatDate, extractHour } from '@/utils/dateUtils';

import GatheringBadge from '../gathering/GatheringBadge';
import Button from '../@shared/Button';
import MyReviewModal from './myReviewModal';

interface MyGatheringCardProps {
  location: string;
  dateTime: string;
  registrationEnd: string;
  level: string;
  name: string;
  themeName: string;
  capacity: string;
  participantCount: string;
  image: string;
}

export default function MyGatheringCard({
  location,
  dateTime,
  registrationEnd,
  level,
  name,
  themeName,
  capacity,
  participantCount,
  image,
}: MyGatheringCardProps) {
  function formatDateStatus(targetdateTime: string) {
    const currentDate = new Date();
    const targetDate = new Date(targetdateTime);
    return targetDate > currentDate ? '모임 예정' : '모임 완료';
  }
  const [isEditModal, setEditIsModal] = useState(false);
  const openEditModalHandler = () => {
    setEditIsModal(true);
  };

  return (
    <figure className="bg-default-tertiary relative flex w-full flex-col gap-2 rounded-xl md:max-h-[170px] md:flex-row">
      <Image
        src={image}
        alt="방탈출 테마 이미지"
        width={330}
        height={185}
        quality={100}
        className="bg-default-tertiary w-full rounded-t-xl md:w-60 md:rounded-l-xl md:rounded-t-none"
      />
      <div className="mx-3 my-2 flex flex-1 flex-col justify-between md:mx-6 md:my-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-1 text-sm md:gap-[6px]">
            <GatheringBadge variant="secondary">{location}</GatheringBadge>
            <GatheringBadge variant="tertiary">
              {formatDateStatus(dateTime)}
            </GatheringBadge>
            <GatheringBadge variant="primary">
              {participantCount === capacity ? (
                <span>
                  <Image
                    src="/check.png"
                    width={16}
                    height={16}
                    alt="체크 이미지"
                  />
                  일정 확정
                </span>
              ) : (
                '일정 미확정'
              )}
            </GatheringBadge>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold md:text-lg">{name}</p>
          <p className="text-xs font-light md:text-sm">{themeName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-text-secondary flex items-center gap-1 text-[10px] md:text-sm">
            <p>{formatDate(dateTime)}</p>
            <p>.</p>
            <Image
              src="/gathering_icon.png"
              width={20}
              height={20}
              alt="모임 아이콘"
            />
            <p>
              {participantCount}/{capacity}
            </p>
            <Button
              variant="secondary"
              size="small"
              font="14"
              onClick={() => openEditModalHandler()}
              style={{
                position: 'absolute',
                right: '10px',
              }}
            >
              리뷰쓰기
            </Button>
            <MyReviewModal isModal={isEditModal} setIsModal={setEditIsModal} />
          </div>
        </div>
      </div>
    </figure>
  );
}
