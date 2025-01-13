import { useState } from 'react';
import Button from '../@shared/Button';
import MyReviewNotWrite from './myReviewNotWrite';
import MyReviewWrite from './myReviewWrite';

export default function MyReview() {
  const [isWritingReview, setIsWritingReview] = useState(true);

  const handleButtonClick = (isWriting: boolean) => {
    setIsWritingReview(isWriting);
  };

  return (
    <>
      <div className="mb-8 flex gap-4">
        <Button
          variant={isWritingReview ? 'secondary' : 'primary'}
          onClick={() => handleButtonClick(true)}
        >
          작성 가능한 리뷰
        </Button>
        <Button
          variant={!isWritingReview ? 'secondary' : 'primary'}
          onClick={() => handleButtonClick(false)}
        >
          작성한 리뷰
        </Button>
      </div>

      <section>
        {isWritingReview ? <MyReviewNotWrite /> : <MyReviewWrite />}
      </section>
    </>
  );
}
