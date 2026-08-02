/**
 * Tasks review card — the notification widget the agent runner points at.
 * The notification's payload arrives as the `notification` module — the
 * drawer binds `import notification from "notification"` to the payload,
 * the same import convention as every namespace. Content only: the accept /
 * send-back / cancel actions are the notification's own choices, each a
 * one-click call to this app's exported workflows.
 */

import notification from "notification";

interface ReviewData {
  taskId?: string;
  title?: string;
  agent?: { provider?: string; model?: string };
  outputPath?: string;
  summary?: string;
  sessionTitle?: string;
}

export default function ReviewCard() {
  const data: ReviewData =
    typeof notification === "object" && notification !== null
      ? (notification as ReviewData)
      : {};
  return (
    <div className="p-3 text-sm space-y-2 text-slate-900 dark:text-slate-100">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-medium text-violet-700 dark:bg-violet-900 dark:text-violet-300">
          🤖 {data.agent?.model || data.agent?.provider || "agent"}
        </span>
        <span className="text-xs text-slate-500">finished “{data.title ?? "a task"}”</span>
      </div>
      {data.summary && (
        <div className="max-h-32 overflow-y-auto whitespace-pre-wrap rounded-md border bg-slate-50 p-2 text-xs dark:bg-slate-900">
          {data.summary}
        </div>
      )}
      <p className="text-[11px] text-slate-500">
        The work is parked in the draft “{data.sessionTitle ?? "Agent draft"}”
        {data.outputPath ? ` (deliverable: ${data.outputPath})` : ""} — nothing touches your
        workspace until you accept. Accept merges the draft; send-back queues the task again
        with your feedback; cancel discards the draft.
      </p>
    </div>
  );
}
