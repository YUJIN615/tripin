import { TripResponseType } from "@/types/trip";
import { TripCard } from "./TripCard";
import { useRouter } from "next/navigation";

export const TripList = ({ trips, isLoading }: { trips: TripResponseType[], isLoading: boolean }) => {
  const router = useRouter();

  return (
    <div>
      {isLoading && <div>일정 목록을 불러오는 중...</div>}
      {trips && trips.length === 0 && <div>일정이 없습니다.</div>}
      <ul className="flex flex-col">
        {trips.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-1 text-sm border-b border-gray-200 py-4"
            onClick={() => router.push(`/trip/${item.id}`)}
          >
            <TripCard item={item} />
          </li>
        ))}
        <div className="my-8">
          <button
            className="w-full h-12 bg-blue-500 text-white font-bold rounded-xl text-sm"
            onClick={() => router.push("/make")}
          >
            새 일정 만들기
          </button>
        </div>
      </ul>
    </div>
  );
};