/**
 * Tests for the OpenTelemetry integration in client.ts.
 *
 * Verifies that:
 * - `withSpan` is called with span name "utdk.request" for every executeRequest
 * - Required attributes (utdk.provider, utdk.operation, http.method, http.url,
 *   http.status_code) are set on the span
 * - error.message is set when the request fails
 * - `injectTraceContext` is called so W3C traceparent headers propagate
 * - The noop path (telemetry disabled) still executes fetch correctly
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createClient } from "./client.js";
import { configureTelemetry, injectTraceContext, withSpan } from "./common/telemetry.js";

vi.mock("./common/telemetry.js", () => ({
  withSpan: vi.fn(),
  injectTraceContext: vi.fn(),
  configureTelemetry: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function makeMockSpan() {
  return {
    setAttribute: vi.fn().mockReturnThis(),
    setStatus: vi.fn().mockReturnThis(),
    recordException: vi.fn().mockReturnThis(),
    end: vi.fn(),
  };
}

const simpleDocument = {
  openapi: "3.0.0",
  info: { title: "Test", version: "1.0.0" },
  servers: [{ url: "https://api.test.com" }],
  paths: {
    "/items": {
      get: {
        operationId: "list-items",
        responses: { "200": { description: "ok", content: { "application/json": { schema: { type: "object" } } } } },
      },
    },
  },
} as const;

const listItemsMetadata = {
  "myProvider.list-items": {
    accessPath: ["listItems"],
    bodyKind: "none" as const,
    bodyPropertyKeys: [] as string[],
    headerParameterKeys: [] as string[],
    method: "GET",
    routeTemplate: "/items",
    pathConflictKeys: [] as string[],
    pathParameterKeys: [] as string[],
    queryConflictKeys: [] as string[],
    queryParameterKeys: [] as string[],
  },
};

const clientOptions = {
  name: "myProvider",
  openApiDocument: simpleDocument,
  toolMetadata: listItemsMetadata,
  baseUrl: "https://api.test.com",
};

// ---------------------------------------------------------------------------
// Tests: span creation and attributes
// ---------------------------------------------------------------------------

describe("telemetry: span creation", () => {
  let capturedSpan: ReturnType<typeof makeMockSpan>;

  beforeEach(() => {
    capturedSpan = makeMockSpan();
    vi.mocked(configureTelemetry).mockResolvedValue(undefined);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(withSpan).mockImplementation(async (_ctx: any, fn: any) => fn(capturedSpan));
    vi.mocked(injectTraceContext).mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("calls withSpan with spanName 'utdk.request' and correct provider/operation", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({}), { status: 200, headers: { "Content-Type": "application/json" } }),
      ),
    );

    const client = await createClient<{ listItems: () => Promise<unknown> }>(clientOptions);
    await client.listItems();

    expect(vi.mocked(withSpan)).toHaveBeenCalledOnce();
     
    const [ctx] = vi.mocked(withSpan).mock.calls[0]!;
    expect((ctx as { spanName?: string }).spanName).toBe("utdk.request");
    expect((ctx as { provider: string }).provider).toBe("myProvider");
    expect((ctx as { operation: string }).operation).toBe("listItems");
  });

  it("sets utdk.provider, utdk.operation, http.method, and http.url attributes", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({}), { status: 200, headers: { "Content-Type": "application/json" } }),
      ),
    );

    const client = await createClient<{ listItems: () => Promise<unknown> }>(clientOptions);
    await client.listItems();

    expect(capturedSpan.setAttribute).toHaveBeenCalledWith("utdk.provider", "myProvider");
    expect(capturedSpan.setAttribute).toHaveBeenCalledWith("utdk.operation", "listItems");
    expect(capturedSpan.setAttribute).toHaveBeenCalledWith("http.method", "GET");
    expect(capturedSpan.setAttribute).toHaveBeenCalledWith("http.url", "https://api.test.com/items");
  });

  it("sets http.status_code on the span after a successful response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } }),
      ),
    );

    const client = await createClient<{ listItems: () => Promise<unknown> }>(clientOptions);
    await client.listItems();

    expect(capturedSpan.setAttribute).toHaveBeenCalledWith("http.status_code", 200);
  });

  it("sets error.message on the span when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("Not Found", { status: 404, statusText: "Not Found" }),
      ),
    );

    const client = await createClient<{ listItems: () => Promise<unknown> }>(clientOptions);
    await expect(client.listItems()).rejects.toThrow("Request failed: 404");

    expect(capturedSpan.setAttribute).toHaveBeenCalledWith("http.status_code", 404);
    const errorCall = capturedSpan.setAttribute.mock.calls.find(
      (args) => args[0] === "error.message",
    );
    expect(errorCall).toBeDefined();
    expect(String(errorCall![1])).toContain("404");
  });
});

// ---------------------------------------------------------------------------
// Tests: W3C trace context propagation
// ---------------------------------------------------------------------------

describe("telemetry: W3C trace context propagation", () => {
  let capturedSpan: ReturnType<typeof makeMockSpan>;

  beforeEach(() => {
    capturedSpan = makeMockSpan();
    vi.mocked(configureTelemetry).mockResolvedValue(undefined);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(withSpan).mockImplementation(async (_ctx: any, fn: any) => fn(capturedSpan));
    // Simulate OTel SDK injecting a traceparent header
    vi.mocked(injectTraceContext).mockImplementation((headers: Record<string, string>) => {
      headers["traceparent"] = "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01";
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("calls injectTraceContext so W3C traceparent is propagated in outgoing headers", async () => {
    let capturedFetchHeaders: Record<string, string> | undefined;

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((_url: string, init: RequestInit) => {
        capturedFetchHeaders = init.headers as Record<string, string>;
        return Promise.resolve(
          new Response(JSON.stringify({}), { status: 200, headers: { "Content-Type": "application/json" } }),
        );
      }),
    );

    const client = await createClient<{ listItems: () => Promise<unknown> }>(clientOptions);
    await client.listItems();

    expect(vi.mocked(injectTraceContext)).toHaveBeenCalledOnce();
    // The traceparent injected by the mock should appear in the outgoing fetch call
    expect(capturedFetchHeaders?.["traceparent"]).toBe(
      "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
    );
  });
});

// ---------------------------------------------------------------------------
// Tests: noop / telemetry-disabled path
// ---------------------------------------------------------------------------

describe("telemetry: noop path", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes fetch correctly when withSpan is a passthrough noop", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(withSpan).mockImplementation(async (_ctx: any, fn: any) => {
      const noopSpan = {
        setAttribute() { return this; },
        setStatus() { return this; },
        recordException() { return this; },
        end() {},
      };
      return fn(noopSpan);
    });
    vi.mocked(configureTelemetry).mockResolvedValue(undefined);
    vi.mocked(injectTraceContext).mockImplementation(() => {});

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ result: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const client = await createClient<{ listItems: () => Promise<{ result: string }> }>(clientOptions);
    const result = await client.listItems();

    expect(result).toEqual({ result: "ok" });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.test.com/items",
      expect.objectContaining({ method: "GET" }),
    );
  });
});
