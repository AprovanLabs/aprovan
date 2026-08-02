/**
 * Credential payload encryption — the envelope implementation now lives in
 * `@aprovan/registry-server` (tech-plan D8: the credentialCipher envelope —
 * kms/local/none — moved unchanged with the credential domain). This module
 * re-exports it so every workspace call site keeps its import path.
 */

export {
  getCredentialCipher,
  resetCredentialCipher,
  type CredentialCipher,
} from "@aprovan/registry-server";
