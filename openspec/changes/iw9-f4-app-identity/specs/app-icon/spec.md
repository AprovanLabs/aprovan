# app-icon — icon field and deterministic fallback

Delta for iw9-f4-app-identity. Grounded in IW-9 decision D6.

## ADDED Requirements

### Requirement: Icon is a manifest field
`app.yaml` SHALL accept an optional `icon` field: either a named icon identifier or an app-relative path to an image file under the app's own root. An icon path escaping the app root SHALL be rejected at validation.

#### Scenario: custom icon accepted
- **WHEN** `app.yaml` declares `icon: assets/logo.svg` and the path is app-root-relative
- **THEN** validation passes and the icon reference is available on the loaded manifest

#### Scenario: escaping icon path rejected
- **WHEN** `app.yaml` declares an icon path containing traversal or an absolute path outside the app root
- **THEN** validation fails naming the field

### Requirement: Deterministic letter-plus-color fallback
Every app without a custom icon SHALL render a fallback icon: the first character of the slug (uppercased) on a background color chosen deterministically from a hash of the slug over a fixed palette. The mapping SHALL be pure — same slug yields the same color on every surface and platform — and is specified as a shared function so server-rendered and client-rendered surfaces agree.

#### Scenario: fallback is deterministic
- **WHEN** the fallback icon for slug `recipes` is computed twice, in any environment
- **THEN** both computations yield the same letter (`R`) and the same palette color

#### Scenario: rename changes fallback
- **WHEN** an app with no custom icon is renamed from `recipes` to `cookbook`
- **THEN** the fallback re-derives from the new slug (letter `C`, hash-selected color for `cookbook`)

### Requirement: Directory rows carry icon data
The deployment directory row and workspace app listings SHALL carry the resolved icon reference (custom) or the fallback inputs (slug), so launcher and directory UIs (Wave 1) can render icons without reading `app.yaml`.

#### Scenario: directory exposes icon
- **WHEN** a published app's directory entry is listed
- **THEN** the entry includes either the custom icon reference or enough data (slug) to render the fallback
