// Tasks: send a reviewed task back — the draft is archived (peekable, never
// merged), feedback is attached, and the task queues again for the runner.

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

  task.status = "todo";
  task.sessionId = null;
  task.feedback = (task.feedback || []).concat(
    input.feedback ? [String(input.feedback)] : ["Sent back from review — see board notes."],
  );
  task.updatedAt = new Date().toISOString();
  await tools.keyvalue.set({ key, value: task });

  return { ok: true, taskId: task.id, status: task.status };
}
