# Wave plan — improve-wave IW-7

## Lane diagram
```
t=0   tools-global ──┬─► utdk-remote-package        lane B
      (8 streams)    ├─► profiles-unified ────┐     lane A
                     └─► editor-consolidation │     lane C
                                              ├──► interfaces-native-provider
t=0   utdk-output-schemas ────────────────────┘     lane D (registry only)
```

## Settled (2026-08-03)
- PostHog prompts ripped out → repo/workspace FS only (PostHog `chat-patchwork-widget` v4 DEPRECATED stub).
- Keep third-party **interface** compat adapters.
- All other OQs: accept recommendations.

## Wave 0 progress
| Item | Status | Link |
|------|--------|------|
| utdk §2 envelope ADR | **merged** | https://github.com/AprovanLabs/registry/pull/108 |
| utdk §1 output slot | **merged** | https://github.com/AprovanLabs/registry/pull/109 |
| utdk §3 response extraction | **merged** | https://github.com/AprovanLabs/registry/pull/110 |
| utdk §4 regen providers | running | agent 5fe38db3 |
| utdk §5 catalog outputs | running | agent 4eacb16c |
| utdk §6 MCP schemas | running | agent 13359f82 |
| utdk §7 digitalocean | blocked on §4 | — |
| tools-global §1 namespace-core | **on branch** | `iw7/tools-global` |
| tools-global §2–8 | running | agent 1cf84f6c |

## Wave 1 — blocked on tools-global merge
Briefs ready: `utdk-remote-package`, `profiles-unified`, `editor-consolidation` (`briefs/00-full.md`).
Note: profiles §6 after utdk-remote §1 (shared `packages/remote/src/proxy.ts`).

## Wave 2 — blocked on profiles + editor + utdk-output-schemas
Brief ready: `interfaces-native-provider/briefs/00-full.md`.

## Deploy
- Registry: merge → publish/deploy workflows.
- Aprovan: `AWS_PROFILE=aprovan scripts/deploy-infra.sh <tag>` / `scripts/deploy-web.sh` until OIDC fixed.
- Spot-check https://aprovan.com/chat/ after web deploy.
