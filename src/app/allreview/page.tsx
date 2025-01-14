import HeaderTitle from '@/components/@shared/HeaderTitle';
import PageContainer from '@/components/@shared/PageContainer';
import AllReviewList from '@/components/allReview/AllReviewList';
import { mockReviews } from '@/data/mockReviews';

export default function AllReview() {
  const allReviews = mockReviews;

  return (
    <PageContainer>
      <HeaderTitle title="모든 리뷰" content="모여방 리뷰를 확인해 보세요" />
      <AllReviewList allReviews={allReviews} />
    </PageContainer>
  );
}
