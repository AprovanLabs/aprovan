import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { augmentProviderDocs } from "./augment.js";
import { createDocsManifest, writeDocsManifest } from "./manifest.js";

const tempDirs: string[] = [];

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "bundler-docs-augment-"));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("augmentProviderDocs", () => {
  it("builds readme/docs output and package docs metadata from cached load artifacts", async () => {
    const docsCacheRoot = await createTempDir();
    const outputRoot = await createTempDir();
    const provider = "openai";
    const providerCacheDir = path.join(docsCacheRoot, "openai");
    const manifestPath = path.join(providerCacheDir, "manifest.json");
    const indexPath = path.join(providerCacheDir, "index.md");

    await mkdir(providerCacheDir, { recursive: true });
    await writeDocsManifest(
      manifestPath,
      createDocsManifest(provider, {
        openApi: { hash: "openapi-hash", url: "https://example.com/openapi.json" },
        sources: [
          {
            sourceUrl: "https://docs.example.com",
            canonicalUrl: "https://docs.example.com",
            category: "reference",
            filePath: path.join(providerCacheDir, "sources", "001-docs.md"),
            sha256: "abc",
            fetchedAt: "2026-04-07T00:00:00.000Z",
          },
        ],
      }),
    );
    await writeFile(indexPath, "# openai docs cache index\n\n- source\n", "utf8");

    const result = await augmentProviderDocs({
      provider,
      docsCacheRoot,
      outputRoot,
      openApiDocument: {
        openapi: "3.0.0",
        info: { title: "OpenAI", version: "1.0.0" },
        paths: {
          "/responses": {
            post: {
              operationId: "responses.create",
              summary: "Create response",
              tags: ["Responses"],
              responses: {
                "200": { description: "ok" },
              },
            },
          },
        },
      } as never,
    });

    expect(result.readme).toContain("## Operations");
    expect(result.docs).toHaveLength(1);
    expect(result.docs[0]?.relativePath).toBe("responses.md");
    expect(result.docs[0]?.content).toContain("## `openai.responsesCreate`");
    expect(result.metadata.sourceCount).toBe(1);
    expect(result.metadata.promptHash).toMatch(/^[a-f0-9]{64}$/);
    expect(result.metadata.manifestPath).toBe(manifestPath);
    expect(result.staleReason).toBe("openapi-hash-missing");
  });

  it("generates docs from OpenAPI when manifest is missing (fallback)", async () => {
    const docsCacheRoot = await createTempDir();
    const outputRoot = await createTempDir();
    const provider = "openai";

    const result = await augmentProviderDocs({
      provider,
      docsCacheRoot,
      outputRoot,
      openApiDocument: {
        openapi: "3.0.0",
        info: { title: "OpenAI", version: "1.0.0" },
        paths: {
          "/responses": {
            post: {
              operationId: "responses.create",
              summary: "Create response",
              tags: ["Responses"],
              responses: {
                "200": { description: "ok" },
              },
            },
          },
        },
      } as never,
    });

    expect(result.staleReason).toBe("docs-cache-missing");
    expect(result.readme).toContain("## Operations");
    expect(result.readme).toContain("## Source Index");
    expect(result.docs).toHaveLength(1);
    expect(result.docs[0]?.relativePath).toBe("responses.md");
    expect(result.docs[0]?.content).toContain("## `openai.responsesCreate`");
    expect(result.metadata.sourceCount).toBe(0);
    expect(result.metadata.openApiHash).toBeNull();
    expect(result.metadata.promptHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
