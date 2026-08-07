# App data: records vs files (shipped model)

Normative for how app and workspace **records** and **file partitions** are
stored after app-model-split (IW-1). Replaces the Personal / `dataScope` /
name-keyed model.

## Rule

> **Files are authored; records are accumulated.** Authored artifacts (source,
> docs, assets) live on the workspace FS. Accumulated state (keyvalue) lives in
> the **record store**: unversioned, invisible to the file plane, private to its
> partition by default.

## Identity

Apps and installations are ULIDs (`appId` / `installId`). `(workspaceId, name)`
is a mutable alias for URLs and display only — **no storage key embeds the
name**. Rename moves the alias; partitions and releases stay put.

## Partitions

| Plane | Shape | Owner |
| --- | --- | --- |
| File (per-app per-user) | `.apps/<appId\|installId>/data/<sub>/…` | `<sub>` |
| File (private space) | `.users/<sub>/…` | `<sub>` |
| Records (keyvalue) | scope `app#<appId\|installId>#u#<sub>` | `<sub>` |

- Install sessions partition on **`installId`**, not the origin `appId`.
- Foreign partitions answer **404** on both `vfs.*` and `/fs` (no existence
  oracle). Own partitions are listed; snapshots exclude both roots.
- The Personal pseudo-app (`.personal/…`) is **deleted**. There is no
  `dataScope` (`owner` / `workspace`) — installs always store in the installing
  workspace under the install ULID.

## Admin path

`apps.data` is the only sanctioned admin path into an app's per-user file /
record partitions (gated + audited). It cannot address `.users/**`. There is
no Personal special case.

## Registry boundary

Profile grants for installs use opaque `{kind: "app", id: <installId>}`
subjects. No app name, manifest, or schema crosses into
`@aprovan/registry-server`.

## Future (explicit non-goal today)

Inert-bundle export/import for offline / desktop hosts is **out of scope** for
this model flip (PRD Non-Goals). If origin workspaces go offline, installs
would need to snapshot release content at install time — that is a later
change, not a silent assumption of the current serve-from-origin path.

For workspace **execution locus** (local vs cloud), immutable locus, local
directory VFS containment, and why cloud workspaces have no offline cache, see
[local-first.md](./local-first.md).
