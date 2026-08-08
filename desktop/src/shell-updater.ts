/**
 * Shell auto-updater (tech-plan D6).
 *
 * Uses electron-updater against the signed shell release feed configured in
 * `electron-builder.yml` (`publish.url`). This channel is independent of
 * BundleManager's OTA renderer manifests — Chromium/engine patches ship here.
 */
import { dialog } from "electron";
// electron-updater is CJS — named ESM imports fail at runtime under Node/Electron.
import electronUpdater from "electron-updater";
import type { AppUpdater } from "electron-updater";

/** Default human-facing download page (minShell messaging / manual fallback). */
export const DEFAULT_SHELL_UPDATE_PATH = "https://aprovan.com/download";

/**
 * Override the generic feed at runtime (tests / staging). When unset,
 * electron-updater uses the `publish` block baked into the packaged app.
 */
export const SHELL_UPDATE_FEED_ENV = "DESKTOP_SHELL_UPDATE_FEED_URL";

export type ShellUpdaterDeps = {
  updater?: AppUpdater;
  isPackaged?: boolean;
  /** When false, skip network checks (dev / tests). Default: packaged only. */
  enabled?: boolean;
  feedUrl?: string;
  showPrompt?: (version: string) => Promise<boolean>;
  log?: (message: string, err?: unknown) => void;
};

function defaultPrompt(version: string): Promise<boolean> {
  return dialog
    .showMessageBox({
      type: "info",
      buttons: ["Restart and Update", "Later"],
      defaultId: 0,
      cancelId: 1,
      title: "Update Available",
      message: `Aprovan ${version} is ready to install.`,
      detail:
        "Shell updates deliver browser-engine security fixes and cannot ship through renderer bundles.",
    })
    .then((result) => result.response === 0);
}

/**
 * Start background shell update checks. No-ops when unpackaged unless
 * `enabled: true` is passed explicitly.
 */
export function startShellUpdater(deps: ShellUpdaterDeps = {}): AppUpdater | null {
  const isPackaged = deps.isPackaged ?? false;
  const enabled = deps.enabled ?? isPackaged;
  if (!enabled) return null;

  // Access autoUpdater lazily — constructing it at import time requires Electron.
  const updater = deps.updater ?? electronUpdater.autoUpdater;
  const log =
    deps.log ??
    ((message: string, err?: unknown) => {
      if (err !== undefined) console.error(`[shell-updater] ${message}`, err);
      else console.info(`[shell-updater] ${message}`);
    });
  const showPrompt = deps.showPrompt ?? defaultPrompt;

  updater.autoDownload = true;
  updater.autoInstallOnAppQuit = true;

  const feedUrl = deps.feedUrl ?? process.env[SHELL_UPDATE_FEED_ENV];
  if (feedUrl) {
    updater.setFeedURL({
      provider: "generic",
      url: feedUrl,
    });
  }

  updater.on("error", (err) => {
    log("update check failed", err);
  });

  updater.on("update-available", (info) => {
    log(`update available: ${info.version}`);
  });

  updater.on("update-downloaded", (info) => {
    void showPrompt(info.version).then((confirmed) => {
      if (confirmed) updater.quitAndInstall();
    });
  });

  void updater.checkForUpdates().catch((err: unknown) => {
    log("checkForUpdates rejected", err);
  });

  return updater;
}
