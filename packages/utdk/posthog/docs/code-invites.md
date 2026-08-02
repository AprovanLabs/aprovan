# Code Invites

## Operations

### `posthog.codeInvitesCheckAccessRetrieve`

- **HTTP**: `GET /api/code/invites/check-access/`
- **What it does**: Check access
- **OpenAPI operationId**: `code_invites_check_access_retrieve`
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

type CodeInvitesCheckAccessRetrieveInput = Parameters<typeof posthog.codeInvitesCheckAccessRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CodeInvitesCheckAccessRetrieveOutput = Awaited<ReturnType<typeof posthog.codeInvitesCheckAccessRetrieve>>;

const result: CodeInvitesCheckAccessRetrieveOutput = await posthog.codeInvitesCheckAccessRetrieve();

// Result shape (from schema): unknown
```

### `posthog.codeInvitesRedeemCreate`

- **HTTP**: `POST /api/code/invites/redeem/`
- **What it does**: Redeem invite code
- **OpenAPI operationId**: `code_invites_redeem_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type CodeInvitesRedeemCreateInput = Parameters<typeof posthog.codeInvitesRedeemCreate> extends [infer T, ...unknown[]] ? T : undefined;
type CodeInvitesRedeemCreateOutput = Awaited<ReturnType<typeof posthog.codeInvitesRedeemCreate>>;

const result: CodeInvitesRedeemCreateOutput = await posthog.codeInvitesRedeemCreate();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
