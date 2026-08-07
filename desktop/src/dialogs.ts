/**
 * Native directory panel for the desktop shell.
 *
 * The bridge exposes only `pickDirectory("workspace-root")` — this module owns
 * the panel options and the proposed default subdirectory (never `$HOME`).
 */

import os from "node:os";
import path from "node:path";
import { dialog, type BrowserWindow } from "electron";

/** Subpath under the home directory proposed as the workspace VFS root. */
export const WORKSPACE_ROOT_SUBDIR = path.join("Documents", "Aprovan");

export type PickDirectoryPurpose = "workspace-root";

export type ShowOpenDialog = (
  window: BrowserWindow | undefined,
  options: Electron.OpenDialogOptions,
) => Promise<Electron.OpenDialogReturnValue>;

export type PickDirectoryOptions = {
  parent?: BrowserWindow | null;
  /** Override the proposed default; when omitted, uses {@link proposedWorkspaceRootPath}. */
  defaultPath?: string;
  showOpenDialog?: ShowOpenDialog;
};

/**
 * Absolute path proposed as the default workspace root — a subdirectory of
 * the home directory, never the home directory itself.
 */
export function proposedWorkspaceRootPath(homeDir: string = os.homedir()): string {
  const root = path.join(homeDir, WORKSPACE_ROOT_SUBDIR);
  if (path.resolve(root) === path.resolve(homeDir)) {
    throw new Error("proposed workspace root must not be the home directory");
  }
  return root;
}

/**
 * Open the system directory panel for the given purpose.
 * Cancel returns `undefined` so the caller can keep the prior value.
 */
export async function pickDirectory(
  purpose: PickDirectoryPurpose,
  options: PickDirectoryOptions = {},
): Promise<string | undefined> {
  if (purpose !== "workspace-root") {
    return undefined;
  }

  const show =
    options.showOpenDialog ??
    ((window, opts) =>
      window
        ? dialog.showOpenDialog(window, opts)
        : dialog.showOpenDialog(opts));

  const parent = options.parent ?? undefined;
  const result = await show(parent, {
    title: "Choose workspace root",
    buttonLabel: "Choose",
    properties: ["openDirectory", "createDirectory"],
    defaultPath: options.defaultPath ?? proposedWorkspaceRootPath(),
  });

  if (result.canceled || result.filePaths.length === 0) {
    return undefined;
  }
  return result.filePaths[0];
}
