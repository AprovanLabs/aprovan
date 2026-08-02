import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import * as vfs from "../index.js";
import {
  MAX_FILE_BYTES,
  VfsError,
  validateListArgs,
  validateWriteArgs,
  vfsRelativePath,
  vfsToolEntries,
  secretFromHeaders,
} from "../index.js";

const statusOf = (fn: () => void): number => {
  try {
    fn();
  } catch (error) {
    if (error instanceof VfsError) return error.status;
    throw error;
  }
  throw new Error("expected a VfsError");
};

describe("VfsError", () => {
  it("carries an HTTP-ish status, defaulting to 400", () => {
    expect(new VfsError("nope").status).toBe(400);
    expect(new VfsError("missing", 404).status).toBe(404);
    expect(new VfsError("etag mismatch", 409).status).toBe(409);
    expect(new VfsError("no versions", 501).status).toBe(501);
    expect(new VfsError("nope").name).toBe("VfsError");
  });
});

describe("vfsRelativePath", () => {
  it("normalizes separators and strips leading/trailing slashes", () => {
    expect(vfsRelativePath("a/b/c.txt")).toBe("a/b/c.txt");
    expect(vfsRelativePath("/a/b/")).toBe("a/b");
    expect(vfsRelativePath("a\\b\\c.txt")).toBe("a/b/c.txt");
  });

  it("rejects traversal, empties, and non-strings with 400", () => {
    expect(statusOf(() => vfsRelativePath("../etc/passwd"))).toBe(400);
    expect(statusOf(() => vfsRelativePath("a/./b"))).toBe(400);
    expect(statusOf(() => vfsRelativePath("a//b"))).toBe(400);
    expect(statusOf(() => vfsRelativePath(""))).toBe(400);
    expect(statusOf(() => vfsRelativePath(42))).toBe(400);
  });
});

describe("validateWriteArgs", () => {
  it("accepts utf8 (default) and base64 content", () => {
    expect(() => validateWriteArgs({ path: "notes.txt", content: "hello" })).not.toThrow();
    expect(() =>
      validateWriteArgs({ path: "img.png", content: Buffer.from([1, 2, 3]).toString("base64"), encoding: "base64" }),
    ).not.toThrow();
  });

  it("rejects invalid base64 with 400", () => {
    expect(statusOf(() => validateWriteArgs({ path: "a", content: "not base64!!", encoding: "base64" }))).toBe(400);
  });

  it("rejects an unknown encoding with 400", () => {
    expect(
      statusOf(() => validateWriteArgs({ path: "a", content: "x", encoding: "utf16" as unknown as "utf8" })),
    ).toBe(400);
  });

  it("rejects content over MAX_FILE_BYTES with 400 (decoded size for base64)", () => {
    expect(statusOf(() => validateWriteArgs({ path: "big", content: "x".repeat(MAX_FILE_BYTES + 1) }))).toBe(400);
    const bigBase64 = Buffer.alloc(MAX_FILE_BYTES + 3).toString("base64");
    expect(statusOf(() => validateWriteArgs({ path: "big", content: bigBase64, encoding: "base64" }))).toBe(400);
  });

  it("accepts an etag or * ifMatch and rejects an empty one with 400", () => {
    expect(() => validateWriteArgs({ path: "a", content: "x", ifMatch: "abc123" })).not.toThrow();
    expect(() => validateWriteArgs({ path: "a", content: "x", ifMatch: "*" })).not.toThrow();
    expect(statusOf(() => validateWriteArgs({ path: "a", content: "x", ifMatch: "" }))).toBe(400);
  });
});

describe("validateListArgs", () => {
  it("accepts empty args, a prefix, and paging", () => {
    expect(() => validateListArgs()).not.toThrow();
    expect(() => validateListArgs({ prefix: "", recursive: true, limit: 10 })).not.toThrow();
    expect(() => validateListArgs({ prefix: "a/b", cursor: "next" })).not.toThrow();
  });

  it("rejects traversal in prefix and bad paging with 400", () => {
    expect(statusOf(() => validateListArgs({ prefix: "../up" }))).toBe(400);
    expect(statusOf(() => validateListArgs({ limit: 0 }))).toBe(400);
    expect(statusOf(() => validateListArgs({ cursor: "" }))).toBe(400);
  });
});

describe("secretFromHeaders", () => {
  it("extracts the bearer secret and 400s when absent", () => {
    expect(secretFromHeaders({ Authorization: "Bearer tok" }, "s3", "access token")).toBe("tok");
    expect(statusOf(() => secretFromHeaders({}, "s3", "access token"))).toBe(400);
  });
});

describe("vfsToolEntries", () => {
  it("exposes exactly the five file-plane operations under the provider prefix", () => {
    const entries = vfsToolEntries("s3");
    expect(entries.map((entry) => entry.name)).toEqual([
      "s3.read",
      "s3.write",
      "s3.delete",
      "s3.list",
      "s3.stat",
    ]);
  });

  it("requires path on read/write/delete/stat and content on write", () => {
    const entries = vfsToolEntries("dav");
    const byName = Object.fromEntries(entries.map((entry) => [entry.name, entry.inputSchema]));
    expect(byName["dav.read"]?.required).toEqual(["path"]);
    expect(byName["dav.write"]?.required).toEqual(["path", "content"]);
    expect(byName["dav.delete"]?.required).toEqual(["path"]);
    expect(byName["dav.stat"]?.required).toEqual(["path"]);
    expect(byName["dav.list"]?.required).toBeUndefined();
  });
});

describe("vfs surface stays minimal (spec: no session/overlay/mount concept)", () => {
  it("exports no session, overlay, mount, watch, or version-history concept", () => {
    const forbidden = /session|overlay|mount|watch|subscribe|history|acl|copy|move/iu;
    for (const exportName of Object.keys(vfs)) {
      expect(exportName).not.toMatch(forbidden);
    }
  });

  it("keeps the source free of session/overlay/mount surface (comments describe the exclusion only)", () => {
    const source = readFileSync(
      path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "index.ts"),
      "utf8",
    );
    // The only operations are the five file-plane ones.
    const names = [...source.matchAll(/name: `\$\{provider\}\.([a-z]+)`/gu)].map((match) => match[1]);
    expect(names).toEqual(["read", "write", "delete", "list", "stat"]);
  });
});
