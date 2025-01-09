export default function ReviewFilters() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <ul className="flex h-10 w-[110px] items-center justify-center rounded-lg border-2 border-[#313131] bg-[#2c2c2c] text-sm font-medium text-[#d0d0d0]">
          지역 전체
        </ul>
        <ul className="flex h-10 w-[110px] items-center justify-center rounded-lg border-2 border-[#313131] bg-[#2c2c2c] text-sm font-medium text-[#d0d0d0]">
          날짜 전체
        </ul>
      </div>
      <ul className="flex h-10 w-[90px] items-center justify-center rounded-lg border-2 border-[#313131] bg-[#2c2c2c] text-sm font-medium text-[#d0d0d0]">
        최신순
      </ul>
    </div>
  );
}
