import "dotenv/config";
import type { IWeather } from "../interfaces/IWeather.js";
export declare class WeatherService {
    private static prisma;
    private static readonly GEO_URL;
    private static readonly WEATHER_URL;
    private static getPrisma;
    static getWeather(city: string): Promise<IWeather>;
    private static getWeatherDescription;
    static getHistory(): Promise<{
        id: string;
        city: string;
        temp: number;
        description: string;
        humidity: number;
        windSpeed: number;
        icon: string;
        createdAt: Date;
    }[]>;
    static getSearchLogs(): Promise<{
        query: string;
        id: string;
        timestamp: Date;
    }[]>;
}
//# sourceMappingURL=WeatherService.d.ts.map