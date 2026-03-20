import { GlassContainer } from "../../layout/GlassContainer";
import { ForecastDay } from "../../../interfaces/ForecastDay";
import { translateDescription } from "../../../utils/translations";
import { getWeatherIcon } from "../../../utils/weatherUtils";
import { formatDateShort } from "../../../utils/dateUtils";

interface ForecastListProps {
  forecast: ForecastDay[];
}

export function ForecastList({ forecast }: Readonly<ForecastListProps>) {
  return (
    <div className="w-full mt-8 animate-fade-in">
      <h3 className="text-white text-lg font-semibold mb-4 px-2">Previsão para os próximos dias</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide">
        {forecast.map((day) => (
          <GlassContainer key={day.date} className="flex flex-col items-center min-w-[100px] p-4 text-center shrink-0">
            <span className="text-white/60 text-xs font-medium mb-1">{formatDateShort(day.date)}</span>
            <div className="text-3xl my-2">{getWeatherIcon(day.icon)}</div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg">{Math.round(day.maxTemp)}°</span>
              <span className="text-white/50 text-xs">{Math.round(day.minTemp)}°</span>
            </div>
            <span className="text-white/60 text-[10px] mt-2 leading-tight">{translateDescription(day.description)}</span>
          </GlassContainer>
        ))}
      </div>
    </div>
  );
}
