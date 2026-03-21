import { useState, useEffect, useCallback } from "react";
import { isAxiosError } from "axios";
import { weatherService } from "@/services/weatherService";
import { Weather } from "@/interfaces/Weather";
import { WeatherRecord } from "@/interfaces/WeatherRecord";

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [history, setHistory] = useState<WeatherRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await weatherService.getHistory();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setHistoryLoaded(true);
    }
  }, []);

  const searchCity = async (city: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.getWeather(city);
      setWeather(data);
      await fetchHistory();
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError("error.city_not_found");
        } else if (err.code === "ERR_NETWORK") {
          setError("error.network");
        } else {
          setError("error.generic");
        }
      } else {
        setError("error.unexpected");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id: string) => {
    const previousHistory = [...history];
    setHistory((prev) => prev.filter((r) => r.id !== id));

    try {
      await weatherService.deleteRecord(id);
    } catch (err) {
      console.error("Error deleting record:", err);
      setHistory(previousHistory);
    }
  };

  const clearHistory = async () => {
    const previousHistory = [...history];
    setHistory([]);
    try {
      await weatherService.clearHistory();
    } catch (err) {
      console.error("Error clearing history:", err);
      setHistory(previousHistory);
    }
  };

  const exportData = async (format: "json" | "csv") => {
    try {
      await weatherService.exportData(format);
    } catch (err) {
      console.error("Error exporting data:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    weather,
    history,
    loading,
    error,
    searchCity,
    deleteRecord,
    clearHistory,
    exportData,
    historyLoaded,
    refreshHistory: fetchHistory,
  };
};
