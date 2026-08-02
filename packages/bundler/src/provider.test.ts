import { describe, expect, it } from "vitest";
import {
  getPrimaryProviderAuthOption,
  getProviderClientImportPath,
  getProviderPackageName,
  normalizeProviderName,
  resolveProvider,
  resolveProviderDocsCacheDir,
  resolveProviderDocsIndexPath,
  resolveProviderDocsManifestPath,
  resolveProviderDocsOutputDir,
  resolveProviderDocsSourcesDir,
  resolveProviderOutputDir,
  splitProviderName,
  stripProviderToolName,
} from "./provider.js";

describe("provider naming helpers", () => {
  it("splits provider names on slashes only, never dots", () => {
    expect(splitProviderName("google/drive")).toEqual(["google", "drive"]);
    expect(splitProviderName("synthetic-new")).toEqual(["synthetic-new"]);
    // A hypothetical dotted name is NOT split at the dot — dots are not a
    // provider-identity separator (the naming authority forbids them).
    expect(splitProviderName("synthetic.new")).toEqual(["synthetic.new"]);
    expect(normalizeProviderName("google/books")).toBe("google/books");
    expect(resolveProviderOutputDir("google/books", "/tmp/out")).toBe("/tmp/out/google/books");
    expect(getProviderPackageName("google/books")).toBe("@utdk/google");
    expect(getProviderClientImportPath("google/books")).toBe("../../client.js");
  });

  it("resolves providers by slash-separated name", () => {
    const providers = [{ name: "google/books", url: "https://example.com/google-books.json" }];

    expect(resolveProvider(providers, "google/books")).toEqual(providers[0]);
  });

  it("supports stripping an additional operation prefix", () => {
    expect(
      stripProviderToolName("google.books.books.volumes.list", {
        name: "google/books",
        options: {
          operations: {
            stripPrefix: "books.",
          },
        },
      }),
    ).toBe("volumes.list");
  });

  it("preserves the first configured auth method for UTCP discovery", () => {
    const apiKeyAuth = {
      auth_type: "api_key",
      api_key: "${OPENAI_API_KEY}",
      var_name: "Authorization",
      location: "header",
    };
    const oauthAuth = {
      auth_type: "oauth2",
      client_id: "${CLIENT_ID}",
      client_secret: "${CLIENT_SECRET}",
      token_url: "https://accounts.example.com/token",
    };

    expect(getPrimaryProviderAuthOption({ auth: apiKeyAuth })).toEqual(apiKeyAuth);
    expect(getPrimaryProviderAuthOption({ auth: [apiKeyAuth, oauthAuth] })).toEqual(apiKeyAuth);
  });

  it("resolves provider docs cache and output paths", () => {
    expect(resolveProviderDocsCacheDir("google/books", "/tmp/cache")).toBe("/tmp/cache/google/books");
    expect(resolveProviderDocsManifestPath("google/books", "/tmp/cache")).toBe("/tmp/cache/google/books/manifest.json");
    expect(resolveProviderDocsSourcesDir("google/books", "/tmp/cache")).toBe("/tmp/cache/google/books/sources");
    expect(resolveProviderDocsIndexPath("google/books", "/tmp/cache")).toBe("/tmp/cache/google/books/index.md");
    expect(resolveProviderDocsOutputDir("google/books", "/tmp/out")).toBe("/tmp/out/google/books/docs");
  });
});
