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

## Wave 0 status (2026-08-03 night)
| Stream | Status | PR |
|--------|--------|-----|
| utdk-output-schemas 1 slot | **merged** | registry#109 |
| utdk-output-schemas 2 ADR | **merged** | registry#108 |
| utdk-output-schemas 3 extraction | **merged** | registry#110 |
| utdk-output-schemas 4 regen | running [regen](5fe38db3-d0f9-4aca-88b9-9879760a1483) | — |
| utdk-output-schemas 5 catalog | running [catalog](4eacb16c-bf9d-45f8-ac3d-c2005eeef69a) | — |
| utdk-output-schemas 6 MCP | running [mcp](13359f82-3185-4037-aa39-3476b2b0bf42) | — |
| utdk-output-schemas 7 digitalocean | blocked on 4 | — |
| tools-global 1–8 | in progress (orchestrator) | — |


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
