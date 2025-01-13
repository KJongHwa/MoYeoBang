import { ReviewDto } from '@/types/review.types';
import { yearMonthDay } from '@/utils/dateUtils';
import Image from 'next/image';
import Rating from '../@shared/Rating';

export default function ReviewCard({
  score,
  comment,
  createdAt,
  Gathering,
  User,
}: ReviewDto['get']) {
  return (
    <article className="bg-secondary-100 flex w-full flex-col rounded-[20px] md:flex-row">
      <div className="relative min-h-[330px] min-w-[185px] md:min-h-[185px] md:min-w-[330px]">
        <Image
          src={Gathering.image}
          alt={Gathering.themeName}
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-t-[20px] md:rounded-l-[20px] md:rounded-r-[0px]"
        />
      </div>
      <div className="flex w-full flex-col gap-[13px] px-[25px] py-5">
        <div className="flex flex-col gap-2">
          <Rating rating={score} width={120} height={24} />
          <h2 className="text-secondary-50 pb-3 text-xs font-medium">
            {Gathering.themeName}
          </h2>
          <p className="text-sm font-medium text-white">{comment}</p>
        </div>
        <div className="flex items-center md:justify-normal xl:justify-end">
          <Image
            src={User.image}
            alt={User.nickname}
            width={24}
            height={24}
            quality={100}
            className="rounded-full"
          />
          <p className="text-secondary-50 border-secondary-50 border-r px-[5px] text-xs font-medium">
            {User.nickname}
          </p>
          <p className="text-secondary-50 pl-[5px] text-xs font-medium">
            {yearMonthDay(createdAt)}
          </p>
        </div>
      </div>
    </article>
  );
}
