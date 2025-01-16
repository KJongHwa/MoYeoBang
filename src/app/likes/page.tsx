import HeaderTitle from '@/components/@shared/HeaderTitle';
import PageContainer from '@/components/@shared/PageContainer';
import LikesGatheringList from '@/components/likes/LikesGatheringList';
import { mockGatherings } from '@/data/mockGatherings';

export default function LikeGathering() {
  const likesGatherings = mockGatherings;

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
