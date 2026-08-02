/**
 * Tasks — a lightweight Jira/Linear on nothing but native services.
 *
 * Storage: one keyvalue record per task (`task:<id>`). Agents are ordinary
 * assignees ({ type: "agent", provider, model, prompt }) picked up by the
 * `tasks-agent-runner` workflow (cron), which runs each task in an isolated
 * VCS draft and reports back through a decision notification rendered by
 * this app's own review-card widget. Views: kanban, swimlanes by assignee,
 * and a flat sprint list.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
// Native namespaces are importable typed modules — same contract as UTDK
// provider SDKs (the compiler resolves these to the injected namespaces).
import keyvalue from "keyvalue";
// This app's own exported workflows answer on the `app` namespace, one method
// per export (`tasks-agent-runner` → `app.tasksAgentRunner`). There is no
// `workflows` namespace — and because `workflows` *is* a real npm package,
// importing it resolves 200 from the CDN and fails only at the call site.
import app from "app";

type Status = "todo" | "in_progress" | "in_review" | "done" | "canceled";

interface Assignee {
  type: "user" | "agent";
  name?: string;
  /** Named agent profile (agents service) — wins over the inline fields. */
  agent?: string;
  provider?: string;
  model?: string;
  prompt?: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  assignee?: Assignee;
  sessionId?: string;
  feedback?: string[];
  createdAt: string;
  updatedAt: string;
}

const COLUMNS: Array<{ id: Status; label: string; tint: string }> = [
  { id: "todo", label: "To do", tint: "bg-slate-100 dark:bg-slate-800" },
  { id: "in_progress", label: "In progress", tint: "bg-blue-50 dark:bg-blue-950" },
  { id: "in_review", label: "In review", tint: "bg-violet-50 dark:bg-violet-950" },
  { id: "done", label: "Done", tint: "bg-emerald-50 dark:bg-emerald-950" },
  { id: "canceled", label: "Canceled", tint: "bg-slate-50 dark:bg-slate-900" },
];

function assigneeLabel(assignee?: Assignee): string {
  if (!assignee) return "Unassigned";
  if (assignee.type === "agent") {
    return `🤖 ${assignee.agent || assignee.model || assignee.provider || "agent"}`;
  }
  return assignee.name || "Me";
}

function TaskCard({
  task,
  onMove,
  onFeedback,
}: {
  task: Task;
  onMove: (task: Task, status: Status) => void;
  onFeedback: (task: Task) => void;
}) {
  return (
    <div className="rounded-md border bg-white dark:bg-slate-900 p-2 text-sm shadow-sm space-y-1.5">
      <p className="font-medium leading-snug">{task.title}</p>
      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>
      )}
      <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
        <span
          className={`rounded-full px-1.5 py-0.5 ${
            task.assignee?.type === "agent"
              ? "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          {assigneeLabel(task.assignee)}
        </span>
        {task.feedback && task.feedback.length > 0 && (
          <span className="text-amber-600">{task.feedback.length} follow-up</span>
        )}
        {task.sessionId && task.status === "in_review" && (
          <span className="text-violet-600">draft ready</span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <select
          className="flex-1 rounded border bg-transparent px-1 py-0.5 text-[11px]"
          value={task.status}
          onChange={(event) => onMove(task, event.target.value as Status)}
        >
          {COLUMNS.map((column) => (
            <option key={column.id} value={column.id}>
              {column.label}
            </option>
          ))}
        </select>
        <button
          className="rounded border px-1.5 py-0.5 text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => onFeedback(task)}
          title="Add follow-up feedback for the assignee"
        >
          +note
        </button>
      </div>
    </div>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<"kanban" | "swimlanes" | "sprint">("kanban");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeType, setAssigneeType] = useState<"user" | "agent">("user");
  const [agentProfile, setAgentProfile] = useState("");
  const [provider, setProvider] = useState("synthetic.new");
  const [model, setModel] = useState("");
  const [prompt, setPrompt] = useState("");

  const load = useCallback(async () => {
    const { keys } = await keyvalue.list({ prefix: "task:" });
    const loaded: Task[] = [];
    for (const key of keys) {
      const { value } = await keyvalue.get({ key });
      if (value && typeof value === "object") loaded.push(value as Task);
    }
    loaded.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    setTasks(loaded);
  }, []);

  useEffect(() => {
    void load();
    const timer = setInterval(() => void load(), 15_000);
    return () => clearInterval(timer);
  }, [load]);

  const saveTask = useCallback(async (task: Task) => {
    await keyvalue.set({ key: `task:${task.id}`, value: task });
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  }, []);

  const createTask = useCallback(async () => {
    if (!title.trim()) return;
    const now = new Date().toISOString();
    const task: Task = {
      id: Math.random().toString(36).slice(2, 10),
      title: title.trim(),
      description: description.trim() || undefined,
      status: "todo",
      assignee:
        assigneeType === "agent"
          ? {
              type: "agent",
              agent: agentProfile.trim() || undefined,
              provider,
              model: model.trim() || undefined,
              prompt: prompt.trim() || undefined,
            }
          : { type: "user", name: "Me" },
      createdAt: now,
      updatedAt: now,
    };
    await keyvalue.set({ key: `task:${task.id}`, value: task });
    setTitle("");
    setDescription("");
    setPrompt("");
    await load();
  }, [title, description, assigneeType, agentProfile, provider, model, prompt, load]);

  const moveTask = useCallback(
    (task: Task, status: Status) =>
      void saveTask({ ...task, status, updatedAt: new Date().toISOString() }),
    [saveTask],
  );

  const addFeedback = useCallback(
    (task: Task) => {
      const note = window.prompt("Follow-up feedback for this task:");
      if (!note?.trim()) return;
      void saveTask({
        ...task,
        feedback: [...(task.feedback ?? []), note.trim()],
        updatedAt: new Date().toISOString(),
      });
    },
    [saveTask],
  );

  const runAgents = useCallback(async () => {
    setBusy(true);
    setNotice(null);
    try {
      await app.tasksAgentRunner();
      setNotice("Agents kicked off — todo tasks with an agent assignee are being worked in isolated drafts.");
      await load();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }, [load]);

  const lanes = useMemo(() => {
    const byAssignee = new Map<string, Task[]>();
    for (const task of tasks) {
      const lane = assigneeLabel(task.assignee);
      byAssignee.set(lane, [...(byAssignee.get(lane) ?? []), task]);
    }
    return [...byAssignee.entries()];
  }, [tasks]);

  return (
    <div className="p-4 space-y-4 text-slate-900 dark:text-slate-100">
      <div className="flex items-center gap-2 flex-wrap">
        <h1 className="text-lg font-semibold">Tasks</h1>
        <div className="flex rounded-md border overflow-hidden text-xs">
          {(["kanban", "swimlanes", "sprint"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`px-2 py-1 capitalize ${
                view === mode ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : ""
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <button
          onClick={() => void runAgents()}
          disabled={busy}
          className="ml-auto rounded-md bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {busy ? "Running…" : "Run agents now"}
        </button>
      </div>

      {notice && <p className="text-xs text-slate-500">{notice}</p>}

      <div className="rounded-md border p-3 space-y-2 text-sm">
        <div className="flex gap-2 flex-wrap">
          <input
            className="flex-1 min-w-40 rounded border bg-transparent px-2 py-1"
            placeholder="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <select
            className="rounded border bg-transparent px-2 py-1"
            value={assigneeType}
            onChange={(event) => setAssigneeType(event.target.value as "user" | "agent")}
          >
            <option value="user">Assign: me</option>
            <option value="agent">Assign: agent</option>
          </select>
          <button
            onClick={() => void createTask()}
            className="rounded-md bg-slate-900 px-3 py-1 text-xs font-medium text-white dark:bg-slate-100 dark:text-slate-900"
          >
            Add
          </button>
        </div>
        <input
          className="w-full rounded border bg-transparent px-2 py-1 text-xs"
          placeholder="Description (optional)"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        {assigneeType === "agent" && (
          <div className="flex gap-2 flex-wrap text-xs">
            <input
              className="rounded border bg-transparent px-2 py-1"
              placeholder="Agent profile (optional)"
              value={agentProfile}
              onChange={(event) => setAgentProfile(event.target.value)}
              title="Name of a workspace agent profile — its provider, prompt, and permission grants apply"
            />
            <input
              className="rounded border bg-transparent px-2 py-1"
              placeholder="Provider (e.g. synthetic.new)"
              value={provider}
              onChange={(event) => setProvider(event.target.value)}
            />
            <input
              className="rounded border bg-transparent px-2 py-1"
              placeholder="Model (blank = provider default)"
              value={model}
              onChange={(event) => setModel(event.target.value)}
            />
            <input
              className="flex-1 min-w-40 rounded border bg-transparent px-2 py-1"
              placeholder="Agent prompt (optional)"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />
          </div>
        )}
      </div>

      {view === "kanban" && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {COLUMNS.map((column) => (
            <div key={column.id} className={`rounded-md p-2 space-y-2 ${column.tint}`}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {column.label} · {tasks.filter((t) => t.status === column.id).length}
              </p>
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <TaskCard key={task.id} task={task} onMove={moveTask} onFeedback={addFeedback} />
                ))}
            </div>
          ))}
        </div>
      )}

      {view === "swimlanes" && (
        <div className="space-y-3">
          {lanes.map(([lane, laneTasks]) => (
            <div key={lane} className="rounded-md border p-2">
              <p className="mb-2 text-xs font-semibold">{lane}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {laneTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onMove={moveTask} onFeedback={addFeedback} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "sprint" && (
        <div className="space-y-1.5">
          {[...tasks]
            .sort(
              (a, b) =>
                COLUMNS.findIndex((c) => c.id === a.status) -
                COLUMNS.findIndex((c) => c.id === b.status),
            )
            .map((task) => (
              <div key={task.id} className="flex items-center gap-2 rounded-md border px-2 py-1.5 text-sm">
                <span className="w-24 shrink-0 text-[11px] uppercase tracking-wide text-slate-500">
                  {COLUMNS.find((c) => c.id === task.status)?.label}
                </span>
                <span className="flex-1 truncate">{task.title}</span>
                <span className="text-[11px] text-slate-500">{assigneeLabel(task.assignee)}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
