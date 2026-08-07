# Brief: On-device chat provider

## Mission
Implement `/v1/chat/completions` and `/v1/models` over the on-device model (OpenAI shapes + streaming); report availability states; add `availabilityProbe` to the compat schema (enumerated); add a `CHAT_PROVIDERS` entry with loopback `baseUrl` and `credentialless: true`; reject bind when the probe reports unavailable; no `llm` contract change. Cover `specs/native-llm-provider/spec.md`.

## Read first
1. `openspec/changes/macos-native-providers/tasks.md` section 3
2. `openspec/changes/macos-native-providers/tech-plan.md` (D2, D3)
3. `openspec/changes/macos-native-providers/specs/native-llm-provider/spec.md`
4. `native/macos-helper/` (stream 1 skeleton — extend with ChatCompletions)

## Depends-on
Stream 1 merged (`01-swift-helper` / PR #137).

## Tasks
- [ ] 3.1 Implement `/v1/chat/completions` and `/v1/models` over the on-device model, matching the chat-completion and model-list shapes the `llm` contract declares, including the streaming response form (D2).
- [ ] 3.2 Report the model's capability as available, unsupported, or disabled via `/availability`, distinguishing an unsupported OS from a user-disabled feature.
- [ ] 3.3 Add the optional `availabilityProbe` field to the compat schema, restricted to an enumerated set of probe identifiers rather than an open string (D3 risk).
- [ ] 3.4 Add the provider to `CHAT_PROVIDERS` with a loopback `baseUrl`, `credentialless: true`, and its probe identifier.
- [ ] 3.5 Reject binding when the probe reports unavailable, surfacing the reported reason.
- [ ] 3.6 Assert no change to the `llm` contract, its shapes, or its dispatch, satisfying "No contract change for native inference".
- [ ] 3.7 Cover every scenario in `specs/native-llm-provider/spec.md`.

## Verify
In the **registry** sibling repo (`/Users/jacob/Documents/Code/AprovanLabs/registry`):
```bash
pnpm --filter @aprovan/registry-server test
```
In **aprovan**:
```bash
swift test --package-path native/macos-helper
```

## Cross-repo (IMPORTANT)
This stream spans **two repositories**:

| Repo | Paths |
|------|--------|
| **aprovan** | `native/macos-helper/Sources/ChatCompletions/**` (and related helper wiring) |
| **registry** | `packages/registry-server/src/catalog/default.ts`, `packages/utdk/common/compat.ts` (paths as listed in tasks.md under `registry/packages/…`) |

Expect separate PRs in both repos. After registry changes publish (or are otherwise consumable), aprovan may need a dependency bump to pick up the catalog/compat updates. Document that bump in the aprovan PR if required.

## Constraints
Touches (aprovan): `native/macos-helper/Sources/ChatCompletions/**` (+ minimal helper wiring).
Touches (registry): `packages/registry-server/src/catalog/default.ts`, `packages/utdk/common/compat.ts`.
Do not change the `llm` contract, its shapes, or its dispatch.
Do not implement ESM cache or native notifications in this stream.
Check off 3.1–3.7 when done; open PRs in both repos as needed; write `briefs/03-on-device-chat-report.md` in aprovan.
Isolated worktree only (aprovan and registry).
