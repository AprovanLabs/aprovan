/**
 * `chat/summarize` — app-scoped agent helpers (iw9-chat-flagship stream 5).
 *
 * The profile itself is declared in `Apps/chat/app.yaml` and executed by
 * iw9-d's `agents.run` (CF-5). This module owns the Chat-side seams the
 * host uses around that run:
 *
 *   - canReadChannel-gated message reads for the invoked channel/thread
 *   - posting the summary through stream 1's `postMessage` with the
 *     agent-produced marker `{ profile: "chat/summarize", invoker }`
 *
 * No local agent loop or billing path — spend/approvals stay on D's
 * invoker-as-principal plumbing.
 */

import {
  fetchWindow,
  postMessage,
  type ChatScope,
} from "../../../server/workspace/src/apps/chat/service.js";
import type { Message } from "../../../server/workspace/src/apps/chat/schema.js";

/** Full profile address (`<slug>/<agent>`). */
export const SUMMARIZE_AGENT = "chat/summarize" as const;

/** Short agent name as declared in `app.yaml` `agents[].name`. */
export const SUMMARIZE_PROFILE_NAME = "summarize" as const;

/**
 * Canonical system prompt — keep in sync with `Apps/chat/app.yaml`
 * `agents[name=summarize].prompt`.
 */
export const SUMMARIZE_PROMPT =
  "You are chat/summarize. Summarize only the Chat channel or thread named " +
  "in the user input. Read messages from that channel alone — never list, " +
  "read, or mention other channels. Prefer the recent window; stay concise. " +
  "Return the summary as your final assistant message (markdown-lite). " +
  "The host posts it as an agent-attributed reply on behalf of the invoker.";

/**
 * Declared tool patterns (must stay ⊆ Chat's `capabilities` ceiling).
 * Reads only — the single write is {@link postSummaryMessage}.
 */
export const SUMMARIZE_TOOLS = ["records.get", "records.list"] as const;

export type SummarizeReadOpts = {
  /** Cap for `fetchWindow` (default 50). */
  limit?: number;
  /** Exclusive upper bound on message id (ULID). */
  before?: string;
  /**
   * When set, keep the root message (if present in the window) plus
   * replies whose `parentId` matches — one-level thread scope.
   */
  parentId?: string;
};

/**
 * Load messages the invoker may summarize. Authz is stream 1's
 * `canReadChannel` (via `fetchWindow`); restricted channels the invoker
 * cannot read fail closed as 404.
 */
export async function readMessagesForSummarize(
  scope: ChatScope,
  channelId: string,
  opts: SummarizeReadOpts = {},
): Promise<Message[]> {
  const limit = opts.limit ?? 50;
  const window = await fetchWindow(scope, channelId, {
    limit,
    ...(opts.before ? { before: opts.before } : {}),
  });
  if (!opts.parentId) return window;
  return window.filter(
    (m) => m.id === opts.parentId || m.parentId === opts.parentId,
  );
}

/**
 * Post the summary as an agent-produced message in the invoked channel /
 * thread. `invoker` is the participant who started `agents.run` (D22).
 */
export async function postSummaryMessage(
  scope: ChatScope,
  input: {
    channelId: string;
    body: string;
    parentId?: string;
    invoker: string;
  },
): Promise<Message> {
  return postMessage(scope, {
    channelId: input.channelId,
    body: input.body,
    ...(input.parentId ? { parentId: input.parentId } : {}),
    agent: { profile: SUMMARIZE_AGENT, invoker: input.invoker },
  });
}
