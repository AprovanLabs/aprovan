/**
 * Pinned Ed25519 public key for OTA manifest verification.
 *
 * Stream 5 ships the test/dev key so BundleManager can verify fixtures.
 * Stream 7 (signing CI) replaces this with the production release key;
 * rotating the pin requires a shell update by design (tech-plan D3).
 */
export const BUNDLE_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAwRdWCpubEbtbie7TwmT3d4qL84GPjYPWawVFk8uRnks=
-----END PUBLIC KEY-----
`;
