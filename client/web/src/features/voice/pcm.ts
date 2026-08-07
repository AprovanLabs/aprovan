/** Target rate for the stt contract's required encoding. */
export const PCM_SAMPLE_RATE = 16_000;

/** Bytes of pcm_s16le for one frame of `frameMs` at the contract rate. */
export function frameByteLength(frameMs: number, sampleRate = PCM_SAMPLE_RATE): number {
  return Math.floor((sampleRate * frameMs) / 1000) * 2;
}

/** Samples of pcm_s16le for one frame of `frameMs`. */
export function frameSampleCount(frameMs: number, sampleRate = PCM_SAMPLE_RATE): number {
  return Math.floor((sampleRate * frameMs) / 1000);
}

/** Linear resample Float32 mono to `toRate`. */
export function resampleLinear(
  input: Float32Array,
  fromRate: number,
  toRate: number,
): Float32Array {
  if (fromRate === toRate || input.length === 0) return input;
  const outLength = Math.max(1, Math.round((input.length * toRate) / fromRate));
  const out = new Float32Array(outLength);
  const ratio = fromRate / toRate;
  for (let i = 0; i < outLength; i++) {
    const src = i * ratio;
    const i0 = Math.floor(src);
    const i1 = Math.min(i0 + 1, input.length - 1);
    const t = src - i0;
    out[i] = input[i0]! * (1 - t) + input[i1]! * t;
  }
  return out;
}

/** Convert float −1..1 samples to little-endian signed 16-bit PCM bytes. */
export function floatToPcm16le(samples: Float32Array): Uint8Array {
  const out = new Uint8Array(samples.length * 2);
  const view = new DataView(out.buffer);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]!));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return out;
}

/** Base64 of a Uint8Array (browser-safe). */
export function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/**
 * Accumulate float chunks, resample to 16 kHz, and emit fixed-size pcm frames.
 */
export class PcmFrameBuffer {
  private readonly frameSamples: number;
  private readonly fromRate: number;
  private pending = new Float32Array(0);

  constructor(frameMs: number, fromRate: number) {
    this.frameSamples = frameSampleCount(frameMs);
    this.fromRate = fromRate;
  }

  push(input: Float32Array): Uint8Array[] {
    const resampled = resampleLinear(input, this.fromRate, PCM_SAMPLE_RATE);
    if (resampled.length === 0) return [];
    const merged = new Float32Array(this.pending.length + resampled.length);
    merged.set(this.pending);
    merged.set(resampled, this.pending.length);
    const frames: Uint8Array[] = [];
    let offset = 0;
    while (offset + this.frameSamples <= merged.length) {
      frames.push(floatToPcm16le(merged.subarray(offset, offset + this.frameSamples)));
      offset += this.frameSamples;
    }
    this.pending = merged.subarray(offset);
    return frames;
  }

  /** Flush a partial final frame (zero-padded) when capture ends. */
  flush(): Uint8Array | null {
    if (this.pending.length === 0) return null;
    const padded = new Float32Array(this.frameSamples);
    padded.set(this.pending);
    this.pending = new Float32Array(0);
    return floatToPcm16le(padded);
  }
}
