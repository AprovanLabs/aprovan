# data-auth-model

Per-user private data, groups-to-profiles, mount lineage (WS-6)

**Depends on WS-3 `registry-server-extraction`** (Profiles schema, group→profile membership
storage, auth-time grant resolver) — only tasks stream 4 (and 5.2/5.3) block on it; streams
1–3 are free to start.

Artifacts: [prd.md](./prd.md) · [ux.md](./ux.md) · [tech-plan.md](./tech-plan.md) ·
[tasks.md](./tasks.md) · specs: [per-user-data](./specs/per-user-data/spec.md),
[group-profile-grants](./specs/group-profile-grants/spec.md),
[mount-lineage](./specs/mount-lineage/spec.md)
