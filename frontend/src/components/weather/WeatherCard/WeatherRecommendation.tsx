import { useLanguage } from "@/context/LanguageContext";

interface WeatherRecommendationProps {
  recommendation?: string;
}

export function WeatherRecommendation({ recommendation }: Readonly<WeatherRecommendationProps>) {
  const { t } = useLanguage();

  if (!recommendation) return null;

  return (
    <div className="mt-8 p-4 bg-(--card-bg) rounded-2xl border border-(--card-border) text-sm opacity-90 italic animate-in fade-in zoom-in duration-500" aria-live="polite">
      ✨ {t("weather.ai_insight")}: {t(recommendation)}
    </div>
  );
}
