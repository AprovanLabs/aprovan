export {
  startCapture,
  type CaptureHandle,
  type CaptureOptions,
} from "./start-capture";
export {
  CaptureError,
  type CaptureErrorCode,
  resetMicrophonePermissionState,
  wasMicrophonePermissionDenied,
} from "./errors";
export {
  destinationForProvider,
  resolveSttDestination,
  type CaptureDestination,
} from "./destination";
export {
  REQUIRED_ENCODING,
  type SttEvent,
  type SttResult,
  type SttSegment,
  type SttPushMessage,
} from "./types";
export {
  floatToPcm16le,
  frameByteLength,
  resampleLinear,
  PcmFrameBuffer,
  PCM_SAMPLE_RATE,
  bytesToBase64,
} from "./pcm";
