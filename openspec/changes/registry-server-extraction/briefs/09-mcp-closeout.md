# Brief: registry-server-extraction §9 — MCP host rewiring closeout

## Mission
Replace the product-host parallel MCP assembly with `createMcpHandler` from
`@aprovan/registry-server`, after capturing visibility equivalence. Ordering gate
satisfied: grant-enforcement §1 and §3 are on main.

## Read first
1. `openspec/changes/registry-server-extraction/tasks.md` §9
2. `briefs/00-report.md` and prior extraction context
3. grant-enforcement §1 report (403 message + permittedTools visibility snap)
4. aprovan `server/workspace/src/mcp/**`, `server/workspace/src/registry-embed.ts`
5. registry `packages/registry-server/src/mcp/**`

## Tasks
## 9. MCP host rewiring closeout (7.1 / 8.3 remainder)

> Depends-on: 7, 8 | Touches: server/workspace/src/mcp/**, server/workspace/src/registry-embed.ts, registry `packages/registry-server/src/mcp/**` | Verify: pnpm --filter @aprovan/workspace test -- mcp && pnpm --filter @aprovan/registry-server test -- mcp

**Why this section exists.** 7.1 and 8.3 are checked, but the MCP clause of 8.3 did
not land: `server/workspace/src/mcp/server.ts` is still a 326-line parallel assembly
with its own `buildMcpServer(principal)`, its own `permittedTools(all, principal)`, and
`makeExecute(principal)` in place of `dispatch()`. The registry-server implementation
(7.1) and the extension hook (7.2) were both built; the original was never removed or
rewired. The result is two `permittedTools` with the same name, different signatures,
and different semantics — only one of which routes through `resolveProfile`, the single
enforcement chokepoint the profiles spec designates.

- [ ] 9.1 Amend the 8.3 completion note to scope out `mcp/server.ts`; the claim
      "replace … and `mcp/server.ts` with package imports" is not true on main and
      should not stand as evidence.
- [ ] 9.2 **Ordering gate.** Land the profiles step-5 fix (gate the zero-config
      fallback on `authMode === "none"`; auto-provision a granted `default` profile
      row at credential-connect time) BEFORE 9.4. Both change what `permittedTools`
      returns; sequencing this first means the product host adopts the corrected
      predicate once instead of adopting the current one and shifting again.
- [ ] 9.3 Move `FS_TOOLS`/`handleFsTool` and `TELEMETRY_TOOLS`/`handleTelemetryTool`
      behind `McpExtensions` — the hook 7.2 built for exactly this. Tool behavior
      unchanged; registration path only.
- [ ] 9.4 Replace the `server/workspace/src/mcp/server.ts` assembly with
      `createMcpHandler(deps)` from `@aprovan/registry-server`, passing the 9.3
      extensions. Derive `CallContext` through the existing `registry-embed.ts`
      adapter (`Principal{sub, workspaceId, role, groupIds}` →
      `CallContext{principal, tenantId, role, groupIds}`); narrow `role: string` to
      `"admin" | "member"` explicitly and fail closed on any other value.
- [ ] 9.5 Delete `permittedTools(all, principal)` and `makeExecute(principal)` from the
      product host. Grep BOTH repos for a second `permittedTools` definition and assert
      exactly one survives.
- [ ] 9.6 Visibility-equivalence test, written and recorded BEFORE the 9.4 cutover:
      snapshot `list_tools` across (member, admin) × (granted, ungranted, no-stored-
      profile) against both implementations. The predicates are not equivalent —
      registry-server hides a namespace only on a 403 from `resolveProfile` — so the
      diff is an expected behavior change and belongs in the change notes, not in a
      bug report after the fact.
- [ ] 9.7 Remove untracked build litter: `packages/mcp/`, `packages/mcp-core/`, and
      `packages/mcp-app-server/` hold `dist`/`.turbo`/`node_modules` with no `src` and
      no `package.json`, and are tracked by git in zero files. Leftovers from the WS-4
      move; they shadow the real `@utdk/mcp*` packages during local resolution.


## Verify
```bash
cd ~/Documents/Code/AprovanLabs/aprovan
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/workspace test -- mcp
# and against published/workspace registry-server as available:
# pnpm --filter @aprovan/registry-server test -- mcp
```

## Constraints
- GE §1 + §3 merged — do not adopt the old ungated predicate
- Grep for deleted symbols after cutover (orchestrator DoD rule 4)
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw8-rse09`
- Branch `iw8/registry-extraction-09-mcp`; report `briefs/09-report.md`; do NOT merge
