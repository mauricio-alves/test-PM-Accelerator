const TRANSLATIONS: Record<string, string> = {
  "Clear sky": "Céu limpo",
  "Mainly clear": "Predominantemente limpo",
  "Partly cloudy": "Parcialmente nublado",
  Overcast: "Encoberto",
  Fog: "Nevoeiro",
  "Depositing rime fog": "Nevoeiro com geada",
  "Light drizzle": "Garoa leve",
  "Moderate drizzle": "Garoa moderada",
  "Dense drizzle": "Garoa densa",
  "Slight rain": "Chuva leve",
  "Moderate rain": "Chuva moderada",
  "Heavy rain": "Chuva forte",
  "Slight snow fall": "Neve leve",
  "Moderate snow fall": "Neve moderada",
  "Heavy snow fall": "Neve forte",
  Thunderstorm: "Trovoada",
};

export function translateDescription(description: string): string {
  return TRANSLATIONS[description] || description;
}
