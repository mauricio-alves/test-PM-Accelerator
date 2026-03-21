import { Trash2 } from "lucide-react";
import { GlassContainer } from "../../layout/GlassContainer";
import { WeatherRecord } from "@/interfaces/WeatherRecord";
import { formatDateTime } from "@/utils/dateUtils";
import { useLanguage } from "@/context/LanguageContext";
import { translateDescription } from "@/utils/translations";

interface HistoryItemProps {
  record: WeatherRecord;
  onDelete: (id: string) => Promise<void>;
}

export function HistoryItem({ record, onDelete }: Readonly<HistoryItemProps>) {
  const { language, t } = useLanguage();

  return (
    <GlassContainer as="article" aria-label={`Histórico de clima para ${record.city}`} className="p-4 flex justify-between items-center group relative border border-(--card-border) transition-all duration-300">
      <div className="flex-1">
        <p className="font-bold">{record.city}</p>
        <p className="text-sm opacity-60">{translateDescription(record.description, language)}</p>
        <p className="text-[10px] opacity-40 mt-1">{formatDateTime(record.createdAt)}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold">{Math.round(record.temp)}°C</div>
        <button onClick={() => onDelete(record.id)} className="p-2 rounded-lg bg-red-500/0 group-hover:bg-red-500/10 text-red-400/0 group-hover:text-red-400 transition-all cursor-pointer" title={t("history.delete")}>
          <Trash2 size={18} />
        </button>
      </div>
    </GlassContainer>
  );
}
