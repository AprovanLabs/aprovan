/**
 * Persistent, pre-warmed, non-activating floating panel (tech-plan D4).
 *
 * Created once at launch and kept hidden until the hotkey shows it — summon
 * never constructs a window.
 */

import {
  BrowserWindow,
  type BrowserWindowConstructorOptions,
} from "electron";
import { PANEL_IPC } from "./panel-bridge.js";
import { resolvePanelPreloadPath } from "./paths.js";
import {
  MAIN_WINDOW_PREFERENCES,
  mainWindowWebPreferences,
} from "./window-prefs.js";

/** Fixed panel width; height follows content via resizePanel. */
export const PANEL_WIDTH = 420;

export const PANEL_HEIGHT_BOUNDS = {
  min: 120,
  max: 720,
  /** Initial hidden size before first content-driven resize. */
  initial: 200,
} as const;

const PANEL_MARK = Symbol.for("aprovan.floatingPanel");

export type FloatingPanel = {
  readonly window: BrowserWindow;
  show(hotkey: string): void;
  hide(): void;
  resize(height: number): void;
  destroy(): void;
  isDestroyed(): boolean;
};

/** Clamp content height into configured panel bounds. */
export function clampPanelHeight(height: number): number {
  if (!Number.isFinite(height)) return PANEL_HEIGHT_BOUNDS.initial;
  return Math.min(
    PANEL_HEIGHT_BOUNDS.max,
    Math.max(PANEL_HEIGHT_BOUNDS.min, Math.round(height)),
  );
}

/** BrowserWindow options for the floating panel — exported for tests. */
export function floatingPanelWindowOptions(
  preloadPath: string,
): BrowserWindowConstructorOptions {
  return {
    width: PANEL_WIDTH,
    height: PANEL_HEIGHT_BOUNDS.initial,
    show: false,
    frame: false,
    transparent: false,
    resizable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    // macOS: NSWindowStyleMaskNonactivatingPanel — floats without stealing
    // the underlying app's active state.
    type: "panel",
    webPreferences: {
      ...mainWindowWebPreferences(preloadPath),
      ...MAIN_WINDOW_PREFERENCES,
      preload: preloadPath,
    },
  };
}

export function isFloatingPanelWindow(win: BrowserWindow): boolean {
  return Boolean(
    (win as BrowserWindow & { [PANEL_MARK]?: boolean })[PANEL_MARK],
  );
}

export type CreateFloatingPanelOptions = {
  /** URL loaded into the panel renderer. */
  loadUrl?: string;
  preloadPath?: string;
};

/**
 * Create the floating panel at launch (hidden). Call once; summon only shows.
 */
export function createFloatingPanel(
  options: CreateFloatingPanelOptions = {},
): FloatingPanel {
  const preload = options.preloadPath ?? resolvePanelPreloadPath();
  const loadUrl =
    options.loadUrl ?? "app://bundle/chat/index.html?surface=panel";

  const win = new BrowserWindow(floatingPanelWindowOptions(preload));
  (win as BrowserWindow & { [PANEL_MARK]?: boolean })[PANEL_MARK] = true;

  void win.loadURL(loadUrl);

  const panel: FloatingPanel = {
    window: win,
    show(hotkey: string) {
      if (win.isDestroyed()) return;
      // Panel-type windows do not activate the app when shown (Electron ≥30).
      if (win.isVisible()) {
        win.focus();
      } else {
        win.show();
      }
      win.webContents.send(PANEL_IPC.summon, { hotkey });
    },
    hide() {
      if (win.isDestroyed()) return;
      if (win.isVisible()) win.hide();
    },
    resize(height: number) {
      if (win.isDestroyed()) return;
      const next = clampPanelHeight(height);
      const [x, y] = win.getPosition();
      win.setBounds({ x, y, width: PANEL_WIDTH, height: next }, false);
    },
    destroy() {
      if (!win.isDestroyed()) win.destroy();
    },
    isDestroyed() {
      return win.isDestroyed();
    },
  };

  return panel;
}
