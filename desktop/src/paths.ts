import path from "node:path";
import { fileURLToPath } from "node:url";
import { app } from "electron";

const here = path.dirname(fileURLToPath(import.meta.url));

/**
 * Directory that backs the `app://` origin for this process.
 * Stream 1 ships a static scaffold bundle; BundleManager (stream 5) will
 * swap this to the Application Support `bundles/active` symlink.
 */
export function resolveActiveBundleDir(): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "bundle");
  }
  return path.resolve(here, "..", "resources", "bundle");
}

export function resolvePreloadPath(): string {
  return path.join(here, "preload.cjs");
}
