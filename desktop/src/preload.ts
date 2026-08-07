import { contextBridge, ipcRenderer } from "electron";
import { assertDesktopBridgeSurface } from "./bridge.js";
import { createPreloadBridgeApi } from "./bridge-api.js";

const bridge = createPreloadBridgeApi(ipcRenderer);
assertDesktopBridgeSurface(bridge);
contextBridge.exposeInMainWorld("desktop", bridge);
