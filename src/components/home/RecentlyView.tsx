"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css/free-mode";

export const RecentlyView = () => {
  const recentlyViewItems = [
    {
      id: 1,
      title: "최근 본 여행지 1",
      image: "https://picsum.photos/150/150?random=4",
    },
    {
      id: 2,
      title: "최근 본 여행지 2",
      image: "https://picsum.photos/150/150?random=5",
    },
    {
      id: 3,
      title: "최근 본 여행지 3",
      image: "https://picsum.photos/150/150?random=6",
    },
    {
      id: 4,
      title: "최근 본 여행지 4",
      image: "https://picsum.photos/150/150?random=7",
    },
    {
      id: 5,
      title: "최근 본 여행지 5",
      image: "https://picsum.photos/150/150?random=8",
    },
    {
      id: 6,
      title: "최근 본 여행지 6",
      image: "https://picsum.photos/150/150?random=9",
    },
  ];
  return (
    <div className="recently-view-container pb-3">
      <h2 className="px-4 text-base font-bold my-3">최근 본 여행지</h2>
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView={3}
        spaceBetween={8}
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {recentlyViewItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-full overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.title}
                width={150}
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

export default RecentlyView;
