#!/usr/bin/env tsx
// Verify the Tasks acceptance run: hello-agents should be in_review with a
// draft session and a decision notification after the cron tick.
import { loadAprovanEnv, dotenv } from "@aprovan/node";
dotenv.config();
process.env["AWS_REGION"] ??= "us-east-2";
await loadAprovanEnv("prd", { overwrite: false });
const { getRecordStore } = await import("../src/records.js");
const { getFsStore } = await import("../src/fs-store.js");
const ws = "ws_jacob_personal";
const store = getRecordStore();
const hit = await store.get(ws, "ws", "task:hello-agents");
const task = hit?.value as { status?: string; sessionId?: string } | undefined;
console.log("task:", JSON.stringify(task));
const keys = await store.list(ws, "notify");
let reviewNotification: unknown = null;
for (const key of keys.reverse().slice(0, 20)) {
  const record = await store.get(ws, "notify", key);
  const value = record?.value as { title?: string } | undefined;
  if (value?.title?.includes("hello") || value?.title?.includes("Write a short welcome")) {
    reviewNotification = value;
    break;
  }
}
console.log("review notification:", reviewNotification ? "FOUND" : "not found");
if (task?.sessionId) {
  const session = await getFsStore().read(ws, `.services/chat/sessions/${task.sessionId}.json`);
  const parsed = session ? JSON.parse(session.content) as { status: string; overlay: Record<string, unknown> } : null;
  console.log("draft session:", parsed ? `${parsed.status}, ${Object.keys(parsed.overlay).length} staged file(s)` : "missing");
}
