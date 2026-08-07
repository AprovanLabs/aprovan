import { createHash, createPublicKey, verify, type KeyObject } from "node:crypto";

/**
 * Fields covered by the detached Ed25519 signature. The `signature` field
 * itself is excluded; verification rebuilds this payload from the manifest.
 */
export type SignedManifestFields = {
  version: string;
  minShell: string;
  url: string;
  sha256: string;
};

export type BundleManifest = SignedManifestFields & {
  /** Base64 Ed25519 signature over {@link manifestSigningPayload}. */
  signature: string;
};

/** Stable UTF-8 bytes signed / verified for a manifest. */
export function manifestSigningPayload(fields: SignedManifestFields): Buffer {
  // Fixed key order — do not use JSON.stringify on an object literal alone.
  return Buffer.from(
    JSON.stringify({
      version: fields.version,
      minShell: fields.minShell,
      url: fields.url,
      sha256: fields.sha256,
    }),
    "utf8",
  );
}

export function sha256Hex(data: Uint8Array | Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

export function loadEd25519PublicKey(
  pemOrDer: string | Buffer | Uint8Array,
): KeyObject {
  return createPublicKey(
    typeof pemOrDer === "string" || Buffer.isBuffer(pemOrDer)
      ? pemOrDer
      : Buffer.from(pemOrDer),
  );
}

/**
 * Verify the detached Ed25519 signature on a bundle manifest against a
 * pinned public key. Returns false on any cryptographic or encoding failure.
 */
export function verifyManifestSignature(
  manifest: BundleManifest,
  publicKey: KeyObject,
): boolean {
  try {
    const payload = manifestSigningPayload(manifest);
    const signature = Buffer.from(manifest.signature, "base64");
    if (signature.length === 0) return false;
    return verify(null, payload, publicKey, signature);
  } catch {
    return false;
  }
}

export function parseManifest(raw: unknown): BundleManifest {
  if (raw === null || typeof raw !== "object") {
    throw new Error("Bundle manifest must be an object");
  }
  const obj = raw as Record<string, unknown>;
  for (const key of ["version", "minShell", "url", "sha256", "signature"] as const) {
    if (typeof obj[key] !== "string" || (obj[key] as string).length === 0) {
      throw new Error(`Bundle manifest missing string field: ${key}`);
    }
  }
  const sha256 = obj["sha256"] as string;
  if (!/^[a-f0-9]{64}$/i.test(sha256)) {
    throw new Error("Bundle manifest sha256 must be 64 hex characters");
  }
  return {
    version: obj["version"] as string,
    minShell: obj["minShell"] as string,
    url: obj["url"] as string,
    sha256: sha256.toLowerCase(),
    signature: obj["signature"] as string,
  };
}
