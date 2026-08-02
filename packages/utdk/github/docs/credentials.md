# Credentials

1 operation · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.credentials.revoke`

Revoke a list of credentials — [API reference](https://docs.github.com/rest/credentials/revoke#revoke-a-list-of-credentials)

```ts
github.credentials.revoke(input: {
  /** A list of credentials to be revoked, up to 1000 per request. */
  credentials: (string)[];
}): Promise<{ [key: string]: unknown }>
```

<sub>`POST /credentials/revoke` · `credentials/revoke`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
