# Brief: Standalone credentials (HOLD — streams 1–3 can start after registry IW-0 merge)

## Mission
Auth discovery (`/auth/config`, `/whoami`), registry-main header options, registry-ui admin
capability sections. Publish minors only after IW-0 makes published `@aprovan/registry-server`
the single source. Standalone OIDC uses PKCE when advertised; paste-a-bearer is universal
fallback. `product-plane-removal` branch is abandoned as superseded (stream 7).

## Status
Path-wise streams 1–3 are ungated, but stream 1 edits `registry/packages/registry-server/**`
which **collides with IW-0 stream 1**. Dispatch only after
`iw0/registry-reconcile-publish` merges. Streams 4–7 wait on npm publish gate.
