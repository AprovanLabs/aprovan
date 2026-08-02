import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { augmentRegistryProviderDocs, loadRegistryProviderDocs } from "./index.js";

const tempDirs: string[] = [];

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "bundler-index-"));
  tempDirs.push(dir);
  return dir;
}

function installDocsFetchMock(): void {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const method = init?.method ?? "GET";

    if (method === "GET" && url.includes("openai-openapi")) {
      return new Response(
        JSON.stringify({
          openapi: "3.0.0",
          info: { title: "OpenAI API", version: "1.0.0" },
          externalDocs: { url: "https://external.example.com/docs", description: "External docs" },
          paths: {
            "/responses": {
              post: {
                operationId: "responses.create",
                summary: "Create response",
                tags: ["Responses"],
                responses: { "200": { description: "ok" } },
              },
            },
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (method === "HEAD") {
      return new Response("", { status: 200 });
    }

    if (method === "GET") {
      return new Response("<h1>Docs</h1><p>Generated content</p>", {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    }

    return new Response("not found", { status: 404, statusText: "Not Found" });
  });

  vi.stubGlobal("fetch", fetchMock);
}

afterEach(async () => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("docs CLI integration flow", () => {
  it("supports load-docs then augment-docs end-to-end output generation", async () => {
    installDocsFetchMock();
    const docsCacheRoot = await createTempDir();
    const outputRoot = await createTempDir();

    const loadResult = await loadRegistryProviderDocs({
      provider: "openai",
      docsCacheRoot,
      outputRoot,
      seededReferences: [{ source: "registry-seed", url: "https://seeded.example.com/docs" }],
    });

    const augmentResult = await augmentRegistryProviderDocs({
      provider: "openai",
      docsCacheRoot,
      outputRoot,
    });

    expect(loadResult.sourceCount).toBeGreaterThan(0);
    expect(augmentResult.docsPaths.length).toBeGreaterThan(0);

    const readme = await readFile(augmentResult.readmePath, "utf8");
    const packageJson = JSON.parse(await readFile(augmentResult.packageJsonPath, "utf8")) as {
      utdk?: { docs?: { manifestPath?: string; promptHash?: string } };
    };

    expect(readme).toContain("## Operations");
    expect(packageJson.utdk?.docs?.manifestPath).toContain("manifest.json");
    expect(packageJson.utdk?.docs?.promptHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("generates docs with fallback when load artifacts are absent", async () => {
    installDocsFetchMock();
    const docsCacheRoot = await createTempDir();
    const outputRoot = await createTempDir();

    const augmentResult = await augmentRegistryProviderDocs({
      provider: "openai",
      docsCacheRoot,
      outputRoot,
    });

    expect(augmentResult.docsPaths.length).toBeGreaterThan(0);
    expect(augmentResult.staleReason).toBe("docs-cache-missing");

    const readme = await readFile(augmentResult.readmePath, "utf8");
    expect(readme).toContain("## Operations");
  });

  it("blocks non-stale overwrite unless overwrite-docs is provided", async () => {
    installDocsFetchMock();
    const docsCacheRoot = await createTempDir();
    const outputRoot = await createTempDir();

    await loadRegistryProviderDocs({
      provider: "openai",
      docsCacheRoot,
      outputRoot,
      seededReferences: [{ source: "registry-seed", url: "https://seeded.example.com/docs" }],
    });

    await augmentRegistryProviderDocs({
      provider: "openai",
      docsCacheRoot,
      outputRoot,
    });

    await expect(
      augmentRegistryProviderDocs({
        provider: "openai",
        docsCacheRoot,
        outputRoot,
      }),
    ).rejects.toMatchObject({
      code: "DOCS_OVERWRITE_BLOCKED",
      details: {
        staleReason: "up-to-date",
      },
    });
  });
});
