# User Home Settings

## Operations

### `posthog.userHomeSettingsRetrieve`

- **HTTP**: `GET /api/user_home_settings/{uuid}/`
- **What it does**: Get the authenticated user's pinned sidebar tabs and configured homepage for the current team. Pass `@me` as the UUID.
- **OpenAPI operationId**: `user_home_settings_retrieve`
- **Path params**: `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ tabs?: ({ id?: string; pathname?: string; search?: string; hash?: string; title?: string; customTitle?: string | null; iconType?: string; sceneId?: string | null; sceneKey?: string | null; sceneParams?: unknown; pinne...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserHomeSettingsRetrieveInput = Parameters<typeof posthog.userHomeSettingsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UserHomeSettingsRetrieveOutput = Awaited<ReturnType<typeof posthog.userHomeSettingsRetrieve>>;

const result: UserHomeSettingsRetrieveOutput = await posthog.userHomeSettingsRetrieve();

// Result shape (from schema): { tabs?: ({ id?: string; pathname?: string; search?: string; hash?: string; title?: string; customTitle?: string | null; iconType?: string; sceneId?: string | null; sceneKey?: string | null; sceneParams?: unknown; pinne...
```

### `posthog.userHomeSettingsPartialUpdate`

- **HTTP**: `PATCH /api/user_home_settings/{uuid}/`
- **What it does**: Update the authenticated user's pinned sidebar tabs and/or homepage for the current team. Pass `@me` as the UUID. Send `tabs` to replace the pinned tab list, `homepage` to set the home destination (any PostHog URL — dashboard, insight, search results, scene). Either field may be omitted to leave it unchanged; sending `homepage: null` or `{}` clears the homepage.
- **OpenAPI operationId**: `user_home_settings_partial_update`
- **Path params**: `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ tabs?: ({ id?: string; pathname?: string; search?: string; hash?: string; title?: string; customTitle?: string | null; iconType?: string; sceneId?: string | null; sceneKey?: string | null; sceneParams?: unknown; pinne...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserHomeSettingsPartialUpdateInput = Parameters<typeof posthog.userHomeSettingsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type UserHomeSettingsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.userHomeSettingsPartialUpdate>>;

const result: UserHomeSettingsPartialUpdateOutput = await posthog.userHomeSettingsPartialUpdate();

// Result shape (from schema): { tabs?: ({ id?: string; pathname?: string; search?: string; hash?: string; title?: string; customTitle?: string | null; iconType?: string; sceneId?: string | null; sceneKey?: string | null; sceneParams?: unknown; pinne...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
