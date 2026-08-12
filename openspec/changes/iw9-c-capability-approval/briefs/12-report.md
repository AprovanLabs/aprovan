# Report: stream 12 — review surface API + notifications retrofit

**Status:** done  
**PR:** (see PR URL after open)  
**Branch:** `feat/iw9-c-review-surface`  
**Verify:** `pnpm --filter @aprovan/workspace test -- review-surface` — 8 passed

## What landed

| Task | Result |
|------|--------|
| 12.1 | `server/workspace/src/review-surface.ts` — `listReviewItems` composes queued actions, staged changes, merge conflicts (read-only peek), and pending capability cards into one filterable list + `badgeCount` |
| 12.2 | `ReviewItem.shell` built only from authoritative request/card/session data; `widget` is path/data only; `applyReviewPayloadEdit` re-renders resource summary without letting widget override capability/who/credential/decisions; `dispatchWidgetCall` → `evaluateDispatch` |
| 12.3 | `notifications/service.ts` — `projectNotification` (choices on shell); `dispatchNotificationWidgetCall` via `evaluateAppToolDispatch` / native+workflow surface; emit-time choice check uses the same predicate |
| 12.4 | Authority routing: workspace-token/oauth → admins (invoker sees read-only waiting); user-oauth + ask → invoker; optional `includeReadOnly` for admin peek |
| 12.5 | `tests/review-surface.test.ts` — 8 scenarios covering mixed queue, spoof, payload edit, generic card, notification deny, ask→invoker, workspace-cred→admins |

## `ReviewItem` wire shape (for stream 13)

```ts
type ReviewItemKind =
  | "queued-action"
  | "staged-change"
  | "merge-conflict"
  | "capability-request";

type ReviewDecision =
  | "approve" | "deny" | "release" | "discard" | "resolve" | "answer";

interface ReviewItem {
  id: string;                    // e.g. "queued-action:<uuid>"
  kind: ReviewItemKind;
  sourceId: string;              // underlying queued action / card / session id
  cardKind?: "install" | "jit" | "ask" | "draft";
  shell: {
    who: { user: string; app?: string; profile?: string };
    capability?: string;
    resource?: string;
    effect?: "observation" | "action";
    credential?: {
      level: "workspace-token" | "workspace-oauth" | "user-oauth";
      label: string;             // "Workspace secret" | "Workspace bot" | "Your account"
    };
    decisions: ReviewDecision[]; // empty when authority.readOnly
  };
  widget?: { path: string; data?: unknown };
  payloadFallback: unknown;      // generic card body when no widget
  expiresAt?: string;
  authority: {
    holder: "invoker" | "admins";
    invokerId: string;
    readOnly?: boolean;
  };
}

listReviewItems({
  workspaceId, viewer: { sub, role }, kind?, includeReadOnly?
}) → { items: ReviewItem[]; badgeCount: number }

applyReviewPayloadEdit(item, editedPayload) → ReviewItem
dispatchWidgetCall(req, options?) → DispatchDecision
```

### Notification projection (shared sandbox host)

```ts
projectNotification(record) → {
  id, shell: { who, title, body?, category, choices? },
  widget?, payloadFallback
}
dispatchNotificationWidgetCall({ principal, manifest, call, ... })
  → DispatchDecision
```

### Decisions by kind

| Kind | `shell.decisions` |
|------|-------------------|
| `queued-action` | `release`, `discard` |
| `capability-request` / install\|draft | `approve`, `deny` |
| `capability-request` / jit | `release`, `discard` |
| `capability-request` / ask | `answer` |
| `staged-change` | `approve`, `discard` |
| `merge-conflict` | `resolve` |

## Verify

```text
pnpm --filter @aprovan/workspace test -- review-surface
→ 8 passed
```

## Deviations

1. **Merge conflicts are a read-only peek** (`peekSessionConflicts`) — does not call `syncSession` (which rebases/mutates). Conflicts appear when main has moved under a staged overlay.
2. **Invoker waiting-for-admin** — workspace-credential items appear in the invoker's list as `readOnly` with empty `decisions` (badge excludes them); admins get the decidable copy. Matches UX pending-admin without putting decisions on the member.
3. **Admin read-only peek** of invoker-owned items is opt-in via `includeReadOnly: true` (default off so asks stay off the admin queue).
4. **No public `listQueuedActions`** — review-surface lists `svcScope("actions", "queue")` directly (action-queue had no list export; outside Touches).
5. **Native/workflow notification choices** still use the app surface helpers inside `dispatchNotificationWidgetCall`; provider tools go through `evaluateAppToolDispatch`. Emit-time validation uses the same entrypoint (replaced `choiceCallableByApp`).

## Unblocks

Stream 13: client `ReviewItemShell` + `PayloadWidgetHost` consume `ReviewItem.shell` / `widget` only; never feed widget output into decisions.
