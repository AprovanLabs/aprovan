import type { BillingAiCreditUsageReportOrg, BillingAiCreditUsageReportUser, BillingPremiumRequestUsageReportOrg, BillingPremiumRequestUsageReportUser, BillingUsageReport, BillingUsageReportUser, BillingUsageSummaryReportOrg, BillingUsageSummaryReportUser, CreateBudget, DeleteBudget, GetAllBudgets, GetBudget, UpdateBudget } from "./schemas.js";

export type BillingOperations = {
  /**
   * Get billing AI credit usage report for an organization
   * @see https://docs.github.com/rest/billing/usage#get-billing-ai-credit-usage-report-for-an-organization
   */
  getGithubBillingAiCreditUsageReportOrg: (input: {
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
  }) => Promise<BillingAiCreditUsageReportOrg>;

  /**
   * Get all budgets for an organization
   * @see https://docs.github.com/rest/billing/budgets#get-all-budgets-for-an-organization
   */
  getAllBudgetsOrg: (input: {
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
  }) => Promise<GetAllBudgets>;

  /**
   * Create a budget for an organization
   * @see https://docs.github.com/rest/billing/budgets#create-a-budget-for-an-organization
   */
  createOrganizationBudget: (input: {
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
  }) => Promise<CreateBudget>;

  /**
   * Get a budget by ID for an organization
   * @see https://docs.github.com/rest/billing/budgets#get-a-budget-by-id-for-an-organization
   */
  getBudgetOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The ID corresponding to the budget. */
    budget_id: string;
  }) => Promise<GetBudget>;

  /**
   * Update a budget for an organization
   * @see https://docs.github.com/rest/billing/budgets#update-a-budget-for-an-organization
   */
  updateBudgetOrg: (input: {
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
  }) => Promise<UpdateBudget>;

  /**
   * Delete a budget for an organization
   * @see https://docs.github.com/rest/billing/budgets#delete-a-budget-for-an-organization
   */
  deleteBudgetOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The ID corresponding to the budget. */
    budget_id: string;
  }) => Promise<DeleteBudget>;

  /**
   * Get billing premium request usage report for an organization
   * @see https://docs.github.com/rest/billing/usage#get-billing-premium-request-usage-report-for-an-organization
   */
  getGithubBillingPremiumRequestUsageReportOrg: (input: {
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
  }) => Promise<BillingPremiumRequestUsageReportOrg>;

  /**
   * Get billing usage report for an organization
   * @see https://docs.github.com/rest/billing/usage#get-billing-usage-report-for-an-organization
   */
  getGithubBillingUsageReportOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year. */
    year?: number;
    /** If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. If no year is specified the default `year` is used. */
    month?: number;
    /** If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used. */
    day?: number;
  }) => Promise<BillingUsageReport>;

  /**
   * Get billing usage summary for an organization
   * @see https://docs.github.com/rest/billing/usage#get-billing-usage-summary-for-an-organization
   */
  getGithubBillingUsageSummaryReportOrg: (input: {
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
  }) => Promise<BillingUsageSummaryReportOrg>;

  /**
   * Get billing AI credit usage report for a user
   * @see https://docs.github.com/rest/billing/usage#get-billing-ai-credit-usage-report-for-a-user
   */
  getGithubBillingAiCreditUsageReportUser: (input: {
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
  }) => Promise<BillingAiCreditUsageReportUser>;

  /**
   * Get billing premium request usage report for a user
   * @see https://docs.github.com/rest/billing/usage#get-billing-premium-request-usage-report-for-a-user
   */
  getGithubBillingPremiumRequestUsageReportUser: (input: {
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
  }) => Promise<BillingPremiumRequestUsageReportUser>;

  /**
   * Get billing usage report for a user
   * @see https://docs.github.com/rest/billing/usage#get-billing-usage-report-for-a-user
   */
  getGithubBillingUsageReportUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year. */
    year?: number;
    /** If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. If no year is specified the default `year` is used. */
    month?: number;
    /** If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used. */
    day?: number;
  }) => Promise<BillingUsageReportUser>;

  /**
   * Get billing usage summary for a user
   * @see https://docs.github.com/rest/billing/usage#get-billing-usage-summary-for-a-user
   */
  getGithubBillingUsageSummaryReportUser: (input: {
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
  }) => Promise<BillingUsageSummaryReportUser>;
};
