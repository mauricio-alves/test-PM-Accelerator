import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { IWeather } from "../interfaces/IWeather";

const prisma = new PrismaClient();

export class WeatherService {
  private static readonly API_KEY = process.env.OPENWEATHER_API_KEY;
  private static readonly BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  static async getWeather(city: string): Promise<IWeather> {
    // 1. Log search query
    await prisma.searchLog.create({
      data: { query: city },
    });

    // 2. Fetch from API
    const response = await axios.get(this.BASE_URL, {
      params: {
        q: city,
        appid: this.API_KEY,
        units: "metric",
      },
    });

    const data = response.data;

    const weatherData: IWeather = {
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };

    // 3. Persist weather record
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
