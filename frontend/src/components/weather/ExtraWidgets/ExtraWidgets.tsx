import { GlassContainer } from "../../layout/GlassContainer";

interface ExtraWidgetsProps {
  city: string;
}

import { useLanguage } from "@/context/LanguageContext";

export function ExtraWidgets({ city }: Readonly<ExtraWidgetsProps>) {
  const { t } = useLanguage();
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const youtubeEmbedUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(city + " weather landscape")}`;

  return (
    <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <GlassContainer className="overflow-hidden h-64 relative group border border-(--card-border) shadow-inner">
        <h4 className="absolute top-2 left-4 z-10 text-white text-[10px] uppercase tracking-widest font-bold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-lg border border-white/10 opacity-70 group-hover:opacity-100 transition-all duration-300">
          {t("widgets.map")}: {city}
        </h4>
        <iframe title="Google Maps" width="100%" height="100%" style={{ border: 0, filter: "contrast(1.2)" }} src={mapEmbedUrl} allowFullScreen></iframe>
      </GlassContainer>

      <GlassContainer className="overflow-hidden h-64 relative group border border-(--card-border) shadow-inner">
        <h4 className="absolute top-2 left-4 z-10 text-white text-[10px] uppercase tracking-widest font-bold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-lg border border-white/10 opacity-70 group-hover:opacity-100 transition-all duration-300">{t("widgets.videos")}</h4>
        <iframe title="YouTube Search" width="100%" height="100%" src={youtubeEmbedUrl} style={{ border: 0, filter: "contrast(1.2)" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-year" allowFullScreen></iframe>
      </GlassContainer>
    </div>
  );
}
