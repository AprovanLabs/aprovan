import { ipcMain, type IpcMain } from "electron";
import { PANEL_IPC } from "./panel-bridge.js";
import type { FloatingPanel } from "./panel.js";

/**
 * Register main-process IPC handlers that back the panel preload PanelBridge.
 */
export function registerPanelHandlers(
  getPanel: () => FloatingPanel | null,
  ipc: Pick<IpcMain, "handle"> = ipcMain,
): void {
  ipc.handle(PANEL_IPC.hide, async () => {
    getPanel()?.hide();
  });

  ipc.handle(PANEL_IPC.resize, async (_event, height: unknown) => {
    if (typeof height !== "number") return;
    getPanel()?.resize(height);
  });
}
