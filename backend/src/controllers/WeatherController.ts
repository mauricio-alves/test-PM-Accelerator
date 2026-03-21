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
      return this.handleError(res, error, "getWeatherByCity");
    }
  }

  static async getHistory(req: Request, res: Response) {
    try {
      const history = await WeatherService.getHistory();
      return res.status(200).json(history);
    } catch (error) {
      return this.handleError(res, error, "getHistory");
    }
  }

  static async getSearchLogs(req: Request, res: Response) {
    try {
      const logs = await WeatherService.getSearchLogs();
      return res.status(200).json(logs);
    } catch (error) {
      return this.handleError(res, error, "getSearchLogs");
    }
  }

  static async deleteRecord(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "ID is required" });
      await WeatherService.deleteHistoryRecord(id as string);
      return res.status(204).send();
    } catch (error) {
      return this.handleError(res, error, "deleteRecord");
    }
  }

  static async clearAllHistory(req: Request, res: Response) {
    try {
      await WeatherService.clearHistory();
      return res.status(204).send();
    } catch (error) {
      return this.handleError(res, error, "clearAllHistory");
    }
  }

  static async exportData(req: Request, res: Response) {
    try {
      const format = req.query.format as string;
      if (format !== "json" && format !== "csv") {
        return res.status(400).json({ error: "Format must be json or csv" });
      }
      const data = await WeatherService.exportHistory(format);
      const filename = `weather_history_${new Date().toISOString().split("T")[0]}.${format}`;

      res.setHeader("Content-Type", format === "json" ? "application/json" : "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
      return res.status(200).send(data);
    } catch (error) {
      return this.handleError(res, error, "exportData");
    }
  }

  private static handleError(res: Response, error: unknown, context: string) {
    console.error(`[WeatherController:${context}]`, error);
    const status = error instanceof Error && error.message === "City not found" ? 404 : 500;
    const message = error instanceof Error && status === 404 ? error.message : "An internal error occurred";
    return res.status(status).json({ error: message });
  }
}
