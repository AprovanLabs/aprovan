/**
 * Gateway LLM chat provider API (`/llm/*` routes).
 *
 * Chat providers are gateway-side aliases onto OpenAI-compatible UTDK
 * modules; this module is the client surface for listing them (with
 * connected state) and enumerating their models.
 */

import { GATEWAY_BASE } from "./gateway";
import { gatewayFetch } from "./gateway-fetch";
import { readChatCompletionStream } from "./sse";

export interface LlmProviderInfo {
  id: string;
  label: string;
  defaultModel: string;
  connected: boolean;
}

export async function fetchLlmProviders(): Promise<LlmProviderInfo[] | null> {
  if (!GATEWAY_BASE) return null;
  try {
    const response = await gatewayFetch(`${GATEWAY_BASE}/llm/providers`);
    if (!response.ok) return null;
    const body = (await response.json()) as { providers?: LlmProviderInfo[] };
    return Array.isArray(body.providers) ? body.providers : null;
  } catch {
    return null;
  }
}

export async function fetchLlmModels(providerId: string): Promise<string[]> {
  const response = await gatewayFetch(
    `${GATEWAY_BASE}/llm/${encodeURIComponent(providerId)}/models`,
  );
  if (!response.ok) throw new Error(`model listing failed (${response.status})`);
  const body = (await response.json()) as { models?: string[] };
  return Array.isArray(body.models) ? body.models : [];
}

// ---------------------------------------------------------------------------
// Streaming chat completions (`/tools/:provider/createChatCompletion`)
// ---------------------------------------------------------------------------

export interface ChatCompletionMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// No response headers within this window: the origin never started
// answering (dead connection, black-holed route, sandboxed network) rather
// than a legitimately slow model. Without this, `await gatewayFetch` had no
// way to fail — plain `fetch` has no built-in timeout — so a request that
// never got a response left the edit panel's "Applying edits..." spinner
// running forever with no error to show.
const DEFAULT_CONNECT_TIMEOUT_MS = 30_000;

/**
 * Run a chat completion through the gateway's tool proxy and stream the reply.
 *
 * `stream: true` matters for more than UI polish: a buffered completion sends
 * no bytes until the model is done, and anything past CloudFront's 60s
 * origin-response timeout comes back to the browser as a 504 — which is what
 * long widget edits were hitting. Streaming puts the first token on the wire
 * in a second or two and keeps the connection warm for the rest of the run.
 *
 * `onDelta` receives each text delta plus the accumulated text so far.
 *
 * Bounded end to end: a connect timeout covers the initial request (dead
 * connection before any bytes arrive) and an idle timeout — enforced inside
 * {@link readChatCompletionStream} — covers a stall mid-stream. Either one
 * rejects with a descriptive error instead of hanging, so callers (e.g. the
 * widget edit transport) always settle and can surface a visible failure.
 */
export async function streamChatCompletion(
  providerId: string,
  args: { messages: ChatCompletionMessage[]; model?: string },
  onDelta?: (delta: string, full: string) => void,
  options: { connectTimeoutMs?: number; idleTimeoutMs?: number } = {},
): Promise<string> {
  const connectTimeoutMs = options.connectTimeoutMs ?? DEFAULT_CONNECT_TIMEOUT_MS;
  const controller = new AbortController();
  const connectTimer = setTimeout(() => controller.abort(), connectTimeoutMs);

  let response: Response;
  try {
    response = await gatewayFetch(
      `${GATEWAY_BASE}/tools/${encodeURIComponent(providerId)}/createChatCompletion`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ args: { ...args, stream: true } }),
        signal: controller.signal,
      },
    );
  } catch (err) {
    if (controller.signal.aborted) {
      throw new Error(
        `Chat completion request timed out after ${connectTimeoutMs / 1000}s waiting for a response`,
      );
    }
    throw err;
  } finally {
    clearTimeout(connectTimer);
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `Chat completion failed (${response.status})`);
  }

  // Upstreams that ignore `stream` (and the gateway's JSON error envelope)
  // come back as a plain object — read the single completion instead.
  const contentType = response.headers.get("content-type") ?? "";
  if (!response.body || !contentType.includes("text/event-stream")) {
    const body = (await response.json()) as {
      data?: { choices?: Array<{ message?: { content?: string } }> };
    };
    const text = body.data?.choices?.[0]?.message?.content;
    if (typeof text !== "string") throw new Error("Chat completion returned no content");
    onDelta?.(text, text);
    return text;
  }

  const full = await readChatCompletionStream(response.body, onDelta, {
    idleTimeoutMs: options.idleTimeoutMs,
  });
  if (!full) throw new Error("Chat completion returned no content");
  return full;
}

// ---------------------------------------------------------------------------
// Job-backed completions (`/llm/:provider/completions`)
// ---------------------------------------------------------------------------
//
// Widget edits are 1-2 minute completions. Streaming (above) gets the first
// token on the wire fast, but a mobile browser kills the fetch the moment the
// screen locks or the tab backgrounds — even though the gateway and the
// upstream model keep going. The job endpoint persists the completion
// server-side as it streams, so a dropped client can pick the result back up
// by polling instead of losing it.

interface LlmJobRecord {
  id: string;
  status: "running" | "succeeded" | "failed";
  provider: string;
  model?: string;
  text: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

/** How often to poll `GET /llm/jobs/:id` after the stream itself drops. */
const JOB_POLL_INTERVAL_MS = 3_000;
/** Give up resuming a job after this long with no terminal status. */
const JOB_POLL_TIMEOUT_MS = 5 * 60_000;

/**
 * Poll a job to a terminal state, feeding `onDelta` with text growth (not
 * raw upstream deltas — the job record only ever holds the accumulated
 * text) so the UI keeps counting blocks the same way it does mid-stream.
 */
export async function pollJobUntilTerminal(
  jobId: string,
  knownText: string,
  onDelta?: (delta: string, full: string) => void,
): Promise<string> {
  const deadline = Date.now() + JOB_POLL_TIMEOUT_MS;
  let text = knownText;
  for (;;) {
    if (Date.now() > deadline) {
      throw new Error(`Chat completion job ${jobId} did not finish within ${JOB_POLL_TIMEOUT_MS / 1000}s`);
    }
    await new Promise((resolve) => setTimeout(resolve, JOB_POLL_INTERVAL_MS));

    let response: Response;
    try {
      response = await gatewayFetch(`${GATEWAY_BASE}/llm/jobs/${encodeURIComponent(jobId)}`);
    } catch {
      continue; // Still offline / still reconnecting — keep polling.
    }
    if (!response.ok) continue; // Transient gateway hiccup — keep polling.

    const job = (await response.json()) as LlmJobRecord;
    if (typeof job.text === "string" && job.text.length > text.length) {
      const delta = job.text.slice(text.length);
      text = job.text;
      onDelta?.(delta, text);
    }
    if (job.status === "succeeded") return text;
    if (job.status === "failed") throw new Error(job.error ?? "Chat completion job failed");
    // status === "running" — loop and poll again.
  }
}

/**
 * Job-aware counterpart to {@link streamChatCompletion}: same streaming leg
 * (first token fast, connection stays warm), but a mid-stream failure — a
 * network error or a stall, which is exactly what a backgrounded mobile tab
 * looks like from here — does not fail the call. Instead it falls back to
 * polling `GET /llm/jobs/:id` (own cadence, independent of the streaming
 * leg's timeouts) until the job reaches a terminal state or five minutes
 * pass. The gateway keeps the job running server-side regardless of whether
 * this fetch is still attached, so the result usually is not actually lost.
 *
 * Only throws when the job itself failed, or polling exhausted its window —
 * never merely because the streaming leg dropped.
 */
export async function runChatCompletionJob(
  providerId: string,
  args: { messages: ChatCompletionMessage[]; model?: string },
  onDelta?: (delta: string, full: string) => void,
  options: {
    connectTimeoutMs?: number;
    idleTimeoutMs?: number;
    /** Reasoning-model thinking deltas (streamed, never in the result). */
    onReasoning?: (delta: string) => void;
  } = {},
): Promise<string> {
  const connectTimeoutMs = options.connectTimeoutMs ?? DEFAULT_CONNECT_TIMEOUT_MS;
  const controller = new AbortController();
  const connectTimer = setTimeout(() => controller.abort(), connectTimeoutMs);

  let response: Response;
  try {
    response = await gatewayFetch(
      `${GATEWAY_BASE}/llm/${encodeURIComponent(providerId)}/completions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...args, job: true }),
        signal: controller.signal,
      },
    );
  } catch (err) {
    if (controller.signal.aborted) {
      throw new Error(
        `Chat completion request timed out after ${connectTimeoutMs / 1000}s waiting for a response`,
      );
    }
    throw err;
  } finally {
    clearTimeout(connectTimer);
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `Chat completion failed (${response.status})`);
  }
  if (!response.body) throw new Error("Chat completion returned no content");

  let jobId: string | undefined;
  let text = "";
  try {
    text = await readChatCompletionStream(
      response.body,
      (delta, full) => {
        text = full;
        onDelta?.(delta, full);
      },
      {
        idleTimeoutMs: options.idleTimeoutMs,
        onJobId: (id) => (jobId = id),
        onReasoning: options.onReasoning,
      },
    );
    return text;
  } catch (err) {
    // No jobId means the request never got far enough to start a job (e.g.
    // the connect timeout above, or a rejection before the first byte) —
    // there's nothing server-side to resume, so this is a real failure.
    if (!jobId) throw err;
    return pollJobUntilTerminal(jobId, text, onDelta);
  }
}

/** Per-provider chat model preference ("" = provider default). */
const MODEL_KEY_PREFIX = "patchwork:chat-model:";

export function loadModelPreference(providerId: string): string {
  return localStorage.getItem(`${MODEL_KEY_PREFIX}${providerId}`) ?? "";
}

export function saveModelPreference(providerId: string, model: string): void {
  if (model) localStorage.setItem(`${MODEL_KEY_PREFIX}${providerId}`, model);
  else localStorage.removeItem(`${MODEL_KEY_PREFIX}${providerId}`);
}
