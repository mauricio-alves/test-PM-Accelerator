import { GlassContainer } from "../../layout/GlassContainer";

interface ExtraWidgetsProps {
  city: string;
}

export function ExtraWidgets({ city }: Readonly<ExtraWidgetsProps>) {
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const youtubeEmbedUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(city + " weather landscape")}`;

  return (
    <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <GlassContainer className="overflow-hidden h-64 relative">
        <h4 className="absolute top-2 left-4 z-10 text-white/80 text-xs font-bold bg-black/40 px-2 py-1 rounded-md backdrop-blur-md">Explorar Mapa: {city}</h4>
        <iframe title="Google Maps" width="100%" height="100%" style={{ border: 0 }} src={mapEmbedUrl} allowFullScreen></iframe>
      </GlassContainer>

      <GlassContainer className="overflow-hidden h-64 relative">
        <h4 className="absolute top-2 left-4 z-10 text-white/80 text-xs font-bold bg-black/40 px-2 py-1 rounded-md backdrop-blur-md">Vídeos Relacionados</h4>
        <iframe title="YouTube Search" width="100%" height="100%" src={youtubeEmbedUrl} style={{ border: 0 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </GlassContainer>
    </div>
  );
}
