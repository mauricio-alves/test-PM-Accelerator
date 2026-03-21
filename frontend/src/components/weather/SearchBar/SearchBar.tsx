import { useState, SyntheticEvent } from "react";
import { GlassContainer } from "../../layout/GlassContainer";

interface SearchBarProps {
  onSearch: (city: string) => Promise<void>;
  isLoading?: boolean;
}

import { useLanguage } from "@/context/LanguageContext";

export function SearchBar({ onSearch, isLoading = false }: Readonly<SearchBarProps>) {
  const [city, setCity] = useState("");
  const { t } = useLanguage();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;
    setCity("");
    await onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <GlassContainer className="flex items-center p-2">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder={t("search.placeholder")} className="flex-1 bg-transparent border-none outline-none px-4 py-2 placeholder:opacity-50" disabled={isLoading} aria-label={t("search.placeholder")} suppressHydrationWarning />
        <button type="submit" disabled={isLoading} className="bg-(--accent) hover:bg-(--accent-hover) px-6 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl cursor-pointer" aria-label={isLoading ? t("searching") : t("search")}>
          {isLoading ? t("searching") : t("search")}
        </button>
      </GlassContainer>
    </form>
  );
}
