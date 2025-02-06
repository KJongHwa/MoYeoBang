'use client';

import { useState } from 'react';

import { SurveyUrlParams } from '@/types/gathering.types';
import Image from 'next/image';

import SurveyIntro from '@/components/recommend/SurveyIntro';
import Survey from '@/components/recommend/Survey';
import SurveyResult from '@/components/recommend/SurveyResult';

export default function Recommend() {
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendedTheme, setRecommendedTheme] =
    useState<SurveyUrlParams | null>(null);

  const resetSurvey = (isStarting: boolean) => {
    setSurveyStarted(isStarting);
    setRecommendedTheme(null);
    setAnswers([]);
  };

  const handleSurveyComplete = (theme: SurveyUrlParams) => {
    setSurveyStarted(false);
    setRecommendedTheme(theme);
    setAnswers([]);
  };

  return (
    <div className="mx-auto flex h-dvh max-w-[1166px] flex-col px-4 md:px-6 xl:px-0">
      <header className="relative mt-32 flex w-full items-center justify-center md:mt-24">
        <div className="flex gap-2">
          <Image
            src="/images/puzzle_wow.png"
            alt="방탈출 추천 퍼즐 캐릭터"
            width={152}
            height={152}
            className="static mt-auto h-16 w-16 md:absolute md:bottom-0 md:left-1/5 md:h-32 md:w-32 xl:h-[152px] xl:w-[152px]"
          />
          <h1 className="py-5 text-lg font-semibold md:py-12 md:text-2xl xl:py-16">
            방탈출 취향 테스트
          </h1>
        </div>
      </header>
      <main className="h-dvh w-full rounded-t-2xl bg-secondary-90">
        {!surveyStarted && !recommendedTheme && (
          <SurveyIntro resetSurvey={resetSurvey} />
        )}

        {surveyStarted && !recommendedTheme && (
          <Survey onComplete={handleSurveyComplete} />
        )}

        {recommendedTheme && (
          <SurveyResult
            recommendedTheme={recommendedTheme}
            resetSurvey={resetSurvey}
          />
        )}
      </main>
    </div>
  );
}
