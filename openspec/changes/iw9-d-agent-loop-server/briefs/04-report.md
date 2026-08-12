# Stream 4 report — `describe(namespace)` tool

## What landed

Native runner offers a second built-in, `describe { namespace, query?, cursor? }`,
alongside `call_tool`. It returns compact operation signatures from the shared
workspace tool catalog, filtered by the run's grant projection and paginated
at 40 ops/page. Ungranted namespaces refuse with `{ error, allowed }` and the
run continues (not `tool_denied`). Describing never widens `call_tool`
authority — the existing pattern-list check and `invokeTool` re-check are
untouched.

## Shared catalog signature (stream 8 cross-check)

```ts
// server/workspace/src/routes/tools.ts
export interface CatalogOperation {
  operation: string;
  params: string;       // e.g. "message, prefix?, ref?"
  description?: string;
}

export async function catalogForNamespace(
  workspaceId: string,
  namespace: string,
): Promise<CatalogOperation[]>;
```

Backed by `discoverTools` (same source as `GET /tools`), not a second catalog.

Also exported: `DESCRIBE_PAGE_SIZE = 40` from `agents/runner.ts`.

## Baselines

| Suite | Baseline (pre-change on #208 / then rebased to main) | After |
| --- | --- | --- |
| `tests/agent-describe.test.ts` | n/a (new) | **4/4 passed** |
| `tests/agent-run.test.ts` | **5 failed / 0 passed** | **5 failed / 0 passed** (no additional failures) |
| `pnpm --filter @aprovan/workspace typecheck` | — | clean |

`tests/agent-run-events.test.ts` (stream 2) still **5/5 passed** — grant
re-check / `tool_denied` event path unchanged.

## Tasks

4.1–4.6 checked in `tasks.md`.

## Deviations

1. **Catalog source name drift.** Brief/tasks cite extracting logic from
   `describeNamespaces` (line ~756). On current `main`, `describeNamespaces`
   only returns namespace *kind* metadata (`NamespaceInfo`). The operation
   catalog lives in `discoverTools` (what `GET /tools` uses). Extracted
   `catalogForNamespace` from that source — same catalog, correct function.
2. **Brief file allow-list vs report/tasks.** Brief constrained edits to
   `runner.ts` / `tools.ts` / `agent-describe.test.ts`; also updated
   `tasks.md` checkboxes and this report as required by Done means.
3. **Pagination fixture.** Real `vcs` has &lt;40 ops; pagination test spies
   `catalogForNamespace` to return 47 stub ops. Asserts against model-facing
   tool messages (24k cap), not the 2k truncated run-record echo.
4. **Rebase.** Started from #208; rebased onto latest `origin/main` including
   A2 #207 (`scope` on vcs discovery). No conflict in `tools.ts`.
