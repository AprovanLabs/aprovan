import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  createFileHotkeyPrefsStore,
  createHotkeyRegistrar,
  DEFAULT_PANEL_HOTKEY,
  formatHotkeyConflictMessage,
  hotkeyPrefsPath,
  type HotkeyDeps,
} from "../src/hotkey.js";
import {
  assertPanelBridgeSurface,
  PANEL_BRIDGE_METHODS,
  type PanelBridge,
} from "../src/panel-bridge.js";
import { createPreloadPanelBridgeApi } from "../src/panel-bridge-api.js";
import {
  clampPanelHeight,
  floatingPanelWindowOptions,
  PANEL_HEIGHT_BOUNDS,
  PANEL_WIDTH,
} from "../src/panel.js";
import { MAIN_WINDOW_PREFERENCES } from "../src/window-prefs.js";

function fakeIpc(handlers: Record<string, (...args: unknown[]) => unknown>) {
  const listeners = new Map<
    string,
    Set<(event: unknown, ...args: unknown[]) => void>
  >();
  return {
    invoke: async (channel: string, ...args: unknown[]) => {
      const handler = handlers[channel];
      if (!handler) throw new Error(`no handler for ${channel}`);
      return handler(...args);
    },
    on: (
      channel: string,
      listener: (event: unknown, ...args: unknown[]) => void,
    ) => {
      let set = listeners.get(channel);
      if (!set) {
        set = new Set();
        listeners.set(channel, set);
      }
      set.add(listener);
    },
    removeListener: (
      channel: string,
      listener: (event: unknown, ...args: unknown[]) => void,
    ) => {
      listeners.get(channel)?.delete(listener);
    },
    send: () => {},
    emit(channel: string, ...args: unknown[]) {
      for (const listener of listeners.get(channel) ?? []) {
        listener({}, ...args);
      }
    },
  };
}

function memoryHotkeyDeps(opts?: {
  refuse?: Set<string>;
}): HotkeyDeps & { registered: Set<string>; triggers: Map<string, () => void> } {
  const registered = new Set<string>();
  const triggers = new Map<string, () => void>();
  const refuse = opts?.refuse ?? new Set<string>();
  return {
    registered,
    triggers,
    register: (accelerator, callback) => {
      if (refuse.has(accelerator) || registered.has(accelerator)) return false;
      registered.add(accelerator);
      triggers.set(accelerator, callback);
      return true;
    },
    unregister: (accelerator) => {
      registered.delete(accelerator);
      triggers.delete(accelerator);
    },
    isRegistered: (accelerator) => registered.has(accelerator),
  };
}

describe("floating panel window (D4)", () => {
  it("is created hidden with non-activating panel type", () => {
    const opts = floatingPanelWindowOptions("/tmp/preload-panel.cjs");
    expect(opts.show).toBe(false);
    expect(opts.type).toBe("panel");
    expect(opts.alwaysOnTop).toBe(true);
    expect(opts.skipTaskbar).toBe(true);
    expect(opts.width).toBe(PANEL_WIDTH);
    expect(opts.height).toBe(PANEL_HEIGHT_BOUNDS.initial);
  });

  it("keeps the same isolation prefs as the main window", () => {
    const opts = floatingPanelWindowOptions("/tmp/preload-panel.cjs");
    expect(opts.webPreferences?.contextIsolation).toBe(
      MAIN_WINDOW_PREFERENCES.contextIsolation,
    );
    expect(opts.webPreferences?.nodeIntegration).toBe(
      MAIN_WINDOW_PREFERENCES.nodeIntegration,
    );
    expect(opts.webPreferences?.sandbox).toBe(MAIN_WINDOW_PREFERENCES.sandbox);
  });
});

describe("panel content sizing", () => {
  it("clamps height within configured bounds", () => {
    expect(clampPanelHeight(50)).toBe(PANEL_HEIGHT_BOUNDS.min);
    expect(clampPanelHeight(900)).toBe(PANEL_HEIGHT_BOUNDS.max);
    expect(clampPanelHeight(300)).toBe(300);
    expect(clampPanelHeight(Number.NaN)).toBe(PANEL_HEIGHT_BOUNDS.initial);
  });

  it("keeps width fixed while height follows content", () => {
    expect(PANEL_WIDTH).toBe(420);
    expect(clampPanelHeight(400)).toBe(400);
  });
});

describe("PanelBridge surface", () => {
  it("declares exactly the tech-plan methods", () => {
    expect([...PANEL_BRIDGE_METHODS].sort()).toEqual(
      ["hidePanel", "onSummon", "resizePanel"].sort(),
    );
  });

  it("preload API matches the declared interface and nothing more", () => {
    const ipc = fakeIpc({
      "panel:hide": () => undefined,
      "panel:resize": () => undefined,
    });
    const bridge = createPreloadPanelBridgeApi(ipc);
    expect(() => assertPanelBridgeSurface(bridge)).not.toThrow();
    expect(Object.keys(bridge).sort()).toEqual(
      [...PANEL_BRIDGE_METHODS].sort(),
    );
  });

  it("rejects an oversized bridge surface", () => {
    const ipc = fakeIpc({});
    const bridge = createPreloadPanelBridgeApi(ipc) as PanelBridge & {
      openSession?: () => void;
    };
    bridge.openSession = () => {};
    expect(() => assertPanelBridgeSurface(bridge)).toThrow(/extra: openSession/);
  });

  it("wires onSummon and unsubscribe", () => {
    const ipc = fakeIpc({});
    const bridge = createPreloadPanelBridgeApi(ipc);
    const seen: Array<{ hotkey: string }> = [];
    const stop = bridge.onSummon((ctx) => seen.push(ctx));

    ipc.emit("panel:summon", { hotkey: "Alt+Space" });
    expect(seen).toEqual([{ hotkey: "Alt+Space" }]);

    stop();
    ipc.emit("panel:summon", { hotkey: "Alt+Space" });
    expect(seen).toHaveLength(1);
  });

  it("forwards hide and resize over IPC", async () => {
    const calls: Array<{ channel: string; args: unknown[] }> = [];
    const ipc = fakeIpc({
      "panel:hide": (...args) => {
        calls.push({ channel: "panel:hide", args });
      },
      "panel:resize": (...args) => {
        calls.push({ channel: "panel:resize", args });
      },
    });
    const bridge = createPreloadPanelBridgeApi(ipc);
    bridge.hidePanel();
    bridge.resizePanel(320);
    await Promise.resolve();
    expect(calls).toEqual([
      { channel: "panel:hide", args: [] },
      { channel: "panel:resize", args: [320] },
    ]);
  });
});

describe("global hotkey", () => {
  it("registers the default accelerator at startup", () => {
    const deps = memoryHotkeyDeps();
    const registrar = createHotkeyRegistrar({
      deps,
      onTrigger: () => {},
    });
    const result = registrar.register();
    expect(result).toEqual({ ok: true, accelerator: DEFAULT_PANEL_HOTKEY });
    expect(deps.registered.has(DEFAULT_PANEL_HOTKEY)).toBe(true);
  });

  it("reports a registration conflict instead of a dead key", () => {
    const deps = memoryHotkeyDeps({
      refuse: new Set([DEFAULT_PANEL_HOTKEY]),
    });
    const conflicts: string[] = [];
    const registrar = createHotkeyRegistrar({
      deps,
      onTrigger: () => {},
      onConflict: (r) => conflicts.push(r.accelerator),
    });
    const result = registrar.register();
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("conflict");
    expect(conflicts).toEqual([DEFAULT_PANEL_HOTKEY]);
    expect(formatHotkeyConflictMessage(DEFAULT_PANEL_HOTKEY)).toMatch(
      /could not be registered/,
    );
  });

  it("releases the previous binding when the hotkey changes", () => {
    const deps = memoryHotkeyDeps();
    const registrar = createHotkeyRegistrar({
      deps,
      onTrigger: () => {},
    });
    expect(registrar.register().ok).toBe(true);

    const changed = registrar.setAccelerator("CommandOrControl+Shift+Space");
    expect(changed).toEqual({
      ok: true,
      accelerator: "CommandOrControl+Shift+Space",
    });
    expect(deps.registered.has(DEFAULT_PANEL_HOTKEY)).toBe(false);
    expect(deps.registered.has("CommandOrControl+Shift+Space")).toBe(true);
  });

  it("restores the previous binding when the new hotkey conflicts", () => {
    const deps = memoryHotkeyDeps({
      refuse: new Set(["Control+Space"]),
    });
    const registrar = createHotkeyRegistrar({
      deps,
      onTrigger: () => {},
    });
    expect(registrar.register().ok).toBe(true);

    const result = registrar.setAccelerator("Control+Space");
    expect(result.ok).toBe(false);
    expect(deps.registered.has(DEFAULT_PANEL_HOTKEY)).toBe(true);
    expect(deps.registered.has("Control+Space")).toBe(false);
    expect(registrar.accelerator).toBe(DEFAULT_PANEL_HOTKEY);
  });

  it("persists and reloads a configured hotkey", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aprovan-hotkey-"));
    try {
      const prefs = createFileHotkeyPrefsStore(dir);
      prefs.save("CommandOrControl+Shift+A");
      expect(prefs.load()).toBe("CommandOrControl+Shift+A");
      expect(fs.existsSync(hotkeyPrefsPath(dir))).toBe(true);

      const deps = memoryHotkeyDeps();
      const registrar = createHotkeyRegistrar({
        prefs,
        deps,
        onTrigger: () => {},
      });
      expect(registrar.register()).toEqual({
        ok: true,
        accelerator: "CommandOrControl+Shift+A",
      });
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
