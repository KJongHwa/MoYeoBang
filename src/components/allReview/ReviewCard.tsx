import { ReviewDto } from '@/types/review.types';
import { yearMonthDay } from '@/utils/dateUtils';
import Image from 'next/image';
import Rating from '@/components/@shared/rating/Rating';
import { useState } from 'react';

export default function ReviewCard({
  score,
  comment,
  createdAt,
  Gathering,
  User,
}: ReviewDto['get']) {
  const [imgSrc, setImgSrc] = useState(Gathering.image);
  const [selected, setSelected] = useState(false);

  const handleError = () => {
    setImgSrc('/images/theme_default.png');
  };

  const handleMoreReview = () => {
    setSelected(!selected);
  };

  return (
    <div
      className="flex w-full cursor-pointer flex-col rounded-[20px] bg-secondary-100 md:flex-row"
      onClick={handleMoreReview}
    >
      <div className="relative flex min-w-[185px] md:min-w-[330px]">
        <Image
          src={imgSrc}
          alt={Gathering.themeName}
          width={330}
          height={185}
          quality={100}
          priority
          onError={handleError}
          className={`w-full rounded-t-[20px] object-cover md:rounded-l-[20px] md:rounded-r-[0px] ${selected ? '' : 'max-h-[185px]'}`}
        />
        <div className="absolute bottom-6 left-4 flex h-6 w-[54px] items-center gap-1 rounded-full bg-[#3E404C] pl-[6px] pr-[9px]">
          <Image src="/icons/human.svg" alt="참여인원" width={24} height={24} />
          <p className="text-sm font-medium">{Gathering.participantCount}</p>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-[13px] px-[25px] py-5">
        <div className="flex flex-col gap-2">
          <Rating rating={score} width={120} height={24} />
          <h2 className="pb-3 text-xs font-medium text-secondary-50">
            {Gathering.themeName}
          </h2>
          <p
            className={`text-sm font-medium text-white ${selected ? '' : 'line-clamp-2 overflow-hidden'}`}
          >
            {comment}
          </p>
        </div>
        <div className="flex items-center justify-end">
          <Image
            src={User.image}
            alt={User.nickname}
            width={24}
            height={24}
            quality={100}
            className="rounded-full"
          />
          <p className="border-r border-secondary-50 px-[5px] text-xs font-medium text-secondary-50">
            {User.nickname}
          </p>
          <p className="pl-[5px] text-xs font-medium text-secondary-50">
            {yearMonthDay(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
