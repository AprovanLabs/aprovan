#!/usr/bin/env tsx
/**
 * seed-tasks-app.ts — publish the Tasks example app (lightweight Jira/Linear
 * on nothing but native services) into a workspace, and validate the review
 * loop end-to-end without an LLM: task → isolated draft with staged work →
 * in_review + decision notification (app widget + workflow choices) →
 * accept merges the draft → task done.
 *
 * Everything rides native surfaces: vfs (app files), workflows (register +
 * run), apps.publish, keyvalue (tasks), sessions (draft isolation),
 * notifications (review decisions). No registry/patchwork special-casing.
 *
 * Usage:
 *   cd apps/workspace
 *   pnpm tsx scripts/seed-tasks-app.ts --workspace local --user local          # dev sqlite
 *   AWS_PROFILE=… pnpm tsx scripts/seed-tasks-app.ts --workspace ws_jacob_personal --user <sub>
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
const { CORE_SERVICES } = await import("../src/services.js");
const { invokeTool } = await import("../src/workflows/invoke.js");

const { values: args } = parseArgs({
  options: {
    workspace: { type: "string" },
    user: { type: "string" },
    validate: { type: "boolean", default: true },
  },
  strict: true,
});

const workspaceId = args.workspace;
const userId = args.user;
if (!workspaceId || !userId) {
  console.error("Usage: seed-tasks-app.ts --workspace <id> --user <sub>");
  process.exit(1);
}

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const ctx = { workspaceId, userId };
const store = getFsStore();
const apps = CORE_SERVICES["apps"]!;
const workflows = CORE_SERVICES["workflows"]!;

// 1. The app is an ordinary workspace folder (chat conventions: widgets +
//    co-located workflow scripts under the app dir).
const root = join(scriptsDir, "../examples/tasks");
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
      workspaceId,
      `apps/tasks/${relative}`,
      readFileSync(full, "utf-8"),
      relative.endsWith(".tsx") ? "text/typescript-jsx" : "text/javascript",
    );
    console.log(`✔ wrote apps/tasks/${relative}`);
  }
}

// 2. Workflows: the agent runner (cron, every 15 minutes) + the three
//    review outcomes the notification choices call.
const registrations: Array<{ name: string; script: string; description: string; cron?: string }> = [
  {
    name: "tasks-agent-runner",
    script: "apps/tasks/workflows/agent-runner.js",
    description: "Run agent-assigned todo tasks in isolated drafts and queue reviews.",
    cron: "*/15 * * * *",
  },
  {
    name: "tasks-accept",
    script: "apps/tasks/workflows/accept.js",
    description: "Accept a reviewed task: merge the agent's draft, mark done.",
  },
  {
    name: "tasks-reject",
    script: "apps/tasks/workflows/reject.js",
    description: "Send a reviewed task back to the queue with feedback.",
  },
  {
    name: "tasks-cancel",
    script: "apps/tasks/workflows/cancel.js",
    description: "Cancel a task and discard the agent's draft.",
  },
];
for (const registration of registrations) {
  await workflows.call(ctx, "register", {
    name: registration.name,
    script_path: registration.script,
    description: registration.description,
    input: { type: "object", properties: { taskId: { type: "string" }, feedback: { type: "string" } } },
    ...(registration.cron ? { triggers: { cron: registration.cron } } : {}),
  });
  console.log(`✔ registered workflow ${registration.name}${registration.cron ? ` (cron ${registration.cron})` : ""}`);
}

// 3. Publish the bundle.
const published = await apps.call(ctx, "publish", {
  name: "tasks",
  title: "Tasks",
  description:
    "Lightweight task board (kanban, swimlanes, sprint) with agent assignees: agents work todo tasks in isolated drafts on a schedule and queue their results for one-click review.",
  dir: "apps/tasks",
  visibility: "private",
  workflows: ["tasks-agent-runner", "tasks-accept", "tasks-reject", "tasks-cancel"],
  allowed_tools: ["keyvalue.*", "notifications.*"],
  rate_limit: { rps: 10, burst: 30, daily: 2000 },
});
console.log("✔ published:", JSON.stringify((published as { app?: { name?: string } }).app?.name ?? published));

if (args.validate === false) {
  console.log("✔ done (validation skipped)");
  process.exit(0);
}

// 4. Validate the review loop WITHOUT an LLM: simulate the runner's draft
//    work with the same native calls it makes, then drive accept end-to-end.
const sessions = CORE_SERVICES["sessions"]!;
const notifications = CORE_SERVICES["notifications"]!;

const now = new Date().toISOString();
const task = {
  id: "seedcheck",
  title: "Seed validation task",
  status: "todo",
  assignee: { type: "agent", provider: "synthetic.new" },
  createdAt: now,
  updatedAt: now,
} as Record<string, unknown>;
await invokeTool(ctx, "keyvalue", "set", { key: "task:seedcheck", value: task });

// The runner's moves, made natively: isolated draft + staged deliverable.
const created = (await sessions.call(ctx, "create", {
  title: "Agent: Seed validation task",
  mode: "staged",
})) as { session: { id: string } };
await invokeTool(ctx, "vfs", "write", {
  path: "apps/tasks/output/seedcheck.md",
  content: "# Seed validation deliverable\n",
  session: created.session.id,
});
task["status"] = "in_review";
task["sessionId"] = created.session.id;
await invokeTool(ctx, "keyvalue", "set", { key: "task:seedcheck", value: task });
const emitted = (await notifications.call(ctx, "emit", {
  category: "decision",
  title: "Task ready for review: Seed validation task",
  widget: {
    path: "apps/tasks/widgets/review-card.tsx",
    data: { taskId: "seedcheck", title: "Seed validation task", summary: "Validation run." },
  },
  choices: [
    {
      label: "Accept & merge",
      call: {
        namespace: "workflows",
        procedure: "run",
        args: { name: "tasks-accept", input: { taskId: "seedcheck" } },
      },
    },
  ],
})) as { notification: { id: string } };
console.log("✔ review notification emitted");

// Live tree must NOT have the deliverable yet (isolation).
const before = await store.read(workspaceId, "apps/tasks/output/seedcheck.md").catch(() => undefined);
if (before) throw new Error("isolation broken: draft content visible in the live tree");

// The notification's accept choice, dispatched exactly as the drawer would.
const accepted = (await invokeTool(ctx, "workflows", "run", {
  name: "tasks-accept",
  input: { taskId: "seedcheck" },
})) as { result?: { ok?: boolean } };
if (!(accepted.result?.ok ?? (accepted as { ok?: boolean }).ok)) {
  console.log("accept result:", JSON.stringify(accepted));
}

const after = await store.read(workspaceId, "apps/tasks/output/seedcheck.md").catch(() => undefined);
if (!after || !after.content.includes("Seed validation deliverable")) {
  throw new Error("accept did not merge the draft into the workspace");
}
const doneTask = (await invokeTool(ctx, "keyvalue", "get", { key: "task:seedcheck" })) as {
  value: { status?: string };
};
if (doneTask.value?.status !== "done") throw new Error("task not marked done");
console.log("✔ accept merged the draft and closed the task (status: done)");

// Clean up the validation task + deliverable (keep the app), and mark the
// validation's own notifications seen so nothing stale lingers in the feed.
await invokeTool(ctx, "keyvalue", "delete", { key: "task:seedcheck" });
await store.remove(workspaceId, "apps/tasks/output/seedcheck.md");
await notifications.call(ctx, "seen", { id: emitted.notification.id }).catch(() => undefined);
const mine = (await notifications.call(ctx, "list", {})) as {
  notifications: Array<{ id: string; title: string }>;
};
for (const record of mine.notifications) {
  if (record.title.includes("Seed validation task") || record.title === "Task done: Seed validation task") {
    await notifications.call(ctx, "seen", { id: record.id }).catch(() => undefined);
  }
}

console.log(`✔ done — Tasks app live for ${workspaceId} (chat sidebar → Apps → Tasks; board: apps/tasks/index.tsx)`);
