"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { HomepageData } from "@/lib/api";
import { imageUrl } from "@/lib/constants";
import "swiper/css";
import "swiper/css/pagination";

interface HeroBannerProps {
  homepage: HomepageData;
}

const slides = (homepage: HomepageData) => [
  {
    desktop: homepage.banner_image1,
    mobile: homepage.banner_image1_mobile,
    title: homepage.banner_image1_title,
    btn1: homepage.banner_image1_button1,
    btn1Url: homepage.banner_image1_button1_url,
    btn2: homepage.banner_image1_button2,
    btn2Url: homepage.banner_image1_button2_url,
  },
  {
    desktop: homepage.banner_image2,
    mobile: homepage.banner_image2_mobile,
    title: homepage.banner_image2_title,
    btn1: homepage.banner_image2_button1,
    btn1Url: homepage.banner_image2_button1_url,
    btn2: homepage.banner_image2_button2,
    btn2Url: homepage.banner_image2_button2_url,
  },
  {
    desktop: homepage.banner_image3,
    mobile: homepage.banner_image3_mobile,
    title: homepage.banner_image3_title,
    btn1: homepage.banner_image3_button1,
    btn1Url: homepage.banner_image3_button1_url,
    btn2: homepage.banner_image3_button2,
    btn2Url: homepage.banner_image3_button2_url,
  },
];

export default function HeroBanner({ homepage }: HeroBannerProps) {
  const items = slides(homepage);

  return (
    <>
      <section className="section-banner">
        <div className="slider-banner">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
          >
            {items.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="banner-slide-wrap">
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet={imageUrl(slide.mobile)}
                    />
                    <Image
                      src={imageUrl(slide.desktop)}
                      alt={slide.title}
                      width={1920}
                      height={900}
                      className="img-fluid w-100"
                      priority={index === 0}
                      unoptimized
                    />
                  </picture>
                  <div className="banner-overlay">
                    <h1>{slide.title}</h1>
                    <div className="slider-action-buttons">
                      <Link
                        href={slide.btn1Url}
                        className="btn-testdrive-outline"
                      >
                        {slide.btn1}
                      </Link>
                      <Link href={slide.btn2Url} className="btn-contact">
                        {slide.btn2}
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <iframe
        src="https://360.baicuae.com"
        className="responsive-iframe"
        title="BAIC 360 car viewer"
        loading="lazy"
        allow="autoplay; fullscreen"
      />
    </>
  );
}
