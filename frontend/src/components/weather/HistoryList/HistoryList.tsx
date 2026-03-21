import { WeatherRecord } from "@/interfaces/WeatherRecord";
import { useLanguage } from "@/context/LanguageContext";
import { HistoryActions } from "./HistoryActions";
import { HistoryItem } from "./HistoryItem";
import { GlassContainer } from "../../layout/GlassContainer";

interface HistoryListProps {
  history: WeatherRecord[];
  onDelete: (id: string) => Promise<void>;
  onClear: () => Promise<void>;
  onExport: (format: "json" | "csv") => Promise<void>;
}

export function HistoryList({ history, onDelete, onClear, onExport }: Readonly<HistoryListProps>) {
  const { t } = useLanguage();

  if (history.length === 0) {
    return <GlassContainer className="p-6 text-center opacity-60">{t("history.empty")}</GlassContainer>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-2 gap-4">
        <h3 className="font-semibold text-lg">{t("history.title")}</h3>
        <HistoryActions onExport={onExport} onClear={onClear} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((record) => (
          <HistoryItem key={record.id} record={record} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
