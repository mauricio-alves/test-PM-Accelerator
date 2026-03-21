import { GlassContainer } from "../../layout/GlassContainer";
import { Weather } from "@/interfaces/Weather";
import { translateDescription } from "@/utils/translations";
import { getWeatherIcon } from "@/utils/weatherUtils";
import { useLanguage } from "@/context/LanguageContext";
import { WeatherRecommendation } from "./WeatherRecommendation";

interface WeatherCardProps {
  weather: Weather;
}
export function WeatherCard({ weather }: Readonly<WeatherCardProps>) {
  const { language, t } = useLanguage();
  const icon = getWeatherIcon(weather.icon);
  const translatedDescription = translateDescription(weather.description, language);

  return (
    <GlassContainer as="article" aria-label={`Clima em ${weather.city}`} className="p-8 w-full max-w-md mx-auto text-(--foreground) text-center">
      <h2 className="text-3xl font-bold mb-2">{weather.city}</h2>
      <p className="text-xl opacity-80 mb-2">{translatedDescription}</p>
      <div className="text-6xl mb-4" role="img" aria-label={weather.description}>
        {icon}
      </div>

      <div className="text-7xl font-bold mb-8">{Math.round(weather.temp)}°C</div>

      <div className="grid grid-cols-2 gap-4 border-t border-(--card-border) pt-6">
        <div>
          <p className="opacity-60 text-sm uppercase tracking-wider font-semibold">{t("weather.wind")}</p>
          <p className="text-lg font-medium">{weather.windSpeed} km/h</p>
        </div>
        <div>
          <p className="opacity-60 text-sm uppercase tracking-wider font-semibold">{t("weather.humidity")}</p>
          <p className="text-lg font-medium">{weather.humidity}%</p>
        </div>
      </div>

      <WeatherRecommendation recommendation={weather.recommendation} />
    </GlassContainer>
  );
}
