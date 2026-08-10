# Brief: Deploy pipeline + infra rename (/chat → /workspace)

## Mission

Pair to brief 08, entirely on the infra/deploy side: add a CloudFront
Function that permanently redirects `/chat` and `/chat/*` to `/workspace`,
add (never remove) `/workspace` Cognito callback/logout URLs alongside the
existing `/chat` ones, and repoint the S3 deploy script and CI workflow
comment from `chat/` to `workspace/`. **This stream is not complete at
"tasks checked" — it is complete only after the live redirect is confirmed
against a deployed distribution** (see Verify's two phases below).

## Read first

**aprovan repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`):

1. `openspec/changes/IW-9-APP-FIRST.md` — Mission statement (permanent
   redirect)
2. `openspec/changes/iw9-f6-cleanup-rename/prd.md` — Goal 7
3. `openspec/changes/iw9-f6-cleanup-rename/tech-plan.md` — Decisions **D8**
   and **D9**, "Interfaces & Data" → CloudFront redirect function contract
   (pseudocode), Rollout §4 (deploy-order note with brief 08)
4. `openspec/changes/iw9-f6-cleanup-rename/specs/workspace-base-path/spec.md`
   (full text — reproduced in Acceptance criteria below; this stream owns
   the "permanent redirect" requirement, the redirect half of "OAuth sign-in
   resolves...", and the "deploy pipeline" requirement)
5. `infra/aws/src/stacks/web.ts` (existing `StaticRewrite`/
   `GatewayForwardHost` `cloudfront.Function` pattern,
   `defaultBehavior.functionAssociations` order, `additionalBehaviors`)
6. `infra/aws/src/stacks/main.ts:158-193` (Cognito `callbackUrls`/
   `logoutUrls`)
7. `scripts/deploy-web.sh` (the four `s3 sync` calls, the `s3 cp` SPA-shell
   publish, the `/chat/*` CloudFront invalidation, the header comment, the
   final `log "Done. https://aprovan.com/chat/ ..."` line)
8. `.github/workflows/web.yml` (comment only)

_No registry-repo files are in scope for this stream._

## Tasks

(Verbatim from `openspec/changes/iw9-f6-cleanup-rename/tasks.md` §9)

> Depends-on: - | Repo: aprovan | Touches: aprovan/scripts/deploy-web.sh, aprovan/.github/workflows/web.yml, aprovan/infra/aws/src/stacks/main.ts, aprovan/infra/aws/src/stacks/web.ts | Verify: pnpm --filter @aprovan/infra typecheck && pnpm --filter @aprovan/infra synth && bash -n scripts/deploy-web.sh

- [ ] 9.1 `scripts/deploy-web.sh`: replace every `chat/` S3 key prefix (the
      four `s3 sync` calls, the `s3 cp` SPA-shell publish, and its
      surrounding comment) and the `/chat/*` CloudFront invalidation path
      with `workspace/`/`/workspace/*`; update the header comment and the
      final `log "Done. https://aprovan.com/chat/ ..."` line to
      `.../workspace/`.
- [ ] 9.2 `.github/workflows/web.yml`: update the header comment
      ("...automated deployment to aprovan.com/chat on main...") to say
      `/workspace`. No functional change — the workflow delegates entirely
      to `deploy-web.sh`.
- [ ] 9.3 `infra/aws/src/stacks/web.ts`: add a new `cloudfront.Function`
      (viewer-request, JS_2_0) implementing the `/chat` → `/workspace`
      permanent-redirect contract in tech-plan D8/"Interfaces & Data"; add
      it to `defaultBehavior.functionAssociations` **before** the existing
      `rewrite` (`StaticRewrite`) function, so the redirect short-circuits
      ahead of the extension/index.html rewrite.
- [ ] 9.4 `infra/aws/src/stacks/main.ts`: add
      `"https://aprovan.com/workspace/auth/callback"` and
      `"http://localhost:5173/workspace/auth/callback"` to `callbackUrls`
      (lines ~166-168), and `"https://aprovan.com/workspace"` /
      `"http://localhost:5173/workspace"` to `logoutUrls` (lines ~191-193).
      Do **not** remove any existing `/chat` entry (tech-plan D9).
- [ ] 9.5 Verify the CDK app synthesizes with the new function and URLs
      (Verify command above); manually confirm (documented in the PR, not a
      script) that a deployed distribution 301s `/chat`, `/chat/`, and
      `/chat/deep/path?x=1` to the correct `/workspace` equivalents,
      preserving query strings, before calling this stream done (tech-plan
      Risks — no automated CDK test exists in this repo to assert it).
- [ ] 9.6 Grep gate: `grep -rn '"chat/\|/chat/\*\|aprovan.com/chat' scripts/deploy-web.sh .github/workflows/web.yml`
      returns nothing (the `/chat/auth/callback` and `/chat` literals in
      `main.ts`'s Cognito lists are expected to remain per D9 — this gate
      does not apply to that file).

## Acceptance criteria

Full text of the `workspace-base-path` requirements this stream owns:

```
### Requirement: `/chat` and `/chat/*` permanently redirect to `/workspace`
Any request whose path is `/chat` or starts with `/chat/` SHALL receive a
permanent redirect (301 or CloudFront-function-equivalent) to the same path
with the `/chat` segment replaced by `/workspace`, preserving the remainder
of the path and the query string. The redirect SHALL be served at the edge
(CloudFront), not by the SPA, so it also covers non-HTML asset requests and
clients that never load the app shell.

#### Scenario: Root chat path redirects
- **WHEN** a client requests `https://aprovan.com/chat` or `https://aprovan.com/chat/`
- **THEN** the response is a permanent redirect to `https://aprovan.com/workspace/`

#### Scenario: Deep chat link preserves path and query
- **WHEN** a client requests `https://aprovan.com/chat/some/deep/path?x=1`
- **THEN** the response is a permanent redirect to
  `https://aprovan.com/workspace/some/deep/path?x=1`

#### Scenario: Redirect is cacheable as permanent
- **WHEN** a browser or intermediary caches the redirect
- **THEN** the response status is a permanent-redirect code (301 or 308), not
  a temporary one (302/307)

### Requirement: OAuth sign-in resolves under the new base path without breaking in-flight or bookmarked callbacks
[Full requirement text — see brief 08, which reproduces it in full. This
stream owns the redirect-serving half of the second scenario below; brief 08
owns the client-side completion half.]

#### Scenario: A stale /chat/auth/callback link still completes sign-in
- **WHEN** a request reaches `/chat/auth/callback?code=abc&state=xyz`
- **THEN** it redirects to `/workspace/auth/callback?code=abc&state=xyz` and
  the client-side OAuth callback handler completes the exchange normally

_(This stream's task 9.3 CloudFront Function is what delivers the redirect
half of this scenario; brief 08's `OAuthCallbackPage.tsx` completes the
exchange. Neither stream alone satisfies this scenario — it needs both
merged and deployed together, see Constraints.)_

### Requirement: The deploy pipeline targets the `workspace/` S3 prefix
`scripts/deploy-web.sh` SHALL sync the build output to `s3://$WEB_BUCKET/workspace/`,
invalidate CloudFront paths under `/workspace/*`, and publish the SPA shell
at `workspace/auth/callback/index.html` (mirroring the existing `chat/auth/callback/`
publish) so the CloudFront rewrite function resolves that path to the app
shell instead of a 404.

#### Scenario: Deploy syncs to the workspace prefix
- **WHEN** `scripts/deploy-web.sh` runs against a built `client/web/dist`
- **THEN** every synced object key is rooted at `workspace/`, and no object
  is written under `chat/`

#### Scenario: Deploy invalidates the workspace path
- **WHEN** `scripts/deploy-web.sh` completes its sync
- **THEN** it invalidates CloudFront path `/workspace/*`

#### Scenario: SPA shell exists at the callback path
- **WHEN** a fresh deploy finishes
- **THEN** `s3://$WEB_BUCKET/workspace/auth/callback/index.html` exists and
  is byte-identical to `workspace/index.html`
```

## Verify

**Phase 1 — pre-merge (code review gate, run before opening/merging the PR):**

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm --filter @aprovan/infra typecheck && pnpm --filter @aprovan/infra synth
bash -n scripts/deploy-web.sh
grep -rn '"chat/\|/chat/\*\|aprovan.com/chat' scripts/deploy-web.sh .github/workflows/web.yml
```

Typecheck and synth must succeed; `bash -n` must report no syntax errors;
the grep must produce no output. **This phase alone is not sufficient to
call the stream done** — it only proves the CDK code is well-formed, not
that the redirect behaves correctly against a live distribution.

**Phase 2 — post-merge (production verification, run against the deployed
distribution after this stream's CDK changes are deployed):**

```bash
curl -sI https://aprovan.com/chat            | grep -i '^location:\|^HTTP'
curl -sI https://aprovan.com/chat/           | grep -i '^location:\|^HTTP'
curl -sI 'https://aprovan.com/chat/deep/path?x=1' | grep -i '^location:\|^HTTP'
```

Each response must be `HTTP/... 301` (or `308`) with a `location:` header
pointing at the `/workspace` equivalent of the requested path, with the
query string preserved on the third request. Document the three raw curl
outputs in the PR description (tech-plan Risks: "no automated CDK test
exists in this repo to assert it" — this manual check is the actual gate,
not a nice-to-have).

**This stream's definition of done is Phase 1 AND Phase 2 both passing.**
Checking off task 9.5 in `tasks.md` before Phase 2 has run against a real
deployment is checking off an unverified box — don't do it.

## Constraints

- Implement only what the tasks say; the CloudFront Function contract in
  tech-plan D8/"Interfaces & Data" is fixed — if it seems wrong, stop and
  report instead of changing it.
- Prefer a `cloudfront.Function` (JS_2_0, viewer-request) over Lambda@Edge —
  matches the stack's existing pattern and is explicitly what D8 argues for.
- Do **not** remove any existing `/chat` Cognito `callbackUrls`/`logoutUrls`
  entry in this change — additive only (D9); removal is a future
  MIGRATION-DEBT-style follow-up, not this stream's job.
- Coordinate deploy order with brief 08 (see brief 08's Constraints) — CDK
  deploy (this stream) should land before-or-with the client rebuild's
  deploy, or built `/workspace/...` asset URLs will 404.
- Do not modify files outside: `scripts/deploy-web.sh`,
  `.github/workflows/web.yml`, `infra/aws/src/stacks/main.ts`,
  `infra/aws/src/stacks/web.ts`.

## Model

**Sonnet.** Not named in `IW-9-EXECUTION-OVERVIEW.md`'s Haiku tier — writing
a new CloudFront Function ahead of an existing one in
`functionAssociations` order, plus a two-phase (pre/post-merge) verification
protocol, is real infra judgment. Run on Sonnet as the default tier, not a
Haiku fallback.

## Report back

When done: check off tasks 9.1–9.6 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md` — but only check 9.5 after
Phase 2 (the live curl checks) has actually run and passed — and open a PR
(or write `briefs/09-report.md`) containing: what you built, the Phase 1
synth output, the Phase 2 raw curl output (all three requests), any
deviations from this brief and why, and confirmation that brief 08's client
rebuild deployed together with (or after) this stream's infra changes.
