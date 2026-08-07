# widget-dependency-cache

Purpose: TBD (synced from macos-native-providers change).

## Requirements

### Requirement: Widget dependencies resolve locally

Widget dependencies SHALL resolve through a local endpoint that serves previously fetched packages from disk, fetching from the public CDN only on a miss.

#### Scenario: Previously seen dependency resolves offline

- **WHEN** a widget whose dependencies have been fetched once is mounted with no network connectivity
- **THEN** the dependencies resolve from disk and the widget renders

#### Scenario: Unseen dependency is fetched and retained

- **WHEN** a widget requiring a dependency not present locally is mounted with connectivity
- **THEN** the dependency is fetched, served, and retained so subsequent mounts resolve locally

#### Scenario: Unseen dependency offline fails clearly

- **WHEN** a widget requiring an unseen dependency is mounted with no connectivity
- **THEN** the mount fails with an error naming the unresolvable dependency, rather than hanging or rendering blank

### Requirement: Seed set present at install

A set of commonly used dependencies SHALL be present after installation, before any widget has been mounted.

#### Scenario: First-run offline widget render

- **WHEN** a freshly installed application with no network mounts a widget using only seeded dependencies
- **THEN** the widget renders

### Requirement: Resolution is version-exact

Cached dependencies SHALL be keyed by fully resolved specifier including version. A request SHALL NOT be satisfied by a different version.

#### Scenario: Different version is a miss

- **WHEN** a widget requests a version of a package that differs from a cached version of the same package
- **THEN** the request is treated as a miss and fetched, rather than served from the cached version

#### Scenario: Widgets are unchanged

- **WHEN** widget source using ordinary package imports is compiled and mounted
- **THEN** it requires no modification to benefit from local resolution
