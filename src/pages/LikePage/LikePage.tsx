import Image from "next/image";
import { Layout } from "@/components/layout/Layout";
import { getTripTypeNames } from "@/utils/tripUtils";
import { getTransportTypeNames } from "@/utils/tripUtils";

export const LikePage = () => {
  const likeList = [
    {
      id: 1,
      place: "돈대감",
      address: "서울특별시 종로구 돈대감로 10",
      description: "돈대감은 서울의 대표적인 관광지 중 하나입니다.",
      tripType: getTripTypeNames(["food", "cafe"]),
      transport: getTransportTypeNames(["public"]),
      image: "https://picsum.photos/150/150?random=1",
    },
    {
      id: 2,
      place: "청와대",
      address: "서울특별시 종로구 돈대감로 10",
      description: "청와대는 서울의 대표적인 관광지 중 하나입니다.",
      tripType: getTripTypeNames(["sightseeing", "activity"]),
      transport: getTransportTypeNames(["public", "car"]),
      image: "https://picsum.photos/150/150?random=2",
    },
    {
      id: 3,
      place: "경복궁",
      address: "서울특별시 종로구 돈대감로 10",
      description: "경복궁은 서울의 대표적인 문화 관광지 중 하나입니다.",
      tripType: getTripTypeNames(["culture", "rest"]),
      transport: getTransportTypeNames(["public", "car"]),
      image: "https://picsum.photos/150/150?random=3",
    },
    {
      id: 4,
      place: "인천",
      address: "서울특별시 종로구 돈대감로 10",
      description: "인천은 서울의 대표적인 관광지 중 하나입니다.",
      tripType: getTripTypeNames(["care", "rest"]),
      transport: getTransportTypeNames(["public", "bicycle"]),
      image: "https://picsum.photos/150/150?random=4",
    },
  ];

  return (
    <Layout title="좋아요">
      <ul className="flex flex-col">
        {likeList.map((item) => (
          <li key={item.id} className="flex flex-col gap-1 text-sm border-b border-gray-200 py-4">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-base font-bold">{item.place}</div>
                  <div className="text-[12px] text-gray-500">{item.tripType}</div>
                </div>
                <div className="mt-1 text-sm text-gray-700">{item.address}</div>
              </div>
              <div>
                <Image
                  src={item.image}
                  alt={item.place}
                  width={150}
                  height={150}
                  className="w-full object-cover rounded-lg"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default LikePage;
