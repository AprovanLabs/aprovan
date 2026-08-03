# Wave plan — improve-wave delegation

## Completed (all feature streams on main)
- **IW-0** execution-plane-unfork — registry reconcile/publish + aprovan npm consume (#24); leftover bookkeeping 3.x/6.3 unchecked
- **IW-1** app-model-split (#28–#36)
- **IW-2** editor-direct-edit (#20 foundations … #59 gates)
- **IW-3** registry-standalone-credentials (#92–#95) + product-plane dispose
- **IW-4** native-panel-polish (#21 … #55)
- **IW-5** telemetry-contract-v2 (registry#86 + #97; aprovan #60–#65)
- **IW-6** presence-realtime (#22 … #53)

## Deploy notes
- Registry web: `PUBLIC_SESSION_MODE=hosted` via #95; Deploy Registry Web succeeded.
- Aprovan: GHCR workspace images publish; CI OIDC roll to `aprovan-prd-use2-registry-deploy` currently fails AssumeRole — use local `AWS_PROFILE=aprovan scripts/deploy-infra.sh <tag>` / `scripts/deploy-web.sh` until trust is fixed for `environment:production` subjects.
- npm: `@utdk/telemetry@0.3.0` published; republish E403 on already-published versions is expected.

## Open PRs (unrelated to improve-wave)
- registry #69, #70 (APR-338/339) — leave alone
