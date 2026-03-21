import { GlassContainer } from "../../layout/GlassContainer";
import { ForecastDay } from "../../../interfaces/ForecastDay";
import { translateDescription } from "../../../utils/translations";
import { getWeatherIcon } from "../../../utils/weatherUtils";
import { formatDateShort } from "../../../utils/dateUtils";
import { useLanguage } from "@/context/LanguageContext";

interface ForecastListProps {
  forecast: ForecastDay[];
}

export function ForecastList({ forecast }: Readonly<ForecastListProps>) {
  const { language, t } = useLanguage();
  return (
    <div className="w-full mt-8 animate-fade-in">
      <h3 className="text-(--foreground) text-lg font-semibold mb-4 px-2 tracking-tight">{t("forecast.title")}</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide">
        {forecast.map((day, index) => (
          <GlassContainer key={`${day.date}-${index}`} className="flex flex-col items-center min-w-[100px] p-4 text-center shrink-0 transition-all hover:scale-105 hover:border-(--accent)">
            <span className="text-(--foreground) opacity-60 text-xs font-medium mb-1">{formatDateShort(day.date)}</span>
            <div className="text-3xl my-2">{getWeatherIcon(day.icon)}</div>
            <div className="flex flex-col">
              <span className="text-(--foreground) font-bold text-lg">{Math.round(day.maxTemp)}°</span>
              <span className="text-(--foreground) opacity-50 text-xs">{Math.round(day.minTemp)}°</span>
            </div>
            <span className="text-(--foreground) opacity-60 text-[10px] mt-2 leading-tight">{translateDescription(day.description, language)}</span>
          </GlassContainer>
        ))}
      </div>
    </div>
  );
}
