import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { WeatherRecord } from "@/interfaces/WeatherRecord";
import { HistoryList } from "./HistoryList";
import { LanguageProvider } from "@/context/LanguageContext";

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe("HistoryList", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "confirm",
      vi.fn(() => true),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should render history items", () => {
    const history: WeatherRecord[] = [
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
    ];
    renderWithProvider(<HistoryList history={history} onDelete={vi.fn()} onClear={vi.fn()} onExport={vi.fn()} />);

    expect(screen.getByText("São Paulo")).toBeInTheDocument();
  });

  it("should show empty message when no history", () => {
    renderWithProvider(<HistoryList history={[]} onDelete={vi.fn()} onClear={vi.fn()} onExport={vi.fn()} />);
    expect(screen.getByText(/Nenhum histórico|history.empty/i)).toBeInTheDocument();
  });

  it("should call onDelete when delete button is clicked", () => {
    const onDelete = vi.fn();
    const history: WeatherRecord[] = [{ id: "1", city: "São Paulo", temp: 20, description: "Cloudy", humidity: 80, windSpeed: 10, icon: "04d", createdAt: new Date().toISOString() }];
    renderWithProvider(<HistoryList history={history} onDelete={onDelete} onClear={vi.fn()} onExport={vi.fn()} />);

    const deleteButton = screen.getByRole("button", { name: /history.delete|Excluir/i });
    deleteButton.click();

    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("should call onClear when clear button is clicked", () => {
    const onClear = vi.fn();
    const history: WeatherRecord[] = [{ id: "1", city: "São Paulo", temp: 20, description: "Cloudy", humidity: 80, windSpeed: 10, icon: "04d", createdAt: new Date().toISOString() }];
    renderWithProvider(<HistoryList history={history} onDelete={vi.fn()} onClear={onClear} onExport={vi.fn()} />);

    const clearButton = screen.getByText(/history.clear|Limpar/i);
    clearButton.click();

    expect(onClear).toHaveBeenCalled();
  });
});
