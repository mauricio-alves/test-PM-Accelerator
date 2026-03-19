import { WeatherDashboard } from "@/components/weather/WeatherDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black overflow-x-hidden">
      <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl min-h-screen flex flex-col">
        <WeatherDashboard />
      </div>
    </main>
  );
}
