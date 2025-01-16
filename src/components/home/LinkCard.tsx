import Image from 'next/image';

import LinkButton from '../@shared/LinkButton';

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
    <div className="flex flex-1 justify-center rounded-3xl bg-primary-5 pl-4 md:pl-6">
      <div className="flex flex-1 flex-col justify-between py-6">
        <p className="text-sm font-semibold text-secondary-100 md:text-2xl md:text-base">
          {description}
        </p>
        <LinkButton href={href} variant="light" size="short">
          바로가기
        </LinkButton>
      </div>
      <div className="mt-auto max-h-[180px] max-w-[200px]">
        <Image
          src={src}
          alt={alt}
          width={200}
          height={180}
          quality={100}
          layout="responsive"
          className="max-h-fit max-w-fit"
        />
      </div>
    </div>
  );
}
