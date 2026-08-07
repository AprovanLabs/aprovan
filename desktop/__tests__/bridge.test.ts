import { describe, expect, it } from "vitest";
import {
  DESKTOP_BRIDGE_METHODS,
  assertDesktopBridgeSurface,
  scaffoldBundleInfo,
  type DesktopBridge,
  type GatewayStatus,
} from "../src/bridge.js";
import { createPreloadBridgeApi } from "../src/bridge-api.js";
import { mainWindowWebPreferences } from "../src/window-prefs.js";

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
    emit(channel: string, ...args: unknown[]) {
      for (const listener of listeners.get(channel) ?? []) {
        listener({}, ...args);
      }
    },
  };
}

describe("DesktopBridge surface", () => {
  it("declares exactly the tech-plan methods", () => {
    expect([...DESKTOP_BRIDGE_METHODS].sort()).toEqual(
      [
        "bundleInfo",
        "gatewayStatus",
        "gatewayUrl",
        "onGatewayStatus",
        "pickDirectory",
      ].sort(),
    );
  });

  it("preload API matches the declared interface and nothing more", () => {
    const ipc = fakeIpc({
      "desktop:gatewayUrl": () => "http://127.0.0.1:1",
      "desktop:gatewayStatus": () => ({ state: "starting" }),
      "desktop:pickDirectory": () => undefined,
      "desktop:bundleInfo": () => scaffoldBundleInfo(),
    });

    const bridge = createPreloadBridgeApi(ipc);
    expect(() => assertDesktopBridgeSurface(bridge)).not.toThrow();

    const keys = Object.keys(bridge).sort();
    expect(keys).toEqual([...DESKTOP_BRIDGE_METHODS].sort());
  });

  it("rejects an oversized bridge surface", () => {
    const ipc = fakeIpc({});
    const bridge = createPreloadBridgeApi(ipc) as DesktopBridge & {
      readFile?: () => Promise<string>;
    };
    bridge.readFile = async () => "nope";
    expect(() => assertDesktopBridgeSurface(bridge)).toThrow(/extra: readFile/);
  });

  it("rejects a bridge missing a required method", () => {
    const partial = {
      gatewayUrl: async () => "http://127.0.0.1:1",
      gatewayStatus: async () => ({ state: "starting" }) as GatewayStatus,
      onGatewayStatus: () => () => {},
      pickDirectory: async () => undefined,
    };
    expect(() => assertDesktopBridgeSurface(partial)).toThrow(/missing: bundleInfo/);
  });

  it("wires status subscription and unsubscribe", async () => {
    const ipc = fakeIpc({
      "desktop:gatewayStatus": () => ({ state: "starting" }),
    });
    const bridge = createPreloadBridgeApi(ipc);
    const seen: GatewayStatus[] = [];
    const stop = bridge.onGatewayStatus((s) => seen.push(s));

    ipc.emit("desktop:gatewayStatus", {
      state: "ready",
      url: "http://127.0.0.1:52431",
    });
    expect(seen).toEqual([
      { state: "ready", url: "http://127.0.0.1:52431" },
    ]);

    stop();
    ipc.emit("desktop:gatewayStatus", { state: "failed", error: "boom" });
    expect(seen).toHaveLength(1);
  });
});

describe("main window isolation", () => {
  it("enables contextIsolation and disables nodeIntegration", () => {
    const prefs = mainWindowWebPreferences("/tmp/preload.cjs");
    expect(prefs.contextIsolation).toBe(true);
    expect(prefs.nodeIntegration).toBe(false);
    expect(prefs.sandbox).toBe(true);
  });
});
