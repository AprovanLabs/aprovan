export type InputMessage = {
  role: "user" | "assistant";
  content: string | (ContentBlock)[];
};

/** A content block (text, image, tool_use, tool_result, thinking, ...) discriminated by `type`. */
export type ContentBlock = {
  type: string;
  text?: string;
  [key: string]: unknown;
};

export type Tool = {
  name: string;
  description?: string;
  input_schema: { [key: string]: unknown };
  strict?: boolean;
};

export type CreateMessageRequest = {
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
};

export type CountTokensRequest = {
  model: string;
  messages: (InputMessage)[];
  system?: string;
  tools?: (Tool)[];
};

export type Usage = {
  input_tokens?: number;
  output_tokens?: number;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
};

export type Message = {
  id: string;
  type: "message";
  role: "assistant";
  model: string;
  content: (ContentBlock)[];
  stop_reason?: "end_turn" | "max_tokens" | "stop_sequence" | "tool_use" | "pause_turn" | "refusal" | null;
  stop_sequence?: string | null;
  usage?: Usage;
};

export type ModelInfo = {
  id: string;
  type: "model";
  display_name: string;
  created_at?: string;
};
