import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const APP_SCHEME = "app";

export type ProtocolResolveOk = { ok: true; filePath: string };
export type ProtocolResolveErr = {
  ok: false;
  status: number;
  message: string;
};
export type ProtocolResolveResult = ProtocolResolveOk | ProtocolResolveErr;

/**
 * Resolve `relativePath` under `activeBundleRoot`, refusing anything that
 * escapes the root (lexically or via symlink).
 */
export function resolveWithinBundle(
  activeBundleRoot: string,
  relativePath: string,
): ProtocolResolveResult {
  if (!relativePath || relativePath.includes("\0")) {
    return { ok: false, status: 400, message: "Invalid path" };
  }

  if (path.isAbsolute(relativePath)) {
    return { ok: false, status: 400, message: "Invalid path" };
  }

  const normalized = path.posix.normalize(relativePath.replace(/\\/g, "/"));
  if (
    normalized === ".." ||
    normalized.startsWith("../") ||
    path.isAbsolute(normalized)
  ) {
    return {
      ok: false,
      status: 403,
      message: "Path outside active bundle",
    };
  }

  const root = path.resolve(activeBundleRoot);
  const candidate = path.resolve(root, normalized);
  if (!isPathInsideRoot(root, candidate)) {
    return {
      ok: false,
      status: 403,
      message: "Path outside active bundle",
    };
  }

  if (!fs.existsSync(candidate)) {
    return { ok: false, status: 404, message: "Not found" };
  }

  let realFile: string;
  let realRoot: string;
  try {
    realFile = fs.realpathSync(candidate);
    realRoot = fs.realpathSync(root);
  } catch {
    return { ok: false, status: 404, message: "Not found" };
  }

  if (!isPathInsideRoot(realRoot, realFile)) {
    return {
      ok: false,
      status: 403,
      message: "Path outside active bundle",
    };
  }

  const stat = fs.statSync(realFile);
  if (!stat.isFile()) {
    return { ok: false, status: 404, message: "Not found" };
  }

  return { ok: true, filePath: realFile };
}

/**
 * Map an `app://` request URL to a file inside `activeBundleRoot`.
 * Rejects any path that would resolve outside the active bundle directory.
 */
export function resolveAppProtocolPath(
  activeBundleRoot: string,
  requestUrl: string,
): ProtocolResolveResult {
  let url: URL;
  try {
    url = new URL(requestUrl);
  } catch {
    return { ok: false, status: 400, message: "Invalid URL" };
  }

  if (url.protocol !== `${APP_SCHEME}:`) {
    return { ok: false, status: 400, message: "Unsupported scheme" };
  }

  const relative = urlPathToRelative(url);
  if (relative === null) {
    return { ok: false, status: 400, message: "Invalid path" };
  }

  return resolveWithinBundle(activeBundleRoot, relative);
}

export function filePathToResponseUrl(filePath: string): string {
  return pathToFileURL(filePath).toString();
}

function urlPathToRelative(url: URL): string | null {
  // app://bundle/index.html → host "bundle", pathname "/index.html"
  // app:///index.html       → host "", pathname "/index.html"
  let pathname = decodeURIComponent(url.pathname);
  if (pathname.includes("\0")) return null;
  if (pathname.startsWith("/")) pathname = pathname.slice(1);

  if (!pathname || pathname.endsWith("/")) {
    pathname = `${pathname}index.html`;
  }

  if (path.isAbsolute(pathname)) return null;
  return pathname;
}

function isPathInsideRoot(root: string, candidate: string): boolean {
  const rel = path.relative(root, candidate);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}
