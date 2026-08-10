# IW-9 — App-First Platform (orchestrator brief)

_2026-08-09. Product of a five-audit investigation (app model, VCS/sessions,
Cloudflare OS, Cloudflare product APIs, block/buzz) plus an 18-question
decision grill. Every decision below is settled; do not re-litigate without
new evidence. Each Wave-1+ stream should be elaborated into a full OpenSpec
change (`openspec-propose`) before implementation; this document is the
authority on scope, ordering, and invariants._

## Mission

Make **apps** the product. A workspace is a file tree plus an `Apps/` tree;
users (and agents) create, promote, install, and share apps that replace
enterprise software — validated end-to-end by two flagship apps: **Chat**
(Slack replacement) and **Document** (Markdown-first, live cursors). The
platform's differentiators: data ownership users can verify (hosted vs
managed), capability security that is visible (one review surface), version
control that is legible (diffs, lineage, undo), and 68+ providers behind one
namespace model.

Product name: **Aprovan Workspace** (`aprovan.com/workspace`; `/chat` is
renamed with a permanent redirect). "Workspace" remains the tenancy noun and
the current-pane noun; a future **organization** level may own multiple
workspaces (out of scope, do not preclude).

## Platform invariants (named once, enforced everywhere)

Existing, kept:

- **capability = namespace; tenancy = workspace; transport = tools proxy.**
- **Files are authored; records are accumulated.**

New, established by IW-9:

1. **Identity follows the credential.** Three credential levels: workspace
   token (static secret), workspace OAuth (shared bot identity), user OAuth
   (acts as that person). The credential level decides who executes, who
   approves the grant, who pays, and who the audit row names. Approval
   follows the credential: workspace-level → admin approves once for the
   space; user-level → each user connects and approves for themselves.
2. **Grants intersect, never union.** A profile, an app allow-list, or a
   hosting relationship can only narrow the invoker's authority. Nothing
   gains capability by indirection.
3. **Authority is derived at run time, never snapshotted.** A standing
   workflow/agent/schedule executes with its owner's *current* standing;
   owner leaves → their standing automations deactivate (cascading
   revocation; cf. buzz NIP-AA). Never copy authority at save time.
4. **Access follows the principal.** A user's agents inherit that user's
   access. Apps are separate principals and need grants. A publisher reaches
   non-participant data only via the gated, audited `apps.data` path.
5. **Hosted vs managed is the only user-facing data question.**
   *Managed* = data lives in a space you belong to (enforced: readable,
   exportable, deletable by you). *Hosted* = data lives in someone else's
   space (everything they claim is a promise; *who* hosts — publisher or
   instance creator — is a displayed fact, not a mode). Managed shared data
   requires every participant to be a member of the hosting workspace.
6. **Payload-widget / shell-decision.** In any approval/review/notification
   surface, the shell (trusted chrome) renders who-is-asking, the
   capability, the credential, and the action buttons; an app-supplied
   sandboxed widget may render only the payload (diff, message preview).
   Widget edits re-render the shell summary; approval applies to what the
   shell last displayed. No widget → generic card fallback.
7. **Topic keys route; they never authorize.** Authorization is re-applied
   at every fan-out path (in-process and future bus).
8. **Search and indexes are never the access boundary.** Queries return ids;
   canonical rows are refetched through tenant-scoped access checks.
9. **Anonymous may read link-shared files. Nothing else, ever.** No
   anonymous records, writes, workflow calls, or partitions.
10. **Immutable at creation:** workspace `locus`, workspace region, an
    install's data-hosting mode. Changing any is export/import, not a flag.
11. **Agents propose; people instantiate.** An agent may draft an app,
    agent profile, or install for owner review; it cannot self-provision.

## Decisions register (compact)

| # | Decision |
|---|---|
| D1 | Tenancy = workspace. Personal workspace is the default landing; group app instances host in the creator's **personal** space by default, deliberate choice otherwise. |
| D2 | Data hosting: app declares supported modes (like `requires[]`); user picks at install when >1; single-mode apps skip the prompt. Publisher-hosted is allowed but rendered loudly. |
| D3 | App identity: platform-assigned global **ULID** on first sight of a new app root. `app.yaml` (YAML — line-oriented, comment-able, merge-friendly) holds human/agent-authored fields: slug, title, icon, description, capabilities, requires, host modes. Platform-owned record `svc#apps/<appId>` holds identity/derived state and is never hand-written. `appId` never appears in `app.yaml`. |
| D4 | Slugs: directory name = vanity slug; rename = `mv`. Workspace-unique by default; optional global claim for published apps. Slugs shaped like ULIDs (26 Crockford base32 chars) are rejected. |
| D5 | URLs — canonical: `/a/<appId>`, `/w/<wsId>/a/<installId>`. Vanity: `/a/<globalSlug>`, `/w/<wsSlug>/a/<slug>`. Convenience `/apps/<slug>` is **always a 302** to canonical. No region in URLs. Public app URLs must not leak workspace ids. |
| D6 | Apps must have icons: custom, or first-letter + color hashed from the slug. |
| D7 | Personal app: real app row (not synthesized) that owns one-off widgets/flows. **Promote-out is a first-class operation** (move VFS subtree + assign id + re-point slug). |
| D8 | Install = **copy** of the app archive (manifest + folder) into the installer's workspace, pinned; updates surface as "v3 available → copy again". Publisher push-to-all is deliberately given up. Releases/channels machinery collapses into VCS refs (D10). |
| D9 | Capability ceiling declared in `app.yaml` (coarse); **resource introduction** is just-in-time via non-blocking cards (narrow). Static analysis of app code proposes the ceiling; agent/user confirms one install card. |
| D10 | App-level VCS: commits scoped to an app root on `app/<id>` refs. A release = a tagged commit; an archive = a commit + `app.yaml`; per-file history and `releases.ts` (~350 LOC) are deleted in favor of it. |
| D11 | Sessions: `auto` stays default and becomes **answerable** (`diff(base, main)` + one-click `vcs.restore` undo). Staging triggers: user request, review-required policy, or CRDT/agent write conflict (conflict flips the session to a draft; resolve on manual save). No approve-before-everything. |
| D12 | Approvals: grant-time, keyed **(capability, resource)**, remembered. Explicit `ask` step available to workflows; app policy may declare always-ask action classes; workspace tightens, never loosens. Out-of-grant resource → action **queues** (exception path) instead of failing. Queued actions: fire-and-forget chains continue on ack; result-dependent chains end the turn ("queued N actions"). **No simulated results. No undo for actions.** |
| D13 | Effect classification: generated providers derive observation/action from HTTP method (GET/HEAD → observation); handwritten providers and core services are annotated. Prerequisite for D12. |
| D14 | Agent loop: **server-side wins.** Chat drives `agents.run`; client loop, per-namespace prompt-pasting, and `llm-jobs.ts` special-casing dissolve. Tool exposure = one `call_tool` + on-demand `describe(namespace)`. |
| D15 | Agents: workspace-level. Apps may ship agent profiles (`<app>/<agent>`) bounded by the app's grants. Approvals from a run go to the **invoker's** queue. |
| D16 | Realtime: in-memory broker stays; sharding deferred. Broker spec hardened now (see F5). Wave-2 destination: scoped-topic bus (measured 64× irrelevant-delivery reduction pattern), then actor-per-topic once a runtime interface exists. |
| D17 | CRDT: **Yjs** (awareness protocol = cursors; `y-codemirror.next`; `Y.Map`/`Y.Array` needed by future sheets/slides). Compaction/snapshot strategy is part of the Document spec. |
| D18 | Documents: Markdown-first. Yjs doc is live truth; `.md` materialized on quiesce; agent whole-file writes reconciled as diff→CRDT transactions; unresolvable conflict → draft session. Slides/sheets deferred (plan below). |
| D19 | Mounts: apps never mount apps. Shared content = a shared VFS backend (GitHub repo, S3, local dir) both parties mount. Revive `vcs/mounts.ts` (721 LOC, currently unreachable) with procedures + UI. App→app **calls** deferred. |
| D20 | Sharing: `visibility` (installable) is split from artifact sharing (viewable). `vfs` grows person- and link-sharing; share keys stored HMAC-hashed; expiry + revocation from day one. |
| D21 | Region: workspace pinned at creation (US only now), immutable. Data follows the host + disclosure; workspace policy `requireSameRegion` may block cross-region participation. `locus: local` has region `undefined`. Edge needs a ws→region lookup (no region in URL). |
| D22 | Economics: you pay for what runs under your credential. Host pays storage + app-workflow execution; invoker pays LLM/agent spend. Host sets a per-instance storage cap, sees per-instance size, and may delete an instance. |
| D23 | Cloudflare providers (order): `llm→workers-ai + ai-gateway` (trivial, OpenAI-compatible; AI Gateway also feeds cost attribution), `vfs→r2` (reuse s3 module), `sql→d1`, new `browser` contract → browser-run (REST + remote CDP), `events→queues`. Defer a `vectors` contract until a second implementation is named. DO/Dynamic Workers are binding-only: any future runtime provider uses the self-deployed **bridge Worker** pattern (cf. existing `cloudflare/sandbox`). |
| D24 | Buzz: lift `MessageTimeline` + scroll-anchoring hooks + patched `virtua` (Apache-2.0); read `e2eBridge.ts` as the backend-adapter spec; do NOT adopt Nostr, their composer, or the relay. |

## Change set and dependency graph

```
WAVE 0 (parallel, small)      WAVE 1 (parallel)         WAVE 2 (parallel)     WAVE 3
F1 vcs-scoping-params ──────► A app-vcs-consolidation ─┐
F2 shared-partition ────┬───► B app-model-app-centric ─┼─► CHAT flagship ────► DOC  Markdown
F3 credential-levels ───┼─┐   D agent-loop-server ─────┼─► C capability-      Document
F4 app-identity ────────┘ └─────────────────────────►──┘    approval          (Yjs)
F5 broker-spec ─────────────────────────────► CHAT
F6 cleanup+rename  (fully parallel, no shared files)
```

## Cross-repo coordination (aprovan ↔ registry)

All planning artifacts live in **aprovan** (`openspec/changes/iw9-*`), even
when tasks target the registry repo. An orchestrating agent manages both
checkouts side by side:
`/Users/jacob/Documents/Code/AprovanLabs/aprovan` (product: gateway
`server/workspace`, web client, desktop, `packages/native|editor|ui|registry-ui`)
and `/Users/jacob/Documents/Code/AprovanLabs/registry` (execution plane:
`packages/registry-server`, `packages/bundler`, `packages/contracts`,
`packages/utdk/*`, `apps/registry`).

Hard rules (established repo policy — see registry/docs/platform.md and
IW-8 precedent):

1. **Cross-repo consumption is ONLY via published npm packages.** The
   registry repo must build standalone from a fresh clone; aprovan never
   imports registry sources directly, and vice versa.
2. **Publish before pin.** Registry-side work lands → package version
   publishes → aprovan bumps the pin in a separate commit. Never in one
   step, never reversed. `@aprovan/registry-server` pins must be `^0.2.7`
   or later (0.2.4–0.2.6 are deprecated-broken on npm).
3. **Tasks declare their repo.** Every tasks.md work stream carries
   `Repo: aprovan | registry | both` on its metadata line, and `Touches`
   globs are prefixed `aprovan/` or `registry/`. A `both` stream must
   sequence its registry tasks (and the publish) before its aprovan tasks.
4. **Grep-gates run in BOTH repos** for every deletion, regardless of which
   repo the deletion happens in.

Repo ownership per stream:

| Stream | aprovan work | registry work | Publishes |
|---|---|---|---|
| F1 | `server/workspace/src/vcs/*`, `native-dispatch.ts`, `routes/tools.ts`, `packages/native/src/vcs.ts` | — | — |
| F2 | `records.ts`, `apps/store.ts`, `apps/install.ts` | — | — |
| F3 | `credentials.ts`, `credential-store-adapter.ts`, `audit.ts` | `packages/registry-server/src/credentials/*` (resolution honors levels) | `@aprovan/registry-server` |
| F4 | `apps/identity.ts`, app.yaml loader, `routes/live-apps.ts` | — | — |
| F5 | `realtime/*` | — | — |
| F6 | tests, `wire.ts` residue, deploy scripts, AGENTS.md, `/chat`→`/workspace` | husk dirs (incl. `infra/cdk.out`), stale `docs/*.md` rewrite, AGENTS.md | — |
| A | `vcs/*`, `apps/releases.ts` (delete), `client/web`, `packages/editor`, `packages/registry-ui` | — | — |
| B | `apps/*`, `client/web` sidebar/sharing, mounts UI | — | — |
| D | `agents/runner.ts`, chat routes, `client/web/features/chat` | — | — |
| C | `grants.ts`, `profile-grants.ts`, `routes/tools.ts`, review surface | `packages/bundler` (effect from `http_method`), regenerate `@utdk/*` provider metadata, `registry-server` dispatch enforcement | `@utdk/*` regen, `@aprovan/registry-server` |
| Chat | app code + client | — | — |
| Doc | app code + client + `packages/editor` | — | — |
| (deferred) Cloudflare providers | — | `packages/utdk/cloudflare/*`, `packages/contracts/browser` | `@utdk/*` |

The two genuinely cross-repo streams are **F3** and **C**; both must state
their publish→pin sequence explicitly in tech-plan and tasks. F6 has
registry-side cleanup but no publish (docs/husks only).

Serialization rules (from audit evidence; violating these is how this
codebase acquired duplicate implementations twice):

- `apps/releases.ts` is **owned by A** (which deletes it). B consumes what A
  leaves. B does not touch it.
- `routes/tools.ts`: A's VCS schema changes land before C's grant-visibility
  work.
- `apps/store.ts` / `apps/service.ts` / `apps/capabilities.ts`: B owns in
  Wave 1; C rebases on B's landed manifest shapes in Wave 2 (capability
  declarations live in `app.yaml`, so C cannot precede B).
- Definition of done, every stream (MIGRATION-DEBT rule): *a task that says
  "delete X" is not done until `grep X` returns nothing in both repos.* Husk
  test: a workspace-glob directory with zero git-tracked files is build
  residue — delete it.

## Wave 0 — foundations

### F1 `vcs-scoping-params` (registry/aprovan: `server/workspace/src/vcs/`)
- [ ] `commitTree` gains `prefix?` and `ref?` params (store.ts:358-383 hardcodes `""` and `MAIN_REF`); thread through `visibleEntries`/`buildSnapshot`.
- [ ] Add `prefix` to the snapshot-id hash lines (store.ts:149-155 currently dedupes identical subtrees across scopes — wrong).
- [ ] `vcs.log`/`vcs.branches` stop hardcoding `main` (native-dispatch.ts:297,357); wire dead `listRefs` (store.ts:315-318).
- [ ] `vcs.commit/log/diff` tool schemas gain scope args (routes/tools.ts:278-342; copy `vcs.restore`'s shape at :361-380).
- [ ] Stop stripping hashes from `vcs.diff` wire output (native-dispatch.ts:349-353) — the client diff viewer needs them.

### F2 `shared-partition` (`records.ts`, `apps/store.ts`)
- [ ] New shared scope shape alongside `app#<id>#u#<sub>` (records.ts:16-18); ACL = the instance's participant list.
- [ ] New branch in `partitionAccess` (apps/store.ts:279-298) + snapshot-hiding rules (`hiddenDataPrefixes`).
- [ ] `apps.data*` admin mode for shared partitions (audited).
- [ ] Per-instance storage metering + host-set cap + instance delete (D22).
- [ ] Hosting mode recorded on the install record, immutable (invariant 10).

### F3 `credential-levels` (`credentials.ts`, identity store)
- [ ] `CredentialRecord` gains an owner/user dimension (currently none — verified).
- [ ] Three levels: `workspace-token` | `workspace-oauth` (bot identity) | `user-oauth`; resolution honors level; user-level credentials resolve per-invoker and fail closed when unconnected.
- [ ] Audit rows record `(user, via profile/app, credential level+id)` — shared-bot actions must remain attributable.

### F4 `app-identity` (`apps/identity.ts`, `apps/store.ts`, routes)
- [ ] `app.yaml` loader/validator (Zod-over-YAML); split: file = declarative (slug/title/icon/capabilities/requires/host-modes), record = identity/derived. Platform assigns ULID on first sight; hand-written duplicate/foreign ids are rejected at reconcile.
- [ ] Slug rules incl. ULID-shape rejection; global-claim registry for published apps.
- [ ] URL scheme D5: canonical + vanity + 302 convenience routes; kill workspace-id leak in public URLs (live-apps.ts serves `/apps/<wsId>/<name>` today).
- [ ] Icon field + letter/color fallback renderer (hash of slug).

### F5 `broker-spec` (spec + minimal code, `realtime/`)
- [ ] Spec (openspec change) with invariants: `onSubscribe` becomes async; namespace handlers hold no state (move presence maps behind a broker-owned store — presence.ts holds `ConnFocus`/`UserMembership` in-process today); no ordering/exactly-once assumptions; two backends selected by `locus`.
- [ ] Codify invariant 7 (topic keys route, never authorize) and the Wave-2 target: scoped topics `ws:<id>:topic`, refcounted dynamic subscribe.
- [ ] WebSocket backpressure: bounded outbound queue, separate priority control channel, batch flush, slow-client disconnect after N full-buffer events (buzz pattern).

### F6 `cleanup-and-rename` (no shared files with other streams)
- [ ] Fix 22 failing VCS tests (`vfs/*` → `vcs/*`): tests/vcs.test.ts, vcs-mount-lineage, vfs-mounts, vcs-interface, chat-sessions.
- [ ] Delete 19 husk directories (list in openspec/changes/MIGRATION-DEBT.md §B), incl. ~6.7 GB registry/infra/cdk.out.
- [ ] Purge `dataScope` residue: packages/ui/src/apps-store/wire.ts:370,412-413,519-520,953,1050-1051; stale comments in records.ts/runner.ts.
- [ ] Update stale docs: registry/docs/apps-and-workflows.md (pre-split model), registry/docs/vcs-and-sessions.md (surface section), or stamp DEPRECATED with pointer.
- [ ] AGENTS.md (both repos): refactor rule — delete replaced code in the same change; grep-gate definition of done; husk test.
- [ ] Bug: private-flow scripts world-readable — script files under paths any member reads via `vfs.*` while the registration is "creator-private" (workflows/store.ts:216). Decide + fix (route scripts under a guarded prefix or drop the privacy claim).
- [ ] Bug: `shareAllows` keys on mutable `app.name` (apps/store.ts:499) — rename breaks shares silently. Key on appId.
- [ ] Bug: `lib/vfs-commits.ts:47` fetches then discards change data.
- [ ] `aprovan.com/chat` → `aprovan.com/workspace`: CloudFront prefix, deploy scripts, SSM paths, permanent redirect.

## Wave 1

### A `app-vcs-consolidation`
Server: app-scoped commits on `app/<id>` refs (needs F1); `releases.ts` →
thin tag-pointer over commits, then deleted (~350 LOC with per-file
`apps.versions/version/restore`); mount lineage filtered to scope.
Client: first diff viewer (`@codemirror/merge` — CM6 already in
packages/editor); wire all six `vcs.*` verbs (five have zero callers);
one-click undo via `vcs.restore`; `auto` sessions answerable
(`diff(base, main)`, the doc-promised fallback that was never built);
`sessions.resolve` wired into MergeDialog (currently reimplemented
client-side, chooses blind — MergeDialog.tsx:220-282 shows neither version);
unify five change-list renderings + one symbol set; vocabulary: rename
`VcsPanel` ("Code host"), kill Git jargon leaks (SessionsPanel GitBranch
icon/"stage"; SandboxesPanel "uncommitted"), enforce SessionBar.tsx:5-9
no-hash rule (CommitMountedContent.tsx:58, versions.tsx:148 violate it).
Decide: session merge commits get real second parents `[mainHead,
sessionHead]` (closeSession currently emits single-parent).

### B `app-model-app-centric`
Root-per-app `Apps/` tree; `paths[]` extras migrate to mounts (D19; no
overlap validation exists today — add it); manifest = `app.yaml` (F4);
Personal app + first-class promote-out; install-as-copy (D8) replacing
serve-from-origin (`install.ts` reads origin at request time today);
hosted/managed declaration + install-time pick (D2) on the F2 partition;
visibility/sharing split + `vfs` person/link shares, HMAC keys, expiry,
revocation (D20); mounts revival: procedures + UI over `addMount`/
`removeMount` (zero callers today); sidebar IA: FILES + Apps (launcher with
icons), native surfaces demoted from the front door.

### D `agent-loop-server`
Chat drives `agents.run` (agents/runner.ts is the surviving loop); server
stream → client; rebuild `features/chat/*` transport, MessageParts tool
rendering, self-heal (becomes a traced, cost-ceilinged turn); delete
prompt-pasting (`TOOL_PROMPT_CAP_PER_NAMESPACE`) in favor of
`describe(namespace)` on demand; `llm-jobs.ts` folds into run records;
resumability (locked phone ⇒ run continues, client reattaches).

## Wave 2

### C `capability-approval`
Effect classification (D13: derive from `http_method` retained in
packages/bundler/src/client-api.ts:15; annotate handwritten + core);
resource-scoped grants (URL-pattern matcher ~100 LOC, cf. CF OS
`matchesResourceUrlPattern`); credential levels enforcement (F3);
install-card static analysis over app code → proposed ceiling; JIT
non-blocking cards (request ends turn, accept resumes); explicit
`ask` action + app always-ask policy; exception queue (out-of-grant
resource → queued, D12); **review surface** implementing invariant 6 across
queued actions / staged changes / merge conflicts / capability requests —
retrofit the same split onto notifications (widget body already exists:
notifications/service.ts:66); derived authority + cascading revocation
(invariant 3; deactivate standing automations on owner departure); agents
draft-don't-instantiate (invariant 11).

### CHAT flagship (app on the platform, not a service)
Data: shared partition (F2), hosted-by-creator (friends) + workspace-managed
(company) from one `app.yaml` (D2/D5). Realtime: broker + F5 backpressure;
presence/typing ephemeral (never stored); invites via existing `invites.*`;
guest role. UI: lift buzz `MessageTimeline` + anchoring hooks + patched
`virtua`; skip their composer; use `e2eBridge.ts` as the adapter spec.
Agents: ships `chat/summarize` profile bounded by app grants (D15).
Validates: memberships, guests, hosted/managed, shared partition, realtime,
grant levels, icons, install, URLs.

## Wave 3

### DOC `document-markdown`
Yjs doc per document; awareness = cursors/selections/names; materialize
`.md` on quiesce (agents read truth from VFS); agent `vfs.write` → diff →
CRDT transaction (reuse packages/editor diff.ts SEARCH/REPLACE machinery);
unresolvable conflict → session flips to draft, resolved via A's merge
surface on manual save (D11); compaction: periodic
`Y.encodeStateAsUpdate` snapshot + log prune (required in spec); doc
authority lives server-side (single Fargate task now; actor-per-doc when a
runtime interface exists — same convergence as the broker).

## Deferred (explicit, with owners-when-picked-up)

- **Slides/sheets** — plan: sheets first (cell-map LWW per cell + Y.Text in
  cells; HyperFormula for evaluation; SheetJS for `.xlsx`); slides later
  (element tree, LWW per property, `Y.Array` z-order); LibreOffice headless
  in the existing `sandbox` interface as the import/export conversion
  boundary only — never the live editor.
- **App→app calls** (consent edge, intersection rule, user-as-caller) — the
  mount answer covers code reuse now.
- **Runtime interface** (DO-shaped: named instance + private state + alarms
  + RPC) with `quickjs` default, `cloudflare/wfp` bridge-worker provider,
  `celld`/workerd when mature. Unblocks actor-per-topic broker and
  actor-per-doc.
- **Cloudflare providers** D23 (incremental catalog work, any time).
- **Multi-region** beyond pinning; **organizations** above workspaces;
  `vectors`/`memory`/`email` contracts; Cloudflare Artifacts as a `vcs`
  provider (closed beta — watch).

## Evidence index

Audit reports live in the session that produced this brief; key file:line
claims are embedded above. Cross-checks before building: app model —
`apps/store.ts`, `apps/install.ts`, `apps/capabilities.ts`; VCS —
`vcs/store.ts`, `vcs/chat-sessions.ts`, `native-dispatch.ts:277-370`;
realtime — `realtime/broker.ts`, `realtime/presence.ts`; credentials —
`credentials.ts`; docs known stale: `registry/docs/apps-and-workflows.md`,
`registry/docs/vcs-and-sessions.md`.
