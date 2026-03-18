import type { Request, Response } from "express";
import { WeatherService } from "../services/WeatherService.js";

export class WeatherController {
  static async getWeatherByCity(req: Request, res: Response) {
    try {
      const { city } = req.query;
      if (!city || typeof city !== "string" || city.trim().length === 0) {
        return res.status(400).json({ error: "A valid city name is required" });
      }

      if (city.length > 100) {
        return res.status(400).json({ error: "City name too long" });
      }

      const weather = await WeatherService.getWeather(city.trim());
      return res.status(200).json(weather);
    } catch (error) {
      console.error("[getWeatherByCity]", error);
      const status = error instanceof Error && error.message === "City not found" ? 404 : 500;
      const message = error instanceof Error && status === 404 ? error.message : "An internal error occurred";
      return res.status(status).json({ error: message });
    }
  }

  static async getHistory(req: Request, res: Response) {
    try {
      const history = await WeatherService.getHistory();
      return res.status(200).json(history);
    } catch (error) {
      console.error("[getHistory]", error);
      return res.status(500).json({ error: "An internal error occurred" });
    }
  }

  static async getSearchLogs(req: Request, res: Response) {
    try {
      const logs = await WeatherService.getSearchLogs();
      return res.status(200).json(logs);
    } catch (error) {
      console.error("[getSearchLogs]", error);
      return res.status(500).json({ error: "An internal error occurred" });
    }
  }
}
