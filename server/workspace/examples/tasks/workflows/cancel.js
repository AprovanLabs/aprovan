// Tasks: cancel a task — discard the agent's draft entirely and park the
// task in the canceled column.

export default async function run(input) {
  const key = "task:" + input.taskId;
  const hit = await tools.keyvalue.get({ key });
  const task = hit && hit.value;
  if (!task) throw new Error("Unknown task: " + input.taskId);

  if (task.sessionId) {
    try {
      await tools.sessions.close({ id: task.sessionId });
    } catch (err) {
      console.log("draft already closed: " + (err && err.message));
    }
  }

  task.status = "canceled";
  task.sessionId = null;
  task.updatedAt = new Date().toISOString();
  await tools.keyvalue.set({ key, value: task });

  return { ok: true, taskId: task.id };
}
