/**
 * STT shapes used by capture. Mirror `@utdk/stt` so the renderer can speak
 * the contract without a hard dependency on the package (stream 4 may switch
 * to a direct import once chat wires this module).
 */

/** Required wire encoding: 16 kHz mono signed 16-bit PCM, base64 in push. */
export const REQUIRED_ENCODING = "pcm_s16le_16k" as const;

export interface SttWord {
  text: string;
  startMs: number;
  endMs: number;
  speaker?: string;
}

export interface SttSegment {
  text: string;
  startMs: number;
  endMs: number;
  speaker?: string;
  words?: SttWord[];
}

export type SttEvent =
  | { type: "partial"; data: { text: string; segment?: SttSegment } }
  | { type: "final"; data: { segment: SttSegment } }
  | { type: "speech-start" | "speech-end"; data: { atMs: number } }
  | { type: "error"; data: { message: string; retryable: boolean } };

export interface SttResult {
  text: string;
  segments: SttSegment[];
  durationMs: number;
}

export interface SttPushMessage {
  audio: string;
  seq: number;
}

/** Session open capabilities (streaming baseline + STT optionals). */
export interface SttSessionCapabilities {
  streaming: boolean;
  encodings: string[];
  diarization?: boolean;
  wordTimestamps?: boolean;
  vad?: boolean;
  languages?: string[] | "auto";
}
