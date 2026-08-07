## Flows

### Flow: Create a local workspace

1. User opens the workspace switcher and chooses to create a workspace.
2. User picks the kind: **Local** (this machine) or **Cloud** (aprovan.com). Cloud is disabled with an explanation when no account is linked.
3. For Local, the user chooses a directory to be the workspace's file root. The default is a subdirectory the app proposes, never the home directory.
4. The app states plainly that this directory is the boundary — agents and widgets in this workspace can read and write inside it and nowhere else.
5. Workspace is created and becomes active. Failure paths: directory not writable → inline error, stay on step 3. No key provider available → creation refused with an explanation, since plaintext credential storage is not offered.

### Flow: Switch between a local and a cloud workspace

1. User opens the switcher; local and cloud workspaces are listed together, visually distinguished by kind.
2. User selects a workspace of the other kind.
3. Client resolves that workspace's gateway and token, and the surface repopulates. No reload, no re-login.
4. Failure path: a cloud workspace is selected while offline → the workspace opens in an unavailable state naming connectivity as the cause, with local workspaces still reachable from the switcher.

### Flow: Bind an interface in a local workspace

1. User opens interface bindings for a local workspace.
2. `vfs` offers **Local directory** alongside the existing implementations; it needs no credential.
3. Other interfaces offer remote providers as usual; the user supplies a credential, which is stored locally and encrypted.
4. Failure path: choosing a local-machine-backed provider inside a cloud workspace → the option is shown disabled with the reason, rather than failing after selection.

## Screens & States

### Workspace switcher

- **Purpose**: pick the active workspace and see, at a glance, which are local and which are cloud.
- **Key elements**: grouped list by kind; kind badge per row; the local root path shown as secondary text; a create action.
- **States**: *empty* — no workspaces, so a single create-your-first action with both kinds explained; *unauthenticated* — only local workspaces, with a link-account affordance; *offline with cloud workspaces present* — cloud rows shown disabled with a connectivity reason, never silently missing; *loading* — skeleton rows, existing selection preserved.

### Workspace creation

- **Purpose**: choose kind and, for local, choose the root.
- **Key elements**: kind selector; directory picker with the proposed default; a plain-language statement of the containment boundary.
- **States**: *cloud unavailable* — kind disabled with a reason; *directory not writable* — inline error on the picker; *no key provider* — creation blocked with an explanation.

### Interface bindings

- **Purpose**: bind each interface to an implementation for the active workspace.
- **Key elements**: one row per interface; provider selector; credential affordance where required; the local root displayed for a local-directory binding.
- **States**: *credentialless provider selected* — credential affordance hidden, not shown empty; *provider disallowed for this locus* — option disabled with reason; *bind rejected* — error retained inline next to the interface rather than as a toast.

## Component Inventory

Existing `@aprovan/ui` primitives and the radix-ui set already in use. The switcher extends the current workspace selector rather than introducing a new pattern. The directory picker is the one new element — in this change it is a plain path input with validation; `desktop-shell` replaces it with the native picker.

## Open Questions

None outstanding. Workspace kinds, immutable locus, and the absence of an offline cache for cloud workspaces were settled in the 2026-08-06 grilling session.
