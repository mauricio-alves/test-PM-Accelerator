import { WeatherDashboard } from "@/components/weather/WeatherDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--background) bg-gradient-to-br from-(--bg-gradient-from) via-(--bg-gradient-via) to-(--bg-gradient-to) p-4 md:p-8 transition-all duration-700">
      <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl min-h-screen flex flex-col">
        <WeatherDashboard />
      </div>
    </main>
  );
}
