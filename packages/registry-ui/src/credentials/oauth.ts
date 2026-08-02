import type { OAuthPendingState } from "./types";

const OAUTH_PENDING_KEY = "aprovan:oauth-pending";

export function saveOAuthPending(pending: OAuthPendingState): void {
  sessionStorage.setItem(OAUTH_PENDING_KEY, JSON.stringify(pending));
}

export function loadOAuthPending(): OAuthPendingState | null {
  const raw = sessionStorage.getItem(OAUTH_PENDING_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OAuthPendingState;
  } catch {
    return null;
  }
}

export function clearOAuthPending(): void {
  sessionStorage.removeItem(OAUTH_PENDING_KEY);
}

export function initiateOAuthFlow(
  authorizationUrl: string,
  pending: OAuthPendingState,
): void {
  saveOAuthPending(pending);
  const url = new URL(authorizationUrl);
  url.searchParams.set("client_id", pending.clientId);
  url.searchParams.set("redirect_uri", pending.redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("state", pending.state);
  if (pending.scopes && pending.scopes.length > 0) {
    url.searchParams.set("scope", pending.scopes.join(" "));
  }
  window.location.href = url.toString();
}

export function generateState(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
