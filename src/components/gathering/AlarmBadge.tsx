import Image from 'next/image';

interface AlarmBadgeProps {
  hour: number;
}

export default function AlarmBadge({ hour }: AlarmBadgeProps) {
  return (
    <div className="absolute left-2 top-2 flex h-[17px] items-center rounded-full bg-point-tag pl-1 pr-2 md:h-8 md:px-2">
      <Image
        src="/icons/alarm.svg"
        alt="알람 아이콘"
        width={24}
        height={24}
        quality={100}
        className="h-[14px] w-[14px] md:h-6 md:w-6"
      />
      <span className="ml-1 text-[10px] md:text-xs">오늘 {hour}시 마감</span>
    </div>
  );
}
