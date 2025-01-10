'use client';

import { useEffect, useState } from 'react';

import { GatheringProps } from '@/types/gathering.types';
import HeartFullIcon from '@/public/icons/heart_full.svg';
import HeartEmptyIcon from '@/public/icons/heart_empty.svg';

export default function HeartButton({
  gathering,
}: {
  gathering: GatheringProps['card'];
}) {
  const [isFavorited, setIsFavorited] = useState(false);

  // 컴포넌트가 마운트될 때 찜 상태 불러오기
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(
      favorites.some(
        (fav: GatheringProps['card']) =>
          fav.gatheringId === gathering.gatheringId
      )
    );
  }, [gathering]);

  const handleFavoriteToggle = () => {
    setIsFavorited((prev) => {
      const newFavorited = !prev;
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      if (newFavorited) {
        if (
          !favorites.some(
            (fav: GatheringProps['card']) =>
              fav.gatheringId === gathering.gatheringId
          )
        ) {
          favorites.push(gathering);
        }
      } else {
        const updatedFavorites = favorites.filter(
          (fav: GatheringProps['card']) =>
            fav.gatheringId !== gathering.gatheringId
        );
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return false;
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      return newFavorited;
    });
  };

  return (
    <button type="button" onClick={handleFavoriteToggle}>
      {isFavorited ? <HeartFullIcon /> : <HeartEmptyIcon />}
    </button>
  );
}
