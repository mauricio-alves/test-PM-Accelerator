import { GlassContainer } from "../../layout/GlassContainer";

export function WeatherCardSkeleton() {
  return (
    <GlassContainer as="article" aria-label="Carregando clima" className="p-8 w-full max-w-md mx-auto text-center animate-pulse">
      <div className="h-8 w-40 bg-white/20 rounded-xl mx-auto mb-3" />
      <div className="h-5 w-28 bg-white/10 rounded-lg mx-auto mb-4" />
      <div className="h-14 w-14 bg-white/10 rounded-full mx-auto mb-5" />
      <div className="h-20 w-32 bg-white/20 rounded-2xl mx-auto mb-8" />
      <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
        <div className="space-y-2">
          <div className="h-3 w-12 bg-white/10 rounded mx-auto" />
          <div className="h-5 w-16 bg-white/20 rounded mx-auto" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-12 bg-white/10 rounded mx-auto" />
          <div className="h-5 w-16 bg-white/20 rounded mx-auto" />
        </div>
      </div>
    </GlassContainer>
  );
}
