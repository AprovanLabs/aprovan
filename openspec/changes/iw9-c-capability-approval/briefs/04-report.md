# Report: Stream 4 — regenerate @utdk/* providers with effect

**Registry PR:** https://github.com/AprovanLabs/registry/pull/165  
**Branch:** `feat/iw9-c-utdk-regen`

## What was built

- Regenerated **48** OpenAPI-backed providers under `packages/utdk/**`
  from shipped `openapi.json` (codegen-only; no upstream refetch) so
  `metadata.ts` carries `"effect": "observation" | "action"` from stream 1.
- Version/generation stamps bumped in each provider `package.json` for
  stream 5 publish (date stamp `20260812`).
- One-line fix in `packages/bundler/src/render.test.ts` fixture
  (`effect: "observation"`) — stream 1 documented this as the follow-up.

## Spot-check

| Provider | Role | Tools | observation | action | Mismatches |
|----------|------|------:|------------:|-------:|-----------:|
| github | GET-heavy | 1204 | 628 | 576 | 0 |
| telegram | POST-heavy (all POST) | 74 | 0 | 74 | 0 |
| asana | mixed | 247 | 117 | 130 | 0 |

## Verify

```bash
cd <registry-worktree>
pnpm --filter @utdk/clients build
grep -L '"effect"' packages/utdk/github/metadata.ts \
  packages/utdk/anthropic/metadata.ts packages/utdk/asana/metadata.ts \
  | wc -l | grep -qx 0
```

## Version bumps (stream 5 will publish)

All regenerated packages moved to `*-20260812.*` stamps, including:
`@utdk/github` `1.1.4-20260716.3` → `1.1.4-20260812.1`,
`@utdk/anthropic` `0.0.1-20260718.2` → `0.0.1-20260812.1`,
`@utdk/asana` `1.0.0-20260727.1` → `1.0.0-20260812.1`,
plus airtable, datadog, digitalocean, discord, elevenlabs, figma, front,
gemini, google-cloud-run, google/{books,calendar,docs,drive,forms,gmail,
people,sheets,slides,tasks,youtube}, hubspot, intercom, itglue, jira,
launchdarkly, linear, mercury, notion, openai, openrouteservice, petstore,
pipedrive, plaid, posthog, postman-explore, salesforce, sendgrid, sentry,
slack, spotify, stripe, stytch, telegram, twilio, zendesk.

## Deviations

- **`producthunt`**: `openapi.json` is a non-OpenAPI catalog blob (0 paths).
  Regen would empty metadata — left untouched.
- **`postman-explore`**: not listed in `data/registry.json`; temporarily
  injected a `repo://` registry entry for regen only (not committed).
- **No `CHANGELOG.md`**: none exist for these packages; `package.json`
  version/generation bumps are the changelog artifact (task 4.3).
- **`render.test.ts`**: one-line fixture `effect` outside Touches
  (acceptable per stream 1 notes).
- Did **not** overwrite handwritten providers (stream 2); only OpenAPI
  `metadata.ts` / `package.json`.
