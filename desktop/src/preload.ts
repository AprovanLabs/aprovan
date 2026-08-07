import { contextBridge, ipcRenderer } from "electron";
import { assertDesktopBridgeSurface } from "./bridge.js";
import { createPreloadBridgeApi, IPC } from "./bridge-api.js";

const bridge = createPreloadBridgeApi(ipcRenderer);
assertDesktopBridgeSurface(bridge);
contextBridge.exposeInMainWorld("desktop", bridge);

// Boot-success signal for BundleManager (stream 5). Kept off the public
// DesktopBridge surface — the renderer does not need to call this explicitly.
function reportReady(): void {
  void ipcRenderer.invoke(IPC.rendererReady);
}

type DomDocument = {
  readyState: string;
  addEventListener: (
    type: string,
    listener: () => void,
    options?: { once?: boolean },
  ) => void;
};

const doc = (globalThis as { document?: DomDocument }).document;
if (doc && doc.readyState === "loading") {
  doc.addEventListener("DOMContentLoaded", reportReady, { once: true });
} else {
  reportReady();
}
