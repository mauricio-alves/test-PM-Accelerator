import { GlassContainer } from "../../layout/GlassContainer";
import { Weather } from "@/interfaces/Weather";

interface WeatherCardProps {
  weather: Weather;
}

export function WeatherCard({ weather }: Readonly<WeatherCardProps>) {
  return (
    <GlassContainer className="p-8 w-full max-w-md mx-auto text-white text-center">
      <h2 className="text-3xl font-bold mb-2">{weather.city}</h2>
      <p className="text-xl text-white/80 mb-6">{weather.description}</p>

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
