'use client';

import { useEffect, useState } from 'react';
import HeaderTitle from '@/components/@shared/HeaderTitle';
import PageContainer from '@/components/@shared/PageContainer';
import LikesGatheringList from '@/components/likes/LikesGatheringList';
import { useQuery } from '@tanstack/react-query';
import { getLikeGatherings } from '@/axios/likes/apis';
import { QueryProvider } from '@/components/@shared/QueryProvider';

export default function LikeGathering() {
  const [likesGatherings, setLikesGatherings] = useState<number[]>([]);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data: gatheringsData, isLoading } = useQuery({
    queryKey: ['likes', likesGatherings],
    queryFn: () => getLikeGatherings(likesGatherings),
    enabled: shouldFetch,
  });

  const likes = gatheringsData ?? [];

  useEffect(() => {
    const getLocalStorageItem = localStorage.getItem('favorites');
    const getLocalStorageArray = getLocalStorageItem
      ? JSON.parse(getLocalStorageItem)
      : [];
    setLikesGatherings(getLocalStorageArray);
    setShouldFetch(true);
  }, []);

  if (!shouldFetch || isLoading)
    return (
      <div className="flex h-dvh items-center justify-center">Loading...</div>
    );

  return (
    <QueryProvider>
      <PageContainer>
        <HeaderTitle
          title="찜한 모임"
          content="마감되기 전에 지금 바로 참여해보세요"
        />
        <LikesGatheringList likesGatherings={likes} />
      </PageContainer>
    </QueryProvider>
  );
}
