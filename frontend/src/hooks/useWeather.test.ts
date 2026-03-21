import { renderHook, act } from "@testing-library/react";
import { weatherService } from "@/services/weatherService";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useWeather } from "./useWeather";
import { Weather } from "@/interfaces/Weather";
import { WeatherRecord } from "@/interfaces/WeatherRecord";

vi.mock("@/services/weatherService");

describe("useWeather", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch weather and update history on search", async () => {
    const mockWeather = { city: "São Paulo", temp: 20 };
    const mockHistory = [{ id: "1", city: "São Paulo", temp: 20 }];

    vi.mocked(weatherService.getWeather).mockResolvedValue(mockWeather as Weather);
    vi.mocked(weatherService.getHistory).mockResolvedValue(mockHistory as WeatherRecord[]);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.searchCity("São Paulo");
    });

    expect(result.current.weather).toEqual(mockWeather);
    expect(result.current.history).toEqual(mockHistory);
    expect(result.current.loading).toBe(false);
  });

  it("should handle 404 error during search", async () => {
    const error404 = {
      isAxiosError: true,
      response: { status: 404 },
    };
    vi.mocked(weatherService.getWeather).mockRejectedValue(error404);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.searchCity("Unknown");
    });

    expect(result.current.error).toBe("error.city_not_found");
    expect(result.current.loading).toBe(false);
  });

  it("should handle generic errors during search", async () => {
    vi.mocked(weatherService.getWeather).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.searchCity("Error");
    });

    expect(result.current.error).toBe("error.unexpected");
    expect(result.current.loading).toBe(false);
  });

  it("should handle network error (ERR_NETWORK) during search", async () => {
    const networkError = {
      isAxiosError: true,
      code: "ERR_NETWORK",
    };
    vi.mocked(weatherService.getWeather).mockRejectedValue(networkError);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.searchCity("NoNetwork");
    });

    expect(result.current.error).toBe("error.network");
    expect(result.current.loading).toBe(false);
  });

  it("should rollback history when deleteRecord fails", async () => {
    const initialHistory = [{ id: "1", city: "São Paulo", temp: 20 }];
    vi.mocked(weatherService.getHistory).mockResolvedValue(initialHistory as WeatherRecord[]);

    const { result } = renderHook(() => useWeather());

    await act(async () => {});

    vi.mocked(weatherService.deleteRecord).mockRejectedValue(new Error("API Error"));

    await act(async () => {
      await result.current.deleteRecord("1");
    });

    expect(result.current.history).toEqual(initialHistory);
  });

  it("should rollback history when clearHistory fails", async () => {
    const initialHistory = [{ id: "1", city: "São Paulo", temp: 20 }];
    vi.mocked(weatherService.getHistory).mockResolvedValue(initialHistory as WeatherRecord[]);

    const { result } = renderHook(() => useWeather());

    await act(async () => {});

    vi.mocked(weatherService.clearHistory).mockRejectedValue(new Error("API Error"));

    await act(async () => {
      await result.current.clearHistory();
    });

    expect(result.current.history).toEqual(initialHistory);
  });
});
