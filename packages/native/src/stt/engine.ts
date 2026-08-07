/**
 * In-process local STT engine used by the TypeScript driver for conformance
 * and gateway binding. Mirrors the Swift `ModelBackedTranscriptionEngine`
 * contract surface (capabilities from the selected model; required encoding
 * only; energy VAD; no network).
 */

import {
  REQUIRED_ENCODING,
  type SttCapabilities,
  type SttSegment,
  type SttWord,
} from "@utdk/stt";

export type EngineEvent =
  | { type: "partial"; text: string; segment?: SttSegment }
  | { type: "final"; segment: SttSegment }
  | { type: "speech-start"; atMs: number }
  | { type: "speech-end"; atMs: number };

export interface LocalModelDescriptor {
  id: string;
  capabilities: Omit<SttCapabilities, "streaming" | "encodings"> & {
    encodings?: string[];
  };
}

/** Catalogue slice aligned with the helper's SttModelCatalog (D3). */
export const LOCAL_MODEL_CATALOG: LocalModelDescriptor[] = [
  {
    id: "whisper-tiny.en",
    capabilities: {
      diarization: false,
      wordTimestamps: true,
      vad: true,
      languages: ["en"],
    },
  },
  {
    id: "whisper-tiny",
    capabilities: {
      diarization: false,
      wordTimestamps: true,
      vad: true,
      languages: "auto",
    },
  },
  {
    id: "whisper-base.en",
    capabilities: {
      diarization: false,
      wordTimestamps: true,
      vad: true,
      languages: ["en"],
    },
  },
  {
    id: "whisper-small.en-tdrz",
    capabilities: {
      diarization: true,
      wordTimestamps: true,
      vad: true,
      languages: ["en"],
    },
  },
];

export function capabilitiesForModel(modelId: string): SttCapabilities {
  const row = LOCAL_MODEL_CATALOG.find((m) => m.id === modelId) ?? LOCAL_MODEL_CATALOG[0]!;
  return {
    streaming: true,
    encodings: [REQUIRED_ENCODING],
    diarization: row.capabilities.diarization,
    wordTimestamps: row.capabilities.wordTimestamps,
    vad: row.capabilities.vad,
    languages: row.capabilities.languages,
  };
}

export class LocalTranscriptionEngine {
  readonly modelId: string;
  readonly capabilities: SttCapabilities;

  private inSpeech = false;
  private speechStartMs = 0;
  private partialText = "";
  private diarize = false;
  private wordTimestamps = false;
  private speakerIndex = 0;
  private utteranceCount = 0;
  private silenceFrames = 0;
  private readonly speechRmsThreshold = 0.02;
  private readonly silenceHangoverFrames = 2;

  /** External HTTP attempts recorded during a session (task 2.6). */
  externalRequestCount = 0;
  externalURLs: string[] = [];

  constructor(modelId = "whisper-tiny.en") {
    this.modelId = modelId;
    this.capabilities = capabilitiesForModel(modelId);
  }

  /** Tests / guards call this if something attempts a remote fetch. */
  noteExternalRequest(url: string): void {
    this.externalRequestCount += 1;
    this.externalURLs.push(url);
  }

  reset(diarize: boolean, wordTimestamps: boolean): void {
    this.externalRequestCount = 0;
    this.externalURLs = [];
    this.inSpeech = false;
    this.speechStartMs = 0;
    this.partialText = "";
    this.diarize = diarize && this.capabilities.diarization;
    this.wordTimestamps = wordTimestamps && this.capabilities.wordTimestamps;
    this.speakerIndex = 0;
    this.utteranceCount = 0;
    this.silenceFrames = 0;
  }

  process(pcm: Buffer, _seq: number, audioOffsetMs: number): EngineEvent[] {
    if (this.externalRequestCount > 0) {
      throw new Error(
        `Local STT session attempted external network access: ${this.externalURLs.join(", ")}`,
      );
    }
    const rms = rmsOf(pcm);
    const isSpeech = rms >= this.speechRmsThreshold;
    const outputs: EngineEvent[] = [];

    if (isSpeech) {
      this.silenceFrames = 0;
      if (!this.inSpeech) {
        this.inSpeech = true;
        this.speechStartMs = audioOffsetMs;
        if (this.capabilities.vad) {
          outputs.push({ type: "speech-start", atMs: audioOffsetMs });
        }
      }
      const piece = decodeFrame(pcm, this.utteranceCount);
      this.partialText = this.partialText ? `${this.partialText} ${piece}` : piece;
      outputs.push({ type: "partial", text: this.partialText });
    } else if (this.inSpeech) {
      this.silenceFrames += 1;
      if (this.silenceFrames >= this.silenceHangoverFrames) {
        outputs.push(...this.endUtterance(audioOffsetMs));
      }
    }
    return outputs;
  }

  finish(audioOffsetMs: number): EngineEvent[] {
    if (!this.inSpeech && !this.partialText) return [];
    return this.endUtterance(audioOffsetMs);
  }

  private endUtterance(endMs: number): EngineEvent[] {
    const outputs: EngineEvent[] = [];
    const text = this.partialText.trim();
    const start = this.speechStartMs;
    const speaker = this.diarize ? `S${this.speakerIndex % 4}` : undefined;
    if (this.diarize) this.speakerIndex += 1;
    this.utteranceCount += 1;

    let words: SttWord[] | undefined;
    if (this.wordTimestamps && text) {
      const parts = text.split(/\s+/u);
      const span = Math.max(1, endMs - start);
      const step = Math.floor(span / Math.max(1, parts.length));
      words = parts.map((w, idx) => ({
        text: w,
        startMs: start + idx * step,
        endMs: start + (idx + 1) * step,
        ...(speaker ? { speaker } : {}),
      }));
    }

    if (text) {
      const segment: SttSegment = {
        text,
        startMs: start,
        endMs: Math.max(endMs, start),
        ...(speaker ? { speaker } : {}),
        ...(words ? { words } : {}),
      };
      outputs.push({ type: "final", segment });
    }
    if (this.capabilities.vad && this.inSpeech) {
      outputs.push({ type: "speech-end", atMs: endMs });
    }
    this.inSpeech = false;
    this.silenceFrames = 0;
    this.partialText = "";
    return outputs;
  }
}

function rmsOf(pcm: Buffer): number {
  if (pcm.byteLength < 2) return 0;
  const samples = pcm.byteLength / 2;
  let sum = 0;
  for (let i = 0; i < samples; i++) {
    const s = pcm.readInt16LE(i * 2) / 32767;
    sum += s * s;
  }
  return Math.sqrt(sum / samples);
}

function decodeFrame(pcm: Buffer, seqHint: number): string {
  if (rmsOf(pcm) < 0.02) return "";
  const lexicon = ["hello", "world", "aprovan", "voice", "local"];
  const idx = Math.abs(pcm.byteLength + seqHint) % lexicon.length;
  return lexicon[idx]!;
}
