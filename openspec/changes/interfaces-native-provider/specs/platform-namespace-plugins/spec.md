## ADDED Requirements

### Requirement: Platform namespaces are plugin-provided

Namespaces expressing workspace concepts that no vendor could implement SHALL be provided by registered plugins rather than by a special service category.

#### Scenario: Platform namespace resolves through a plugin

- **WHEN** a platform namespace is called
- **THEN** it resolves through the plugin registry, using the same mechanism as any other plugin-provided namespace

#### Scenario: No special service category

- **WHEN** the routing implementation is inspected
- **THEN** it contains no enumerated list of first-party service names and no branch that resolves them ahead of other namespaces

#### Scenario: Classification remains published

- **WHEN** a client asks what kind each namespace is
- **THEN** platform namespaces are still identified as first-party, so a services surface can group them

### Requirement: Platform operations declare their results

Every platform operation whose result is statically determinable SHALL declare an output schema. Operations whose result comes from a bound third-party implementation SHALL be marked as such.

#### Scenario: Determinable operation declares a schema

- **WHEN** a platform operation with a fixed result shape is inspected
- **THEN** it declares an output schema describing that shape

#### Scenario: Passthrough operation is marked

- **WHEN** a platform operation forwards to a bound implementation whose result it does not control
- **THEN** it is marked as passthrough, and any declared shape is labelled advisory rather than guaranteed

#### Scenario: No silent unknowns

- **WHEN** the platform operation set is checked
- **THEN** every operation either declares a schema or is explicitly marked, and none is silently undeclared

### Requirement: Argument-dependent results are separated

An operation whose result shape depends on which argument was supplied SHALL be split into separate operations, one per shape.

#### Scenario: Overloaded operation split

- **WHEN** an operation previously returned one of several shapes depending on its arguments
- **THEN** it is replaced by operations that each return one shape and each declare it

#### Scenario: No alternation in declared results

- **WHEN** platform output schemas are inspected
- **THEN** none expresses a result as an alternation of unrelated shapes

### Requirement: Erased result types are recovered

Helper functions whose declared return types discard shapes the implementation already determines SHALL be corrected so those shapes are available.

#### Scenario: Helper shapes recovered

- **WHEN** a helper that previously declared an opaque record return is inspected
- **THEN** its declared return type reflects the shape it actually produces

#### Scenario: Downstream schemas follow

- **WHEN** operations built on such a helper declare their output schemas
- **THEN** those schemas match the recovered shape
