import { afterEach, describe, expect, it, vi } from "vitest";
import { validateDocsReferences } from "./validate.js";

describe("validateDocsReferences", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("captures canonical urls for valid references and reports failures", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);

      if (url === "https://docs.example.com/seeded" && init?.method === "HEAD") {
        return new Response("", {
          status: 200,
          headers: { "Content-Type": "text/html" },
        });
      }

      if (url === "https://docs.example.com/fallback" && init?.method === "HEAD") {
        return new Response("method not allowed", { status: 405 });
      }

      if (url === "https://docs.example.com/fallback" && init?.method === "GET") {
        return new Response("ok", { status: 200 });
      }

      return new Response("not found", { status: 404, statusText: "Not Found" });
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await validateDocsReferences([
      { source: "registry-seed", url: "https://docs.example.com/seeded", label: "Seeded" },
      { source: "registry-seed", url: "https://docs.example.com/fallback", label: "Fallback" },
      { source: "registry-seed", url: "https://docs.example.com/missing", label: "Missing" },
    ]);

    expect(result.valid).toHaveLength(2);
    expect(result.failed).toHaveLength(1);
    expect(result.failed[0]?.url).toBe("https://docs.example.com/missing");
    expect(result.failed[0]?.status).toBe(404);
  });
});
