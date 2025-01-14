import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="flex h-screen w-screen items-center justify-center pt-12 text-center md:pt-14">
      <div className="flex flex-1 flex-col items-center gap-8 md:gap-14 xl:flex-none xl:flex-row xl:items-start xl:gap-6">
        <div>
          <h1 className="text-4xl font-bold">404</h1>
          <p className="my-4">요청하신 페이지가 존재하지 않습니다.</p>
        </div>
        <Image
          src="/puzzle_empty.png"
          alt="빈 퍼즐 캐릭터"
          width={232}
          height={256}
          quality={100}
          className="ml-56 h-[137px] w-[125px] md:ml-64 md:h-[210px] md:w-[191px] xl:ml-0 xl:h-[256px] xl:w-[232px]"
        />
      </div>
    </main>
  );
}
