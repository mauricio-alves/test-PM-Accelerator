import { Download, XCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { WeatherButton } from "../../common/WeatherButton";

interface HistoryActionsProps {
  onExport: (format: "json" | "csv") => Promise<void>;
  onClear: () => Promise<void>;
}

export function HistoryActions({ onExport, onClear }: Readonly<HistoryActionsProps>) {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2">
      <WeatherButton onClick={() => onExport("json")} icon={<Download size={14} />}>
        {t("export.json")}
      </WeatherButton>
      <WeatherButton onClick={() => onExport("csv")} icon={<Download size={14} />}>
        {t("export.csv")}
      </WeatherButton>
      <WeatherButton
        variant="danger"
        onClick={() => {
          if (confirm(language === "pt-BR" ? "Deseja realmente limpar todo o histórico?" : "Are you sure you want to clear the entire history?")) {
            onClear();
          }
        }}
        title={t("history.clear")}
        icon={<XCircle size={14} />}
      >
        {t("history.clear")}
      </WeatherButton>
    </div>
  );
}
