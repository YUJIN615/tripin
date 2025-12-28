import { ApiResponse } from "./api";

export interface PlanRequestType {
  region: string;
  startDate: string;
  endDate: string;
  personCount: number;
  tripTypes: string;
  transports: string;
  days: PlanDayRequestType[];
}

export interface PlanDayRequestType {
  date: string;
  activities: PlanActivityRequestType[];
}

export interface PlanActivityRequestType {
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

export interface PlanResponseType {
  id: string;
  region: string;
  startDate: string;
  endDate: string;
  personCount: number;
  tripTypes: string[];
  transports: string[];
  days: PlanDayResponseType[];
}

export interface PlanDayResponseType {
  date: string;
  activities: PlanActivityResponseType[];
}

export interface PlanActivityResponseType {
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

export type PlanCreateResponseType = ApiResponse<PlanResponseType>;

export type PlanListResponseType = ApiResponse<PlanResponseType[]>;
