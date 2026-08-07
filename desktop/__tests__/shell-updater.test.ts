import { afterEach, describe, expect, it, vi } from "vitest";
import {
  SHELL_UPDATE_FEED_ENV,
  startShellUpdater,
} from "../src/shell-updater.js";

type Listener = (...args: unknown[]) => void;

function createMockUpdater() {
  const listeners = new Map<string, Listener[]>();
  const updater = {
    autoDownload: false,
    autoInstallOnAppQuit: false,
    setFeedURL: vi.fn(),
    checkForUpdates: vi.fn().mockResolvedValue(null),
    quitAndInstall: vi.fn(),
    on(event: string, cb: Listener) {
      const list = listeners.get(event) ?? [];
      list.push(cb);
      listeners.set(event, list);
      return updater;
    },
    emit(event: string, ...args: unknown[]) {
      for (const cb of listeners.get(event) ?? []) cb(...args);
    },
  };
  return updater;
}

describe("startShellUpdater", () => {
  afterEach(() => {
    delete process.env[SHELL_UPDATE_FEED_ENV];
  });

  it("no-ops when unpackaged (dev)", () => {
    const updater = createMockUpdater();
    const result = startShellUpdater({
      updater: updater as never,
      isPackaged: false,
    });
    expect(result).toBeNull();
    expect(updater.checkForUpdates).not.toHaveBeenCalled();
  });

  it("checks the signed feed when packaged", async () => {
    const updater = createMockUpdater();
    const result = startShellUpdater({
      updater: updater as never,
      isPackaged: true,
      feedUrl: "https://releases.example.test/desktop",
      showPrompt: async () => false,
      log: () => {},
    });
    expect(result).toBe(updater);
    expect(updater.setFeedURL).toHaveBeenCalledWith({
      provider: "generic",
      url: "https://releases.example.test/desktop",
    });
    expect(updater.autoDownload).toBe(true);
    expect(updater.checkForUpdates).toHaveBeenCalled();
  });

  it("applies a downloaded update only after user confirmation", async () => {
    const updater = createMockUpdater();
    const showPrompt = vi.fn().mockResolvedValue(true);
    startShellUpdater({
      updater: updater as never,
      isPackaged: true,
      showPrompt,
      log: () => {},
    });
    updater.emit("update-downloaded", { version: "1.2.3" });
    await vi.waitFor(() => {
      expect(showPrompt).toHaveBeenCalledWith("1.2.3");
      expect(updater.quitAndInstall).toHaveBeenCalled();
    });
  });

  it("does not install when the user declines", async () => {
    const updater = createMockUpdater();
    startShellUpdater({
      updater: updater as never,
      isPackaged: true,
      showPrompt: async () => false,
      log: () => {},
    });
    updater.emit("update-downloaded", { version: "9.9.9" });
    await new Promise((r) => setTimeout(r, 10));
    expect(updater.quitAndInstall).not.toHaveBeenCalled();
  });
});
