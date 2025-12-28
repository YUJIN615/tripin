import { ApiResponse } from "./api";

export interface TripRequestType {
  region: string;
  startDate: string;
  endDate: string;
  personCount: number;
  tripTypes: string[];
  transports: string[];
  days: TripDayRequestType[];
}

export interface TripDayRequestType {
  date: string;
  activities: TripActivityRequestType[];
}

export interface TripActivityRequestType {
  time: string;
  activity: string;
  placeName: string;
  roadAddressName: string;
  x: string;
  y: string;
  categoryName: string;
  categoryGroupCode: string;
  categoryGroupName: string;
  phone: string;
  id: string;
}

export interface TripResponseType {
  id: string;
  region: string;
  startDate: string;
  endDate: string;
  personCount: number;
  tripTypes: string[];
  transports: string[];
  days: TripDayResponseType[];
}

export interface TripDayResponseType {
  date: string;
  activities: TripActivityResponseType[];
}

export interface TripActivityResponseType {
  time: string;
  activity: string;
  placeName: string;
  roadAddressName: string;
  x: string;
  y: string;
  categoryName: string;
  categoryGroupCode: string;
  categoryGroupName: string;
  phone: string;
  id: string;
}

export type TripCreateResponseType = ApiResponse<TripResponseType>;

export type TripListResponseType = ApiResponse<TripResponseType[]>;
