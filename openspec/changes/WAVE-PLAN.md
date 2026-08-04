# Wave plan — improve-wave IW-7 (tools / schemas / profiles / editor / native)

## Lane diagram
```
t=0   tools-global ──┬─► utdk-remote-package        lane B  (5 streams)
      (8 streams)    ├─► profiles-unified ────┐     lane A  (8 streams)
                     └─► editor-consolidation │     lane C  (8 streams)
                                              ├──► interfaces-native-provider
t=0   utdk-output-schemas ────────────────────┘     lane D  (7 streams, registry only)
```

## Settled open questions (2026-08-03)
- PostHog-managed prompts **ripped out** → repo/workspace FS only (early). PostHog prompt stubbed v4 DEPRECATED.
- Keep third-party **interface** compat adapters; reconsider only for non-interface natives.
- All other OQs: accept recommendations (recorded in each change).

## Wave 0 — IN FLIGHT (local worktree agents; cloud blocked on multi-root)
| Brief | Change | Streams | Model | Agent | Status |
|-------|--------|---------|-------|-------|--------|
| tools-global/00-full | tools-global | 1–8 | opus | [tools-global](7ae3c853-ce3a-47fd-a158-81d0beab8b62) | running |
| utdk-output-schemas/01 | output slot | 1 | sonnet | [slot](cf898327-85e4-4f52-b06c-e52bd1879d2e) | running |
| utdk-output-schemas/02 | envelope ADR | 2 | composer | [adr](42a3b88d-ce67-42fa-8d59-fd85d7ce2987) | running |
| utdk-output-schemas/03 | response extraction | 3 | opus | [extract](f05bfe45-7dc9-4f56-aa44-1bfa89a185bc) | running |

Wave-1/2 briefs pre-written under each change `briefs/00-full.md` (gated).

### Wave 0b (after 03 merges)
| Brief | Streams | Notes |
|-------|---------|-------|
| 04-regen-providers | 4 | after 03 |
| 05-catalog-serve | 5 | after 03; parallel with 04, 06 |
| 06-mcp-schemas | 6 | after 03; parallel with 04, 05 |
| 07-digitalocean | 7 | after 04 |

## Wave 1 — blocked on tools-global merge
- utdk-remote-package (lane B)
- profiles-unified (lane A) — stream 6 after remote stream 1 (shared `packages/remote/src/proxy.ts`)
- editor-consolidation (lane C)

## Wave 2 — blocked on profiles-unified + editor-consolidation + utdk-output-schemas
- interfaces-native-provider (incl. 8.4 catalog schema flip)

## Path-conflict rules
- Two briefs in the same wave never share a Touches glob.
- tools-global owns package renames + client/web import churn.
- utdk-output-schemas does **not** touch aprovan; 8.4 lives in interfaces-native-provider.

## Deploy
- Merge each PR to `main` when green.
- Registry: publish / registry-deploy as needed.
- Aprovan: `AWS_PROFILE=aprovan scripts/deploy-infra.sh <tag>` / `scripts/deploy-web.sh` until OIDC trust fixed.
- Spot-check production after each lane lands.

## Prior
IW-0 … IW-6 feature streams on main (see prior WAVE-PLAN history).
