import { Layout } from "@/components/layout/Layout";
import { TripCard } from "@/components/trip/TripCard";
import { DayCard } from "@/components/trip/DayCard";
import { TripResponseType } from "@/types/trip";

export const TripDetailPage = ({ data }: { data: TripResponseType }) => {
  const { days } = data;

  return (
    <Layout title="일정 상세">
      <div className="space-y-6">
        {/* 여행 정보 요약 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <TripCard item={data} />
        </div>

        {/* 일정 목록 */}
        <div className="space-y-4">
          {days.map((day, dayIndex) => (
            <DayCard key={dayIndex} day={day} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TripDetailPage;
