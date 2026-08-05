/**
 * Fetch wrapper for calls to the Aprovan workspace API.
 *
 * This used to carry two workarounds for the deployed transport. The gateway
 * sat behind CloudFront with an Origin Access Control that SigV4-signed every
 * origin request to an IAM-protected Lambda Function URL, which meant the
 * browser had to (1) send its Cognito token in `X-Aprovan-Authorization`
 * because CloudFront overwrote `Authorization` with its own signature, and
 * (2) compute and send `x-amz-content-sha256` for every bodied request,
 * because OAC signs whatever hash it is handed but never computes one.
 *
 * The workspace is now a container behind an ordinary HTTPS origin, so
 * CloudFront signs nothing, `Authorization` arrives untouched, and request
 * bodies are just request bodies. Both workarounds are gone; this wrapper is
 * only still here to attach the token.
 */

import { ACTIVE_WORKSPACE_KEY } from "@/features/tabs/useTabs";
import { getAccessTokenSync } from "./auth";

/** Header carrying the Cognito bearer token. */
export const GATEWAY_AUTH_HEADER = "Authorization";

/** Header pinning the active workspace (matches gateway `requireAuth`). */
export const GATEWAY_WORKSPACE_HEADER = "X-Aprovan-Workspace";

/** `fetch` with the workspace bearer token + active workspace applied. */
export const gatewayFetch: typeof fetch = async (input, init) => {
  const headers = new Headers(init?.headers);

  const token = getAccessTokenSync();
  if (token && !headers.has(GATEWAY_AUTH_HEADER)) {
    headers.set(GATEWAY_AUTH_HEADER, `Bearer ${token}`);
  }

  if (!headers.has(GATEWAY_WORKSPACE_HEADER)) {
    try {
      const workspaceId = localStorage.getItem(ACTIVE_WORKSPACE_KEY);
      if (workspaceId) headers.set(GATEWAY_WORKSPACE_HEADER, workspaceId);
    } catch {
      // storage may be unavailable; gateway falls back to session / durable preference.
    }
  }

  return fetch(input, { ...init, headers });
};
