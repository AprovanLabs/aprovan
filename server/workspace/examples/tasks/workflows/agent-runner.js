// Tasks agent runner — cron-triggered. Picks up "todo" tasks with an agent
// assignee, runs each one in an ISOLATED VCS draft session (nothing touches
// the workspace), iterates the agent's LLM until it declares done, then
// moves the task to in_review and emits a decision notification rendered by
// the app's own review-card widget, with one-click choices that call this
// app's accept / reject / cancel workflows.
//
// Namespaces are importable typed modules — the same convention widgets
// use. The one dynamic lookup is the agent's LLM provider (chosen per task
// at runtime), which resolves through the injected provider globals.
import keyvalue from "keyvalue";
import sessions from "sessions";
import vfs from "vfs";
import notifications from "notifications";
import agents from "agents";

export default async function run() {
  const listing = await keyvalue.list({ prefix: "task:" });
  const queue = [];
  for (const key of listing.keys) {
    const hit = await keyvalue.get({ key });
    const task = hit && hit.value;
    if (task && task.status === "todo" && task.assignee && task.assignee.type === "agent") {
      queue.push({ key, task });
    }
  }

  const results = [];
  // Bounded per tick: the script budget is 180s and each task costs LLM calls.
  for (const entry of queue.slice(0, 2)) {
    const task = entry.task;
    // The assignee is either inline {provider, model, prompt} or a named
    // agent profile ({agent: "docs-writer"}, agents service) — the profile
    // wins where set, inline fields fill the gaps.
    let agent = task.assignee;
    if (agent.agent) {
      try {
        const resolved = await agents.get({ name: agent.agent });
        agent = { ...agent, ...resolved.agent, ...(agent.model ? { model: agent.model } : {}) };
      } catch (err) {
        results.push({ id: task.id, skipped: "agent profile " + agent.agent + " not found" });
        continue;
      }
    }
    const providerId = String(agent.provider || "synthetic.new");
    // Providers are injected globals; dotted ids also have sanitized aliases.
    const llm =
      globalThis[providerId] || globalThis[providerId.replace(/[^A-Za-z0-9_]/g, "_")];
    if (!llm || !llm.createChatCompletion) {
      results.push({ id: task.id, skipped: "provider " + providerId + " not available" });
      continue;
    }

    // Isolation: one draft session per run — the agent's writes live in the
    // draft's overlay until a human accepts.
    const created = await sessions.create({ title: "Agent: " + task.title, mode: "staged" });
    const session = created.session;
    task.status = "in_progress";
    task.sessionId = session.id;
    task.updatedAt = new Date().toISOString();
    await keyvalue.set({ key: entry.key, value: task });

    const outputPath = "apps/tasks/output/" + task.id + ".md";
    const transcript = [
      {
        role: "system",
        content:
          "You are an autonomous task agent. Complete the task and reply with the deliverable as Markdown. " +
          "When the work is fully complete, end your reply with a line reading exactly 'STATUS: DONE'." +
          (agent.prompt ? "\n\n" + agent.prompt : ""),
      },
      {
        role: "user",
        content:
          "Task: " +
          task.title +
          (task.description ? "\n\n" + task.description : "") +
          (task.feedback && task.feedback.length
            ? "\n\nFollow-up feedback from review:\n- " + task.feedback.join("\n- ")
            : ""),
      },
    ];

    let summary = "";
    for (let round = 0; round < 2; round++) {
      const completion = await llm.createChatCompletion({
        messages: transcript,
        ...(agent.model ? { model: agent.model } : {}),
      });
      const reply =
        (completion &&
          completion.choices &&
          completion.choices[0] &&
          completion.choices[0].message &&
          completion.choices[0].message.content) ||
        "";
      summary = reply.replace(/\n?STATUS: DONE\s*$/, "").trim();
      await vfs.write({ path: outputPath, content: summary + "\n", session: session.id });
      if (/STATUS: DONE/.test(reply)) break;
      transcript.push({ role: "assistant", content: reply });
      transcript.push({
        role: "user",
        content: "Continue until the task is complete. End with 'STATUS: DONE' when finished.",
      });
    }

    task.status = "in_review";
    task.updatedAt = new Date().toISOString();
    await keyvalue.set({ key: entry.key, value: task });

    await notifications.emit({
      category: "decision",
      title: "Task ready for review: " + task.title,
      body: "The agent finished and parked its work in a draft — nothing changes until you decide.",
      widget: {
        path: "apps/tasks/widgets/review-card.tsx",
        data: {
          taskId: task.id,
          title: task.title,
          agent: { provider: providerId, model: agent.model },
          outputPath: outputPath,
          summary: summary.slice(0, 800),
          sessionTitle: "Agent: " + task.title,
        },
      },
      choices: [
        {
          label: "Accept & merge",
          description: "Apply the agent's draft to the workspace and mark the task done",
          call: {
            namespace: "workflows",
            procedure: "run",
            args: { name: "tasks-accept", input: { taskId: task.id } },
          },
        },
        {
          label: "Send back",
          description: "Queue the task again — add follow-up notes on the Tasks board first",
          call: {
            namespace: "workflows",
            procedure: "run",
            args: { name: "tasks-reject", input: { taskId: task.id } },
          },
        },
        {
          label: "Cancel task",
          description: "Discard the draft and cancel the task",
          call: {
            namespace: "workflows",
            procedure: "run",
            args: { name: "tasks-cancel", input: { taskId: task.id } },
          },
        },
      ],
      link: { kind: "open-merge", sessionId: session.id },
    });

    results.push({ id: task.id, session: session.id, status: "in_review" });
  }

  return { processed: results, queued: queue.length };
}
