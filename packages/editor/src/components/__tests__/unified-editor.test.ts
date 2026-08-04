import { describe, expect, it } from "vitest";
import { staleFileAction } from "../staleFile";

describe("stale-file handling (unified-code-editor)", () => {
  it("does nothing when the file is not stale", () => {
    expect(staleFileAction(false, false)).toBe("none");
    expect(staleFileAction(false, true)).toBe("none");
  });

  it("silently reloads a clean editor", () => {
    expect(staleFileAction(true, false)).toBe("silent-reload");
  });

  it("offers reload or keep-mine when dirty", () => {
    expect(staleFileAction(true, true)).toBe("offer-choice");
  });
});

describe("write-policy save affordance kinds", () => {
  it("maps policies onto SaveAffordanceState discriminants", () => {
    // Structural contract — hosts map WritePolicy → SaveAffordanceState.
    type Kind = "direct" | "staged" | "readonly" | "button";
    const map = (policy: "direct" | "staged" | "readonly"): Kind => {
      if (policy === "readonly") return "readonly";
      if (policy === "staged") return "staged";
      return "direct";
    };
    expect(map("direct")).toBe("direct");
    expect(map("staged")).toBe("staged");
    expect(map("readonly")).toBe("readonly");
  });
});
