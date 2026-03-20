import { describe, it, expect } from "vitest";
import { formatDateShort, formatDateTime } from "./dateUtils";

describe("dateUtils", () => {
  it("formatDateShort should format date string correctly", () => {
    const date = "2026-03-25";
    const formatted = formatDateShort(date);
    expect(typeof formatted).toBe("string");
    expect(formatted.length).toBeGreaterThan(0);
  });

  it("formatDateTime should format Date object correctly", () => {
    const date = new Date(2026, 2, 20, 15, 0, 0);
    const formatted = formatDateTime(date);
    expect(formatted).toContain("20/03/2026");
    expect(formatted).toContain("15:00:00");
  });
});
