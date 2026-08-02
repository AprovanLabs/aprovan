# Stream 5 report: Interface labeling polish

## Summary

Interface surfaces now show human labels as the primary title, with namespace ids secondary. The `agent` interface reads as **Agent runtime** instead of a bare `agent` stub, and stays distinct from the Native **Agents** core service.

## Changes

### 5.1 InterfacesPanel

- Interface cards use `def.label` as the primary title (e.g. "Agent runtime").
- Namespace id (`agent`, `llm`, …) is shown secondary in muted monospace.
- Removed the local `PURPOSE` map — the gateway's `label` field is authoritative.

### 5.2 ServicesMenu

- Interfaces section rows use `title={info?.label ?? ns}` so catalog labels win over raw ids.
- Added test asserting `agent` → "Agent runtime" vs `agents` → "Agents".

## Verify

```bash
pnpm --filter @aprovan/patchwork-web exec vitest run src/lib/namespaces.test.ts  # 13 passed
pnpm --filter @aprovan/patchwork-web build                                       # ok
```

## Constraints honored

- `agent` interface retained; `compat.json` untouched.
- No credentials/playground files modified.
- Scope limited to InterfacesPanel, ServicesMenu, namespaces.test.ts, and tasks.
