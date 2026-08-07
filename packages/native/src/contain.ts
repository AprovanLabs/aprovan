/**
 * Root containment — lexical rejection of `..`/absolute paths, then a realpath
 * check that catches symlink escapes. The registered root is the only boundary.
 *
 * Extracted from LocalExecutor so the local-directory VFS backend shares the
 * same implementation (D3).
 */

import { existsSync } from "node:fs";
import { realpath } from "node:fs/promises";
import { isAbsolute, resolve, sep } from "node:path";

const within = (candidate: string, root: string): boolean =>
  candidate === root || candidate.startsWith(root + sep);

/**
 * Resolve `relative` against `root` and prove the result stays inside `root`.
 *
 * The lexical check rejects `..` and absolute escapes; the realpath check
 * (when the target exists) rejects symlinks pointing out of the tree. Both
 * are needed — a symlink is lexically innocent.
 */
export async function containPath(root: string, relative: string): Promise<string> {
  if (isAbsolute(relative)) throw new Error(`path must be relative: ${relative}`);
  const target = resolve(root, relative);
  if (!within(target, root)) {
    throw new Error(`path escapes the sandbox: ${relative}`);
  }
  if (existsSync(target)) {
    const real = await realpath(target);
    const realRoot = await realpath(root);
    if (!within(real, realRoot)) {
      throw new Error(`path resolves outside the sandbox: ${relative}`);
    }
  }
  return target;
}
