import type { CaptureDestination } from "./destination";
import { resolveSttDestination } from "./destination";
import { acquireMicrophone, startMicFramePump, type MicPump } from "./mic";
import { bytesToBase64 } from "./pcm";
import {
  closeSttSession,
  openSttSession,
  pushSttAudio,
  subscribeSttEvents,
} from "./stt-session";
import type { SttEvent, SttResult } from "./types";

/** Frame size pushed per message. Default 100ms. */
export interface CaptureOptions {
  frameMs?: number;
  /** Browser audio processing. Defaults on. */
  echoCancellation?: boolean;
  noiseSuppression?: boolean;
}

export interface CaptureHandle {
  readonly sessionId: string;
  /** Bound provider identity for host disclosure (stream 4 UI). */
  readonly destination: CaptureDestination;
  stop(): Promise<SttResult>;
  cancel(): Promise<void>;
  onEvent(cb: (e: SttEvent) => void): () => void;
}

/**
 * Start microphone capture and drive an `stt` streaming session.
 * Does nothing until called — no wake word, no always-on listening (D6).
 */
export async function startCapture(o?: CaptureOptions): Promise<CaptureHandle> {
  const frameMs = o?.frameMs ?? 100;
  const echoCancellation = o?.echoCancellation ?? true;
  const noiseSuppression = o?.noiseSuppression ?? true;

  // Destination is resolved from the catalog so hosts can disclose before
  // audio leaves; the session wire itself is always `/tools/stt/…`.
  const destination = await resolveSttDestination();

  const stream = await acquireMicrophone({
    frameMs,
    echoCancellation,
    noiseSuppression,
  });

  let opened;
  try {
    opened = await openSttSession();
  } catch (err) {
    for (const track of stream.getTracks()) track.stop();
    throw err;
  }

  const { sessionId, capabilities } = opened;
  const listeners = new Set<(e: SttEvent) => void>();
  const emit = (e: SttEvent) => {
    for (const cb of listeners) cb(e);
  };

  let seq = 0;
  let pump: MicPump | null = null;
  let unsubEvents: (() => void) | null = null;
  let terminal: Promise<SttResult> | null = null;
  let cancelled = false;
  const pushQueue: Promise<void>[] = [];

  const teardownMic = () => {
    pump?.stop();
    pump = null;
  };

  const beginClose = (asCancel: boolean): Promise<SttResult> => {
    if (terminal) return terminal;
    terminal = (async () => {
      teardownMic();
      unsubEvents?.();
      unsubEvents = null;
      // Drain in-flight pushes before close so seq stays ordered.
      await Promise.allSettled(pushQueue);
      const result = await closeSttSession(sessionId);
      if (asCancel || cancelled) {
        return { text: "", segments: [], durationMs: result.durationMs };
      }
      return result;
    })();
    return terminal;
  };

  unsubEvents = subscribeSttEvents(
    sessionId,
    (event) => {
      emit(event);
      // Provider-signalled end of speech when VAD is declared (D6).
      if (event.type === "speech-end" && capabilities.vad) {
        void beginClose(false);
      }
      if (event.type === "error" && !event.data.retryable) {
        void beginClose(false);
      }
    },
    (err) => {
      emit({
        type: "error",
        data: {
          message: err instanceof Error ? err.message : String(err),
          retryable: false,
        },
      });
      void beginClose(false);
    },
  );

  pump = startMicFramePump(
    stream,
    { frameMs, echoCancellation, noiseSuppression },
    (pcm) => {
      if (terminal) return;
      const message = { audio: bytesToBase64(pcm), seq: seq++ };
      const p = pushSttAudio(sessionId, message).catch((err) => {
        emit({
          type: "error",
          data: {
            message: err instanceof Error ? err.message : String(err),
            retryable: true,
          },
        });
      });
      pushQueue.push(p);
    },
  );

  const handle: CaptureHandle = {
    sessionId,
    destination,
    stop: () => beginClose(false),
    cancel: async () => {
      cancelled = true;
      await beginClose(true);
    },
    onEvent(cb) {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
  };

  return handle;
}
