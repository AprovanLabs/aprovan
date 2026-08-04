## ADDED Requirements

### Requirement: Single source of truth for the authoring prompt

The widget authoring prompt SHALL exist in exactly one file in this repository. Duplicate copies in other repositories SHALL be removed.

#### Scenario: One copy in the repo

- **WHEN** the repositories are searched for the widget authoring prompt
- **THEN** exactly one file is found, in this repository

#### Scenario: Seeder writes the prompt successfully

- **WHEN** the prompt seeder is run against a workspace
- **THEN** it completes without error and the prompt is readable from that workspace's filesystem

### Requirement: Prompt teaches the tools convention only

The prompt SHALL describe service access exclusively through `tools`. It SHALL NOT contain bare namespace globals, bare namespace imports, or the `uses=` fence attribute.

#### Scenario: No bare conventions taught

- **WHEN** the prompt is inspected
- **THEN** it contains no bare namespace import or bare global call example, and no `uses=` fence attribute

#### Scenario: Root-anchored examples

- **WHEN** the prompt shows a service call
- **THEN** the example is rooted at `tools`

### Requirement: PostHog override is visible

Where a PostHog-managed prompt overrides the repository copy, the divergence SHALL be detectable rather than silent.

#### Scenario: Drift is reported

- **WHEN** the PostHog-managed prompt differs from the repository copy
- **THEN** a check reports the divergence with the differing content identified

#### Scenario: No drift passes

- **WHEN** the PostHog-managed prompt matches the repository copy, or no PostHog prompt is configured
- **THEN** the check passes
