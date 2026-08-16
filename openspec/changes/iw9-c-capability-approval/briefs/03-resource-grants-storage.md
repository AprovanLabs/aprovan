# Brief: Registry — resource grants: storage, matcher, dispatch enforcement

**Depends-on: -** | Repo: registry | Wave 0 (parallel with 1, 2)

## Mission

When you are done, `@aprovan/registry-server` has a `resource_grants` store
(`ResourceGrantRow`), a pure `matchesResourcePattern` matcher, exports those
from `index.ts`, and MCP/sandbox dispatch enforces resource patterns through
the existing grant-enforcement predicate (one chokepoint — registry half).
This is the contract aprovan streams 8 and 13 build against after publish+pin.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 1, 2, 4
3. `openspec/changes/iw9-c-capability-approval/prd.md` — Goals 1, 3
4. `openspec/changes/iw9-c-capability-approval/tech-plan.md` — D2, Interfaces (`ResourceGrantRow`, `matchesResourcePattern`)
5. `openspec/changes/iw9-c-capability-approval/specs/resource-grants/spec.md`
6. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 3 + external deps (F3 shapes)
7. Existing `profile_grants` storage + grant-enforcement dispatch (streams 4–5 precedent)
8. `packages/registry-server/src/mcp/sandbox-tool.ts`

Work in `/Users/jacob/Documents/Code/AprovanLabs/registry`.

## Tasks

- [ ] 3.1 Add a `resource_grants` store beside `profile_grants` in
      `storage/*` (sqlite + dsql drivers, same seam) with the
      `ResourceGrantRow` shape from tech-plan "Interfaces & Data"
      (`id, tenantId, subject{kind,id}, capability, resourcePattern,
      credentialLevel, grantedBy, createdAt, revokedAt?`). Spec:
      resource-grants "Grants are keyed by capability and resource
      pattern" (tech-plan D2).
- [ ] 3.2 Implement `matchesResourcePattern(pattern, resource): boolean`
      (~100 LOC, cf. Cloudflare OS `matchesResourceUrlPattern`): literal
      segments, `*` single-segment wildcard, `**`/trailing-`*` suffix
      wildcard, case-insensitive host, no regex, no network I/O, pure.
      Spec: resource-grants "URL-pattern matcher", scenarios "Wildcard
      host segment", "No partial-segment match".
- [ ] 3.3 Export `ResourceGrantRow`, `matchesResourcePattern`, and CRUD on
      the new store from `packages/registry-server/src/index.ts` — this
      is the contract aprovan's `evaluateDispatch` (stream 8) and the
      client-side `ResourcePatternInput` preview (stream 13) both build
      against.
- [ ] 3.4 Wire resource-pattern checks into registry-server's own
      MCP/sandbox dispatch (`mcp/sandbox-tool.ts`), extending
      `grant-enforcement` streams 4-5's single predicate rather than
      adding a second one. Spec: resource-grants "One dispatch
      chokepoint" (registry-side half — aprovan's four dispatch paths are
      stream 8).
- [ ] 3.5 New test file `dispatch/__tests__/resource-grants.test.ts`:
      matcher scenarios above, resource-grant row CRUD round-trip,
      MCP/sandbox dispatch denies a resource outside the pattern and
      allows one inside it.

## Acceptance criteria

From `specs/resource-grants/spec.md`:

### Requirement: Grants are keyed by capability and resource pattern
(storage half — scenarios "Action within/outside granted resource" are
fully proven on aprovan in stream 8; here prove CRUD + matcher + MCP deny/allow.)

### Requirement: URL-pattern matcher
#### Scenario: Wildcard host segment
- **WHEN** pattern `https://*.github.com/aprovan/**` is matched against
  `https://api.github.com/aprovan/registry/issues`
- **THEN** the matcher returns true

#### Scenario: No partial-segment match
- **WHEN** pattern `https://github.com/aprovan-labs/**` is matched against
  `https://github.com/aprovan-labs-evil/x`
- **THEN** the matcher returns false

### Requirement: One dispatch chokepoint
(registry-side half: MCP/sandbox uses the single extended predicate.)

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-server test -- resource-grants
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `registry/packages/registry-server/src/storage/**`, `registry/packages/registry-server/src/dispatch/**`, `registry/packages/registry-server/src/mcp/sandbox-tool.ts`, `registry/packages/registry-server/src/index.ts`, `registry/packages/registry-server/src/dispatch/__tests__/resource-grants.test.ts`
- Extend the existing grant-enforcement predicate — do not add a second gate.
- Do not publish (stream 5). Do not touch aprovan.

## Report back

Check off tasks; PR or `briefs/03-report.md` with exported API surface
stream 5/6/8 will pin against, and matcher edge cases discovered.
