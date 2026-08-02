# UTDK Docs Output Style

Generate concise provider documentation that:
- Explains the provider's most important capabilities first.
- Highlights common request/response patterns from OpenAPI operations.
- Calls out authentication constraints and rate-limit caveats when known.
- Avoids invented behavior not present in source material.

The output should stay maintainable and deterministic for regeneration workflows.
