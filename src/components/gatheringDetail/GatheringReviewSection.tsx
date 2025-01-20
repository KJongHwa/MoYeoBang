import Image from 'next/image';
import { ReviewDto } from '@/types/review.types';
import { mockReviews } from '@/data/mockReviews';

interface GatheringReviewSectionProps {
  gatheringId: number;
}

export default function GatheringReviewSection({
  gatheringId,
}: GatheringReviewSectionProps) {
  // 별점 렌더링 함수
  const renderStars = (score: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Image
            key={star}
            src={
              star <= score ? '/icons/star-filled.svg' : '/icons/star-empty.svg'
            }
            width={16}
            height={16}
            alt=""
            className="h-4 w-4"
          />
        ))}
      </div>
    );
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 현재 모임의 리뷰만 필터링
  const currentGatheringReviews = mockReviews.filter(
    (review) => review.Gathering.gatheringId === gatheringId
  );

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">방문율 리뷰</h2>
      </div>

      <div className="space-y-4">
        {currentGatheringReviews.map((review) => (
          <div key={review.reviewId} className="rounded-xl bg-secondary-90 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={review.User.image || '/profile_image_default.png'}
                  width={40}
                  height={40}
                  alt="프로필 이미지"
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{review.User.nickname}</p>
                  {renderStars(review.score)}
                </div>
              </div>
              <span className="text-sm text-secondary-50">
                {formatDate(review.createdAt)}
              </span>
            </div>

            <p className="mt-3 text-sm text-secondary-30">{review.comment}</p>
          </div>
        ))}

        {currentGatheringReviews.length === 0 && (
          <div className="flex h-[200px] items-center justify-center rounded-xl bg-secondary-90">
            <p className="text-secondary-50">아직 리뷰가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
