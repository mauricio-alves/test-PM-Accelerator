import { describe, it, expect } from "vitest";
import { getWeatherIcon } from "./weatherUtils";

describe("weatherUtils", () => {
  it("should return correct icon for clear sky (0)", () => {
    expect(getWeatherIcon("0")).toBe("☀️");
  });

  it("should return correct icon for rain (61)", () => {
    expect(getWeatherIcon("61")).toBe("🌧️");
  });

  it("should return correct icon for thunderstorm (95)", () => {
    expect(getWeatherIcon("95")).toBe("⛈️");
  });

  it("should return thermometer icon for invalid code", () => {
    expect(getWeatherIcon("999")).toBe("🌡️");
  });
});
