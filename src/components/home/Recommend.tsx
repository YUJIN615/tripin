"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

export const Recommend = () => {
  const recommendItems = [
    {
      id: 1,
      title: "추천 1",
      image: "https://picsum.photos/300/150?random=1",
    },
    {
      id: 2,
      title: "추천 2",
      image: "https://picsum.photos/300/150?random=2",
    },
    {
      id: 3,
      title: "추천 3",
      image: "https://picsum.photos/300/150?random=3",
    },
    {
      id: 4,
      title: "추천 4",
      image: "https://picsum.photos/300/150?random=4",
    },
    {
      id: 5,
      title: "추천 5",
      image: "https://picsum.photos/300/150?random=5",
    },
    {
      id: 6,
      title: "추천 6",
      image: "https://picsum.photos/300/150?random=6",
    },  
  ];
  return (
    <div className="recommend-container pb-3">
      <h2 className="px-4 text-base font-bold my-3">이런 여행 코스는 어때요?</h2>
      <Swiper
        scrollbar={{
          hide: false,
        }}
        modules={[Autoplay, Scrollbar]}
        spaceBetween={16}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000 }}
        className="!pb-4"
      >
        {recommendItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-[150px] ml-4 overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
