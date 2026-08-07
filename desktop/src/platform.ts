/**
 * Platform floor: macOS 14+ on Apple Silicon only.
 * Darwin 23 corresponds to macOS 14.
 */

export const MIN_DARWIN_MAJOR = 23;

export type PlatformInfo = {
  platform: NodeJS.Platform | string;
  arch: string;
  /** `os.release()` — Darwin kernel version on macOS (e.g. "23.6.0"). */
  release: string;
};

export type PlatformFloorResult =
  | { ok: true }
  | { ok: false; message: string };

const UNSUPPORTED_MAC =
  "Aprovan Desktop requires macOS 14 or later on Apple Silicon.";

export function evaluatePlatformFloor(
  info: PlatformInfo,
): PlatformFloorResult {
  if (info.platform !== "darwin") {
    return {
      ok: false,
      message: `${UNSUPPORTED_MAC} This computer is not running macOS.`,
    };
  }

  if (info.arch !== "arm64") {
    return {
      ok: false,
      message:
        "Aprovan Desktop requires an Apple Silicon Mac. Intel Macs are not supported.",
    };
  }

  const major = Number.parseInt(info.release.split(".")[0] ?? "", 10);
  if (!Number.isFinite(major) || major < MIN_DARWIN_MAJOR) {
    return {
      ok: false,
      message:
        "Aprovan Desktop requires macOS 14 or later. This Mac is running an older version.",
    };
  }

  return { ok: true };
}
