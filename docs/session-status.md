# Platform session status

Working log for the cross-repo platform work (chat, registry, aprovan.com, core).
Updated as tasks land. Newest entries first.

## Round 12 — workspace telemetry, widget logs, agent grants (2026-07-26)

| # | Task | Status |
| --- | --- | --- |
| 1 | `telemetry` core service | done — OTel-shaped spans/logs in the record store (scope `telemetry`, 3-day TTL, Dynamo/SQLite parity): `emit` (batched, capped, app-stamped provenance), `query` (trace/source/path/runId/level/status filters), `traces` (grouped summaries). Native app namespace — apps read only their own stream. |
| 2 | Auto-instrumentation | done — every `/tools` dispatch and app-proxied call records a span (duration, status, error, `X-Telemetry-Source` attribution: widget path + sessionId + traceId); workflow runs mirror their outcome (root span + failed tool spans + warn/error console lines) next to their full run record; a run's *transition into* failure raises a warning notification carrying `{runId, traceId}`. |
| 3 | Widget runtime capture | done — the compiler's iframe bridge intercepts `console.*`, uncaught errors, and unhandled rejections (`widget-log` messages), and the HTTP proxy times every namespace call; the host buffers everything per widget path (`lib/telemetry.ts`) and ships console/errors to `telemetry.emit`. Browser-verified: mount failure + console lines landed in the store with path + per-mount traceId. |
| 4 | Logs section in the edit window | done — collapsible Logs panel (count + red "N problems" chip, Problems-only filter, stack expansion, clear) under the editor body; recent problems for the file are appended to AI edit prompts (`buildEditMessages` third arg). Browser-verified. |
| 5 | Agents can debug | done — `telemetry` documented in the chat prompt ("read this before guessing"); `telemetry_traces`/`telemetry_query` tools on the gateway MCP server; the failure notification's **Debug in chat** seeds the composer with the run's exact investigation prompt (browser-verified). |
| 6 | Agent profiles + unified grants | done — `agents` core service (`.services/agents/<name>.json`): `{provider, model, prompt, grants}` with `grants: {tools: patterns[], paths: [{prefix, access: ro\|rw}]}` (src/grants.ts — longest-prefix, deny-by-default once present, absent axes permissive). Enforced in the workflow dispatch path (`invokeTool`) and vfs read/write/delete/list; `workflows.run {agent}` / registration `agent` pins a run; the script sees the profile as the `agent` global; Tasks assignees can reference a profile. 232 gateway tests green. |

## Round 11 — workflow module contract (2026-07-25)

| # | Task | Status |
| --- | --- | --- |
| 1 | Default-export entrypoint | done — workflow scripts are ES modules: `export default async function run(input) {…}`; the sandbox's `transformWorkflowModule` rewrites the module shape into the QuickJS wrapper and hard-errors on scripts without a default export (no implicit `input` global, no bare trailing return). The typed input schema declared at `workflows.register` doubles as the manual-run form contract. |
| 2 | Importable native namespaces | done — `import keyvalue from "keyvalue"` (etc.) in workflow scripts, resolved to the injected namespace proxies; same convention the widget compiler already resolves, so widgets/workflows/notification widgets share one import story (notification payloads via `import notification from "notification"`, bound by the drawer). Generating agents see native namespaces as typed modules "exactly like UTDK provider SDKs" (prompt updated + reseeded). |
| 3 | Migration (no back-compat) | done — all four Tasks workflows + board + review card rewritten; all gateway test scripts converted (210 pass); local seed re-validated the accept flow through the real sandbox; prod: Tasks reseeded to ws_jacob_personal, old-style `scheduled/github-status.js` rewritten to the module contract in place, prompt reseeded. |

## Round 10 — local mode: the platform on a laptop (2026-07-25)

| # | Task | Status |
| --- | --- | --- |
| 1 | Backend parity audit | done — matrix in `registry/docs/local-mode.md`. STORE_BACKEND-switched with SQLite parity: fs, records/keyvalue/notifications/presence (incl. expiry), credentials, **audit (new SQLite backend, 30-day lazy purge)**. FS-backed services inherit. Multi-user plane (memberships/workspaces/users/invites/groups/permissions) deliberately not ported. |
| 2 | Auth-none session surface | done — `GET /session` / workspace selection short-circuit to the implicit `local` user + `Local workspace` (no Dynamo on the path); session tests pin the oidc path explicitly. |
| 3 | Runbook | done — `pnpm dev:local` (gateway) + `APROVAN_ENV=off GATEWAY_URL=… pnpm dev` (chat); credential add via `POST /credentials` curl. Live-validated: /session → local workspace, SQLite credential → `openai connected: true` in the picker, audit reads from SQLite, full chat surface functional. |

## Round 9 — notifications as a platform primitive; the Tasks acceptance app (2026-07-25)

| # | Task | Status |
| --- | --- | --- |
| 1 | Notifications core service | done — DynamoDB record store (scope `notify`; SQLite parity incl. read-time expiry), categories decision/warning/activity, per-user Seen (hidden by default, 10-day TTL via table `expiresAt`), per-user prefs (drawer gear, keyvalue-durable). Badge counts decisions+warnings only. |
| 2 | App permission model | done — app-emitted notifications are server-stamped `source.app`; choices validated at emit time against the app's own callable surface (403 otherwise — tested for provider/native/member-only escapes); clients dispatch app-sourced choices back through the app tool proxy. `notifications` joins the native app namespaces. |
| 3 | Widget notifications + native choices | done — `widget {path, data}`: builtin merge-conflict card; workspace paths compile in the sandbox with `NOTIFICATION` prepended. Choices are typed tool calls; merge conflicts offer one-click `sessions.resolve` (keep-draft / keep-workspace) + Review into the merge dialog. Browser-verified: one click completed a real merge. |
| 4 | Tasks app (E2E acceptance) | done — `examples/tasks` + `seed-tasks-app.ts`: kanban/swimlanes/sprint board on keyvalue, agent assignees (provider+model+prompt), cron runner works todo tasks in isolated draft sessions and queues decision notifications rendered by the app's own review widget with accept/send-back/cancel choices calling its exported workflows. Live in ws_jacob_personal; prod-validated (isolation held, accept merged); real-LLM cron run queued (task `hello-agents`). |

## Round 8 — edit-window regression fixes, composer collapse, nav trim (2026-07-25)

| # | Task | Status |
| --- | --- | --- |
| 1 | Edit window regression | done — the round-7 header placement of the model picker was broken (its popover opens upward → dropdown values rendered off-screen). Moved to a `composerControls` slot above "Describe changes…" (same placement it works in on the chat composer); Edit now lands in the **Code** view (`showPreview: false`) so the source is immediately visible. |
| 2 | Composer collapses with the chat | done — a collapsed dock hides the whole composer (input + picker + credential banner); sending isn't possible collapsed, and expanding restores it. |
| 3 | Header nav trim | done — chat page nav is Apps + Registry (aprovan Home and patchwork Chat self-link dropped); registry pages drop Home/Chat the same way (`RegistryHeader.registryNav` filter), keeping Apps/Registry + internal links. |

## Round 7 — edit-failure root cause, live progress, notifications, auto-sync (2026-07-25)

| # | Task | Status |
| --- | --- | --- |
| 1 | All AI edits failing ("search string mismatch") | done — root cause was NOT the PostHog prompt (the edit path builds its prompt client-side): `parseEditResponse` only read diffs from *fenced* code blocks, while the system prompt asks for RAW search/replace blocks — a model following the contract parsed as zero diffs. Fixed with a raw-marker fallback + multi-diff-per-fence + whitespace/indent-tolerant apply fallback + summary no longer leaks diff bodies. Verified with a parse/apply harness (raw, fenced-multi, re-indented, and genuinely-wrong cases). |
| 2 | No feedback during edits | done — staged progress ("Asking <provider> (model)…" → "Thinking through the change…" → "Writing edits…" → "Change N drafted"); reasoning deltas now pass through the completions job stream (gateway) and sse.ts `onReasoning`. |
| 3 | Selector placement | done — provider/model picker hidden when the chat is a collapsed strip; the same picker renders in the edit window header (`EditModal.headerControls`); placeholder composer text removed. |
| 4 | Notifications | done — workspace feed on the native events system (`notifications` channel; payload declares workspace/user scope, events' own userId attributes sender); bell + drawer with read state; wired to editor-draft outcomes, externally-changed tabs, and draft conflicts (Review opens the merge dialog). |
| 5 | Auto-sync | done — externally-modified preview tabs reload automatically (notification instead of the blocking Reload/Keep-local banner; self-writes suppressed via a recent-local-write window); open drafts auto-refresh their base every 20s, conflicts notify rather than interrupt. E2E-verified: outside change → tab self-refreshed; editor apply → drawer notification. |

## Round 6 — the widget editor rides the VCS (2026-07-25)

| # | Task | Status |
| --- | --- | --- |
| 1 | Edit drafts | done — opening the editor creates "Edit: <name>" (staged) and scopes editor saves to its overlay; the workspace never sees half-finished edits. Reuses the active chat's draft when one is open. |
| 2 | Apply on close | done — saved work applies as one commit on close (sync-first: if the workspace moved, the draft is kept for review instead of clobbering); `patchwork:edit-keep-draft` (checkbox in Chats) keeps changes as drafts instead. Never-saved drafts are deleted silently. E2E-verified: save+close → merged; close-unsaved → draft deleted. |
| 3 | Confirm on close | done — EditModal's unsaved-changes confirm now keys on the real project snapshot diff (manual edits count, not just AI edit history). |

## Round 5 — main-state model, lazy records, chat naming, delete (2026-07-25)

| # | Task | Status |
| --- | --- | --- |
| 1 | Main state by default | done — no session record until the user sends a message; the chip is just "Chat · ● Synced" (sync-state subscription over the offline journal + online events). New chat / apply / archive / delete all return to the main state. Drafts stay explicit. |
| 2 | Lazy records + LLM naming | done — first send creates the record (title = the message, non-blocking, stream starts immediately); after the first reply a small completion renames it (3–6 words, one-shot, never overwrites a user title). |
| 3 | Activity-only history | done — the Chats dialog lists only sessions with messages, plus open drafts / drafts with unapplied changes. |
| 4 | Delete | done — `sessions.delete` hard-deletes record + transcript + staged shadows; per-row trash with confirm in the dialog; deleting the active chat returns to main state. E2E-verified (UI click → server record gone). |

## Round 4 — plain-language sessions, AI merge, presence (2026-07-25)

| # | Task | Status |
| --- | --- | --- |
| 1 | No-Git terminology | done — the UI speaks "chat / draft chat / Apply to workspace / Get latest changes / Applied / Archived"; bases render as "workspace as of 2h ago" (`baseAt`), never hashes. Vocabulary table in `registry/docs/vcs-and-sessions.md` ("The words users see"). |
| 2 | AI-assisted merge | done — apply refreshes from the workspace first; files changed in two places open MergeDialog: "Keep my draft's version / Keep the workspace version / Combine with AI" (model merges + surfaces ≤3 plain notes). Keep-workspace = new `sessions.discard`. E2E-verified in the browser (conflict → keep-workspace → clean apply). |
| 3 | Presence + live sync | done — `sessions.presence` heartbeats (record store, 30s TTL) → green "also here" chip; 8s hash-listing polls fire the watcher machinery so edits propagate across windows/users; parallel windows converge transcripts while idle. Polling is the transport v1; crdt mount + events signaling is the upgrade path. |

## Round 3 — VCS + chat sessions + chat-stream fix (2026-07-25)

Normative doc: `registry/docs/vcs-and-sessions.md`.

| # | Task | Status |
| --- | --- | --- |
| 1 | Chat "network error" on long generations | done — root cause: `/llm/:provider/chat` sent zero bytes until the provider stream opened; synthetic.new took 79s (CloudWatch), past CloudFront's 60s origin read timeout. Fix: job-backed chat (immediate UI-stream preamble + 15s keepalives + `x-llm-job` record) and a client resume wrapper (`lib/chat-transport.ts`) that finishes a dropped/stalled stream from the job record. Deployed (gateway + web). |
| 2 | VCS layer over the workspace FS | done — snapshots/commits/refs as hash manifests (`gateway/src/vcs/store.ts`); `vfs.commit/log/show/diff/branches/restore`, commit-pinned `read`/`list`. Free to create: the FS was already content-addressed. |
| 3 | Chat sessions as branches | done — `sessions` core namespace (create/list/get/messages/append/update/sync/close); staged overlays (`?session=` on `/fs` + vfs args), merge-to-main commits carrying `sessionId`, transcripts at `.services/chat/sessions/`. Chat client: SessionBar branch chip (mode, base short-hash, changed files), PR-style session list, new/close/reset, stage-to-main, update-from-main, `?session=` parallel windows, transcript restore on reload. E2E-verified against a scratch gateway. |
| 4 | VFS mounts | done — `vfs.mounts/mount/unmount`; git (GitHub at a pinned ref, workspace credential) + s3 (gateway role) read-through; read-only v1; crdt reserved (501). |

Gateway suite: 201 passing. Loose ends: hunk-level merge (conflicts are per-path), mount version tokens in snapshots, session-scoped OPFS cache (staged scope is online-only by design), `sessions.append` transcript growth is whole-file rewrite (fine at chat scale).

## Round 2 — feedback fixes + apps primitive (2026-07-19, complete)

| # | Task | Status |
| --- | --- | --- |
| 6 | aprovan.com/registry styling regression (prod) | done — root cause: a manual registry build without `PUBLIC_BASE_PATH=/registry` was deployed with SKIP_BUILD=1; assets pointed at `/_astro`. Redeployed via the script. |
| 7 | Chat dialog transparency over widgets; workflows → native group | done — heavier blurred scrim on dialogs; widget iframes now inherit the host theme (`.dark` propagated, image `setup(root, { darkMode })`); `workflows` added to ServicesMenu NATIVE_GROUPS. Deployed. |
| 8 | aprovan.com: waves hero, original tone, no red eyebrow, "Other projects" | done and deployed — **but see the repo note below**. |
| 9 | Chat: workflows explorer in left sidebar (first-party) | done — WorkflowsExplorer under the file tree: trigger icons, last-run dot, run-now, opens the shared panel. Deployed. |
| 10 | Example workflow: daily GitHub status cron | done — `scheduled/github-status.js` in ws_jacob_personal, registered `github-status` (cron `0 13 * * *` UTC). E2E-validated with real credentials: GitHub → synthetic.new summary → `status/AprovanLabs.md` (run succeeded, 8 spans). EventBridge minute tick provisioned (rule `registry-prd-use2-gateway-cron-tick`), so prod cron actually fires. |
| 11 | Apps primitive + LIIFT4 example | done — see below. Deployed. |

### ⚠ aprovan.com repo was reset by the user

While this session was interrupted, the aprovan.com repo was reset to its
original CRA history (`7dfd391 Remove unused infra code`); the Vite rebuild
and wave-hero commits are no longer in branch history. Respecting that, no
further changes or deploys were made to aprovan.com from this session. Note
the mismatch: **the live site at the aprovan.com root still serves the
rebuilt Vite version** (deployed before the reset). To put the original CRA
site back live, build it and sync to the bucket root; to recover the rebuilt
version, the orphaned commits are findable via `git reflog` ("Rebuild
aprovan.com as the Aprovan platform home", "Bring back the wave hero…").

### Apps primitive (task 11) — what shipped

- `apps` core service (publish/list/get/remove) — rides tool discovery, so
  chat can publish apps conversationally.
- Manifest: `{ name, title, widget_path, workflows[], allowed_tools[],
  roles { admins, access: any|listed, users }, rate_limit { rps, burst } }`
  at `.services/apps/<name>.json` in the owner workspace.
- Public surface `/apps/:ws/:name` (token auth, NO workspace membership):
  manifest, widget page (in-browser patchwork compile; calls proxied with
  the viewer's token), allow-list-gated tool dispatch, bundled-workflow runs.
- Per-(app, user) data partitioning via `ServiceContext.appScope` — keyvalue
  keys transparently scoped to `app:<app>:<sub>:…`; app-run workflows
  inherit the scope. Per-user token-bucket rate limits from the manifest.
- Gateway `{data, meta}` envelope now unwrapped in the patchwork compiler
  bridge, so widgets, playground scripts, and workflow scripts all see the
  same clean result shape.
- Example app: **LIIFT4 Tracker** (`registry/apps/gateway/examples/
  liift4-widget.tsx`) published to ws_jacob_personal as
  `apps/liift4/widget.tsx`; per-user isolation validated against the prod
  store (alice/bob/owner all distinct).
  Widget: https://aprovan.com/api/gateway/apps/ws_jacob_personal/liift4/widget
- Tests: `tests/apps.test.ts` (8) — publish/validate, manifest, partition
  isolation, allow-list denial, listed-access roles, per-user rate limits,
  app workflow runs. Full gateway suite green.

### Also in round 2

- `openrouter` added as an LLM chat-provider alias.
- Workflow runner: 180s script budget; dotted namespaces get sanitized
  aliases (`synthetic_new`) as script globals.

## Round 1 — shipped (2026-07-19)

- Widget style isolation: iframe mounts + patchwork-image-shadcn 0.1.2 (Play CDN
  config post-load fix). Deployed.
- Gateway: LLM aliases (synthetic.new et al) exposed + executable as tools. Deployed.
- aprovan.com rebuilt (Vite + @aprovan/ui), shared AppHeader across home/chat/registry
  (@aprovan/ui 0.3.1). Deployed. Incident: root deploy's S3 filter ordering deleted
  sibling app HTML; restored + script fixed (protective excludes last).
- Workflows engine in gateway (register/run/trace, webhook/cron/event triggers),
  shared WorkflowsPanel + TailorFlow (@aprovan/registry-ui 0.2.3), chat + registry
  integration. Deployed. Gateway tests green.
- Docs: registry/docs/platform.md (system map incl. apps), patchwork/docs/platform.md.

## Loose ends

- Git pushes not done anywhere (all commits local, by design).
- posthog MCP plugin needs OAuth (interactive session) before its tools work.
- Future apps work: credential grants across workspaces, app directory UI,
  admin cross-partition tooling, richer keyvalue queries.
