import {
  BrowserWindow,
  type BrowserWindowConstructorOptions,
} from "electron";
import { resolvePreloadPath } from "./paths.js";
import {
  MAIN_WINDOW_PREFERENCES,
  mainWindowWebPreferences,
} from "./window-prefs.js";

export { MAIN_WINDOW_PREFERENCES, mainWindowWebPreferences };

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
    ...overrides,
    webPreferences: {
      ...mainWindowWebPreferences(preload),
      ...overrides.webPreferences,
      // Isolation settings win over any override.
      ...MAIN_WINDOW_PREFERENCES,
      preload,
    },
  });

  void win.loadURL(loadUrl);
  return win;
}
