import { TripActivityResponseType } from "@/types/trip";
import { ListRow } from "@/components/common/ListGroup";

export const ActivityCard = ({ activity }: { activity: TripActivityResponseType }) => {
  const { time, activity: activityName, placeName, roadAddressName, phone } = activity;

  return (
    <ListRow className="flex gap-3.5">
      <div className="w-11 shrink-0 font-mono text-[13px] font-semibold text-accent">{time}</div>
      <div className="flex-1">
        <div className="text-[15px] font-bold">{placeName}</div>
        <div className="text-xs text-muted mt-[3px]">
          {activityName} · {roadAddressName}
        </div>
        {phone && <div className="font-mono text-[11px] text-muted mt-[3px]">{phone}</div>}
      </div>
    </ListRow>
  );
};
