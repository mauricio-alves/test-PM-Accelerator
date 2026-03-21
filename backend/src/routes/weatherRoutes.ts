import { Router } from "express";
import { WeatherController } from "../controllers/WeatherController.js";

const router = Router();

router.get("/weather", WeatherController.getWeatherByCity);
router.get("/history", WeatherController.getHistory);
router.delete("/history", WeatherController.clearAllHistory);
router.delete("/history/:id", WeatherController.deleteRecord);
router.get("/logs", WeatherController.getSearchLogs);
router.get("/export", WeatherController.exportData);

export default router;
