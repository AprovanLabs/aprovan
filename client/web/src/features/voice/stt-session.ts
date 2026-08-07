import { GATEWAY_BASE } from "@/lib/gateway";
import { gatewayFetch } from "@/lib/gateway-fetch";
import {
  REQUIRED_ENCODING,
  type SttEvent,
  type SttPushMessage,
  type SttResult,
  type SttSessionCapabilities,
} from "./types";

const STT_NS = "stt";
const STT_OPEN = "open";

export interface OpenedSttSession {
  sessionId: string;
  capabilities: SttSessionCapabilities;
}

export async function openSttSession(
  args: Record<string, unknown> = {},
): Promise<OpenedSttSession> {
  const res = await gatewayFetch(`${GATEWAY_BASE}/tools/${STT_NS}/${STT_OPEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      args: { encoding: REQUIRED_ENCODING, ...args },
    }),
  });
  const body = (await res.json()) as {
    data?: OpenedSttSession;
    error?: string;
  };
  if (!res.ok || !body.data?.sessionId) {
    throw new Error(body.error ?? `stt.open failed (${res.status})`);
  }
  return {
    sessionId: body.data.sessionId,
    capabilities: body.data.capabilities ?? {
      streaming: true,
      encodings: [REQUIRED_ENCODING],
    },
  };
}

export async function pushSttAudio(
  sessionId: string,
  message: SttPushMessage,
): Promise<void> {
  const res = await gatewayFetch(
    `${GATEWAY_BASE}/tools/${STT_NS}/sessions/${encodeURIComponent(sessionId)}/push`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    },
  );
  if (res.status !== 202 && !res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `stt.push failed (${res.status})`);
  }
}

export async function closeSttSession(sessionId: string): Promise<SttResult> {
  const res = await gatewayFetch(
    `${GATEWAY_BASE}/tools/${STT_NS}/sessions/${encodeURIComponent(sessionId)}/close`,
    { method: "POST" },
  );
  const body = (await res.json()) as { data?: SttResult; error?: string };
  if (!res.ok || !body.data) {
    throw new Error(body.error ?? `stt.close failed (${res.status})`);
  }
  return body.data;
}

/**
 * Subscribe to session SSE. Returns an unsubscribe that cancels the reader.
 * Emits contract SttEvents; ignores the manager's terminal `{ type: "end" }`.
 */
export function subscribeSttEvents(
  sessionId: string,
  onEvent: (event: SttEvent) => void,
  onError?: (err: unknown) => void,
): () => void {
  const ac = new AbortController();
  void (async () => {
    try {
      const res = await gatewayFetch(
        `${GATEWAY_BASE}/tools/${STT_NS}/sessions/${encodeURIComponent(sessionId)}`,
        { signal: ac.signal },
      );
      if (!res.ok || !res.body) {
        throw new Error(`stt.subscribe failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (!ac.signal.aborted) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let sep = buffer.indexOf("\n\n");
        while (sep !== -1) {
          const raw = buffer.slice(0, sep);
          buffer = buffer.slice(sep + 2);
          const line = raw.split("\n").find((l) => l.startsWith("data:"));
          if (line) {
            const payload = line.replace(/^data:\s?/, "").trim();
            if (payload) {
              try {
                const event = JSON.parse(payload) as { type: string; data?: unknown };
                if (event.type === "end") {
                  // Session manager closed the channel.
                } else if (isSttEvent(event)) {
                  onEvent(event);
                }
              } catch {
                // keepalive / non-JSON
              }
            }
          }
          sep = buffer.indexOf("\n\n");
        }
      }
    } catch (err) {
      if (ac.signal.aborted) return;
      onError?.(err);
    }
  })();

  return () => ac.abort();
}

function isSttEvent(event: { type: string; data?: unknown }): event is SttEvent {
  return (
    event.type === "partial" ||
    event.type === "final" ||
    event.type === "speech-start" ||
    event.type === "speech-end" ||
    event.type === "error"
  );
}
