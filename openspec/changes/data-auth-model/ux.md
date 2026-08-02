# UX — data-auth-model (WS-6)

This change has real user-facing surface in three places: per-user private data visibility
(chat client file tree + file APIs' observable behavior), the groups/profiles admin UI
(registry AdminPanel), and the app Access pane (registry-ui app detail). Mount lineage adds a
read-only section to commit/history views.

## Flows

### Flow: A member's private data stays private (per-user-data)

1. Member A opens the chat client; the file tree shows a **Private** section — A's own
   `.personal/data/<A>` partition rendered as a plain folder (e.g. `Private/notes.md`).
2. A creates/edits files there like any other file; writes pass through normally.
3. Member B lists the workspace: no `.personal/data/**` or `apps/*/data/**` entries appear
   (unchanged), and B's own Private section shows only B's partition.
4. B requests A's exact path (`GET /fs/.personal/data/<A>/notes.md` or
   `vfs.read`): **404 Not found** — same response as a nonexistent path; no existence oracle.
5. B attempts `vfs.write`/`vfs.delete`/`PUT /fs/...`/`DELETE /fs/...` on A's path: **404**.
6. Failure path: A requests their own path with a bad version hash → ordinary 404; A's own
   partition never 404s for ownership reasons.

### Flow: App admin inspects a user's app data (audited)

1. App admin opens the app's admin surface (or calls `apps.data`) and names `{name, user, key?}`
   — now also file paths within `<appRoot>/data/<user>/`.
2. The gateway verifies the caller holds the app's admin role, serves the data, and writes an
   audit entry (who, which app, which user's partition, when).
3. Non-admin caller → 403 with a message naming the required role.
4. Personal partitions: no such procedure exists for `.personal/**` — any attempt is 404 like any
   other foreign read. Admins are told this in the procedure's error ("personal data has no
   admin override").

### Flow: Admin grants a group capability via profiles (group-profile-grants)

1. Admin opens Admin → **Groups**, selects a group.
2. The detail card shows two sections: **Members** (unchanged) and **Profiles** (new — replaces
   the removed "Prefix grants" and "Tool grants" sections).
3. Admin clicks "Attach profile", picks from the workspace's profiles (WS-3 list endpoint),
   confirms. The profile chip appears with its target (`interface: sql` / `provider: github`) and
   credential name.
4. Every member of the group can now invoke what the profile grants — effective on next call
   (auth-time join; no session refresh needed).
5. Detach: × on the chip → confirm → removed; the group loses that capability on next call.
6. Failure paths: profile list fails to load → inline error with retry, sections stay usable;
   attach conflict (already attached) → idempotent success; workspace has no profiles yet →
   empty state links to the Profiles admin page ("Create a profile first").

### Flow: Commit history answers "built against what?" (mount-lineage)

1. A workspace has `vendor/charts` mounted from `org/charts@main`.
2. Member commits ("Apply to workspace" / `vfs.commit`). The gateway resolves `main` → commit SHA,
   records the token + provenance on the commit.
3. Member opens the commit in history (`vfs.show` / history panel): below the file changes, a
   **Mounted content** section lists each mount: prefix, source (`github.com/org/charts@main`),
   resolved version (`main → 3f2a91c`), and retrieved-at time.
4. Later, upstream pushes to `main`. A new commit records the new SHA; comparing the two commits
   shows the mounted view moved even though no native file changed.
5. Failure path: the mount's backing store is unreachable at commit time → the commit still
   succeeds; the mount's entry shows "version unavailable at commit time" (provenance recorded,
   token null).

### Flow: Reading the Access pane after this change (truthfulness)

1. User opens an app's detail → **Access** tab.
2. "Where your data lives" states: records partition (`records: app#<name>#u#<you>`) and, for
   file-plane data, "your partition is readable only by you; the app's admins can access it via
   an audited procedure" — language that is now literally true.
3. Provider-grant rows name the **profile** that executes each grant (e.g. "runs with profile
   `github-bot` (github credential)"), not just a bare provider name.
4. Degraded state (unchanged pattern): a gateway without `apps.capabilities` falls back to
   manifest-derived text and says so.

## Screens & States

### Chat client file tree (aprovan/client/web)

- **Purpose**: browse workspace files; now also the home of "my private files".
- **Key elements**: existing tree + a `Private` top-level section mapping to
  `.personal/data/<self>` (path prefix translated in display; raw paths still work in tabs/URLs).
- **States**: *empty* — Private section shows a hint ("Files here are visible only to you");
  *loading* — inherits tree skeleton; *error* — inherits tree error handling; *partial* — if the
  listing omits the partition (old gateway), the section simply doesn't render (feature-detect on
  presence of own-partition entries; no error).

### Admin → Groups tab (registry/apps/registry AdminPanel)

- **Purpose**: manage groups, membership, and (new) profile grants.
- **Key elements**: group list (unchanged); group detail = Members section + **Profiles** section
  (attach picker, chips with target/credential, detach). **Removed**: Prefix grants section,
  Tool grants section.
- **States**: *loading* — per-section spinners (existing pattern); *empty profiles* — "No profiles
  attached. Members get only their direct permissions."; *no workspace profiles* — CTA to the
  Profiles page; *error* — inline message + retry, other sections unaffected; *stale group*
  (deleted elsewhere) — 404 → return to list with notice.

### App detail → Access tab (registry/packages/registry-ui app-detail.tsx)

- **Purpose**: who may open the app, what it may touch, where data lives — must stay truthful.
- **Key elements**: existing Who/What/Limits sections; partition strings from
  `apps.capabilities` updated server-side (no client redesign); provider-grant rows gain the
  executing profile name.
- **States**: unchanged degradation ladder (capabilities → manifest-derived); *partial* — a
  gateway that predates profiles shows the old credential-name string (server decides the string;
  client renders text either way).

### Commit detail / history (chat client SessionBar history + `vfs.show` consumers)

- **Purpose**: inspect a commit; now includes mounted-content lineage.
- **Key elements**: existing change list; new **Mounted content** rows: prefix, source origin,
  ref → resolved token (short), retrieved-at (relative time). Read-only.
- **States**: *no mounts* — section absent; *token null* — "version unavailable at commit time"
  badge; *old commits* (pre-change) — section absent, no error.

## Component Inventory

- Admin Groups tab: existing shadcn/ui `Card`, `Button`, `Input`, list rows; profile picker uses
  the existing select/combobox primitive from the AdminPanel; chips = `Badge`.
- Access tab: text-only changes ride existing registry-ui components; no new components.
- File tree Private section: existing tree node components in the chat client; one new section
  header (same primitive as other tree roots).
- Commit detail: existing history/list rows; `Badge` for the token state; no new primitives.

## Open Questions

1. **Display name for the personal partition**: "Private" vs "My files" vs `~/`.
   Recommendation: **Private** — matches the enforcement story; avoid `~` (already means
   "app-relative" in vfs paths).
2. **Should the Groups detail link each attached profile to its definition page?**
   Recommendation: yes, chip click navigates to the profile (cheap, aids audit); if the profiles
   admin page ships later in WS-3/WS-4, render chips without links until it exists.
