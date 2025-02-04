'use client';

import Image from 'next/image';
import Link from 'next/link';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ArrowButton from './ArrowButton';

const bannerLinks = {
  1: {
    image: '/images/puzzle_banner.png',
    alt: '홈 상단 배너 이미지',
  },
  2: {
    href: '/recommend',
    text: '방탈출 테마 추천 페이지',
  },
};

export default function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnFocus: true,
    draggable: true,
    nextArrow: <ArrowButton type="next" />,
    prevArrow: <ArrowButton type="prev" />,
  };

  return (
    <header className="relative">
      <Slider {...settings}>
        <div className="h-40 w-full rounded-3xl px-1 md:h-60 md:px-2 xl:h-72">
          <Image
            src={bannerLinks[1].image}
            alt={bannerLinks[1].alt}
            width={1200}
            height={288}
            quality={100}
            priority
            className="X h-full max-h-72 min-h-40 rounded-3xl object-cover"
          />
        </div>
        <Link href={bannerLinks[2].href} passHref>
          <div className="h-40 w-full rounded-3xl bg-default-primary px-1 md:h-60 md:px-2 xl:h-72">
            <p className="flex h-full items-center justify-center text-4xl">
              {bannerLinks[2].text}
            </p>
          </div>
        </Link>
      </Slider>
    </header>
  );
}
