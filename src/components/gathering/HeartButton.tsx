'use client';

import { useState } from 'react';

import HeartFullIcon from '@/public/icons/heart_full.svg';
import HeartEmptyIcon from '@/public/icons/heart_empty.svg';

export default function HeartButton() {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <button type="button" onClick={handleFavoriteToggle}>
      {isFavorited ? <HeartFullIcon /> : <HeartEmptyIcon />}
    </button>
  );
}
