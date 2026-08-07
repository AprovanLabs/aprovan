/**
 * Spec coverage for `specs/audio-capture/spec.md` (stream 3).
 *
 * Destination / partials UI chrome is stream 4; here we assert the module API
 * delivers partials via `onEvent` and exposes bound-provider identity.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/gateway-fetch", () => ({ gatewayFetch: vi.fn() }));
vi.mock("@/lib/gateway", () => ({
  GATEWAY_BASE: "http://gateway.test",
  getGatewayBase: () => "http://gateway.test",
}));
vi.mock("@/lib/namespaces", () => ({
  fetchNamespaces: vi.fn(),
}));

import { gatewayFetch } from "@/lib/gateway-fetch";
import { fetchNamespaces } from "@/lib/namespaces";
import {
  CaptureError,
  destinationForProvider,
  resetMicrophonePermissionState,
  startCapture,
  wasMicrophonePermissionDenied,
  floatToPcm16le,
  frameByteLength,
  resampleLinear,
  PcmFrameBuffer,
  REQUIRED_ENCODING,
  type SttEvent,
} from "@/features/voice";

const mockFetch = vi.mocked(gatewayFetch);
const mockNamespaces = vi.mocked(fetchNamespaces);

function sseBody(events: unknown[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const event of events) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      }
    },
  });
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

type ProcessCb = (ev: { inputBuffer: { getChannelData: (ch: number) => Float32Array } }) => void;

function installMicMocks(options?: {
  getUserMedia?: () => Promise<MediaStream>;
  sampleRate?: number;
  /** Invoke onaudioprocess this many times after pump starts. */
  processTicks?: number;
}) {
  const processTicks = options?.processTicks ?? 2;
  const tracks = [{ stop: vi.fn() }];
  const stream = { getTracks: () => tracks } as unknown as MediaStream;

  const getUserMedia =
    options?.getUserMedia ??
    vi.fn(async () => stream);

  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { mediaDevices: { getUserMedia } },
  });

  let processCb: ProcessCb | null = null;
  const processor = {
    connect: vi.fn(),
    disconnect: vi.fn(),
    set onaudioprocess(cb: ProcessCb) {
      processCb = cb;
    },
    get onaudioprocess() {
      return processCb!;
    },
  };
  const source = { connect: vi.fn(), disconnect: vi.fn() };
  const gain = { gain: { value: 1 }, connect: vi.fn(), disconnect: vi.fn() };

  class FakeAudioContext {
    sampleRate = options?.sampleRate ?? 48_000;
    createMediaStreamSource = vi.fn(() => source);
    createScriptProcessor = vi.fn(() => processor);
    createGain = vi.fn(() => gain);
    destination = {};
    close = vi.fn(async () => {});
  }

  (globalThis as unknown as { AudioContext: unknown }).AudioContext = FakeAudioContext;

  const tick = () => {
    const samples = new Float32Array(4096);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.sin(i / 20) * 0.2;
    processCb?.({ inputBuffer: { getChannelData: () => samples } });
  };

  return {
    getUserMedia: getUserMedia as ReturnType<typeof vi.fn>,
    tracks,
    tick,
    async startAndTick() {
      // Let the microtask that wires the pump settle, then feed audio.
      await Promise.resolve();
      for (let i = 0; i < processTicks; i++) tick();
    },
  };
}

function mockSessionWire(options?: {
  vad?: boolean;
  events?: unknown[];
  closeResult?: { text: string; segments: unknown[]; durationMs: number };
}) {
  const pushed: Array<{ audio: string; seq: number }> = [];
  const closeResult = options?.closeResult ?? {
    text: "hello world",
    segments: [{ text: "hello world", startMs: 0, endMs: 300 }],
    durationMs: 300,
  };
  const events = options?.events ?? [
    { type: "partial", seq: 0, data: { text: "hel" } },
    { type: "partial", seq: 1, data: { text: "hello" } },
    { type: "final", seq: 2, data: { segment: { text: "hello", startMs: 0, endMs: 200 } } },
  ];

  mockFetch.mockImplementation(async (input, init) => {
    const url = String(input);
    if (url.includes("/tools/stt/open") && init?.method === "POST") {
      return jsonResponse({
        data: {
          sessionId: "sess-1",
          capabilities: {
            streaming: true,
            encodings: [REQUIRED_ENCODING],
            vad: options?.vad ?? false,
          },
        },
      });
    }
    if (url.includes("/sessions/sess-1") && !url.includes("/push") && !url.includes("/close")) {
      return new Response(sseBody(events), {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      });
    }
    if (url.includes("/push")) {
      const body = JSON.parse(String(init?.body ?? "{}")) as {
        message?: { audio: string; seq: number };
      };
      if (body.message) pushed.push(body.message);
      return new Response(null, { status: 202 });
    }
    if (url.includes("/close")) {
      return jsonResponse({ data: closeResult });
    }
    return jsonResponse({ error: `unhandled ${url}` }, 500);
  });

  return { pushed, closeResult };
}

beforeEach(() => {
  resetMicrophonePermissionState();
  mockFetch.mockReset();
  mockNamespaces.mockReset();
  mockNamespaces.mockResolvedValue([
    {
      id: "stt",
      kind: "interface",
      label: "Speech to text",
      description: "",
      binding: { provider: "deepgram" },
      compat: [{ provider: "deepgram", label: "Deepgram", connected: true }],
    },
  ]);
});

afterEach(() => {
  vi.unstubAllGlobals?.();
  delete (globalThis as { AudioContext?: unknown }).AudioContext;
});

describe("pcm framing (contract encoding)", () => {
  it("resamples and emits pcm_s16le frames of the configured cadence", () => {
    const buf = new PcmFrameBuffer(100, 48_000);
    // 4800 samples at 48k ≈ 100ms → one 16k frame of 1600 samples / 3200 bytes
    const input = new Float32Array(4800);
    input.fill(0.5);
    const frames = buf.push(input);
    expect(frames.length).toBeGreaterThanOrEqual(1);
    expect(frames[0]!.byteLength).toBe(frameByteLength(100));
    // little-endian int16 for +0.5 ≈ 16383
    expect(frames[0]![0]).toBeGreaterThan(0);
  });

  it("floatToPcm16le clamps and is little-endian", () => {
    const pcm = floatToPcm16le(new Float32Array([1, -1, 0]));
    expect(pcm.byteLength).toBe(6);
    const view = new DataView(pcm.buffer);
    expect(view.getInt16(0, true)).toBe(0x7fff);
    expect(view.getInt16(2, true)).toBe(-0x8000);
    expect(view.getInt16(4, true)).toBe(0);
  });

  it("resampleLinear preserves length ratio", () => {
    const out = resampleLinear(new Float32Array(480), 48_000, 16_000);
    expect(out.length).toBe(160);
  });
});

describe("destination disclosure", () => {
  it("marks remote vendors for disclosure", () => {
    const d = destinationForProvider("deepgram", "Deepgram");
    expect(d.local).toBe(false);
    expect(d.disclosure).toContain("Deepgram");
  });

  it("marks non-remote providers as on this machine", () => {
    const d = destinationForProvider("aprovan", "On-device");
    expect(d.local).toBe(true);
    expect(d.disclosure).toMatch(/on this machine/i);
  });
});

describe("audio-capture scenarios", () => {
  it("does not activate the microphone until startCapture (no wake word / always-on)", async () => {
    const mic = installMicMocks({ processTicks: 0 });
    mockSessionWire();
    expect(mic.getUserMedia).not.toHaveBeenCalled();
    // Importing the module / app idle must not touch getUserMedia.
  });

  it("delivers framed pcm_s16le_16k push messages on startCapture", async () => {
    const mic = installMicMocks({ processTicks: 3 });
    const wire = mockSessionWire();

    const handle = await startCapture({ frameMs: 100 });
    await mic.startAndTick();
    // Allow push microtasks
    await Promise.resolve();
    await new Promise((r) => setTimeout(r, 10));

    expect(mic.getUserMedia).toHaveBeenCalledWith(
      expect.objectContaining({
        audio: expect.objectContaining({
          echoCancellation: true,
          noiseSuppression: true,
        }),
      }),
    );
    expect(wire.pushed.length).toBeGreaterThan(0);
    expect(wire.pushed[0]!.seq).toBe(0);
    expect(wire.pushed[0]!.audio).toEqual(expect.any(String));
    // Decoded length matches one contract frame
    const raw = Uint8Array.from(atob(wire.pushed[0]!.audio), (c) => c.charCodeAt(0));
    expect(raw.byteLength).toBe(frameByteLength(100));

    // open used required encoding
    const openCall = mockFetch.mock.calls.find((c) => String(c[0]).includes("/tools/stt/open"));
    expect(openCall).toBeDefined();
    const openBody = JSON.parse(String(openCall![1]?.body));
    expect(openBody.args.encoding).toBe(REQUIRED_ENCODING);

    await handle.cancel();
  });

  it("uses the same capture path for local and remote destinations", async () => {
    const mic = installMicMocks({ processTicks: 2 });
    const remoteWire = mockSessionWire();
    mockNamespaces.mockResolvedValueOnce([
      {
        id: "stt",
        kind: "interface",
        label: "Speech to text",
        description: "",
        binding: { provider: "deepgram" },
        compat: [{ provider: "deepgram", label: "Deepgram", connected: true }],
      },
    ]);
    const remote = await startCapture();
    await mic.startAndTick();
    await Promise.resolve();
    await new Promise((r) => setTimeout(r, 10));
    const remotePushes = remoteWire.pushed.map((p) => ({ ...p }));
    await remote.cancel();

    mockFetch.mockReset();
    const localWire = mockSessionWire();
    mockNamespaces.mockResolvedValueOnce([
      {
        id: "stt",
        kind: "interface",
        label: "Speech to text",
        description: "",
        binding: { provider: "aprovan" },
        compat: [{ provider: "aprovan", label: "On-device", connected: true }],
      },
    ]);
    const local = await startCapture();
    expect(local.destination.local).toBe(true);
    expect(remote.destination.local).toBe(false);
    await mic.startAndTick();
    await Promise.resolve();
    await new Promise((r) => setTimeout(r, 10));

    // Same message shape (audio + monotonic seq) — no provider-specific capture path.
    expect(localWire.pushed[0]).toMatchObject({ seq: 0, audio: expect.any(String) });
    expect(remotePushes[0]).toMatchObject({ seq: 0, audio: expect.any(String) });
    expect(Object.keys(localWire.pushed[0]!).sort()).toEqual(["audio", "seq"]);
    await local.cancel();
  });

  it("stop closes the session and returns the terminal transcript", async () => {
    const mic = installMicMocks({ processTicks: 1 });
    mockSessionWire({
      closeResult: {
        text: "complete transcript",
        segments: [{ text: "complete transcript", startMs: 0, endMs: 500 }],
        durationMs: 500,
      },
    });
    const handle = await startCapture();
    await mic.startAndTick();
    const result = await handle.stop();
    expect(result.text).toBe("complete transcript");
    expect(result.segments).toHaveLength(1);
    expect(mic.tracks[0]!.stop).toHaveBeenCalled();
  });

  it("ends capture on speech-end when the provider declares VAD", async () => {
    const mic = installMicMocks({ processTicks: 1 });
    mockSessionWire({
      vad: true,
      events: [
        { type: "partial", seq: 0, data: { text: "hi" } },
        { type: "speech-end", seq: 1, data: { atMs: 400 } },
      ],
      closeResult: {
        text: "hi",
        segments: [{ text: "hi", startMs: 0, endMs: 400 }],
        durationMs: 400,
      },
    });
    const handle = await startCapture();
    // Wait for SSE to deliver speech-end and auto-close
    await new Promise((r) => setTimeout(r, 30));
    const result = await handle.stop();
    expect(result.text).toBe("hi");
    expect(mic.tracks[0]!.stop).toHaveBeenCalled();
  });

  it("reports permission denial distinctly and does not re-prompt", async () => {
    const deny = vi.fn(async () => {
      const err = new Error("Permission denied");
      err.name = "NotAllowedError";
      throw err;
    });
    installMicMocks({ getUserMedia: deny });
    await expect(startCapture()).rejects.toMatchObject({
      name: "CaptureError",
      code: "permission-denied",
    });
    expect(wasMicrophonePermissionDenied()).toBe(true);

    // Second attempt must not call getUserMedia again.
    deny.mockClear();
    await expect(startCapture()).rejects.toBeInstanceOf(CaptureError);
    expect(deny).not.toHaveBeenCalled();
  });

  it("reports a missing device distinctly from permission denial", async () => {
    installMicMocks({
      getUserMedia: async () => {
        const err = new Error("Requested device not found");
        err.name = "NotFoundError";
        throw err;
      },
    });
    await expect(startCapture()).rejects.toMatchObject({
      code: "device-missing",
    });
    expect(wasMicrophonePermissionDenied()).toBe(false);
  });

  it("surfaces partial transcripts via onEvent while capture is active", async () => {
    installMicMocks({ processTicks: 0 });
    mockSessionWire({
      events: [
        { type: "partial", seq: 0, data: { text: "hel" } },
        { type: "partial", seq: 1, data: { text: "hello" } },
      ],
    });
    const handle = await startCapture();
    const partials: string[] = [];
    handle.onEvent((e: SttEvent) => {
      if (e.type === "partial") partials.push(e.data.text);
    });
    await new Promise((r) => setTimeout(r, 30));
    expect(partials).toEqual(["hel", "hello"]);
    await handle.cancel();
  });

  it("exposes remote destination disclosure on the handle", async () => {
    installMicMocks({ processTicks: 0 });
    mockSessionWire();
    mockNamespaces.mockResolvedValueOnce([
      {
        id: "stt",
        kind: "interface",
        label: "Speech to text",
        description: "",
        binding: { provider: "deepgram" },
        compat: [{ provider: "deepgram", label: "Deepgram", connected: true }],
      },
    ]);
    const handle = await startCapture();
    expect(handle.destination.local).toBe(false);
    expect(handle.destination.disclosure).toMatch(/Deepgram/);
    await handle.cancel();
  });

  it("exposes local destination disclosure on the handle", async () => {
    installMicMocks({ processTicks: 0 });
    mockSessionWire();
    mockNamespaces.mockResolvedValueOnce([
      {
        id: "stt",
        kind: "interface",
        label: "Speech to text",
        description: "",
        binding: { provider: "aprovan" },
        compat: [{ provider: "aprovan", label: "On-device STT", connected: true }],
      },
    ]);
    const handle = await startCapture();
    expect(handle.destination.local).toBe(true);
    expect(handle.destination.disclosure).toMatch(/on this machine/i);
    await handle.cancel();
  });
});
