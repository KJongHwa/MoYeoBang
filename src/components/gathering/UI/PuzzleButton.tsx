'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface PuzzleButtonProps {
  layout?: 'card' | 'slot';
  gatheringId: number;
}

export default function PuzzleButton({
  layout = 'card',
  gatheringId,
}: PuzzleButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  // 로컬 스토리지에서 찜 상태 불러오기
  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favorites.includes(gatheringId));
  };

  useEffect(() => {
    loadFavorites();
  }, [gatheringId]);

  // 찜 상태 토글 함수
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorited) {
      const newFavorites = favorites.filter((id: number) => id !== gatheringId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(gatheringId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    loadFavorites();
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={clsx(
        'absolute right-0  flex h-10 w-10 flex-1 items-center justify-center',
        {
          '-top-1 md:right-3 md:top-2': layout === 'card',
          'top-0 m-3 md:right-4 md:top-3 md:m-0': layout === 'slot',
        }
      )}
    >
      <Image
        src={isFavorited ? '/icons/puzzle_full.svg' : '/icons/puzzle_line.svg'}
        alt="퍼즐 아이콘"
        width={24}
        height={24}
        quality={100}
        className={clsx('object-contain', {
          'h-4 w-4 md:h-6 md:w-6': layout === 'card',
          'h-6 w-6': layout === 'slot',
        })}
      />
    </button>
  );
}
