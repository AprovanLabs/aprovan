## ADDED Requirements

### Requirement: Renderer served from a local origin

The renderer SHALL be served from an application-controlled origin backed by a bundle directory on disk, not from a remote origin.

#### Scenario: Renderer loads without network

- **WHEN** the application launches with no network connectivity
- **THEN** the renderer loads from the on-disk bundle and local workspaces are usable

#### Scenario: Origin serves only the active bundle

- **WHEN** a request is made through the application origin for a path outside the active bundle directory
- **THEN** the request is refused

### Requirement: Signed bundles verified before activation

A renderer bundle SHALL be verified against a signature and a content hash before it is activated. Verification failure SHALL leave the active bundle untouched.

#### Scenario: Tampered bundle is rejected

- **WHEN** a downloaded bundle's content does not match its manifest hash, or its manifest signature does not verify
- **THEN** the bundle is discarded, the active bundle continues to serve, and the failure is recorded

#### Scenario: Bundle requiring a newer shell is refused

- **WHEN** a bundle manifest declares a minimum shell version above the running shell
- **THEN** the bundle is not activated and the shell update path is indicated instead

### Requirement: Atomic activation with rollback

Activation SHALL be atomic: at every moment exactly one complete bundle is active. The previously active bundle SHALL be retained so activation can be reversed.

#### Scenario: Interrupted download changes nothing

- **WHEN** a bundle download or staging is interrupted
- **THEN** the active bundle is unchanged and the partial staging directory is discarded

#### Scenario: Bundle failing to boot is rolled back

- **WHEN** a newly activated bundle fails to reach renderer readiness on two consecutive launches
- **THEN** the previous bundle is reactivated automatically and the failure is recorded

#### Scenario: Rollback does not affect gateway state

- **WHEN** a bundle is rolled back
- **THEN** workspace data and gateway schema are unaffected, because bundles contain renderer code only

### Requirement: Updates without reinstall

Renderer updates SHALL reach installed applications without the user reinstalling the application or passing through an application store.

#### Scenario: Published bundle reaches an installed app

- **WHEN** a new signed bundle is published and an installed application checks for updates
- **THEN** the bundle is fetched, verified, and activated, and the user sees the updated renderer without reinstalling
