/**
 * Main ↔ renderer bridge surface. Deliberately tiny: the renderer reaches every
 * capability through the gateway, never through this surface.
 *
 * Kept in lockstep with openspec/changes/desktop-shell/tech-plan.md.
 */

export interface DesktopBridge {
  gatewayUrl(): Promise<string>;
  gatewayStatus(): Promise<GatewayStatus>;
  onGatewayStatus(cb: (s: GatewayStatus) => void): () => void;
  pickDirectory(purpose: "workspace-root"): Promise<string | undefined>;
  bundleInfo(): Promise<BundleInfo>;
  /**
   * Loopback origin of the macOS helper when ready (`http://127.0.0.1:<port>`),
   * else null. Used by the renderer to point `setCdnBaseUrl` at `/esm`.
   */
  helperUrl(): Promise<string | null>;
  /** Open a URL in the system browser (e.g. aprovan.com sign-in). */
  openExternal(url: string): Promise<void>;
}

export type GatewayStatus =
  | { state: "starting" }
  | { state: "ready"; url: string }
  | { state: "restarting"; attempt: number; lastError: string }
  | { state: "failed"; error: string };

export interface BundleInfo {
  active: { version: string; sha256: string; activatedAt: string };
  previous?: { version: string; sha256: string };
  pending?: { version: string; state: "downloading" | "verifying" | "staged" };
}

/** Exact method names exposed on the bridge. Nothing else. */
export const DESKTOP_BRIDGE_METHODS = [
  "gatewayUrl",
  "gatewayStatus",
  "onGatewayStatus",
  "pickDirectory",
  "bundleInfo",
  "helperUrl",
  "openExternal",
] as const satisfies ReadonlyArray<keyof DesktopBridge>;

export type DesktopBridgeMethod = (typeof DESKTOP_BRIDGE_METHODS)[number];

/**
 * Assert that `value` exposes exactly the DesktopBridge method surface —
 * every declared method, and no additional own enumerable keys.
 */
export function assertDesktopBridgeSurface(
  value: object,
): asserts value is DesktopBridge {
  const keys = Reflect.ownKeys(value).filter(
    (k): k is string => typeof k === "string",
  );
  const expected = new Set<string>(DESKTOP_BRIDGE_METHODS);
  const actual = new Set(keys);

  const missing = [...expected].filter((k) => !actual.has(k));
  const extra = [...actual].filter((k) => !expected.has(k));

  if (missing.length > 0 || extra.length > 0) {
    const parts: string[] = [];
    if (missing.length > 0) parts.push(`missing: ${missing.join(", ")}`);
    if (extra.length > 0) parts.push(`extra: ${extra.join(", ")}`);
    throw new Error(`DesktopBridge surface mismatch (${parts.join("; ")})`);
  }

  for (const method of DESKTOP_BRIDGE_METHODS) {
    if (typeof (value as Record<string, unknown>)[method] !== "function") {
      throw new Error(`DesktopBridge.${method} must be a function`);
    }
  }
}

/** Placeholder bundle info until BundleManager lands (stream 5). */
export function scaffoldBundleInfo(): BundleInfo {
  return {
    active: {
      version: "0.0.0-dev",
      sha256: "0".repeat(64),
      activatedAt: new Date(0).toISOString(),
    },
  };
}
