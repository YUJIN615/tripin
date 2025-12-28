import { Layout } from "@/components/common/Layout";
import { PlanCard } from "@/components/plan/PlanCard";
import { DayCard } from "@/components/plan/DayCard";
import { TripResponseType } from "@/types/trip";
import { PlanResponseType } from "@/types/plan";

export const TripDetailPage = ({ data }: { data: TripResponseType | PlanResponseType }) => {
  const { region, startDate, endDate, personCount, tripTypes, transports, days } = data;

  return (
    <Layout title="일정 상세">
      <div className="space-y-6">
        {/* 여행 정보 요약 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <PlanCard
            region={region}
            startDate={startDate}
            endDate={endDate}
            personCount={personCount}
            tripTypes={tripTypes}
            transports={transports}
          />
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
