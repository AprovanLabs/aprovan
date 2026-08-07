/**
 * LLM chat provider registry + protocol adapters.
 *
 * Chat providers are aliases onto OpenAI- or Anthropic-compatible UTDK
 * provider modules rather than bespoke generated clients: every entry names
 * the utdk module that executes it (`module`) and the OpenAI-compat API root
 * (`baseUrl`, OpenAI-SDK `baseURL` semantics — see buildUrl in utdk/client).
 * Credentials stay keyed by the chat-facing id (`synthetic.new`), so the
 * registry credentials page and the gateway credential store line up.
 *
 * Also home to the two protocol adapters the chat route needs:
 * - AI SDK UIMessage[] → OpenAI chat `messages`
 * - OpenAI chat-completion SSE → AI SDK UI message stream (v6 protocol)
 */

export interface LlmChatProvider {
  /** Chat-facing provider id — also the credential-store key. */
  id: string;
  label: string;
  /** UTDK module that executes chat operations for this provider. */
  module: string;
  /** OpenAI-compat API root; undefined = the module's own spec server. */
  baseUrl?: string;
  defaultModel: string;
}

function envOverride(id: string, key: "BASE_URL" | "DEFAULT_MODEL"): string | undefined {
  const slug = id.toUpperCase().replace(/[^A-Z0-9]+/gu, "_");
  return process.env[`LLM_${slug}_${key}`] || undefined;
}

const CHAT_PROVIDERS: LlmChatProvider[] = [
  {
    id: "openai",
    label: "OpenAI",
    module: "openai",
    defaultModel: "gpt-5.1",
  },
  {
    id: "anthropic",
    label: "Claude",
    module: "openai",
    baseUrl: "https://api.anthropic.com/v1",
    defaultModel: "claude-sonnet-5",
  },
  {
    id: "gemini",
    label: "Gemini",
    module: "openai",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
    defaultModel: "gemini-2.5-flash",
  },
  {
    id: "synthetic.new",
    label: "Synthetic.new",
    module: "openai",
    baseUrl: "https://api.synthetic.new/openai/v1",
    defaultModel: "hf:zai-org/GLM-5.2",
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    module: "openai",
    baseUrl: "https://openrouter.ai/api/v1",
    defaultModel: "openrouter/auto",
  },
  {
    id: "apple",
    label: "Apple on-device",
    module: "openai",
    baseUrl: "http://127.0.0.1:0/v1",
    defaultModel: "apple-on-device",
  },
];

export function listLlmProviders(): LlmChatProvider[] {
  return CHAT_PROVIDERS.map((provider) => ({
    ...provider,
    baseUrl: envOverride(provider.id, "BASE_URL") ?? provider.baseUrl,
    defaultModel: envOverride(provider.id, "DEFAULT_MODEL") ?? provider.defaultModel,
  }));
}

export function resolveLlmProvider(id: string): LlmChatProvider | undefined {
  return listLlmProviders().find((provider) => provider.id === id);
}

export function isLlmProvider(id: string): boolean {
  return CHAT_PROVIDERS.some((provider) => provider.id === id);
}

// ---------------------------------------------------------------------------
// UIMessage[] → OpenAI chat messages
// ---------------------------------------------------------------------------

interface UiMessagePart {
  type?: string;
  text?: string;
}

interface UiMessage {
  role?: string;
  content?: string;
  parts?: UiMessagePart[];
}

export interface OpenAiChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export type { LlmChatMessage } from "@utdk/llm";

/**
 * Flatten AI SDK UIMessages (parts arrays) into OpenAI `{role, content}`
 * messages. Non-text parts (tool calls, files) are dropped — the chat surface
 * only sends text today. Plain `{role, content}` messages pass through.
 */
export function toOpenAiMessages(messages: unknown): OpenAiChatMessage[] {
  if (!Array.isArray(messages)) return [];
  const result: OpenAiChatMessage[] = [];
  for (const raw of messages as UiMessage[]) {
    if (!raw || typeof raw !== "object") continue;
    const role =
      raw.role === "system" || raw.role === "assistant" || raw.role === "user"
        ? raw.role
        : undefined;
    if (!role) continue;
    let content = typeof raw.content === "string" ? raw.content : "";
    if (!content && Array.isArray(raw.parts)) {
      content = raw.parts
        .filter((part) => part?.type === "text" && typeof part.text === "string")
        .map((part) => part.text)
        .join("");
    }
    if (!content) continue;
    result.push({ role, content });
  }
  return result;
}

// ---------------------------------------------------------------------------
// OpenAI chat-completion SSE → AI SDK UI message stream
// ---------------------------------------------------------------------------

export const UI_MESSAGE_STREAM_HEADERS: Record<string, string> = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  "x-vercel-ai-ui-message-stream": "v1",
};

interface OpenAiStreamDelta {
  content?: string | null;
  reasoning_content?: string | null;
  reasoning?: string | null;
}

interface OpenAiStreamChunk {
  choices?: Array<{ delta?: OpenAiStreamDelta; finish_reason?: string | null }>;
}

/**
 * Transform an OpenAI-style chat-completion SSE byte stream into the AI SDK
 * UI message stream protocol (`useChat` / DefaultChatTransport). Text deltas
 * become `text-delta` chunks; reasoning deltas (`reasoning_content`, used by
 * OpenAI-compat reasoning models like GLM) become `reasoning-delta` chunks.
 */
export function toUiMessageStream(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const messageId = crypto.randomUUID();

  let buffered = "";
  let textOpen = false;
  let reasoningOpen = false;

  const emit = (controller: ReadableStreamDefaultController<Uint8Array>, chunk: Record<string, unknown>) => {
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
  };

  const closeParts = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    if (reasoningOpen) {
      emit(controller, { type: "reasoning-end", id: `${messageId}-reasoning` });
      reasoningOpen = false;
    }
    if (textOpen) {
      emit(controller, { type: "text-end", id: `${messageId}-text` });
      textOpen = false;
    }
  };

  const handleData = (controller: ReadableStreamDefaultController<Uint8Array>, data: string) => {
    if (data === "[DONE]") return;
    let parsed: OpenAiStreamChunk;
    try {
      parsed = JSON.parse(data) as OpenAiStreamChunk;
    } catch {
      return;
    }
    const delta = parsed.choices?.[0]?.delta;
    if (!delta) return;
    const reasoning = delta.reasoning_content ?? delta.reasoning;
    if (typeof reasoning === "string" && reasoning.length > 0) {
      if (!reasoningOpen) {
        emit(controller, { type: "reasoning-start", id: `${messageId}-reasoning` });
        reasoningOpen = true;
      }
      emit(controller, { type: "reasoning-delta", id: `${messageId}-reasoning`, delta: reasoning });
    }
    if (typeof delta.content === "string" && delta.content.length > 0) {
      if (reasoningOpen) {
        emit(controller, { type: "reasoning-end", id: `${messageId}-reasoning` });
        reasoningOpen = false;
      }
      if (!textOpen) {
        emit(controller, { type: "text-start", id: `${messageId}-text` });
        textOpen = true;
      }
      emit(controller, { type: "text-delta", id: `${messageId}-text`, delta: delta.content });
    }
  };

  const flushLines = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    let newlineIndex = buffered.indexOf("\n");
    while (newlineIndex !== -1) {
      const line = buffered.slice(0, newlineIndex).replace(/\r$/u, "");
      buffered = buffered.slice(newlineIndex + 1);
      if (line.startsWith("data:")) {
        handleData(controller, line.slice(5).trim());
      }
      newlineIndex = buffered.indexOf("\n");
    }
  };

  const reader = upstream.getReader();
  let cancelled = false;

  // Eagerly pump the upstream instead of pulling per consumer read: chained
  // pull-based streams can deadlock under some event-loop schedulers (seen in
  // vitest workers and once under tsx), and chat streams are small enough
  // that upstream-paced buffering is fine.
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      emit(controller, { type: "start", messageId });
      emit(controller, { type: "start-step" });
      for (;;) {
        const { value, done } = await reader.read();
        if (cancelled) return;
        if (done) break;
        buffered += decoder.decode(value, { stream: true });
        flushLines(controller);
      }
      buffered += "\n";
      flushLines(controller);
      closeParts(controller);
      emit(controller, { type: "finish-step" });
      emit(controller, { type: "finish" });
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
    async cancel(reason) {
      cancelled = true;
      await reader.cancel(reason);
    },
  });
}
