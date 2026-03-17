import "dotenv/config";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
export class WeatherService {
    static prisma;
    static GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
    static WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
    static getPrisma() {
        if (!this.prisma) {
            this.prisma = new PrismaClient();
        }
        return this.prisma;
    }
    static async getWeather(city) {
        const prisma = this.getPrisma();
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
            },
        });
        const current = weatherResponse.data.current_weather;
        const weatherData = {
            city: name,
            temp: current.temperature,
            description: this.getWeatherDescription(current.weathercode),
            humidity: 0,
            windSpeed: current.windspeed,
            icon: current.weathercode.toString(),
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
    static getWeatherDescription(code) {
        const codes = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Fog",
            48: "Depositing rime fog",
            51: "Light drizzle",
            53: "Moderate drizzle",
            55: "Dense drizzle",
            61: "Slight rain",
            63: "Moderate rain",
            65: "Heavy rain",
            71: "Slight snow fall",
            73: "Moderate snow fall",
            75: "Heavy snow fall",
            95: "Thunderstorm",
        };
        return codes[code] || "Unknown";
    }
    static async getHistory() {
        const prisma = this.getPrisma();
        return prisma.weatherRecord.findMany({
            orderBy: { createdAt: "desc" },
            take: 10,
        });
    }
    static async getSearchLogs() {
        const prisma = this.getPrisma();
        return prisma.searchLog.findMany({
            orderBy: { timestamp: "desc" },
            take: 20,
        });
    }
}
//# sourceMappingURL=WeatherService.js.map