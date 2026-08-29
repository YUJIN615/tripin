import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Layout } from "@/components/layout/Layout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { TRIP_PLACES } from "@/constants";

// TODO: 좋아요 API 연동 시 교체
const likeList = [
  {
    id: 1,
    place: "돈대감",
    address: "서울특별시 종로구 돈대감로 10",
    tripTypes: ["food", "cafe"],
    image: "https://picsum.photos/150/150?random=1",
  },
  {
    id: 2,
    place: "청와대",
    address: "서울특별시 종로구 돈대감로 10",
    tripTypes: [],
    image: "https://picsum.photos/150/150?random=2",
  },
  {
    id: 3,
    place: "경복궁",
    address: "서울특별시 종로구 돈대감로 10",
    tripTypes: ["culture"],
    image: "https://picsum.photos/150/150?random=3",
  },
  {
    id: 4,
    place: "인천",
    address: "서울특별시 종로구 돈대감로 10",
    tripTypes: [],
    image: "https://picsum.photos/150/150?random=4",
  },
];

/** 여행 장소 코드를 보딩패스 톤의 대문자 라벨로 변환 (예: ["food","cafe"] → "FOOD · CAFE") */
const getPlaceCodeLabel = (values: string[]): string =>
  values
    .map((value) => TRIP_PLACES.find((place) => place.value === value)?.value.toUpperCase())
    .filter(Boolean)
    .join(" · ");

export const LikePage = () => {
  return (
    <Layout title="LIKED">
      <SectionLabel className="mb-2.5">{likeList.length} PLACES · 저장한 장소</SectionLabel>
      <ul className="flex flex-col gap-2.5">
        {likeList.map((item) => {
          const placeCodeLabel = getPlaceCodeLabel(item.tripTypes);

          return (
            <li
              key={item.id}
              className="flex items-center gap-3 bg-white rounded-field p-3 shadow-card"
            >
              <div className="w-[72px] h-[72px] shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.place}
                  width={72}
                  height={72}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-bold">{item.place}</div>
                <div className="text-xs text-muted mt-[3px]">{item.address}</div>
                {placeCodeLabel && (
                  <div className="font-mono text-[10px] text-accent mt-[5px]">{placeCodeLabel}</div>
                )}
              </div>
              <HeartIcon className="w-5 h-5 shrink-0 text-accent" />
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default LikePage;
