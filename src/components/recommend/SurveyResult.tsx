import Image from 'next/image';

import { SurveyUrlParams } from '@/types/gathering.types';
import { getLabelFromValue } from '@/utils/filterUtils';
import LinkButton from '@/components/@shared/button/LinkButton';
import Button from '@/components/@shared/button/Button';
import { genres, levels, locationList } from '@/constants/themeList';

interface SurveyResultProps {
  recommendedTheme: SurveyUrlParams | null;
  resetSurvey: (isStarting: boolean) => void;
}

export default function SurveyResult({
  recommendedTheme,
  resetSurvey,
}: SurveyResultProps) {
  if (!recommendedTheme) return null;

  // 선택된 값 포맷팅
  const labels = {
    genre: getLabelFromValue(recommendedTheme.genre, genres),
    level: getLabelFromValue(recommendedTheme.level, levels),
    location: getLabelFromValue(recommendedTheme.location, locationList),
  };
  return (
    <div className="flex flex-col items-center justify-center gap-24 px-4 pb-24 font-bold text-primary-5 md:pb-32">
      <section className="flex flex-col items-center justify-center gap-7">
        <div>
          <Image
            src="/images/recommend_result.png"
            alt="운명의 퍼즐 캐릭터"
            width={327}
            height={357}
          />
          <p className="mt-6 text-nowrap text-center text-xs md:text-2xl">
            운명은 이미 정해졌어요. <br />
            <span className="text-primary-40">{labels.genre}</span>의 세계로
            초대합니다.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-6 text-center">
        <p className="animate-bounce text-base text-red-500 md:text-2xl">
          {recommendedTheme.name}
        </p>
        <div className="text-xs md:text-2xl">
          <p>플레이타임: {recommendedTheme.playtime}</p>
          <p>난이도: {labels.level}</p>
          <p>지역: {labels.location}</p>
        </div>
      </section>
      <section className="flex w-full flex-col gap-2 px-8 md:px-14">
        <Button
          variant="tertiary-gray"
          shape="default"
          className="w-full border-2 py-3 text-sm md:border-4 md:py-6 md:text-2xl"
          onClick={() => resetSurvey(false)}
        >
          추천 테마 참여하기
        </Button>
        <Button
          variant="tertiary-gray"
          shape="default"
          className="w-full border-2 py-3 text-sm md:border-4 md:py-6 md:text-2xl"
          onClick={() => resetSurvey(false)}
        >
          다시하기
        </Button>
      </section>
    </div>
  );
}
