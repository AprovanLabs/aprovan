/**
 * Thin access to the preload `PanelBridge` when running in the floating panel.
 */

export type PanelBridge = {
  onSummon(cb: (context: { hotkey: string }) => void): () => void;
  hidePanel(): void;
  resizePanel(height: number): void;
};

type WindowWithPanel = Window & { panel?: PanelBridge };

/** The panel bridge when this renderer is the floating panel; else undefined. */
export function getPanelBridge(): PanelBridge | undefined {
  if (typeof window === "undefined") return undefined;
  const bridge = (window as WindowWithPanel).panel;
  if (
    !bridge ||
    typeof bridge.onSummon !== "function" ||
    typeof bridge.hidePanel !== "function" ||
    typeof bridge.resizePanel !== "function"
  ) {
    return undefined;
  }
  return bridge;
}

export function isPanelSurface(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("surface") === "panel";
}
