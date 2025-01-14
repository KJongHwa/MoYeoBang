import { mockReviewRatings } from '@/data/mockReviewRatings';
import Rating from '../@shared/Rating';
import ProgressBar from '../@shared/ProgressBar';

interface RatingSectionProps {
  selectedGenre: string;
}

export default function RatingSection({ selectedGenre }: RatingSectionProps) {
  return (
    <div className="flex h-[180px] items-center justify-center rounded-[20px] bg-secondary-80">
      {mockReviewRatings
        .filter((rating) => rating.genre === selectedGenre)
        .map((rating) => (
          <div
            className="flex w-[294px] items-center justify-between gap-5 md:w-[550px] xl:w-[610px]"
            key={selectedGenre}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="flex gap-1">
                <span className="text-2xl font-semibold">
                  {rating.averageScore}
                </span>
                <span className="text-2xl font-semibold text-gray-400">/5</span>
              </p>
              <Rating
                rating={Number(rating.averageScore.toFixed(1))}
                width={120}
                height={24}
              />
            </div>
            <div className="w-[302px]">
              <article
                key={selectedGenre}
                className="flex flex-col-reverse gap-1"
              >
                {Object.entries(rating.Score).map(([score, count]) => (
                  <div key={score} className="flex items-center">
                    <p className="flex-shrink-0 pr-2 text-right text-sm font-medium">
                      {score}점
                    </p>
                    <ProgressBar
                      value={count}
                      max={rating.totalScore}
                      progressColor="bg-default-primary"
                    />
                    <p className="min-w-10 flex-shrink-0 pl-4 text-left text-sm font-medium text-gray-100">
                      {count}
                    </p>
                  </div>
                ))}
              </article>
            </div>
          </div>
        ))}
    </div>
  );
}
