export type CaptureErrorCode = "permission-denied" | "device-missing" | "capture-failed";

/**
 * Capture failures the host can map to UX copy. Permission denial is distinct
 * from a missing device (audio-capture spec).
 */
export class CaptureError extends Error {
  readonly code: CaptureErrorCode;

  constructor(code: CaptureErrorCode, message: string) {
    super(message);
    this.name = "CaptureError";
    this.code = code;
  }
}

/** After a denial we must not call getUserMedia again (no re-prompt). */
let permissionDenied = false;

export function wasMicrophonePermissionDenied(): boolean {
  return permissionDenied;
}

export function markMicrophonePermissionDenied(): void {
  permissionDenied = true;
}

/** Test seam. */
export function resetMicrophonePermissionState(): void {
  permissionDenied = false;
}

export function mapMediaError(err: unknown): CaptureError {
  const name =
    err && typeof err === "object" && "name" in err
      ? String((err as { name: unknown }).name)
      : "";
  const message = err instanceof Error ? err.message : String(err);

  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    markMicrophonePermissionDenied();
    return new CaptureError(
      "permission-denied",
      "Microphone permission denied. Voice input is unavailable until permission is granted in system settings.",
    );
  }
  if (
    name === "NotFoundError" ||
    name === "DevicesNotFoundError" ||
    /no.*(microphone|audio\s*input|input\s*device)/i.test(message)
  ) {
    return new CaptureError(
      "device-missing",
      "No microphone is available. Connect an input device to use voice.",
    );
  }
  return new CaptureError("capture-failed", message || "Microphone capture failed");
}
