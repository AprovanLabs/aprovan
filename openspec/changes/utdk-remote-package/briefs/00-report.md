# Report: utdk-remote-package (streams 1–4)

## Status
Complete on main. Package `@utdk/remote@0.1.2` published; aprovan patchwork consumes it;
registry playground migrated; `@aprovan/runtime` retired.

## PRs
| Repo | PR |
|------|-----|
| Registry package | https://github.com/AprovanLabs/registry/pull/117 |
| Registry prepare/bump | https://github.com/AprovanLabs/registry/pull/118 |
| Aprovan consume | https://github.com/AprovanLabs/aprovan/pull/83 |
| Registry playground + delete runtime | https://github.com/AprovanLabs/registry/pull/119 |

## Landed
1. `@utdk/remote` — proxy, transport, policy, paginate, imports; zero `@aprovan/*` deps; depth-0 configure; lazy `.client(name)`.
2. Sandbox host consolidated into patchwork mount layer; shared script-running entry for playground.
3. Patchwork bridge uses `@utdk/remote` as the single proxy implementation.
4. Playground + callers switched off `@aprovan/runtime`.

## Verify
Package tests + patchwork/workspace builds green on the merged PRs. Prod chat redeployed after wave 1.
