function SkeletonSlot() {
  return (
    <figure className="relative col-span-1 row-span-1 max-h-80 w-full rounded-2xl bg-secondary-80 md:h-96 md:max-h-96 xl:max-h-[317px] xl:max-w-[358px]">
      <div className="absolute left-4 top-4 flex h-8 w-1/3 animate-pulse items-center rounded-full bg-default-tertiary" />
      <div className="h-[317px] w-full rounded-2xl" />
      <div className="absolute bottom-16 left-4 h-6 w-1/6 animate-pulse rounded-full bg-secondary-70 " />
      <div className="absolute bottom-0 w-full rounded-b-2xl bg-default-tertiary px-5 py-[10px]">
        <div className="h-5 w-2/3 animate-pulse rounded-md bg-secondary-80 md:h-6" />
      </div>
    </figure>
  );
}

export default SkeletonSlot;
