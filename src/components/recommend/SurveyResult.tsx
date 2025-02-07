import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { SurveyUrlParams } from '@/types/gathering.types';
import { getLabelFromValue } from '@/utils/filterUtils';
import { genres, levels, locationList } from '@/constants/themeList';

import Button from '@/components/@shared/button/Button';
import LevelBadge from '@/components/gathering/UI/LevelBadge';
import GatheringBadge from '@/components/gathering/UI/GatheringBadge';
import TextFadeInMotion from '@/components/@shared/animation/TextFadeInMotion';
import SlideUpMotion from '@/components/@shared/animation/SlideUpMotion';

interface SurveyResultProps {
  recommendedTheme: SurveyUrlParams | null;
  resetSurvey: (isStarting: boolean) => void;
}

export default function SurveyResult({
  recommendedTheme,
  resetSurvey,
}: SurveyResultProps) {
  if (!recommendedTheme) return null;

  const [isError, setIsError] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const handleError = () => {
    setIsError(true);
    setImgSrc('/images/theme_default_xl.png');
  };

  // 선택된 값 포맷팅
  const labels = {
    genre: getLabelFromValue(recommendedTheme.genre, genres),
    level: getLabelFromValue(recommendedTheme.level, levels),
    location: getLabelFromValue(recommendedTheme.location, locationList),
  };

  // 추천 테마 제목 URL 인코딩
  const encodedThemeName = encodeURIComponent(recommendedTheme.name);

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-8 pb-24 font-bold text-primary-5 md:px-14 md:pb-32">
      <section className="flex flex-col items-center justify-center gap-5 md:gap-10">
        <div className="mt-8 text-nowrap text-center text-xs md:text-2xl">
          운명은 이미 정해졌어요. <br className="xl:hidden" />
          <TextFadeInMotion>
            {labels.genre}의 세계로 초대합니다.
          </TextFadeInMotion>
        </div>
      </section>
      <section className="flex w-full justify-center">
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
                <LevelBadge level={recommendedTheme.level}>
                  {labels.level}
                </LevelBadge>
                <GatheringBadge>{labels.genre}</GatheringBadge>
                <GatheringBadge>{recommendedTheme.playtime}</GatheringBadge>
                <GatheringBadge>{labels.location}</GatheringBadge>
              </div>
              <div className="">
                <p className="animate-bounce text-base text-secondary-5 md:text-lg">
                  {recommendedTheme.name}
                </p>
                <p className="text-xs font-medium text-secondary-50 md:text-sm">
                  시놉시스
                </p>
              </div>
            </div>
          </div>
        </SlideUpMotion>
      </section>
      <section className="flex w-full flex-col gap-2 ">
        <Link href={`/search/keyword=${encodedThemeName}`}>
          <Button
            shape="default"
            className="w-full border-2 border-primary-5 bg-secondary-90 py-3 text-sm md:border-4 md:py-6 md:text-2xl"
            onClick={() => resetSurvey(false)}
          >
            추천 테마 참여하기
          </Button>
        </Link>
        <Button
          variant="grayscale"
          shape="default"
          className="w-full border-2 bg-secondary-90 py-3 text-sm md:border-4 md:py-6 md:text-2xl"
          onClick={() => resetSurvey(false)}
        >
          다시하기
        </Button>
      </section>
    </div>
  );
}
