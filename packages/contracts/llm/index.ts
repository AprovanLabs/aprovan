/**
 * @utdk/llm — the shared LLM contract for OpenAI-compatible chat providers.
 *
 * Chat backends that speak the OpenAI REST surface (`/chat/completions`,
 * `/models`) don't need a bespoke generated client per vendor — a thin
 * handwritten provider module wraps these engines and honors one contract:
 *
 *   - `createChatCompletion({ model?, messages, stream?, … })` is the
 *     operation surface;
 *   - messages are `{ role, content }` strings (the subset scripts and
 *     widgets send today);
 *   - the secret arrives as the standard UTDK `Authorization: Bearer …`
 *     header injection;
 *   - non-secret config (base URL, default model) rides provider options or
 *     the gateway's interface bindings.
 *
 * Adding an OpenAI-compatible LLM = one thin provider module; nothing
 * gateway-side changes beyond the compat list.
 */

/** Default per-call deadline; override per call with `timeout_ms`. */
export const DEFAULT_TIMEOUT_MS = 120_000;

/** OpenAI-style chat message (text-only subset). */
export interface LlmChatMessage {
  role: "system" | "user" | "assistant" | "developer";
  content: string;
}

/** Arguments for `createChatCompletion`. */
export interface LlmChatCompletionArgs {
  model?: string;
  messages: LlmChatMessage[];
  stream?: boolean;
  temperature?: number | null;
  max_tokens?: number | null;
  timeout_ms?: number;
  [option: string]: unknown;
}

/** Non-streaming chat completion result (OpenAI `chat.completion` shape). */
export interface LlmChatCompletionResult {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: { role: string; content: string | null };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

export interface LlmModelSummary {
  id: string;
  object?: string;
  owned_by?: string;
}

export interface LlmListModelsResult {
  object: "list";
  data: LlmModelSummary[];
}

/** Options every LLM provider client factory accepts. */
export interface LlmClientOptions {
  /** Injected headers; the secret rides `Authorization: Bearer …`. */
  headers?: Record<string, string>;
  /** OpenAI-compat API root; default `https://api.openai.com/v1`. */
  baseUrl?: string;
  /** Injection point for tests. */
  fetchImpl?: typeof fetch;
}

/** Error with an HTTP-ish status for hosts that map errors onto responses. */
export class LlmError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "LlmError";
    this.status = status;
  }
}

/**
 * Pull the provider secret out of the injected headers (the UTDK executor
 * translates a `bearer_token` credential into `Authorization: Bearer …`).
 */
export function secretFromHeaders(
  headers: Record<string, string> | undefined,
  provider: string,
): string {
  const raw = headers?.["Authorization"] ?? headers?.["authorization"] ?? "";
  const match = /^Bearer\s+(.+)$/iu.exec(raw);
  if (!match?.[1]) {
    throw new LlmError(
      `${provider} needs a bearer_token credential. Add one for provider "${provider}".`,
      400,
    );
  }
  return match[1];
}

export function validateChatArgs(args: LlmChatCompletionArgs): void {
  if (!Array.isArray(args.messages) || args.messages.length === 0) {
    throw new LlmError(`createChatCompletion requires { messages: [{ role, content }] }`, 400);
  }
  for (const message of args.messages) {
    if (typeof message !== "object" || message === null) {
      throw new LlmError("each message must be { role, content }", 400);
    }
    if (typeof message.role !== "string" || typeof message.content !== "string") {
      throw new LlmError("each message must be { role, content }", 400);
    }
  }
}

function apiRoot(options: LlmClientOptions): string {
  return (options.baseUrl ?? "https://api.openai.com/v1").replace(/\/+$/u, "");
}

function authHeaders(secret: string): Record<string, string> {
  return {
    Authorization: `Bearer ${secret}`,
    Accept: "application/json",
  };
}

async function readError(response: Response): Promise<string> {
  const raw = await response.text();
  try {
    const parsed = JSON.parse(raw) as { error?: { message?: string }; message?: string };
    return parsed.error?.message ?? parsed.message ?? raw.slice(0, 300);
  } catch {
    return raw.slice(0, 300);
  }
}

/**
 * OpenAI-compatible chat completion engine. When `stream: true`, returns the
 * upstream `Response` for the host to pass through; otherwise parses JSON
 * into `LlmChatCompletionResult`.
 */
export async function openAiCompatChat(
  secret: string,
  args: LlmChatCompletionArgs,
  options: LlmClientOptions = {},
): Promise<LlmChatCompletionResult | Response> {
  validateChatArgs(args);
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs =
    typeof args.timeout_ms === "number" && args.timeout_ms > 0
      ? args.timeout_ms
      : DEFAULT_TIMEOUT_MS;
  const { stream, timeout_ms: _timeout, ...body } = args;
  const response = await fetchImpl(`${apiRoot(options)}/chat/completions`, {
    method: "POST",
    headers: {
      ...authHeaders(secret),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body, stream: stream === true }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) {
    throw new LlmError(
      `chat completion failed (${response.status}): ${await readError(response)}`,
      response.status,
    );
  }
  if (stream === true) return response;
  return (await response.json()) as LlmChatCompletionResult;
}

/** OpenAI-compatible model listing (`GET /models`). */
export async function openAiCompatListModels(
  secret: string,
  options: LlmClientOptions = {},
): Promise<LlmListModelsResult> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const response = await fetchImpl(`${apiRoot(options)}/models`, {
    method: "GET",
    headers: authHeaders(secret),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    throw new LlmError(
      `model listing failed (${response.status}): ${await readError(response)}`,
      response.status,
    );
  }
  return (await response.json()) as LlmListModelsResult;
}

const CHAT_MESSAGE_SCHEMA = {
  type: "object",
  properties: {
    role: { type: "string", enum: ["system", "user", "assistant"] },
    content: { type: "string" },
  },
  required: ["role", "content"],
} as const;

function chatCompletionSchema(modelDescription: string) {
  return {
    type: "object",
    properties: {
      model: { type: "string", description: modelDescription },
      messages: {
        type: "array",
        description: "OpenAI-style chat messages [{ role, content }]",
        items: CHAT_MESSAGE_SCHEMA,
      },
      stream: { type: "boolean", description: "Stream the response as SSE" },
    },
    required: ["messages"],
  };
}

/**
 * Tool-discovery entries for an LLM provider or the generic `llm` interface
 * namespace. Pass `interfaceNamespace: true` (or provider `llm`) for
 * binding-neutral descriptions.
 */
export function llmToolEntries(
  provider: string,
  details: { label?: string; defaultModel?: string; interfaceNamespace?: boolean } = {},
): Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> {
  const interfaceNs = details.interfaceNamespace === true || provider === "llm";
  const label = details.label ?? provider;
  const defaultModel = details.defaultModel ?? "provider default";
  const modelDescription = interfaceNs
    ? "Model id (default: the binding's model)"
    : `Model id (default: ${defaultModel})`;
  const completionDescription = interfaceNs
    ? "Chat completion via the workspace's bound LLM provider (interfaces.bind to switch). OpenAI-compatible; model defaults to the binding's model."
    : `Chat completion via ${label} (OpenAI-compatible). Defaults to model ${defaultModel}.`;
  const listDescription = interfaceNs
    ? "List models from the workspace's bound LLM provider."
    : `List models available from ${label}.`;

  return [
    {
      name: `${provider}.createChatCompletion`,
      description: completionDescription,
      inputSchema: chatCompletionSchema(modelDescription),
    },
    {
      name: `${provider}.listModels`,
      description: listDescription,
      inputSchema: { type: "object", properties: {} },
    },
  ];
}
