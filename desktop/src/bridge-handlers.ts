import { ipcMain, type IpcMain } from "electron";
import { type BundleInfo, type GatewayStatus, scaffoldBundleInfo } from "./bridge.js";
import { IPC } from "./bridge-api.js";

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
 * Gateway supervision and the native directory picker land in later streams;
 * this scaffold returns starting/placeholder values only.
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
    async (_event, purpose: "workspace-root"): Promise<string | undefined> => {
      if (purpose !== "workspace-root") {
        return undefined;
      }
      // Native panel arrives in stream 6.
      return undefined;
    },
  );

  ipc.handle(IPC.bundleInfo, async () => state.bundleInfo);
}
