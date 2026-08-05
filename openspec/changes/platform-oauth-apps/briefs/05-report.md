# Report: platform-oauth-apps §5 — Onboard platform apps (runbook)

PR: https://github.com/AprovanLabs/registry/pull/142 (branch `iw8/platform-oauth-05-runbook`). **Not merged**, per instructions.

## What changed

Docs-only stream. Operator runbook for platform OAuth onboarding; no
`platformApp: true` flips, no secrets, no live app registration.

- `packages/registry-server/docs/platform-oauth-runbook.md` — app review
  (GitHub, Slack, general), redirect URI table (catalog + chat + local),
  scope selection principles, secret rotation without invalidating grants,
  per-provider rollout checklist, Google deferral (§5.4).

## Verify

```bash
test -f packages/registry-server/docs/platform-oauth-runbook.md && echo OK
# runbook OK
```

## Blocked on §4.1 (human quota OQ)

§5.1 (first end-to-end proving run) and §5.3 (remaining provider flag flips)
remain **unchecked** until stream 4 resolves the PRD open question: default
per-tenant rps and 24h budget against a platform app. The runbook documents
the pre-ship gate; no live platform app was registered in this stream.

## Tasks (§5)

- [ ] 5.1 Register and ship the first platform app end-to-end as the proving run —
      GitHub or Slack, whichever review queue moves first. **Blocked on §4.1.**
- [x] 5.2 Write the runbook: what app review requires per provider, redirect URI
      conventions, scope selection, and how to rotate a platform secret without
      invalidating tenant grants.
- [ ] 5.3 Add remaining providers one flag flip at a time. Each is a one-line registry
      change plus a secret, with no code change. **Blocked on §4.1 / §5.1.**
- [x] 5.4 Defer Google until there is a concrete reason to endure its verification
      process; note the decision so it is not repeatedly rediscovered.

## Constraints honored

- No `data/registry.json` changes (no `platformApp: true` flips).
- No secrets in repo or env samples with real values.
- Google explicitly deferred in runbook § "Deferred: Google (§5.4)".
- PR opened, not merged.

## Branch / PR

- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa05`
- Branch: `iw8/platform-oauth-05-runbook`
- Runbook path: `packages/registry-server/docs/platform-oauth-runbook.md`
