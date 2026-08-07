/**
 * Thin access to the preload `DesktopBridge` when running inside the shell.
 * Avoids a hard dependency on `@aprovan/desktop` (which pulls Electron).
 */

export type DesktopDirectoryPicker = {
  pickDirectory(purpose: "workspace-root"): Promise<string | undefined>;
};

type WindowWithDesktop = Window & { desktop?: DesktopDirectoryPicker };

/** The bridge when the renderer is hosted by the desktop shell; else undefined. */
export function getDesktopBridge(): DesktopDirectoryPicker | undefined {
  if (typeof window === "undefined") return undefined;
  const bridge = (window as WindowWithDesktop).desktop;
  if (!bridge || typeof bridge.pickDirectory !== "function") return undefined;
  return bridge;
}

export function isDesktopBridgeAvailable(): boolean {
  return getDesktopBridge() !== undefined;
}
