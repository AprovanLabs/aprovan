/**
 * Pinned Ed25519 public key for OTA renderer-manifest verification.
 *
 * The matching **private** key lives only in CI
 * (`BUNDLE_SIGNING_PRIVATE_KEY` — see `desktop/docs/signing.md`). It must
 * never sit on a developer machine or in this repository.
 *
 * Rotating the key requires a **shell update**: this PEM is compiled into
 * the app, so a new pin only reaches installs through the shell release
 * channel (tech-plan risk: signing-key compromise). Renderer bundles alone
 * cannot rotate the pin.
 *
 * Until the production keypair is generated in CI and this pin is replaced,
 * the value below is the stream-5 test/dev key (fixtures under
 * `__tests__/fixtures/bundle-keys/`). Do not use that private key to sign
 * shipping manifests.
 */
export const BUNDLE_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAwRdWCpubEbtbie7TwmT3d4qL84GPjYPWawVFk8uRnks=
-----END PUBLIC KEY-----
`;
