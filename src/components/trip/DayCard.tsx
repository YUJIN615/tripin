import { TripDayResponseType } from "@/types/trip";
import { ActivityCard } from "./ActivityCard";

export const DayCard = ({ day }: { day: TripDayResponseType }) => {
 const { date, activities } = day;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-base font-bold mb-3">{date}</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};