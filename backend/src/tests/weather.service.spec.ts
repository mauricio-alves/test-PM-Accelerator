import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { WeatherService } from "../services/WeatherService.js";

vi.mock("axios");

const { mockPrisma } = vi.hoisted(() => {
  return {
    mockPrisma: {
      searchLog: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
      weatherRecord: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
    },
  };
});

vi.mock("../lib/prisma.js", () => ({
  prisma: mockPrisma,
}));

describe("WeatherService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.searchLog.create.mockResolvedValue({});
    mockPrisma.searchLog.findMany.mockResolvedValue([{ query: "London", timestamp: new Date() }]);
    mockPrisma.weatherRecord.create.mockResolvedValue({});
    mockPrisma.weatherRecord.findMany.mockResolvedValue([{ city: "London", temp: 15, description: "Clear sky", humidity: 0, windSpeed: 10, icon: "0" }]);
  });

  it("should fetch data from Open-Meteo and persist in DB", async () => {
    const city = "London";

    const mockGeoResponse = {
      data: {
        results: [{ name: "London", latitude: 51.5, longitude: -0.12 }],
      },
    };

    const mockWeatherResponse = {
      data: {
        current_weather: {
          temperature: 15,
          windspeed: 10,
          weathercode: 1,
        },
      },
    };

    (axios.get as any).mockResolvedValueOnce(mockGeoResponse).mockResolvedValueOnce(mockWeatherResponse);

    const weather = await WeatherService.getWeather(city);

    expect(weather.city).toBe("London");
    expect(weather.temp).toBe(15);
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(mockPrisma.searchLog.create).toHaveBeenCalledWith({ data: { query: city } });
    expect(mockPrisma.weatherRecord.create).toHaveBeenCalled();
  });

  it("should throw error when city is not found", async () => {
    const mockGeoResponse = {
      data: {
        results: [],
      },
    };

    (axios.get as any).mockResolvedValueOnce(mockGeoResponse);

    await expect(WeatherService.getWeather("UnknownCity")).rejects.toThrow("City not found");
    expect(mockPrisma.searchLog.create).toHaveBeenCalled();
  });

  it("should return history from DB", async () => {
    const history = await WeatherService.getHistory();
    expect(history).toHaveLength(1);
    expect(history[0]).toBeDefined();
    expect(history[0]?.city).toBe("London");
    expect(mockPrisma.weatherRecord.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  });

  it("should return search logs from DB", async () => {
    const logs = await WeatherService.getSearchLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeDefined();
    expect(logs[0]?.query).toBe("London");
    expect(mockPrisma.searchLog.findMany).toHaveBeenCalledWith({
      orderBy: { timestamp: "desc" },
      take: 20,
    });
  });
});
