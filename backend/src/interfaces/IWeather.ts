import type { IForecastDay } from "./IForecastDay.js";

export interface IWeather {
  city: string;
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  recommendation?: string;
  forecast?: IForecastDay[];
}
