/**
 * Base64 helpers — unicode-safe (unlike raw atob/btoa, which choke on
 * anything outside Latin-1).
 */

export function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export function decodeBase64(encoded: string): string {
  const binary = atob(encoded.trim());
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** URL-safe variant (RFC 4648 §5): -_ alphabet, no padding. */
export function encodeBase64Url(text: string): string {
  return encodeBase64(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeBase64Url(encoded: string): string {
  const padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
  return decodeBase64(padded + "=".repeat((4 - (padded.length % 4)) % 4));
}
