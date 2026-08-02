import type { InputMessage, Message, ModelInfo, Tool } from "./schemas.js";

export type AnthropicClient = {
  /**
   * Create a message
   */
  createMessage: (input: {
    /** Model id, e.g. claude-opus-4-8 */
    model: string;
    max_tokens: number;
    messages: (InputMessage)[];
    system?: string;
    thinking?: { type?: "adaptive" | "disabled"; display?: "summarized" | "omitted" };
    output_config?: { effort?: "low" | "medium" | "high" | "xhigh" | "max"; [key: string]: unknown };
    tools?: (Tool)[];
    tool_choice?: { [key: string]: unknown };
    stop_sequences?: (string)[];
    stream?: boolean;
    metadata?: { user_id?: string };
  }, options: { headers: { "anthropic-version": string } }) => Promise<Message>;

  /**
   * Count tokens in a message
   */
  countTokens: (input: {
    model: string;
    messages: (InputMessage)[];
    system?: string;
    tools?: (Tool)[];
  }, options: { headers: { "anthropic-version": string } }) => Promise<{ input_tokens: number }>;

  /**
   * List models
   */
  listModels: (input: {
    limit?: number;
    before_id?: string;
    after_id?: string;
  }, options: { headers: { "anthropic-version": string } }) => Promise<{ data: (ModelInfo)[]; has_more: boolean; first_id?: string | null; last_id?: string | null }>;

  /**
   * Get a model
   */
  getModel: (input: {
    /** Model identifier or alias, e.g. claude-opus-4-8 */
    model_id: string;
  }, options: { headers: { "anthropic-version": string } }) => Promise<ModelInfo>;
};

export * from "./schemas.js";
