// Tasks: accept a reviewed task — merge the agent's draft into the
// workspace (sessions.resolve keep-draft) and mark the task done.
import keyvalue from "keyvalue";
import sessions from "sessions";
import notifications from "notifications";

export default async function run(input) {
  const key = "task:" + input.taskId;
  const hit = await keyvalue.get({ key });
  const task = hit && hit.value;
  if (!task) throw new Error("Unknown task: " + input.taskId);

  let commit = null;
  if (task.sessionId) {
    const resolved = await sessions.resolve({
      id: task.sessionId,
      strategy: "keep-draft",
      message: "Tasks: accept “" + task.title + "”",
    });
    commit = resolved.commit || null;
  }

  task.status = "done";
  task.updatedAt = new Date().toISOString();
  await keyvalue.set({ key, value: task });

  await notifications.emit({
    category: "activity",
    title: "Task done: " + task.title,
    body: "The agent's draft was merged into your workspace.",
  });

  return { ok: true, taskId: task.id, commit: commit && commit.id };
}
