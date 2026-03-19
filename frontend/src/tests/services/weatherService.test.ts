import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "../../services/api";
import { weatherService } from "@/services/weatherService";

vi.mock("../../services/api", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("weatherService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch weather data for a city", async () => {
    const mockWeather = {
      city: "São Paulo",
      temp: 20,
      description: "Cloudy",
      humidity: 80,
      windSpeed: 10,
      icon: "04d",
    };

    vi.mocked(api.get).mockResolvedValueOnce({ data: mockWeather });

    const result = await weatherService.getWeather("São Paulo");

    expect(api.get).toHaveBeenCalledWith("/api/weather", {
      params: { city: "São Paulo" },
    });
    expect(result).toEqual(mockWeather);
  });

  it("should fetch search history", async () => {
    const mockHistory = [{ id: "1", city: "São Paulo", temp: 20, createdAt: new Date().toISOString() }];

    vi.mocked(api.get).mockResolvedValueOnce({ data: mockHistory });

    const result = await weatherService.getHistory();

    expect(api.get).toHaveBeenCalledWith("/api/history");
    expect(result).toEqual(mockHistory);
  });
});
