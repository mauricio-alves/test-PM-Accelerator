import { ForecastDay } from "./ForecastDay";

export interface Weather {
  city: string;
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  recommendation?: string;
  forecast?: ForecastDay[];
}
