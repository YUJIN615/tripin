"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export const Recommend = () => {
  return (
    <div className="px-[16px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000 }}
        className="!pb-8"
      >
        <SwiperSlide>
          <div className="w-full h-[200px] bg-gray-200 rounded-lg"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[200px] bg-gray-300 rounded-lg"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[200px] bg-gray-400 rounded-lg"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
