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

  const fetchHistory = useCallback(async () => {
    try {
      const data = await weatherService.getHistory();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  }, []);

  const searchCity = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.getWeather(city);
      setWeather(data);
      await fetchHistory();
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError("Cidade não encontrada. Verifique o nome e tente novamente.");
        } else {
          console.error("Error searching city:", err);
          setError("Erro ao buscar clima. Verifique sua conexão.");
        }
      } else {
        console.error("Unexpected error:", err);
        setError("Erro ao buscar clima. Verifique o nome da cidade.");
      }
      setWeather(null);
    } finally {
      setLoading(false);
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
    refreshHistory: fetchHistory,
  };
};
