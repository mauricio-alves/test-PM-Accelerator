import type { IWeather } from "../interfaces/IWeather.js";
import type { IForecastDay } from "../interfaces/IForecastDay.js";
import { WMO_WEATHER_CODES } from "../utils/weatherConstants.js";
import { MeteoProvider } from "./MeteoProvider.js";
import { WeatherRepository } from "../repositories/WeatherRepository.js";
import { CsvFormatter } from "../utils/CsvFormatter.js";

export class WeatherService {
  static async getWeather(city: string): Promise<IWeather> {
    await WeatherRepository.saveSearchLog(city);

    const geo = await MeteoProvider.getGeocoding(city);
    const weatherDataRaw = await MeteoProvider.getForecast(geo.latitude, geo.longitude);

    const current = weatherDataRaw.current_weather;
    const daily = weatherDataRaw.daily;

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
      city: geo.name,
      temp: current.temperature,
      description: this.getWeatherDescription(current.weathercode),
      humidity: 0,
      windSpeed: current.windspeed,
      icon: current.weathercode.toString(),
      forecast,
      recommendation: this.generateRecommendation(current.temperature, current.weathercode),
    };

    await WeatherRepository.createRecord(weatherData);

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
    return WeatherRepository.listHistory(10);
  }

  static async getSearchLogs() {
    return WeatherRepository.listSearchLogs(20);
  }

  static async deleteHistoryRecord(id: string) {
    return WeatherRepository.deleteById(id);
  }

  static async clearHistory() {
    return WeatherRepository.clearAll();
  }

  static async exportHistory(format: "json" | "csv") {
    const history = await WeatherRepository.listAllHistory();

    if (format === "json") {
      return JSON.stringify(history, null, 2);
    }

    return CsvFormatter.formatHistory(history);
  }
}
