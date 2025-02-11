'use client';

import Image from 'next/image';
import { locationList } from '@/constants/themeList';
import Button from '@/components/@shared/button/Button';
import Toast from '@/components/@shared/Toast';
import { useState, useEffect } from 'react';
import GatheringBadge from '../gathering/UI/GatheringBadge';

interface GatheringMainSectionProps {
  gatheringId: number;
  image: string;
  name: string;
  themeName: string;
  location: string;
  level: 'high' | 'middle' | 'low';
  dateTime: string;
}

export default function GatheringMainSection({
  gatheringId,
  image,
  name,
  themeName,
  location,
  level,
  dateTime,
}: GatheringMainSectionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const locationLabel =
    locationList.find((item) => item.value === location)?.label || location;

  useEffect(() => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const favoritesList = JSON.parse(favorites);
      setIsLiked(favoritesList.includes(gatheringId));
    }
  }, [gatheringId]);

  useEffect(
    function T() {
      if (showToast) {
        const timer = setTimeout(() => {
          setShowToast(false);
        }, 3000);

        return function cleanup() {
          clearTimeout(timer);
        };
      }
    },
    [showToast]
  );

  const handleLike = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return;
    }

    const favorites = localStorage.getItem('favorites');
    let favoritesList = favorites ? JSON.parse(favorites) : [];

    if (isLiked) {
      favoritesList = favoritesList.filter((id: number) => id !== gatheringId);
    } else {
      favoritesList.push(gatheringId);
    }

    localStorage.setItem('favorites', JSON.stringify(favoritesList));
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('공유하기 실패:', error);
    }
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
    <>
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
                  src={
                    isLiked ? '/icons/HeartFull.svg' : '/icons/heart_empty.svg'
                  }
                  width={24}
                  height={24}
                  alt={isLiked ? '찜하기 취소' : '찜하기'}
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
          </div>
        </section>
      </div>

      {/* Toast 알림 */}
      {showToast && <Toast message="URL이 복사되었습니다" type="success" />}
    </>
  );
}
