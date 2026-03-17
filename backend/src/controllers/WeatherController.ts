import type { Request, Response } from "express";
import { WeatherService } from "../services/WeatherService.js";

export class WeatherController {
  static async getWeatherByCity(req: Request, res: Response) {
    try {
      const { city } = req.query;
      if (!city) {
        return res.status(400).json({ error: "City is required" });
      }

      const weather = await WeatherService.getWeather(city as string);
      return res.status(200).json(weather);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return res.status(500).json({ error: message });
    }
  }

  static async getHistory(req: Request, res: Response) {
    try {
      const history = await WeatherService.getHistory();
      return res.status(200).json(history);
    } catch (error: any) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getSearchLogs(req: Request, res: Response) {
    try {
      const logs = await WeatherService.getSearchLogs();
      return res.status(200).json(logs);
    } catch (error: any) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
