# Web Analytics Achievements

## Operations

### `posthog.webAnalyticsAchievementsAcknowledgeCelebration`

- **HTTP**: `POST /api/projects/{project_id}/web_analytics_achievements/acknowledge_celebration/`
- **What it does**: Acknowledge an achievement celebration
- **OpenAPI operationId**: `web_analytics_achievements_acknowledge_celebration`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ acknowledged: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebAnalyticsAchievementsAcknowledgeCelebrationInput = Parameters<typeof posthog.webAnalyticsAchievementsAcknowledgeCelebration> extends [infer T, ...unknown[]] ? T : undefined;
type WebAnalyticsAchievementsAcknowledgeCelebrationOutput = Awaited<ReturnType<typeof posthog.webAnalyticsAchievementsAcknowledgeCelebration>>;

const result: WebAnalyticsAchievementsAcknowledgeCelebrationOutput = await posthog.webAnalyticsAchievementsAcknowledgeCelebration();

// Result shape (from schema): { acknowledged: boolean }
```

### `posthog.webAnalyticsAchievementsOverview`

- **HTTP**: `GET /api/projects/{project_id}/web_analytics_achievements/overview/`
- **What it does**: Get Web analytics achievements overview
- **OpenAPI operationId**: `web_analytics_achievements_overview`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ definitions: ({ key: string; display_name: string; description: string; scope: "user" | "team"; is_experiment_track: boolean; stages: ({ stage: number; name: string; threshold: number })[] })[]; user_progress: ({ trac...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebAnalyticsAchievementsOverviewInput = Parameters<typeof posthog.webAnalyticsAchievementsOverview> extends [infer T, ...unknown[]] ? T : undefined;
type WebAnalyticsAchievementsOverviewOutput = Awaited<ReturnType<typeof posthog.webAnalyticsAchievementsOverview>>;

const result: WebAnalyticsAchievementsOverviewOutput = await posthog.webAnalyticsAchievementsOverview();

// Result shape (from schema): { definitions: ({ key: string; display_name: string; description: string; scope: "user" | "team"; is_experiment_track: boolean; stages: ({ stage: number; name: string; threshold: number })[] })[]; user_progress: ({ trac...
```

### `posthog.webAnalyticsAchievementsPreferences`

- **HTTP**: `GET /api/projects/{project_id}/web_analytics_achievements/preferences/`
- **What it does**: Get Web analytics achievements preferences
- **OpenAPI operationId**: `web_analytics_achievements_preferences`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ achievements_opt_out: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebAnalyticsAchievementsPreferencesInput = Parameters<typeof posthog.webAnalyticsAchievementsPreferences> extends [infer T, ...unknown[]] ? T : undefined;
type WebAnalyticsAchievementsPreferencesOutput = Awaited<ReturnType<typeof posthog.webAnalyticsAchievementsPreferences>>;

const result: WebAnalyticsAchievementsPreferencesOutput = await posthog.webAnalyticsAchievementsPreferences();

// Result shape (from schema): { achievements_opt_out: boolean }
```

### `posthog.webAnalyticsAchievementsUpdatePreferences`

- **HTTP**: `POST /api/projects/{project_id}/web_analytics_achievements/preferences/`
- **What it does**: Update Web analytics achievements preferences
- **OpenAPI operationId**: `web_analytics_achievements_update_preferences`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ achievements_opt_out: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebAnalyticsAchievementsUpdatePreferencesInput = Parameters<typeof posthog.webAnalyticsAchievementsUpdatePreferences> extends [infer T, ...unknown[]] ? T : undefined;
type WebAnalyticsAchievementsUpdatePreferencesOutput = Awaited<ReturnType<typeof posthog.webAnalyticsAchievementsUpdatePreferences>>;

const result: WebAnalyticsAchievementsUpdatePreferencesOutput = await posthog.webAnalyticsAchievementsUpdatePreferences();

// Result shape (from schema): { achievements_opt_out: boolean }
```

### `posthog.webAnalyticsAchievementsRecordInteraction`

- **HTTP**: `POST /api/projects/{project_id}/web_analytics_achievements/record_interaction/`
- **What it does**: Record a Web analytics interaction
- **OpenAPI operationId**: `web_analytics_achievements_record_interaction`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ recorded: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebAnalyticsAchievementsRecordInteractionInput = Parameters<typeof posthog.webAnalyticsAchievementsRecordInteraction> extends [infer T, ...unknown[]] ? T : undefined;
type WebAnalyticsAchievementsRecordInteractionOutput = Awaited<ReturnType<typeof posthog.webAnalyticsAchievementsRecordInteraction>>;

const result: WebAnalyticsAchievementsRecordInteractionOutput = await posthog.webAnalyticsAchievementsRecordInteraction();

// Result shape (from schema): { recorded: boolean }
```

### `posthog.webAnalyticsAchievementsRecordVisit`

- **HTTP**: `POST /api/projects/{project_id}/web_analytics_achievements/record_visit/`
- **What it does**: Record a Web analytics visit
- **OpenAPI operationId**: `web_analytics_achievements_record_visit`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ recorded: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebAnalyticsAchievementsRecordVisitInput = Parameters<typeof posthog.webAnalyticsAchievementsRecordVisit> extends [infer T, ...unknown[]] ? T : undefined;
type WebAnalyticsAchievementsRecordVisitOutput = Awaited<ReturnType<typeof posthog.webAnalyticsAchievementsRecordVisit>>;

const result: WebAnalyticsAchievementsRecordVisitOutput = await posthog.webAnalyticsAchievementsRecordVisit();

// Result shape (from schema): { recorded: boolean }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
