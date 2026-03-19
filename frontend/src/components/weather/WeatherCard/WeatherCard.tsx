import { GlassContainer } from "../../layout/GlassContainer";
import { Weather } from "@/interfaces/Weather";

interface WeatherCardProps {
  weather: Weather;
}

const WEATHER_ICONS: Record<string, string> = {
  rain: "🌧️",
  drizzle: "🌦️",
  thunder: "⛈️",
  storm: "🌩️",
  snow: "❄️",
  sleet: "🌨️",
  fog: "🌫️",
  mist: "🌫️",
  haze: "🌫️",
  clear: "☀️",
  cloud: "☁️",
  overcast: "🌥️",
  chuva: "🌧️",
  neve: "❄️",
  tempestade: "⛈️",
  névoa: "🌫️",
  neblina: "🌫️",
  nublado: "🌥️",
  céu: "☀️",
  sol: "☀️",
};

function getWeatherIcon(description: string): string {
  const lower = description.toLowerCase();
  const match = Object.keys(WEATHER_ICONS).find((key) => lower.includes(key));
  return match ? WEATHER_ICONS[match] : "🌡️";
}

export function WeatherCard({ weather }: Readonly<WeatherCardProps>) {
  const icon = getWeatherIcon(weather.description);

  return (
    <GlassContainer as="article" aria-label={`Clima em ${weather.city}`} className="p-8 w-full max-w-md mx-auto text-white text-center">
      <h2 className="text-3xl font-bold mb-2">{weather.city}</h2>
      <p className="text-xl text-white/80 mb-2">{weather.description}</p>
      <div className="text-6xl mb-4" role="img" aria-label={weather.description}>
        {icon}
      </div>

      <div className="text-7xl font-bold mb-8">{Math.round(weather.temp)}°C</div>

      <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
        <div>
          <p className="text-white/60 text-sm uppercase tracking-wider">Vento</p>
          <p className="text-lg font-medium">{weather.windSpeed} km/h</p>
        </div>
        <div>
          <p className="text-white/60 text-sm uppercase tracking-wider">Humidade</p>
          <p className="text-lg font-medium">{weather.humidity}%</p>
        </div>
      </div>
    </GlassContainer>
  );
}
