import Rating from '@/components/@shared/rating/Rating';
import ProgressBar from '@/components/@shared/ProgressBar';
import { useQuery } from '@tanstack/react-query';
import { getReviewsRating } from '@/axios/allReview/apis';

interface RatingSectionProps {
  selectedGenre: string;
}

export default function RatingSection({ selectedGenre }: RatingSectionProps) {
  const { data: ratingsData, isLoading } = useQuery({
    queryKey: ['ratings'],
    queryFn: () => getReviewsRating('mystery'),
  });

  if (isLoading)
    return (
      <div className="flex h-dvh items-center justify-center">Loading...</div>
    );

  return (
    <div className="flex h-[180px] items-center justify-center rounded-[20px] bg-secondary-80">
      <div
        className="flex w-[294px] items-center justify-between gap-5 md:w-[550px] xl:w-[610px]"
        key={selectedGenre}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="flex gap-1">
            <span className="text-2xl font-semibold">
              {ratingsData.averageScore}
            </span>
            <span className="text-2xl font-semibold text-gray-400">/5</span>
          </p>
          <Rating
            rating={ratingsData.averageScore.toFixed(1)}
            width={120}
            height={24}
          />
        </div>
        <div className="w-[302px]">
          <article key={selectedGenre} className="flex flex-col-reverse gap-1">
            {ratingsData.score.map((count: number, index: number) => {
              const fixedScore = 1 + index;
              return (
                <div key={fixedScore} className="flex items-center">
                  <p className="min-w-[29px] flex-shrink-0 pr-2 text-right text-sm font-medium">
                    {fixedScore}점
                  </p>
                  <ProgressBar
                    value={count}
                    max={ratingsData.scoreCount}
                    progressColor="bg-default-primary"
                  />
                  <p className="min-w-10 flex-shrink-0 pl-4 text-left text-sm font-medium text-gray-100">
                    {count}
                  </p>
                </div>
              );
            })}
          </article>
        </div>
      </div>
    </div>
  );
}
