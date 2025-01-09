'use client';

import { useState } from 'react';
import { mockReviews } from '@/data/mockReviews';
import ReviewCard from '../allReview/ReviewCard';
import Button from '../@shared/Button';
import MyReviewModal from './myReviewModal';

export default function MyReviewWrite() {
  const [isModal, setIsModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<{
    score?: number;
    comment?: string;
  } | null>(null);

  const openModalHandler = (score?: number, comment?: string) => {
    setSelectedReview({ score, comment });
    setIsModal(true);
  };

  return (
    <>
      <div className="mt-10 flex flex-col gap-6">
        {mockReviews.map((review) => (
          <div key={review.reviewId}>
            <ReviewCard
              score={review.score}
              comment={review.comment}
              createdAt={review.createdAt}
              Gathering={review.Gathering}
              User={review.User}
            />
            <div className="mt-3 flex gap-3">
              <Button
                variant="secondary"
                size="large"
                font="14"
                onClick={() => openModalHandler(review.score, review.comment)}
              >
                수정하기
              </Button>
              <Button variant="primary" size="large" font="14" disabled>
                삭제하기
              </Button>
            </div>
          </div>
        ))}
      </div>
      {isModal && (
        <MyReviewModal
          isModal={isModal}
          setIsModal={setIsModal}
          score={selectedReview?.score}
          comment={selectedReview?.comment}
        />
      )}
    </>
  );
}
