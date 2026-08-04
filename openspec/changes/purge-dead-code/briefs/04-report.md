# Report: npm deprecations (purge-dead-code stream 4)

**Status**: blocked on npm publish auth. Tasks 4.2–4.8 remain unchecked.

## 4.1 Auth check (2026-08-04)

```
npm whoami        → E401 Unauthorized
npm token list    → E401 (invalid authentication token)
```

`~/.npmrc` has an `_authToken` for `registry.npmjs.org`, but it is rejected. No
`NPM_TOKEN` / `NODE_AUTH_TOKEN` in the environment. GitHub Actions `publish.yml`
holds the real token as a secret — not available to this agent.

Per PRD constraint: stop here; do not silently skip deprecations.

## Packages still needing deprecate (once auth is restored)

```bash
npm deprecate @aprovan/bobbin "Deleted in purge-dead-code (WS-1); the visual-edit panel is discontinued. See git history for the source."
npm deprecate @aprovan/patchwork-mcp "Deleted in purge-dead-code (WS-1); MCP-Apps distribution is rebuild-later-if-ever. See git history for the source."
npm deprecate @aprovan/patchwork "Deleted in purge-dead-code (WS-1); its only consumer (@aprovan/patchwork-mcp) was removed. See git history for the source."
npm deprecate @utdk/fn "Deleted in purge-dead-code (WS-1); fully orphaned. See git history in the registry repo."
npm deprecate @utdk/isolate "Deleted in purge-dead-code (WS-1); the gateway's direct in-process executor is now the sole execution path (registry/apps/workspace/src/isolate.ts). See git history in the registry repo."
```

Then verify with `npm view <pkg> --json | grep deprecated` and
`npm view <pkg> versions --json` (must still list prior versions — never unpublish).

## Current publish state (read-only; none deprecated yet)

| Package | latest | deprecated? |
|---------|--------|--------------|
| `@aprovan/bobbin` | 0.1.0 | no |
| `@aprovan/patchwork-mcp` | 0.1.0-dev.78e095c | no |
| `@aprovan/patchwork` | 0.2.0 | no |
| `@utdk/fn` | 0.1.0-dev.4dcc085 | no |
| `@utdk/isolate` | 0.1.0-dev.646adf4 | no |

Source deletions for these packages already landed:
- aprovan: https://github.com/AprovanLabs/aprovan/pull/1
- registry: https://github.com/AprovanLabs/registry/pull/73
