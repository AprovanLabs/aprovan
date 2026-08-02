#!/usr/bin/env tsx
/**
 * seed-example-app.ts — publish the LIIFT4 Tracker example app into a
 * workspace and validate the app surface end-to-end: app folder in the VFS
 * (index.tsx entrypoint), manifest published, and per-(app, user) keyvalue
 * co-location exercised exactly the way the public /apps routes do it.
 *
 * Usage:
 *   cd apps/workspace
 *   AWS_PROFILE=aprovan FS_BUCKET=… FS_TABLE=… pnpm tsx scripts/seed-example-app.ts \
 *     --workspace ws_jacob_personal --user <sub>
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { loadAprovanEnv, dotenv } from "@aprovan/node";

dotenv.config();
const aprovanEnv = process.env["APROVAN_ENV"] ?? "prd";
if (aprovanEnv !== "off") {
  process.env["AWS_REGION"] ??= "us-east-2";
  process.env["AWS_DEFAULT_REGION"] ??= process.env["AWS_REGION"];
  await loadAprovanEnv(aprovanEnv, { overwrite: false });
}

const { getFsStore } = await import("../src/fs-store.js");
const { getRecordStore } = await import("../src/records.js");
const { CORE_SERVICES } = await import("../src/services.js");
const { invokeTool } = await import("../src/workflows/invoke.js");

const { values: args } = parseArgs({
  options: {
    workspace: { type: "string" },
    user: { type: "string" },
  },
  strict: true,
});

const workspaceId = args.workspace;
const userId = args.user;
if (!workspaceId || !userId) {
  console.error("Usage: seed-example-app.ts --workspace <id> --user <sub>");
  process.exit(1);
}

const scriptsDir = dirname(fileURLToPath(import.meta.url));

const ownerCtx = { workspaceId, userId };
const apps = CORE_SERVICES["apps"]!;
const store = getFsStore();

/** Copy every file under examples/<app>/ into the workspace app folder. */
async function writeAppFolder(app: string): Promise<void> {
  const root = join(scriptsDir, "../examples", app);
  const stack = [root];
  while (stack.length > 0) {
    const dir = stack.pop()!;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      const relative = full.slice(root.length + 1);
      await store.write(
        workspaceId!,
        `apps/${app}/${relative}`,
        readFileSync(full, "utf-8"),
        relative.endsWith(".tsx") ? "text/typescript-jsx" : "text/typescript",
      );
      console.log(`✔ wrote apps/${app}/${relative}`);
    }
  }
}

// 1. Apps are ordinary workspace folders with an index.tsx entrypoint —
//    devtools is deliberately multi-file (lib/ + widgets/ modules).
await writeAppFolder("liift4");
await writeAppFolder("devtools");

// 2. Publish the app bundles.
const published = await apps.call(ownerCtx, "publish", {
  name: "liift4",
  title: "LIIFT4 Tracker",
  description:
    "Weight tracker for the LIIFT4 program — weeks, round-split days, and a core timer. Your log is private to your account and follows you across devices.",
  dir: "apps/liift4",
  visibility: "private",
  allowed_tools: ["keyvalue.*"],
  rate_limit: { rps: 10, burst: 30, daily: 2000 },
});
console.log("✔ published:", JSON.stringify(published, null, 2));

// Dev Tools is a static page: account required (any Aprovan account), no
// backend tools at all — keyvalue.get satisfies the non-empty allow-list
// requirement without exposing anything the page actually calls.
const publishedDevtools = await apps.call(ownerCtx, "publish", {
  name: "devtools",
  title: "Dev Tools",
  description:
    "Everyday developer utilities — Base64, JSON ↔ YAML, date/time zones. Runs entirely in your browser.",
  dir: "apps/devtools",
  visibility: "private",
  allowed_tools: ["keyvalue.get"],
  rate_limit: { rps: 5, burst: 10, daily: 500 },
});
console.log("✔ published:", JSON.stringify(publishedDevtools, null, 2));

// 3. Validate per-user co-located partitions through the same dispatch the
//    /apps routes use — data lands next to the app in apps/liift4/data/<user>/.
const asUser = (sub: string) => ({
  workspaceId,
  userId: sub,
  appScope: { app: "liift4", dir: "apps/liift4", userId: sub, role: "user" as const },
});

await invokeTool(asUser("validation-alice"), "keyvalue", "set", {
  key: "liift4-state",
  value: { weeks: [{ number: 1 }], weights: { "w1:legs:0:0": 45 } },
});
await invokeTool(asUser("validation-bob"), "keyvalue", "set", {
  key: "liift4-state",
  value: { weeks: [{ number: 1 }, { number: 2 }], weights: {} },
});

const alice = (await invokeTool(asUser("validation-alice"), "keyvalue", "get", {
  key: "liift4-state",
})) as { value: { weights: Record<string, number> } };
const bob = (await invokeTool(asUser("validation-bob"), "keyvalue", "get", {
  key: "liift4-state",
})) as { value: { weeks: unknown[] } };
const owner = (await invokeTool(ownerCtx, "keyvalue", "get", {
  key: "liift4-state",
})) as { value: unknown };

if (alice.value.weights["w1:legs:0:0"] !== 45) throw new Error("alice partition wrong");
if (bob.value.weeks.length !== 2) throw new Error("bob partition wrong");
if (owner.value !== null) throw new Error("owner namespace polluted");

// keyvalue is record-store-backed now (see docs/app-data.md): co-location is
// a scope string, not a file path — `apps/liift4/data/<user>/` is gone.
const aliceRecord = await getRecordStore().get(workspaceId!, "app#liift4#u#validation-alice", "liift4-state");
if (!aliceRecord) throw new Error("alice data not recorded under scope app#liift4#u#validation-alice");
console.log("✔ per-user partitions isolated (record store scope app#liift4#u#<user>)");

// Clean up validation partitions.
await invokeTool(asUser("validation-alice"), "keyvalue", "delete", { key: "liift4-state" });
await invokeTool(asUser("validation-bob"), "keyvalue", "delete", { key: "liift4-state" });

console.log(`✔ done — live apps: https://aprovan.com/apps/${workspaceId}/liift4 and /apps/${workspaceId}/devtools`);
