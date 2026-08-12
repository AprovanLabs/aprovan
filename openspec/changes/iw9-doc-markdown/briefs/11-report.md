# Report: Playwright E2E — cursors, agent merge, conflict draft (Stream 11)

**Status:** done · **Branch:** `feat/iw9-doc-e2e`

## What shipped

| Spec | Covers |
| --- | --- |
| `client/web/e2e/doc-live-cursors.spec.ts` | 11.1 + 11.4 — two contexts, character sync, named `.cm-ySelectionCaret`, `attachWsCapture` invariant-9 spot-check |
| `client/web/e2e/doc-agent-merge.spec.ts` | 11.2 — concurrent human typing + agent-shaped `vfs.write` (`base` + `agentProfile: document/fix-typos`) |
| `client/web/e2e/doc-conflict-draft.spec.ts` | 11.3 — forced conflict → `doc-draft-banner` → MergeDialog keep-draft → merge commit + no open staged session |

Harness reuse only: `e2e/fixtures/two-users.ts`, `e2e/fixtures/ws-capture.ts`. No Playwright bootstrap / `package.json` edits.

### Setup knobs used by the specs

- Fresh `E2E_WORKSPACE_DATA_DIR` (suite SQLite, not `~/.aprovan`)
- Invite facade for peer membership (auth-none browsers remain `sub: local`)
- Seed `patchwork:workspace-endpoints` with absolute `http://127.0.0.1:<port>/api/gateway` so browser WS bypasses Vite’s `/gateway` proxy (no `ws: true`)
- Normalize editor after connect (select-all + insert) to collapse Yjs empty-seed races

## Verify

```bash
export E2E_WORKSPACE_DATA_DIR="$(mktemp -d /tmp/aprovan-doc-e2e-XXXXXX)"
# optional dedicated ports when 4010/5174 are busy:
# export E2E_GATEWAY_PORT=4013 E2E_WEB_PORT=5177
pnpm --filter @aprovan/patchwork-web exec playwright test \
  e2e/doc-live-cursors.spec.ts e2e/doc-agent-merge.spec.ts e2e/doc-conflict-draft.spec.ts \
  --retries=0
# → 3 passed
```

## Deviations

1. **11.2 uses `vfs.write`, not `agents.run`** — stream 10 is on main, but LLM scripting is flaky in Playwright; write hits the same reconcile choke (`agentProfile: document/fix-typos`). Called out in the spec header.
2. **Reconcile does not fan-out Yjs updates over WS** (stream 5 gap) — after an applied agent write the open CM6 view does not update live. Spec asserts merge via quiesce materialize + remount (and no `doc-reconnecting` / draft banner during the live window).
3. **Conflict resolve vs quiesce race** — keep-draft apply writes FIXED to FS while live Yjs still holds the human rewrite; idle quiesce can overwrite live FS. Spec asserts Goal 3 via the **merge commit tree** (`vfs.read` with `commit: <mergeId>`), then remounts and checks banner/staged cleared.
4. **Gateway 429** — DraftBanner polls `sessions.list`; aggressive resolve polling tripped rate limits across the shared webServer. Specs retry gateway JSON on 429 with backoff.
5. **`tasks.md` / `briefs/11-report.md`** — outside the three-path allowlist; required by Report back.

## Flake notes

- Prefer a **fresh** `E2E_WORKSPACE_DATA_DIR` and free ports (`CI=1` so webServer does not reuse a stale gateway).
- Stagger two-user joins (A normalize → B join → A re-normalize) to avoid duplicate `# Title` seed races.
- Named caret text is auth-none fallback (`Member`); presence cluster may dedupe identical names — caret DOM is the Goal 1 bar.

## Notes for next wave

- Publish reconcile Yjs updates to `doc:<path>` subscribers (fixes live agent-merge observation without remount).
- Add `ws: true` on Vite `/gateway` proxy (or keep absolute endpoint seeding for E2E).
- After MergeDialog apply, update live Yjs **before** returning so quiesce cannot clobber the applied FS write.
