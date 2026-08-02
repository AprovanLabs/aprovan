import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { loadProviderDocs } from "./load.js";

const tempDirs: string[] = [];

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "bundler-docs-load-"));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("loadProviderDocs", () => {
  it("writes manifest and index with partial validation failures", async () => {
    const docsCacheRoot = await createTempDir();
    const outputRoot = await createTempDir();
    const packageDir = path.join(outputRoot, "openai");

    await rm(packageDir, { recursive: true, force: true });
    await mkdir(packageDir, { recursive: true });
    await writeFile(
      path.join(packageDir, "package.json"),
      JSON.stringify(
        {
          private: true,
          utdk: {
            docs: {
              references: [
                {
                  url: "https://package.example.com/docs",
                  label: "Package docs",
                  category: "guide",
                },
              ],
            },
          },
        },
        null,
        2,
      ),
      "utf8",
    );

    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method ?? "GET";

      if (url.includes("openai-openapi") && method === "GET") {
        return new Response(
          JSON.stringify({
            openapi: "3.0.0",
            info: { title: "OpenAI API", version: "1.0.0" },
            externalDocs: { url: "https://external.example.com/docs", description: "Reference docs" },
            paths: {},
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      if (method === "HEAD" && url === "https://seeded.example.com/docs") {
        return new Response("", { status: 200 });
      }

      if (method === "HEAD" && url === "https://package.example.com/docs") {
        return new Response("", { status: 404, statusText: "Not Found" });
      }

      if (method === "HEAD" && url.includes("platform.openai.com/docs/api-reference")) {
        return new Response("", { status: 200 });
      }

      if (method === "HEAD" && url === "https://external.example.com/docs") {
        return new Response("", { status: 200 });
      }

      if (method === "GET" && (url === "https://seeded.example.com/docs" || url === "https://external.example.com/docs")) {
        return new Response("<h1>Example docs</h1><p>Normalized body</p>", {
          status: 200,
          headers: { "Content-Type": "text/html" },
        });
      }

      if (method === "GET" && url.includes("platform.openai.com/docs/api-reference")) {
        return new Response("OpenAI docs", {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      }

      return new Response("not found", { status: 404, statusText: "Not Found" });
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await loadProviderDocs({
      provider: "openai",
      docsCacheRoot,
      outputRoot,
      seededReferences: [
        {
          source: "registry-seed",
          url: "https://seeded.example.com/docs",
          label: "Seeded docs",
          category: "reference",
        },
      ],
    });

    expect(result.provider).toBe("openai");
    expect(result.discoveredCount).toBeGreaterThan(0);
    expect(result.validatedCount).toBeGreaterThan(0);
    expect(result.failedCount).toBeGreaterThan(0);
    expect(result.sourceCount).toBeGreaterThan(0);

    const manifestRaw = await readFile(result.manifestPath, "utf8");
    const indexRaw = await readFile(result.indexPath, "utf8");
    const manifest = JSON.parse(manifestRaw) as {
      warnings: string[];
      sources: Array<{ filePath: string }>;
      references: Array<{ url: string }>;
    };

    expect(manifest.references.some((reference) => reference.url === "https://seeded.example.com/docs")).toBe(true);
    expect(manifest.warnings.some((warning) => warning.includes("package.example.com/docs"))).toBe(true);
    expect(manifest.sources.length).toBeGreaterThan(0);
    expect(indexRaw).toContain("## Warnings");
    expect(indexRaw).toContain("### reference");
  });
});
