import { DateRange } from "react-day-picker";

export interface SearchItemType {
  id: number;
  name: string;
}

export type SearchListType = "search" | "history";

export interface ActivityType {
  time: string;
  activity: string;
  place_name: string;
  road_address_name: string;
  x: string;
  y: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  id: string;
}

export interface DayItineraryType {
  date: string;
  activities: ActivityType[];
}

export interface TripItineraryType {
  start_date: string;
  end_date: string;
  people: number;
  type: string;
  transport: string;
  region: string;
  itinerary: DayItineraryType[];
}

export interface TripResultType {
  success: boolean;
  data: {
    region: string;
    date: DateRange | undefined;
    personCount: number;
    tripTypes: string[];
    transports: string[];
    places: ActivityType[];
    itinerary: TripItineraryType;
  };
}
