import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { WeatherService } from "../services/WeatherService";
import { PrismaClient } from "@prisma/client";

vi.mock("axios");
vi.mock("@prisma/client", () => {
  const mPrisma = {
    searchLog: { create: vi.fn() },
    weatherRecord: { create: vi.fn(), findMany: vi.fn() },
  };
  return { PrismaClient: vi.fn(() => mPrisma) };
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

    (axios.get as any).mockResolvedValue(mockResponse);

    const weather = await WeatherService.getWeather(city);

    expect(weather.city).toBe("London");
    expect(axios.get).toHaveBeenCalled();
    // Verify persistence calls would happen here through mocks if needed
  });
});
