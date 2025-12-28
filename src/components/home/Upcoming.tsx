"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

export const Upcoming = () => {
  const upcomingItems = [
    {
      id: 1,
      title: "다가오는 여행 1",
      image: "https://picsum.photos/200/250?random=24",
    },
    {
      id: 2,
      title: "다가오는 여행 2",
      image: "https://picsum.photos/200/250?random=25",
    },
    {
      id: 3,
      title: "다가오는 여행 3",
      image: "https://picsum.photos/200/250?random=26",
    },
    {
      id: 4,
      title: "다가오는 여행 4",
      image: "https://picsum.photos/200/250?random=27",
    },
  ];
  return (
    <div className="recently-view-container pb-3">
      <h2 className="px-4 text-base font-bold my-3">다가오는 여행</h2>
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView={2}
        spaceBetween={8}
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {upcomingItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-full overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
