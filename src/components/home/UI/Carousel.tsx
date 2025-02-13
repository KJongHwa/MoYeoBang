'use client';

import Image from 'next/image';
import Link from 'next/link';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ArrowButton from './ArrowButton';

const bannerLinks = {
  1: {
    alt: '홈 상단 배너',
    src: {
      pc: '/images/banner_default_pc.png',
    },
  },
  2: {
    href: '/recommend',
    alt: '방탈출 테마 추천 배너',
    src: {
      pc: '/images/banner_recommend_pc.png',
    },
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
    <section className="relative">
      <Slider {...settings} className="h-40 md:h-60 xl:h-72">
        <div className="w-full rounded-3xl px-1 md:px-2">
          <Image
            src={bannerLinks[1].src.pc}
            alt={bannerLinks[1].alt}
            width={1200}
            height={288}
            quality={100}
            priority
            className="h-40 rounded-3xl object-cover md:h-60 xl:h-72"
          />
        </div>
        <Link href={bannerLinks[2].href} passHref>
          <div className="w-full rounded-3xl px-1 md:px-2">
            <Image
              src={bannerLinks[2].src.pc}
              alt={bannerLinks[2].alt}
              width={1200}
              height={288}
              quality={100}
              priority
              className="h-40 rounded-3xl object-cover md:h-60 xl:h-72"
            />
          </div>
        </Link>
      </Slider>
    </section>
  );
}
