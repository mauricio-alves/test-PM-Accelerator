import { GlassContainer } from "../../layout/GlassContainer";
import { useLanguage } from "@/context/LanguageContext";

interface MapWidgetProps {
  city: string;
}

export function MapWidget({ city }: Readonly<MapWidgetProps>) {
  const { t } = useLanguage();
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <GlassContainer className="overflow-hidden h-64 relative group border border-(--card-border) shadow-inner">
      <h4 className="absolute top-2 left-4 z-10 text-white text-[10px] uppercase tracking-widest font-bold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-lg border border-white/10 opacity-70 group-hover:opacity-100 transition-all duration-300">
        {t("widgets.map")}: {city}
      </h4>
      <iframe title="Google Maps" width="100%" height="100%" style={{ border: 0, filter: "contrast(1.2)" }} src={mapEmbedUrl} allowFullScreen></iframe>
    </GlassContainer>
  );
}
