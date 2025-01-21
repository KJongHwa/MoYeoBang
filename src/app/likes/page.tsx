'use client';

import { useEffect, useState } from 'react';
import HeaderTitle from '@/components/@shared/HeaderTitle';
import PageContainer from '@/components/@shared/PageContainer';
import LikesGatheringList from '@/components/likes/LikesGatheringList';
import { useQuery } from '@tanstack/react-query';
import { getLikeGatherings } from '@/axios/likes/apis';
import { QueryProvider } from '@/components/@shared/QueryProvider';

export default function LikeGathering() {
  const [likesGatherings, setLikesGatherings] = useState<number[]>([1, 2, 3]); // 영주님 PR이 merge 되면 수정

  const { data: gatheringsData } = useQuery({
    queryKey: ['likes', likesGatherings],
    queryFn: () => getLikeGatherings(likesGatherings),
    enabled: likesGatherings.length > 0,
  });

  const likes = gatheringsData ?? [];

  // useEffect(() => {
  //   const getLocalStorageItem = localStorage.getItem('favorites');
  //   const getLocalStorageArray = getLocalStorageItem
  //     ? JSON.parse(getLocalStorageItem)
  //     : [];
  //   setLikesGatherings(getLocalStorageArray);
  // }, []);

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
