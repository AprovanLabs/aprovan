/**
 * Shared type-bundle helpers + on-demand provider mounts (editor-consolidation Stream 6).
 */

import { describe, expect, it, vi } from "vitest";
import { toPascalCase } from "../transforms/identifier-case.js";
import {
  emitProviderModuleIndex,
  providerModuleName,
  resolveOnDemandProviderMounts,
} from "../transforms/provider-types-bundle.js";

describe("toPascalCase", () => {
  it("matches the registry/bundler derivation", () => {
    expect(toPascalCase("github")).toBe("Github");
    expect(toPascalCase("google/books")).toBe("GoogleBooks");
    expect(toPascalCase("synthetic.new")).toBe("SyntheticNew");
    expect(toPascalCase("HTTPSConnection")).toBe("HttpsConnection");
  });
});

describe("emitProviderModuleIndex", () => {
  it("emits factory + default client with shared PascalCase", () => {
    const dts = emitProviderModuleIndex("google/books", "./types/index.js");
    expect(dts).toContain('import type { GoogleBooksClient } from "./types/index.js"');
    expect(dts).toContain("export declare function createGoogleBooksClient(");
    expect(providerModuleName("google/books")).toBe("@utdk/google/books");
  });
});

describe("resolveOnDemandProviderMounts", () => {
  it("fetches only referenced providers — not the full catalogue", async () => {
    const catalogue = ["github", "stripe", "slack", "openai", "twilio"];
    const fetchBundle = vi.fn(async (provider: string) => ({
      module: `@utdk/${provider}`,
      files: { "index.d.ts": `declare const c: unknown; export default c;\n` },
    }));

    const { files, fetchedProviders } = await resolveOnDemandProviderMounts({
      providers: ["github"],
      fetchBundle,
    });

    expect(fetchedProviders).toEqual(["github"]);
    expect(fetchBundle).toHaveBeenCalledTimes(1);
    expect(fetchBundle).toHaveBeenCalledWith("github");
    // Full catalogue must not be fetched ahead of time.
    expect(fetchedProviders.length).toBe(1);
    for (const unused of catalogue.filter((p) => p !== "github")) {
      expect(fetchBundle).not.toHaveBeenCalledWith(unused);
    }

    expect(files["/node_modules/@utdk/github/index.d.ts"]).toBeDefined();
  });

  it("skips builtins without fetching", async () => {
    const fetchBundle = vi.fn(async () => null);
    const { fetchedProviders, files } = await resolveOnDemandProviderMounts({
      providers: ["vfs", "github"],
      fetchBundle,
      builtins: {
        has: (p) => p === "vfs",
        getTypes: () => `declare const client: {}; export default client;\n`,
      },
    });

    expect(fetchedProviders).toEqual(["github"]);
    expect(fetchBundle).toHaveBeenCalledTimes(1);
    expect(files["/node_modules/vfs/index.d.ts"]).toContain("declare const client");
  });
});
