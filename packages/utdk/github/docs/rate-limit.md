# Rate Limit

1 operation · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.rateLimit.get`

Get rate limit status for the authenticated user — [API reference](https://docs.github.com/rest/rate-limit/rate-limit#get-rate-limit-status-for-the-authenticated-user)

```ts
github.rateLimit.get(): Promise<RateLimitOverview>
```

<sub>`GET /rate_limit` · `rate-limit/get`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
