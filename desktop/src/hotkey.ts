/**
 * User-configurable global hotkey for the floating panel.
 *
 * Registration conflicts are reported at startup (or when the binding
 * changes) rather than leaving a silently dead key.
 */

import fs from "node:fs";
import path from "node:path";
import { globalShortcut } from "electron";

/** Default accelerator — Option/Alt+Space (Electron `Alt+Space`). */
export const DEFAULT_PANEL_HOTKEY = "Alt+Space";

export const HOTKEY_PREFS_FILENAME = "panel-hotkey.json";

export type HotkeyRegistrationResult =
  | { ok: true; accelerator: string }
  | { ok: false; accelerator: string; reason: "conflict" | "invalid" };

export type HotkeyRegistrar = {
  readonly accelerator: string;
  register(): HotkeyRegistrationResult;
  setAccelerator(next: string): HotkeyRegistrationResult;
  unregister(): void;
};

export type HotkeyDeps = {
  register: (accelerator: string, callback: () => void) => boolean;
  unregister: (accelerator: string) => void;
  isRegistered?: (accelerator: string) => boolean;
};

export type HotkeyPrefsStore = {
  load(): string | undefined;
  save(accelerator: string): void;
};

type HotkeyPrefsFile = { accelerator?: string };

/** Resolve persisted hotkey prefs path under Application Support. */
export function hotkeyPrefsPath(userDataPath: string): string {
  return path.join(userDataPath, HOTKEY_PREFS_FILENAME);
}

export function createFileHotkeyPrefsStore(
  userDataPath: string,
): HotkeyPrefsStore {
  const file = hotkeyPrefsPath(userDataPath);
  return {
    load() {
      try {
        const raw = fs.readFileSync(file, "utf8");
        const parsed = JSON.parse(raw) as HotkeyPrefsFile;
        return typeof parsed.accelerator === "string" &&
          parsed.accelerator.trim()
          ? parsed.accelerator.trim()
          : undefined;
      } catch {
        return undefined;
      }
    },
    save(accelerator: string) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(
        file,
        `${JSON.stringify({ accelerator }, null, 2)}\n`,
        "utf8",
      );
    },
  };
}

export function createElectronHotkeyDeps(): HotkeyDeps {
  return {
    register: (accelerator, callback) =>
      globalShortcut.register(accelerator, callback),
    unregister: (accelerator) => {
      globalShortcut.unregister(accelerator);
    },
    isRegistered: (accelerator) => globalShortcut.isRegistered(accelerator),
  };
}

/**
 * Format a human-readable conflict message for startup reporting.
 */
export function formatHotkeyConflictMessage(accelerator: string): string {
  return (
    `The floating panel hotkey "${accelerator}" could not be registered ` +
    `because another application already holds it. Open Aprovan settings to ` +
    `choose a different binding — the panel remains reachable from the app.`
  );
}

export type CreateHotkeyRegistrarOptions = {
  initial?: string;
  prefs?: HotkeyPrefsStore;
  deps?: HotkeyDeps;
  onTrigger: () => void;
  /** Called when registration fails (startup or rebind). */
  onConflict?: (result: Extract<HotkeyRegistrationResult, { ok: false }>) => void;
};

export function createHotkeyRegistrar(
  options: CreateHotkeyRegistrarOptions,
): HotkeyRegistrar {
  const deps = options.deps ?? createElectronHotkeyDeps();
  let accelerator =
    options.initial?.trim() ||
    options.prefs?.load()?.trim() ||
    DEFAULT_PANEL_HOTKEY;

  const tryRegister = (next: string): HotkeyRegistrationResult => {
    const trimmed = next.trim();
    if (!trimmed) {
      return { ok: false, accelerator: next, reason: "invalid" };
    }
    const ok = deps.register(trimmed, options.onTrigger);
    if (!ok) {
      return { ok: false, accelerator: trimmed, reason: "conflict" };
    }
    return { ok: true, accelerator: trimmed };
  };

  const registrar: HotkeyRegistrar = {
    get accelerator() {
      return accelerator;
    },
    register() {
      const result = tryRegister(accelerator);
      if (!result.ok) options.onConflict?.(result);
      return result;
    },
    setAccelerator(next: string) {
      const previous = accelerator;
      if (previous) deps.unregister(previous);
      const result = tryRegister(next);
      if (result.ok) {
        accelerator = result.accelerator;
        options.prefs?.save(accelerator);
      } else {
        // Restore previous binding when the new one fails.
        const restored = tryRegister(previous);
        if (!restored.ok) {
          options.onConflict?.(result);
        } else {
          options.onConflict?.(result);
        }
      }
      return result;
    },
    unregister() {
      if (accelerator) deps.unregister(accelerator);
    },
  };

  return registrar;
}
