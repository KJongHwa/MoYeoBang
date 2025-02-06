import { useState } from 'react';

import Button from '@/components/@shared/button/Button';
import ProgressPuzzleBar from '@/components/@shared/ProgressPuzzleBar';

import {
  questions,
  locationMap,
  genreMap,
  levelMap,
  playTimeMap,
} from '@/constants/questionList';
import { SurveyUrlParams } from '@/types/gathering.types';
import { levelToKorean } from '@/constants/themeList';

interface SurveyProps {
  onComplete: (theme: SurveyUrlParams) => void;
}

export default function Survey({ onComplete }: SurveyProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);

  // 추천 테마
  const recommendTheme = (selectedAnswers: string[]) => {
    const [location, genre, playtime, level] = selectedAnswers;

    const getRandomElement = (arr: string[]) => {
      return arr[Math.floor(Math.random() * arr.length)];
    };

    const selectedLocation =
      location === '🙂‍↔️ 상관없어요'
        ? getRandomElement(
            Object.keys(locationMap).filter((loc) => loc !== '🙂‍↔️ 상관없어요')
          )
        : location;

    const selectedGenre =
      genre === '🙂‍↔️ 상관없어요'
        ? getRandomElement(genreMap[genre])
        : genreMap[genre][Math.floor(Math.random() * genreMap[genre].length)];

    const selectedPlaytime = getRandomElement(playTimeMap[playtime]);

    const selectedLevel =
      level === '🙂‍↔️ 상관없어요'
        ? getRandomElement(
            Object.keys(levelMap).filter((lev) => lev !== '상관없어요')
          )
        : level;

    // 추천 테마 설정
    onComplete({
      name: '아직 API 설계 중입니다.',
      genre: selectedGenre,
      playtime: selectedPlaytime,
      level: levelMap[selectedLevel],
      location: locationMap[selectedLocation],
    });
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
      setAnswers(newAnswers);
    } else {
      const finalAnswers = [...newAnswers, answer];
      recommendTheme(finalAnswers);
    }
  };

  // 진행률 계산
  const progressPercentage = ((currentStep - 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center gap-32 px-8 py-24 md:px-14 md:py-32">
      <section className="flex w-full flex-col gap-12">
        <ProgressPuzzleBar
          bgColor="bg-secondary-80"
          progressColor="bg-primary-60"
          value={progressPercentage}
        />
        <h2 className="flex flex-col gap-2 text-center text-2xl font-bold md:gap-6">
          <span>Q</span> <p>{questions[currentStep - 1]?.text}</p>
        </h2>
      </section>
      <section className="flex w-full flex-col flex-wrap justify-center gap-4">
        {questions[currentStep - 1].options.map((option) => (
          <Button
            type="button"
            padding="12"
            key={option}
            onClick={() => handleAnswer(option)}
            className="w-full py-4 text-xs md:py-5 md:text-2xl"
          >
            {option === '' ? '전체' : levelToKorean[option] || option}
          </Button>
        ))}
      </section>
    </div>
  );
}
