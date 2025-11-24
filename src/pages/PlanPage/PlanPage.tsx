import { Layout } from "@/components/common/Layout";
import { getTripTypeNames, getTransportTypeNames } from "@/utils/tripUtils";

export const PlanPage = () => {
  const result = [
    {
      id: 1,
      place: "서울",
      date: "2025-01-01~2025-01-03",
      person: 2,
      tripType: getTripTypeNames(["food", "cafe"]),
      transport: getTransportTypeNames(["public"]),
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      place: "부산",
      date: "2025-01-01~2025-01-03",
      person: 2,
      tripType: getTripTypeNames(["sightseeing", "activity"]),
      transport: getTransportTypeNames(["public", "car"]),
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      place: "대구",
      date: "2025-01-01~2025-01-03",
      person: 2,
      tripType: getTripTypeNames(["shopping", "culture"]),
      transport: getTransportTypeNames(["car", "walk"]),
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      place: "인천",
      date: "2025-01-01~2025-01-03",
      person: 2,
      tripType: getTripTypeNames(["rest", "care"]),
      transport: getTransportTypeNames(["public", "bicycle"]),
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <Layout title="내 일정">
      <ul className="flex flex-col">
        {result.map((item) => (
          <li key={item.id} className="flex flex-col gap-1 text-sm border-b border-gray-200 py-4">
            <div className="text-base font-bold">{item.place}</div>
            <div>날짜: {item.date}</div>
            <div>인원: {item.person}명</div>
            <div>여행 컨셉: {item.tripType}</div>
            <div>이동 수단: {item.transport}</div>
          </li>
        ))}
        <div className="my-8">
          <button className="w-full h-12 bg-blue-500 text-white rounded-xl text-sm">새 일정</button>
        </div>
      </ul>
    </Layout>
  );
};

export default PlanPage;
