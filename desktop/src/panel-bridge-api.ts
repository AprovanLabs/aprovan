import { type PanelBridge, PANEL_IPC } from "./panel-bridge.js";

/**
 * Build the object the panel preload exposes — shared by the real preload and
 * by tests that verify the surface without loading Electron's contextBridge.
 */
export function createPreloadPanelBridgeApi(ipc: {
  invoke: (channel: string, ...args: unknown[]) => Promise<unknown>;
  on: (
    channel: string,
    listener: (event: unknown, ...args: unknown[]) => void,
  ) => void;
  removeListener: (
    channel: string,
    listener: (event: unknown, ...args: unknown[]) => void,
  ) => void;
  send: (channel: string, ...args: unknown[]) => void;
}): PanelBridge {
  return {
    onSummon: (cb) => {
      const listener = (_event: unknown, context: unknown) => {
        const ctx = context as { hotkey?: unknown };
        cb({
          hotkey: typeof ctx?.hotkey === "string" ? ctx.hotkey : "",
        });
      };
      ipc.on(PANEL_IPC.summon, listener);
      return () => ipc.removeListener(PANEL_IPC.summon, listener);
    },
    hidePanel: () => {
      void ipc.invoke(PANEL_IPC.hide);
    },
    resizePanel: (height: number) => {
      void ipc.invoke(PANEL_IPC.resize, height);
    },
  };
}
