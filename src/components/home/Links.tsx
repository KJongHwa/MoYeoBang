import LinkCard from './UI/LinkCard';

export default function Links() {
  return (
    <section className="mx-auto flex h-full max-w-6xl flex-col px-4 pb-28 pt-20 md:pb-36 md:pt-28 xl:px-0 xl:pb-40 xl:pt-32">
      <div className="flex w-full flex-col gap-7 xl:flex-row">
        <LinkCard
          description="방탈출 리뷰를 확인해보세요!"
          href="/allreview"
          src="/images/puzzle_review.png"
          alt="리뷰하는 퍼즐 아이콘"
        />
        <LinkCard
          description="찜한 모임 잊지 않으셨죠?"
          href="/likes"
          src="/images/puzzle_likes.png"
          alt="찜하는 퍼즐 아이콘"
        />
      </div>
    </section>
  );
}
