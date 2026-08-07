import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  pickDirectory,
  proposedWorkspaceRootPath,
  WORKSPACE_ROOT_SUBDIR,
} from "../src/dialogs.js";

describe("proposedWorkspaceRootPath", () => {
  it("proposes a subdirectory of home, never home itself", () => {
    const home = "/Users/example";
    const proposed = proposedWorkspaceRootPath(home);
    expect(proposed).toBe(path.join(home, WORKSPACE_ROOT_SUBDIR));
    expect(proposed).not.toBe(home);
    expect(proposed.startsWith(home + path.sep)).toBe(true);
  });
});

describe("pickDirectory", () => {
  it("returns the selected path from the native panel", async () => {
    const showOpenDialog = vi.fn(async () => ({
      canceled: false,
      filePaths: ["/Users/example/Documents/Aprovan/MyProject"],
    }));

    const selected = await pickDirectory("workspace-root", {
      showOpenDialog,
      defaultPath: "/Users/example/Documents/Aprovan",
    });

    expect(selected).toBe("/Users/example/Documents/Aprovan/MyProject");
    expect(showOpenDialog).toHaveBeenCalledOnce();
    const [, opts] = showOpenDialog.mock.calls[0]!;
    expect(opts.properties).toEqual(
      expect.arrayContaining(["openDirectory", "createDirectory"]),
    );
    expect(opts.defaultPath).toBe("/Users/example/Documents/Aprovan");
  });

  it("returns undefined when the panel is cancelled", async () => {
    const showOpenDialog = vi.fn(async () => ({
      canceled: true,
      filePaths: [] as string[],
    }));

    const selected = await pickDirectory("workspace-root", { showOpenDialog });
    expect(selected).toBeUndefined();
  });

  it("rejects unknown purposes without opening the panel", async () => {
    const showOpenDialog = vi.fn(async () => ({
      canceled: false,
      filePaths: ["/tmp"],
    }));

    const selected = await pickDirectory(
      "not-a-purpose" as "workspace-root",
      { showOpenDialog },
    );
    expect(selected).toBeUndefined();
    expect(showOpenDialog).not.toHaveBeenCalled();
  });
});
