/**
 * Local-directory VFS backend — a `NativeVfsBackend` over a real directory.
 *
 * Every path routes through {@link containPath}; the configured root is the
 * only boundary. Etags are content hashes; `modifiedAt` is filesystem mtime.
 */

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import {
  mkdir,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { VfsError, type VfsListResult, type VfsStat } from "@utdk/vfs";
import { containPath } from "./contain.js";
import type { NativeVfsBackend } from "./vfs.js";

export interface LocalDirectoryOptions {
  /** The containment boundary. Nothing outside it is reachable. */
  root: string;
}

const toVfsPath = (abs: string, root: string): string =>
  relative(root, abs).split(sep).join("/");

const etagOf = (buffer: Buffer): string => createHash("sha256").update(buffer).digest("hex");

const decode = (content: string, encoding: "utf8" | "base64"): Buffer =>
  encoding === "base64" ? Buffer.from(content, "base64") : Buffer.from(content, "utf8");

function detectEncoding(buffer: Buffer): { content: string; encoding: "utf8" | "base64" } {
  if (buffer.includes(0)) {
    return { content: buffer.toString("base64"), encoding: "base64" };
  }
  const asUtf8 = buffer.toString("utf8");
  if (Buffer.from(asUtf8, "utf8").equals(buffer)) {
    return { content: asUtf8, encoding: "utf8" };
  }
  return { content: buffer.toString("base64"), encoding: "base64" };
}

async function contained(root: string, relativePath: string): Promise<string> {
  try {
    return await containPath(root, relativePath);
  } catch (err) {
    throw new VfsError(err instanceof Error ? err.message : String(err), 400);
  }
}

async function fileStatAt(vfsPath: string, abs: string): Promise<VfsStat | undefined> {
  if (!existsSync(abs)) return undefined;
  const info = await stat(abs);
  if (!info.isFile()) return undefined;
  const buffer = await readFile(abs);
  return {
    path: vfsPath,
    kind: "file",
    size: buffer.length,
    etag: etagOf(buffer),
    modifiedAt: info.mtime.toISOString(),
  };
}

/**
 * Walk `start` under `root`, collecting every regular file. Symlinks are
 * skipped — same rule as the sandbox executor listing.
 */
async function collectFiles(
  root: string,
  start: string,
): Promise<Array<{ path: string; size: number; etag: string; modifiedAt: string }>> {
  if (!existsSync(start)) return [];
  const startInfo = await stat(start);
  if (startInfo.isFile()) {
    const buffer = await readFile(start);
    return [
      {
        path: toVfsPath(start, root),
        size: buffer.length,
        etag: etagOf(buffer),
        modifiedAt: startInfo.mtime.toISOString(),
      },
    ];
  }
  if (!startInfo.isDirectory()) return [];

  const entries: Array<{ path: string; size: number; etag: string; modifiedAt: string }> = [];

  const walk = async (dir: string): Promise<void> => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      if (!entry.isFile()) continue;
      const buffer = await readFile(full);
      const info = await stat(full);
      entries.push({
        path: toVfsPath(full, root),
        size: buffer.length,
        etag: etagOf(buffer),
        modifiedAt: info.mtime.toISOString(),
      });
    }
  };

  await walk(start);
  return entries.sort((a, b) => a.path.localeCompare(b.path));
}

/** Collect immediate child directory names under `start` (non-recursive). */
async function collectImmediateDirs(root: string, start: string): Promise<string[]> {
  if (!existsSync(start)) return [];
  const info = await stat(start);
  if (!info.isDirectory()) return [];
  const dirs: string[] = [];
  for (const entry of await readdir(start, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    if (!entry.isDirectory()) continue;
    dirs.push(toVfsPath(join(start, entry.name), root));
  }
  return dirs;
}

export function createLocalDirectoryBackend(options: LocalDirectoryOptions): NativeVfsBackend {
  const root = resolve(options.root);

  return {
    async read(path) {
      const abs = await contained(root, path);
      if (!existsSync(abs)) return undefined;
      const info = await stat(abs);
      if (!info.isFile()) return undefined;
      const buffer = await readFile(abs);
      const { content, encoding } = detectEncoding(buffer);
      return {
        content,
        encoding,
        size: buffer.length,
        etag: etagOf(buffer),
        modifiedAt: info.mtime.toISOString(),
      };
    },

    async write(path, content, encoding, ifMatch) {
      const abs = await contained(root, path);
      const buffer = decode(content, encoding);

      if (ifMatch !== undefined) {
        const existing = existsSync(abs) ? await fileStatAt(path, abs) : undefined;
        if (ifMatch === "*") {
          if (!existing) throw new VfsError(`ifMatch "*" requires an existing file: ${path}`, 409);
        } else if (!existing || existing.etag !== ifMatch) {
          throw new VfsError(`etag mismatch for ${path}`, 409);
        }
      }

      await mkdir(dirname(abs), { recursive: true });
      // Re-contain after mkdir so a symlink parent created between checks fails closed.
      const target = await contained(root, path);
      await writeFile(target, buffer);
      const info = await stat(target);
      return {
        path,
        kind: "file",
        size: buffer.length,
        etag: etagOf(buffer),
        modifiedAt: info.mtime.toISOString(),
      };
    },

    async delete(path) {
      const abs = await contained(root, path);
      if (!existsSync(abs)) return false;
      const info = await stat(abs);
      if (!info.isFile()) return false;
      await rm(abs);
      return true;
    },

    async list({ prefix, recursive, cursor, limit }): Promise<VfsListResult> {
      const start = prefix ? await contained(root, prefix) : root;
      const files = await collectFiles(root, start);
      const entries: VfsStat[] = [];
      const dirs = new Set<string>();

      for (const file of files) {
        if (prefix && file.path !== prefix && !file.path.startsWith(prefix + "/")) continue;
        if (!recursive) {
          const rest = prefix ? file.path.slice(prefix.length + (prefix ? 1 : 0)) : file.path;
          const slash = rest.indexOf("/");
          if (slash >= 0) {
            const dirPath = prefix ? `${prefix}/${rest.slice(0, slash)}` : rest.slice(0, slash);
            dirs.add(dirPath);
            continue;
          }
        }
        entries.push({
          path: file.path,
          kind: "file",
          size: file.size,
          etag: file.etag,
          modifiedAt: file.modifiedAt,
        });
      }

      // Empty directories only surface in non-recursive listings (real FS dirs
      // with no files underneath would otherwise be invisible).
      if (!recursive) {
        for (const dir of await collectImmediateDirs(root, start)) {
          dirs.add(dir);
        }
      }

      for (const dir of [...dirs].sort()) {
        if (!entries.some((e) => e.path === dir)) {
          entries.push({ path: dir, kind: "directory" });
        }
      }
      entries.sort((a, b) => a.path.localeCompare(b.path));

      let startIdx = 0;
      if (cursor) {
        const idx = entries.findIndex((e) => e.path === cursor);
        startIdx = idx >= 0 ? idx + 1 : 0;
      }
      const page = entries.slice(startIdx, startIdx + limit);
      const next = startIdx + limit < entries.length ? page[page.length - 1]?.path : undefined;
      return { entries: page, ...(next ? { cursor: next } : {}) };
    },

    async stat(path) {
      const abs = await contained(root, path);
      if (!existsSync(abs)) return undefined;
      const info = await stat(abs);
      if (info.isFile()) {
        const buffer = await readFile(abs);
        return {
          path,
          kind: "file",
          size: buffer.length,
          etag: etagOf(buffer),
          modifiedAt: info.mtime.toISOString(),
        };
      }
      if (info.isDirectory()) {
        return { path, kind: "directory", modifiedAt: info.mtime.toISOString() };
      }
      return undefined;
    },
  };
}
