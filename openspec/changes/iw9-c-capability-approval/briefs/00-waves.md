# iw9-c-capability-approval — delegation waves

Cross-repo change: registry publishes first; aprovan pins; then aprovan
enforcement. See `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` and
`docs/decisions/0002-app-first-platform-invariants.md` (invariants 1, 2, 3,
4, 6, 11).

**Already on main (do not rebuild):** iw9-d stream 10 (CF-5 app-scoped
profiles) and iw9-d stream 8 (`RunTransport` default / parity flip). C
consumes `pending_action` + resume from D; Chat's summarize gate is open.

## Wave graph (Depends-on)

| Wave | Streams | Parallel? | Notes |
|------|---------|-----------|-------|
| **0** | **1, 2, 3** | **yes** | Registry-only. Touches disjoint: bundler / handwritten utdk / registry-server. |
| 1 | 4 | after 1 | Regen OpenAPI `@utdk/*` — **depends on 1**, not on 2. Stream 2 (handwritten annotations) stays parallel with 1/3 and may still be in flight when 4 starts. |
| 2 | 5 | after 2, 3, 4 | Publish `@utdk/*` + `@aprovan/registry-server`. |
| 3 | 6 | after 5 | aprovan pin bump only. |
| 4 | 7 | after 6 | Effect wiring + CI gate. |
| 5 | 8 | after 7 | `evaluateDispatch` + four paths. |
| 6 | 9, 11 | **yes** | Both depend only on 8; Touches disjoint (action-queue vs derived-authority). |
| 7 | 10 | after 8, 9 | Cards / JIT / ask / always-ask. |
| 8 | 12 | after 9, 10 | Review surface API + notifications. |
| 9 | 13 | after 12 | Client review / install / JIT UI. |
| 10 | 14 | after 8–13 | Grep-gate DoD. |

## Wave-0 dispatchable now

**1, 2, 3** — all `Depends-on: -`, Touches verified disjoint:

- 1 → `registry/packages/bundler/**`
- 2 → handwritten `registry/packages/utdk/{agent,cloudflare,...}/**` (not generated metadata regen)
- 3 → `registry/packages/registry-server/**`

**Stream 2 vs 4 sequencing:** 4 depends on **1 only**. Do not wait for 2 to
finish before starting 4. Do not let 4 overwrite handwritten annotations
from 2 — 4 only regenerates OpenAPI-derived `metadata.ts`.
