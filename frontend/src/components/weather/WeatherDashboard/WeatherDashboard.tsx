"use client";

import { SearchBar } from "../SearchBar";
import { WeatherCard } from "../WeatherCard";
import { HistoryList } from "../HistoryList";
import { useWeather } from "@/hooks/useWeather";
import { WeatherCardSkeleton } from "../WeatherCardSkeleton";
import { ForecastList } from "../ForecastList/ForecastList";
import { ExtraWidgets } from "../ExtraWidgets/ExtraWidgets";
import { DashboardControls } from "./DashboardControls";
import { useLanguage } from "@/context/LanguageContext";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Sun } from "lucide-react";

export function WeatherDashboard() {
  const { weather, history, loading, error, searchCity, historyLoaded, deleteRecord, clearHistory, exportData } = useWeather();
  const { t } = useLanguage();
  const { getLocation, loadingLocation, locationError } = useGeolocation();

  const handleGeolocation = () => {
    getLocation((city) => searchCity(city));
  };

  let displayError = null;
  if (locationError) {
    displayError = t(locationError);
  } else if (error) {
    displayError = t(error);
  }

  const renderWeatherContent = () => {
    if (loading) return <WeatherCardSkeleton />;
    if (weather) return <WeatherCard weather={weather} />;
    return null;
  };

  return (
    <div className="flex flex-col gap-8 w-full text-(--foreground)">
      <section className="flex flex-col gap-4">
        <DashboardControls onGeolocation={handleGeolocation} loadingLocation={loadingLocation} />

        <h1 className="text-4xl font-extrabold text-center mb-4 tracking-tight flex items-center justify-center gap-3">
          <Sun className="text-yellow-400 animate-pulse" size={40} />
          <span>
            {t("weather.title")} <span className="opacity-60">{t("weather.subtitle")}</span>
          </span>
        </h1>

        <SearchBar onSearch={searchCity} isLoading={loading} />

        {displayError && <p className="text-red-400 text-center font-medium animate-in fade-in duration-300">{displayError}</p>}
      </section>

      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {renderWeatherContent()}
        {weather?.forecast && <ForecastList forecast={weather.forecast} />}
        {weather && <ExtraWidgets city={weather.city} />}
      </section>

      {historyLoaded && (
        <section className="mt-8">
          <HistoryList history={history} onDelete={deleteRecord} onClear={clearHistory} onExport={exportData} />
        </section>
      )}

      <footer className="mt-auto pt-12 text-center opacity-20 text-sm">PM Accelerator AI Engineer Intern - Weather App Challenge</footer>
    </div>
  );
}
