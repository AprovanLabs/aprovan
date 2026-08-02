/**
 * LLM client for bundler phases — structured (JSON-schema) completions with
 * two interchangeable backends:
 *
 *   - **OpenAI-compatible** (e.g. synthetic.new): used when
 *     `SYNTHETIC_PROVIDER_URL` + `SYNTHETIC_PROVIDER_API_KEY` are set.
 *     Default model: GLM 5.2 (`hf:zai-org/GLM-5.2`). Reasoning models spend
 *     tokens thinking before the JSON, so budgets here are generous.
 *   - **Anthropic**: the fallback when no OpenAI-compatible provider is
 *     configured (`ANTHROPIC_API_KEY`). Default model: claude-opus-4-8.
 *
 * Model resolution: explicit option > `UTDK_AUTH_INTEL_MODEL` env > backend
 * default.
 */

import Anthropic from "@anthropic-ai/sdk";

export interface StructuredCompletionRequest {
  /** Backend-specific model id; falls back per backend. */
  model?: string;
  system: string;
  user: string;
  /** JSON schema the output must conform to. */
  schema: Record<string, unknown>;
  schemaName: string;
  maxTokens?: number;
}

export interface StructuredCompletionResult {
  /** The raw JSON text emitted by the model. */
  text: string;
  /** The model that actually served the request (recorded in outputs). */
  model: string;
}

const OPENAI_COMPAT_DEFAULT_MODEL = "hf:zai-org/GLM-5.2";
const ANTHROPIC_DEFAULT_MODEL = "claude-opus-4-8";

interface OpenAiCompatConfig {
  baseUrl: string;
  apiKey: string;
}

function openAiCompatConfig(): OpenAiCompatConfig | undefined {
  const baseUrl = process.env.SYNTHETIC_PROVIDER_URL;
  const apiKey = process.env.SYNTHETIC_PROVIDER_API_KEY;
  if (!baseUrl || !apiKey) return undefined;
  return { baseUrl: baseUrl.replace(/\/$/, ""), apiKey };
}

/** Best-effort extraction of a JSON object from model text (fences, prose). */
export function extractJsonObject(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) return trimmed;

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1].trim();

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }
  return trimmed;
}

async function completeOpenAiCompat(
  config: OpenAiCompatConfig,
  request: StructuredCompletionRequest,
): Promise<StructuredCompletionResult> {
  const model = request.model ?? OPENAI_COMPAT_DEFAULT_MODEL;
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      // Reasoning models think before emitting JSON; keep generous headroom.
      max_tokens: request.maxTokens ?? 16384,
      response_format: {
        type: "json_schema",
        json_schema: { name: request.schemaName, strict: true, schema: request.schema },
      },
      messages: [
        { role: "system", content: request.system },
        { role: "user", content: request.user },
      ],
    }),
  });

  const raw = await response.text();
  if (!response.ok) {
    throw new Error(
      `OpenAI-compatible provider rejected the request (${response.status}): ${raw.slice(0, 300)}`,
    );
  }

  const parsed = JSON.parse(raw) as {
    model?: string;
    choices?: Array<{
      finish_reason?: string;
      message?: { content?: string | null };
    }>;
  };
  const choice = parsed.choices?.[0];
  const content = choice?.message?.content;
  if (!content) {
    throw new Error("OpenAI-compatible provider returned no content.");
  }
  if (choice?.finish_reason === "length") {
    throw new Error(
      "OpenAI-compatible completion hit the token limit before finishing — raise maxTokens.",
    );
  }

  return { text: extractJsonObject(content), model: parsed.model ?? model };
}

async function completeAnthropic(
  request: StructuredCompletionRequest,
): Promise<StructuredCompletionResult> {
  const model = request.model ?? ANTHROPIC_DEFAULT_MODEL;
  const client = new Anthropic();

  const response = await client.messages.create({
    model,
    max_tokens: request.maxTokens ?? 4096,
    thinking: { type: "adaptive" },
    output_config: {
      format: { type: "json_schema", schema: request.schema },
    },
    system: request.system,
    messages: [{ role: "user", content: request.user }],
  });

  if (response.stop_reason === "refusal") {
    throw new Error("Anthropic model refused the request.");
  }

  const textBlock = response.content.find(
    (block): block is Anthropic.TextBlock => block.type === "text",
  );
  if (!textBlock) {
    throw new Error("Anthropic response contained no text output.");
  }

  return { text: textBlock.text, model };
}

/**
 * Run a structured completion against the configured backend.
 * OpenAI-compatible provider wins when configured; Anthropic otherwise.
 */
export function createStructuredCompletion(
  request: StructuredCompletionRequest,
): Promise<StructuredCompletionResult> {
  const compat = openAiCompatConfig();
  return compat ? completeOpenAiCompat(compat, request) : completeAnthropic(request);
}
