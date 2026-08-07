## ADDED Requirements

### Requirement: Keystore cipher envelope

The credential cipher SHALL offer a backend that seals payloads with a key supplied by an external key provider, alongside the existing `kms`, `local`, and `none` backends. Selecting it SHALL NOT change the credential store's schema, queries, or call sites.

#### Scenario: Seal and unseal with a provided key

- **WHEN** a credential is written with the keystore backend selected and read back
- **THEN** the payload round-trips correctly, and the stored bytes are not the plaintext

#### Scenario: Store surface is unchanged

- **WHEN** the keystore backend is selected
- **THEN** every existing credential store operation, including listing and filtering by creator, behaves as it does with other backends

#### Scenario: Key provider is consulted once per process

- **WHEN** several credentials are read in one process lifetime
- **THEN** the key provider is asked for the key at most once

### Requirement: Local credentials are not stored in plaintext

A workspace whose locus is `local` SHALL NOT persist credentials with the plaintext passthrough backend.

#### Scenario: Plaintext backend is refused for a local workspace

- **WHEN** a local workspace is initialised with no cipher backend configured
- **THEN** initialisation fails with a message naming the missing key provider, rather than silently storing plaintext

### Requirement: Key provider seam

The cipher SHALL depend on a key provider interface rather than on any specific operating system keystore, so it is testable without one.

#### Scenario: In-memory provider satisfies the seam

- **WHEN** the cipher is constructed with an in-memory key provider in a test
- **THEN** seal and unseal work with no platform keystore present
