import {
  type BundleInfo,
  type DesktopBridge,
  type GatewayStatus,
} from "./bridge.js";

export const IPC = {
  gatewayUrl: "desktop:gatewayUrl",
  gatewayStatus: "desktop:gatewayStatus",
  pickDirectory: "desktop:pickDirectory",
  bundleInfo: "desktop:bundleInfo",
  helperUrl: "desktop:helperUrl",
  /** Renderer readiness — not part of the public DesktopBridge surface. */
  rendererReady: "desktop:rendererReady",
  gatewayStatusEvent: "desktop:gatewayStatus",
} as const;

/**
 * Build the object the preload exposes — shared by the real preload and by
 * tests that verify the surface without loading Electron's contextBridge.
 */
export function createPreloadBridgeApi(ipc: {
  invoke: (channel: string, ...args: unknown[]) => Promise<unknown>;
  on: (
    channel: string,
    listener: (event: unknown, ...args: unknown[]) => void,
  ) => void;
  removeListener: (
    channel: string,
    listener: (event: unknown, ...args: unknown[]) => void,
  ) => void;
}): DesktopBridge {
  return {
    gatewayUrl: () => ipc.invoke(IPC.gatewayUrl) as Promise<string>,
    gatewayStatus: () =>
      ipc.invoke(IPC.gatewayStatus) as Promise<GatewayStatus>,
    onGatewayStatus: (cb) => {
      const listener = (_event: unknown, status: unknown) => {
        cb(status as GatewayStatus);
      };
      ipc.on(IPC.gatewayStatusEvent, listener);
      return () => ipc.removeListener(IPC.gatewayStatusEvent, listener);
    },
    pickDirectory: (purpose) =>
      ipc.invoke(IPC.pickDirectory, purpose) as Promise<string | undefined>,
    bundleInfo: () => ipc.invoke(IPC.bundleInfo) as Promise<BundleInfo>,
    helperUrl: () => ipc.invoke(IPC.helperUrl) as Promise<string | null>,
  };
}
