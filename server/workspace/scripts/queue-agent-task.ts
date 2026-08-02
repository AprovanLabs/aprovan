#!/usr/bin/env tsx
// One-off: queue a real agent task in a workspace for the Tasks app's cron
// runner to pick up (acceptance validation for the agent loop).
import { parseArgs } from "node:util";
import { loadAprovanEnv, dotenv } from "@aprovan/node";
dotenv.config();
process.env["AWS_REGION"] ??= "us-east-2";
await loadAprovanEnv(process.env["APROVAN_ENV"] ?? "prd", { overwrite: false });
const { getRecordStore } = await import("../src/records.js");
const { values: args } = parseArgs({
  options: { workspace: { type: "string" }, user: { type: "string" } },
  strict: true,
});
const ws = args.workspace ?? "ws_jacob_personal";
const now = new Date().toISOString();
const task = {
  id: "hello-agents",
  title: "Write a short welcome doc for the Tasks app",
  description:
    "Write a friendly ~200-word Markdown doc explaining how the Tasks app works (agents work todo tasks in isolated drafts on a schedule; you review and accept from a notification). Deliver the finished Markdown.",
  status: "todo",
  assignee: { type: "agent", provider: "synthetic.new" },
  createdAt: now,
  updatedAt: now,
};
await getRecordStore().set(ws, "ws", "task:hello-agents", task, args.user ?? "seed");
console.log(`queued task:hello-agents (todo, agent=synthetic.new) in ${ws} — the */15 cron picks it up`);
