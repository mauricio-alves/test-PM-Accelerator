import { MapWidget } from "./MapWidget";
import { VideoWidget } from "./VideoWidget";

interface ExtraWidgetsProps {
  city: string;
}

export function ExtraWidgets({ city }: Readonly<ExtraWidgetsProps>) {
  return (
    <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <MapWidget city={city} />
      <VideoWidget city={city} />
    </div>
  );
}
