/**
 * LLM chat routes.
 *
 * Chat providers are aliases onto OpenAI-compatible UTDK modules (see
 * src/llm.ts) — the routes here resolve the alias, inject the workspace
 * credential (keyed by the chat-facing provider id), and adapt protocols:
 *
 * - GET  /llm/providers             — every chat provider + connected flag
 * - GET  /llm/:provider/models      — upstream model listing (OpenAI `/models`)
 * - POST /llm/:provider/chat        — AI SDK UI-message chat; streams the AI
 *                                     SDK UI message stream protocol back to
 *                                     `useChat`.
 * - POST /llm/:provider/completions — job-backed completion (see below).
 * - GET  /llm/jobs/:id              — poll a completion job's status/result.
 *
 * `/completions` exists because widget-edit completions run 1–2 minutes, and
 * mobile browsers kill the fetch on screen-lock or backgrounding well before
 * that — the server finishes fine but the client never sees it. The route
 * responds with SSE immediately (`{"jobId"}` first, then deltas + keepalive
 * comments, then `[DONE]`) but — critically — upstream consumption and job
 * persistence are driven independently of whether that response stream is
 * still attached to anything (see runCompletionJob), so a dropped client
 * loses only its own tap; the job still reaches a terminal record that
 * `GET /llm/jobs/:id` can hand back.
 */

import { Hono, type Context } from "hono";
import { getAuditStore } from "../audit.js";
import { expandPromptVars, resolveStoredPrompt } from "../promptStore.js";
import { getCredentialStore, resolveCredentialRecord } from "../credentials.js";
import {
  listInstances,
  parseInterfaceNamespace,
  readBindings,
  resolveInterfaceForWorkspace,
} from "../interfaces.js";
import { getExecutor } from "../isolate.js";
import { readLlmJob, writeLlmJob, type LlmJobRecord } from "../llm-jobs.js";
import { requireAuth } from "../middleware/auth.js";
import { ServiceError } from "../service-kernel.js";
import { rateLimitByUserId } from "../middleware/rateLimitMiddleware.js";
import { OAuthExchangeError, resolveToInjectable } from "../oauthTokens.js";
import {
  listLlmProviders,
  resolveLlmProvider,
  toOpenAiMessages,
  UI_MESSAGE_STREAM_HEADERS,
} from "../llm.js";
import type { CredentialPayload } from "../credentials.js";

export const llmRouter = new Hono();

llmRouter.use("*", requireAuth);

// ---------------------------------------------------------------------------
// GET /llm/providers
// ---------------------------------------------------------------------------

llmRouter.get("/providers", async (c) => {
  const workspaceId = c.get("principal").workspaceId;
  const [credentials, bindings, instances] = await Promise.all([
    getCredentialStore().list(workspaceId),
    readBindings(workspaceId),
    listInstances(workspaceId),
  ]);
  const connected = new Set(credentials.map((credential) => credential.provider));
  const binding = bindings["llm"];
  return c.json({
    providers: listLlmProviders().map((provider) => ({
      id: provider.id,
      label: provider.label,
      defaultModel: provider.defaultModel,
      connected: connected.has(provider.id),
      /** Whether this provider is the workspace's `llm` interface binding. */
      bound: binding?.provider === provider.id,
    })),
    binding: binding ?? null,
    /**
     * Bound `llm` instances, selectable in chat exactly like a provider —
     * every route here accepts an instance namespace where it accepts an
     * alias, so "GPT-5.1" and "llm:fast" are the same kind of choice. The
     * picker no longer has to model the workspace binding separately from
     * what the user clicked.
     */
    instances: instances
      .filter((entry) => entry.interfaceId === "llm")
      .map((entry) => ({
        id: entry.instance,
        name: entry.name ?? null,
        provider: entry.binding.provider,
        label:
          entry.name ??
          listLlmProviders().find((provider) => provider.id === entry.binding.provider)?.label ??
          entry.binding.provider,
        model:
          typeof entry.binding.options?.["model"] === "string"
            ? (entry.binding.options["model"] as string)
            : null,
        connected: connected.has(entry.binding.provider),
      })),
  });
});

// ---------------------------------------------------------------------------
// Credential resolution (same contract as the tools route)
// ---------------------------------------------------------------------------

async function resolveCredentials(
  workspaceId: string,
  providerId: string,
  credentialId?: string,
): Promise<{ credentials?: CredentialPayload; error?: string }> {
  const store = getCredentialStore();
  let record: { id: string; payload: CredentialPayload } | undefined;
  try {
    record = await resolveCredentialRecord(workspaceId, providerId, credentialId);
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
  if (!record) return {};
  try {
    return {
      credentials: await resolveToInjectable(record.payload, {
        provider: providerId,
        cacheKey: `${workspaceId}:${providerId}:${record.id}`,
        persist: (payload) => store.updatePayload(workspaceId, record.id, payload),
      }),
    };
  } catch (err) {
    return {
      error:
        err instanceof OAuthExchangeError
          ? `OAuth token resolution failed for ${providerId}: ${err.message}`
          : `OAuth token resolution failed for ${providerId}`,
    };
  }
}

/**
 * Ephemeral body credential (if present and not disabled) wins; otherwise
 * fall back to the workspace-bound credential. Shared by `/chat` and
 * `/completions` — both take the same `{ credential? }` contract.
 */
async function resolveChatCredentials(
  workspaceId: string,
  providerId: string,
  body: { credential?: { type: string; token?: string; value?: string; name?: string } },
  credentialId?: string,
): Promise<{ credentials?: CredentialPayload; error?: string }> {
  if (body.credential && process.env["GATEWAY_EPHEMERAL_CREDENTIALS"] !== "0") {
    return {
      credentials:
        body.credential.type === "bearer_token"
          ? { type: "bearer_token", token: body.credential.token ?? "" }
          : { type: "api_key", value: body.credential.value ?? "", headerName: body.credential.name },
    };
  }
  return resolveCredentials(workspaceId, providerId, credentialId);
}

/**
 * A chat target: an LLM alias (`anthropic`) or an `llm` interface instance
 * (`llm`, `llm:fast`).
 *
 * Chat used to have its own notion of "which provider am I talking to",
 * independent of the workspace's `llm` binding — two answers to one question,
 * and the composer's picker only ever knew the first. Resolving both here
 * means picking `llm:fast` in chat and calling `llm:fast.createChatCompletion`
 * from a workflow reach the same implementation, model default, and
 * credential.
 */
interface ChatTarget {
  provider: NonNullable<ReturnType<typeof resolveLlmProvider>>;
  /** The instance's bound model, when it names one. */
  model?: string;
  /** The instance's pinned credential, when it has one. */
  credentialId?: string;
}

async function resolveChatTarget(
  workspaceId: string,
  target: string,
): Promise<ChatTarget | { error: string; status: number }> {
  const parsed = parseInterfaceNamespace(target);
  if (!parsed || parsed.interfaceId !== "llm") {
    const provider = resolveLlmProvider(target);
    return provider ? { provider } : { error: `Unknown LLM provider: ${target}`, status: 404 };
  }
  let resolved;
  try {
    resolved = await resolveInterfaceForWorkspace(workspaceId, target);
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : String(err),
      status: err instanceof ServiceError ? err.status : 500,
    };
  }
  const provider = resolveLlmProvider(resolved.compat.provider);
  if (!provider) {
    return { error: `Bound provider unavailable: ${resolved.compat.provider}`, status: 500 };
  }
  return {
    provider,
    ...(typeof resolved.options["model"] === "string"
      ? { model: resolved.options["model"] }
      : {}),
    ...(resolved.credentialId ? { credentialId: resolved.credentialId } : {}),
  };
}

function isTargetError(
  target: ChatTarget | { error: string; status: number },
): target is { error: string; status: number } {
  return "error" in target;
}

// ---------------------------------------------------------------------------
// GET /llm/:provider/models
// ---------------------------------------------------------------------------

llmRouter.get("/:provider/models", rateLimitByUserId, async (c) => {
  const workspaceId = c.get("principal").workspaceId;
  const target = await resolveChatTarget(workspaceId, c.req.param("provider") ?? "");
  if (isTargetError(target)) return c.json({ error: target.error }, target.status as 404);
  const { provider } = target;
  const providerId = provider.id;

  const { credentials, error } = await resolveCredentials(
    workspaceId,
    providerId,
    target.credentialId,
  );
  if (error) return c.json({ error }, 502);
  if (!credentials) {
    return c.json({ error: `No credential for ${providerId} in this workspace` }, 403);
  }

  const executor = await getExecutor();
  const result = await executor.execute({
    provider: provider.module,
    operation: "listModels",
    args: {},
    credentials,
    baseUrl: provider.baseUrl,
    timeout: 15_000,
  });
  if (!result.success) {
    return c.json({ error: result.error ?? "Model listing failed" }, 502);
  }

  const data = result.data as { data?: Array<{ id?: unknown }> } | undefined;
  const models = Array.isArray(data?.data)
    ? data.data
        .map((model) => (typeof model?.id === "string" ? model.id : undefined))
        .filter((id): id is string => Boolean(id))
        .sort((left, right) => left.localeCompare(right))
    : [];
  return c.json({ models, defaultModel: target.model ?? provider.defaultModel });
});

// ---------------------------------------------------------------------------
// POST /llm/:provider/chat
// ---------------------------------------------------------------------------

interface ChatRequestBody {
  messages?: unknown;
  model?: string;
  /** Optional stored-prompt reference expanded into the system message. */
  prompt?: { id?: string; vars?: Record<string, unknown> };
  system?: string;
  /** Ephemeral credential (same contract as the tools route). */
  credential?: { type: string; token?: string; value?: string; name?: string };
}

// The generic endpoint: chat via the workspace's `llm` interface binding
// (or the first connected compatible provider). Scripts, widgets, and chat
// hit one URL; swapping the backing provider is an interfaces.bind call.
llmRouter.post("/chat", rateLimitByUserId, async (c) => {
  const workspaceId = c.get("principal").workspaceId;
  const target = await resolveChatTarget(workspaceId, "llm");
  if (isTargetError(target)) return c.json({ error: target.error }, target.status as 400);
  return handleChat(c, target.provider, target.model, target.credentialId);
});

llmRouter.post("/:provider/chat", rateLimitByUserId, async (c) => {
  const workspaceId = c.get("principal").workspaceId;
  const target = await resolveChatTarget(workspaceId, c.req.param("provider") ?? "");
  if (isTargetError(target)) return c.json({ error: target.error }, target.status as 404);
  return handleChat(c, target.provider, target.model, target.credentialId);
});

async function handleChat(
  c: Context,
  provider: NonNullable<ReturnType<typeof resolveLlmProvider>>,
  boundModel?: string,
  credentialId?: string,
): Promise<Response> {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;
  const providerId = provider.id;

  let body: ChatRequestBody;
  try {
    body = await c.req.json<ChatRequestBody>();
  } catch {
    return c.json({ error: "Expected a JSON body with messages" }, 400);
  }

  const messages = toOpenAiMessages(body.messages);
  if (messages.length === 0) {
    return c.json({ error: "messages must contain at least one text message" }, 400);
  }

  // System prompt: explicit `system` wins; otherwise a stored prompt —
  // Workspace FS copy (see scripts/seed-prompts.ts).
  let system = typeof body.system === "string" ? body.system : undefined;
  if (!system && body.prompt?.id) {
    const stored = await resolveStoredPrompt(workspaceId, body.prompt.id);
    if (stored) system = expandPromptVars(stored, body.prompt.vars);
  }
  if (system) {
    messages.unshift({ role: "system", content: system });
  }

  const { credentials, error: credentialError } = await resolveChatCredentials(
    workspaceId,
    providerId,
    body,
    credentialId,
  );
  if (credentialError) return c.json({ error: credentialError }, 502);
  if (!credentials) {
    return c.json({ error: `No credential for ${providerId} in this workspace` }, 403);
  }

  const model = body.model || boundModel || provider.defaultModel;

  // Job-backed, first-byte-immediately. Reasoning models can sit silent for
  // 60s+ before their stream opens; CloudFront's origin read timeout (60s)
  // kills a connection that hasn't sent a byte by then. So the response
  // stream starts NOW — UI-stream preamble + keepalive comments — and the
  // upstream executor call happens inside it. The job record makes the
  // completion recoverable: a client that loses the stream polls
  // GET /llm/jobs/:id (header `x-llm-job`) and splices in the tail.
  const jobId = crypto.randomUUID();
  const now = new Date().toISOString();
  const job: LlmJobRecord = {
    id: jobId,
    status: "running",
    provider: providerId,
    model,
    text: "",
    createdAt: now,
    updatedAt: now,
  };
  await writeLlmJob(workspaceId, job);

  const persist = async (text: string, terminal: boolean, error?: string): Promise<void> => {
    job.text = text;
    job.status = terminal ? (error ? "failed" : "succeeded") : "running";
    job.error = error;
    job.updatedAt = new Date().toISOString();
    await writeLlmJob(workspaceId, job);
  };

  const execute = async (): Promise<
    { upstream: ReadableStream<Uint8Array> } | { text: string } | { error: string }
  > => {
    const requestId = crypto.randomUUID();
    const startTime = Date.now();
    const executor = await getExecutor();
    const result = await executor.execute({
      provider: provider.module,
      operation: "createChatCompletion",
      args: { model, messages, stream: true },
      credentials,
      baseUrl: provider.baseUrl,
      timeout: 120_000,
    });
    getAuditStore().append({
      requestId,
      workspaceId,
      callerId: principal.sub,
      provider: providerId,
      operation: "createChatCompletion",
      status: result.success ? 200 : 502,
      durationMs: Date.now() - startTime,
    });
    if (!result.success) return { error: result.error ?? "Chat completion failed" };
    if (result.data instanceof ReadableStream) return { upstream: result.data };
    if (result.data instanceof Response && result.data.body) {
      return { upstream: result.data.body };
    }
    // Non-streaming upstream (some compat servers ignore `stream`): the
    // completion is already whole — emit it as one delta.
    const completion = result.data as
      | { choices?: Array<{ message?: { content?: string } }> }
      | undefined;
    return { text: completion?.choices?.[0]?.message?.content ?? "" };
  };

  return c.newResponse(createChatUiJobStream(jobId, execute, persist), 200, {
    ...UI_MESSAGE_STREAM_HEADERS,
    "x-llm-job": jobId,
  });
}

/**
 * The UI-message-stream twin of {@link createJobResponseStream}: same
 * independence property (upstream draining and `persist` run to a terminal
 * job record whether or not the client is still attached), but the wire
 * format is the AI SDK UI message stream `useChat` consumes, and the
 * upstream call itself happens *inside* the stream so the first bytes go
 * out before the provider has answered.
 */
function createChatUiJobStream(
  jobId: string,
  execute: () => Promise<
    { upstream: ReadableStream<Uint8Array> } | { text: string } | { error: string }
  >,
  persist: (text: string, terminal: boolean, error?: string) => Promise<void>,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  // The job id doubles as the UI message id, so a resuming client can match
  // the polled job back to the message it was building.
  const messageId = jobId;

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let clientGone = false;
      const safeEnqueue = (bytes: Uint8Array): void => {
        if (clientGone) return;
        try {
          controller.enqueue(bytes);
        } catch {
          clientGone = true;
        }
      };
      const emit = (chunk: Record<string, unknown>): void =>
        safeEnqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));

      emit({ type: "start", messageId });
      emit({ type: "start-step" });
      const keepalive = setInterval(
        () => safeEnqueue(encoder.encode(": keepalive\n\n")),
        JOB_KEEPALIVE_MS,
      );

      let text = "";
      let textOpen = false;
      let reasoningOpen = false;
      let dirty = false;
      let lastPersist = Date.now();

      const maybePersist = async (): Promise<void> => {
        if (!dirty || Date.now() - lastPersist < JOB_PERSIST_THROTTLE_MS) return;
        dirty = false;
        lastPersist = Date.now();
        await persist(text, false);
      };

      const closeParts = (): void => {
        if (reasoningOpen) {
          emit({ type: "reasoning-end", id: `${messageId}-reasoning` });
          reasoningOpen = false;
        }
        if (textOpen) {
          emit({ type: "text-end", id: `${messageId}-text` });
          textOpen = false;
        }
      };

      const handleData = async (data: string): Promise<void> => {
        if (data === "[DONE]" || !data) return;
        let parsed: {
          choices?: Array<{
            delta?: { content?: string | null; reasoning_content?: string | null; reasoning?: string | null };
          }>;
        };
        try {
          parsed = JSON.parse(data) as typeof parsed;
        } catch {
          return; // Malformed upstream chunk — skip it, keep draining.
        }
        const delta = parsed.choices?.[0]?.delta;
        if (!delta) return;
        const reasoning = delta.reasoning_content ?? delta.reasoning;
        if (typeof reasoning === "string" && reasoning.length > 0) {
          if (!reasoningOpen) {
            emit({ type: "reasoning-start", id: `${messageId}-reasoning` });
            reasoningOpen = true;
          }
          emit({ type: "reasoning-delta", id: `${messageId}-reasoning`, delta: reasoning });
        }
        if (typeof delta.content === "string" && delta.content.length > 0) {
          if (reasoningOpen) {
            emit({ type: "reasoning-end", id: `${messageId}-reasoning` });
            reasoningOpen = false;
          }
          if (!textOpen) {
            emit({ type: "text-start", id: `${messageId}-text` });
            textOpen = true;
          }
          emit({ type: "text-delta", id: `${messageId}-text`, delta: delta.content });
          text += delta.content;
          dirty = true;
          await maybePersist();
        }
      };

      let failure: string | undefined;
      try {
        const started = await execute();
        if ("error" in started) {
          failure = started.error;
        } else if ("text" in started) {
          text = started.text;
          if (text) {
            emit({ type: "text-start", id: `${messageId}-text` });
            emit({ type: "text-delta", id: `${messageId}-text`, delta: text });
            textOpen = true;
          }
        } else {
          let buffered = "";
          const reader = started.upstream.getReader();
          for (;;) {
            const { value, done } = await reader.read();
            if (done) break;
            buffered += decoder.decode(value, { stream: true });
            let newlineIndex = buffered.indexOf("\n");
            while (newlineIndex !== -1) {
              const line = buffered.slice(0, newlineIndex).replace(/\r$/u, "");
              buffered = buffered.slice(newlineIndex + 1);
              if (line.startsWith("data:")) await handleData(line.slice(5).trim());
              newlineIndex = buffered.indexOf("\n");
            }
          }
        }
      } catch (err) {
        failure = err instanceof Error ? err.message : String(err);
      } finally {
        clearInterval(keepalive);
        await persist(text, true, failure);
        closeParts();
        if (failure) {
          // The error chunk is what flips `useChat` into its error state; a
          // resuming client's poll sees the same terminal record.
          emit({ type: "error", errorText: failure });
        } else {
          emit({ type: "finish-step" });
          emit({ type: "finish" });
        }
        safeEnqueue(encoder.encode("data: [DONE]\n\n"));
        try {
          controller.close();
        } catch {
          // Already closed by the client dropping — nothing left to do.
        }
      }
    },
  });
}

// ---------------------------------------------------------------------------
// POST /llm/:provider/completions — job-backed completion
// ---------------------------------------------------------------------------

interface CompletionJobRequestBody extends ChatRequestBody {
  /** Required — opts into the job protocol; `/completions` has no other mode. */
  job?: boolean;
}

const JOB_STREAM_HEADERS: Record<string, string> = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
};

/** How often keepalive comments are written while draining the upstream. */
const JOB_KEEPALIVE_MS = 15_000;
/** Dirty-flag persistence throttle — plus one unconditional write on terminal. */
const JOB_PERSIST_THROTTLE_MS = 3_000;

llmRouter.post("/:provider/completions", rateLimitByUserId, async (c) => {
  const workspaceId = c.get("principal").workspaceId;
  const target = await resolveChatTarget(workspaceId, c.req.param("provider") ?? "");
  if (isTargetError(target)) return c.json({ error: target.error }, target.status as 404);
  return handleCompletionJob(c, target.provider, target.model, target.credentialId);
});

async function handleCompletionJob(
  c: Context,
  provider: NonNullable<ReturnType<typeof resolveLlmProvider>>,
  boundModel?: string,
  credentialId?: string,
): Promise<Response> {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;
  const providerId = provider.id;

  let body: CompletionJobRequestBody;
  try {
    body = await c.req.json<CompletionJobRequestBody>();
  } catch {
    return c.json({ error: "Expected a JSON body with messages" }, 400);
  }
  if (body.job !== true) {
    return c.json({ error: "/completions requires job: true" }, 400);
  }

  const messages = toOpenAiMessages(body.messages);
  if (messages.length === 0) {
    return c.json({ error: "messages must contain at least one text message" }, 400);
  }

  let system = typeof body.system === "string" ? body.system : undefined;
  if (!system && body.prompt?.id) {
    const stored = await resolveStoredPrompt(workspaceId, body.prompt.id);
    if (stored) system = expandPromptVars(stored, body.prompt.vars);
  }
  if (system) {
    messages.unshift({ role: "system", content: system });
  }

  const { credentials, error: credentialError } = await resolveChatCredentials(
    workspaceId,
    providerId,
    body,
    credentialId,
  );
  if (credentialError) return c.json({ error: credentialError }, 502);
  if (!credentials) {
    return c.json({ error: `No credential for ${providerId} in this workspace` }, 403);
  }

  const model = body.model || boundModel || provider.defaultModel;
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const executor = await getExecutor();
  const result = await executor.execute({
    provider: provider.module,
    operation: "createChatCompletion",
    args: { model, messages, stream: true },
    credentials,
    baseUrl: provider.baseUrl,
    timeout: 120_000,
  });

  const durationMs = Date.now() - startTime;
  getAuditStore().append({
    requestId,
    workspaceId,
    callerId: principal.sub,
    provider: providerId,
    operation: "createChatCompletion",
    status: result.success ? 200 : 502,
    durationMs,
  });

  if (!result.success) {
    // Failed before any jobId was issued — nothing to poll, report inline
    // the same way /chat does.
    return c.json({ error: result.error ?? "Chat completion failed" }, 502);
  }

  const jobId = crypto.randomUUID();
  const now = new Date().toISOString();
  const job: LlmJobRecord = {
    id: jobId,
    status: "running",
    provider: providerId,
    model,
    text: "",
    createdAt: now,
    updatedAt: now,
  };
  await writeLlmJob(workspaceId, job);

  const persist = async (text: string, terminal: boolean, error?: string): Promise<void> => {
    job.text = text;
    job.status = terminal ? (error ? "failed" : "succeeded") : "running";
    job.error = error;
    job.updatedAt = new Date().toISOString();
    await writeLlmJob(workspaceId, job);
  };

  const upstream =
    result.data instanceof ReadableStream
      ? result.data
      : result.data instanceof Response && result.data.body
        ? result.data.body
        : undefined;

  if (!upstream) {
    // Non-streaming upstream (some compat servers ignore `stream`): the
    // completion is already done — persist it and emit it as one delta.
    const completion = result.data as
      | { choices?: Array<{ message?: { content?: string } }> }
      | undefined;
    const text = completion?.choices?.[0]?.message?.content ?? "";
    await persist(text, true);
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ jobId })}\n\n`));
        if (text) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`),
          );
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    return c.newResponse(stream, 200, JOB_STREAM_HEADERS);
  }

  return c.newResponse(createJobResponseStream(jobId, upstream, persist), 200, JOB_STREAM_HEADERS);
}

/**
 * The SSE tap for a completion job. Upstream consumption (decode → accumulate
 * → throttled persist) drives the whole function; writes to `controller` are
 * a best-effort side channel that stop the moment they fail (client gone —
 * network drop, backgrounded tab, whatever) without touching the read loop.
 * That's the critical property: this function keeps running, and `persist`
 * keeps getting called, all the way to a terminal record, independent of
 * whether anything is still listening on the other end of `controller`.
 */
function createJobResponseStream(
  jobId: string,
  upstream: ReadableStream<Uint8Array>,
  persist: (text: string, terminal: boolean, error?: string) => Promise<void>,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let clientGone = false;
      const safeEnqueue = (bytes: Uint8Array): void => {
        if (clientGone) return;
        try {
          controller.enqueue(bytes);
        } catch {
          clientGone = true;
        }
      };
      const emit = (chunk: Record<string, unknown>): void =>
        safeEnqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));

      emit({ jobId });
      const keepalive = setInterval(() => safeEnqueue(encoder.encode(": keepalive\n\n")), JOB_KEEPALIVE_MS);

      let buffered = "";
      let text = "";
      let dirty = false;
      let lastPersist = Date.now();
      const reader = upstream.getReader();

      const maybePersist = async (force: boolean): Promise<void> => {
        if (!force && (!dirty || Date.now() - lastPersist < JOB_PERSIST_THROTTLE_MS)) return;
        dirty = false;
        lastPersist = Date.now();
        await persist(text, false);
      };

      const handleLine = async (line: string): Promise<void> => {
        if (!line.startsWith("data:")) return;
        const data = line.slice(5).trim();
        if (data === "[DONE]" || !data) return;
        let delta:
          | { content?: string | null; reasoning_content?: string | null; reasoning?: string | null }
          | undefined;
        try {
          const parsed = JSON.parse(data) as {
            choices?: Array<{
              delta?: { content?: string | null; reasoning_content?: string | null; reasoning?: string | null };
            }>;
          };
          delta = parsed.choices?.[0]?.delta ?? undefined;
        } catch {
          return; // Malformed upstream chunk — skip it, keep draining.
        }
        if (!delta) return;
        // Reasoning deltas pass through (not persisted — the job record is
        // the resumable *text*), so a thinking model shows signs of life
        // instead of long silence before its first visible token.
        const reasoning = delta.reasoning_content ?? delta.reasoning;
        if (typeof reasoning === "string" && reasoning.length > 0) {
          emit({ choices: [{ delta: { reasoning_content: reasoning } }] });
        }
        if (typeof delta.content !== "string" || delta.content.length === 0) return;
        text += delta.content;
        dirty = true;
        // Passthrough in the same OpenAI-compat `{choices[0].delta.content}`
        // shape the upstream used — the client's SSE reader (sse.ts) already
        // knows how to fold that, on both the plain /chat path and here.
        emit({ choices: [{ delta: { content: delta.content } }] });
        await maybePersist(false);
      };

      let failure: string | undefined;
      try {
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffered += decoder.decode(value, { stream: true });
          let newlineIndex = buffered.indexOf("\n");
          while (newlineIndex !== -1) {
            const line = buffered.slice(0, newlineIndex).replace(/\r$/u, "");
            buffered = buffered.slice(newlineIndex + 1);
            await handleLine(line);
            newlineIndex = buffered.indexOf("\n");
          }
        }
      } catch (err) {
        failure = err instanceof Error ? err.message : String(err);
      } finally {
        clearInterval(keepalive);
        await persist(text, true, failure);
        // Surface the failure inline too: a stream that just ends at [DONE]
        // reads as success to a client that never learns the job failed.
        // The client's SSE reader (readChatCompletionStream, shared with the
        // plain /chat path) already throws on an `{error}` frame — that's
        // what sends it to the polling fallback, where it picks up this same
        // terminal record and re-throws with this message.
        if (failure) emit({ error: failure });
        safeEnqueue(encoder.encode("data: [DONE]\n\n"));
        try {
          controller.close();
        } catch {
          // Already closed by the client dropping — nothing left to do.
        }
      }
    },
  });
}

// ---------------------------------------------------------------------------
// GET /llm/jobs/:id — poll a completion job
// ---------------------------------------------------------------------------

/** Long-poll ceiling for `?wait=1`. */
const JOB_WAIT_MS = 20_000;
const JOB_WAIT_POLL_MS = 1_000;

llmRouter.get("/jobs/:id", async (c) => {
  const workspaceId = c.get("principal").workspaceId;
  const id = c.req.param("id") ?? "";
  const wait = c.req.query("wait") === "1";

  let job = await readLlmJob(workspaceId, id);
  if (!job) return c.json({ error: `Unknown job: ${id}` }, 404);

  if (wait && job.status === "running") {
    const deadline = Date.now() + JOB_WAIT_MS;
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, JOB_WAIT_POLL_MS));
      const next = await readLlmJob(workspaceId, id);
      if (!next) break;
      job = next;
      if (job.status !== "running") break;
    }
  }

  return c.json(job);
});
