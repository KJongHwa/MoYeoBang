'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { RecommendUrlParams } from '@/types/theme.types';
import { getRecommendTheme } from '@/axios/theme/apis';
import Image from 'next/image';

import SurveyIntro from '@/components/recommend/SurveyIntro';
import Survey from '@/components/recommend/Survey';
import SurveyResult from '@/components/recommend/SurveyResult';
import Spinner from '@/components/@shared/Spinner';
import FadeInMotion from '@/components/@shared/animation/FadeInMotion';

export default function Recommend() {
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [surveyResult, setSurveyResult] = useState<RecommendUrlParams | null>(
    null
  );

  const { data: recommendTheme, isLoading } = useQuery({
    queryKey: ['recommend', surveyResult],
    queryFn: async () => {
      if (!surveyResult) {
        return null;
      }

      const response = await getRecommendTheme(surveyResult);
      return response;
    },
  });

  const resetSurvey = (isStarting: boolean) => {
    setSurveyStarted(isStarting);
    setSurveyResult(null);
    setAnswers([]);
  };

  const handleSurveyComplete = (result: RecommendUrlParams) => {
    setSurveyStarted(false);
    setSurveyResult(result);
    setAnswers([]);
  };

  return (
    <div className="mx-auto flex h-dvh max-w-[1166px] flex-col px-4 md:px-6 xl:px-0">
      <title>모여방 | 방탈출 테마 취향 테스트</title>
      <header
        className={`relative flex w-full items-center justify-center  ${
          surveyResult ? 'mt-[50px] md:mt-20 xl:mt-16' : 'mt-32 md:mt-24'
        }`}
      >
        <div className="flex gap-2">
          {!surveyResult ? (
            <Image
              src="/images/puzzle_wow.png"
              alt="방탈출 추천 퍼즐 캐릭터"
              width={152}
              height={152}
              quality={100}
              className="static mt-auto h-16 w-16 md:absolute md:bottom-0 md:left-1/5 md:h-32 md:w-32 xl:h-[152px] xl:w-[152px]"
            />
          ) : (
            <FadeInMotion>
              <Image
                src="/images/recommend_result.png"
                alt="운명의 퍼즐 캐릭터"
                width={154}
                height={168}
                quality={100}
                className="static mt-auto h-[97px] w-[89px] md:absolute md:bottom-0 md:left-1/5 md:h-[148px] md:w-[136px] xl:h-[168px] xl:w-[154px]"
              />
            </FadeInMotion>
          )}
          <h1 className="my-auto text-lg font-semibold md:py-12 md:text-2xl xl:py-16">
            방탈출 취향 테스트
          </h1>
        </div>
      </header>
      <main className="h-dvh w-full rounded-t-2xl bg-secondary-90">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            {!surveyStarted && !surveyResult && (
              <SurveyIntro resetSurvey={resetSurvey} />
            )}

            {surveyStarted && !surveyResult && (
              <Survey onComplete={handleSurveyComplete} />
            )}

            {surveyResult && (
              <SurveyResult
                recommendTheme={recommendTheme}
                resetSurvey={resetSurvey}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
