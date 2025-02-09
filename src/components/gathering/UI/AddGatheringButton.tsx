'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthNavigation } from '@/hooks/useAuthNavigation';
import ButtonMotion from '@/components/@shared/animation/ButtonMotion';

export default function CreateGatheringBtn() {
  const router = useRouter();

  const navigateToEditPage = () => {
    router.push('/gathering/edit');
  };

  const { checkAndNavigate } = useAuthNavigation('/login', navigateToEditPage);

  return (
    <ButtonMotion
      type="button"
      className="fixed bottom-12 right-8 xl:bottom-16 xl:right-1/10"
      onClick={checkAndNavigate}
    >
      <Image
        src="/icons/creator.svg"
        alt="모임 생성 아이콘"
        width={64}
        height={64}
        quality={100}
        className="h-14 w-14 md:h-16 md:w-16"
      />
    </ButtonMotion>
  );
}
