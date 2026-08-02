/**
 * Last-run status, fetched on demand and shared by every row that asks for it.
 *
 * Moved to `@aprovan/ui/apps-store` (2026-07-24) — re-exported here so `./last-runs`
 * keeps resolving inside this package. Same context singleton either way: a
 * host that imports `LastRunProvider` from `@aprovan/ui/apps-store` directly
 * and a row that reads `useLastRun` through this re-export share one cache.
 */
export { LastRunProvider, useLastRun, useRecordRun } from "@aprovan/ui/apps-store";
