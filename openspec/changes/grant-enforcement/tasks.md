# grant-enforcement

Streams 1, 2 and 3 touch disjoint paths and may run in parallel. Stream 4 depends on 1.
Stream 5 depends on 1 and 4. **Stream 1 gates section 9 of `registry-server-extraction`**
— the product host must adopt the corrected predicate, not the current one.

## 1. Gate the zero-config fallback

> Depends-on: - | Touches: registry `packages/registry-server/src/profiles/resolve.ts`, `packages/registry-server/src/profiles/__tests__/resolve.test.ts` | Verify: `pnpm --filter @aprovan/registry-server test -- profiles`

- [x] 1.1 Enter step 5 only when `deps.authMode === "none"`. Under `oidc` / `api-key`, a
      missing `default` row is a 403 that names the namespace and says a workspace admin
      must grant a profile.
- [x] 1.2 Leave steps 1–4 and 6 untouched. Step 6 (named miss → 404 listing what exists)
      is correct and must keep its message.
- [x] 1.3 Update the module docstring: step 5 is no longer "the zero-config path", it is
      "the ungoverned-mode path".
- [x] 1.4 Tests: governed tenant + connected credential + no row → 403, not a credential;
      `authMode: "none"` + same state → resolves as before; admin under governed mode
      still passes via the existing `ctx.role === "admin"` branch.
- [x] 1.5 Test the MCP consequence directly: `permittedTools` now hides a namespace that
      has a credential but no granted profile. This is the visibility change section 9
      of `registry-server-extraction` must snapshot.

**Done when** no reachable path returns a credential without a grant check unless
`authMode` is `"none"`, proven by a test that enumerates every `return` in
`resolveProfile`.

## 2. Dynamic namespace access becomes an error

> Depends-on: - | Touches: registry `packages/remote/src/tools-scan.ts`, `packages/remote/src/imports.ts`, `packages/remote/__tests__/remote.test.ts` | Verify: `pnpm --filter @utdk/remote test`

- [x] 2.1 Make `tools[expr]` a parse error rather than an `unresolved` flag. The message
      names the construct and points at `tools.search()` for discovery and at
      `globalAlias` for slash-named providers.
- [x] 2.2 Remove `unresolved` from `ToolsAccessScan`, or retain it only as an always-false
      field if downstream UI depends on the shape — decide by grepping consumers first.
- [x] 2.3 Update `packages/registry-ui/src/dependency-panel.tsx`, which renders the
      warning chip today.
- [x] 2.4 Tests: bracket access throws; string-literal `"tools[x]"` inside source does not.

**Done when** no script can reach a namespace the static list does not contain, and the
warning chip is gone rather than orphaned.

## 3. Provision a granted default profile on credential connect

> Depends-on: - | Touches: registry `packages/registry-server/src/credentials/service.ts`, `packages/registry-server/src/profiles/service.ts`, `packages/registry-server/src/storage/**` | Verify: `pnpm --filter @aprovan/registry-server test -- credentials`

- [x] 3.1 On credential creation, write a `default` profile row bound to it and a grant
      to the connecting principal, in the **same transaction** as the credential.
- [x] 3.2 Apply to every creation path — direct create, OAuth authcode exchange, and any
      admin import. Grep for `credentials.create` call sites; a path that skips this
      reintroduces the hole 1.1 closed.
- [x] 3.3 If a `default` row already exists for that (tenant, target), bind the new
      credential only when the row has none; never silently repoint a pinned profile.
- [x] 3.4 Tests: connect → immediately dispatch, no admin step; transaction rollback
      leaves neither credential nor profile; second credential for the same provider does
      not steal the existing default.

**Done when** connecting a credential is still one user action under governed auth, and
a failed write leaves no half-state.

## 4. Run-scoped narrowing

> Depends-on: 1 | Touches: registry `packages/registry-server/src/config/types.ts`, `packages/registry-server/src/dispatch/**` | Verify: `pnpm --filter @aprovan/registry-server test -- dispatch`

- [ ] 4.1 Add `narrowedTo?: string[]` to `CallContext`, holding canonical provider names.
- [ ] 4.2 Validate at construction that it is a subset of the principal's grant; a
      superset is a 400 naming the offending entries, never a silent intersection.
- [ ] 4.3 Enforce in the same predicate as the grant check, so there is still one gate.
- [ ] 4.4 Record the narrowing in the audit span, distinct from the principal's full
      grant (PRD open question — assumed yes).
- [ ] 4.5 Tests: narrowed run cannot reach a granted-but-excluded namespace; a superset
      request is rejected rather than clamped.

**Done when** a caller can voluntarily reduce blast radius and cannot increase it.

## 5. MCP sandbox execution tool

> Depends-on: 1, 4 | Touches: registry `packages/registry-server/src/mcp/**`, `packages/registry-server/src/mcp/__tests__/**` | Verify: `pnpm --filter @aprovan/registry-server test -- mcp`

- [ ] 5.1 Register a sandboxed-TypeScript tool through the existing `McpExtensions` hook
      — not as a special case in `buildMcpServer`.
- [ ] 5.2 Route its `tools` global through the same `Dispatcher` as `call_tool`, so it
      passes `resolveProfile`. Assert with a test that a namespace hidden by
      `permittedTools` is also unreachable from inside a submitted script — this is the
      confused-deputy case and it is the reason this stream depends on stream 1.
- [ ] 5.3 Refuse to register the tool when `authMode === "none"`. Not registered — not
      registered-and-erroring.
- [ ] 5.4 Accept an optional narrowing argument that feeds `CallContext.narrowedTo`.
- [ ] 5.5 Tests: ungranted namespace unreachable from a submitted script; `authMode:
      "none"` omits the tool from `list_tools` entirely; narrowing argument is honoured.

**Done when** submitting arbitrary TypeScript through MCP reaches strictly less than or
equal to what `list_tools` showed the same caller.
