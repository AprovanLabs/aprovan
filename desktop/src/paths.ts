import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { app } from "electron";
import { resolveAppSupportPaths } from "./app-support.js";

const here = path.dirname(fileURLToPath(import.meta.url));

/**
 * Directory that backs the `app://` origin for this process.
 *
 * Unpackaged: the seeded renderer under resources/bundle (stream 2 copies
 * client/web into resources/bundle/chat/). Packaged: Resources/bundle.
 * BundleManager (stream 5) will prefer Application Support `bundles/active`
 * when an OTA bundle has been activated.
 */
export function resolveActiveBundleDir(): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "bundle");
  }
  return path.resolve(here, "..", "resources", "bundle");
}

/**
 * Prefer Application Support `bundles/active` when the symlink resolves to a
 * real directory; otherwise fall back to the shipped seed bundle.
 */
export function resolveActiveBundleDirWithSupport(
  userDataPath: string = app.getPath("userData"),
): string {
  const { bundlesDir } = resolveAppSupportPaths(userDataPath);
  const activeLink = path.join(bundlesDir, "active");
  try {
    const target = path.resolve(bundlesDir, fs.readlinkSync(activeLink));
    if (fs.statSync(target).isDirectory()) return target;
  } catch {
    // no active symlink yet
  }
  return resolveActiveBundleDir();
}

export function resolvePreloadPath(): string {
  return path.join(here, "preload.cjs");
}

/** Vendored gateway deploy directory (stream 2). */
export function resolveGatewayVendorDir(): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "gateway");
  }
  return path.resolve(here, "..", "build", "gateway");
}

/** Stock Node binary vendored alongside the gateway (stream 2 / D2). */
export function resolveBundledNodeBinary(): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "runtime", "node", "bin", "node");
  }
  return path.resolve(here, "..", "build", "runtime", "node", "bin", "node");
}

/**
 * Native macOS helper binary (macos-native-providers stream 1 / 5).
 * Unpackaged: SwiftPM debug build under native/macos-helper/.build.
 * Packaged: Resources/macos-helper/macos-helper (extraResources + Hardened Runtime).
 */
export function resolveHelperBinary(): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "macos-helper", "macos-helper");
  }
  return path.resolve(
    here,
    "..",
    "..",
    "native",
    "macos-helper",
    ".build",
    "debug",
    "macos-helper",
  );
}

/**
 * Seed directory for the helper's `/esm/*` cache (stream 2).
 * Contains `manifest.json` plus prefetched package bodies keyed by specifier.
 */
export function resolveEsmSeedDir(): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "esm-seed");
  }
  return path.resolve(here, "..", "resources", "esm-seed");
}
