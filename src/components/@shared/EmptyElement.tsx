import Image from 'next/image';
import PuzzleImage from '@/public/images/puzzle_empty.png';
import { ReactNode } from 'react';

interface EmptyElementProps {
  children: ReactNode;
}

export default function EmptyElement({ children }: EmptyElementProps) {
  return (
    <div className="relative mt-20 h-[187px] text-center md:h-[260px] xl:h-[306px]">
      <p className="text-base font-medium text-text-secondary">{children}</p>
      <Image
        src={PuzzleImage}
        alt="퍼즐 캐릭터"
        width={232}
        height={256}
        className="absolute right-10 top-16 h-[137px] w-[125px] md:right-1/5 md:h-[210px] md:w-[191px] xl:h-[256px] xl:w-[232px]"
      />
    </div>
  );
}
