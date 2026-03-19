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
          setError("Cidade não encontrada. Verifique o nome e tente novamente.");
        } else if (err.code === "ERR_NETWORK") {
          setError("Sem conexão com o servidor. Verifique sua rede.");
        } else {
          setError(`Erro ${err.response?.status ?? "desconhecido"} ao buscar clima.`);
        }
      } else {
        setError("Erro inesperado. Tente novamente.");
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
    historyLoaded,
    refreshHistory: fetchHistory,
  };
};
