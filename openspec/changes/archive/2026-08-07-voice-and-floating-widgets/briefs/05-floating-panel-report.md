# Report: Floating panel and hotkey (stream 5)

## What was built

Non-activating floating panel + global hotkey + narrow `PanelBridge`, without cross-surface continuity (stream 6):

- **Pre-warmed panel (D4)** — `desktop/src/panel.ts` creates a hidden `type: "panel"` `BrowserWindow` at launch (`show: false`, `alwaysOnTop`, `skipTaskbar`). Summon only shows the existing window; it never constructs one.
- **Global hotkey** — `desktop/src/hotkey.ts` registers a user-configurable accelerator (default `Alt+Space`), persists to Application Support `panel-hotkey.json`, reports conflicts at startup via dialog + log, and releases the previous binding on change (restoring it if the new one conflicts).
- **`PanelBridge`** — exactly `onSummon` / `hidePanel` / `resizePanel(height)` via `preload-panel.ts` + IPC (`panel:summon|hide|resize`). Surface asserted like `DesktopBridge`.
- **Panel host** — `client/web/src/features/panel/**` loads at `?surface=panel`, listens for summon, dismisses with Escape/Hide, mounts widgets through the shared iframe sandbox contract (`allow-scripts` + `allow-same-origin`, same as chat `WidgetPreview`), and drives content height via `resizePanel` within configured bounds (min 120 / max 720, width fixed at 420).
- **Mount tests** — `widget-mount-contract.test.ts` covers both `chat` and `panel` hosts; desktop `__tests__/floating-panel.test.ts` covers D4 options, PanelBridge surface, hotkey conflict/rebind/persist, and height clamping.

### Layout

| Path | Role |
| --- | --- |
| `desktop/src/panel.ts` | Pre-warmed non-activating panel + height clamp |
| `desktop/src/hotkey.ts` | Global hotkey register / rebind / conflict report |
| `desktop/src/panel-bridge.ts` | `PanelBridge` types + surface assert |
| `desktop/src/panel-bridge-api.ts` | Preload API factory |
| `desktop/src/preload-panel.ts` | Exposes `window.panel` |
| `desktop/src/panel-handlers.ts` | Main IPC for hide/resize |
| `desktop/src/main.ts` | Create panel + register hotkey at launch |
| `client/web/src/features/panel/**` | Panel renderer, mount contract, compiler bootstrap |
| `client/web/src/App.tsx` | Routes `?surface=panel` → `FloatingPanelApp` |

## Verify

```bash
pnpm --filter @aprovan/desktop test          # 98/98 pass (14 new stream-5 tests)
pnpm --filter @aprovan/patchwork-web typecheck  # pass
```

## Deviations

1. **Enter-to-mount demo widget** — panel input mounts a trivial local widget on Enter so the shared mount path is exercisable without stream-6 session wiring. No gateway session open/resume.
2. **Hotkey change API is main-process only** — `setAccelerator` lives on the hotkey registrar (prefs-backed); not added to `PanelBridge` (bridge stays summon/hide/resize only). A settings UI can call it later.
3. **Thin glue outside Touches** — `main.ts`, `paths.ts`, `tsup.config.ts`, `App.tsx`, and notification window filtering so the panel is not mistaken for the main window.

## For stream 6 (continuity)

- Panel and chat are separate realms (`window.panel` vs `window.desktop`); no client state is shared across the bridge.
- `FloatingPanelApp` does **not** open or resume a gateway session yet — stream 6 should add session open/resume + workspace session-list recording here (and keep continuity off the bridge).
- `onSummon` is the hook to re-attach UI to an existing session id after dismiss/re-summon; `hidePanel` does not clear renderer widget state today (window stays warm) — stream 6 should decide whether to clear or resume deliberately.
