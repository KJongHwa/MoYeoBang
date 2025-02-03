import SkeletonCard from './SkeletonCard';

function SkeletonCardList() {
  return (
    <section className="grid h-full w-full grid-cols-1 grid-rows-2 gap-4 md:gap-7 xl:grid-cols-2 xl:grid-rows-2 xl:gap-9">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </section>
  );
}

export default SkeletonCardList;
