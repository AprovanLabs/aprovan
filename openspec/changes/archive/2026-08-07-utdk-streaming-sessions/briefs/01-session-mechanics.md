# Brief: Session mechanics in @utdk/common

## Mission
Land `@utdk/common/streaming` with `StreamingMode`, `StreamingCapabilities`, `SessionEvent`, `StreamingSessionDriver`, and `SessionManager` (id minting, ownership, fan-out, monotonic seq, open→active→closed, idle/absolute reclamation with injectable clock). Export `./streaming`. Nothing imports it yet — additive only.

## Read first
1. In **aprovan**: `openspec/changes/utdk-streaming-sessions/tech-plan.md` (D3, D5, Interfaces & Data)
2. `openspec/changes/utdk-streaming-sessions/specs/streaming-sessions/spec.md` (lifecycle, ownership, reclamation)
3. `openspec/changes/utdk-streaming-sessions/tasks.md` — section 1 only
4. In **registry**: `packages/utdk/common/package.json`, `packages/utdk/common/index.ts`, existing modules for style

## Tasks
- [ ] 1.1 Add `StreamingMode`, `StreamingCapabilities`, `SessionEvent`, and `StreamingSessionDriver` exactly as declared in the tech plan's Interfaces & Data (D3).
- [ ] 1.2 Implement `SessionManager`: id minting, principal ownership recorded at open, driver subscription fan-out, monotonic `seq` per session, and the `open → active → closed` state machine.
- [ ] 1.3 Implement idle-timeout and absolute-cap reclamation with injectable clock and timer so expiry is testable without wall time (D5).
- [ ] 1.4 Export `./streaming` from the package exports map.
- [ ] 1.5 Tests: event ordering with zero pushes, push-after-close returns the 409 condition, idle reclamation releases the driver, absolute cap fires while pushes continue, ownership check distinguishes `session-forbidden` from `session-not-found`.

## Acceptance criteria
Types match tech plan verbatim. Spec scenarios for session lifecycle, ownership, and reclamation that can be unit-tested without HTTP all pass.

## Verify
```bash
pnpm --filter @utdk/common test && pnpm --filter @utdk/common check-types
```

## Constraints
- Work in the **registry** git repo only under `packages/utdk/common/**`.
- Do not modify workspace routes or aprovan (section 2+).
- Types must be exactly:
  ```ts
  export type StreamingMode = "response" | "session" | false;
  export interface StreamingCapabilities {
    streaming: boolean;
    encodings: string[];
  }
  export interface SessionEvent {
    type: string;
    seq: number;
    data: unknown;
  }
  export interface StreamingSessionDriver {
    readonly capabilities: StreamingCapabilities;
    openSession(args: Record<string, unknown>): Promise<{ providerSessionId: string }>;
    push(providerSessionId: string, message: Record<string, unknown>): Promise<void>;
    close(providerSessionId: string): Promise<unknown>;
    subscribe(providerSessionId: string, sink: (event: SessionEvent) => void): () => void;
  }
  ```
- Error conditions for push-after-close / ownership must be distinguishable (`409` / `session-forbidden` / `session-not-found`) as the spec describes.
- Branch from latest `main`, push, open PR. Bump `@utdk/common` patch version per repo convention.
- Check off tasks in aprovan `openspec/changes/utdk-streaming-sessions/tasks.md` section 1 (or note for orchestrator).

## Report back
What you built, version, verification, anything session routes (section 3) need.
