import { describe, expect, it } from "vitest";
import { discoverDocsReferences } from "./discover.js";
import type { RegistryProvider } from "../provider.js";
import type { DocsDiscoveredReference } from "./types.js";

describe("discoverDocsReferences", () => {
  it("applies seeded > package metadata > openapi precedence with deduping", () => {
    const provider: RegistryProvider = {
      name: "openai",
      url: "https://example.com/openapi.json",
      metadata: {
        documentation_url: "https://docs.example.com/openapi",
      } as never,
    } as RegistryProvider;
    const openApiDocument = {
      openapi: "3.0.0",
      info: {
        title: "Example",
      },
      externalDocs: {
        url: "https://docs.example.com/openapi",
        description: "Reference docs",
      },
    } as never;
    const seededReferences: DocsDiscoveredReference[] = [
      {
        source: "registry-seed",
        url: "https://docs.example.com/openapi",
        label: "Seeded docs",
      },
    ];
    const packageMetadataReferences: DocsDiscoveredReference[] = [
      {
        source: "package-metadata",
        url: "https://docs.example.com/openapi",
        label: "Package docs",
      },
      {
        source: "package-metadata",
        url: "https://docs.example.com/package",
        label: "Package unique",
      },
    ];

    const discovered = discoverDocsReferences({
      provider,
      openApiDocument,
      seededReferences,
      packageMetadataReferences,
    });

    expect(discovered[0]).toMatchObject({
      source: "registry-seed",
      label: "Seeded docs",
      url: "https://docs.example.com/openapi",
    });
    expect(discovered.some((reference) => reference.url === "https://docs.example.com/package")).toBe(true);
    expect(discovered.filter((reference) => reference.url === "https://docs.example.com/openapi")).toHaveLength(1);
  });
});
