import Link from 'next/link';

import type { RecommendThemeDto } from '@/types/theme.types';
import { getLabelFromValue } from '@/utils/filterUtils';
import { genres } from '@/constants/themeList';

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
  // 랜덤 추천 테마 선택
  const randomIndex = Math.floor(Math.random() * (recommendTheme?.length || 0));
  const themeResult =
    recommendTheme && recommendTheme.length > 0
      ? recommendTheme[randomIndex]
      : null;

  return (
    <SlideUpMotion
      distance={40}
      className="flex flex-col items-center justify-center gap-12 px-8 pb-24 font-bold text-primary-5 md:px-14 md:pb-32"
    >
      {!themeResult || !recommendTheme || recommendTheme.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-12 pt-8">
          <section className="flex w-full flex-col gap-12">
            <h1 className="text-center text-lg">
              취향에 맞는 테마를 찾지 못했어요.
            </h1>
            <h1 className="text-center text-lg">
              다시 해보실래요? <br />
              <span className="text-xs font-medium text-secondary-50">
                [상관없어요]를 선택할 시 테마를 찾을 확률이 증가합니다.
              </span>
            </h1>
          </section>
          <section className="flex w-full">
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
      ) : (
        themeResult && (
          <>
            <section className="flex flex-col items-center justify-center gap-5 md:gap-10">
              <div className="mt-8 text-nowrap text-center text-xs md:text-2xl">
                운명은 이미 정해졌어요. <br className="xl:hidden" />
                <TextFadeInMotion>
                  {getLabelFromValue(themeResult.genre, genres)}의 세계로
                  초대합니다.
                </TextFadeInMotion>
              </div>
            </section>
            <section className="flex w-full justify-center">
              <RecommendCard themeResult={themeResult} />
            </section>
            <section className="flex w-full flex-col gap-2">
              <Link
                href={`/search/keyword=${encodeURIComponent(themeResult.name)}`}
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
