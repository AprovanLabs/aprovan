# Report: 04-icon-fallback

## What was built

`packages/ui/src/apps/app-icon.ts` — a dependency-free leaf module (zero
imports, per the brief's constraint) exporting:

- `APP_ICON_PALETTE: readonly string[]` — 12 fixed hex colors.
- `appIconFallback(slug: string): { letter: string; color: string }` —
  `letter = slug[0].toUpperCase()`; `color = APP_ICON_PALETTE[fnv1a32(utf8(slug)) % 12]`,
  using the pinned standard FNV-1a-32 constants (offset basis `0x811c9dc5`,
  prime `0x01000193`, unsigned 32-bit arithmetic throughout, `Math.imul(...) >>> 0`
  after each multiply, `utf8` via the global `TextEncoder` — no import needed,
  it's a runtime global in Node/browsers/edge).

`packages/ui/src/apps/__tests__/app-icon.test.ts` — new test file covering:

- Determinism (`recipes` computed twice → identical `{ letter, color }`).
- Golden fixtures for 4 slugs (table below), hand-verifiable against a
  second implementation.
- Rename re-derivation (`recipes` → `cookbook`): letter and color both
  change (spec app-icon "rename changes fallback").
- First-character letter derivation, including a leading-digit slug (`9lives`).

## Golden fixtures

For anyone building a second implementation (server-side or otherwise) to
verify against, computed with the pinned FNV-1a-32 constants over the UTF-8
bytes of the slug:

| slug       | `fnv1a32(utf8(slug))` | `% 12` | `APP_ICON_PALETTE[idx]` | letter |
|------------|------------------------|--------|-------------------------|--------|
| `recipes`  | 122215668              | 0      | `#ef4444`               | `R`    |
| `cookbook` | 2534158412             | 8      | `#3b82f6`               | `C`    |
| `a`        | 3826002220             | 4      | `#22c55e`               | `A`    |
| `todo`     | 844695421              | 1      | `#f97316`               | `T`    |

`APP_ICON_PALETTE` in index order: `#ef4444, #f97316, #f59e0b, #84cc16,
#22c55e, #10b981, #14b8a6, #06b6d4, #3b82f6, #6366f1, #a855f7, #ec4899`.

These hash values were produced by a standalone Node script implementing
the same pinned algorithm independently of `app-icon.ts` (not copy-pasted
from it), then encoded as test fixtures — the point of "hand-computed" per
the task is that a reviewer/second-implementer can recompute them without
running this module, and the values above give that starting point.

## How it was verified

Ran exactly the brief's `## Verify` commands from the repo root, all exit 0:

```bash
pnpm turbo run build --filter=@aprovan/ui   # cache hit on @aprovan/patchwork, built @aprovan/ui
pnpm --filter @aprovan/ui test -- app-icon  # 7 passed
pnpm --filter @aprovan/ui typecheck         # clean
```

## Deviations from the brief

1. **`APP_ICON_PALETTE` hex values were not specified anywhere upstream**
   (tech-plan/spec only say "12 fixed hex values"/"a fixed palette", never
   naming the colors) — chose a 12-color qualitative palette (Tailwind
   500-shade hues, spread across the wheel: red, orange, amber, lime,
   green, emerald, teal, cyan, blue, indigo, purple, pink) for good visual
   distinctness. This is not a normative choice reused elsewhere in the
   codebase; if another surface needs the exact same 12 values (rather than
   importing this module directly), it must import `APP_ICON_PALETTE` from
   here rather than re-declaring them, per T7's "one canonical shared
   implementation."
2. **Two non-null assertions added** (`slug[0]!`, `APP_ICON_PALETTE[...]!`)
   that aren't in the tech-plan's interface sketch — required because this
   package's `tsconfig` has `noUncheckedIndexedAccess` on, which the
   sketch's plain `.ts` snippet doesn't account for. Both are provably safe
   (slug is non-empty per `NAME_RE`'s `{0,63}` repetition after one
   mandatory leading char; `hash % length` is always in-bounds) and are
   commented inline.
3. Used the global `TextEncoder` (no `import` statement, so it does not
   violate the "dependency-free leaf module" / "must import nothing"
   constraint) rather than a hand-rolled UTF-8 encoder, since slugs are
   ASCII-only by construction anyway and `TextEncoder` is a standard global
   across Node 18+, browsers, and edge runtimes (all the surfaces T7 says
   must agree).

No other deviations. Did not touch `packages/ui/package.json` (no `exports`
subpath was added for `./apps`) since it's outside the brief's `Touches`
list; other streams/consumers should import via a relative path or a future
brief adds the subpath export.

## Files touched

- `packages/ui/src/apps/app-icon.ts` (new)
- `packages/ui/src/apps/__tests__/app-icon.test.ts` (new)
- `openspec/changes/iw9-f4-app-identity/tasks.md` (checked off 4.1, 4.2)
- `openspec/changes/iw9-f4-app-identity/briefs/04-report.md` (this file)

## Blockers

None.
