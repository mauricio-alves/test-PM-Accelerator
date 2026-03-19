import { useState, SyntheticEvent } from "react";
import { GlassContainer } from "../../layout/GlassContainer";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading = false }: Readonly<SearchBarProps>) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <GlassContainer className="flex items-center p-2">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Digite a cidade..." className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-white placeholder-white/60" disabled={isLoading} />
        <button type="submit" disabled={isLoading || !city.trim()} className="bg-white/20 hover:bg-white/30 transition-colors text-white px-6 py-2 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </GlassContainer>
    </form>
  );
}
