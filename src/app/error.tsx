'use client';

import Image from 'next/image';

interface ErrorPageProps {
  error?: Error & { digest?: string };
  reset?: () => void;
  errorCode: string;
  errorMessage: string;
}

export default function ErrorPage({
  error,
  reset,
  errorCode = '에러 발생!',
  errorMessage = '알 수 없는 에러가 발생했습니다.',
}: ErrorPageProps) {
  return (
    <main className="flex h-screen w-screen items-center justify-center pt-12 text-center md:pt-14">
      <div className="flex flex-1 flex-col items-center gap-8 md:gap-14 xl:flex-none xl:flex-row xl:items-start xl:gap-6">
        <div>
          <h1 className="text-4xl font-bold">
            {error ? error.name : errorCode}
          </h1>
          <p className="my-4">{error ? error.message : errorMessage}</p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="ml-56 md:ml-64 xl:ml-0"
        >
          <Image
            src="/puzzle_empty.png"
            alt="빈 퍼즐 캐릭터"
            width={232}
            height={256}
            quality={100}
            className="h-[137px] w-[125px] md:h-[210px] md:w-[191px] xl:h-[256px] xl:w-[232px]"
          />
        </button>
      </div>
    </main>
  );
}
