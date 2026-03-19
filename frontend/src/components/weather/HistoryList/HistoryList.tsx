import { GlassContainer } from "../../layout/GlassContainer";
import { WeatherRecord } from "@/interfaces/WeatherRecord";

interface HistoryListProps {
  history: WeatherRecord[];
}

export function HistoryList({ history }: Readonly<HistoryListProps>) {
  if (history.length === 0) {
    return <GlassContainer className="p-6 text-center text-white/60">Nenhum histórico encontrado.</GlassContainer>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-lg px-2">Buscas Recentes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((record) => (
          <GlassContainer key={record.id} className="p-4 flex justify-between items-center text-white">
            <div>
              <p className="font-bold">{record.city}</p>
              <p className="text-sm text-white/60">{record.description}</p>
            </div>
            <div className="text-xl font-bold">{Math.round(record.temp)}°C</div>
          </GlassContainer>
        ))}
      </div>
    </div>
  );
}
