/**
 * Single constructor for `builtin:merge-conflict` notifications.
 * Summary + open-merge link only — no inline resolution choices.
 * Call-site migration from duplicated blobs lands in streams 4 and 6.
 */

import { publishNotification } from "@/lib/notifications";

export function publishConflictNotification(args: {
  sessionId: string;
  sessionTitle: string;
  conflicts: Array<{ path: string }>;
  /** Where the conflict arose — copy varies, structure does not. */
  origin: "draft-sync" | "draft-apply" | "chat-proposal";
}): void {
  const { sessionId, sessionTitle, conflicts, origin } = args;
  const count = conflicts.length;
  const fileLabel = count === 1 ? "a file" : `${count} files`;

  let title = "Some files changed in two places";
  let body = `Your workspace and the draft “${sessionTitle}” both changed ${fileLabel}.`;

  if (origin === "draft-apply") {
    title = "Editor changes need a decision";
    body = `Your workspace changed while you were editing — “${sessionTitle}” is kept as a draft.`;
  } else if (origin === "chat-proposal") {
    title = "Proposal conflicts with the workspace";
    body = `Applying “${sessionTitle}” hit conflicts on ${fileLabel}.`;
  }

  publishNotification({
    category: "decision",
    title,
    body,
    widget: {
      path: "builtin:merge-conflict",
      data: {
        sessionTitle,
        conflicts: conflicts.map((c) => ({ path: c.path })),
      },
    },
    link: { kind: "open-merge", sessionId },
  });
}
