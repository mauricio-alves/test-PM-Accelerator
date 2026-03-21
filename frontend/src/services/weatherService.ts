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

  deleteRecord: async (id: string): Promise<void> => {
    await api.delete(`/api/history/${id}`);
  },

  clearHistory: async (): Promise<void> => {
    await api.delete("/api/history");
  },

  exportData: async (format: "json" | "csv"): Promise<void> => {
    const response = await api.get("/api/export", {
      params: { format },
      responseType: "blob",
    });

    const url = globalThis.window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    const filename = `weather_history_${new Date().toISOString().split("T")[0]}.${format}`;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};
