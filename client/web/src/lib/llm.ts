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
    onReasoning: options.onReasoning,
  });
  if (!full) throw new Error("Chat completion returned no content");
  return full;
}

// ---------------------------------------------------------------------------
// Completions used by non-edit callers (session auto-title, merge combine).
// ---------------------------------------------------------------------------
//
// Formerly job-backed (`POST /llm/:provider/completions` + poll
// `GET /llm/jobs/:id`). IW-9 D stream 9 moved durability for chat onto run
// records; remaining short completions share {@link streamChatCompletion}
// (tools-proxy stream, no job splice). `pollJobUntilTerminal` stays exported
// only while `resilientChatFetch` / the server job store remain for the
// evidence-gated deletion in task 9.5.

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
 *
 * @deprecated Retained for `resilientChatFetch` until llm-jobs deletion (9.5).
 * New callers must use {@link streamChatCompletion}.
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
 * Streaming completion for leftover non-edit callers (session title, merge).
 * Delegates to {@link streamChatCompletion}; no longer creates or polls
 * llm-jobs. Prefer calling {@link streamChatCompletion} directly.
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
  return streamChatCompletion(providerId, args, onDelta, options);
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
