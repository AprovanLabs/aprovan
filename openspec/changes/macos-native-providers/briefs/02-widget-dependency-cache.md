# Brief: Widget dependency cache

## Mission
Implement `/esm/*` in the Swift helper mirroring the public CDN specifier grammar; use versioned cache keys; generate the seed set from default workspace widget deps at build time; call `setCdnBaseUrl()` at renderer startup when the helper is available; unresolvable deps fail with a named error. Cover `specs/widget-dependency-cache/spec.md`.

## Read first
1. `openspec/changes/macos-native-providers/tasks.md` section 2
2. `openspec/changes/macos-native-providers/tech-plan.md` (D5)
3. `openspec/changes/macos-native-providers/specs/widget-dependency-cache/spec.md`
4. `packages/compiler/src/cdn-config.ts`
5. `native/macos-helper/` (stream 1 skeleton)
6. `desktop/src/helper-supervisor.ts` (helper availability)

## Depends-on
Stream 1 merged (`01-swift-helper` / PR #137).

## Tasks
- [ ] 2.1 Implement `/esm/*` mirroring the public CDN's specifier grammar, serving from disk and fetching through on a miss (D5).
- [ ] 2.2 Key the cache by fully resolved specifier including version; never satisfy a request from a different version.
- [ ] 2.3 Generate the seed set from the default workspace's widget dependencies at build time rather than hand-maintaining a list, and ship it in the app.
- [ ] 2.4 Call `setCdnBaseUrl()` at renderer startup when the helper is available; leave the public default in place otherwise.
- [ ] 2.5 Make an unresolvable dependency fail with a message naming it, never hang or render blank.
- [ ] 2.6 Cover every scenario in `specs/widget-dependency-cache/spec.md`, including a first-run offline render against seeded dependencies only.

## Verify
```bash
pnpm --filter @aprovan/patchwork test && swift test --package-path native/macos-helper
```
(`packages/compiler` package name is `@aprovan/patchwork`.)

## Constraints
Touches: `native/macos-helper/Sources/EsmCache/**`, `desktop/src/seed-deps.ts`, `packages/compiler/src/cdn-config.ts`, plus minimal renderer/desktop wiring for `setCdnBaseUrl`.
Stay in the aprovan repo (registry sibling not required for this stream).
Do not implement on-device chat or native notifications.
Check off 2.1–2.6 when done; open PR; write `briefs/02-widget-dependency-cache-report.md`.
Isolated worktree only.
