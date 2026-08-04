## ADDED Requirements

### Requirement: Single source of truth for the authoring prompt

The widget authoring prompt SHALL exist in exactly one file in this repository. Duplicate copies in other repositories SHALL be removed. Runtime resolution SHALL prefer the workspace filesystem copy seeded from this repository; PostHog SHALL NOT override it.

#### Scenario: One copy in the repo

- **WHEN** the repositories are searched for the widget authoring prompt
- **THEN** exactly one file is found, in this repository

#### Scenario: Seeder writes the prompt successfully

- **WHEN** the prompt seeder is run against a workspace
- **THEN** it completes without error and the prompt is readable from that workspace's filesystem

#### Scenario: PostHog does not override

- **WHEN** a chat request resolves the widget authoring prompt and PostHog credentials are configured
- **THEN** the workspace filesystem copy is used and PostHog is not consulted

### Requirement: Prompt teaches the tools convention only

The prompt SHALL describe service access exclusively through `tools`. It SHALL NOT contain bare namespace globals, bare namespace imports, or the `uses=` fence attribute.

#### Scenario: No bare conventions taught

- **WHEN** the prompt is inspected
- **THEN** it contains no bare namespace import or bare global call example, and no `uses=` fence attribute

#### Scenario: Root-anchored examples

- **WHEN** the prompt shows a service call
- **THEN** the example is rooted at `tools`
