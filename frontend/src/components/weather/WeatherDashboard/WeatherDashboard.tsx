"use client";

import { SearchBar } from "../SearchBar";
import { WeatherCard } from "../WeatherCard";
import { HistoryList } from "../HistoryList";
import { useWeather } from "@/hooks/useWeather";

export function WeatherDashboard() {
  const { weather, history, loading, error, searchCity } = useWeather();

  return (
    <div className="flex flex-col gap-8 w-full">
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold text-white text-center mb-4 tracking-tight">
          Weather <span className="text-white/60">Assistant</span>
        </h1>
        <SearchBar onSearch={searchCity} isLoading={loading} />
        {error && <p className="text-red-400 text-center font-medium animate-pulse">{error}</p>}
      </section>

      {weather && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <WeatherCard weather={weather} />
        </section>
      )}

      <section className="mt-8">
        <HistoryList history={history} />
      </section>

      <footer className="mt-auto pt-12 text-center text-white/20 text-sm">PM Accelerator AI Engineer Intern - Weather App Challenge</footer>
    </div>
  );
}
