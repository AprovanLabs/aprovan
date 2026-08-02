# Organizations

## Operations

### `posthog.list`

- **HTTP**: `GET /api/organizations/`
- **OpenAPI operationId**: `list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; slug: string; logo_media_id?: string | null; created_at: string; updated_at: string; membership_level: 1 | 8 | 15; p...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ListInput = Parameters<typeof posthog.list> extends [infer T, ...unknown[]] ? T : undefined;
type ListOutput = Awaited<ReturnType<typeof posthog.list>>;

const result: ListOutput = await posthog.list();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; slug: string; logo_media_id?: string | null; created_at: string; updated_at: string; membership_level: 1 | 8 | 15; p...
```

### `posthog.create`

- **HTTP**: `POST /api/organizations/`
- **OpenAPI operationId**: `create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; slug: string; logo_media_id?: string | null; created_at: string; updated_at: string; membership_level: 1 | 8 | 15; plugins_access_level: 0 | 3 | 6 | 9; teams: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type CreateInput = Parameters<typeof posthog.create> extends [infer T, ...unknown[]] ? T : undefined;
type CreateOutput = Awaited<ReturnType<typeof posthog.create>>;

const result: CreateOutput = await posthog.create();

// Result shape (from schema): { id: string; name: string; slug: string; logo_media_id?: string | null; created_at: string; updated_at: string; membership_level: 1 | 8 | 15; plugins_access_level: 0 | 3 | 6 | 9; teams: ({ [key: string]: unknown })[]; ...
```

### `posthog.destroy`

- **HTTP**: `DELETE /api/organizations/{id}/`
- **OpenAPI operationId**: `destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type DestroyInput = Parameters<typeof posthog.destroy> extends [infer T, ...unknown[]] ? T : undefined;
type DestroyOutput = Awaited<ReturnType<typeof posthog.destroy>>;

const result: DestroyOutput = await posthog.destroy();

// Result shape (from schema): unknown
```

### `posthog.retrieve`

- **HTTP**: `GET /api/organizations/{id}/`
- **OpenAPI operationId**: `retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; slug: string; logo_media_id?: string | null; created_at: string; updated_at: string; membership_level: 1 | 8 | 15; plugins_access_level: 0 | 3 | 6 | 9; teams: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RetrieveInput = Parameters<typeof posthog.retrieve> extends [infer T, ...unknown[]] ? T : undefined;
type RetrieveOutput = Awaited<ReturnType<typeof posthog.retrieve>>;

const result: RetrieveOutput = await posthog.retrieve();

// Result shape (from schema): { id: string; name: string; slug: string; logo_media_id?: string | null; created_at: string; updated_at: string; membership_level: 1 | 8 | 15; plugins_access_level: 0 | 3 | 6 | 9; teams: ({ [key: string]: unknown })[]; ...
```

### `posthog.partialUpdate`

- **HTTP**: `PATCH /api/organizations/{id}/`
- **OpenAPI operationId**: `partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; slug: string; logo_media_id?: string | null; created_at: string; updated_at: string; membership_level: 1 | 8 | 15; plugins_access_level: 0 | 3 | 6 | 9; teams: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PartialUpdateInput = Parameters<typeof posthog.partialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type PartialUpdateOutput = Awaited<ReturnType<typeof posthog.partialUpdate>>;

const result: PartialUpdateOutput = await posthog.partialUpdate();

// Result shape (from schema): { id: string; name: string; slug: string; logo_media_id?: string | null; created_at: string; updated_at: string; membership_level: 1 | 8 | 15; plugins_access_level: 0 | 3 | 6 | 9; teams: ({ [key: string]: unknown })[]; ...
```

### `posthog.update`

- **HTTP**: `PUT /api/organizations/{id}/`
- **OpenAPI operationId**: `update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; slug: string; logo_media_id?: string | null; created_at: string; updated_at: string; membership_level: 1 | 8 | 15; plugins_access_level: 0 | 3 | 6 | 9; teams: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UpdateInput = Parameters<typeof posthog.update> extends [infer T, ...unknown[]] ? T : undefined;
type UpdateOutput = Awaited<ReturnType<typeof posthog.update>>;

const result: UpdateOutput = await posthog.update();

// Result shape (from schema): { id: string; name: string; slug: string; logo_media_id?: string | null; created_at: string; updated_at: string; membership_level: 1 | 8 | 15; plugins_access_level: 0 | 3 | 6 | 9; teams: ({ [key: string]: unknown })[]; ...
```

### `posthog.requestAiAccessCreate`

- **HTTP**: `POST /api/organizations/{id}/request_ai_access/`
- **What it does**: Notify organization admins that a member is requesting PostHog AI be enabled.
- **OpenAPI operationId**: `request_ai_access_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RequestAiAccessCreateInput = Parameters<typeof posthog.requestAiAccessCreate> extends [infer T, ...unknown[]] ? T : undefined;
type RequestAiAccessCreateOutput = Awaited<ReturnType<typeof posthog.requestAiAccessCreate>>;

const result: RequestAiAccessCreateOutput = await posthog.requestAiAccessCreate();

// Result shape (from schema): { success: boolean }
```

### `posthog.cimdVerificationTokensList`

- **HTTP**: `GET /api/organizations/{organization_id}/cimd_verification_tokens/`
- **What it does**: Manage CIMD verification tokens for an organization.

A partner embeds the plaintext token in their CIMD metadata document as
`verification_token` inside the `com.posthog` object (the legacy top-level
`posthog_verification_token` field still works as a fallback). When PostHog fetches
the metadata, matching the token links the partner app to this organization and
grants a higher default rate limit for account provisioning.

The plaintext value is only available on creation; we store a hash.
- **OpenAPI operationId**: `cimd_verification_tokens_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; label: string; mask_value: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CimdVerificationTokensListInput = Parameters<typeof posthog.cimdVerificationTokensList> extends [infer T, ...unknown[]] ? T : undefined;
type CimdVerificationTokensListOutput = Awaited<ReturnType<typeof posthog.cimdVerificationTokensList>>;

const result: CimdVerificationTokensListOutput = await posthog.cimdVerificationTokensList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; label: string; mask_value: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string...
```

### `posthog.cimdVerificationTokensCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/cimd_verification_tokens/`
- **What it does**: Manage CIMD verification tokens for an organization.

A partner embeds the plaintext token in their CIMD metadata document as
`verification_token` inside the `com.posthog` object (the legacy top-level
`posthog_verification_token` field still works as a fallback). When PostHog fetches
the metadata, matching the token links the partner app to this organization and
grants a higher default rate limit for account provisioning.

The plaintext value is only available on creation; we store a hash.
- **OpenAPI operationId**: `cimd_verification_tokens_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; mask_value: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; he...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type CimdVerificationTokensCreateInput = Parameters<typeof posthog.cimdVerificationTokensCreate> extends [infer T, ...unknown[]] ? T : undefined;
type CimdVerificationTokensCreateOutput = Awaited<ReturnType<typeof posthog.cimdVerificationTokensCreate>>;

const result: CimdVerificationTokensCreateOutput = await posthog.cimdVerificationTokensCreate();

// Result shape (from schema): { id: string; label: string; mask_value: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; he...
```

### `posthog.cimdVerificationTokensDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/cimd_verification_tokens/{id}/`
- **What it does**: Manage CIMD verification tokens for an organization.

A partner embeds the plaintext token in their CIMD metadata document as
`verification_token` inside the `com.posthog` object (the legacy top-level
`posthog_verification_token` field still works as a fallback). When PostHog fetches
the metadata, matching the token links the partner app to this organization and
grants a higher default rate limit for account provisioning.

The plaintext value is only available on creation; we store a hash.
- **OpenAPI operationId**: `cimd_verification_tokens_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type CimdVerificationTokensDestroyInput = Parameters<typeof posthog.cimdVerificationTokensDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type CimdVerificationTokensDestroyOutput = Awaited<ReturnType<typeof posthog.cimdVerificationTokensDestroy>>;

const result: CimdVerificationTokensDestroyOutput = await posthog.cimdVerificationTokensDestroy();

// Result shape (from schema): unknown
```

### `posthog.cimdVerificationTokensRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/cimd_verification_tokens/{id}/`
- **What it does**: Manage CIMD verification tokens for an organization.

A partner embeds the plaintext token in their CIMD metadata document as
`verification_token` inside the `com.posthog` object (the legacy top-level
`posthog_verification_token` field still works as a fallback). When PostHog fetches
the metadata, matching the token links the partner app to this organization and
grants a higher default rate limit for account provisioning.

The plaintext value is only available on creation; we store a hash.
- **OpenAPI operationId**: `cimd_verification_tokens_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; mask_value: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; he...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CimdVerificationTokensRetrieveInput = Parameters<typeof posthog.cimdVerificationTokensRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CimdVerificationTokensRetrieveOutput = Awaited<ReturnType<typeof posthog.cimdVerificationTokensRetrieve>>;

const result: CimdVerificationTokensRetrieveOutput = await posthog.cimdVerificationTokensRetrieve();

// Result shape (from schema): { id: string; label: string; mask_value: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; he...
```

### `posthog.domainsList`

- **HTTP**: `GET /api/organizations/{organization_id}/domains/`
- **OpenAPI operationId**: `domains_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; domain: string; is_verified: boolean; verified_at: string | null; verification_challenge: string; jit_provisioning_enabled?: boole...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DomainsListInput = Parameters<typeof posthog.domainsList> extends [infer T, ...unknown[]] ? T : undefined;
type DomainsListOutput = Awaited<ReturnType<typeof posthog.domainsList>>;

const result: DomainsListOutput = await posthog.domainsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; domain: string; is_verified: boolean; verified_at: string | null; verification_challenge: string; jit_provisioning_enabled?: boole...
```

### `posthog.domainsCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/domains/`
- **OpenAPI operationId**: `domains_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; domain: string; is_verified: boolean; verified_at: string | null; verification_challenge: string; jit_provisioning_enabled?: boolean; sso_enforcement?: string; has_saml: boolean; saml_entity_id?: string | ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type DomainsCreateInput = Parameters<typeof posthog.domainsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DomainsCreateOutput = Awaited<ReturnType<typeof posthog.domainsCreate>>;

const result: DomainsCreateOutput = await posthog.domainsCreate();

// Result shape (from schema): { id: string; domain: string; is_verified: boolean; verified_at: string | null; verification_challenge: string; jit_provisioning_enabled?: boolean; sso_enforcement?: string; has_saml: boolean; saml_entity_id?: string | ...
```

### `posthog.domainsDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/domains/{id}/`
- **OpenAPI operationId**: `domains_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type DomainsDestroyInput = Parameters<typeof posthog.domainsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DomainsDestroyOutput = Awaited<ReturnType<typeof posthog.domainsDestroy>>;

const result: DomainsDestroyOutput = await posthog.domainsDestroy();

// Result shape (from schema): unknown
```

### `posthog.domainsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/domains/{id}/`
- **OpenAPI operationId**: `domains_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; domain: string; is_verified: boolean; verified_at: string | null; verification_challenge: string; jit_provisioning_enabled?: boolean; sso_enforcement?: string; has_saml: boolean; saml_entity_id?: string | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DomainsRetrieveInput = Parameters<typeof posthog.domainsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DomainsRetrieveOutput = Awaited<ReturnType<typeof posthog.domainsRetrieve>>;

const result: DomainsRetrieveOutput = await posthog.domainsRetrieve();

// Result shape (from schema): { id: string; domain: string; is_verified: boolean; verified_at: string | null; verification_challenge: string; jit_provisioning_enabled?: boolean; sso_enforcement?: string; has_saml: boolean; saml_entity_id?: string | ...
```

### `posthog.domainsPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/domains/{id}/`
- **OpenAPI operationId**: `domains_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; domain: string; is_verified: boolean; verified_at: string | null; verification_challenge: string; jit_provisioning_enabled?: boolean; sso_enforcement?: string; has_saml: boolean; saml_entity_id?: string | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DomainsPartialUpdateInput = Parameters<typeof posthog.domainsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DomainsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.domainsPartialUpdate>>;

const result: DomainsPartialUpdateOutput = await posthog.domainsPartialUpdate();

// Result shape (from schema): { id: string; domain: string; is_verified: boolean; verified_at: string | null; verification_challenge: string; jit_provisioning_enabled?: boolean; sso_enforcement?: string; has_saml: boolean; saml_entity_id?: string | ...
```

### `posthog.domainsUpdate`

- **HTTP**: `PUT /api/organizations/{organization_id}/domains/{id}/`
- **OpenAPI operationId**: `domains_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; domain: string; is_verified: boolean; verified_at: string | null; verification_challenge: string; jit_provisioning_enabled?: boolean; sso_enforcement?: string; has_saml: boolean; saml_entity_id?: string | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DomainsUpdateInput = Parameters<typeof posthog.domainsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DomainsUpdateOutput = Awaited<ReturnType<typeof posthog.domainsUpdate>>;

const result: DomainsUpdateOutput = await posthog.domainsUpdate();

// Result shape (from schema): { id: string; domain: string; is_verified: boolean; verified_at: string | null; verification_challenge: string; jit_provisioning_enabled?: boolean; sso_enforcement?: string; has_saml: boolean; saml_entity_id?: string | ...
```

### `posthog.domainsScimLogsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/domains/{id}/scim/logs/`
- **OpenAPI operationId**: `domains_scim_logs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DomainsScimLogsRetrieveInput = Parameters<typeof posthog.domainsScimLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DomainsScimLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.domainsScimLogsRetrieve>>;

const result: DomainsScimLogsRetrieveOutput = await posthog.domainsScimLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.domainsScimTokenCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/domains/{id}/scim/token/`
- **What it does**: Regenerate SCIM bearer token.
- **OpenAPI operationId**: `domains_scim_token_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DomainsScimTokenCreateInput = Parameters<typeof posthog.domainsScimTokenCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DomainsScimTokenCreateOutput = Awaited<ReturnType<typeof posthog.domainsScimTokenCreate>>;

const result: DomainsScimTokenCreateOutput = await posthog.domainsScimTokenCreate();

// Result shape (from schema): unknown
```

### `posthog.domainsVerifyCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/domains/{id}/verify/`
- **OpenAPI operationId**: `domains_verify_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DomainsVerifyCreateInput = Parameters<typeof posthog.domainsVerifyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DomainsVerifyCreateOutput = Awaited<ReturnType<typeof posthog.domainsVerifyCreate>>;

const result: DomainsVerifyCreateOutput = await posthog.domainsVerifyCreate();

// Result shape (from schema): unknown
```

### `posthog.identityProviderConfigsList`

- **HTTP**: `GET /api/organizations/{organization_id}/identity_provider_configs/`
- **OpenAPI operationId**: `identity_provider_configs_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name?: string; created_at: string; updated_at: string; has_saml: boolean; saml_entity_id?: string | null; saml_acs_url?: string | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IdentityProviderConfigsListInput = Parameters<typeof posthog.identityProviderConfigsList> extends [infer T, ...unknown[]] ? T : undefined;
type IdentityProviderConfigsListOutput = Awaited<ReturnType<typeof posthog.identityProviderConfigsList>>;

const result: IdentityProviderConfigsListOutput = await posthog.identityProviderConfigsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name?: string; created_at: string; updated_at: string; has_saml: boolean; saml_entity_id?: string | null; saml_acs_url?: string | ...
```

### `posthog.identityProviderConfigsCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/identity_provider_configs/`
- **OpenAPI operationId**: `identity_provider_configs_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; created_at: string; updated_at: string; has_saml: boolean; saml_entity_id?: string | null; saml_acs_url?: string | null; saml_x509_cert?: string | null; has_scim: boolean; scim_enabled?: boo...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type IdentityProviderConfigsCreateInput = Parameters<typeof posthog.identityProviderConfigsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type IdentityProviderConfigsCreateOutput = Awaited<ReturnType<typeof posthog.identityProviderConfigsCreate>>;

const result: IdentityProviderConfigsCreateOutput = await posthog.identityProviderConfigsCreate();

// Result shape (from schema): { id: string; name?: string; created_at: string; updated_at: string; has_saml: boolean; saml_entity_id?: string | null; saml_acs_url?: string | null; saml_x509_cert?: string | null; has_scim: boolean; scim_enabled?: boo...
```

### `posthog.identityProviderConfigsDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/identity_provider_configs/{id}/`
- **OpenAPI operationId**: `identity_provider_configs_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type IdentityProviderConfigsDestroyInput = Parameters<typeof posthog.identityProviderConfigsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type IdentityProviderConfigsDestroyOutput = Awaited<ReturnType<typeof posthog.identityProviderConfigsDestroy>>;

const result: IdentityProviderConfigsDestroyOutput = await posthog.identityProviderConfigsDestroy();

// Result shape (from schema): unknown
```

### `posthog.identityProviderConfigsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/identity_provider_configs/{id}/`
- **OpenAPI operationId**: `identity_provider_configs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; created_at: string; updated_at: string; has_saml: boolean; saml_entity_id?: string | null; saml_acs_url?: string | null; saml_x509_cert?: string | null; has_scim: boolean; scim_enabled?: boo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IdentityProviderConfigsRetrieveInput = Parameters<typeof posthog.identityProviderConfigsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IdentityProviderConfigsRetrieveOutput = Awaited<ReturnType<typeof posthog.identityProviderConfigsRetrieve>>;

const result: IdentityProviderConfigsRetrieveOutput = await posthog.identityProviderConfigsRetrieve();

// Result shape (from schema): { id: string; name?: string; created_at: string; updated_at: string; has_saml: boolean; saml_entity_id?: string | null; saml_acs_url?: string | null; saml_x509_cert?: string | null; has_scim: boolean; scim_enabled?: boo...
```

### `posthog.identityProviderConfigsPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/identity_provider_configs/{id}/`
- **OpenAPI operationId**: `identity_provider_configs_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; created_at: string; updated_at: string; has_saml: boolean; saml_entity_id?: string | null; saml_acs_url?: string | null; saml_x509_cert?: string | null; has_scim: boolean; scim_enabled?: boo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IdentityProviderConfigsPartialUpdateInput = Parameters<typeof posthog.identityProviderConfigsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type IdentityProviderConfigsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.identityProviderConfigsPartialUpdate>>;

const result: IdentityProviderConfigsPartialUpdateOutput = await posthog.identityProviderConfigsPartialUpdate();

// Result shape (from schema): { id: string; name?: string; created_at: string; updated_at: string; has_saml: boolean; saml_entity_id?: string | null; saml_acs_url?: string | null; saml_x509_cert?: string | null; has_scim: boolean; scim_enabled?: boo...
```

### `posthog.identityProviderConfigsUpdate`

- **HTTP**: `PUT /api/organizations/{organization_id}/identity_provider_configs/{id}/`
- **OpenAPI operationId**: `identity_provider_configs_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; created_at: string; updated_at: string; has_saml: boolean; saml_entity_id?: string | null; saml_acs_url?: string | null; saml_x509_cert?: string | null; has_scim: boolean; scim_enabled?: boo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IdentityProviderConfigsUpdateInput = Parameters<typeof posthog.identityProviderConfigsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type IdentityProviderConfigsUpdateOutput = Awaited<ReturnType<typeof posthog.identityProviderConfigsUpdate>>;

const result: IdentityProviderConfigsUpdateOutput = await posthog.identityProviderConfigsUpdate();

// Result shape (from schema): { id: string; name?: string; created_at: string; updated_at: string; has_saml: boolean; saml_entity_id?: string | null; saml_acs_url?: string | null; saml_x509_cert?: string | null; has_scim: boolean; scim_enabled?: boo...
```

### `posthog.identityProviderConfigsScimTokenCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/identity_provider_configs/{id}/scim/token/`
- **What it does**: Regenerate the SCIM bearer token for this IdP config.
- **OpenAPI operationId**: `identity_provider_configs_scim_token_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ scim_enabled: boolean; scim_bearer_token: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IdentityProviderConfigsScimTokenCreateInput = Parameters<typeof posthog.identityProviderConfigsScimTokenCreate> extends [infer T, ...unknown[]] ? T : undefined;
type IdentityProviderConfigsScimTokenCreateOutput = Awaited<ReturnType<typeof posthog.identityProviderConfigsScimTokenCreate>>;

const result: IdentityProviderConfigsScimTokenCreateOutput = await posthog.identityProviderConfigsScimTokenCreate();

// Result shape (from schema): { scim_enabled: boolean; scim_bearer_token: string }
```

### `posthog.orgOrganizationsIntegrationsList`

- **HTTP**: `GET /api/organizations/{organization_id}/integrations/`
- **What it does**: ViewSet for organization-level integrations.

Provides access to integrations that are scoped to the entire organization
(vs. project-level integrations). Examples include Vercel, AWS Marketplace, etc.

Creation is handled by the integration installation flows
(e.g., Vercel marketplace installation). Users can disconnect integrations
via the DELETE endpoint.
- **OpenAPI operationId**: `org_organizations_integrations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: "vercel"; integration_id: string | null; config: unknown; created_at: string; updated_at: string; created_by: { id: number; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsIntegrationsListInput = Parameters<typeof posthog.orgOrganizationsIntegrationsList> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsIntegrationsListOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsIntegrationsList>>;

const result: OrgOrganizationsIntegrationsListOutput = await posthog.orgOrganizationsIntegrationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: "vercel"; integration_id: string | null; config: unknown; created_at: string; updated_at: string; created_by: { id: number; ...
```

### `posthog.orgOrganizationIntegrationsDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/integrations/{id}/`
- **What it does**: ViewSet for organization-level integrations.

Provides access to integrations that are scoped to the entire organization
(vs. project-level integrations). Examples include Vercel, AWS Marketplace, etc.

Creation is handled by the integration installation flows
(e.g., Vercel marketplace installation). Users can disconnect integrations
via the DELETE endpoint.
- **OpenAPI operationId**: `org_organization_integrations_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`, `409`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`, `409`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationIntegrationsDestroyInput = Parameters<typeof posthog.orgOrganizationIntegrationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationIntegrationsDestroyOutput = Awaited<ReturnType<typeof posthog.orgOrganizationIntegrationsDestroy>>;

const result: OrgOrganizationIntegrationsDestroyOutput = await posthog.orgOrganizationIntegrationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.orgOrganizationsIntegrationsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/integrations/{id}/`
- **What it does**: ViewSet for organization-level integrations.

Provides access to integrations that are scoped to the entire organization
(vs. project-level integrations). Examples include Vercel, AWS Marketplace, etc.

Creation is handled by the integration installation flows
(e.g., Vercel marketplace installation). Users can disconnect integrations
via the DELETE endpoint.
- **OpenAPI operationId**: `org_organizations_integrations_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: "vercel"; integration_id: string | null; config: unknown; created_at: string; updated_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsIntegrationsRetrieveInput = Parameters<typeof posthog.orgOrganizationsIntegrationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsIntegrationsRetrieveOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsIntegrationsRetrieve>>;

const result: OrgOrganizationsIntegrationsRetrieveOutput = await posthog.orgOrganizationsIntegrationsRetrieve();

// Result shape (from schema): { id: string; kind: "vercel"; integration_id: string | null; config: unknown; created_at: string; updated_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?:...
```

### `posthog.integrationsEnvironmentMappingPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/integrations/{id}/environment-mapping/`
- **What it does**: ViewSet for organization-level integrations.

Provides access to integrations that are scoped to the entire organization
(vs. project-level integrations). Examples include Vercel, AWS Marketplace, etc.

Creation is handled by the integration installation flows
(e.g., Vercel marketplace installation). Users can disconnect integrations
via the DELETE endpoint.
- **OpenAPI operationId**: `integrations_environment_mapping_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: "vercel"; integration_id: string | null; config: unknown; created_at: string; updated_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IntegrationsEnvironmentMappingPartialUpdateInput = Parameters<typeof posthog.integrationsEnvironmentMappingPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsEnvironmentMappingPartialUpdateOutput = Awaited<ReturnType<typeof posthog.integrationsEnvironmentMappingPartialUpdate>>;

const result: IntegrationsEnvironmentMappingPartialUpdateOutput = await posthog.integrationsEnvironmentMappingPartialUpdate();

// Result shape (from schema): { id: string; kind: "vercel"; integration_id: string | null; config: unknown; created_at: string; updated_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?:...
```

### `posthog.invitesList`

- **HTTP**: `GET /api/organizations/{organization_id}/invites/`
- **OpenAPI operationId**: `invites_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; target_email: string; first_name?: string; emailing_attempt_made: boolean; level?: 1 | 8 | 15; is_expired: boolean; created_by: { ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InvitesListInput = Parameters<typeof posthog.invitesList> extends [infer T, ...unknown[]] ? T : undefined;
type InvitesListOutput = Awaited<ReturnType<typeof posthog.invitesList>>;

const result: InvitesListOutput = await posthog.invitesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; target_email: string; first_name?: string; emailing_attempt_made: boolean; level?: 1 | 8 | 15; is_expired: boolean; created_by: { ...
```

### `posthog.invitesCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/invites/`
- **OpenAPI operationId**: `invites_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; target_email: string; first_name?: string; emailing_attempt_made: boolean; level?: 1 | 8 | 15; is_expired: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string;...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type InvitesCreateInput = Parameters<typeof posthog.invitesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InvitesCreateOutput = Awaited<ReturnType<typeof posthog.invitesCreate>>;

const result: InvitesCreateOutput = await posthog.invitesCreate();

// Result shape (from schema): { id: string; target_email: string; first_name?: string; emailing_attempt_made: boolean; level?: 1 | 8 | 15; is_expired: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string;...
```

### `posthog.invitesDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/invites/{id}/`
- **OpenAPI operationId**: `invites_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type InvitesDestroyInput = Parameters<typeof posthog.invitesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type InvitesDestroyOutput = Awaited<ReturnType<typeof posthog.invitesDestroy>>;

const result: InvitesDestroyOutput = await posthog.invitesDestroy();

// Result shape (from schema): unknown
```

### `posthog.invitesBulkCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/invites/bulk/`
- **OpenAPI operationId**: `invites_bulk_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InvitesBulkCreateInput = Parameters<typeof posthog.invitesBulkCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InvitesBulkCreateOutput = Awaited<ReturnType<typeof posthog.invitesBulkCreate>>;

const result: InvitesBulkCreateOutput = await posthog.invitesBulkCreate();

// Result shape (from schema): unknown
```

### `posthog.invitesDelegateCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/invites/delegate/`
- **What it does**: Create an onboarding delegation invite: an admin-level invite flagged as a setup delegation.
Sends a single dedicated delegation email and records the inviting user as having delegated.
- **OpenAPI operationId**: `invites_delegate_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; target_email: string; first_name?: string; emailing_attempt_made: boolean; level?: 1 | 8 | 15; is_expired: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InvitesDelegateCreateInput = Parameters<typeof posthog.invitesDelegateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InvitesDelegateCreateOutput = Awaited<ReturnType<typeof posthog.invitesDelegateCreate>>;

const result: InvitesDelegateCreateOutput = await posthog.invitesDelegateCreate();

// Result shape (from schema): { id: string; target_email: string; first_name?: string; emailing_attempt_made: boolean; level?: 1 | 8 | 15; is_expired: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string;...
```

### `posthog.legalDocumentsList`

- **HTTP**: `GET /api/organizations/{organization_id}/legal_documents/`
- **OpenAPI operationId**: `legal_documents_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; document_type: string; company_name: string; representative_email: string; status: string; created_by: { first_name: string; email...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LegalDocumentsListInput = Parameters<typeof posthog.legalDocumentsList> extends [infer T, ...unknown[]] ? T : undefined;
type LegalDocumentsListOutput = Awaited<ReturnType<typeof posthog.legalDocumentsList>>;

const result: LegalDocumentsListOutput = await posthog.legalDocumentsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; document_type: string; company_name: string; representative_email: string; status: string; created_by: { first_name: string; email...
```

### `posthog.legalDocumentsCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/legal_documents/`
- **OpenAPI operationId**: `legal_documents_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; document_type: string; company_name: string; representative_email: string; status: string; created_by: { first_name: string; email: string } | null; created_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LegalDocumentsCreateInput = Parameters<typeof posthog.legalDocumentsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LegalDocumentsCreateOutput = Awaited<ReturnType<typeof posthog.legalDocumentsCreate>>;

const result: LegalDocumentsCreateOutput = await posthog.legalDocumentsCreate();

// Result shape (from schema): { id: string; document_type: string; company_name: string; representative_email: string; status: string; created_by: { first_name: string; email: string } | null; created_at: string }
```

### `posthog.legalDocumentsDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/legal_documents/{id}/`
- **What it does**: Delete an unsigned legal document. The PandaDoc envelope is voided
first so the original signer can no longer complete it; only if that
succeeds is the row removed, freeing the unique-per-org-per-type
constraint so a fresh document can be generated.

Returns 503 if the PandaDoc void fails — the row stays in that case
and the frontend should prompt the user to retry. Returns 403 for
signed documents (legal artifacts; staff can still delete signed
rows from Django admin).
- **OpenAPI operationId**: `legal_documents_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`, `403`, `404`, `503`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`, `403`, `404`, `503`

```ts
import posthog from "@utdk/posthog";

type LegalDocumentsDestroyInput = Parameters<typeof posthog.legalDocumentsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LegalDocumentsDestroyOutput = Awaited<ReturnType<typeof posthog.legalDocumentsDestroy>>;

const result: LegalDocumentsDestroyOutput = await posthog.legalDocumentsDestroy();

// Result shape (from schema): unknown
```

### `posthog.legalDocumentsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/legal_documents/{id}/`
- **OpenAPI operationId**: `legal_documents_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; document_type: string; company_name: string; representative_email: string; status: string; created_by: { first_name: string; email: string } | null; created_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LegalDocumentsRetrieveInput = Parameters<typeof posthog.legalDocumentsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LegalDocumentsRetrieveOutput = Awaited<ReturnType<typeof posthog.legalDocumentsRetrieve>>;

const result: LegalDocumentsRetrieveOutput = await posthog.legalDocumentsRetrieve();

// Result shape (from schema): { id: string; document_type: string; company_name: string; representative_email: string; status: string; created_by: { first_name: string; email: string } | null; created_at: string }
```

### `posthog.legalDocumentsDownloadRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/legal_documents/{id}/download/`
- **What it does**: Short-lived redirect to the signed PDF in object storage. 404 while the
envelope is still out for signature (or if the upload hasn't completed
yet). The underlying presigned URL expires in ~60s; clients should hit
this endpoint each time they want to view the PDF rather than caching.
- **OpenAPI operationId**: `legal_documents_download_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `302`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `302`, `404`

```ts
import posthog from "@utdk/posthog";

type LegalDocumentsDownloadRetrieveInput = Parameters<typeof posthog.legalDocumentsDownloadRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LegalDocumentsDownloadRetrieveOutput = Awaited<ReturnType<typeof posthog.legalDocumentsDownloadRetrieve>>;

const result: LegalDocumentsDownloadRetrieveOutput = await posthog.legalDocumentsDownloadRetrieve();

// Result shape (from schema): unknown
```

### `posthog.membersList`

- **HTTP**: `GET /api/organizations/{organization_id}/members/`
- **OpenAPI operationId**: `members_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `order`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_ve...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MembersListInput = Parameters<typeof posthog.membersList> extends [infer T, ...unknown[]] ? T : undefined;
type MembersListOutput = Awaited<ReturnType<typeof posthog.membersList>>;

const result: MembersListOutput = await posthog.membersList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_ve...
```

### `posthog.membersDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/members/{user__uuid}/`
- **OpenAPI operationId**: `members_destroy`
- **Path params**: `user__uuid`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type MembersDestroyInput = Parameters<typeof posthog.membersDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type MembersDestroyOutput = Awaited<ReturnType<typeof posthog.membersDestroy>>;

const result: MembersDestroyOutput = await posthog.membersDestroy();

// Result shape (from schema): unknown
```

### `posthog.membersPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/members/{user__uuid}/`
- **OpenAPI operationId**: `members_partial_update`
- **Path params**: `user__uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MembersPartialUpdateInput = Parameters<typeof posthog.membersPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type MembersPartialUpdateOutput = Awaited<ReturnType<typeof posthog.membersPartialUpdate>>;

const result: MembersPartialUpdateOutput = await posthog.membersPartialUpdate();

// Result shape (from schema): { id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null...
```

### `posthog.membersUpdate`

- **HTTP**: `PUT /api/organizations/{organization_id}/members/{user__uuid}/`
- **OpenAPI operationId**: `members_update`
- **Path params**: `user__uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MembersUpdateInput = Parameters<typeof posthog.membersUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type MembersUpdateOutput = Awaited<ReturnType<typeof posthog.membersUpdate>>;

const result: MembersUpdateOutput = await posthog.membersUpdate();

// Result shape (from schema): { id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null...
```

### `posthog.membersGithubLoginRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/members/{user__uuid}/github_login/`
- **OpenAPI operationId**: `members_github_login_retrieve`
- **Path params**: `user__uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ github_login: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MembersGithubLoginRetrieveInput = Parameters<typeof posthog.membersGithubLoginRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MembersGithubLoginRetrieveOutput = Awaited<ReturnType<typeof posthog.membersGithubLoginRetrieve>>;

const result: MembersGithubLoginRetrieveOutput = await posthog.membersGithubLoginRetrieve();

// Result shape (from schema): { github_login: string | null }
```

### `posthog.membersScopedApiKeysRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/members/{user__uuid}/scoped_api_keys/`
- **OpenAPI operationId**: `members_scoped_api_keys_retrieve`
- **Path params**: `user__uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MembersScopedApiKeysRetrieveInput = Parameters<typeof posthog.membersScopedApiKeysRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MembersScopedApiKeysRetrieveOutput = Awaited<ReturnType<typeof posthog.membersScopedApiKeysRetrieve>>;

const result: MembersScopedApiKeysRetrieveOutput = await posthog.membersScopedApiKeysRetrieve();

// Result shape (from schema): { id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null...
```

### `posthog.oauthApplicationsList`

- **HTTP**: `GET /api/organizations/{organization_id}/oauth_applications/`
- **What it does**: ViewSet for listing OAuth applications at the organization level (read-only).
- **OpenAPI operationId**: `oauth_applications_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name?: string; client_id?: string; redirect_uris_list: (string)[]; is_verified?: boolean; created: string; updated: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OauthApplicationsListInput = Parameters<typeof posthog.oauthApplicationsList> extends [infer T, ...unknown[]] ? T : undefined;
type OauthApplicationsListOutput = Awaited<ReturnType<typeof posthog.oauthApplicationsList>>;

const result: OauthApplicationsListOutput = await posthog.oauthApplicationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name?: string; client_id?: string; redirect_uris_list: (string)[]; is_verified?: boolean; created: string; updated: string })[] }
```

### `posthog.organizationsProjectsList`

- **HTTP**: `GET /api/organizations/{organization_id}/projects/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; uuid: string; organization: string; project_id: number; api_token: string; name: string; completed_snippet_onboarding: boolean; ha...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsListInput = Parameters<typeof posthog.organizationsProjectsList> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsListOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsList>>;

const result: OrganizationsProjectsListOutput = await posthog.organizationsProjectsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; uuid: string; organization: string; project_id: number; api_token: string; name: string; completed_snippet_onboarding: boolean; ha...
```

### `posthog.organizationsProjectsCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/projects/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsCreateInput = Parameters<typeof posthog.organizationsProjectsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsCreateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsCreate>>;

const result: OrganizationsProjectsCreateOutput = await posthog.organizationsProjectsCreate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/projects/{id}/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsDestroyInput = Parameters<typeof posthog.organizationsProjectsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsDestroyOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsDestroy>>;

const result: OrganizationsProjectsDestroyOutput = await posthog.organizationsProjectsDestroy();

// Result shape (from schema): unknown
```

### `posthog.organizationsProjectsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/projects/{id}/`
- **What it does**: Retrieve a project and its settings.
- **OpenAPI operationId**: `organizations_projects_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsRetrieveInput = Parameters<typeof posthog.organizationsProjectsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsRetrieveOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsRetrieve>>;

const result: OrganizationsProjectsRetrieveOutput = await posthog.organizationsProjectsRetrieve();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/projects/{id}/`
- **What it does**: Update one or more of a project's settings. Only the fields included in the request body are changed.
- **OpenAPI operationId**: `organizations_projects_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsPartialUpdateInput = Parameters<typeof posthog.organizationsProjectsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsPartialUpdate>>;

const result: OrganizationsProjectsPartialUpdateOutput = await posthog.organizationsProjectsPartialUpdate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsUpdate`

- **HTTP**: `PUT /api/organizations/{organization_id}/projects/{id}/`
- **What it does**: Replace a project and its settings. Prefer the PATCH endpoint for partial updates — PUT requires every writable field to be provided.
- **OpenAPI operationId**: `organizations_projects_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsUpdateInput = Parameters<typeof posthog.organizationsProjectsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsUpdateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsUpdate>>;

const result: OrganizationsProjectsUpdateOutput = await posthog.organizationsProjectsUpdate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsActivityRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/projects/{id}/activity/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_activity_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsActivityRetrieveInput = Parameters<typeof posthog.organizationsProjectsActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsActivityRetrieve>>;

const result: OrganizationsProjectsActivityRetrieveOutput = await posthog.organizationsProjectsActivityRetrieve();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsAddProductIntentPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/projects/{id}/add_product_intent/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_add_product_intent_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsAddProductIntentPartialUpdateInput = Parameters<typeof posthog.organizationsProjectsAddProductIntentPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsAddProductIntentPartialUpdateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsAddProductIntentPartialUpdate>>;

const result: OrganizationsProjectsAddProductIntentPartialUpdateOutput = await posthog.organizationsProjectsAddProductIntentPartialUpdate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsChangeOrganizationCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/projects/{id}/change_organization/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_change_organization_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsChangeOrganizationCreateInput = Parameters<typeof posthog.organizationsProjectsChangeOrganizationCreate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsChangeOrganizationCreateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsChangeOrganizationCreate>>;

const result: OrganizationsProjectsChangeOrganizationCreateOutput = await posthog.organizationsProjectsChangeOrganizationCreate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsCompleteProductOnboardingPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/projects/{id}/complete_product_onboarding/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_complete_product_onboarding_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsCompleteProductOnboardingPartialUpdateInput = Parameters<typeof posthog.organizationsProjectsCompleteProductOnboardingPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsCompleteProductOnboardingPartialUpdateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsCompleteProductOnboardingPartialUpdate>>;

const result: OrganizationsProjectsCompleteProductOnboardingPartialUpdateOutput = await posthog.organizationsProjectsCompleteProductOnboardingPartialUpdate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsDefaultEvaluationContextsDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/projects/{id}/default_evaluation_contexts/`
- **What it does**: Manage default evaluation contexts for a project.
- **OpenAPI operationId**: `organizations_projects_default_evaluation_contexts_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsDefaultEvaluationContextsDestroyInput = Parameters<typeof posthog.organizationsProjectsDefaultEvaluationContextsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsDefaultEvaluationContextsDestroyOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsDefaultEvaluationContextsDestroy>>;

const result: OrganizationsProjectsDefaultEvaluationContextsDestroyOutput = await posthog.organizationsProjectsDefaultEvaluationContextsDestroy();

// Result shape (from schema): unknown
```

### `posthog.organizationsProjectsDefaultEvaluationContextsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/projects/{id}/default_evaluation_contexts/`
- **What it does**: Manage default evaluation contexts for a project.
- **OpenAPI operationId**: `organizations_projects_default_evaluation_contexts_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsDefaultEvaluationContextsRetrieveInput = Parameters<typeof posthog.organizationsProjectsDefaultEvaluationContextsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsDefaultEvaluationContextsRetrieveOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsDefaultEvaluationContextsRetrieve>>;

const result: OrganizationsProjectsDefaultEvaluationContextsRetrieveOutput = await posthog.organizationsProjectsDefaultEvaluationContextsRetrieve();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsDefaultEvaluationContextsCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/projects/{id}/default_evaluation_contexts/`
- **What it does**: Manage default evaluation contexts for a project.
- **OpenAPI operationId**: `organizations_projects_default_evaluation_contexts_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsDefaultEvaluationContextsCreateInput = Parameters<typeof posthog.organizationsProjectsDefaultEvaluationContextsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsDefaultEvaluationContextsCreateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsDefaultEvaluationContextsCreate>>;

const result: OrganizationsProjectsDefaultEvaluationContextsCreateOutput = await posthog.organizationsProjectsDefaultEvaluationContextsCreate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsDefaultReleaseConditionsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/projects/{id}/default_release_conditions/`
- **What it does**: Manage default release conditions for new feature flags in this project.
- **OpenAPI operationId**: `organizations_projects_default_release_conditions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsDefaultReleaseConditionsRetrieveInput = Parameters<typeof posthog.organizationsProjectsDefaultReleaseConditionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsDefaultReleaseConditionsRetrieveOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsDefaultReleaseConditionsRetrieve>>;

const result: OrganizationsProjectsDefaultReleaseConditionsRetrieveOutput = await posthog.organizationsProjectsDefaultReleaseConditionsRetrieve();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsDefaultReleaseConditionsUpdate`

- **HTTP**: `PUT /api/organizations/{organization_id}/projects/{id}/default_release_conditions/`
- **What it does**: Manage default release conditions for new feature flags in this project.
- **OpenAPI operationId**: `organizations_projects_default_release_conditions_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsDefaultReleaseConditionsUpdateInput = Parameters<typeof posthog.organizationsProjectsDefaultReleaseConditionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsDefaultReleaseConditionsUpdateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsDefaultReleaseConditionsUpdate>>;

const result: OrganizationsProjectsDefaultReleaseConditionsUpdateOutput = await posthog.organizationsProjectsDefaultReleaseConditionsUpdate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsDeleteSecretTokenBackupPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/projects/{id}/delete_secret_token_backup/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_delete_secret_token_backup_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsDeleteSecretTokenBackupPartialUpdateInput = Parameters<typeof posthog.organizationsProjectsDeleteSecretTokenBackupPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsDeleteSecretTokenBackupPartialUpdateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsDeleteSecretTokenBackupPartialUpdate>>;

const result: OrganizationsProjectsDeleteSecretTokenBackupPartialUpdateOutput = await posthog.organizationsProjectsDeleteSecretTokenBackupPartialUpdate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsEvaluationContextSuggestionsDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/projects/{id}/evaluation_context_suggestions/`
- **What it does**: Hide an evaluation context name from the flag editor's suggestion list, or restore it.

POST hides the name; DELETE restores it. The underlying context row and any flags already
using it are never modified — this only controls what gets suggested.
- **OpenAPI operationId**: `organizations_projects_evaluation_context_suggestions_destroy`
- **Path params**: `id`
- **Query params**: `context_name`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean; name: string; hidden_from_suggestions: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsEvaluationContextSuggestionsDestroyInput = Parameters<typeof posthog.organizationsProjectsEvaluationContextSuggestionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsEvaluationContextSuggestionsDestroyOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsEvaluationContextSuggestionsDestroy>>;

const result: OrganizationsProjectsEvaluationContextSuggestionsDestroyOutput = await posthog.organizationsProjectsEvaluationContextSuggestionsDestroy();

// Result shape (from schema): { success: boolean; name: string; hidden_from_suggestions: boolean }
```

### `posthog.organizationsProjectsEvaluationContextSuggestionsCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/projects/{id}/evaluation_context_suggestions/`
- **What it does**: Hide an evaluation context name from the flag editor's suggestion list, or restore it.

POST hides the name; DELETE restores it. The underlying context row and any flags already
using it are never modified — this only controls what gets suggested.
- **OpenAPI operationId**: `organizations_projects_evaluation_context_suggestions_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean; name: string; hidden_from_suggestions: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsEvaluationContextSuggestionsCreateInput = Parameters<typeof posthog.organizationsProjectsEvaluationContextSuggestionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsEvaluationContextSuggestionsCreateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsEvaluationContextSuggestionsCreate>>;

const result: OrganizationsProjectsEvaluationContextSuggestionsCreateOutput = await posthog.organizationsProjectsEvaluationContextSuggestionsCreate();

// Result shape (from schema): { success: boolean; name: string; hidden_from_suggestions: boolean }
```

### `posthog.organizationsProjectsEventIngestionRestrictionsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/projects/{id}/event_ingestion_restrictions/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_event_ingestion_restrictions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsEventIngestionRestrictionsRetrieveInput = Parameters<typeof posthog.organizationsProjectsEventIngestionRestrictionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsEventIngestionRestrictionsRetrieveOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsEventIngestionRestrictionsRetrieve>>;

const result: OrganizationsProjectsEventIngestionRestrictionsRetrieveOutput = await posthog.organizationsProjectsEventIngestionRestrictionsRetrieve();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsExperimentsConfigRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/projects/{id}/experiments_config/`
- **What it does**: Manage experiment configuration for this project.
- **OpenAPI operationId**: `organizations_projects_experiments_config_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsExperimentsConfigRetrieveInput = Parameters<typeof posthog.organizationsProjectsExperimentsConfigRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsExperimentsConfigRetrieveOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsExperimentsConfigRetrieve>>;

const result: OrganizationsProjectsExperimentsConfigRetrieveOutput = await posthog.organizationsProjectsExperimentsConfigRetrieve();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsExperimentsConfigPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/projects/{id}/experiments_config/`
- **What it does**: Manage experiment configuration for this project.
- **OpenAPI operationId**: `organizations_projects_experiments_config_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsExperimentsConfigPartialUpdateInput = Parameters<typeof posthog.organizationsProjectsExperimentsConfigPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsExperimentsConfigPartialUpdateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsExperimentsConfigPartialUpdate>>;

const result: OrganizationsProjectsExperimentsConfigPartialUpdateOutput = await posthog.organizationsProjectsExperimentsConfigPartialUpdate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsGenerateConversationsPublicTokenCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/projects/{id}/generate_conversations_public_token/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_generate_conversations_public_token_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsGenerateConversationsPublicTokenCreateInput = Parameters<typeof posthog.organizationsProjectsGenerateConversationsPublicTokenCreate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsGenerateConversationsPublicTokenCreateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsGenerateConversationsPublicTokenCreate>>;

const result: OrganizationsProjectsGenerateConversationsPublicTokenCreateOutput = await posthog.organizationsProjectsGenerateConversationsPublicTokenCreate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsIsGeneratingDemoDataRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/projects/{id}/is_generating_demo_data/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_is_generating_demo_data_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsIsGeneratingDemoDataRetrieveInput = Parameters<typeof posthog.organizationsProjectsIsGeneratingDemoDataRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsIsGeneratingDemoDataRetrieveOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsIsGeneratingDemoDataRetrieve>>;

const result: OrganizationsProjectsIsGeneratingDemoDataRetrieveOutput = await posthog.organizationsProjectsIsGeneratingDemoDataRetrieve();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsLogsConfigRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/projects/{id}/logs_config/`
- **What it does**: Manage logs product configuration for this project's canonical environment.
Mirrors the env-router action so /api/projects/:id/logs_config/ resolves
alongside the legacy /api/environments/:id/logs_config/ alias.
- **OpenAPI operationId**: `organizations_projects_logs_config_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsLogsConfigRetrieveInput = Parameters<typeof posthog.organizationsProjectsLogsConfigRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsLogsConfigRetrieveOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsLogsConfigRetrieve>>;

const result: OrganizationsProjectsLogsConfigRetrieveOutput = await posthog.organizationsProjectsLogsConfigRetrieve();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsLogsConfigPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/projects/{id}/logs_config/`
- **What it does**: Manage logs product configuration for this project's canonical environment.
Mirrors the env-router action so /api/projects/:id/logs_config/ resolves
alongside the legacy /api/environments/:id/logs_config/ alias.
- **OpenAPI operationId**: `organizations_projects_logs_config_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsLogsConfigPartialUpdateInput = Parameters<typeof posthog.organizationsProjectsLogsConfigPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsLogsConfigPartialUpdateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsLogsConfigPartialUpdate>>;

const result: OrganizationsProjectsLogsConfigPartialUpdateOutput = await posthog.organizationsProjectsLogsConfigPartialUpdate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsResetTokenPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/projects/{id}/reset_token/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_reset_token_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsResetTokenPartialUpdateInput = Parameters<typeof posthog.organizationsProjectsResetTokenPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsResetTokenPartialUpdateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsResetTokenPartialUpdate>>;

const result: OrganizationsProjectsResetTokenPartialUpdateOutput = await posthog.organizationsProjectsResetTokenPartialUpdate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsRotateSecretTokenPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/projects/{id}/rotate_secret_token/`
- **What it does**: Projects for the current organization.
- **OpenAPI operationId**: `organizations_projects_rotate_secret_token_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsRotateSecretTokenPartialUpdateInput = Parameters<typeof posthog.organizationsProjectsRotateSecretTokenPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsRotateSecretTokenPartialUpdateOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsRotateSecretTokenPartialUpdate>>;

const result: OrganizationsProjectsRotateSecretTokenPartialUpdateOutput = await posthog.organizationsProjectsRotateSecretTokenPartialUpdate();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.organizationsProjectsSettingsAsOfRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/projects/{id}/settings_as_of/`
- **What it does**: Return the project settings as of the provided timestamp.
Query params:
- at: ISO8601 datetime (required)
- scope: optional, one or multiple keys to filter the returned settings
- **OpenAPI operationId**: `organizations_projects_settings_as_of_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrganizationsProjectsSettingsAsOfRetrieveInput = Parameters<typeof posthog.organizationsProjectsSettingsAsOfRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrganizationsProjectsSettingsAsOfRetrieveOutput = Awaited<ReturnType<typeof posthog.organizationsProjectsSettingsAsOfRetrieve>>;

const result: OrganizationsProjectsSettingsAsOfRetrieveOutput = await posthog.organizationsProjectsSettingsAsOfRetrieve();

// Result shape (from schema): { id: number; organization: string; name?: string; product_description?: string | null; created_at: string; effective_membership_level: 1 | 8 | 15; has_group_types: boolean; group_types: ({ [key: string]: unknown })[]; ...
```

### `posthog.roleExternalReferencesList`

- **HTTP**: `GET /api/organizations/{organization_id}/role_external_references/`
- **OpenAPI operationId**: `role_external_references_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; provider: string; provider_organization_id: string; provider_role_id: string; provider_role_slug?: string | null; provider_role_na...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RoleExternalReferencesListInput = Parameters<typeof posthog.roleExternalReferencesList> extends [infer T, ...unknown[]] ? T : undefined;
type RoleExternalReferencesListOutput = Awaited<ReturnType<typeof posthog.roleExternalReferencesList>>;

const result: RoleExternalReferencesListOutput = await posthog.roleExternalReferencesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; provider: string; provider_organization_id: string; provider_role_id: string; provider_role_slug?: string | null; provider_role_na...
```

### `posthog.roleExternalReferencesCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/role_external_references/`
- **OpenAPI operationId**: `role_external_references_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: string; provider_organization_id: string; provider_role_id: string; provider_role_slug?: string | null; provider_role_name: string; role: string; created_at: string; created_by: { id: number; uui...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type RoleExternalReferencesCreateInput = Parameters<typeof posthog.roleExternalReferencesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type RoleExternalReferencesCreateOutput = Awaited<ReturnType<typeof posthog.roleExternalReferencesCreate>>;

const result: RoleExternalReferencesCreateOutput = await posthog.roleExternalReferencesCreate();

// Result shape (from schema): { id: string; provider: string; provider_organization_id: string; provider_role_id: string; provider_role_slug?: string | null; provider_role_name: string; role: string; created_at: string; created_by: { id: number; uui...
```

### `posthog.roleExternalReferencesDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/role_external_references/{id}/`
- **OpenAPI operationId**: `role_external_references_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type RoleExternalReferencesDestroyInput = Parameters<typeof posthog.roleExternalReferencesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type RoleExternalReferencesDestroyOutput = Awaited<ReturnType<typeof posthog.roleExternalReferencesDestroy>>;

const result: RoleExternalReferencesDestroyOutput = await posthog.roleExternalReferencesDestroy();

// Result shape (from schema): unknown
```

### `posthog.roleExternalReferencesLookupRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/role_external_references/lookup/`
- **OpenAPI operationId**: `role_external_references_lookup_retrieve`
- **Path params**: None
- **Query params**: `provider`, `provider_organization_id`, `provider_role_id`, `provider_role_slug`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ reference: { id: string; provider: string; provider_organization_id: string; provider_role_id: string; provider_role_slug?: string | null; provider_role_name: string; role: string; created_at: string; created_by: { id...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RoleExternalReferencesLookupRetrieveInput = Parameters<typeof posthog.roleExternalReferencesLookupRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type RoleExternalReferencesLookupRetrieveOutput = Awaited<ReturnType<typeof posthog.roleExternalReferencesLookupRetrieve>>;

const result: RoleExternalReferencesLookupRetrieveOutput = await posthog.roleExternalReferencesLookupRetrieve();

// Result shape (from schema): { reference: { id: string; provider: string; provider_organization_id: string; provider_role_id: string; provider_role_slug?: string | null; provider_role_name: string; role: string; created_at: string; created_by: { id...
```

### `posthog.rolesList`

- **HTTP**: `GET /api/organizations/{organization_id}/roles/`
- **OpenAPI operationId**: `roles_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RolesListInput = Parameters<typeof posthog.rolesList> extends [infer T, ...unknown[]] ? T : undefined;
type RolesListOutput = Awaited<ReturnType<typeof posthog.rolesList>>;

const result: RolesListOutput = await posthog.rolesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_n...
```

### `posthog.rolesCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/roles/`
- **OpenAPI operationId**: `roles_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type RolesCreateInput = Parameters<typeof posthog.rolesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type RolesCreateOutput = Awaited<ReturnType<typeof posthog.rolesCreate>>;

const result: RolesCreateOutput = await posthog.rolesCreate();

// Result shape (from schema): { id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...
```

### `posthog.rolesDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/roles/{id}/`
- **OpenAPI operationId**: `roles_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type RolesDestroyInput = Parameters<typeof posthog.rolesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type RolesDestroyOutput = Awaited<ReturnType<typeof posthog.rolesDestroy>>;

const result: RolesDestroyOutput = await posthog.rolesDestroy();

// Result shape (from schema): unknown
```

### `posthog.rolesRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/roles/{id}/`
- **OpenAPI operationId**: `roles_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RolesRetrieveInput = Parameters<typeof posthog.rolesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type RolesRetrieveOutput = Awaited<ReturnType<typeof posthog.rolesRetrieve>>;

const result: RolesRetrieveOutput = await posthog.rolesRetrieve();

// Result shape (from schema): { id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...
```

### `posthog.rolesPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/roles/{id}/`
- **OpenAPI operationId**: `roles_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RolesPartialUpdateInput = Parameters<typeof posthog.rolesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type RolesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.rolesPartialUpdate>>;

const result: RolesPartialUpdateOutput = await posthog.rolesPartialUpdate();

// Result shape (from schema): { id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...
```

### `posthog.rolesUpdate`

- **HTTP**: `PUT /api/organizations/{organization_id}/roles/{id}/`
- **OpenAPI operationId**: `roles_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RolesUpdateInput = Parameters<typeof posthog.rolesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type RolesUpdateOutput = Awaited<ReturnType<typeof posthog.rolesUpdate>>;

const result: RolesUpdateOutput = await posthog.rolesUpdate();

// Result shape (from schema): { id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...
```

### `posthog.rolesRoleMembershipsList`

- **HTTP**: `GET /api/organizations/{organization_id}/roles/{role_id}/role_memberships/`
- **OpenAPI operationId**: `roles_role_memberships_list`
- **Path params**: `role_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; role_id: string; organization_member: { id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RolesRoleMembershipsListInput = Parameters<typeof posthog.rolesRoleMembershipsList> extends [infer T, ...unknown[]] ? T : undefined;
type RolesRoleMembershipsListOutput = Awaited<ReturnType<typeof posthog.rolesRoleMembershipsList>>;

const result: RolesRoleMembershipsListOutput = await posthog.rolesRoleMembershipsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; role_id: string; organization_member: { id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: st...
```

### `posthog.rolesRoleMembershipsCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/roles/{role_id}/role_memberships/`
- **OpenAPI operationId**: `roles_role_memberships_create`
- **Path params**: `role_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; role_id: string; organization_member: { id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type RolesRoleMembershipsCreateInput = Parameters<typeof posthog.rolesRoleMembershipsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type RolesRoleMembershipsCreateOutput = Awaited<ReturnType<typeof posthog.rolesRoleMembershipsCreate>>;

const result: RolesRoleMembershipsCreateOutput = await posthog.rolesRoleMembershipsCreate();

// Result shape (from schema): { id: string; role_id: string; organization_member: { id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null...
```

### `posthog.rolesRoleMembershipsDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/roles/{role_id}/role_memberships/{id}/`
- **OpenAPI operationId**: `roles_role_memberships_destroy`
- **Path params**: `id`, `role_id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type RolesRoleMembershipsDestroyInput = Parameters<typeof posthog.rolesRoleMembershipsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type RolesRoleMembershipsDestroyOutput = Awaited<ReturnType<typeof posthog.rolesRoleMembershipsDestroy>>;

const result: RolesRoleMembershipsDestroyOutput = await posthog.rolesRoleMembershipsDestroy();

// Result shape (from schema): unknown
```

### `posthog.rolesRoleMembershipsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/roles/{role_id}/role_memberships/{id}/`
- **OpenAPI operationId**: `roles_role_memberships_retrieve`
- **Path params**: `id`, `role_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; role_id: string; organization_member: { id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RolesRoleMembershipsRetrieveInput = Parameters<typeof posthog.rolesRoleMembershipsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type RolesRoleMembershipsRetrieveOutput = Awaited<ReturnType<typeof posthog.rolesRoleMembershipsRetrieve>>;

const result: RolesRoleMembershipsRetrieveOutput = await posthog.rolesRoleMembershipsRetrieve();

// Result shape (from schema): { id: string; role_id: string; organization_member: { id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null...
```

### `posthog.welcomeCurrentRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/welcome/current/`
- **What it does**: Aggregated payload for the invited-user welcome screen.
- **OpenAPI operationId**: `welcome_current_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ organization_name: string; inviter: { name: string; email: string } | null; team_members: ({ name: string; email: string; avatar: string | null; role: string; last_active: "today" | "this_week" | "inactive" | "never" ...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type WelcomeCurrentRetrieveInput = Parameters<typeof posthog.welcomeCurrentRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WelcomeCurrentRetrieveOutput = Awaited<ReturnType<typeof posthog.welcomeCurrentRetrieve>>;

const result: WelcomeCurrentRetrieveOutput = await posthog.welcomeCurrentRetrieve();

// Result shape (from schema): { organization_name: string; inviter: { name: string; email: string } | null; team_members: ({ name: string; email: string; avatar: string | null; role: string; last_active: "today" | "this_week" | "inactive" | "never" ...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
