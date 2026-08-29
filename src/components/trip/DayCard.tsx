import { TripDayResponseType } from "@/types/trip";
import { ActivityCard } from "./ActivityCard";
import { ListGroup } from "@/components/common/ListGroup";
import { SectionLabel } from "@/components/common/SectionLabel";
import { formatFullDate } from "@/utils/tripFormat";

export const DayCard = ({ day }: { day: TripDayResponseType }) => {
  const { date, activities } = day;

  return (
    <div>
      <SectionLabel className="mb-2.5">
        {formatFullDate(date)} · {activities.length} STOPS
      </SectionLabel>
      <ListGroup>
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </ListGroup>
    </div>
  );
};
