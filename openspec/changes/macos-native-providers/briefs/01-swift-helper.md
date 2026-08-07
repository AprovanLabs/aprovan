# Brief: Swift helper skeleton

## Mission
Create a Swift package binary that binds an ephemeral loopback port and serves `/health` and `/availability` (AvailabilityReport with three capability states). Supervise it from Electron main with the same pattern as GatewaySupervisor (start, health-poll, backoff restart, stop on quit). Helper absence must degrade cleanly — app runs, native caps unavailable. Cover specs/loopback-provider-host/spec.md.

## Read first
1. openspec/changes/macos-native-providers/tasks.md section 1
2. openspec/changes/macos-native-providers/tech-plan.md (D1, D3)
3. openspec/changes/macos-native-providers/specs/loopback-provider-host/spec.md
4. desktop/src/gateway-supervisor.ts (pattern to mirror)
5. docs/desktop.md (archived desktop-shell context)

## Tasks
- [ ] 1.1 Create the Swift package producing a single binary that binds an ephemeral loopback port and serves `/health` (D1).
- [ ] 1.2 Implement `/availability` returning `AvailabilityReport` with the three capability states from the tech plan (D3).
- [ ] 1.3 Supervise the helper from Electron main using the same pattern as the gateway supervisor: start, health-poll, restart with backoff, stop on quit.
- [ ] 1.4 Ensure helper absence degrades cleanly — the application runs, native capabilities report unavailable, everything else is unaffected.
- [ ] 1.5 Cover every scenario in `specs/loopback-provider-host/spec.md`.

## Verify
pnpm --filter @aprovan/desktop test && swift test --package-path native/macos-helper

## Constraints
Touches: native/macos-helper/**, desktop/src/helper-supervisor.ts, desktop/src/__tests__/helper-supervisor.test.ts, plus minimal main.ts / tsup wiring to start the supervisor.
Mirror GatewaySupervisor APIs where sensible.
Do not implement ESM cache, chat, or notifications yet.
Check off 1.1–1.5 when done; open PR; write briefs/01-swift-helper-report.md.
Isolated worktree only.
