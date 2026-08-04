# Wave plan — improve-wave IW-7

## Settled
- PostHog prompts → repo/workspace FS only (PostHog stubbed DEPRECATED v4).
- Keep third-party interface compat adapters.

## Wave 0 — done
utdk §1–§7 (#108–#116), tools-global (#82/#114), Dockerfile (#115). Coverage 90.6%.

## Wave 1 — done
utdk-remote (#117–#119, `@utdk/remote@0.1.2`), profiles-unified (#85/#120–#121),
editor-consolidation (#84/#122, `@aprovan/editor@0.2.0`). Prod chat redeployed.

## Wave 2 — done (`interfaces-native-provider`)
| Item | Status | Link |
|------|--------|------|
| Registry compat defaults | **merged + published** | [#123](https://github.com/AprovanLabs/registry/pull/123) → `@utdk/{vfs,vcs,keyvalue,events,sandbox}@0.2.1`, `@utdk/telemetry@0.3.1` |
| Aprovan streams 1–8 | **merged** | [#86](https://github.com/AprovanLabs/aprovan/pull/86) |
| Prod web | **redeployed** | https://aprovan.com/chat/ |
| Prod gateway | **rolled** | image `723009123143` via `deploy-infra.sh` (CI OIDC roll failed) |
| `@aprovan/native@0.1.0` | **published** | npm |

## Closeout
- All six change `tasks.md` files fully checked.
- Reports present under each change `briefs/`.
- Optional later: `openspec archive` per change; PostHog UI archive of stubbed prompt;
  unify `@utdk/vcs` Git-hosting vs workspace commit ops; full example reseed pass.

**IW-7 workstreams complete.**
