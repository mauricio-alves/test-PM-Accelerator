import { WeatherService } from "../services/WeatherService.js";
export class WeatherController {
    static async getWeatherByCity(req, res) {
        try {
            const { city } = req.query;
            if (!city) {
                return res.status(400).json({ error: "City is required" });
            }
            const weather = await WeatherService.getWeather(city);
            return res.status(200).json(weather);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Internal Server Error";
            return res.status(500).json({ error: message });
        }
    }
    static async getHistory(req, res) {
        try {
            const history = await WeatherService.getHistory();
            return res.status(200).json(history);
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static async getSearchLogs(req, res) {
        try {
            const logs = await WeatherService.getSearchLogs();
            return res.status(200).json(logs);
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
//# sourceMappingURL=WeatherController.js.map