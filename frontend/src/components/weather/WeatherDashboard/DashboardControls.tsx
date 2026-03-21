import { Sun, Moon, Languages, MapPin } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { WeatherButton } from "../../common/WeatherButton";

interface DashboardControlsProps {
  onGeolocation: () => void;
  loadingLocation?: boolean;
}

export function DashboardControls({ onGeolocation, loadingLocation }: Readonly<DashboardControlsProps>) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2">
        <WeatherButton variant="iconOnly" onClick={toggleTheme} title={theme === "dark" ? "Light Mode" : "Dark Mode"}>
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </WeatherButton>

        <WeatherButton variant="iconOnly" className="px-3" onClick={() => setLanguage(language === "pt-BR" ? "en" : "pt-BR")} title="Trocar Idioma">
          <Languages size={20} />
          <span className="text-xs font-bold uppercase">{language.split("-")[0]}</span>
        </WeatherButton>
      </div>

      <WeatherButton onClick={onGeolocation} disabled={loadingLocation} className="px-3" title={t("location.current")} icon={<MapPin size={20} />}>
        <span className="hidden md:inline text-xs font-medium">{loadingLocation ? t("common.loading") : t("location.current")}</span>
      </WeatherButton>
    </div>
  );
}
