import { Router } from 'express';
import { WeatherController } from '../controllers/WeatherController';

const router = Router();

router.get('/weather', WeatherController.getWeatherByCity);
router.get('/history', WeatherController.getHistory);
router.get('/logs', WeatherController.getSearchLogs);

export default router;
