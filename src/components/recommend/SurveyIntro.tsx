import Image from 'next/image';

import Button from '@/components/@shared/button/Button';

interface SurveyIntroProps {
  resetSurvey: (isStarting: boolean) => void;
}

export default function SurveyIntro({ resetSurvey }: SurveyIntroProps) {
  return (
    <div className="mb-auto flex flex-col gap-14 px-4 py-24 md:gap-24 md:py-32">
      <section className="mx-auto flex flex-col justify-center gap-2">
        <Image
          src="/images/recommend_title_xl.png"
          alt="방탈출 테마 추천 타이틀"
          width={739}
          height={260}
          quality={100}
          className="hidden xl:block"
        />
        <Image
          src="/images/recommend_title_tb.png"
          alt="방탈출 테마 추천 타이틀"
          width={574}
          height={254}
          quality={100}
          className="h-[134px] w-[303px] md:h-[254px] md:w-[574px] xl:hidden"
        />
        <p className="text-center text-xs text-primary-5 md:text-2xl">
          방탈출 취향 테스트 Go! Go!
        </p>
      </section>
      <Button
        variant="tertiary-gray"
        fontWeight="600"
        onClick={() => resetSurvey(true)}
        className="mx-10 rounded-2xl border-2 border-primary-5 py-3 text-xs text-primary-5 md:border-4 md:py-6 md:text-2xl xl:mx-32"
      >
        시작하기
      </Button>
    </div>
  );
}
