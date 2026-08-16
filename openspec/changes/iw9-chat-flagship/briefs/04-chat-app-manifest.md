# Brief: Chat app definition — `app.yaml`, host modes, capability ceiling

**Depends-on: 1 (merged); iw9-b landed** | Repo: aprovan | Wave 1 (parallel with 2)

## Mission

When you are done, `Apps/chat/app.yaml` declares slug `chat`, both host
modes, and a tight capability ceiling (own-partition records, own realtime
topic, instance invites, `agents.run` for summarize). Tests parse against
iw9-b's loader. If iw9-b does not yet prompt for >1 host mode, file a
blocking note — do not build a Chat-local install workaround.

**Prerequisite:** iw9-b app-model must be landed for the `app.yaml` grammar.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 5, 10
3. `openspec/changes/iw9-chat-flagship/prd.md` — One app.yaml, two modes
4. `openspec/changes/iw9-chat-flagship/tech-plan.md` — app.yaml illustrative fields; Platform-first findings
5. `openspec/changes/iw9-chat-flagship/specs/chat-app/spec.md` — Single manifest…
6. `openspec/changes/iw9-chat-flagship/ux.md` — host mode disclosure
7. `openspec/changes/iw9-chat-flagship/tasks.md` — stream 4
8. iw9-b / F4 `app.yaml` loader/validator; stream 2 topic grammar `app:<installId>`

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 4.1 Author `Apps/chat/app.yaml` against iw9-b's landed `app.yaml`
      grammar (F4): slug `chat`, icon, `hostModes: [workspace-managed,
      hosted-by-creator]`, capability ceiling limited to own-partition
      `records.*`, own-topic `realtime` subscribe/publish (`app:<installId>`
      from stream 2), instance-scoped `invites` issue (stream 3), and
      `agents.run` for the `chat/summarize` profile (stream 5) — spec
      `chat-app` "Single manifest, two host modes".
- [ ] 4.2 Confirm (do not implement — iw9-b's job) that installing with two
      declared host modes triggers the mode-choice prompt and that the
      chosen mode lands on the install record as immutable; if iw9-b's
      landed install flow does NOT yet prompt for >1 mode, file that gap as
      a blocking note here rather than building a Chat-local install-flow
      workaround (tech-plan "Platform-first with explicit findings").
- [ ] 4.3 New test file `tests/chat-app-manifest.test.ts`: `app.yaml` parses
      against iw9-b's loader/validator with no errors, capability ceiling
      matches the declared list exactly (no wildcard grants), both host
      modes present.

## Acceptance criteria

From `specs/chat-app/spec.md`:

#### Scenario: Install prompts for host mode
- **WHEN** a user installs Chat in any workspace
- **THEN** the install flow presents both host modes with the D2 disclosure
  copy and does not proceed until one is chosen
(platform behavior — confirm or file gap per 4.2)

#### Scenario: Hosted default is the creator's personal space
- **WHEN** a user chooses `hosted-by-creator`
- **THEN** the instance is created in the creator's personal space by
  default (D1), and choosing any other hosting space is a deliberate,
  visible selection — never silent

#### Scenario: Host mode cannot change after install
(enforced by F2/platform — assert in E2E stream 10)

Manifest parses; ceiling exact; both modes present (4.3).

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace exec vitest run tests/chat-app-manifest.test.ts
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/Apps/chat/app.yaml`, `aprovan/Apps/chat/README.md`, `aprovan/server/workspace/tests/chat-app-manifest.test.ts`
- No Chat-local install-flow workaround if iw9-b is incomplete — record finding.
- No wildcard capability grants.

## Report back

Check off tasks; PR or `briefs/04-report.md`; include 4.2 platform-gap note
if any; unblock streams 5/8/10.
