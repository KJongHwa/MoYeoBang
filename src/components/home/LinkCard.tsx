import Image from 'next/image';

import LinkButton from '../@shared/button/LinkButton';

type LinkCardProps = {
  href: string;
  src: string;
  alt: string;
  description: string;
} & React.ComponentPropsWithoutRef<'button'>;

export default function LinkCard({
  href,
  src,
  alt,
  description,
}: LinkCardProps) {
  return (
    <div className="flex flex-1 justify-center rounded-3xl bg-primary-5 pl-4 pr-3 md:pl-10 md:pr-9 xl:pl-6 xl:pr-5">
      <div className="flex flex-1 flex-col justify-between py-3 md:py-6">
        <p className="text-sm font-semibold text-secondary-100 md:text-xl xl:text-2xl">
          {description}
        </p>
        <LinkButton href={href} variant="light" size="short">
          바로가기
        </LinkButton>
      </div>
      <div className="mt-2 max-h-[180px] max-w-[200px]">
        <Image
          src={src}
          alt={alt}
          width={200}
          height={180}
          quality={100}
          className="h-24 w-28 object-cover md:h-36 md:w-40 xl:h-full xl:w-full"
        />
      </div>
    </div>
  );
}
