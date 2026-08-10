# Brief: Icon fallback shared function

## Mission

Create `packages/ui/src/apps/app-icon.ts` — a dependency-free, pure leaf
module implementing the deterministic letter-plus-color fallback icon (IW-9
decision D6): same slug always yields the same letter and palette color,
everywhere, on every surface. This is the smallest stream in the change and
has no dependency on the other five — it is also the easiest to get subtly
wrong, because "deterministic" only holds if every implementation agrees on
the exact hash constants. This brief pins them; do not choose your own.

## Read first

All paths relative to `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

1. `openspec/changes/IW-9-APP-FIRST.md` — decision D6
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-f4-app-identity/ux.md` — icon flows (rename
   re-coloring is an accepted trade-off, not a bug — see tech-plan Risks)
4. `openspec/changes/iw9-f4-app-identity/tech-plan.md` — T7 (the pinned
   FNV-1a-32 constants: offset basis, prime, ASCII-only slug alphabet — read
   this in full, it is normative) and the "Icon fallback" block under
   "Interfaces & Data"
5. `openspec/changes/iw9-f4-app-identity/specs/app-icon/spec.md` —
   Requirement "Deterministic letter-plus-color fallback" (full text under
   Acceptance criteria below)
6. `server/workspace/src/apps/store.ts:167` — `NAME_RE` (context only,
   confirms slugs are ASCII `[a-z0-9-]`, which is why this module never
   needs Unicode grapheme-cluster segmentation)
7. `packages/ui/package.json` — confirms the package name `@aprovan/ui` for
   the Verify command below

## Tasks

(Verbatim from `openspec/changes/iw9-f4-app-identity/tasks.md` §4, as
repaired in the pre-dispatch pass — see `briefs/deviations.md` §8)

> Depends-on: - | Repo: aprovan | Touches: aprovan/packages/ui/src/apps/app-icon.ts, aprovan/packages/ui/src/apps/__tests__/app-icon.test.ts | Verify: pnpm --filter @aprovan/ui test -- app-icon && pnpm --filter @aprovan/ui typecheck

- [ ] 4.1 Create `packages/ui/src/apps/app-icon.ts` as a dependency-free leaf module: `APP_ICON_PALETTE` (12 fixed hex values) and `appIconFallback(slug)` → `{ letter, color }` with letter = `slug[0].toUpperCase()` (slugs are `NAME_RE`-constrained to `[a-z0-9-]`, ASCII-only — no grapheme-cluster segmentation needed), color = `PALETTE[fnv1a32(utf8(slug)) % 12]` using the PINNED standard FNV-1a-32 constants (offset basis `0x811c9dc5`, prime `0x01000193`, unsigned 32-bit arithmetic throughout) — do not choose different constants (tech-plan T7; D6).
- [ ] 4.2 New test file with golden fixtures: determinism (same slug twice → identical output), distinct slugs map per the normative algorithm (hand-computed FNV-1a fixtures so a second implementation is verifiable against them), rename re-derivation (`recipes` → `cookbook` changes letter and color per spec app-icon "rename changes fallback").

## Acceptance criteria

Verbatim from `specs/app-icon/spec.md` (the requirement this stream owns):

### Requirement: Deterministic letter-plus-color fallback
Every app without a custom icon SHALL render a fallback icon: the first character of the slug (uppercased) on a background color chosen deterministically from a hash of the slug over a fixed palette. The mapping SHALL be pure — same slug yields the same color on every surface and platform — and is specified as a shared function so server-rendered and client-rendered surfaces agree.

#### Scenario: fallback is deterministic
- **WHEN** the fallback icon for slug `recipes` is computed twice, in any environment
- **THEN** both computations yield the same letter (`R`) and the same palette color

#### Scenario: rename changes fallback
- **WHEN** an app with no custom icon is renamed from `recipes` to `cookbook`
- **THEN** the fallback re-derives from the new slug (letter `C`, hash-selected color for `cookbook`)

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm turbo run build --filter=@aprovan/ui
pnpm --filter @aprovan/ui test -- app-icon
pnpm --filter @aprovan/ui typecheck
```

The first line is a correction over `tasks.md`'s literal `Verify:` string
(see `briefs/deviations.md` §9): `packages/ui/package.json` depends on
`@aprovan/patchwork` as `workspace:*`, resolved through `dist/` only, and
turbo's `test`/`typecheck` tasks declare `dependsOn: ["^build"]` for exactly
this reason — a bare `pnpm --filter @aprovan/ui typecheck` type-checks the
whole package (not just your new file), so it needs `@aprovan/patchwork`
built first even though `app-icon.ts` itself imports nothing. Cached and
cheap when nothing changed. All commands must exit 0.

## Constraints

- Implement only what the tasks say; the `APP_ICON_PALETTE`/
  `appIconFallback` shape and the pinned FNV-1a-32 constants in
  `tech-plan.md` T7 are fixed — if either seems wrong, stop and report
  instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- `app-icon.ts` must import nothing — not `zod`, not another `packages/ui`
  module, nothing. If you find yourself adding an import, stop; the tech
  plan calls this out explicitly as "dependency-free leaf module" so it can
  be safely shared between server and client bundles.
- Do not use `Intl.Segmenter` or any grapheme-cluster library — slugs are
  ASCII-only by construction (`NAME_RE`), so `slug[0]` is correct and
  sufficient.
- Do not modify files outside: `packages/ui/src/apps/app-icon.ts`,
  `packages/ui/src/apps/__tests__/app-icon.test.ts`.

## Model

**Sonnet** — the default tier for every `iw9-f4` stream per
`IW-9-EXECUTION-OVERVIEW.md`'s "Model tiers for the implementing fleet"
table. F4 does not appear in that table's Opus-escalation row, and this
stream is the smallest and most mechanically specified of the six (a pure
function against pinned constants) — arguably a Haiku candidate by the
overview's own "mechanical, exhaustively specified, verifiable by command"
criterion, but Haiku is reserved in that table for a named, different set of
streams (F6 husk deletion, AGENTS.md edits, stale-doc archival) and the
user's instruction for this delegation pass is Sonnet for every F4 stream
(Haiku unavailable/not to be invented here) — use Sonnet, do not downgrade
or escalate.

## Report back

When done: check off tasks 4.1–4.2 in
`openspec/changes/iw9-f4-app-identity/tasks.md`, and open a PR (or write
`briefs/04-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and the exact fixture values you used
(so anyone building a second implementation of this algorithm later — server
or client — can verify against them).
