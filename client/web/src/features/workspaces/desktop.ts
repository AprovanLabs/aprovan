/**
 * Thin access to the preload `DesktopBridge` when running inside the shell.
 * Avoids a hard dependency on `@aprovan/desktop` (which pulls Electron).
 */

export type DesktopDirectoryPicker = {
  pickDirectory(purpose: "workspace-root"): Promise<string | undefined>;
};

export type DesktopHelperBridge = {
  helperUrl(): Promise<string | null>;
};

export type DesktopGatewayStatus =
  | { state: "starting" }
  | { state: "ready"; url: string }
  | { state: "restarting"; attempt: number; lastError: string }
  | { state: "failed"; error: string };

export type DesktopGatewayBridge = {
  gatewayUrl(): Promise<string>;
  gatewayStatus(): Promise<DesktopGatewayStatus>;
  onGatewayStatus(cb: (s: DesktopGatewayStatus) => void): () => void;
};

export type DesktopExternalBridge = {
  openExternal(url: string): Promise<void>;
};

type WindowWithDesktop = Window & {
  desktop?: DesktopDirectoryPicker &
    Partial<DesktopHelperBridge> &
    Partial<DesktopGatewayBridge> &
    Partial<DesktopExternalBridge>;
};

function windowDesktop(): WindowWithDesktop["desktop"] {
  if (typeof window === "undefined") return undefined;
  return (window as WindowWithDesktop).desktop;
}

/** The bridge when the renderer is hosted by the desktop shell; else undefined. */
export function getDesktopBridge(): DesktopDirectoryPicker | undefined {
  const bridge = windowDesktop();
  if (!bridge || typeof bridge.pickDirectory !== "function") return undefined;
  return bridge;
}

export function isDesktopBridgeAvailable(): boolean {
  return getDesktopBridge() !== undefined;
}

/** Full gateway supervision surface when the shell exposes it. */
export function getDesktopGatewayBridge(): DesktopGatewayBridge | undefined {
  const bridge = windowDesktop();
  if (
    !bridge ||
    typeof bridge.gatewayStatus !== "function" ||
    typeof bridge.onGatewayStatus !== "function" ||
    typeof bridge.gatewayUrl !== "function"
  ) {
    return undefined;
  }
  return bridge as DesktopGatewayBridge;
}

/** Helper loopback origin when the macOS helper is ready; else null/undefined. */
export async function getDesktopHelperUrl(): Promise<string | null | undefined> {
  const bridge = windowDesktop();
  if (!bridge || typeof bridge.helperUrl !== "function") return undefined;
  return bridge.helperUrl();
}

/** Open a URL in the system browser when the shell exposes `openExternal`. */
export async function openDesktopExternal(url: string): Promise<boolean> {
  const bridge = windowDesktop();
  if (!bridge || typeof bridge.openExternal !== "function") return false;
  await bridge.openExternal(url);
  return true;
}
