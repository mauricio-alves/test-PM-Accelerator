import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("should render input and button", () => {
    render(<SearchBar onSearch={() => {}} />);

    expect(screen.getByPlaceholderText(/Digite a cidade/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Buscar/i })).toBeInTheDocument();
  });

  it("should call onSearch with current input value when clicked", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/Digite a cidade/i);
    const button = screen.getByRole("button", { name: /Buscar/i });

    fireEvent.change(input, { target: { value: "São Paulo" } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith("São Paulo");
  });

  it("should not call onSearch if input is empty", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const button = screen.getByRole("button", { name: /Buscar/i });
    fireEvent.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });
});
