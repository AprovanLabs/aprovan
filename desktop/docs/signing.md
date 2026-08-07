# Desktop signing, notarization, and update keys

## Two independent channels

| Channel | What it updates | Trust |
| --- | --- | --- |
| **Shell** (`electron-updater` → `https://releases.aprovan.com/desktop`) | Electron/Chromium host, gateway vendor, Node runtime | Developer ID signature + notarization on the `.dmg`/`.zip` |
| **Renderer bundles** (`BundleManager`) | Web client under `app://` | Ed25519 detached signature verified against the **pinned** public key in `bundle-public-key.ts` |

Bundles cannot ship Chromium security patches — that is why the shell channel exists (tech-plan D6).

## Apple code signing (Hardened Runtime)

Configured in `electron-builder.yml` + `build/entitlements.plist`:

- Hardened Runtime on; **App Sandbox off** (local agent spawn — D4).
- Entitlements cover JIT / unsigned executable memory / library validation so Electron and the bundled Node helper can run.
- Nested binaries under `Resources/` (gateway Node, **macos-helper**) are re-signed with `entitlementsInherit` when `CSC_*` is present.
- Notarization + stapling run in CI when Apple credentials are present (`notarize: true`).

### Native helper (`Resources/macos-helper/macos-helper`)

Built by `desktop/scripts/build-helper.sh` (SwiftPM release, arm64) during
`pnpm --filter @aprovan/desktop build`, then packed via `extraResources`.

| Capability | Entitlement |
| --- | --- |
| On-device model (`SystemLanguageModel.default`) | **None** — no Hardened Runtime or developer entitlement for the system default model. Custom adapters would need `com.apple.developer.foundation-model-adapter` (not used). |
| Notification centre (Electron `Notification`) | **None** under Hardened Runtime — gated by Notification TCC permission on first use. |
| Helper process itself | Signed as nested code with the app; lean reference plist at `build/entitlements.helper.plist` (no Electron JIT exceptions). |

`build/entitlements.plist` documents the same facts for reviewers.

### CI secrets (Apple)

| Secret / var | Purpose |
| --- | --- |
| `CSC_LINK` | Base64 (or file path) of the Developer ID Application `.p12` |
| `CSC_KEY_PASSWORD` | Password for that `.p12` |
| `APPLE_API_KEY` | App Store Connect API key `.p8` contents (preferred) |
| `APPLE_API_KEY_ID` | Key id |
| `APPLE_API_ISSUER` | Issuer UUID |
| *or* `APPLE_ID` + `APPLE_APP_SPECIFIC_PASSWORD` + `APPLE_TEAM_ID` | Password-based notarization |

Without these, CI builds an unsigned artifact for smoke checks only — not for external distribution.

## Bundle-signing key (CI only)

| Secret | Purpose |
| --- | --- |
| `BUNDLE_SIGNING_PRIVATE_KEY` | PEM Ed25519 private key used solely in CI to sign OTA manifests |

Rules:

1. Generate the keypair in CI (or an offline ceremony that writes the private half straight into the secret store).
2. Commit only the **public** half to `desktop/src/bundle-public-key.ts`.
3. Never check in the private key; never leave it on a laptop.
4. **Rotation requires a shell update** — the public key is pinned in the binary. Ship a new shell that embeds the new pin, then start signing manifests with the new private key. Old shells will reject new manifests (by design).

## Gatekeeper verification (desktop-shell task 7.5)

Run on a clean Mac (or a fresh user account / VM) with no prior Aprovan quarantine exemptions:

1. Download the notarized `.dmg` from the shell release feed (not a locally built unsigned app).
2. Open the DMG and drag Aprovan to Applications (or open in place).
3. Launch normally — double-click, do **not** right-click → Open to bypass Gatekeeper.
4. Confirm the app starts without a Gatekeeper block and without disabling SIP / Gatekeeper.
5. Optionally confirm staple + assessment:

```bash
spctl --assess --verbose /Applications/Aprovan.app
# expect: accepted
xcrun stapler validate /Applications/Aprovan.app
# expect: The validate action worked!
codesign --verify --deep --strict --verbose=2 /Applications/Aprovan.app
```

If Apple signing secrets were unavailable when this stream landed, treat the above as the release gate before the first external build — do not distribute unsigned builds.

## Helper under Hardened Runtime (macos-native-providers task 5.2)

After a notarized build is available, confirm the nested Swift helper starts on a
clean machine (same Gatekeeper rules as above):

1. Install and launch the notarized app (double-click only).
2. Confirm the helper binary is present and Hardened Runtime–signed:

```bash
HELPER="/Applications/Aprovan.app/Contents/Resources/macos-helper/macos-helper"
codesign --verify --strict --verbose=2 "$HELPER"
codesign --display --verbose=2 --entitlements :- "$HELPER"
# expect: runtime flag set (flags=0x10000 / runtime), nested signature valid
```

3. Confirm the supervised helper becomes ready (loopback `/health`):
   - App log should show helper ready with a `http://127.0.0.1:<port>` URL, **or**
   - From a second terminal, after launch:

```bash
# Replace <port> with the port from the helper supervisor log line.
curl -fsS "http://127.0.0.1:<port>/health"
# expect: {"ok":true}
curl -fsS "http://127.0.0.1:<port>/availability"
# expect: JSON AvailabilityReport (llm/esm capabilities)
```

4. Negative check: killing the helper must not quit the app; the supervisor should restart it (stream 1).

**Not executed in the stream-5 environment** when Apple `CSC_*` / notarization secrets are absent — treat this checklist as the release gate alongside 7.5.
