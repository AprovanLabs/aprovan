# Stream 1 report — Instance records

## Built

`server/workspace/src/apps/instances.ts` owning shared-instance identity and
ACL resolution:

- Types: `HostingMode`, `AppInstanceRecord` (tech-plan Interfaces & Data)
- Scope helpers: `sharedRecordScope` → `app#<id>#shared#<instanceId>`;
  `sharedDataDir` → `.apps/<id>/shared/<instanceId>`
- Persistence: `svcScope("app-instances")` via `svc-records` helpers; key =
  ULID from `ulid` (same as `apps/identity.ts`)
- CRUD/ACL: `createInstance`, `getInstance`, `listInstances`,
  `addParticipant`, `removeParticipant`, `assertInstanceAccess`
- Managed installs: participant add/create reject non-members with 400 naming
  the membership requirement; `assertInstanceAccess` re-checks membership per
  request and deny-as-404s departed members; missing records fail closed (404)
- Hosting mode read via dynamic `import("./install.js")` so Stream 2 can
  delegate from `store.ts` without a static cycle; absent/`hosting` field
  defaults to `"managed"` (TD4)

Metering (`setInstanceCap`, `reserveInstanceBytes`, `recountInstanceUsage`,
`deleteInstance`) intentionally omitted — Stream 4.

## Verified

```bash
pnpm turbo run build --filter=@aprovan/workspace   # FAIL — pre-existing on origin/main
pnpm -C server/workspace exec vitest run tests/app-instances.test.ts  # 11/11 pass
pnpm -C server/workspace typecheck                 # FAIL — same pre-existing errors
```

| Command | Result |
|---|---|
| vitest `tests/app-instances.test.ts` | **11 passed** |
| turbo build / typecheck | **exit 2** — `native-dispatch.ts:311,339` vs `@aprovan/native` `NativeVcsDiff` (`string[]` vs `{path,hash}[]`). Reproduced on clean `origin/main` with this stream's files stashed; outside Touches (F6 VCS surface). |

## Deviations

1. **`sharedDataDir` lives in `instances.ts`** even though the tech-plan
   Interfaces block lists it under `apps/store.ts`. Tasks §1.1 and this
   brief require it here; Stream 2 may re-export or keep a twin — both must
   stay the same literal (Stream 6 contract freeze).
2. **Hosting mode is read off install records that Stream 3 will type** —
   today `AppInstallation` has no `hosting` field, so the module casts
   `install as { hosting?: HostingMode }` and defaults absent to `managed`.
   Tests seed hosted installs via raw `writeSvcRecord` under `svc#installs`.
3. **No metering APIs** — frozen interface lists them on this file, but
   Stream 4 owns those functions; exporting stubs would invite premature use.
4. **Verify build/typecheck red on `origin/main`** — `NativeVcsDiff` shape
   drift between `packages/native` and `server/workspace/src/native-dispatch.ts`.
   Not introduced by this stream; not fixable inside Touches. Vitest gate for
   this stream is green.

## Notes for Streams 2 and 4

- **Stream 2:** `assertPartitionAccess` should `await assertInstanceAccess(
  workspaceId, id, instanceId, callerSub)` on `"shared"` classification and
  let the 404 propagate unchanged. Import from `./instances.js`. Prefer
  dynamic import or keep `sharedDataDir` imported from here (or duplicate
  the one-liner) to avoid cycles — `instances.ts` already dynamic-imports
  `install.ts`.
- **Stream 4:** extend this same file with `setInstanceCap`,
  `reserveInstanceBytes`, `recountInstanceUsage`, `deleteInstance`; do not
  reshape `AppInstanceRecord` or the ACL functions. `storageBytes` /
  `storageCapBytes` fields are already on the record.
