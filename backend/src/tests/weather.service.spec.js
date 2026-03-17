import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { WeatherService } from "../services/WeatherService.js";
vi.mock("axios");
vi.mock("@prisma/client", () => {
    class MockPrismaClient {
        searchLog = { create: vi.fn() };
        weatherRecord = { create: vi.fn(), findMany: vi.fn() };
    }
    return { PrismaClient: MockPrismaClient };
});
describe("WeatherService", () => {
    it("should log search, fetch data, and persist weather record", async () => {
        const city = "London";
        const mockResponse = {
            data: {
                name: "London",
                main: { temp: 15, humidity: 80 },
                weather: [{ description: "cloudy", icon: "04d" }],
                wind: { speed: 10 },
            },
        };
        axios.get.mockResolvedValue(mockResponse);
        const weather = await WeatherService.getWeather(city);
        expect(weather.city).toBe("London");
        expect(axios.get).toHaveBeenCalled();
    });
});
//# sourceMappingURL=weather.service.spec.js.map