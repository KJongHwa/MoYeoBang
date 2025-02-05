import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';

interface MyGatheringCardProps {
  image: string;
  children: React.ReactNode;
  isCanceled?: boolean;
  gatheringId: number;
}

export default function MyGatheringCard({
  image,
  children,
  isCanceled,
  gatheringId,
}: MyGatheringCardProps) {
  const [isError, setIsError] = useState(false);
  const [imgSrc, setImgSrc] = useState(image);

  const handleError = () => {
    setIsError(true);
    setImgSrc('/images/theme_default.png');
  };
  return (
    <figure className="relative flex w-full flex-col gap-2 rounded-2xl bg-default-tertiary md:max-h-[170px] md:flex-row">
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
        <Link href={`/gathering/${gatheringId}`}>
          <Image
            src={imgSrc}
            alt="방탈출 테마 이미지"
            width={240}
            height={170}
            quality={100}
            onError={handleError}
            className="w-full rounded-t-2xl bg-default-tertiary md:h-[170px] md:w-60 md:rounded-l-2xl md:rounded-r-none"
          />
        </Link>
      </div>
      {children}
    </figure>
  );
}
