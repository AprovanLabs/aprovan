import { contextBridge, ipcRenderer } from "electron";
import { assertPanelBridgeSurface } from "./panel-bridge.js";
import { createPreloadPanelBridgeApi } from "./panel-bridge-api.js";

const bridge = createPreloadPanelBridgeApi(ipcRenderer);
assertPanelBridgeSurface(bridge);
contextBridge.exposeInMainWorld("panel", bridge);
