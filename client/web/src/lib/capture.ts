/**
 * Renderer audio capture — public entry for voice (tech-plan CaptureHandle).
 *
 * Capture lives in the client, never in a provider (D1). Providers receive
 * the same `pcm_s16le_16k` push sequence whether local or remote.
 */

export {
  startCapture,
  type CaptureHandle,
  type CaptureOptions,
} from "@/features/voice/start-capture";

export {
  CaptureError,
  type CaptureErrorCode,
  resetMicrophonePermissionState,
  wasMicrophonePermissionDenied,
} from "@/features/voice/errors";

export {
  destinationForProvider,
  type CaptureDestination,
} from "@/features/voice/destination";

export {
  REQUIRED_ENCODING,
  type SttEvent,
  type SttResult,
} from "@/features/voice/types";
