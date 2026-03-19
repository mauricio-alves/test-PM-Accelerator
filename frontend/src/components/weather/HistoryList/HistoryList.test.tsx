import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WeatherRecord } from "@/interfaces/WeatherRecord";
import { HistoryList } from "./HistoryList";

describe("HistoryList", () => {
  const mockHistory: WeatherRecord[] = [
    {
      id: "1",
      city: "São Paulo",
      temp: 20,
      description: "Cloudy",
      humidity: 80,
      windSpeed: 10,
      icon: "04d",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      city: "Rio de Janeiro",
      temp: 25,
      description: "Sunny",
      humidity: 60,
      windSpeed: 5,
      icon: "01d",
      createdAt: new Date().toISOString(),
    },
  ];

  it("should render history items", () => {
    render(<HistoryList history={mockHistory} />);

    expect(screen.getByText("São Paulo")).toBeInTheDocument();
    expect(screen.getByText("Rio de Janeiro")).toBeInTheDocument();
  });

  it("should show empty message when no history", () => {
    render(<HistoryList history={[]} />);
    expect(screen.getByText(/Nenhum histórico encontrado/i)).toBeInTheDocument();
  });
});
