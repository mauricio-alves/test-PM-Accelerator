import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Weather } from "@/interfaces/Weather";
import { WeatherCard } from "./WeatherCard";
import { LanguageProvider } from "@/context/LanguageContext";

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe("WeatherCard", () => {
  const mockWeather: Weather = {
    city: "São Paulo",
    temp: 20,
    description: "Cloudy",
    humidity: 80,
    windSpeed: 10,
    icon: "04d",
  };

  it("should render weather details", () => {
    renderWithProvider(<WeatherCard weather={mockWeather} />);

    expect(screen.getByText("São Paulo")).toBeInTheDocument();
    expect(screen.getByText(/20/)).toBeInTheDocument();
    expect(screen.getByText("Cloudy")).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
    expect(screen.getByText(/80/)).toBeInTheDocument();
  });
});
