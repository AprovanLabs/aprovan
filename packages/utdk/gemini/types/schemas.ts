/** A content part (text, inlineData, functionCall, ...). */
export type Part = {
  text?: string;
  [key: string]: unknown;
};

export type Content = {
  role?: "user" | "model";
  parts: (Part)[];
};

export type GenerationConfig = {
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
  stopSequences?: (string)[];
  responseMimeType?: string;
  [key: string]: unknown;
};

export type GenerateContentRequest = {
  contents: (Content)[];
  systemInstruction?: Content;
  generationConfig?: GenerationConfig;
  safetySettings?: ({ [key: string]: unknown })[];
};

export type Candidate = {
  content?: Content;
  finishReason?: string;
  index?: number;
};

export type GenerateContentResponse = {
  candidates?: (Candidate)[];
  usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number; totalTokenCount?: number };
  modelVersion?: string;
};

export type Model = {
  /** Resource name, e.g. models/gemini-2.5-flash */
  name: string;
  displayName?: string;
  description?: string;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  supportedGenerationMethods?: (string)[];
};
