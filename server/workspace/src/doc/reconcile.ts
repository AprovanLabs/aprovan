/**
 * Agent whole-file write → SEARCH/REPLACE → one Yjs transaction (tech-plan D3/D7).
 *
 * When no live doc exists, returns `{ kind: "not-live" }` so both write choke
 * points fall through unchanged. Matching algorithm mirrors
 * `packages/editor/src/lib/diff.ts` `applyDiffs` / `applyFuzzyDiff` (vendored
 * here — `@aprovan/editor` is not a workspace dependency under pnpm isolation).
 */

import * as Y from "yjs";
import { getFsStore } from "../fs-store.js";
import {
  createSession,
  readSession,
  requireSession,
  sessionWrite,
  updateSession,
  type ChatSessionRecord,
} from "../vcs/chat-sessions.js";
import { appendUpdate } from "./persistence.js";
import { getOrLoadDoc, hasLiveDoc } from "./registry.js";

/** Same shape as `packages/editor` `DiffBlock` (search/replace only). */
export interface DiffBlock {
  search: string;
  replace: string;
}

export interface ReconcileWriteArgs {
  workspaceId: string;
  path: string;
  content: string;
  /** Writer's known base (materialized content they read). */
  base?: string;
  actor: { userId: string; agentProfile?: string; app?: string };
  /** Caller already named a session (D3). */
  explicitSessionId?: string;
}

export type ReconcileResult =
  | { kind: "not-live" }
  | { kind: "applied"; appliedBlocks: number }
  | {
      kind: "conflict";
      sessionId: string;
      appliedBlocks: number;
      failed: string[];
    };

export type ReconcileOrigin = {
  userId: string;
  agentProfile?: string;
  app?: string;
};

/**
 * Line-based Myers LCS → contiguous SEARCH/REPLACE hunks between `base` and
 * `content`. Inserts/deletes expand SEARCH with a neighbouring unchanged line
 * when needed so `applyDiffs`-style substring match has an anchor.
 */
export function deriveDiffBlocks(base: string, content: string): DiffBlock[] {
  if (base === content) return [];
  const a = base.split("\n");
  const b = content.split("\n");
  const n = a.length;
  const m = b.length;

  // LCS lengths
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i]![j] =
        a[i] === b[j] ? (dp[i + 1]![j + 1]! + 1) : Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!);
    }
  }

  type Op =
    | { kind: "eq"; line: string }
    | { kind: "del"; line: string }
    | { kind: "ins"; line: string };
  const ops: Op[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ops.push({ kind: "eq", line: a[i]! });
      i++;
      j++;
    } else if (dp[i + 1]![j]! >= dp[i]![j + 1]!) {
      ops.push({ kind: "del", line: a[i]! });
      i++;
    } else {
      ops.push({ kind: "ins", line: b[j]! });
      j++;
    }
  }
  while (i < n) {
    ops.push({ kind: "del", line: a[i]! });
    i++;
  }
  while (j < m) {
    ops.push({ kind: "ins", line: b[j]! });
    j++;
  }

  const blocks: DiffBlock[] = [];
  let k = 0;
  while (k < ops.length) {
    if (ops[k]!.kind === "eq") {
      k++;
      continue;
    }
    const del: string[] = [];
    const ins: string[] = [];
    while (k < ops.length && ops[k]!.kind !== "eq") {
      if (ops[k]!.kind === "del") del.push(ops[k]!.line);
      else ins.push(ops[k]!.line);
      k++;
    }

    if (del.length > 0 && ins.length > 0) {
      blocks.push({ search: del.join("\n"), replace: ins.join("\n") });
      continue;
    }
    if (del.length > 0) {
      // Pure delete — anchor with following (or previous) eq line when present.
      const next = ops[k];
      if (next?.kind === "eq") {
        blocks.push({
          search: [...del, next.line].join("\n"),
          replace: next.line,
        });
      } else {
        const prevEq = findPrevEq(ops, k - del.length);
        if (prevEq !== null) {
          blocks.push({
            search: [prevEq, ...del].join("\n"),
            replace: prevEq,
          });
        } else {
          blocks.push({ search: del.join("\n"), replace: "" });
        }
      }
      continue;
    }
    // Pure insert — anchor with previous or next eq line.
    const prevEq = findPrevEq(ops, k - ins.length);
    const next = ops[k];
    if (prevEq !== null) {
      blocks.push({
        search: prevEq,
        replace: [prevEq, ...ins].join("\n"),
      });
    } else if (next?.kind === "eq") {
      blocks.push({
        search: next.line,
        replace: [...ins, next.line].join("\n"),
      });
    } else {
      // Whole-file insert / replace with no anchors.
      blocks.push({ search: base, replace: content });
    }
  }

  return blocks;
}

function findPrevEq(ops: Array<{ kind: string; line: string }>, before: number): string | null {
  for (let i = before - 1; i >= 0; i--) {
    if (ops[i]!.kind === "eq") return ops[i]!.line;
  }
  return null;
}

/**
 * Exact + whitespace/indent-tolerant fuzzy match — mirrors
 * `packages/editor/src/lib/diff.ts` `applyDiffs` / `applyFuzzyDiff`.
 */
export function matchDiffBlock(
  code: string,
  search: string,
  replace: string,
): { index: number; length: number; replace: string } | null {
  if (search === "") return null;
  const exact = code.indexOf(search);
  if (exact !== -1) {
    return { index: exact, length: search.length, replace };
  }
  return matchFuzzy(code, search, replace);
}

function matchFuzzy(
  code: string,
  search: string,
  replace: string,
): { index: number; length: number; replace: string } | null {
  const fileLines = code.split("\n");
  const searchLines = search.split("\n");
  const height = searchLines.length;

  for (let start = 0; start + height <= fileLines.length; start++) {
    let indent: string | null = null;
    let dedent: string | null = null;
    let matched = true;

    for (let i = 0; i < height; i++) {
      const fileLine = (fileLines[start + i] ?? "").trimEnd();
      const searchLine = (searchLines[i] ?? "").trimEnd();
      if (fileLine === searchLine) continue;
      if (
        searchLine !== "" &&
        fileLine.endsWith(searchLine) &&
        /^\s+$/.test(fileLine.slice(0, fileLine.length - searchLine.length))
      ) {
        const prefix = fileLine.slice(0, fileLine.length - searchLine.length);
        if ((indent ?? prefix) !== prefix || dedent !== null) {
          matched = false;
          break;
        }
        indent = prefix;
        continue;
      }
      if (
        fileLine !== "" &&
        searchLine.endsWith(fileLine) &&
        /^\s+$/.test(searchLine.slice(0, searchLine.length - fileLine.length))
      ) {
        const prefix = searchLine.slice(0, searchLine.length - fileLine.length);
        if ((dedent ?? prefix) !== prefix || indent !== null) {
          matched = false;
          break;
        }
        dedent = prefix;
        continue;
      }
      matched = false;
      break;
    }
    if (!matched) continue;

    const replaceLines = replace.split("\n").map((line) => {
      if (line.trim() === "") return line;
      if (indent) return indent + line;
      if (dedent && line.startsWith(dedent)) return line.slice(dedent.length);
      return line;
    });
    const matchedText = fileLines.slice(start, start + height).join("\n");
    // Byte offset of `start` in the original string.
    let index = 0;
    for (let lineIdx = 0; lineIdx < start; lineIdx++) {
      index += (fileLines[lineIdx] ?? "").length + 1; // +1 for '\n'
    }
    return {
      index,
      length: matchedText.length,
      replace: replaceLines.join("\n"),
    };
  }
  return null;
}

function failPreview(search: string): string {
  const lines = search.split("\n").slice(0, 3);
  const preview = lines.join("\n").slice(0, 100);
  const suffix = search.length > preview.length ? "..." : "";
  return preview + suffix;
}

async function resolveConflictSession(
  workspaceId: string,
  userId: string,
  explicitSessionId: string | undefined,
): Promise<ChatSessionRecord> {
  if (explicitSessionId) {
    const existing = await requireSession(workspaceId, explicitSessionId);
    if (existing.mode === "auto") {
      return updateSession(workspaceId, existing.id, { mode: "staged" });
    }
    return existing;
  }
  return createSession(workspaceId, userId, { mode: "staged" });
}

/**
 * Gate on `hasLiveDoc`. Live path: derive SEARCH/REPLACE from base→content,
 * apply matched blocks as one attributed Yjs transaction, escalate unmatched
 * blocks into a staged session overlay (D3).
 */
export async function reconcileOrPassThrough(
  args: ReconcileWriteArgs,
): Promise<ReconcileResult> {
  const { workspaceId, path, content, actor } = args;
  if (!hasLiveDoc(workspaceId, path)) {
    return { kind: "not-live" };
  }

  let base = args.base;
  if (base === undefined) {
    const file = await getFsStore().read(workspaceId, path);
    base = file?.content ?? "";
  }

  const blocks = deriveDiffBlocks(base, content);
  const live = await getOrLoadDoc(workspaceId, path);
  const ytext = live.doc.getText("content");

  const matched: DiffBlock[] = [];
  const failed: string[] = [];

  // Match against a working snapshot so later blocks see earlier successful
  // applications (same sequential semantics as applyDiffs).
  let working = ytext.toString();
  for (const block of blocks) {
    const match = matchDiffBlock(working, block.search, block.replace);
    if (!match) {
      failed.push(failPreview(block.search));
      continue;
    }
    matched.push(block);
    working =
      working.slice(0, match.index) + match.replace + working.slice(match.index + match.length);
  }

  const origin: ReconcileOrigin = {
    userId: actor.userId,
    ...(actor.agentProfile !== undefined ? { agentProfile: actor.agentProfile } : {}),
    ...(actor.app !== undefined ? { app: actor.app } : {}),
  };

  if (matched.length > 0) {
    const before = Y.encodeStateVector(live.doc);
    live.doc.transact(() => {
      for (const block of matched) {
        const current = ytext.toString();
        const match = matchDiffBlock(current, block.search, block.replace);
        if (!match) continue;
        if (match.length > 0) ytext.delete(match.index, match.length);
        if (match.replace.length > 0) ytext.insert(match.index, match.replace);
      }
    }, origin);
    const update = Y.encodeStateAsUpdate(live.doc, before);
    if (update.byteLength > 2) {
      await appendUpdate(workspaceId, path, update);
    }
  }

  if (failed.length === 0) {
    return { kind: "applied", appliedBlocks: matched.length };
  }

  const session = await resolveConflictSession(
    workspaceId,
    actor.userId,
    args.explicitSessionId,
  );
  // Capture the agent's intact intended write in the staged overlay (D3).
  await sessionWrite(workspaceId, session, path, content);
  // Re-read in case sessionWrite mutated the in-memory record already saved.
  const staged = (await readSession(workspaceId, session.id)) ?? session;

  return {
    kind: "conflict",
    sessionId: staged.id,
    appliedBlocks: matched.length,
    failed,
  };
}
