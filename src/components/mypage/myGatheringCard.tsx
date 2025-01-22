/* eslint-disable prettier/prettier */

'use client';

import Image from 'next/image';
import clsx from 'clsx';

interface MyGatheringCardProps {
  image: string;
  children: React.ReactNode;
  isCanceled: boolean;
}

export default function MyGatheringCard({
  image,
  children,
  isCanceled,
}: MyGatheringCardProps) {
  return (
    <figure className="bg-default-tertiary relative flex w-full flex-col gap-2 rounded-2xl md:max-h-[170px] md:flex-row">
      {isCanceled && (
        <p className="absolute left-20 top-40  text-[18px] font-bold text-white md:left-3 md:top-16 ">
          모집 취소된 모임이에요.
        </p>
      )}
      <div
        className={clsx(
          'relative rounded-t-2xl md:max-w-[192px] md:rounded-l-2xl md:rounded-r-none',
          {
            'bg-status-hover opacity-60 ': isCanceled,
          }
        )}
      >
        <Image
          src={image}
          alt="방탈출 테마 이미지"
          width={240}
          height={170}
          quality={100}
          className="bg-default-tertiary w-full rounded-t-2xl md:max-h-[170px] md:w-60 md:rounded-l-2xl md:rounded-r-none"
        />
      </div>
      {children}
    </figure>
  );
}
