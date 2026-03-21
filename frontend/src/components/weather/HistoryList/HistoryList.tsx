import { GlassContainer } from "../../layout/GlassContainer";
import { WeatherRecord } from "@/interfaces/WeatherRecord";
import { formatDateTime } from "@/utils/dateUtils";
import { useLanguage } from "@/context/LanguageContext";
import { Trash2, Download, XCircle } from "lucide-react";
import { translateDescription } from "@/utils/translations";

interface HistoryListProps {
  history: WeatherRecord[];
  onDelete: (id: string) => Promise<void>;
  onClear: () => Promise<void>;
  onExport: (format: "json" | "csv") => Promise<void>;
}

export function HistoryList({ history, onDelete, onClear, onExport }: Readonly<HistoryListProps>) {
  const { language, t } = useLanguage();

  if (history.length === 0) {
    return <GlassContainer className="p-6 text-center opacity-60">{t("history.empty")}</GlassContainer>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-2 gap-4">
        <h3 className="font-semibold text-lg">{t("history.title")}</h3>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onExport("json")} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] hover:scale-105 transition-all duration-300 active:scale-95 text-xs font-medium border border-[var(--card-border)] cursor-pointer">
            <Download size={14} />
            {t("export.json")}
          </button>
          <button onClick={() => onExport("csv")} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] hover:scale-105 transition-all duration-300 active:scale-95 text-xs font-medium border border-[var(--card-border)] cursor-pointer">
            <Download size={14} />
            {t("export.csv")}
          </button>
          <button
            onClick={() => {
              if (confirm(language === "pt-BR" ? "Deseja realmente limpar todo o histórico?" : "Are you sure you want to clear the entire history?")) {
                onClear();
              }
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:scale-105 transition-all duration-300 active:scale-95 text-xs font-medium border border-red-500/20 cursor-pointer"
            title={t("history.clear")}
          >
            <XCircle size={14} />
            {t("history.clear")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((record) => (
          <GlassContainer key={record.id} as="article" aria-label={`Histórico de clima para ${record.city}`} className="p-4 flex justify-between items-center group relative border border-[var(--card-border)] transition-all duration-300">
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
        ))}
      </div>
    </div>
  );
}
