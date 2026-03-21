"use client";

import { SearchBar } from "../SearchBar";
import { WeatherCard } from "../WeatherCard";
import { HistoryList } from "../HistoryList";
import { useWeather } from "@/hooks/useWeather";
import { WeatherCardSkeleton } from "../WeatherCardSkeleton";
import { ForecastList } from "../ForecastList/ForecastList";
import { ExtraWidgets } from "../ExtraWidgets/ExtraWidgets";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Sun, Moon, Languages, MapPin } from "lucide-react";

export function WeatherDashboard() {
  const { weather, history, loading, error, searchCity, historyLoaded, deleteRecord, clearHistory, exportData } = useWeather();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village;
          if (city) searchCity(city);
        } catch (err) {
          console.error("Erro ao obter cidade por geolocalização", err);
        }
      },
      () => alert("Não foi possível obter sua localização."),
    );
  };

  const renderWeatherContent = () => {
    if (loading) return <WeatherCardSkeleton />;
    if (weather) return <WeatherCard weather={weather} />;
    return null;
  };

  const weatherContent = renderWeatherContent();

  return (
    <div className="flex flex-col gap-8 w-full text-[var(--foreground)]">
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-full bg-(--accent) hover:bg-(--accent-hover) hover:scale-110 transition-all duration-300 active:scale-95 cursor-pointer" title={theme === "dark" ? "Light Mode" : "Dark Mode"}>
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setLanguage(language === "pt-BR" ? "en" : "pt-BR")} className="p-2 rounded-full bg-(--accent) hover:bg-(--accent-hover) hover:scale-105 transition-all duration-300 active:scale-95 flex items-center gap-2 px-3 cursor-pointer" title="Trocar Idioma">
              <Languages size={20} />
              <span className="text-xs font-bold uppercase">{language.split("-")[0]}</span>
            </button>
          </div>
          <button onClick={handleGeolocation} className="p-2 rounded-full bg-(--accent) hover:bg-(--accent-hover) hover:scale-105 transition-all duration-300 active:scale-95 flex items-center gap-2 px-3 cursor-pointer" title={t("location.current")}>
            <MapPin size={20} />
            <span className="hidden md:inline text-xs font-medium">{t("location.current")}</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-center mb-4 tracking-tight flex items-center justify-center gap-3">
          <Sun className="text-yellow-400 animate-pulse" size={40} />
          <span>
            {t("weather.title")} <span className="opacity-60">{t("weather.subtitle")}</span>
          </span>
        </h1>
        <SearchBar onSearch={searchCity} isLoading={loading} />
        {error && <p className="text-red-400 text-center font-medium animate-in fade-in duration-300">{t(error) || error}</p>}
      </section>

      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {weatherContent}
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
