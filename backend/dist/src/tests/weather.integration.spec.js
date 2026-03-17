import "dotenv/config";
import { describe, it, expect } from "vitest";
import { WeatherService } from "../services/WeatherService.js";
import { PrismaClient } from "@prisma/client";
describe("Weather (Integration)", () => {
    let prisma;
    it("should fetch REAL weather data from Open-Meteo and persist in DB", async () => {
        prisma = new PrismaClient();
        const city = "London";
        const weather = await WeatherService.getWeather(city);
        expect(weather.city).toBeDefined();
        expect(typeof weather.temp).toBe("number");
        const record = await prisma.weatherRecord.findFirst({
            where: { city: { contains: city, mode: "insensitive" } },
            orderBy: { createdAt: "desc" },
        });
        expect(record).not.toBeNull();
        expect(record?.city.toLowerCase()).toContain("london");
    });
    it("should return history from DB", async () => {
        const history = await WeatherService.getHistory();
        expect(Array.isArray(history)).toBe(true);
    });
});
//# sourceMappingURL=weather.integration.spec.js.map