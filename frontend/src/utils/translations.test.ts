import { describe, it, expect } from "vitest";
import { translateDescription } from "./translations";

describe("translations", () => {
  it("should translate 'Clear sky' to 'Céu limpo'", () => {
    expect(translateDescription("Clear sky")).toBe("Céu limpo");
  });

  it("should translate 'Moderate rain' to 'Chuva moderada'", () => {
    expect(translateDescription("Moderate rain")).toBe("Chuva moderada");
  });

  it("should return original description if no translation exists", () => {
    expect(translateDescription("Magic Rainbow")).toBe("Magic Rainbow");
  });
});
