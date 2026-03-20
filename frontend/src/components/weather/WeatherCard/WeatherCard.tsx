import { GlassContainer } from "../../layout/GlassContainer";
import { Weather } from "@/interfaces/Weather";

interface WeatherCardProps {
  weather: Weather;
}

import { translateDescription } from "@/utils/translations";
import { getWeatherIcon } from "@/utils/weatherUtils";

export function WeatherCard({ weather }: Readonly<WeatherCardProps>) {
  const icon = getWeatherIcon(weather.icon);
  const translatedDescription = translateDescription(weather.description);

  return (
    <GlassContainer as="article" aria-label={`Clima em ${weather.city}`} className="p-8 w-full max-w-md mx-auto text-white text-center">
      <h2 className="text-3xl font-bold mb-2">{weather.city}</h2>
      <p className="text-xl text-white/80 mb-2">{translatedDescription}</p>
      <div className="text-6xl mb-4" role="img" aria-label={weather.description}>
        {icon}
      </div>

      <div className="text-7xl font-bold mb-8">{Math.round(weather.temp)}°C</div>

      <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
        <div>
          <p className="text-white/60 text-sm uppercase tracking-wider font-semibold">Vento</p>
          <p className="text-lg font-medium">{weather.windSpeed} km/h</p>
        </div>
        <div>
          <p className="text-white/60 text-sm uppercase tracking-wider font-semibold">Humidade</p>
          <p className="text-lg font-medium">{weather.humidity}%</p>
        </div>
      </div>

      {weather.recommendation && <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/20 text-sm text-white/90 italic animate-pulse">✨ AI Insight: {weather.recommendation}</div>}
    </GlassContainer>
  );
}
