import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { LanguageProvider } from "@/context/LanguageContext";

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe("SearchBar", () => {
  it("should render input and button", () => {
    renderWithProvider(<SearchBar onSearch={async () => {}} />);

    expect(screen.getByPlaceholderText(/Buscar cidade|search.placeholder/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call onSearch with current input value when clicked", () => {
    const onSearch = vi.fn();
    renderWithProvider(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/Buscar cidade|search.placeholder/i);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "São Paulo" } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith("São Paulo");
  });

  it("should not call onSearch if input is empty", () => {
    const onSearch = vi.fn();
    renderWithProvider(<SearchBar onSearch={onSearch} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });
});
