# Report: STT workspace integration and docs (stream 5)

## Summary
Wired `@utdk/stt@0.1.2` into the workspace catalog (existing interface→provider path, no bespoke dispatch branch), registered `stt` for bind-time streaming checks, added a fake-driver e2e session test, and documented the three caller footguns in `docs/stt.md`. Bumped `@aprovan/registry-server` to **^0.2.9**. This completes `stt-contract`.

## PR
(filled after create)

## Versions
| Package | Version |
|---|---|
| `@utdk/stt` | **^0.1.2** (resolved 0.1.2 from npm) |
| `@aprovan/registry-server` | **^0.2.9** |

## Changes
| File | Change |
|---|---|
| `server/workspace/package.json` | Deps: `@utdk/stt ^0.1.2`, `@aprovan/registry-server ^0.2.9` |
| `pnpm-lock.yaml` | Lockfile for the above |
| `server/workspace/src/interfaces.ts` | `CONTRACT_PACKAGES` += `@utdk/stt`; `INTERFACE_ORDER` += `"stt"` |
| `server/workspace/src/routes/sessions-streaming.ts` | Wire `registerSessionInterface("stt")` + Deepgram streaming caps; re-apply on reset |
| `server/workspace/tests/stt-sessions.test.ts` | Catalog assert + e2e (open → 3 pushes → partials + 1 final → close) |
| `server/workspace/tests/interfaces-catalog.test.ts` | Assert stt compat (deepgram + unavailable assemblyai) |
| `docs/stt.md` | Required encoding, per-segment `final`, session-scoped speakers |
| `docs/index.md` | Link to `stt.md` |
| `openspec/changes/stt-contract/tasks.md` | Checked off 5.1–5.4 |
| `openspec/changes/stt-contract/briefs/05-workspace-docs.md` | Task checkboxes marked done |

## Verify
```text
pnpm --filter @aprovan/workspace exec vitest run \
  tests/stt-sessions.test.ts \
  tests/interfaces-catalog.test.ts \
  tests/interfaces-streaming.test.ts \
  tests/streaming-sessions.test.ts   # 19/19 pass
pnpm --filter @aprovan/workspace check-types   # pass
```

## Notes for orchestrator
- Tasks **5.1–5.4** checked off; **stt-contract is complete** when this PR merges.
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-stt-05-workspace-docs` on `feat/stt-05-workspace-docs`.
- npm packument for `@utdk/stt@0.1.2` resolves; tarball fallback was not needed.
- E2e uses a deepgram credential so interface resolve (zero-config) succeeds, then the registered fake driver serves the session — same tools path as production, no bespoke `stt` branch in `tools.ts`.
- Production Deepgram driver registration (loading `@utdk/clients/deepgram` into `registerSessionOperation`) remains a follow-on; bind-time + catalog + session wire are ready.
