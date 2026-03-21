"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

type Language = "pt-BR" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  "pt-BR": {
    "weather.title": "Weather",
    "weather.subtitle": "App",
    "search.placeholder": "Buscar cidade...",
    search: "Buscar",
    searching: "Buscando...",
    "history.title": "Buscas Recentes",
    "history.empty": "Nenhum histórico encontrado.",
    "history.delete": "Excluir",
    "history.clear": "Limpar Histórico",
    "export.json": "Exportar JSON",
    "export.csv": "Exportar CSV",
    "forecast.title": "Previsão para os próximos dias",
    "weather.wind": "Vento",
    "weather.humidity": "Umidade",
    "location.not_supported": "Geolocalização não é suportada pelo seu navegador.",
    "location.city_not_found": "Não foi possível determinar sua cidade.",
    "location.error": "Erro ao obter localização.",
    "location.denied": "Permissão de localização negada.",
    "common.loading": "Carregando...",
    "weather.ai_insight": "AI Insight",
    "widgets.map": "Explorar Mapa",
    "widgets.videos": "Vídeos Relacionados",
    "recommendation.title": "Sugestão do App",
    "rec.thunderstorm": "Trovoada detectada. Fique em casa e evite aparelhos eletrônicos ligados à tomada.",
    "rec.heavy_rain": "Chuva forte. Não esqueça o guarda-chuva e evite áreas com risco de alagamento.",
    "rec.drizzle": "Garoando. Um casaco leve e guarda-chuva são recomendados.",
    "rec.hot": "Está muito quente! Beba muita água e use protetor solar.",
    "rec.cold": "Clima frio. Hora de tirar o casaco do armário e se manter aquecido.",
    "rec.perfect": "Clima perfeito para passear no parque ou praticar esportes ao ar livre.",
    "rec.normal": "Dia tranquilo. Aproveite o clima e mantenha-se hidratado!",
  },
  en: {
    "weather.title": "Weather",
    "weather.subtitle": "App",
    "search.placeholder": "Search city...",
    search: "Search",
    searching: "Searching...",
    "history.title": "Recent Searches",
    "history.empty": "No history found.",
    "history.delete": "Delete",
    "history.clear": "Clear History",
    "export.json": "Export JSON",
    "export.csv": "Export CSV",
    "forecast.title": "Next days forecast",
    "weather.wind": "Wind",
    "weather.humidity": "Humidity",
    "weather.ai_insight": "AI Insight",
    "widgets.map": "Explore Map",
    "widgets.videos": "Related Videos",
    "recommendation.title": "App's Suggestion",
    "error.city_not_found": "City not found.",
    "error.generic": "An internal error occurred.",
    "location.current": "Use my location",
    "location.not_supported": "Geolocation is not supported by your browser.",
    "location.city_not_found": "Could not determine your city.",
    "location.error": "Error getting location.",
    "location.denied": "Location permission denied.",
    "common.loading": "Loading...",
    "rec.thunderstorm": "Thunderstorm detected. Stay home and avoid plugged-in electronics.",
    "rec.heavy_rain": "Heavy rain. Don't forget your umbrella and avoid flood-prone areas.",
    "rec.drizzle": "Drizzling. A light jacket and umbrella are recommended.",
    "rec.hot": "It's very hot! Drink plenty of water and use sunscreen.",
    "rec.cold": "Cold weather. Time to pull the coat out of the closet and keep warm.",
    "rec.perfect": "Perfect weather for a walk in the park or outdoor sports.",
    "rec.normal": "Quiet day. Enjoy the weather and stay hydrated!",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [language, setLanguageState] = useState<Language>("pt-BR");
  const [mounted, setMounted] = useState(process.env.NODE_ENV === "test");

  useEffect(() => {
    queueMicrotask(() => {
      const saved = localStorage.getItem("language") as Language;
      if (saved && saved !== "pt-BR") {
        setLanguageState(saved);
      }
      setMounted(true);
    });
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  }, []);

  const t = useCallback(
    (key: string) => {
      const currentTranslations = translations[language];
      return currentTranslations[key as keyof typeof currentTranslations] || key;
    },
    [language],
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  if (!mounted) return null;

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
