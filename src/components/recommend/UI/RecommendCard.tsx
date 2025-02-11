import Image from 'next/image';
import { useState } from 'react';

import type { RecommendThemeDto } from '@/types/theme.types';
import { getLabelFromValue } from '@/utils/filterUtils';
import { genres, levels, locationList } from '@/constants/themeList';

import LevelBadge from '@/components/gathering/UI/LevelBadge';
import GatheringBadge from '@/components/gathering/UI/GatheringBadge';
import SlideUpMotion from '@/components/@shared/animation/SlideUpMotion';

interface RecommendCardProps {
  themeResult: RecommendThemeDto;
}

export default function RecommendCard({ themeResult }: RecommendCardProps) {
  const [isError, setIsError] = useState(false);
  const [imgSrc, setImgSrc] = useState(themeResult.image);

  const handleError = () => {
    setIsError(true);
    setImgSrc('/images/theme_default_xl.png');
  };

  return (
    <SlideUpMotion>
      <div className="h-full max-w-[274px] rounded-2xl bg-default-tertiary md:max-w-[360px]">
        <Image
          src={imgSrc}
          alt="방탈출 테마 이미지"
          width={360}
          height={210}
          quality={100}
          className={`h-48 rounded-t-2xl object-cover md:h-52 ${isError ? '' : ''}`}
          onError={handleError}
        />
        <div className="flex flex-col gap-5 p-5">
          <div className="flex gap-1 text-xs md:text-2xl">
            <LevelBadge level={themeResult.level}>
              {getLabelFromValue(themeResult.level, levels)}
            </LevelBadge>
            <GatheringBadge>
              {getLabelFromValue(themeResult.genre, genres)}
            </GatheringBadge>
            <GatheringBadge>{themeResult.playtime}</GatheringBadge>
            <GatheringBadge>
              {getLabelFromValue(themeResult.location, locationList)}
            </GatheringBadge>
          </div>
          <div>
            <p className="animate-bounce text-base text-secondary-5 md:text-lg">
              {themeResult.name}
            </p>
            <p className="text-xs font-medium text-secondary-50 md:text-sm">
              {themeResult.synopsis}
            </p>
          </div>
        </div>
      </div>
    </SlideUpMotion>
  );
}
