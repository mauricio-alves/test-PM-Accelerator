import { api } from "./api";
import { Weather } from "@/interfaces/Weather";
import { WeatherRecord } from "@/interfaces/WeatherRecord";

export const weatherService = {
  getWeather: async (city: string): Promise<Weather> => {
    const response = await api.get("/api/weather", { params: { city } });
    return response.data;
  },

  getHistory: async (): Promise<WeatherRecord[]> => {
    const response = await api.get("/api/history");
    return response.data;
  },
};
