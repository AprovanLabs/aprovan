import { describe, expect, it } from "vitest";
import {
  isInterfaceId,
  isInterfaceOnlyProvider,
  shouldListCredentialAsProvider,
  validateProviderId,
} from "../validation";

describe("validateProviderId", () => {
  it("rejects interface ids", () => {
    expect(validateProviderId("llm")).toMatch(/interface/);
    expect(validateProviderId("agent")).toMatch(/interface/);
    expect(validateProviderId("sandbox")).toMatch(/interface/);
  });

  it("rejects interface-only implementations", () => {
    expect(validateProviderId("machine")).toMatch(/built-in/);
    expect(validateProviderId("native")).toMatch(/built-in/);
    expect(validateProviderId("bashkit")).toMatch(/built-in/);
    expect(validateProviderId("harness")).toMatch(/built-in/);
  });

  it("accepts real provider ids", () => {
    expect(validateProviderId("github")).toBeNull();
    expect(validateProviderId("openrouter")).toBeNull();
  });

  it("requires a non-empty provider", () => {
    expect(validateProviderId("")).toBe("Provider is required.");
    expect(validateProviderId("   ")).toBe("Provider is required.");
  });
});

describe("shouldListCredentialAsProvider", () => {
  it("mirrors gateway discovery rules", () => {
    expect(isInterfaceId("llm")).toBe(true);
    expect(isInterfaceOnlyProvider("machine")).toBe(true);
    expect(shouldListCredentialAsProvider("llm")).toBe(false);
    expect(shouldListCredentialAsProvider("machine")).toBe(false);
    expect(shouldListCredentialAsProvider("github")).toBe(true);
  });
});
