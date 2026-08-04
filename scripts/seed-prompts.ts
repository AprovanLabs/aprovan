#!/usr/bin/env tsx
/**
 * seed-prompts.ts
 *
 * Write every prompt in data/prompts/ into a workspace's filesystem as
 * `prompts/<name>.md`, through the gateway's own FS store (so the same
 * script seeds local SQLite and prod S3/DynamoDB alike).
 *
 * ## Usage
 *
 *   # Local dev (SQLite at ~/.aprovan/workspace.db, workspace "local")
 *   pnpm tsx scripts/seed-prompts.ts --workspace local
 *
 *   # Prod (S3/Dynamo — needs AWS credentials)
 *   AWS_REGION=us-east-2 \
 *   WORKSPACE_MODE=aws \
 *   FS_TABLE=registry-prd-use2-fs-files \
 *   FS_BUCKET=registry-prd-use2-workspace-fs \
 *     pnpm tsx scripts/seed-prompts.ts --workspace ws_jacob_personal
 */

import { readdirSync, readFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { getFsStore } from "../server/workspace/src/fs-store.js";

const { values: args } = parseArgs({
  options: {
    workspace: { type: "string" },
  },
  strict: true,
});

const workspaceId = args.workspace;
if (!workspaceId) {
  console.error("Usage: seed-prompts.ts --workspace <workspace-id>");
  process.exit(1);
}

const promptsDir = resolve(import.meta.dirname, "../data/prompts");
const files = readdirSync(promptsDir).filter((f) => f.endsWith(".md"));
if (files.length === 0) {
  console.error(`No prompt files in ${promptsDir}`);
  process.exit(1);
}

const store = getFsStore();
for (const file of files) {
  const content = readFileSync(join(promptsDir, file), "utf8");
  const path = `prompts/${basename(file)}`;
  const written = await store.write(workspaceId, path, content, "text/markdown");
  console.log(`${workspaceId} ${path} ${written.hash.slice(0, 12)} (${content.length} bytes)`);
}
