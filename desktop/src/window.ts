import {
  BrowserWindow,
  type BrowserWindowConstructorOptions,
  nativeImage,
} from "electron";
import fs from "node:fs";
import { resolveAppIconPath, resolvePreloadPath } from "./paths.js";
import {
  MAIN_WINDOW_PREFERENCES,
  mainWindowWebPreferences,
} from "./window-prefs.js";

export { MAIN_WINDOW_PREFERENCES, mainWindowWebPreferences };

function windowIcon(): BrowserWindowConstructorOptions["icon"] {
  const iconPath = resolveAppIconPath();
  if (!fs.existsSync(iconPath)) return undefined;
  return nativeImage.createFromPath(iconPath);
}

export function createMainWindow(
  // Shared client ships under /chat/ (same Vite base as the website).
  loadUrl = "app://bundle/chat/index.html",
  overrides: BrowserWindowConstructorOptions = {},
): BrowserWindow {
  const preload = resolvePreloadPath();
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    show: true,
    title: "Aprovan",
    icon: windowIcon(),
    ...overrides,
    webPreferences: {
      ...mainWindowWebPreferences(preload),
      ...overrides.webPreferences,
      // Isolation settings win over any override.
      ...MAIN_WINDOW_PREFERENCES,
      preload,
    },
  });

  win.setTitle("Aprovan");
  void win.loadURL(loadUrl);
  return win;
}
