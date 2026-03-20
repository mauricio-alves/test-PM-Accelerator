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
    if (code >= 95) return "Trovoada detectada. Fique em casa e evite aparelhos eletrônicos ligados à tomada.";
    if (code >= 80) return "Chuva forte. Não esqueça o guarda-chuva e evite áreas com risco de alagamento.";
    if (code >= 51) return "Garoando. Um casaco leve e guarda-chuva são recomendados.";

    if (temp > 30) return "Está muito quente! Beba muita água e use protetor solar.";
    if (temp < 15) return "Clima frio. Hora de tirar o casaco do armário e se manter aquecido.";
    if (temp >= 15 && temp <= 25 && code === 0) return "Clima perfeito para passear no parque ou praticar esportes ao ar livre.";

    return "Dia tranquilo. Aproveite o clima e mantenha-se hidratado!";
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
}
