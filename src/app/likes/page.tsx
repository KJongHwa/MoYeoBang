'use client';

import { useEffect, useState } from 'react';
import HeaderTitle from '@/components/@shared/HeaderTitle';
import PageContainer from '@/components/@shared/PageContainer';
import LikesGatheringList from '@/components/likes/LikesGatheringList';

export default function LikeGathering() {
  const [likesGatherings, setLikesGatherings] = useState([]);

  useEffect(() => {
    const getLocalStorageItem = localStorage.getItem('favorites');
    const getLocalStorageArray = getLocalStorageItem
      ? JSON.parse(getLocalStorageItem)
      : [];
    setLikesGatherings(getLocalStorageArray);
  }, []);

  return (
    <PageContainer>
      <HeaderTitle
        title="찜한 모임"
        content="마감되기 전에 지금 바로 참여해보세요"
      />
      <LikesGatheringList likesGatherings={likesGatherings} />
    </PageContainer>
  );
}
