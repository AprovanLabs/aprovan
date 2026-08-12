# Stream 4 report — Chat `app.yaml`, host modes, capability ceiling

**PR:** https://github.com/AprovanLabs/aprovan/pull/230
**Branch:** `feat/iw9-chat-app-manifest`
**Base:** `origin/main`

## Built

| Path | Role |
|---|---|
| `Apps/chat/app.yaml` | Slug `chat`, icon, `hostModes: [managed, creator-hosted]`, exact capability ceiling |
| `Apps/chat/README.md` | Host-mode + ceiling notes for later streams |
| `server/workspace/tests/chat-app-manifest.test.ts` | Loader parse, exact ceiling, both modes, no bare `*` |

### Capability ceiling (exact)

```yaml
capabilities:
  - records.*
  - realtime.subscribe
  - realtime.publish
  - invites.create
  - agents.run
```

`agents:` profile block is **not** declared here — stream 5 owns `chat/summarize`.

## 4.2 Platform confirmation (no Chat-local workaround)

iw9-b **has landed** multi-mode install prompting — **no blocking gap**:

| Surface | Evidence |
|---|---|
| API requires pick | `resolveHostingChoice` 400 when multi-bucket and no `requested` (`install.ts`; covered in `apps-install-copy.test.ts`) |
| UI prompts | `InstallDialog` → `HostingModePicker` when `needsHostingPick`; wired from `AppsPanel` |
| Mode immutable | `saveInstall` rejects hosting / `hostingWorkspaceId` flips (`Hosting mode is immutable at creation`) |

## Verified

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/chat-app-manifest.test.ts
# ✓ 3 passed
```

## Tasks

| Task | Status |
|---|---|
| 4.1 Author `Apps/chat/app.yaml` | done |
| 4.2 Confirm host-mode prompt / immutability (or file gap) | done — platform OK, no gap |
| 4.3 `tests/chat-app-manifest.test.ts` | done |

## Deviations

1. **Host-mode enum names** — brief/tech-plan illustrative labels were
   `workspace-managed` / `hosted-by-creator`. Landed F4 grammar is
   `managed` / `creator-hosted` (see `AppYamlSchema`). Manifest uses the
   landed enum; product copy still maps to managed vs hosted buckets.
2. **Touches only** — no Chat-local install-flow code; no `agents:` block
   (stream 5).
