import {
  CaptureError,
  mapMediaError,
  wasMicrophonePermissionDenied,
} from "./errors";
import { PcmFrameBuffer } from "./pcm";

export interface MicCaptureOptions {
  frameMs: number;
  echoCancellation: boolean;
  noiseSuppression: boolean;
}

export interface MicPump {
  stop(): void;
}

type AudioContextCtor = new (options?: AudioContextOptions) => AudioContext;

function mediaDevices(): MediaDevices {
  const md = globalThis.navigator?.mediaDevices;
  if (!md?.getUserMedia) {
    throw new CaptureError(
      "device-missing",
      "No microphone is available. Connect an input device to use voice.",
    );
  }
  return md;
}

function audioContextCtor(): AudioContextCtor {
  const Ctor =
    (globalThis as unknown as { AudioContext?: AudioContextCtor }).AudioContext ??
    (globalThis as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext;
  if (!Ctor) {
    throw new CaptureError("capture-failed", "Web Audio is not available in this environment");
  }
  return Ctor;
}

/** Acquire the default microphone with browser echo cancel / noise suppress. */
export async function acquireMicrophone(options: MicCaptureOptions): Promise<MediaStream> {
  if (wasMicrophonePermissionDenied()) {
    throw new CaptureError(
      "permission-denied",
      "Microphone permission denied. Voice input is unavailable until permission is granted in system settings.",
    );
  }
  try {
    return await mediaDevices().getUserMedia({
      audio: {
        echoCancellation: options.echoCancellation,
        noiseSuppression: options.noiseSuppression,
        channelCount: 1,
      },
      video: false,
    });
  } catch (err) {
    throw mapMediaError(err);
  }
}

/**
 * Pipe a MediaStream into fixed pcm_s16le_16k frames via Web Audio.
 * Uses ScriptProcessor for broad Electron/Chromium coverage (capture volume is short-lived).
 */
export function startMicFramePump(
  stream: MediaStream,
  options: MicCaptureOptions,
  onFrame: (pcm: Uint8Array) => void,
): MicPump {
  const Ctor = audioContextCtor();
  const ctx = new Ctor();
  const source = ctx.createMediaStreamSource(stream);
  const bufferSize = 4096;
  const processor = ctx.createScriptProcessor(bufferSize, 1, 1);
  const frames = new PcmFrameBuffer(options.frameMs, ctx.sampleRate);

  processor.onaudioprocess = (ev) => {
    const input = ev.inputBuffer.getChannelData(0);
    const copy = new Float32Array(input.length);
    copy.set(input);
    for (const frame of frames.push(copy)) onFrame(frame);
  };

  // ScriptProcessor must be connected to destination to run; keep gain silent.
  const mute = ctx.createGain();
  mute.gain.value = 0;
  source.connect(processor);
  processor.connect(mute);
  mute.connect(ctx.destination);

  let stopped = false;
  return {
    stop() {
      if (stopped) return;
      stopped = true;
      const tail = frames.flush();
      if (tail) onFrame(tail);
      try {
        processor.disconnect();
        source.disconnect();
        mute.disconnect();
      } catch {
        // already torn down
      }
      void ctx.close().catch(() => {});
      for (const track of stream.getTracks()) track.stop();
    },
  };
}
