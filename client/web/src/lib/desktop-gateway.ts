/**
 * Bind the desktop shell's supervised loopback gateway as the renderer's
 * default API base. Without this, production desktop builds fall through to
 * `https://aprovan.com/api/gateway` and every call fails Cognito auth.
 *
 * Keeps the last ready origin across `restarting` so brief supervisor flaps
 * do not bounce the renderer onto the cloud fallback.
 */

import {
  getDesktopGatewayBridge,
  type DesktopGatewayStatus,
} from "@/features/workspaces/desktop";

const ORIGIN_KEY = "__aprovanDesktopGatewayOrigin";
const READY_TIMEOUT_MS = 45_000;

type GlobalWithOrigin = typeof globalThis & {
  [ORIGIN_KEY]?: string | null;
};

export type DesktopGatewayProgress = {
  message: string;
};

type ProgressListener = (progress: DesktopGatewayProgress) => void;

function readOrigin(): string | null {
  return (globalThis as GlobalWithOrigin)[ORIGIN_KEY] ?? null;
}

function writeOrigin(origin: string | null): void {
  (globalThis as GlobalWithOrigin)[ORIGIN_KEY] = origin;
}

/** Convert a shell origin into the REST base the client already expects. */
export function gatewayApiBaseFromOrigin(origin: string): string {
  return `${origin.replace(/\/$/, "")}/api/gateway`;
}

export function getDesktopGatewayApiBase(): string | null {
  const origin = readOrigin();
  return origin ? gatewayApiBaseFromOrigin(origin) : null;
}

function applyStatus(status: DesktopGatewayStatus): void {
  if (status.state === "ready") {
    writeOrigin(status.url);
    return;
  }
  // Keep the last ready URL while the supervisor restarts; only clear on
  // hard failure so we never silently fall back to the cloud gateway.
  if (status.state === "failed") {
    writeOrigin(null);
  }
}

function progressFor(status: DesktopGatewayStatus): DesktopGatewayProgress {
  switch (status.state) {
    case "ready":
      return { message: "Local gateway ready" };
    case "failed":
      return { message: status.error || "Desktop gateway failed to start" };
    case "restarting":
      return {
        message: `Starting local gateway… (retry ${status.attempt})${
          status.lastError ? ` — ${status.lastError}` : ""
        }`,
      };
    default:
      return { message: "Starting local gateway…" };
  }
}

/**
 * Subscribe to gateway supervision and resolve once the gateway is ready
 * (or failed). Idempotent — safe to call from app bootstrap.
 *
 * Subscribe before reading the current status so a ready event cannot be
 * missed between the snapshot and the listener (that race left the window
 * blank indefinitely).
 */
export async function bindDesktopGateway(
  onProgress?: ProgressListener,
): Promise<string | null> {
  const bridge = getDesktopGatewayBridge();
  if (!bridge) return null;

  return new Promise<string | null>((resolve, reject) => {
    let settled = false;
    let stop: (() => void) | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      stop?.();
      if (timer !== undefined) clearTimeout(timer);
      fn();
    };

    stop = bridge.onGatewayStatus((status) => {
      applyStatus(status);
      onProgress?.(progressFor(status));
      if (status.state === "ready") {
        finish(() => resolve(gatewayApiBaseFromOrigin(status.url)));
      } else if (status.state === "failed") {
        finish(() =>
          reject(new Error(status.error || "Desktop gateway failed to start")),
        );
      }
    });

    timer = setTimeout(() => {
      finish(() =>
        reject(
          new Error(
            "Desktop gateway did not become ready in time. The packaged gateway may be missing dependencies — rebuild with `pnpm --filter @aprovan/desktop package:local`.",
          ),
        ),
      );
    }, READY_TIMEOUT_MS);

    void bridge.gatewayStatus().then(
      (current) => {
        applyStatus(current);
        onProgress?.(progressFor(current));
        if (current.state === "ready") {
          finish(() => resolve(gatewayApiBaseFromOrigin(current.url)));
        } else if (current.state === "failed") {
          finish(() =>
            reject(
              new Error(current.error || "Desktop gateway failed to start"),
            ),
          );
        }
      },
      (error) => {
        finish(() =>
          reject(
            error instanceof Error
              ? error
              : new Error("Desktop gateway status unavailable"),
          ),
        );
      },
    );
  });
}
