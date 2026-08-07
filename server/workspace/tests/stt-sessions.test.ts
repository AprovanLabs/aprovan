/**
 * End-to-end STT session path against a fake driver
 * (openspec stt-contract §5 / Scenario: A session transcribes pushed audio).
 *
 * Path: tests/ (vitest include) rather than src/__tests__ so the verify command runs.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { SessionEvent, StreamingSessionDriver } from "@utdk/common/streaming";
import { REQUIRED_ENCODING, type SttResult, type SttSegment } from "@utdk/stt";
import { createApp } from "../src/app.js";
import { resetIdentityStore } from "../src/identity/store.js";
import { listInterfaces, resolveInterface } from "../src/interfaces.js";
import { resetRegistryStorage } from "../src/registry-storage.js";
import {
  registerSessionOperation,
  resetSessionStreaming,
} from "../src/routes/sessions-streaming.js";

const NS = "stt";
const OP = "open";

let dataDir: string;

function createFakeSttE2eDriver(): {
  driver: StreamingSessionDriver;
  pushed: Array<Record<string, unknown>>;
} {
  const sinks = new Map<string, (event: SessionEvent) => void>();
  const pushed: Array<Record<string, unknown>> = [];
  const segments = new Map<string, SttSegment[]>();
  const openedAt = new Map<string, number>();
  let n = 0;

  const driver: StreamingSessionDriver = {
    capabilities: {
      streaming: true,
      encodings: [REQUIRED_ENCODING],
    },
    async openSession() {
      const providerSessionId = `fake-stt-${++n}`;
      openedAt.set(providerSessionId, Date.now());
      segments.set(providerSessionId, []);
      return { providerSessionId };
    },
    async push(providerSessionId, message) {
      pushed.push(message);
      const sink = sinks.get(providerSessionId);
      const count = pushed.length;
      const text = ["hel", "hello", "hello world"][count - 1] ?? "hello world";
      sink?.({ type: "partial", seq: 0, data: { text } });
      // One final after the third chunk — finals are per-segment, not end-of-session.
      if (count === 3) {
        const segment: SttSegment = {
          text: "hello world",
          startMs: 0,
          endMs: 300,
        };
        segments.get(providerSessionId)?.push(segment);
        sink?.({ type: "final", seq: 0, data: { segment } });
      }
    },
    async close(providerSessionId) {
      const segs = segments.get(providerSessionId) ?? [];
      const started = openedAt.get(providerSessionId) ?? Date.now();
      const result: SttResult = {
        text: segs.map((s) => s.text).join(" ").trim() || "hello world",
        segments: segs.length > 0 ? segs : [{ text: "hello world", startMs: 0, endMs: 300 }],
        durationMs: Math.max(0, Date.now() - started),
      };
      sinks.delete(providerSessionId);
      openedAt.delete(providerSessionId);
      segments.delete(providerSessionId);
      return result;
    },
    subscribe(providerSessionId, sink) {
      sinks.set(providerSessionId, sink);
      return () => {
        sinks.delete(providerSessionId);
      };
    },
  };

  return { driver, pushed };
}

async function readSseEvents(
  response: Response,
  count: number,
  timeoutMs = 2_000,
): Promise<SessionEvent[]> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  const events: SessionEvent[] = [];
  let buffer = "";
  const deadline = Date.now() + timeoutMs;

  while (events.length < count && Date.now() < deadline) {
    const remaining = deadline - Date.now();
    const timed = await Promise.race([
      reader.read().then((r) => ({ kind: "read" as const, r })),
      new Promise<{ kind: "timeout" }>((resolve) =>
        setTimeout(() => resolve({ kind: "timeout" }), Math.max(1, remaining)),
      ),
    ]);
    if (timed.kind === "timeout") break;
    const { value, done } = timed.r;
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";
    for (const part of parts) {
      const line = part.split("\n").find((l) => l.startsWith("data: "));
      if (!line) continue;
      events.push(JSON.parse(line.slice(6)) as SessionEvent);
      if (events.length >= count) break;
    }
  }
  try {
    await reader.cancel();
  } catch {
    // ignore
  }
  return events;
}

describe("stt interface catalog", () => {
  it("loads stt through the contract package path with no bespoke dispatch branch", () => {
    const stt = resolveInterface("stt");
    expect(stt).toBeDefined();
    expect(stt!.defaultsFor).toContain("open");
    expect(stt!.compat.map((c) => c.provider)).toEqual(
      expect.arrayContaining(["deepgram", "assemblyai"]),
    );
    expect(stt!.compat.find((c) => c.provider === "assemblyai")?.unavailable).toMatch(
      /not built/i,
    );

    const ids = listInterfaces().map((d) => d.id);
    expect(ids.indexOf("stt")).toBeGreaterThan(ids.indexOf("agent"));
  });
});

describe("stt session e2e — fake driver", () => {
  let fake: ReturnType<typeof createFakeSttE2eDriver>;

  beforeEach(async () => {
    dataDir = mkdtempSync(join(tmpdir(), "gateway-stt-e2e-"));
    process.env["WORKSPACE_DATA_DIR"] = dataDir;
    delete process.env["STORE_BACKEND"];
    resetIdentityStore();
    resetRegistryStorage();
    resetSessionStreaming();
    fake = createFakeSttE2eDriver();
    registerSessionOperation(NS, OP, fake.driver);

    // Interface resolve needs a connected deepgram credential (zero-config
    // fallback); the session path then uses the registered fake driver.
    const saved = await createApp().request("/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "deepgram",
        payload: { type: "bearer_token", token: "test-deepgram-key" },
      }),
    });
    expect(saved.status).toBeLessThan(300);
  });

  afterEach(() => {
    resetSessionStreaming();
    resetIdentityStore();
    resetRegistryStorage();
    delete process.env["WORKSPACE_DATA_DIR"];
    rmSync(dataDir, { recursive: true, force: true });
  });

  it("opens, pushes three chunks, receives partials and one final, then closes with a result", async () => {
    const app = createApp();

    const opened = await app.request(`/tools/${NS}/${OP}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ args: {} }),
    });
    expect(opened.status).toBe(200);
    const { sessionId, capabilities } = (
      (await opened.json()) as {
        data: { sessionId: string; capabilities: { encodings: string[] } };
      }
    ).data;
    expect(sessionId).toEqual(expect.any(String));
    expect(capabilities.encodings).toContain(REQUIRED_ENCODING);

    const sse = await app.request(`/tools/${NS}/sessions/${sessionId}`);
    expect(sse.status).toBe(200);
    // partial × 3 + final × 1 (+ end arrives on close)
    const eventsPromise = readSseEvents(sse, 4);

    await new Promise((r) => setTimeout(r, 20));

    for (let seq = 0; seq < 3; seq++) {
      const push = await app.request(`/tools/${NS}/sessions/${sessionId}/push`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: {
            audio: Buffer.alloc(320, 0).toString("base64"),
            seq,
          },
        }),
      });
      expect(push.status).toBe(202);
    }
    expect(fake.pushed).toHaveLength(3);

    const events = await eventsPromise;
    const partials = events.filter((e) => e.type === "partial");
    const finals = events.filter((e) => e.type === "final");
    expect(partials).toHaveLength(3);
    expect(finals).toHaveLength(1);
    expect(finals[0]?.data).toMatchObject({
      segment: { text: "hello world" },
    });

    const close = await app.request(`/tools/${NS}/sessions/${sessionId}/close`, {
      method: "POST",
    });
    expect(close.status).toBe(200);
    const body = (await close.json()) as { data: SttResult };
    expect(body.data.text).toBe("hello world");
    expect(body.data.segments).toEqual([
      expect.objectContaining({ text: "hello world", startMs: 0, endMs: 300 }),
    ]);
    expect(body.data.durationMs).toBeGreaterThanOrEqual(0);
  });
});
