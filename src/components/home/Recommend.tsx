"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ORIGIN_REGION_CODE, getRegionCode } from "@/utils/regionCode";
import "swiper/css";
import "swiper/css/free-mode";

// TODO: 추천 코스 API 연동 시 교체
const recommendItems = [
  { id: 1, region: "제주", title: "제주 감성 카페 2박", tags: "CAFE 4 · NATURE 3" },
  { id: 2, region: "부산", title: "부산 먹부림 1박", tags: "FOOD 5 · TRANSIT" },
  { id: 3, region: "경주", title: "경주 고즈넉한 2박", tags: "CULTURE 4 · WALK" },
  { id: 4, region: "여수", title: "여수 밤바다 1박", tags: "FOOD 3 · NIGHT" },
];

export const Recommend = () => {
  return (
    <section className="recommend-container pt-6">
      <SectionLabel size="md" className="px-5 mb-2.5">
        SUGGESTED · 추천 코스
      </SectionLabel>
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView="auto"
        spaceBetween={12}
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
      >
        {recommendItems.map((item) => (
          <SwiperSlide key={item.id} className="!w-[210px]">
            <div className="bg-white rounded-group p-3.5 shadow-card">
              <div className="flex justify-between font-mono text-[15px] font-semibold">
                <div>{ORIGIN_REGION_CODE}</div>
                <div className="text-muted">→</div>
                <div>{getRegionCode(item.region)}</div>
              </div>
              <div className="text-sm font-bold mt-2.5">{item.title}</div>
              <div className="font-mono text-[11px] text-muted mt-1">{item.tags}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
