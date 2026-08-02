/**
 * OAuth2 token service — implementation extracted to
 * `@aprovan/registry-server` (exchange/refresh/client-credentials with the
 * tenant-keyed token cache). Re-exported so workspace call sites keep their
 * import path; the payload types stay aligned because the package's
 * credential payload shapes are the same shapes `./credentials.js` declares.
 */

export {
  OAuthExchangeError,
  createOAuthTokenCache,
  resetOAuthTokenCache,
  resolveToInjectable,
  exchangeAuthorizationCode,
  refreshAccessToken,
  clientCredentialsGrant,
  type OAuthTokenCache,
  type OAuthTokenSet,
  type ResolveOAuthOptions,
} from "@aprovan/registry-server";
