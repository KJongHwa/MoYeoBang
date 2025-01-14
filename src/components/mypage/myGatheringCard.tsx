/* eslint-disable prettier/prettier */

'use client';

import Image from 'next/image';

interface MyGatheringCardProps {
  image: string;
  children: React.ReactNode;
}

export default function MyGatheringCard({
  image,
  children,
}: MyGatheringCardProps) {
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
      {children}
    </figure>
  );
}
