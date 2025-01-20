import Image from 'next/image';
import { locationList } from '@/constants/themeList';
import Button from '@/components/@shared/Button';

interface GatheringMainSectionProps {
  image: string;
  name: string;
  themeName: string;
  synopsis: string;
  location: string;
}

export default function GatheringMainSection({
  image,
  name,
  themeName,
  synopsis,
  location,
}: GatheringMainSectionProps) {
  const locationLabel =
    locationList.find((item) => item.value === location)?.label || location;

  return (
    <div className="flex gap-6">
      {/* 메인 콘텐츠 섹션 */}
      <section className="flex-1">
        <div className="relative h-[415px] w-[805px] overflow-hidden">
          <Image
            src={image}
            alt={themeName}
            layout="fill"
            sizes="(max-width: 800px) 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-6 space-y-6">
          {/* 위치 정보 */}
          <div className="flex items-center gap-2">
            <Image
              src="/icons/location.svg"
              width={24}
              height={24}
              alt="위치 아이콘"
            />
            <span className="text-white">{locationLabel}</span>
          </div>

          {/* 테마 정보 */}
          <div className="space-y-6">
            <div className="flex items-baseline gap-4">
              <h3 className="min-w-[80px] text-secondary-50">테마명</h3>
              <span>{name}</span>
            </div>

            <div className="flex items-baseline gap-4">
              <h3 className="min-w-[80px] text-secondary-50">시놉시스</h3>
              <p className="whitespace-pre-line">{synopsis}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
