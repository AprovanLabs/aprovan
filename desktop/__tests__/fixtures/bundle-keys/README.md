# Bundle signing fixtures (test only)

Ed25519 keypair used by `bundle-manager` unit tests. The public key is also
pinned in `desktop/src/bundle-public-key.ts` for local/dev verification.

**Not for production.** Stream 7 replaces the pin with the CI release key;
this private key must never sign shipping manifests.
