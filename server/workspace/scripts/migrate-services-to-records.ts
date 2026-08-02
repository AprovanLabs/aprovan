/**
 * One-shot migration sweep: legacy `.services/**` files → record-store rows
 * (specs/record-store, "The record rule covers platform subsystems").
 *
 * Per-subsystem flags so each Phase-B cutover can deploy and migrate
 * independently:
 *
 *   pnpm --filter @aprovan/workspace exec tsx scripts/migrate-services-to-records.ts \
 *     --workspace <id> [--chat] [--vcs] [--apps] [--agents] [--sandboxes] \
 *     [--workflows] [--webhooks] [--sync] [--events] [--llm-jobs] \
 *     [--workspace-config] [--keyvalue] [--all] [--dry-run]
 *
 * For each subsystem: read the legacy file(s) → write the equivalent
 * record(s) under the subsystem's `svc#` scope → delete the file(s).
 * Re-runnable: an already-migrated subsystem simply has no files left.
 * Staged-session shadow content (`.services/chat/sessions/<id>/files/**`)
 * stays on the FS store by design. `.services/bindings.json` is deliberately
 * NOT migrated — bindings die with WS-3 Profiles (tombstone read path only).
 */

import { getFsStore, type IFsStore } from "../src/fs-store.js";
import { getRecordStore } from "../src/records.js";
import { seqKey, svcScope, SVC_SYSTEM_USER } from "../src/svc-records.js";

interface Options {
  workspaces: string[];
  subsystems: Set<string>;
  dryRun: boolean;
}

const SUBSYSTEMS = [
  "chat",
  "vcs",
  "apps",
  "agents",
  "sandboxes",
  "workflows",
  "webhooks",
  "sync",
  "events",
  "llm-jobs",
  "workspace-config",
  "keyvalue",
] as const;

function parseArgs(argv: string[]): Options {
  const options: Options = { workspaces: [], subsystems: new Set(), dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]!;
    if (arg === "--workspace") {
      const value = argv[++i];
      if (!value) throw new Error("--workspace needs a value");
      options.workspaces.push(value);
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--all") {
      for (const subsystem of SUBSYSTEMS) options.subsystems.add(subsystem);
    } else if (arg.startsWith("--")) {
      const name = arg.slice(2);
      if (!(SUBSYSTEMS as readonly string[]).includes(name)) {
        throw new Error(`Unknown flag: ${arg}`);
      }
      options.subsystems.add(name);
    }
  }
  if (options.workspaces.length === 0) options.workspaces.push("local");
  if (options.subsystems.size === 0) {
    throw new Error(
      `Name at least one subsystem (${SUBSYSTEMS.map((s) => `--${s}`).join(" ")}) or --all`,
    );
  }
  return options;
}

interface Counts {
  migrated: number;
  deleted: number;
}

async function readJson<T>(
  store: IFsStore,
  workspaceId: string,
  path: string,
): Promise<T | undefined> {
  const file = await store.read(workspaceId, path).catch(() => undefined);
  if (!file) return undefined;
  try {
    return JSON.parse(file.content) as T;
  } catch {
    console.warn(`  skipping unparseable ${path}`);
    return undefined;
  }
}

/** Migrate every direct `<prefix>/<name>.json` doc into `scope` keyed by name. */
async function migrateJsonFolder(
  workspaceId: string,
  prefix: string,
  scope: string,
  counts: Counts,
  dryRun: boolean,
  keyFor: (name: string) => string = (name) => name,
): Promise<void> {
  const fs = getFsStore();
  const records = getRecordStore();
  const entries = await fs.list(workspaceId, prefix).catch(() => []);
  for (const entry of entries) {
    const rest = entry.path.slice(prefix.length + 1);
    if (!rest || rest.includes("/") || !rest.endsWith(".json")) continue;
    const value = await readJson<unknown>(fs, workspaceId, entry.path);
    if (value === undefined) continue;
    const key = keyFor(rest.slice(0, -".json".length));
    if (!dryRun) {
      await records.set(workspaceId, scope, key, value, SVC_SYSTEM_USER);
      await fs.remove(workspaceId, entry.path);
    }
    counts.migrated += 1;
    counts.deleted += 1;
  }
}

/** Migrate one JSON document file into a single record. */
async function migrateJsonFile(
  workspaceId: string,
  path: string,
  scope: string,
  key: string,
  counts: Counts,
  dryRun: boolean,
): Promise<void> {
  const fs = getFsStore();
  const value = await readJson<unknown>(fs, workspaceId, path);
  if (value === undefined) return;
  if (!dryRun) {
    await getRecordStore().set(workspaceId, scope, key, value, SVC_SYSTEM_USER);
    await fs.remove(workspaceId, path);
  }
  counts.migrated += 1;
  counts.deleted += 1;
}

async function migrateChat(workspaceId: string, counts: Counts, dryRun: boolean): Promise<void> {
  const fs = getFsStore();
  const records = getRecordStore();
  const prefix = ".services/chat/sessions";
  const entries = await fs.list(workspaceId, prefix).catch(() => []);
  for (const entry of entries) {
    const rest = entry.path.slice(prefix.length + 1);
    // Session records are direct children `<id>.json`.
    if (!rest || rest.includes("/") || !rest.endsWith(".json")) continue;
    const id = rest.slice(0, -".json".length);
    const session = await readJson<Record<string, unknown>>(fs, workspaceId, entry.path);
    if (!session) continue;
    if (!dryRun) {
      await records.set(workspaceId, svcScope("chat", "sessions"), id, session, SVC_SYSTEM_USER);
    }
    counts.migrated += 1;

    // Transcript → per-message records with seq keys.
    const messagesPath = `${prefix}/${id}/messages.json`;
    const messages = await readJson<unknown[]>(fs, workspaceId, messagesPath);
    if (Array.isArray(messages)) {
      const scope = svcScope("chat", "session", id);
      for (const [index, message] of messages.entries()) {
        const messageId =
          message && typeof (message as { id?: unknown }).id === "string"
            ? ((message as { id: string }).id)
            : `m${index}`;
        if (!dryRun) {
          await records.set(workspaceId, scope, seqKey(index, messageId), message, SVC_SYSTEM_USER);
        }
      }
      counts.migrated += messages.length;
      if (!dryRun) await fs.remove(workspaceId, messagesPath);
      counts.deleted += 1;
    }
    if (!dryRun) await fs.remove(workspaceId, entry.path);
    counts.deleted += 1;
    // `<id>/files/**` shadow content deliberately stays.
  }
}

async function migrateVcs(workspaceId: string, counts: Counts, dryRun: boolean): Promise<void> {
  await migrateJsonFolder(
    workspaceId, ".services/vcs/snapshots", svcScope("vcs", "snapshots"), counts, dryRun,
  );
  await migrateJsonFolder(
    workspaceId, ".services/vcs/commits", svcScope("vcs", "commits"), counts, dryRun,
  );
  // Refs may be nested (`session/<id>.json`) — walk the whole prefix.
  const fs = getFsStore();
  const records = getRecordStore();
  const refEntries = await fs.list(workspaceId, ".services/vcs/refs").catch(() => []);
  for (const entry of refEntries) {
    if (!entry.path.endsWith(".json")) continue;
    const name = entry.path.slice(".services/vcs/refs/".length, -".json".length);
    const value = await readJson<unknown>(fs, workspaceId, entry.path);
    if (value === undefined) continue;
    if (!dryRun) {
      await records.set(workspaceId, svcScope("vcs", "refs"), name, value, SVC_SYSTEM_USER);
      await fs.remove(workspaceId, entry.path);
    }
    counts.migrated += 1;
    counts.deleted += 1;
  }
  await migrateJsonFile(
    workspaceId, ".services/vcs/mounts.json", svcScope("vcs", "mounts"), "mounts", counts, dryRun,
  );
}

async function migrateEvents(workspaceId: string, counts: Counts, dryRun: boolean): Promise<void> {
  // `.services/events/<channel>.jsonl` append-logs → record-per-entry.
  const fs = getFsStore();
  const records = getRecordStore();
  const entries = await fs.list(workspaceId, ".services/events").catch(() => []);
  for (const entry of entries) {
    if (!entry.path.endsWith(".jsonl")) continue;
    const channel = entry.path.slice(".services/events/".length, -".jsonl".length);
    const file = await fs.read(workspaceId, entry.path).catch(() => undefined);
    if (!file) continue;
    const lines = file.content.split("\n").filter(Boolean);
    const scope = svcScope("events", channel);
    for (const [index, line] of lines.entries()) {
      let record: unknown;
      try {
        record = JSON.parse(line);
      } catch {
        continue;
      }
      const id =
        record && typeof (record as { id?: unknown }).id === "string"
          ? (record as { id: string }).id
          : `e${index}`;
      if (!dryRun) {
        await records.set(workspaceId, scope, seqKey(index, id), record, SVC_SYSTEM_USER);
      }
      counts.migrated += 1;
    }
    if (!dryRun) await fs.remove(workspaceId, entry.path);
    counts.deleted += 1;
  }
}

async function migrateSubsystem(
  workspaceId: string,
  subsystem: string,
  dryRun: boolean,
): Promise<Counts> {
  const counts: Counts = { migrated: 0, deleted: 0 };
  switch (subsystem) {
    case "chat":
      await migrateChat(workspaceId, counts, dryRun);
      break;
    case "vcs":
      await migrateVcs(workspaceId, counts, dryRun);
      break;
    case "apps": {
      await migrateJsonFolder(workspaceId, ".services/apps", svcScope("apps"), counts, dryRun);
      await migrateJsonFolder(
        workspaceId, ".services/apps/installed", svcScope("apps", "installed"), counts, dryRun,
      );
      // Releases + usage live under `.services/apps/<name>/…`.
      const fs = getFsStore();
      const records = getRecordStore();
      const nested = await fs.list(workspaceId, ".services/apps").catch(() => []);
      for (const entry of nested) {
        const rest = entry.path.slice(".services/apps/".length);
        const segments = rest.split("/");
        if (segments.length < 3 || !entry.path.endsWith(".json")) continue;
        const [app, kind] = segments;
        if (app === "installed") continue;
        const value = await readJson<unknown>(fs, workspaceId, entry.path);
        if (value === undefined) continue;
        const key = segments.slice(2).join("/").slice(0, -".json".length);
        const scope =
          kind === "releases"
            ? svcScope("apps", "releases", app!)
            : kind === "usage"
              ? svcScope("apps", "usage", app!)
              : svcScope("apps", kind!, app!);
        if (!dryRun) {
          await records.set(workspaceId, scope, key, value, SVC_SYSTEM_USER);
          await fs.remove(workspaceId, entry.path);
        }
        counts.migrated += 1;
        counts.deleted += 1;
      }
      break;
    }
    case "agents":
      await migrateJsonFolder(workspaceId, ".services/agents", svcScope("agents"), counts, dryRun);
      await migrateJsonFolder(
        workspaceId, ".services/agents/_runs", svcScope("agents", "runs"), counts, dryRun,
      );
      break;
    case "sandboxes":
      await migrateJsonFolder(
        workspaceId, ".services/sandboxes", svcScope("sandboxes"), counts, dryRun,
      );
      await migrateJsonFolder(
        workspaceId, ".services/sandboxes/hosts", svcScope("sandboxes", "hosts"), counts, dryRun,
      );
      await migrateJsonFolder(
        workspaceId, ".services/sandboxes/runs", svcScope("sandboxes", "runs"), counts, dryRun,
      );
      await migrateJsonFile(
        workspaceId,
        ".services/sandboxes/defaults.json",
        svcScope("sandboxes", "defaults"),
        "defaults",
        counts,
        dryRun,
      );
      break;
    case "workflows":
      await migrateJsonFolder(
        workspaceId, ".services/workflows", svcScope("workflows"), counts, dryRun,
      );
      await migrateJsonFile(
        workspaceId,
        ".services/workflows/cron-workspaces.json",
        svcScope("workflows", "cron"),
        "cron-workspaces",
        counts,
        dryRun,
      );
      break;
    case "webhooks":
      await migrateJsonFolder(
        workspaceId, ".services/webhooks", svcScope("webhooks"), counts, dryRun,
      );
      break;
    case "sync":
      await migrateJsonFolder(workspaceId, ".services/sync", svcScope("sync"), counts, dryRun);
      break;
    case "events":
      await migrateEvents(workspaceId, counts, dryRun);
      break;
    case "llm-jobs":
      await migrateJsonFolder(
        workspaceId, ".services/llm-jobs", svcScope("llm-jobs"), counts, dryRun,
      );
      break;
    case "workspace-config":
      await migrateJsonFile(
        workspaceId, ".services/workspace.json", svcScope("workspace"), "config", counts, dryRun,
      );
      break;
    case "keyvalue": {
      // Legacy FS keyvalue (workspace scope) → `ws` record scope.
      const fs = getFsStore();
      const records = getRecordStore();
      const entries = await fs.list(workspaceId, ".services/keyvalue").catch(() => []);
      for (const entry of entries) {
        const key = entry.path.slice(".services/keyvalue/".length);
        if (!key) continue;
        const file = await fs.read(workspaceId, entry.path).catch(() => undefined);
        if (!file) continue;
        let value: unknown;
        try {
          value = JSON.parse(file.content);
        } catch {
          value = file.content;
        }
        if (!dryRun) {
          await records.set(workspaceId, "ws", key, value, SVC_SYSTEM_USER);
          await fs.remove(workspaceId, entry.path);
        }
        counts.migrated += 1;
        counts.deleted += 1;
      }
      break;
    }
    default:
      throw new Error(`Unknown subsystem: ${subsystem}`);
  }
  return counts;
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  for (const workspaceId of options.workspaces) {
    console.log(`workspace ${workspaceId}${options.dryRun ? " (dry run)" : ""}`);
    for (const subsystem of SUBSYSTEMS) {
      if (!options.subsystems.has(subsystem)) continue;
      const counts = await migrateSubsystem(workspaceId, subsystem, options.dryRun);
      console.log(
        `  ${subsystem}: ${counts.migrated} record(s) written, ${counts.deleted} file(s) removed`,
      );
    }
  }
}

const invokedDirectly =
  process.argv[1]?.endsWith("migrate-services-to-records.ts") ||
  process.argv[1]?.endsWith("migrate-services-to-records.js");
if (invokedDirectly) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

export { migrateSubsystem, parseArgs };
