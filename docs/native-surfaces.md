# Native surfaces

How the workspace's native services get first-class UI in the chat app.
Companion to the apps native surface shipped in app-model-split (IW-1).

## Principle

**Every native capability may present itself as a built-in surface** in one
shared pane chrome. There is no second navigation model and no sidebar apps
sub-group.

## Information architecture (shipped)

```
Sidebar
├── FILES            (workspace tree — Private section maps `.users/<sub>`)
└── Surfaces         (plain rows from NATIVE_SURFACES)
    ├── Apps         → apps native surface (pane: Your apps / Installed /
    │                    Your flows / Directory)
    ├── Data         → keyvalue browser
    ├── Agents       → profiles + executions
    ├── …            → other native panels
```

- **Apps is a native surface** (`{id: "apps", …}` first in `NATIVE_SURFACES`).
  App selection and detail live **inside the pane** — not a sidebar sub-tree.
- The bespoke `SidebarApps` split-pane / drag-handle / persisted
  `patchwork:sidebar-apps` layout is **deleted**.
- There is no Personal pseudo-app row. Unpublished workflows appear under
  **Your flows (private)** in the Apps pane; publishing means bundling under a
  real app.
- Selecting a surface opens a content tab (`native:<id>`) in the same strip as
  files. The chat dock and notifications bell are untouched.

## Registry

`client/web/src/lib/native-surfaces.tsx` holds `NativeSurfaceDef[]`. Panels are
self-contained: they fetch through namespace transports, own loading/error
states, and never reach into ChatPage for app selection. The Apps panel is a
thin host that injects transports into `@aprovan/registry-ui`'s pane variant.

## Wire identity

List/detail payloads carry `appId` / `installId` / `originAppId` / `requires` /
pin fields. Names remain display aliases. Client code must not synthesize a
Personal / builtin entry.

## Future

Inert-bundle export/import and desktop host tiers remain explicit non-goals of
the current apps model; native-surface registration itself does not depend on
them.
