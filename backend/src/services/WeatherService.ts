import axios from "axios";
import axiosRetry from "axios-retry";
import type { IWeather } from "../interfaces/IWeather.js";
import type { IForecastDay } from "../interfaces/IForecastDay.js";
import { WMO_WEATHER_CODES } from "../utils/weatherConstants.js";

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === "ECONNRESET";
  },
});

import { prisma } from "../lib/prisma.js";

export class WeatherService {
  private static readonly GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
  private static readonly WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

  static async getWeather(city: string): Promise<IWeather> {
    await prisma.searchLog.create({
      data: { query: city },
    });

    const geoResponse = await axios.get(this.GEO_URL, {
      params: { name: city, count: 1, language: "en", format: "json" },
    });

    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
      throw new Error("City not found");
    }

    const { latitude, longitude, name } = geoResponse.data.results[0];

    const weatherResponse = await axios.get(this.WEATHER_URL, {
      params: {
        latitude,
        longitude,
        current_weather: true,
        daily: "weathercode,temperature_2m_max,temperature_2m_min",
        timezone: "auto",
      },
    });

    const current = weatherResponse.data.current_weather;
    const daily = weatherResponse.data.daily;

    const forecast: IForecastDay[] = [];
    if (daily) {
      for (let i = 1; i < 6; i++) {
        forecast.push({
          date: daily.time[i],
          maxTemp: daily.temperature_2m_max[i],
          minTemp: daily.temperature_2m_min[i],
          description: this.getWeatherDescription(daily.weathercode[i]),
          icon: daily.weathercode[i].toString(),
        });
      }
    }

    const weatherData: IWeather = {
      city: name,
      temp: current.temperature,
      description: this.getWeatherDescription(current.weathercode),
      humidity: 0,
      windSpeed: current.windspeed,
      icon: current.weathercode.toString(),
      forecast,
      recommendation: this.generateRecommendation(current.temperature, current.weathercode),
    };

    await prisma.weatherRecord.create({
      data: {
        city: weatherData.city,
        temp: weatherData.temp,
        description: weatherData.description,
        humidity: weatherData.humidity,
        windSpeed: weatherData.windSpeed,
        icon: weatherData.icon,
      },
    });

    return weatherData;
  }

  private static generateRecommendation(temp: number, code: number): string {
    if (code >= 95) return "rec.thunderstorm";
    if (code >= 80) return "rec.heavy_rain";
    if (code >= 51) return "rec.drizzle";

    if (temp > 30) return "rec.hot";
    if (temp < 15) return "rec.cold";
    if (temp >= 15 && temp <= 25 && code === 0) return "rec.perfect";

    return "rec.normal";
  }

  private static getWeatherDescription(code: number): string {
    return WMO_WEATHER_CODES[code] || "Unknown";
  }

  static async getHistory() {
    return prisma.weatherRecord.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  }

  static async getSearchLogs() {
    return prisma.searchLog.findMany({
      orderBy: { timestamp: "desc" },
      take: 20,
    });
  }

  static async deleteHistoryRecord(id: string) {
    return prisma.weatherRecord.deleteMany({
      where: { id },
    });
  }

  static async clearHistory() {
    return prisma.weatherRecord.deleteMany();
  }

  static async exportHistory(format: "json" | "csv") {
    const history = await prisma.weatherRecord.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (format === "json") {
      return JSON.stringify(history, null, 2);
    }

    const headers = "id,city,temp,description,humidity,windSpeed,icon,createdAt\n";
    const rows = history.map((r) => `${r.id},"${r.city}",${r.temp},"${r.description}",${r.humidity},${r.windSpeed},"${r.icon}",${r.createdAt.toISOString()}`).join("\n");

    return headers + rows;
  }
}
