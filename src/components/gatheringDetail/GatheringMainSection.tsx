import Image from 'next/image';
import { locationList } from '@/constants/themeList';
import Button from '@/components/@shared/button/Button';
import GatheringBadge from '../gathering/UI/GatheringBadge';

interface GatheringMainSectionProps {
  image: string;
  name: string;
  themeName: string;
  synopsis: string;
  location: string;
  level: 'high' | 'middle' | 'low';
  dateTime: string;
}

export default function GatheringMainSection({
  image,
  name,
  themeName,
  synopsis,
  location,
  level,
  dateTime,
}: GatheringMainSectionProps) {
  const locationLabel =
    locationList.find((item) => item.value === location)?.label || location;

  const handleLike = () => {
    console.log('like clicked');
  };

  const handleShare = () => {
    console.log('share clicked');
  };

  const levelIcons = {
    high: { src: '/icons/graph_high.svg', alt: '고급 난이도 아이콘' },
    middle: { src: '/icons/graph_middle.svg', alt: '중급 난이도 아이콘' },
    low: { src: '/icons/graph_low.svg', alt: '초급 난이도 아이콘' },
  };

  const levelLabels = {
    high: '고급',
    middle: '중급',
    low: '초급',
  } as const;

  return (
    <div className="flex gap-6">
      <section className="flex-1">
        <div className="relative h-[415px] w-[805px] overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={themeName}
            layout="fill"
            sizes="(max-width: 800px) 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <GatheringBadge
              shape="round"
              icon={level as keyof typeof levelIcons}
            >
              {levelLabels[level as keyof typeof levelLabels]}
            </GatheringBadge>
            <GatheringBadge shape="round">{locationLabel}</GatheringBadge>
            <GatheringBadge shape="round">
              {new Date(dateTime).toLocaleDateString('ko-KR', {
                month: 'long',
                day: 'numeric',
              })}
            </GatheringBadge>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="icon" onClick={handleLike}>
              <Image
                src="/icons/heart_empty.svg"
                width={24}
                height={24}
                alt="좋아요"
              />
            </Button>
            <Button variant="icon" onClick={handleShare}>
              <Image
                src="/icons/share.svg"
                width={24}
                height={24}
                alt="공유하기"
              />
            </Button>
          </div>
        </div>

        <div className="mt-6 border-b border-secondary-80" />

        <h1 className="font-noto mt-6 text-[26px] leading-[28px] text-white">
          {name}
        </h1>

        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/location.svg"
              width={24}
              height={24}
              alt="위치 아이콘"
            />
            <span className="text-white">{locationLabel}</span>
          </div>

          <div className="space-y-6">
            <div className="flex items-baseline gap-4">
              <h3 className="min-w-[100px] text-secondary-50">테마명</h3>
              <span>{themeName}</span>
            </div>

            <div className="flex items-baseline gap-4">
              <h3 className="min-w-[100px] text-secondary-50">시놉시스</h3>
              <p className="whitespace-pre-line">{synopsis}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
