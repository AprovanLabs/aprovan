import {
  BrowserWindow,
  ipcMain,
  type IpcMain,
  type IpcMainInvokeEvent,
} from "electron";
import { type BundleInfo, type GatewayStatus, scaffoldBundleInfo } from "./bridge.js";
import { IPC } from "./bridge-api.js";
import { pickDirectory } from "./dialogs.js";

export { IPC };

export type BridgeHostState = {
  status: GatewayStatus;
  bundleInfo: BundleInfo;
};

export function createInitialBridgeState(): BridgeHostState {
  return {
    status: { state: "starting" },
    bundleInfo: scaffoldBundleInfo(),
  };
}

/**
 * Register main-process IPC handlers that back the preload DesktopBridge.
 * Gateway supervision lands in a later stream; directory picking is live.
 */
export function registerBridgeHandlers(
  state: BridgeHostState,
  ipc: Pick<IpcMain, "handle"> = ipcMain,
): void {
  ipc.handle(IPC.gatewayUrl, async () => {
    if (state.status.state === "ready") {
      return state.status.url;
    }
    throw new Error("Gateway is not ready");
  });

  ipc.handle(IPC.gatewayStatus, async () => state.status);

  ipc.handle(
    IPC.pickDirectory,
    async (
      event: IpcMainInvokeEvent,
      purpose: "workspace-root",
    ): Promise<string | undefined> => {
      const parent = BrowserWindow.fromWebContents(event.sender);
      return pickDirectory(purpose, { parent });
    },
  );

  ipc.handle(IPC.bundleInfo, async () => state.bundleInfo);
}
