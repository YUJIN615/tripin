import { PlanActivityResponseType } from "@/types/plan";

export const ActivityCard = ({ activity }: { activity: PlanActivityResponseType }) => {
  const { id, time, activity: activityName, placeName, roadAddressName, phone } = activity;
  return (
    <div key={id} className="border-l-2 border-blue-500 pl-3">
      <p className="mb-1 text-sm font-semibold">
        {time} - {activityName}
      </p>
      <p className="mb-1 text-sm text-gray-700">{placeName}</p>
      <p className="mb-1 text-xs text-gray-500">{roadAddressName}</p>
      {phone && <p className="text-xs text-gray-500">📞 {phone}</p>}
    </div>
  );
};