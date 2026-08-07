import {
  BrowserWindow,
  ipcMain,
  type IpcMain,
  type IpcMainInvokeEvent,
} from "electron";
import {
  type BundleInfo,
  type GatewayStatus,
  scaffoldBundleInfo,
} from "./bridge.js";
import { IPC } from "./bridge-api.js";
import type { BundleManager } from "./bundle-manager.js";
import { pickDirectory } from "./dialogs.js";

export { IPC };

export type BridgeHostState = {
  status: GatewayStatus;
  /** Fallback when no BundleManager is wired (tests / early scaffold). */
  bundleInfo: BundleInfo;
  bundles?: BundleManager;
};

export function createInitialBridgeState(
  bundles?: BundleManager,
): BridgeHostState {
  return {
    status: { state: "starting" },
    bundleInfo: bundles?.getBundleInfo() ?? scaffoldBundleInfo(),
    bundles,
  };
}

/**
 * Update bridge status and push it to every renderer listening on
 * `onGatewayStatus`.
 */
export function publishGatewayStatus(
  state: BridgeHostState,
  status: GatewayStatus,
  broadcast: (channel: string, payload: GatewayStatus) => void = broadcastToWindows,
): void {
  state.status = status;
  broadcast(IPC.gatewayStatusEvent, status);
}

function broadcastToWindows(channel: string, payload: GatewayStatus): void {
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) {
      win.webContents.send(channel, payload);
    }
  }
}

/**
 * Register main-process IPC handlers that back the preload DesktopBridge.
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

  ipc.handle(IPC.bundleInfo, async () => {
    if (state.bundles) {
      return state.bundles.getBundleInfo();
    }
    return state.bundleInfo;
  });

  ipc.handle(IPC.rendererReady, async () => {
    state.bundles?.reportRendererReady();
  });
}
