# Billing

13 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.billing.getGithubBillingAiCreditUsageReportOrg`

Get billing AI credit usage report for an organization — [API reference](https://docs.github.com/rest/billing/usage#get-billing-ai-credit-usage-report-for-an-organization)

```ts
github.billing.getGithubBillingAiCreditUsageReportOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year. */
  year?: number;
  /** If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. Default value is the current month. If no year is specified the default `year` is used. */
  month?: number;
  /** If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used. */
  day?: number;
  /** The user name to query usage for. The name is not case sensitive. */
  user?: string;
  /** The model name to query usage for. The name is not case sensitive. */
  model?: string;
  /** The product name to query usage for. The name is not case sensitive. */
  product?: string;
}): Promise<BillingAiCreditUsageReportOrg>
```

<sub>`GET /organizations/{org}/settings/billing/ai_credit/usage` · `billing/get-github-billing-ai-credit-usage-report-org`</sub>

## `github.billing.getAllBudgetsOrg`

Get all budgets for an organization — [API reference](https://docs.github.com/rest/billing/budgets#get-all-budgets-for-an-organization)

```ts
github.billing.getAllBudgetsOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The page number of the results to fetch. */
  page?: number;
  /** The number of results per page (max 100). */
  per_page?: number;
  /** Filter budgets by scope type.  - `organization`: Budgets scoped to the organization. - `repository`: Budgets scoped to a repository. - `multi_user_customer`: Universal budgets that apply to all users in the organization. - `user`: Budgets scoped to an individual user. */
  scope?: "enterprise" | "organization" | "repository" | "cost_center" | "multi_user_customer" | "user";
  /** Filter consumed amount details for budgets by the specified user login. */
  user?: string;
}): Promise<GetAllBudgets>
```

<sub>`GET /organizations/{org}/settings/billing/budgets` · `billing/get-all-budgets-org`</sub>

## `github.billing.createOrganizationBudget`

Create a budget for an organization — [API reference](https://docs.github.com/rest/billing/budgets#create-a-budget-for-an-organization)

```ts
github.billing.createOrganizationBudget(input: {
  /** The budget amount in whole dollars. For license-based products, this represents the number of licenses. */
  budget_amount?: number;
  /** Whether to prevent additional spending once the budget is exceeded. For `user` and `multi_user_customer` scopes, this must be `true`. */
  prevent_further_usage?: boolean;
  budget_alerting?: { will_alert?: boolean; alert_recipients?: (string)[] };
  /** The scope of the budget for this organization.  - `organization`: Apply the budget to the organization. - `repository`: Apply the budget to a specific repository in the organization. - `multi_user_customer`: Apply a universal budget to all users in the organization. - `user`: Apply the budget to a single user in the organization.  `user` and `multi_user_customer` scopes are only supported when `budget_product_sku` is `ai_credits` or `premium_requests`. */
  budget_scope?: "organization" | "repository" | "multi_user_customer" | "user";
  /** The name of the entity to apply the budget to */
  budget_entity_name?: string;
  /** The type of pricing model used by the budget. Determines how `budget_product_sku` is interpreted.  - `BundlePricing`: Covers all AI credit SKUs. Set `budget_product_sku` to `ai_credits`. - `ProductPricing`: Covers all SKUs that belong to a product. Set `budget_product_sku` to a product such as `actions` or `packages`. - `SkuPricing`: Covers a single, specific SKU. Set `budget_product_sku` to a SKU such as `actions_linux`. */
  budget_type?: "BundlePricing" | "ProductPricing" | "SkuPricing";
  /** A single product or SKU that will be covered in the budget */
  budget_product_sku?: string;
  /** The username of the user for `user` scope budgets. This field is required when `budget_scope` is `user`. */
  user?: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<CreateBudget>
```

<sub>`POST /organizations/{org}/settings/billing/budgets` · `billing/create-organization-budget`</sub>

## `github.billing.deleteBudgetOrg`

Delete a budget for an organization — [API reference](https://docs.github.com/rest/billing/budgets#delete-a-budget-for-an-organization)

```ts
github.billing.deleteBudgetOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The ID corresponding to the budget. */
  budget_id: string;
}): Promise<DeleteBudget>
```

<sub>`DELETE /organizations/{org}/settings/billing/budgets/{budget_id}` · `billing/delete-budget-org`</sub>

## `github.billing.getBudgetOrg`

Get a budget by ID for an organization — [API reference](https://docs.github.com/rest/billing/budgets#get-a-budget-by-id-for-an-organization)

```ts
github.billing.getBudgetOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The ID corresponding to the budget. */
  budget_id: string;
}): Promise<GetBudget>
```

<sub>`GET /organizations/{org}/settings/billing/budgets/{budget_id}` · `billing/get-budget-org`</sub>

## `github.billing.updateBudgetOrg`

Update a budget for an organization — [API reference](https://docs.github.com/rest/billing/budgets#update-a-budget-for-an-organization)

```ts
github.billing.updateBudgetOrg(input: {
  /** The budget amount in whole dollars. For license-based products, this represents the number of licenses. */
  budget_amount?: number;
  /** Whether to prevent additional spending once the budget is exceeded. For budgets with `user` or `multi_user_customer` scope, this must remain `true`. */
  prevent_further_usage?: boolean;
  budget_alerting?: { will_alert?: boolean; alert_recipients?: (string)[] };
  /** The scope of the budget for this organization.  - `organization`: Apply the budget to the organization. - `repository`: Apply the budget to a specific repository in the organization. - `multi_user_customer`: Apply a universal budget to all users in the organization. - `user`: Apply the budget to a single user in the organization. */
  budget_scope?: "enterprise" | "organization" | "repository" | "cost_center" | "multi_user_customer" | "user";
  /** The name of the entity to apply the budget to */
  budget_entity_name?: string;
  /** The type of pricing model used by the budget. Determines how `budget_product_sku` is interpreted.  - `BundlePricing`: Covers all AI credit SKUs. Set `budget_product_sku` to `ai_credits`. - `ProductPricing`: Covers all SKUs that belong to a product. Set `budget_product_sku` to a product such as `actions` or `packages`. - `SkuPricing`: Covers a single, specific SKU. Set `budget_product_sku` to a SKU such as `actions_linux`. */
  budget_type?: "BundlePricing" | "ProductPricing" | "SkuPricing";
  /** A single product or SKU that will be covered in the budget */
  budget_product_sku?: string;
  /** The username of the user for `user` scope budgets. */
  user?: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The ID corresponding to the budget. */
  budget_id: string;
}): Promise<UpdateBudget>
```

<sub>`PATCH /organizations/{org}/settings/billing/budgets/{budget_id}` · `billing/update-budget-org`</sub>

## `github.billing.getGithubBillingPremiumRequestUsageReportOrg`

Get billing premium request usage report for an organization — [API reference](https://docs.github.com/rest/billing/usage#get-billing-premium-request-usage-report-for-an-organization)

```ts
github.billing.getGithubBillingPremiumRequestUsageReportOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year. */
  year?: number;
  /** If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. Default value is the current month. If no year is specified the default `year` is used. */
  month?: number;
  /** If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used. */
  day?: number;
  /** The user name to query usage for. The name is not case sensitive. */
  user?: string;
  /** The model name to query usage for. The name is not case sensitive. */
  model?: string;
  /** The product name to query usage for. The name is not case sensitive. */
  product?: string;
}): Promise<BillingPremiumRequestUsageReportOrg>
```

<sub>`GET /organizations/{org}/settings/billing/premium_request/usage` · `billing/get-github-billing-premium-request-usage-report-org`</sub>

## `github.billing.getGithubBillingUsageReportOrg`

Get billing usage report for an organization — [API reference](https://docs.github.com/rest/billing/usage#get-billing-usage-report-for-an-organization)

```ts
github.billing.getGithubBillingUsageReportOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year. */
  year?: number;
  /** If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. If no year is specified the default `year` is used. */
  month?: number;
  /** If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used. */
  day?: number;
}): Promise<BillingUsageReport>
```

<sub>`GET /organizations/{org}/settings/billing/usage` · `billing/get-github-billing-usage-report-org`</sub>

## `github.billing.getGithubBillingUsageSummaryReportOrg`

Get billing usage summary for an organization — [API reference](https://docs.github.com/rest/billing/usage#get-billing-usage-summary-for-an-organization)

```ts
github.billing.getGithubBillingUsageSummaryReportOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year. */
  year?: number;
  /** If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. Default value is the current month. If no year is specified the default `year` is used. */
  month?: number;
  /** If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used. */
  day?: number;
  /** The repository name to query for usage in the format owner/repository. */
  repository?: string;
  /** The product name to query usage for. The name is not case sensitive. */
  product?: string;
  /** The SKU to query for usage. */
  sku?: string;
}): Promise<BillingUsageSummaryReportOrg>
```

<sub>`GET /organizations/{org}/settings/billing/usage/summary` · `billing/get-github-billing-usage-summary-report-org`</sub>

## `github.billing.getGithubBillingAiCreditUsageReportUser`

Get billing AI credit usage report for a user — [API reference](https://docs.github.com/rest/billing/usage#get-billing-ai-credit-usage-report-for-a-user)

```ts
github.billing.getGithubBillingAiCreditUsageReportUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year. */
  year?: number;
  /** If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. Default value is the current month. If no year is specified the default `year` is used. */
  month?: number;
  /** If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used. */
  day?: number;
  /** The model name to query usage for. The name is not case sensitive. */
  model?: string;
  /** The product name to query usage for. The name is not case sensitive. */
  product?: string;
}): Promise<BillingAiCreditUsageReportUser>
```

<sub>`GET /users/{username}/settings/billing/ai_credit/usage` · `billing/get-github-billing-ai-credit-usage-report-user`</sub>

## `github.billing.getGithubBillingPremiumRequestUsageReportUser`

Get billing premium request usage report for a user — [API reference](https://docs.github.com/rest/billing/usage#get-billing-premium-request-usage-report-for-a-user)

```ts
github.billing.getGithubBillingPremiumRequestUsageReportUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year. */
  year?: number;
  /** If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. Default value is the current month. If no year is specified the default `year` is used. */
  month?: number;
  /** If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used. */
  day?: number;
  /** The model name to query usage for. The name is not case sensitive. */
  model?: string;
  /** The product name to query usage for. The name is not case sensitive. */
  product?: string;
}): Promise<BillingPremiumRequestUsageReportUser>
```

<sub>`GET /users/{username}/settings/billing/premium_request/usage` · `billing/get-github-billing-premium-request-usage-report-user`</sub>

## `github.billing.getGithubBillingUsageReportUser`

Get billing usage report for a user — [API reference](https://docs.github.com/rest/billing/usage#get-billing-usage-report-for-a-user)

```ts
github.billing.getGithubBillingUsageReportUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year. */
  year?: number;
  /** If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. If no year is specified the default `year` is used. */
  month?: number;
  /** If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used. */
  day?: number;
}): Promise<BillingUsageReportUser>
```

<sub>`GET /users/{username}/settings/billing/usage` · `billing/get-github-billing-usage-report-user`</sub>

## `github.billing.getGithubBillingUsageSummaryReportUser`

Get billing usage summary for a user — [API reference](https://docs.github.com/rest/billing/usage#get-billing-usage-summary-for-a-user)

```ts
github.billing.getGithubBillingUsageSummaryReportUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year. */
  year?: number;
  /** If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. Default value is the current month. If no year is specified the default `year` is used. */
  month?: number;
  /** If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used. */
  day?: number;
  /** The repository name to query for usage in the format owner/repository. */
  repository?: string;
  /** The product name to query usage for. The name is not case sensitive. */
  product?: string;
  /** The SKU to query for usage. */
  sku?: string;
}): Promise<BillingUsageSummaryReportUser>
```

<sub>`GET /users/{username}/settings/billing/usage/summary` · `billing/get-github-billing-usage-summary-report-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
