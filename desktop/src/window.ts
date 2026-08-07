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
  loadUrl = "app://bundle/index.html",
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
