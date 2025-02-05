'use client';

import { useState } from 'react';
import {
  questions,
  locationMap,
  genreMap,
  levelMap,
  playTimeMap,
} from '@/constants/questionList';
import { levelToKorean } from '@/constants/themeList';
import Link from 'next/link';

import Button from '@/components/@shared/button/Button';

export default function Recommend() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendedTheme, setRecommendedTheme] = useState<{
    name: string;
    genre: string;
    playtime: string;
    level: string;
    location: string;
  } | null>(null);

  const recommendTheme = (selectedAnswers: string[]) => {
    const [location, genre, playtime, level] = selectedAnswers;

    // 랜덤 선택 함수
    const getRandomElement = (arr: string[]) => {
      return arr[Math.floor(Math.random() * arr.length)];
    };

    // 각 선택지 처리
    const selectedLocation =
      location === '상관없어요'
        ? getRandomElement(
            Object.keys(locationMap).filter((loc) => loc !== '상관없어요')
          )
        : location;

    const selectedGenre =
      genre === '상관없어요'
        ? getRandomElement(genreMap[genre])
        : genreMap[genre][Math.floor(Math.random() * genreMap[genre].length)];

    const selectedPlaytime = getRandomElement(playTimeMap[playtime]);

    const selectedLevel =
      level === '상관없어요'
        ? getRandomElement(
            Object.keys(levelMap).filter((lev) => lev !== '상관없어요')
          )
        : level;

    // 추천 테마 설정
    setRecommendedTheme({
      name: '추천하는 테마가 없습니다.',
      genre: selectedGenre,
      playtime: selectedPlaytime,
      level: levelMap[selectedLevel],
      location: locationMap[selectedLocation],
    });
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];

    // 질문 수 조정
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setAnswers(newAnswers);
    } else {
      const finalAnswers = [...newAnswers, answer];
      recommendTheme(finalAnswers);
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-[1166px] flex-col gap-12 px-4 md:px-6  xl:px-0">
      <main className="flex h-dvh items-center justify-center">
        {!recommendedTheme ? (
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-2xl font-bold">
              Q{currentStep}. {questions[currentStep - 1].text}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {questions[currentStep - 1].options.map((option) => (
                <Button
                  type="button"
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="rounded-lg bg-blue-100 px-6 py-3 transition-colors hover:bg-blue-200"
                >
                  {option === '' ? '전체' : levelToKorean[option] || option}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <main className="flex flex-col items-center justify-center gap-8">
            <h1 className="text-3xl font-bold">추천 테마</h1>
            <p className="animate-bounce text-2xl text-red-500">
              {recommendedTheme.name}
            </p>
            <div>
              <p>장르: {recommendedTheme.genre}</p>
              <p>플레이타임: {recommendedTheme.playtime}</p>
              <p>난이도: {recommendedTheme.level}</p>
              <p>지역: {recommendedTheme.location}</p>
            </div>
            <Link
              href={`/search?q=${recommendedTheme}`}
              className="mt-4 rounded-lg bg-green-500 px-6 py-3 text-white transition-colors hover:bg-green-600"
            >
              추천받은 테마 참여하기
            </Link>
          </main>
        )}
      </main>
    </div>
  );
}
