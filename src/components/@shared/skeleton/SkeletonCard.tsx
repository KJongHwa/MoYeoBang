function SkeletonCard() {
  return (
    <figure className="relative ">
      <div className="flex h-[170px] max-h-28 w-full rounded-xl bg-default-tertiary md:max-h-[170px]">
        <div className="w-28 animate-pulse rounded-l-xl bg-secondary-80 md:w-60" />
        <div className="mx-3 my-2 flex flex-1 flex-col justify-between md:mx-6 md:my-4">
          <div className="flex items-center gap-1 text-sm md:gap-[6px]">
            <div className="h-4 w-12 rounded-md bg-secondary-80 md:h-6" />
            <div className="h-4 w-12 rounded-md bg-secondary-80 md:h-6" />
            <div className="h-4 w-12 rounded-md bg-secondary-80 md:h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-3/4 rounded-md bg-secondary-80 md:h-5" />
            <div className="h-4 w-3/4 rounded-md bg-secondary-80 md:h-5 " />
          </div>
          <div className="flex-col gap-1">
            <div className="h-4 w-full rounded-md bg-secondary-80 md:h-5" />
          </div>
        </div>
      </div>
    </figure>
  );
}

export default SkeletonCard;
