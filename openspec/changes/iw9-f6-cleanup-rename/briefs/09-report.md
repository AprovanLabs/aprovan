# Stream 9 report — Deploy pipeline + infra rename

## What was built

1. **`scripts/deploy-web.sh`** — S3 sync/cp prefixes, CloudFront invalidation,
   header comments, and final Done URL all repointed from `chat/` →
   `workspace/`.
2. **`.github/workflows/web.yml`** — header comment only (`/chat` →
   `/workspace`); workflow still delegates to `deploy-web.sh`.
3. **`infra/aws/src/stacks/web.ts`** — D8 `/chat` → `/workspace` permanent
   redirect (301, query string preserved) inlined at the top of the existing
   `StaticRewrite` viewer-request CloudFront Function so it short-circuits
   ahead of the extension/`index.html` rewrite. See Deviation below.
4. **`infra/aws/src/stacks/main.ts`** — additive Cognito URLs (D9):
   - callback: `https://aprovan.com/workspace/auth/callback`,
     `http://localhost:5173/workspace/auth/callback`
   - logout: `https://aprovan.com/workspace`,
     `http://localhost:5173/workspace`
   - existing `/chat` callback/logout entries retained.

## Phase 1 verify (pre-merge)

Commands (from worktree root):

```bash
pnpm --filter @aprovan/infra typecheck && pnpm --filter @aprovan/infra synth
bash -n scripts/deploy-web.sh
grep -rn '"chat/\|/chat/\*\|aprovan.com/chat' scripts/deploy-web.sh .github/workflows/web.yml
```

Results:

| Check | Result |
| --- | --- |
| `pnpm --filter @aprovan/infra typecheck` | PASS |
| `pnpm --filter @aprovan/infra synth` | PASS — `Successfully synthesized to …/infra/aws/cdk.out` (stacks `prd-use2-main`, `prd-glb-web`, `prd-use2-ci`) |
| `bash -n scripts/deploy-web.sh` | PASS (no syntax errors) |
| grep gate | PASS (no matches; exit 1 / empty) |

### CDK synth evidence

- `prd-glb-web` resource `StaticRewriteA5CAE5B8` (`AWS::CloudFront::Function`)
  FunctionCode contains the `/chat` → `/workspace` 301 branch
  (`statusDescription: "Moved Permanently"`, querystring re-serialization)
  ahead of the existing trailing-slash / `index.html` rewrite.
- `prd-use2-main` Cognito `UserPoolPublicClient` CallbackURLs include both
  `/chat/auth/callback` and `/workspace/auth/callback` (prod + localhost);
  LogoutURLs include both `/chat` and `/workspace` (prod + localhost).

## Phase 2 — live redirect contract (post-deploy; NOT yet run)

Definition of done for task 9.5 / this stream requires these against the
**deployed** distribution after this PR's CDK changes are applied:

```bash
curl -sI https://aprovan.com/chat            | grep -i '^location:\|^HTTP'
curl -sI https://aprovan.com/chat/           | grep -i '^location:\|^HTTP'
curl -sI 'https://aprovan.com/chat/deep/path?x=1' | grep -i '^location:\|^HTTP'
```

Expected:

| Request | Status | Location |
| --- | --- | --- |
| `/chat` | 301 (or 308) | `/workspace/` (or `/workspace`) |
| `/chat/` | 301 (or 308) | `/workspace/` |
| `/chat/deep/path?x=1` | 301 (or 308) | `/workspace/deep/path?x=1` |

**Pre-deploy baseline (2026-08-10):** `curl -sI https://aprovan.com/chat`
returned `HTTP/2 200` with HTML — redirect not live yet. Task **9.5 left
unchecked** until Phase 2 passes after CDK deploy.

Paste the three raw curl outputs into this report / PR comments once
deployed.

## Brief 08 coordination

This stream owns infra/deploy only. Client base-path rename (brief 08) is
parallel. Deploy order per tech-plan Rollout §4: CDK deploy (this stream)
before-or-with the client rebuild that publishes to `workspace/`. Confirm in
the PR once brief 08's client rebuild has deployed together with (or after)
this infra change.

## Deviations

1. **D8 association shape (required for a deployable stack):** Brief/task 9.3
   asks for a *separate* `cloudfront.Function` placed *before* `StaticRewrite`
   in `functionAssociations`. AWS CloudFront allows only **one** edge-function
   association per event type per cache behavior
   ([docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-function-restrictions-all.html)).
   Two viewer-request associations would synth cleanly but fail (or drop an
   association) at deploy time. The D8 redirect contract is therefore inlined
   at the top of `StaticRewrite` so the early `return` still short-circuits
   before the rewrite — same runtime behavior, single association.
2. **Task 9.5 / Phase 2:** Not checked. Live curl gate requires a deployed
   distribution; this PR is pre-merge only (no merge/deploy from this stream).
