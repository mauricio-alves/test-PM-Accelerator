import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Weather } from "@/interfaces/Weather";
import { WeatherCard } from "./WeatherCard";

describe("WeatherCard", () => {
  const mockWeather: Weather = {
    city: "São Paulo",
    temp: 20.4,
    description: "Cloudy",
    humidity: 80,
    windSpeed: 10.5,
    icon: "04d",
  };

  it("should render weather details", () => {
    render(<WeatherCard weather={mockWeather} />);

    expect(screen.getByText("São Paulo")).toBeInTheDocument();
    expect(screen.getByText(/20/)).toBeInTheDocument();
    expect(screen.getByText("Cloudy")).toBeInTheDocument();
    expect(screen.getByText(/10.5/)).toBeInTheDocument();
    expect(screen.getByText(/80/)).toBeInTheDocument();
  });
});
