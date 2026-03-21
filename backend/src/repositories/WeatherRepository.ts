import { prisma } from "../lib/prisma.js";
import type { IWeather } from "../interfaces/IWeather.js";

export class WeatherRepository {
  static async createRecord(data: IWeather) {
    return prisma.weatherRecord.create({
      data: {
        city: data.city,
        temp: data.temp,
        description: data.description,
        humidity: data.humidity,
        windSpeed: data.windSpeed,
        icon: data.icon,
      },
    });
  }

  static async saveSearchLog(query: string) {
    return prisma.searchLog.create({
      data: { query },
    });
  }

  static async listHistory(take: number = 10) {
    return prisma.weatherRecord.findMany({
      orderBy: { createdAt: "desc" },
      take,
    });
  }

  static async listAllHistory() {
    return prisma.weatherRecord.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async listSearchLogs(take: number = 20) {
    return prisma.searchLog.findMany({
      orderBy: { timestamp: "desc" },
      take,
    });
  }

  static async deleteById(id: string) {
    return prisma.weatherRecord.deleteMany({
      where: { id },
    });
  }

  static async clearAll() {
    return prisma.weatherRecord.deleteMany();
  }
}
