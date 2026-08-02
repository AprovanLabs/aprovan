import { describe, expect, it } from "vitest";
import { loadDocsPromptAssets } from "./prompt.js";

describe("loadDocsPromptAssets", () => {
  it("loads prompt files and computes a stable hash", async () => {
    const assets = await loadDocsPromptAssets();

    expect(assets.outputStyle).toContain("UTDK Docs Output Style");
    expect(assets.indexGuidance).toContain("UTDK Docs Index Guidance");
    expect(assets.hash).toMatch(/^[a-f0-9]{64}$/);
  });
});
