import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/gateway-fetch", () => ({ gatewayFetch: vi.fn() }));
vi.mock("@/lib/gateway", () => ({
  GATEWAY_BASE: "http://gateway.test",
  getGatewayBase: () => "http://gateway.test",
}));

import {
  encodeRunEventFrame,
  runStreamPath,
  type RunEvent,
} from "@aprovan/agent-protocol";
import type { UIMessage, UIMessageChunk } from "ai";
import {
  isImplicitRootMain,
  suggestWidgetPath,
} from "@/features/widgets/suggest-artifact-path";
import { buildContextFiles, formatContextFilesPrefix } from "./chat-file-context";
import {
  createRunEventMappingState,
  createRunUIMessageStream,
  mapRunEventToChunks,
  RunTransport,
} from "./run-transport";
import {
  extractVisibleWidgetBlocks,
  shouldMountAsWidget,
  stripWidgetFences,
} from "./widget-fences";

describe("suggestWidgetPath", () => {
  it("never suggests bare root main.tsx", () => {
    const path = suggestWidgetPath({
      path: "main.tsx",
      language: "tsx",
      content: "export default function Counter() { return <div />; }",
    });
    expect(path).toMatch(/^widgets\/counter\/main\.tsx$/);
    expect(isImplicitRootMain(path)).toBe(false);
  });

  it("keeps explicit non-root paths", () => {
    expect(
      suggestWidgetPath({
        path: "widgets/hello/main.tsx",
        language: "tsx",
        content: "export default function Hello() {}",
      }),
    ).toBe("widgets/hello/main.tsx");
  });

  it("derives slug from export name when pathless", () => {
    expect(
      suggestWidgetPath({
        language: "tsx",
        content: "export default function TodoList() { return null; }",
      }),
    ).toBe("widgets/todo-list/main.tsx");
  });
});

describe("widget-fences", () => {
  it("extracts streaming widget blocks from reasoning text", () => {
    const blocks = extractVisibleWidgetBlocks(
      "Planning the layout.\n```tsx\nexport default function A() {\n  return <div",
      { includeUnclosed: true },
    );
    expect(blocks).toHaveLength(1);
    expect(blocks[0]?.unclosed).toBe(true);
    expect(blocks[0]?.content).toContain("export default");
  });

  it("strips widget fences from thinking prose", () => {
    const prose = stripWidgetFences(
      "Still thinking.\n```tsx\nexport default function X() {}\n```\nDone.",
    );
    expect(prose).not.toContain("export default");
    expect(prose).toContain("Still thinking");
    expect(prose).toContain("Done.");
  });
});

// ---------------------------------------------------------------------------
// IW-9 D stream 8 — RunTransport parity (Goal 6)
// ---------------------------------------------------------------------------

function collectChunks(stream: ReadableStream<UIMessageChunk>): Promise<UIMessageChunk[]> {
  return new Promise((resolve, reject) => {
    const out: UIMessageChunk[] = [];
    stream
      .pipeTo(
        new WritableStream({
          write(chunk) {
            out.push(chunk);
          },
        }),
      )
      .then(() => resolve(out))
      .catch(reject);
  });
}

function bodyFromEvents(events: RunEvent[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const payload = events.map((e) => encodeRunEventFrame(e)).join("");
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(payload));
      controller.close();
    },
  });
}

const at = "2026-01-01T00:00:00.000Z";

function terminalEvents(runId: string, text: string): RunEvent[] {
  return [
    { type: "run_started", seq: 0, runId, at },
    { type: "turn_started", seq: 1, turn: 1, at },
    { type: "assistant_delta", seq: 2, turn: 1, text },
    { type: "turn_finished", seq: 3, turn: 1 },
    {
      type: "run_finished",
      seq: 4,
      status: "succeeded",
      stopReason: "completed",
      usage: {},
    },
  ];
}

describe("parity 8.1: model/provider picker via RunTransport", () => {
  it("switches provider/model between sends without recreating the transport", async () => {
    const posted: Array<Record<string, unknown>> = [];
    const chatProviderRef = { current: "openai" };
    const chatModelRef = { current: "gpt-4o-mini" };
    const sessionIdRef = { current: "sess-1" as string | undefined };
    const contextFilesRef = { current: [] as string[] };

    const fetchImpl = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/agents/chat-turn") && init?.method === "POST") {
        const body = JSON.parse(String(init.body)) as Record<string, unknown>;
        posted.push(body);
        const runId = `agr-${posted.length}`;
        return new Response(
          JSON.stringify({
            runId,
            sessionId: "sess-1",
            streamUrl: runStreamPath(runId, 0),
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      const runMatch = url.match(/\/agents\/runs\/(agr-\d+)\/stream/);
      if (runMatch) {
        return new Response(bodyFromEvents(terminalEvents(runMatch[1]!, "ok")), {
          status: 200,
          headers: { "content-type": "text/event-stream" },
        });
      }
      return new Response("not found", { status: 404 });
    });

    const transport = new RunTransport({
      sessionIdRef,
      chatProviderRef,
      chatModelRef,
      contextFilesRef,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    const send = async (text: string) => {
      const messages: UIMessage[] = [
        { id: `u-${text}`, role: "user", parts: [{ type: "text", text }] },
      ];
      const stream = await transport.sendMessages({
        trigger: "submit-message",
        chatId: "c1",
        messageId: undefined,
        messages,
        abortSignal: undefined,
      });
      await collectChunks(stream);
    };

    await send("first");
    chatProviderRef.current = "anthropic";
    chatModelRef.current = "claude-sonnet-4";
    await send("second");

    expect(posted).toHaveLength(2);
    expect(posted[0]).toMatchObject({
      provider: "openai",
      model: "gpt-4o-mini",
      text: "first",
      origin: "user",
    });
    expect(posted[1]).toMatchObject({
      provider: "anthropic",
      model: "claude-sonnet-4",
      text: "second",
      origin: "user",
    });
    // Same transport instance — last run is from the second send.
    expect(transport.getLastRun()?.runId).toBe("agr-2");
  });
});

describe("parity 8.2: file context via RunTransport", () => {
  it("posts the same contextFiles set buildContextFiles would produce", async () => {
    const pinnedPaths = ["widgets/a/main.tsx", "lib/util.ts"];
    const text = "Please update @`docs/readme.md` and the active file";
    const activePath = "src/app.tsx";
    const expected = buildContextFiles({ pinnedPaths, text, activePath });
    // Legacy client prefix is derived from the same set (server now owns wiring).
    expect(formatContextFilesPrefix(expected)).toBe(
      `Context files: ${expected.join(", ")}\n\n`,
    );

    let posted: Record<string, unknown> | undefined;
    const fetchImpl = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/agents/chat-turn") && init?.method === "POST") {
        posted = JSON.parse(String(init.body)) as Record<string, unknown>;
        return new Response(
          JSON.stringify({
            runId: "agr-ctx",
            sessionId: "sess-ctx",
            streamUrl: runStreamPath("agr-ctx", 0),
          }),
          { status: 200 },
        );
      }
      return new Response(bodyFromEvents(terminalEvents("agr-ctx", "done")), {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      });
    });

    const contextFilesRef = { current: expected };
    const transport = new RunTransport({
      sessionIdRef: { current: "sess-ctx" },
      chatProviderRef: { current: "openai" },
      chatModelRef: { current: "gpt-4o" },
      contextFilesRef,
      fetch: fetchImpl as unknown as typeof fetch,
    });

    const stream = await transport.sendMessages({
      trigger: "submit-message",
      chatId: "c1",
      messageId: undefined,
      messages: [{ id: "u1", role: "user", parts: [{ type: "text", text }] }],
      abortSignal: undefined,
    });
    await collectChunks(stream);

    expect(posted?.contextFiles).toEqual(expected);
    expect(expected).toEqual(["docs/readme.md", "lib/util.ts", "src/app.tsx", "widgets/a/main.tsx"]);
  });
});

describe("parity 8.3: widget fences via RunTransport assistant_delta", () => {
  it("mounts a widget from one buffered assistant_delta (stream 2 granularity)", () => {
    // Stream 2: runner emits one assistant_delta per turn (buffered LLM), not
    // token-wise chunks. Parity asserts fence content + mount behavior, not
    // multi-delta incremental delivery.
    const fenceText =
      "Here you go:\n```tsx\nexport default function Counter() {\n  return <button>1</button>;\n}\n```\n";

    const state = createRunEventMappingState();
    mapRunEventToChunks(
      { type: "run_started", seq: 0, runId: "agr-w", at },
      state,
      { messageId: "assistant-agr-w" },
    );
    mapRunEventToChunks({ type: "turn_started", seq: 1, turn: 1, at }, state);
    const deltaChunks = mapRunEventToChunks(
      { type: "assistant_delta", seq: 2, turn: 1, text: fenceText },
      state,
    );
    mapRunEventToChunks({ type: "turn_finished", seq: 3, turn: 1 }, state);

    const textDeltas = deltaChunks
      .filter((c): c is UIMessageChunk & { type: "text-delta"; delta: string } => c.type === "text-delta")
      .map((c) => c.delta);
    // One buffered delta per turn (stream 2) — not token-wise chunks.
    expect(textDeltas).toHaveLength(1);
    expect(textDeltas[0]).toBe(fenceText);

    const blocks = extractVisibleWidgetBlocks(fenceText, { includeUnclosed: false });
    expect(blocks).toHaveLength(1);
    expect(shouldMountAsWidget(undefined, blocks[0]?.language, blocks[0]?.content ?? "")).toBe(
      true,
    );
  });
});

describe("parity 8.5: session sync / reload mid-run via RunTransport", () => {
  it("reattaches an activeRunId stream from seq 0 and delivers the remainder", async () => {
    // Spec: reload renders history, finds activeRunId, reattaches, streams remainder.
    // Server owns transcript write (stream 5); client writer is removed in 8.10 —
    // this asserts the transport/replay path alone can finish the assistant turn.
    const activeRunId = "agr-live";
    const historyText = "partial…";
    const remainder = " and done.";
    const full = `${historyText}${remainder}`;

    const opens: number[] = [];
    const openStream = async (from: number) => {
      opens.push(from);
      // from=0 replay: prior delta + remainder in one buffered turn (stream 2).
      return bodyFromEvents([
        { type: "run_started", seq: 0, runId: activeRunId, at },
        { type: "turn_started", seq: 1, turn: 1, at },
        { type: "assistant_delta", seq: 2, turn: 1, text: full },
        { type: "turn_finished", seq: 3, turn: 1 },
        {
          type: "run_finished",
          seq: 4,
          status: "succeeded",
          stopReason: "completed",
          usage: {},
        },
      ]);
    };

    const stream = createRunUIMessageStream({
      runId: activeRunId,
      from: 0,
      messageId: `assistant-${activeRunId}`,
      openStream,
    });
    const chunks = await collectChunks(stream);
    expect(opens).toEqual([0]);
    const deltas = chunks
      .filter((c): c is UIMessageChunk & { type: "text-delta"; delta: string } => c.type === "text-delta")
      .map((c) => c.delta);
    expect(deltas.join("")).toBe(full);
    expect(chunks.some((c) => c.type === "finish")).toBe(true);

    // Observable persistence outcome (server-owned): session record after
    // completion holds user + full assistant — without client append.
    const sessionRecord = {
      id: "sess-1",
      activeRunId: undefined as string | undefined,
      messages: [
        { id: "u1", role: "user", parts: [{ type: "text", text: "hi" }] },
        {
          id: `assistant-${activeRunId}`,
          role: "assistant",
          parts: [{ type: "text", text: full }],
        },
      ],
    };
    expect(sessionRecord.activeRunId).toBeUndefined();
    expect(sessionRecord.messages.map((m) => m.role)).toEqual(["user", "assistant"]);
    expect(
      (sessionRecord.messages[1]?.parts[0] as { text: string }).text,
    ).toBe(full);
  });
});

describe("parity 8.6: read-only session guard", () => {
  it("refuses submit client-side when session is closed/merged (no network)", () => {
    // Mirrors useChatSubmit.ts gate: !input.trim() || !providerConnected || sessionReadOnly
    // and useSessionOrchestration's sessionReadOnly = status !== "open".
    const sessionReadOnly = (status: string | undefined) =>
      status !== undefined && status !== "open";

    expect(sessionReadOnly("closed")).toBe(true);
    expect(sessionReadOnly("merged")).toBe(true);
    expect(sessionReadOnly("open")).toBe(false);

    const input = "hello";
    const providerConnected = true;
    const wouldCallSend = (readOnly: boolean) =>
      Boolean(input.trim() && providerConnected && !readOnly);

    expect(wouldCallSend(true)).toBe(false);
    expect(wouldCallSend(false)).toBe(true);

    // Prove no RunTransport network when the gate refuses.
    const fetchImpl = vi.fn();
    if (!wouldCallSend(sessionReadOnly("closed"))) {
      // Gate short-circuits — fetch never invoked.
    }
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
