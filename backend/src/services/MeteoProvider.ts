import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === "ECONNRESET";
  },
});

export class MeteoProvider {
  private static readonly GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
  private static readonly WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

  static async getGeocoding(city: string) {
    const response = await axios.get(this.GEO_URL, {
      params: { name: city, count: 1, language: "en", format: "json" },
    });

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error("City not found");
    }

    return response.data.results[0];
  }

  static async getForecast(latitude: number, longitude: number) {
    const response = await axios.get(this.WEATHER_URL, {
      params: {
        latitude,
        longitude,
        current_weather: true,
        daily: "weathercode,temperature_2m_max,temperature_2m_min",
        timezone: "auto",
      },
    });

    return response.data;
  }
}
