# posthog

@utdk/posthog is a generated, typed client for this provider.

This client wraps the provider API in typed methods focused on Error Tracking, Llm Analytics, Organizations, Logs.

## Quick start

```ts
import posthog from "@utdk/posthog";

// Example operation call (see guides below for full signatures)
await posthog.someOperation({});
```

## Capability guides

- [Account Relationship Definitions](./docs/account_relationship_definitions.md) - 6 operations
- [Accounts](./docs/accounts.md) - 12 operations
- [Actions](./docs/actions.md) - 8 operations
- [Activity Logs](./docs/activity_logs.md) - 4 operations
- [Advanced Activity Logs](./docs/advanced_activity_logs.md) - 3 operations
- [Agent Platform](./docs/agent_platform.md) - 65 operations
- [AI Observability](./docs/ai-observability.md) - 11 operations
- [Alerts](./docs/alerts.md) - 14 operations
- [Annotations](./docs/annotations.md) - 6 operations
- [Batch Exports](./docs/batch_exports.md) - 66 operations
- [Business Knowledge](./docs/business_knowledge.md) - 14 operations
- [Code Invites](./docs/code-invites.md) - 2 operations
- [Cohorts](./docs/cohorts.md) - 13 operations
- [Comments](./docs/comments.md) - 10 operations
- [Conversations](./docs/conversations.md) - 21 operations
- [Custom Property Definitions](./docs/custom_property_definitions.md) - 14 operations
- [Custom Property Sources](./docs/custom_property_sources.md) - 6 operations
- [Customer Analytics](./docs/customer_analytics.md) - 14 operations
- [Customer Journeys](./docs/customer_journeys.md) - 12 operations
- [Customer Profile Configs](./docs/customer_profile_configs.md) - 12 operations
- [Dashboard Templates](./docs/dashboard_templates.md) - 8 operations
- [Dashboards](./docs/dashboards.md) - 58 operations
- [Data Color Themes](./docs/data_color_themes.md) - 12 operations
- [Data Modeling Jobs](./docs/data_modeling_jobs.md) - 8 operations
- [Data Warehouse](./docs/data_warehouse.md) - 28 operations
- [Dataset Items](./docs/dataset_items.md) - 12 operations
- [Datasets](./docs/datasets.md) - 12 operations
- [Desktop File System](./docs/desktop_file_system.md) - 22 operations
- [Desktop File System Shortcut](./docs/desktop_file_system_shortcut.md) - 7 operations
- [Docs](./docs/docs.md) - 2 operations
- [Early Access Feature](./docs/early_access_feature.md) - 6 operations
- [Elements](./docs/elements.md) - 16 operations
- [Endpoints](./docs/endpoints.md) - 32 operations
- [Engineering Analytics](./docs/engineering_analytics.md) - 22 operations
- [Environments](./docs/environments.md) - 27 operations
- [Error Tracking](./docs/error_tracking.md) - 164 operations
- [Evaluation Runs](./docs/evaluation_runs.md) - 2 operations
- [Evaluations](./docs/evaluations.md) - 14 operations
- [Event Definitions](./docs/event_definitions.md) - 13 operations
- [Event Filter](./docs/event_filter.md) - 8 operations
- [Event Schemas](./docs/event_schemas.md) - 5 operations
- [Events](./docs/events.md) - 6 operations
- [Experiment Holdouts](./docs/experiment_holdouts.md) - 6 operations
- [Experiment Saved Metrics](./docs/experiment_saved_metrics.md) - 6 operations
- [Experiments](./docs/experiments.md) - 29 operations
- [Exports](./docs/exports.md) - 8 operations
- [External Data Schemas](./docs/external_data_schemas.md) - 24 operations
- [External Data Sources](./docs/external_data_sources.md) - 66 operations
- [Feature Flags](./docs/feature_flags.md) - 23 operations
- [Field Notes](./docs/field_notes.md) - 6 operations
- [File System](./docs/file_system.md) - 28 operations
- [File System Shortcut](./docs/file_system_shortcut.md) - 14 operations
- [Flag Value](./docs/flag_value.md) - 1 operations
- [Groups](./docs/groups.md) - 16 operations
- [Groups Types](./docs/groups_types.md) - 11 operations
- [Health Issues](./docs/health_issues.md) - 12 operations
- [Heatmap Screenshots](./docs/heatmap_screenshots.md) - 2 operations
- [Heatmaps](./docs/heatmaps.md) - 4 operations
- [Hog Flows](./docs/hog_flows.md) - 50 operations
- [Hog Function Templates](./docs/hog_function_templates.md) - 3 operations
- [Hog Functions](./docs/hog_functions.md) - 30 operations
- [Ingestion Warnings V2](./docs/ingestion_warnings_v2.md) - 1 operations
- [Insight Variables](./docs/insight_variables.md) - 12 operations
- [Insights](./docs/insights.md) - 50 operations
- [Integrations](./docs/integrations.md) - 62 operations
- [Js Snippet](./docs/js-snippet.md) - 3 operations
- [Live Debugger Breakpoints](./docs/live_debugger_breakpoints.md) - 8 operations
- [Llm Analytics](./docs/llm_analytics.md) - 107 operations
- [Llm Prompts](./docs/llm_prompts.md) - 14 operations
- [Llm Skills](./docs/llm_skills.md) - 30 operations
- [Logs](./docs/logs.md) - 78 operations
- [Managed Viewsets](./docs/managed_viewsets.md) - 4 operations
- [Marketing Analytics](./docs/marketing_analytics.md) - 16 operations
- [Max](./docs/max.md) - 24 operations
- [Max Tools](./docs/max_tools.md) - 2 operations
- [Mcp Analytics](./docs/mcp_analytics.md) - 22 operations
- [Mcp Server Installations](./docs/mcp_server_installations.md) - 30 operations
- [Mcp Servers](./docs/mcp_servers.md) - 2 operations
- [Mcp Tools](./docs/mcp_tools.md) - 2 operations
- [Messaging Templates](./docs/messaging_templates.md) - 14 operations
- [Metrics](./docs/metrics.md) - 14 operations
- [Notebooks](./docs/notebooks.md) - 26 operations
- [Object Media Previews](./docs/object_media_previews.md) - 7 operations
- [Organizations](./docs/organizations.md) - 91 operations
- [Persons](./docs/persons.md) - 46 operations
- [Platform Features](./docs/platform_features.md) - 22 operations
- [Plugin Configs](./docs/plugin_configs.md) - 2 operations
- [Product Enablement](./docs/product_enablement.md) - 1 operations
- [Product Tours](./docs/product_tours.md) - 11 operations
- [Project Secret Api Keys](./docs/project_secret_api_keys.md) - 14 operations
- [Property Access Controls](./docs/property_access_controls.md) - 6 operations
- [Property Definitions](./docs/property_definitions.md) - 7 operations
- [Query](./docs/query.md) - 16 operations
- [Quota Limits](./docs/quota_limits.md) - 1 operations
- [Reminders](./docs/reminders.md) - 6 operations
- [Replay](./docs/replay.md) - 32 operations
- [Reverse Proxy](./docs/reverse_proxy.md) - 6 operations
- [Sandbox Custom Images](./docs/sandbox-custom-images.md) - 6 operations
- [Sandbox Environments](./docs/sandbox-environments.md) - 5 operations
- [Saved](./docs/saved.md) - 12 operations
- [Saved Query Column Annotations](./docs/saved_query_column_annotations.md) - 6 operations
- [Scheduled Changes](./docs/scheduled_changes.md) - 6 operations
- [Schema Property Groups](./docs/schema_property_groups.md) - 6 operations
- [Sdk Health](./docs/sdk_health.md) - 1 operations
- [Session Group Summaries](./docs/session_group_summaries.md) - 6 operations
- [Session Recordings](./docs/session_recordings.md) - 8 operations
- [Session Summaries](./docs/session_summaries.md) - 6 operations
- [Sessions](./docs/sessions.md) - 4 operations
- [Signals](./docs/signals.md) - 44 operations
- [Single Session Summaries](./docs/single_session_summaries.md) - 2 operations
- [Streamlit Apps](./docs/streamlit_apps.md) - 14 operations
- [Subscriptions](./docs/subscriptions.md) - 20 operations
- [Surveys](./docs/surveys.md) - 22 operations
- [Taggers](./docs/taggers.md) - 14 operations
- [Task Channels](./docs/task_channels.md) - 4 operations
- [Task Mentions](./docs/task_mentions.md) - 1 operations
- [Task Automations](./docs/task-automations.md) - 6 operations
- [Task Runs](./docs/task-runs.md) - 20 operations
- [Tasks](./docs/tasks.md) - 24 operations
- [Tracing](./docs/tracing.md) - 38 operations
- [Uploaded Media](./docs/uploaded_media.md) - 1 operations
- [User Home Settings](./docs/user_home_settings.md) - 2 operations
- [User Interview Topics](./docs/user_interview_topics.md) - 40 operations
- [User Interviews](./docs/user_interviews.md) - 14 operations
- [Users](./docs/users.md) - 39 operations
- [Vision](./docs/vision.md) - 63 operations
- [Visual Review](./docs/visual_review.md) - 25 operations
- [Warehouse Column Annotations](./docs/warehouse_column_annotations.md) - 6 operations
- [Warehouse Column Statistics](./docs/warehouse_column_statistics.md) - 2 operations
- [Warehouse Dag](./docs/warehouse_dag.md) - 1 operations
- [Warehouse Model Paths](./docs/warehouse_model_paths.md) - 2 operations
- [Warehouse Saved Queries](./docs/warehouse_saved_queries.md) - 32 operations
- [Warehouse Saved Query Folders](./docs/warehouse_saved_query_folders.md) - 10 operations
- [Warehouse Tables](./docs/warehouse_tables.md) - 18 operations
- [Warehouse View Link](./docs/warehouse_view_link.md) - 14 operations
- [Warehouse View Links](./docs/warehouse_view_links.md) - 14 operations
- [Web Analytics](./docs/web_analytics.md) - 4 operations
- [Web Analytics Achievements](./docs/web_analytics_achievements.md) - 6 operations
- [Web Experiments](./docs/web_experiments.md) - 6 operations
- [Web Vitals](./docs/web_vitals.md) - 2 operations
- [Wizard](./docs/wizard.md) - 5 operations

Each guide is organized by callable operation name (for example, `client.someOperation`), with typed input/output snippets.

## Source Index

# posthog docs cache index

Generated: 2026-07-12T21:26:28.865Z

## Sources

### reference

- [Registry Documentation](https://posthog.com/docs/api) (openapi)

## Authentication

- `PersonalAPIKeyAuth`: http (bearer)
