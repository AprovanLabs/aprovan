// Tasks: cancel a task — discard the agent's draft entirely and park the
// task in the canceled column.
import keyvalue from "keyvalue";
import sessions from "sessions";

export default async function run(input) {
  const key = "task:" + input.taskId;
  const hit = await keyvalue.get({ key });
  const task = hit && hit.value;
  if (!task) throw new Error("Unknown task: " + input.taskId);

  if (task.sessionId) {
    try {
      await sessions.close({ id: task.sessionId });
    } catch (err) {
      console.log("draft already closed: " + (err && err.message));
    }
  }

  task.status = "canceled";
  task.sessionId = null;
  task.updatedAt = new Date().toISOString();
  await keyvalue.set({ key, value: task });

  return { ok: true, taskId: task.id };
}
