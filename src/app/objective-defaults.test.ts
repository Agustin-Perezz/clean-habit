import { describe, expect, it } from "vitest";
import { CHECK_ACTIVE_COLOR } from "./mock-data";
import { OBJECTIVE_ACCENT_COLORS } from "./objective-defaults";

describe("objective accent palette", () => {
  it("never uses the completion green, so an open habit cannot look completed", () => {
    expect(OBJECTIVE_ACCENT_COLORS).not.toContain(CHECK_ACTIVE_COLOR);
  });

  it("stays non-empty so accent picking keeps working", () => {
    expect(OBJECTIVE_ACCENT_COLORS.length).toBeGreaterThan(0);
  });
});
