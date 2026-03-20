import { describe, it, expect } from "vitest";
import { WMO_WEATHER_CODES } from "../utils/weatherConstants.js";

describe("weatherConstants", () => {
  it("should have correct description for code 0", () => {
    expect(WMO_WEATHER_CODES[0]).toBe("Clear sky");
  });

  it("should have correct description for code 95", () => {
    expect(WMO_WEATHER_CODES[95]).toBe("Thunderstorm");
  });
});
