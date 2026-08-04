/**
 * Native vfs — `@utdk/vfs` over an injectable file backend (workspace FS in
 * the gateway; an in-memory map in tests).
 */

import {
  DEFAULT_LIST_LIMIT,
  VfsError,
  validateListArgs,
  validateWriteArgs,
  vfsRelativePath,
  type VfsClient,
  type VfsDeleteArgs,
  type VfsDeleteResult,
  type VfsListArgs,
  type VfsListResult,
  type VfsReadArgs,
  type VfsReadResult,
  type VfsStat,
  type VfsStatArgs,
  type VfsWriteArgs,
  type VfsWriteResult,
} from "@utdk/vfs";

/** Minimal file plane the native vfs client needs. */
export interface NativeVfsBackend {
  read(path: string): Promise<{ content: string; encoding: "utf8" | "base64"; size: number; etag?: string; modifiedAt?: string } | undefined>;
  write(
    path: string,
    content: string,
    encoding: "utf8" | "base64",
    ifMatch?: string,
  ): Promise<VfsStat>;
  delete(path: string): Promise<boolean>;
  list(args: { prefix: string; recursive: boolean; cursor?: string; limit: number }): Promise<VfsListResult>;
  stat(path: string): Promise<VfsStat | undefined>;
}

export interface NativeVfsOptions {
  backend: NativeVfsBackend;
}

export function createNativeVfs(options: NativeVfsOptions): VfsClient {
  const { backend } = options;
  return {
    async read(args: VfsReadArgs): Promise<VfsReadResult> {
      const path = vfsRelativePath(args.path);
      const hit = await backend.read(path);
      if (!hit) throw new VfsError(`Not found: ${path}`, 404);
      return {
        path,
        encoding: hit.encoding,
        content: hit.content,
        size: hit.size,
        ...(hit.etag !== undefined ? { etag: hit.etag } : {}),
      };
    },

    async write(args: VfsWriteArgs): Promise<VfsWriteResult> {
      validateWriteArgs(args);
      const path = vfsRelativePath(args.path);
      const encoding = args.encoding ?? "utf8";
      return backend.write(path, args.content, encoding, args.ifMatch);
    },

    async delete(args: VfsDeleteArgs): Promise<VfsDeleteResult> {
      const path = vfsRelativePath(args.path);
      const deleted = await backend.delete(path);
      return { path, deleted };
    },

    async list(args: VfsListArgs = {}): Promise<VfsListResult> {
      validateListArgs(args);
      const prefix = args.prefix ? vfsRelativePath(args.prefix, "prefix") : "";
      return backend.list({
        prefix,
        recursive: args.recursive === true,
        ...(args.cursor !== undefined ? { cursor: args.cursor } : {}),
        limit: args.limit ?? DEFAULT_LIST_LIMIT,
      });
    },

    async stat(args: VfsStatArgs): Promise<VfsStat> {
      const path = vfsRelativePath(args.path);
      const hit = await backend.stat(path);
      if (!hit) throw new VfsError(`Not found: ${path}`, 404);
      return hit;
    },
  };
}

/** In-memory backend for conformance tests. */
export function createMemoryVfsBackend(): NativeVfsBackend {
  const files = new Map<string, { content: string; encoding: "utf8" | "base64"; etag: string; modifiedAt: string }>();

  const byteLength = (content: string, encoding: "utf8" | "base64"): number => {
    if (encoding === "base64") {
      const unpadded = content.replace(/=+$/u, "").length;
      return Math.floor((unpadded * 3) / 4);
    }
    return new TextEncoder().encode(content).length;
  };

  const fileStat = (path: string): VfsStat | undefined => {
    const hit = files.get(path);
    if (!hit) return undefined;
    return {
      path,
      kind: "file",
      size: byteLength(hit.content, hit.encoding),
      etag: hit.etag,
      modifiedAt: hit.modifiedAt,
    };
  };

  return {
    async read(path) {
      const hit = files.get(path);
      if (!hit) return undefined;
      return {
        content: hit.content,
        encoding: hit.encoding,
        size: byteLength(hit.content, hit.encoding),
        etag: hit.etag,
        modifiedAt: hit.modifiedAt,
      };
    },
    async write(path, content, encoding, ifMatch) {
      const existing = files.get(path);
      if (ifMatch !== undefined) {
        if (ifMatch === "*") {
          if (!existing) throw new VfsError(`ifMatch "*" requires an existing file: ${path}`, 409);
        } else if (!existing || existing.etag !== ifMatch) {
          throw new VfsError(`etag mismatch for ${path}`, 409);
        }
      }
      const etag = `etag-${byteLength(content, encoding)}-${Date.now()}`;
      const modifiedAt = new Date().toISOString();
      files.set(path, { content, encoding, etag, modifiedAt });
      return { path, kind: "file", size: byteLength(content, encoding), etag, modifiedAt };
    },
    async delete(path) {
      return files.delete(path);
    },
    async list({ prefix, recursive, cursor, limit }) {
      const allPaths = [...files.keys()].sort();
      const entries: VfsStat[] = [];
      const dirs = new Set<string>();

      for (const path of allPaths) {
        if (prefix && path !== prefix && !path.startsWith(prefix + "/")) continue;
        if (!recursive && prefix) {
          const rest = path.slice(prefix.length + (prefix ? 1 : 0));
          const slash = rest.indexOf("/");
          if (slash >= 0) {
            const dirPath = prefix ? `${prefix}/${rest.slice(0, slash)}` : rest.slice(0, slash);
            dirs.add(dirPath);
            continue;
          }
        } else if (!recursive && !prefix) {
          const slash = path.indexOf("/");
          if (slash >= 0) {
            dirs.add(path.slice(0, slash));
            continue;
          }
        }
        const stat = fileStat(path);
        if (stat) entries.push(stat);
      }
      for (const dir of [...dirs].sort()) {
        entries.push({ path: dir, kind: "directory" });
      }
      entries.sort((a, b) => a.path.localeCompare(b.path));

      let start = 0;
      if (cursor) {
        const idx = entries.findIndex((e) => e.path === cursor);
        start = idx >= 0 ? idx + 1 : 0;
      }
      const page = entries.slice(start, start + limit);
      const next = start + limit < entries.length ? page[page.length - 1]?.path : undefined;
      return { entries: page, ...(next ? { cursor: next } : {}) };
    },
    async stat(path) {
      const file = fileStat(path);
      if (file) return file;
      // Directory if any child exists.
      for (const candidate of files.keys()) {
        if (candidate.startsWith(path + "/")) return { path, kind: "directory" };
      }
      return undefined;
    },
  };
}
