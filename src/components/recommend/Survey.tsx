import { useState } from 'react';

import Button from '@/components/@shared/button/Button';
import ProgressPuzzleBar from '@/components/@shared/ProgressPuzzleBar';
import FadeInListMotion from '@/components/@shared/animation/FadeInListMotion';

import {
  questions,
  locationMap,
  genreMap,
  levelMap,
  playTimeMap,
} from '@/constants/questionList';
import { RecommendUrlParams } from '@/types/theme.types';
import { levelToKorean } from '@/constants/themeList';

interface SurveyProps {
  onComplete: (result: RecommendUrlParams) => void;
}

export default function Survey({ onComplete }: SurveyProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);

  // 설문 조사 결과 설정
  const surveyResult = (selectedAnswers: string[]) => {
    const [location, genre, playtime, level] = selectedAnswers;

    onComplete({
      genre: genreMap[genre],
      playtime: playTimeMap[playtime],
      level: levelMap[level],
      location: locationMap[location],
    });
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
      setAnswers(newAnswers);
    } else {
      const finalAnswers = [...newAnswers, answer];
      surveyResult(finalAnswers);
    }
  };

  // 진행률 계산
  const progressPercentage = ((currentStep - 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center gap-32 px-8 py-24 md:gap-44 md:px-14 md:py-32">
      <section className="flex w-full flex-col gap-16">
        <ProgressPuzzleBar
          bgColor="bg-secondary-80"
          progressColor="bg-primary-60"
          value={progressPercentage}
        />
        <h2 className="flex flex-col gap-2 text-center text-base font-bold md:gap-6 md:text-2xl">
          <span>Q.</span> <p>{questions[currentStep - 1]?.text}</p>
        </h2>
      </section>
      <ul className="flex w-full flex-col flex-wrap justify-center gap-4">
        {questions[currentStep - 1].options.map((option, index) => (
          <FadeInListMotion key={option} delay={index * 0.2} duration={0.3}>
            <Button
              type="button"
              padding="12"
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full py-4 text-xs md:py-5 md:text-2xl"
            >
              {option === '' ? '전체' : levelToKorean[option] || option}
            </Button>
          </FadeInListMotion>
        ))}
      </ul>
    </div>
  );
}
