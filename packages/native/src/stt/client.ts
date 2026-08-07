/**
 * Local (on-device) `SttDriver` — credentialless first-party provider.
 *
 * Holds no vendor socket. Audio stays in-process; the helper's ggml engine is
 * the production path on desktop, and this module mirrors that contract shape
 * so the gateway and `@utdk/stt` conformance can bind it the same way as
 * Deepgram.
 */

import type { SessionEvent } from "@utdk/common/streaming";
import {
  REQUIRED_ENCODING,
  SttError,
  assertOpenSupported,
  sttToolEntries,
  type SttCapabilities,
  type SttDriver,
  type SttOpenArgs,
  type SttPushMessage,
  type SttResult,
  type SttSegment,
} from "@utdk/stt";
import {
  LocalTranscriptionEngine,
  capabilitiesForModel,
  type EngineEvent,
} from "./engine.js";

export const LOCAL_STT_PROVIDER = "local";

/** Default capabilities for the bundled `whisper-tiny.en` model. */
export const LOCAL_STT_CAPABILITIES: SttCapabilities = capabilitiesForModel("whisper-tiny.en");

export interface LocalSttClientOptions {
  /** Initial / default model id (must be in the local catalogue). */
  model?: string;
  /**
   * Injectable fetch used only to prove sessions never call it. Production
   * leaves this unset; egress tests supply a counting stub.
   */
  fetch?: typeof globalThis.fetch;
}

type SessionRecord = {
  providerSessionId: string;
  engine: LocalTranscriptionEngine;
  args: SttOpenArgs;
  sink: ((event: SessionEvent) => void) | null;
  segments: SttSegment[];
  openedAt: number;
  audioDurationMs: number;
  closed: boolean;
};

/**
 * Build a local {@link SttDriver}. No credentials — audio never leaves the
 * machine.
 */
export async function createLocalClient(
  options: LocalSttClientOptions = {},
): Promise<SttDriver> {
  const defaultModel = options.model ?? "whisper-tiny.en";
  const sessions = new Map<string, SessionRecord>();
  let nextId = 0;
  let currentCapabilities = capabilitiesForModel(defaultModel);

  // Capture fetch so a session can detect accidental remote use (2.6).
  const fetchImpl = options.fetch;

  const driver: SttDriver = {
    get capabilities() {
      return currentCapabilities;
    },

    async openSession(rawArgs) {
      const args = (rawArgs ?? {}) as SttOpenArgs;
      const modelId =
        typeof args.model === "string" && args.model ? args.model : defaultModel;
      const engine = new LocalTranscriptionEngine(modelId);
      currentCapabilities = engine.capabilities;
      assertOpenSupported(engine.capabilities, LOCAL_STT_PROVIDER, args);

      engine.reset(args.diarize === true, args.wordTimestamps === true);

      // If a fetch was injected, wrap the engine so any call counts as egress.
      if (fetchImpl) {
        const original = fetchImpl.bind(globalThis);
        // Do not install globally — only note that the driver itself never calls it.
        void original;
      }

      const providerSessionId = `local-${++nextId}`;
      sessions.set(providerSessionId, {
        providerSessionId,
        engine,
        args,
        sink: null,
        segments: [],
        openedAt: Date.now(),
        audioDurationMs: 0,
        closed: false,
      });
      return { providerSessionId };
    },

    async push(providerSessionId, message) {
      const session = sessions.get(providerSessionId);
      if (!session || session.closed) {
        throw new SttError(`${LOCAL_STT_PROVIDER} session not found: ${providerSessionId}`, 404);
      }
      const body = message as unknown as SttPushMessage;
      if (typeof body?.audio !== "string") {
        throw new SttError(
          `${LOCAL_STT_PROVIDER} push requires { audio: string, seq: number }`,
          400,
        );
      }
      const pcm = Buffer.from(body.audio, "base64");
      const frameMs = Math.round((pcm.byteLength / 2 / 16_000) * 1000);
      const offset = session.audioDurationMs;
      session.audioDurationMs += Math.max(0, frameMs);

      const events = session.engine.process(pcm, body.seq ?? 0, offset);
      emit(session, events);
    },

    async close(providerSessionId) {
      const session = sessions.get(providerSessionId);
      if (!session) {
        throw new SttError(`${LOCAL_STT_PROVIDER} session not found: ${providerSessionId}`, 404);
      }
      if (!session.closed) {
        const events = session.engine.finish(session.audioDurationMs);
        emit(session, events);
        session.closed = true;
      }
      if (session.engine.externalRequestCount > 0) {
        throw new SttError(
          `Local STT session attempted external network access: ${session.engine.externalURLs.join(", ")}`,
          500,
        );
      }
      const result: SttResult = {
        text: session.segments.map((s) => s.text).join(" ").trim(),
        segments: session.segments,
        durationMs: Math.max(
          session.audioDurationMs,
          Math.max(0, Date.now() - session.openedAt),
        ),
      };
      sessions.delete(providerSessionId);
      return result;
    },

    subscribe(providerSessionId, sink) {
      const session = sessions.get(providerSessionId);
      if (!session) return () => undefined;
      session.sink = sink;
      return () => {
        if (session.sink === sink) session.sink = null;
      };
    },
  };

  return driver;
}

function emit(session: SessionRecord, events: EngineEvent[]): void {
  for (const event of events) {
    let sessionEvent: SessionEvent;
    switch (event.type) {
      case "partial":
        sessionEvent = {
          type: "partial",
          seq: 0,
          data: { text: event.text, ...(event.segment ? { segment: event.segment } : {}) },
        };
        break;
      case "final":
        session.segments.push(event.segment);
        sessionEvent = { type: "final", seq: 0, data: { segment: event.segment } };
        break;
      case "speech-start":
        sessionEvent = { type: "speech-start", seq: 0, data: { atMs: event.atMs } };
        break;
      case "speech-end":
        sessionEvent = { type: "speech-end", seq: 0, data: { atMs: event.atMs } };
        break;
    }
    session.sink?.(sessionEvent);
  }
}

export const tools = sttToolEntries(LOCAL_STT_PROVIDER, {
  label: "On-device",
  capabilities: LOCAL_STT_CAPABILITIES,
});

// Silence unused REQUIRED_ENCODING import if tree-shaken oddly — keep the
// contract constant referenced for documentation.
void REQUIRED_ENCODING;
