# registry-standalone-credentials — UX

_No visual redesign (PRD non-goal): pages, layout, and card-based gate states keep the
current catalog look. This document covers the session flows and the states the new
session layer must handle._

## Flows

### Flow: Standalone credentials, auth-none server

1. User opens `{catalog}/account/credentials` on a standalone build.
2. Gate fetches `GET {gateway}/auth/config` → `{ mode: "none" }`.
3. Gate auto-advances (sentinel session, no prompt), fetches `/whoami` for tenant/role.
4. `CredentialManager` renders live: list, add (API key / OAuth), revoke.
5. Failure path: gateway unreachable → "Gateway unreachable" card naming the URL, Retry
   button; retry re-runs discovery.

### Flow: Standalone sign-in, API-key server

1. User opens any account/admin page; discovery returns `{ mode: "api-key" }`.
2. Gate shows a sign-in card: masked API-key input (`apr_…`), optional advanced tenant
   field, Submit.
3. On submit, gate calls `GET /whoami` with the key. Success → persist key for the browser
   session → ready. 401 → inline error on the card, key field preserved-but-masked, user
   retries.
4. Sign-out control clears the stored key and returns to step 2.

### Flow: Standalone sign-in, OIDC server

1. Discovery returns `{ mode: "oidc", oidc: { issuer, audience, browserClientId? } }`.
2. With `browserClientId`: card offers "Sign in with {issuer host}" (PKCE redirect) plus a
   collapsed "paste a token instead" option. Without it: token entry only, with helper text
   naming the issuer/audience the token must carry.
3. PKCE path: redirect out → provider login → return to `{base}/auth/callback` → gate
   completes sign-in, restores the page the user started on.
4. `GET /whoami` confirms identity → ready. Expired/invalid token later → any 401 flips the
   gate back to the sign-in card with "Session expired".

### Flow: Hosted credentials with silent SSO

1. User (already signed into aprovan.com) opens `aprovan.com/registry/account/credentials`.
2. Gate attempts silent Cognito sign-in; succeeds without UI.
3. `GET /session` on the product gateway: active workspace exists → ready; multiple
   memberships, none active → workspace picker card (existing pattern); zero workspaces →
   "No workspaces available" card with link to the workspace app.
4. `CredentialManager` renders the same store the workspace app shows.
5. Signed-out visitor: silent sign-in fails → "Sign in" card → interactive PKCE redirect →
   back to step 3.

### Flow: OAuth provider credential (both modes)

1. From `CredentialManager` → Add credential → OAuth: user enters client config, clicks
   Authorize; pending state saved; redirect to provider.
2. Provider returns to `{base}/account/oauth-callback?code=…&state=…`.
3. Callback page (behind the same gate) validates state, POSTs the auth-code payload to the
   session's `/credentials`.
4. Success card → "Back to credentials". Failure paths, each with a distinct message and a
   return link: provider denial (`error` param), missing code, missing pending flow, state
   mismatch (CSRF warning), gateway rejection.

### Flow: Admin page

1. Admin opens `{catalog}/admin/permissions`; gate resolves as above.
2. Hosted: members / groups / permissions sections (unchanged). Standalone: API keys
   (mint shows plaintext exactly once, copy affordance), profiles + grants, audit log.
3. Non-admin (403): full-page "Admin role required" state — no half-rendered sections.

## Screens & States

### SessionGate (shared shell for all account/admin pages)

- Purpose: everything between navigation and a ready page.
- States: **loading** (centered spinner, unchanged); **signin** (card variant per
  `SigninMethod`: Cognito button / PKCE button + token fallback / token-or-key form);
  **select-scope** (hosted workspace picker; standalone none — tenant is advanced-only);
  **error** (unreachable / discovery failed; names the gateway URL; Retry); **ready**
  (children). A small identity strip in ready state shows principal + scope + sign-out.
- The moved-notice state is deleted; hosted builds show a quiet "Open in workspace app"
  header link instead.

### Credentials page

- Existing `CredentialManager` states pass through untouched (loading, empty "No
  credentials yet", list, add-form validation, revoke confirm). Empty-catalog edge: if the
  provider catalog fetch fails, add-form still allows manual provider entry (current
  behavior — keep).

### Admin page (standalone additions)

- API keys: empty state ("No API keys"), mint dialog, one-time plaintext reveal with
  explicit "you won't see this again", revoke confirm.
- Profiles: list + create/edit; grants sub-list per profile (subject kind + id); 501 from
  grant endpoints (dynamo backend) → inline "Not supported by this server's storage
  backend" notice, not an error toast.
- Audit: read-only table, paged; empty state.

### OAuth callback page

- States: processing (spinner + "Saving your credential…"), success, error (message per
  failure path). Always renders a way back to `/account/credentials`.

## Component Inventory

- Gate + cards: existing catalog shadcn/ui `Card`, `Button`, `Input`, `Label`,
  `lucide-react` icons — same primitives `SessionGate` uses today. New: token/key input
  card (composition, no new primitive).
- `@aprovan/registry-ui`: `CredentialManager`, `AddCredentialForm`, oauth helpers
  (unchanged API); `AdminPanel` + new `ApiKeysSection` / `ProfilesSection` /
  `AuditSection` built from its existing table/dialog primitives.
- No new one-off components in `apps/registry` beyond the sign-in card variants.

## Open Questions

1. Identity strip placement — inside each page body (cheap) vs. the catalog header
   (`RegistryHeader`, touches shared shell)? _Recommendation: page body for this change;
   header integration is catalog-polish scope._
