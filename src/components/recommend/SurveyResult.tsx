import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { RecommendThemeDto } from '@/types/theme.types';
import { getLabelFromValue } from '@/utils/filterUtils';
import { genres } from '@/constants/themeList';
import { getRecommendTheme } from '@/axios/theme/apis';

import Button from '@/components/@shared/button/Button';
import TextFadeInMotion from '@/components/@shared/animation/TextFadeInMotion';
import RecommendCard from '@/components/recommend/RecommendCard';
import SlideUpMotion from '@/components/@shared/animation/SlideUpMotion';

interface SurveyResultProps {
  recommendTheme: RecommendThemeDto[] | null;
  resetSurvey: (isStarting: boolean) => void;
}

export default function SurveyResult({
  recommendTheme,
  resetSurvey,
}: SurveyResultProps) {
  const queryClient = useQueryClient();
  const [themeResult, setThemeResult] = useState<RecommendThemeDto | null>(
    null
  );

  // 테마 랜덤 선택
  const selectRandomTheme = (
    themes: RecommendThemeDto[],
    prevTheme: RecommendThemeDto | null
  ) => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * themes.length);
    } while (themes[randomIndex] === prevTheme);
    return themes[randomIndex];
  };

  // 모든 테마 중 랜덤으로 선택
  const handleRandomTheme = async () => {
    const response = await getRecommendTheme();
    queryClient.setQueryData(['recommend'], response);
    setThemeResult(selectRandomTheme(response, themeResult));
  };

  // 추천 테마 중 랜덤으로 선택
  const currentTheme =
    themeResult ||
    (recommendTheme && recommendTheme.length > 0
      ? selectRandomTheme(recommendTheme, null)
      : null);

  return (
    <SlideUpMotion
      distance={40}
      className="flex flex-col items-center justify-center gap-12 px-8 pb-24 font-bold text-primary-5 md:px-14 md:pb-32"
    >
      {!currentTheme || !recommendTheme || recommendTheme.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-12 pt-8">
          <section className="flex w-full flex-col items-center gap-12">
            <h1 className="text-center text-sm md:text-2xl">
              취향에 맞는 테마를 찾지 못했어요.
            </h1>
            <Image
              src="/images/recommend_empty.png"
              alt="추천 테마 결과 없음"
              width={295}
              height={321}
              quality={100}
              className="h-1/2 w-1/2 xl:h-[321px] xl:w-[295px]"
            />
            <div className="relative w-full md:px-4 xl:w-1/2">
              <p className="z rounded-md bg-badge-default px-6 py-2 text-center text-sm font-medium md:text-lg">
                [상관없어요]를 선택하면 테마를 찾을 확률이 증가해요!
              </p>
              <Image
                src="/icons/arrow_purple.svg"
                alt="보라색 화살표 아이콘"
                width={24}
                height={16}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 transform"
              />
            </div>
          </section>
          <section className="flex w-full flex-col gap-2 xl:w-1/2">
            <Button
              variant="grayscale"
              shape="default"
              className="w-full border-2 bg-secondary-90 py-3 text-[10px] md:border-4 md:py-6 md:text-2xl"
              onClick={() => resetSurvey(false)}
            >
              다시하기
            </Button>
            {/* <Button
              variant="grayscale"
              shape="default"
              className="w-full border-2 bg-secondary-90 py-3 text-sm md:border-4 md:py-6 md:text-2xl"
              onClick={handleRandomTheme}
            >
              랜덤 테마 추천받기
            </Button> */}
          </section>
        </div>
      ) : (
        currentTheme && (
          <>
            <section className="flex flex-col items-center justify-center gap-5 md:gap-10">
              <div className="mt-8 text-nowrap text-center text-xs md:text-2xl">
                운명은 이미 정해졌어요. <br className="xl:hidden" />
                <TextFadeInMotion>
                  {getLabelFromValue(currentTheme.genre, genres)}의 세계로
                  초대합니다.
                </TextFadeInMotion>
              </div>
            </section>
            <section className="flex w-full justify-center">
              <RecommendCard themeResult={currentTheme} />
            </section>
            <section className="flex w-full flex-col gap-2">
              <Link
                href={`/search/keyword=${encodeURIComponent(currentTheme.name)}`}
              >
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
          </>
        )
      )}
    </SlideUpMotion>
  );
}
