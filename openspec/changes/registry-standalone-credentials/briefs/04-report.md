# Report: Stream 4 — Publish package minors

## Status
**DONE** — all three packages published; tasks 4.1–4.2 checked.

## Published versions

| Package | Prior npm | New | Feature source |
|---|---|---|---|
| `@aprovan/registry-server` | `0.1.4` | **`0.2.0`** | registry#92 auth discovery |
| `@aprovan/registry-main` | `0.1.0` | **`0.2.0`** | aprovan#25 header options |
| `@aprovan/registry-ui` | `0.5.0` | **`0.6.0`** | aprovan#26 admin capabilities |

## Why bumps were required
Feature PRs merged without version bumps, so prior `publish.yml` runs skipped
(`already published`). `@aprovan/registry-server@0.1.4` on npm was the utdk-pin
republish (#91) and did **not** include `/auth/config` / `/whoami`.

## PRs
- registry: https://github.com/AprovanLabs/registry/pull/93 — merged
- aprovan: https://github.com/AprovanLabs/aprovan/pull/29 — merged

## publish.yml
- registry run (PR #93 merge): **success** — `Publishing @aprovan/registry-server@0.2.0`
- aprovan run (PR #29 merge): **success** — `Publishing @aprovan/registry-main@0.2.0`,
  `Publishing @aprovan/registry-ui@0.6.0`

## Verified
```
npm view @aprovan/registry-server version   # 0.2.0
npm view @aprovan/registry-main version     # 0.2.0
npm view @aprovan/registry-ui version       # 0.6.0
```
Tarball spot-checks:
- registry-server `0.2.0`: `GET /auth/config`, `GET /whoami`, `browserClientId` advertising
- registry-main `0.2.0`: `authHeader` / `scopeHeader` on GatewayClient
- registry-ui `0.6.0`: `capabilities`, `ApiKeysSection`, standalone admin sections

## Deviations
None. Minor bumps (not patches) per brief.

## For next wave
Stream 5 may bump catalog deps to these published minors and implement the session layer.
Do not start stream 5 until this report’s versions are the ones consumed.
