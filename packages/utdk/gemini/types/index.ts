import type { Content, GenerateContentResponse, GenerationConfig, Model } from "./schemas.js";

export type GeminiClient = {
  /**
   * List models
   */
  listModels: (input: {
    pageSize?: number;
    pageToken?: string;
  }) => Promise<{ models?: (Model)[]; nextPageToken?: string }>;

  /**
   * Get a model
   */
  getModel: (input: {
    /** Model name without the models/ prefix, e.g. gemini-2.5-flash */
    model: string;
  }) => Promise<Model>;

  /**
   * Generate content
   */
  generateContent: (input: {
    contents: (Content)[];
    systemInstruction?: Content;
    generationConfig?: GenerationConfig;
    safetySettings?: ({ [key: string]: unknown })[];
    /** Model name without the models/ prefix, e.g. gemini-2.5-flash */
    model: string;
  }) => Promise<GenerateContentResponse>;

  /**
   * Count tokens
   */
  countTokens: (input: {
    contents?: (Content)[];
    model: string;
  }) => Promise<{ totalTokens?: number }>;
};

export * from "./schemas.js";
