export function getWeatherIcon(code: number | string): string {
  const numericCode = typeof code === "string" ? Number.parseInt(code) : code;

  if (numericCode === 0) return "☀️";
  if (numericCode <= 3) return "☁️";
  if (numericCode <= 48) return "🌫️";
  if (numericCode <= 55) return "🌦️";
  if (numericCode <= 65) return "🌧️";
  if (numericCode <= 75) return "❄️";
  if (numericCode >= 95 && numericCode <= 99) return "⛈️";

  return "🌡️";
}
