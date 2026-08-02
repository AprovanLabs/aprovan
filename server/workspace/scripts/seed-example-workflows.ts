#!/usr/bin/env tsx
/**
 * seed-example-workflows.ts — write, register, and E2E-validate the example
 * workflows in a workspace, using the gateway's own store + runner modules
 * directly (no HTTP, no Cognito): the run resolves real workspace
 * credentials and hits real providers, exactly like a production run.
 *
 * Example: the daily GitHub status update. The script lives at
 * `scheduled/github-status.js` in the workspace VFS; the registration gives
 * it a daily cron. The run: GitHub (UTDK) → synthetic.new summary →
 * `status/AprovanLabs.md` written via the vfs namespace.
 *
 * Usage:
 *   cd apps/workspace   # so .env + SSM env resolve like gateway dev
 *   AWS_PROFILE=aprovan pnpm tsx ../../scripts/seed-example-workflows.ts \
 *     --workspace ws_jacob_personal \
 *     --user 512b45b0-d021-70e1-8b35-b8cb80a2a84b \
 *     [--validate]
 */

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
const { runWorkflowByName } = await import("../src/workflows/runner.js");

const { values: args } = parseArgs({
  options: {
    workspace: { type: "string" },
    user: { type: "string" },
    validate: { type: "boolean", default: false },
  },
  strict: true,
});

const workspaceId = args.workspace;
const userId = args.user;
if (!workspaceId || !userId) {
  console.error("Usage: seed-example-workflows.ts --workspace <id> --user <sub> [--validate]");
  process.exit(1);
}

const GITHUB_STATUS_SCRIPT = `// Daily AprovanLabs status update.
// Cron: once a day. GitHub (UTDK) -> synthetic.new summary -> VFS doc.
const org = "AprovanLabs";

const repos = await github.repos.listForOrg({ org, sort: "pushed", per_page: 5 });
const activity = [];
for (const repo of repos) {
  const commits = await github.repos.listCommits({ owner: org, repo: repo.name, per_page: 5 });
  activity.push({
    repo: repo.name,
    pushed_at: repo.pushed_at,
    open_issues: repo.open_issues_count,
    commits: commits.map((c) => ({
      sha: c.sha.slice(0, 7),
      message: c.commit.message.split("\\n")[0],
      author: c.commit.author && c.commit.author.name,
      date: c.commit.author && c.commit.author.date,
    })),
  });
}
console.log("collected activity for", activity.length, "repos");

// synthetic.new turns the raw activity into a structured Markdown doc.
const completion = await synthetic_new.createChatCompletion({
  messages: [
    {
      role: "system",
      content:
        "You write concise engineering status updates as Markdown. Structure: '# AprovanLabs status - <date>' title, then one '## <repo>' section per repository with a 1-2 sentence summary of its recent commits and the open issue count. No preamble, no closing remarks.",
    },
    {
      role: "user",
      content: "Write today's status update (" + (input && input.firedAt ? input.firedAt : new Date().toISOString()) + ") from this activity:\\n\\n" + JSON.stringify(activity, null, 2),
    },
  ],
});
const doc = completion.choices[0].message.content;

await vfs.write({ path: "status/AprovanLabs.md", content: doc, mimeType: "text/markdown" });
console.log("wrote status/AprovanLabs.md (" + doc.length + " chars)");
return { repos: activity.length, bytes: doc.length };
`;

const ctx = { workspaceId, userId };
const workflows = CORE_SERVICES["workflows"]!;
const store = getFsStore();

// 1. The workflow script is an ordinary workspace file under scheduled/.
await store.write(workspaceId, "scheduled/github-status.js", GITHUB_STATUS_SCRIPT, "text/javascript");
console.log("✔ wrote scheduled/github-status.js");

// 2. Register with a daily cron (13:00 UTC).
const registration = await workflows.call(ctx, "register", {
  name: "github-status",
  script_path: "scheduled/github-status.js",
  description:
    "Daily AprovanLabs GitHub status: recent activity summarized by synthetic.new into status/AprovanLabs.md",
  triggers: { cron: "0 13 * * *" },
});
console.log("✔ registered:", JSON.stringify(registration, null, 2));

// 3. E2E validation: run now against real credentials, then check the doc.
if (args.validate) {
  console.log("… running github-status end-to-end (GitHub + synthetic.new)");
  const run = await runWorkflowByName(ctx, "github-status", "manual", { firedAt: new Date().toISOString() });
  console.log(`run ${run.id}: ${run.status} in ${run.durationMs}ms`);
  for (const span of run.spans) {
    console.log(`  span ${span.namespace}.${span.procedure} ${span.ok ? "ok" : "FAIL"} ${span.durationMs}ms${span.error ? ` — ${span.error}` : ""}`);
  }
  for (const line of run.logs) console.log(`  log [${line.level}] ${line.message}`);
  if (run.error) console.error("  error:", run.error);

  const doc = await store.read(workspaceId, "status/AprovanLabs.md");
  if (run.status === "succeeded" && doc) {
    console.log("✔ status/AprovanLabs.md written — first lines:");
    console.log(doc.content.split("\n").slice(0, 8).map((l) => `    ${l}`).join("\n"));
  } else {
    console.error("✘ validation failed");
    process.exit(1);
  }
}
