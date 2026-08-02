/**
 * @utdk/vfs — the minimal file-plane driver contract for UTDK storage
 * providers.
 *
 * Five operations — read/write/delete/list/stat — over `/`-separated
 * relative path strings. This is a *driver* contract only (Decision 6):
 * sessions, overlays, mounts, version history, watch/subscribe, ACLs,
 * recursive delete, and copy/move are product semantics built on top of
 * whatever implements this, and deliberately absent from the surface.
 *
 * Semantics that hold across every implementation (S3-compatible object
 * store, local FS driver, WebDAV):
 *
 *   - paths are relative, no leading `/`, no `.`/`..` segments (400);
 *   - binary content travels base64; text travels utf8;
 *   - writes are upserts creating any needed parent hierarchy — parent
 *     "directories" are implicit;
 *   - `ifMatch` gives etag-conditional writes: a mismatch is 409, `"*"`
 *     means "must exist", and a backend without version tokens rejects
 *     `ifMatch` with 501;
 *   - `read`/`stat` on a missing path are 404; `delete` is idempotent;
 *   - `list` is lexicographic by path; non-recursive listing is a delimiter
 *     listing — immediate children, subtrees collapsed to kind "directory".
 */

/** Per-file size cap — aligned with @utdk/sandbox. */
export const MAX_FILE_BYTES = 8_000_000;

export const DEFAULT_LIST_LIMIT = 1_000;

/**
 * Error with an HTTP-ish status: 404 read/stat on a missing path; 409 on an
 * ifMatch mismatch; 501 for ifMatch on a versionless backend; 400 bad args.
 */
export class VfsError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "VfsError";
    this.status = status;
  }
}

export interface VfsStat {
  path: string;
  kind: "file" | "directory";
  /** Files only. */
  size?: number;
  /** Opaque version token, files only. */
  etag?: string;
  /** ISO-8601, when the backend has it. */
  modifiedAt?: string;
}

export interface VfsReadArgs {
  path: string;
}

export interface VfsReadResult {
  path: string;
  encoding: "utf8" | "base64";
  /** Per encoding; binary content arrives base64. */
  content: string;
  size: number;
  etag?: string;
}

export interface VfsWriteArgs {
  path: string;
  content: string;
  /** Default utf8. */
  encoding?: "utf8" | "base64";
  /**
   * Etag-conditional write: mismatch ⇒ 409; `"*"` ⇒ must exist; absent ⇒
   * upsert. Backends without version tokens reject ifMatch with 501.
   */
  ifMatch?: string;
}

/** Kind "file". Parent "directories" are implicit — write creates the hierarchy. */
export type VfsWriteResult = VfsStat;

export interface VfsDeleteArgs {
  path: string;
}

/** Idempotent; files only (no recursive directory delete in v1). */
export interface VfsDeleteResult {
  path: string;
  deleted: boolean;
}

export interface VfsListArgs {
  /** "" ⇒ root. */
  prefix?: string;
  /**
   * Default false ⇒ delimiter listing: immediate children, subtrees
   * collapsed to kind "directory".
   */
  recursive?: boolean;
  /** Opaque continuation token from a previous page. */
  cursor?: string;
  limit?: number;
}

export interface VfsListResult {
  /** Lexicographic by path. */
  entries: VfsStat[];
  /** Opaque; absent ⇒ end of listing. */
  cursor?: string;
}

/** Result: VfsStat; 404 if absent. */
export interface VfsStatArgs {
  path: string;
}

export interface VfsClient {
  read(args: VfsReadArgs): Promise<VfsReadResult>;
  write(args: VfsWriteArgs): Promise<VfsWriteResult>;
  delete(args: VfsDeleteArgs): Promise<VfsDeleteResult>;
  list(args?: VfsListArgs): Promise<VfsListResult>;
  stat(args: VfsStatArgs): Promise<VfsStat>;
}

/** Options every vfs provider client factory accepts. */
export interface VfsClientOptions {
  /** Injected headers; the secret rides `Authorization: Bearer …`. */
  headers?: Record<string, string>;
  baseUrl?: string;
  /** Injection point for tests. */
  fetchImpl?: typeof fetch;
}

/**
 * Pull the provider secret out of the injected headers (the UTDK executor
 * translates a `bearer_token` credential into `Authorization: Bearer …`).
 */
export function secretFromHeaders(
  headers: Record<string, string> | undefined,
  provider: string,
  secretName: string,
): string {
  const raw = headers?.["Authorization"] ?? headers?.["authorization"] ?? "";
  const match = /^Bearer\s+(.+)$/iu.exec(raw);
  if (!match?.[1]) {
    throw new VfsError(
      `${provider} needs a bearer_token credential holding the ${secretName}. Add one for provider "${provider}".`,
      400,
    );
  }
  return match[1];
}

/**
 * Reject traversal, absolute paths, and empty segments; normalize to `a/b`.
 * Same semantics as `sandboxRelativePath` in @utdk/sandbox.
 */
export function vfsRelativePath(raw: unknown, label = "path"): string {
  if (typeof raw !== "string" || !raw.trim()) {
    throw new VfsError(`${label} must be a non-empty relative path`, 400);
  }
  const path = raw.replace(/\\/gu, "/").replace(/^\/+|\/+$/gu, "");
  if (!path) throw new VfsError(`${label} must be a non-empty relative path`, 400);
  const segments = path.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new VfsError(`${label} must not contain "." or ".." segments: ${raw}`, 400);
  }
  return segments.join("/");
}

const byteLength = (content: string, encoding: "utf8" | "base64"): number => {
  if (encoding === "base64") {
    // Decoded size of well-formed base64: 3/4 of the unpadded length.
    const unpadded = content.replace(/=+$/u, "").length;
    return Math.floor((unpadded * 3) / 4);
  }
  return new TextEncoder().encode(content).length;
};

const BASE64_RE = /^[A-Za-z0-9+/]*={0,2}$/u;

/** Size + encoding checks for a write; throws VfsError(400). */
export function validateWriteArgs(args: VfsWriteArgs): void {
  vfsRelativePath(args.path);
  if (typeof args.content !== "string") {
    throw new VfsError("content must be a string (utf8 text or base64 binary)", 400);
  }
  const encoding = args.encoding ?? "utf8";
  if (encoding !== "utf8" && encoding !== "base64") {
    throw new VfsError(`encoding must be "utf8" or "base64"`, 400);
  }
  if (encoding === "base64" && (args.content.length % 4 !== 0 || !BASE64_RE.test(args.content))) {
    throw new VfsError("content is not valid base64", 400);
  }
  if (byteLength(args.content, encoding) > MAX_FILE_BYTES) {
    throw new VfsError(`content exceeds ${MAX_FILE_BYTES} bytes`, 400);
  }
  if (args.ifMatch !== undefined && (typeof args.ifMatch !== "string" || args.ifMatch === "")) {
    throw new VfsError(`ifMatch must be an etag or "*"`, 400);
  }
}

export function validateListArgs(args: VfsListArgs = {}): void {
  if (args.prefix !== undefined && typeof args.prefix !== "string") {
    throw new VfsError("prefix must be a string", 400);
  }
  if (args.prefix) {
    vfsRelativePath(args.prefix, "prefix");
  }
  if (args.recursive !== undefined && typeof args.recursive !== "boolean") {
    throw new VfsError("recursive must be a boolean", 400);
  }
  if (args.cursor !== undefined && (typeof args.cursor !== "string" || args.cursor === "")) {
    throw new VfsError("cursor must be a non-empty string", 400);
  }
  if (args.limit !== undefined) {
    if (!Number.isInteger(args.limit) || args.limit <= 0) {
      throw new VfsError("limit must be a positive integer", 400);
    }
  }
}

/**
 * Tool-discovery entries for a vfs provider — the static `tools` export the
 * gateway's `GET /tools` prefers. Five entries.
 */
export function vfsToolEntries(
  provider: string,
): Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> {
  const path = {
    type: "string",
    description: 'Relative /-separated path, no leading "/" and no "." or ".." segments',
  };
  return [
    {
      name: `${provider}.read`,
      description:
        "Read one file. Returns { path, encoding, content, size, etag? }; binary content arrives base64. 404 when absent.",
      inputSchema: { type: "object", properties: { path }, required: ["path"] },
    },
    {
      name: `${provider}.write`,
      description:
        `Write one file (upsert; parent directories are implicit), content ≤ ${MAX_FILE_BYTES} bytes. ` +
        'ifMatch makes the write etag-conditional: mismatch is 409, "*" means must-exist, ' +
        "501 where the backend has no version tokens.",
      inputSchema: {
        type: "object",
        properties: {
          path,
          content: { type: "string", description: "File content, per encoding" },
          encoding: { type: "string", enum: ["utf8", "base64"], description: "Default utf8; base64 for binary" },
          ifMatch: { type: "string", description: 'Etag for a conditional write, or "*" for must-exist' },
        },
        required: ["path", "content"],
      },
    },
    {
      name: `${provider}.delete`,
      description: "Delete one file. Idempotent: returns { path, deleted } with deleted:false when absent. Files only.",
      inputSchema: { type: "object", properties: { path }, required: ["path"] },
    },
    {
      name: `${provider}.list`,
      description:
        "List entries under a prefix, lexicographic by path. Non-recursive (default) is a delimiter listing: " +
        'immediate children with subtrees collapsed to kind "directory"; recursive walks the whole subtree.',
      inputSchema: {
        type: "object",
        properties: {
          prefix: { type: "string", description: 'Path prefix; "" lists the root' },
          recursive: { type: "boolean", description: "Walk the whole subtree (default false)" },
          cursor: { type: "string", description: "Continuation token from a previous page" },
          limit: { type: "number", description: `Page size (default ${DEFAULT_LIST_LIMIT})` },
        },
      },
    },
    {
      name: `${provider}.stat`,
      description:
        "Stat one path. Returns { path, kind, size?, etag?, modifiedAt? }; 404 when absent.",
      inputSchema: { type: "object", properties: { path }, required: ["path"] },
    },
  ];
}
