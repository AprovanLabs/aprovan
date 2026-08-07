# Bundle signing fixtures (test only)

Ed25519 keypair used by `bundle-manager` unit tests. The public key is also
pinned in `desktop/src/bundle-public-key.ts` until the production pin lands.

**Not for production.** The shipping private key is held only in CI
(`BUNDLE_SIGNING_PRIVATE_KEY`). Rotating the pin requires a shell update —
see `desktop/docs/signing.md`.
