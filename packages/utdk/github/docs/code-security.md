# Code Security

20 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.codeSecurity.getConfigurationsForEnterprise`

Get code security configurations for an enterprise — [API reference](https://docs.github.com/rest/code-security/configurations#get-code-security-configurations-for-an-enterprise)

```ts
github.codeSecurity.getConfigurationsForEnterprise(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
}): Promise<(CodeSecurityConfiguration)[]>
```

<sub>`GET /enterprises/{enterprise}/code-security/configurations` · `code-security/get-configurations-for-enterprise`</sub>

## `github.codeSecurity.createConfigurationForEnterprise`

Create a code security configuration for an enterprise — [API reference](https://docs.github.com/rest/code-security/configurations#create-a-code-security-configuration-for-an-enterprise)

```ts
github.codeSecurity.createConfigurationForEnterprise(input: {
  /** The name of the code security configuration. Must be unique within the enterprise. */
  name: string;
  /** A description of the code security configuration */
  description?: string;
  /** The enablement status of GitHub Advanced Security features. `enabled` will enable both Code Security and Secret Protection features.  > [!WARNING] > `code_security` and `secret_protection` are deprecated values for this field. Prefer the individual `code_security` and `secret_protection` fields to set the status of these features.  */
  advanced_security?: "enabled" | "disabled" | "code_security" | "secret_protection";
  /** The enablement status of GitHub Code Security features. */
  code_security?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Dependency Graph */
  dependency_graph?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Automatic dependency submission */
  dependency_graph_autosubmit_action?: "enabled" | "disabled" | "not_set";
  /** Feature options for Automatic dependency submission */
  dependency_graph_autosubmit_action_options?: { labeled_runners?: boolean };
  /** The enablement status of Dependabot alerts */
  dependabot_alerts?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Dependabot security updates */
  dependabot_security_updates?: "enabled" | "disabled" | "not_set";
  code_scanning_options?: CodeScanningOptions;
  /** The enablement status of code scanning default setup */
  code_scanning_default_setup?: "enabled" | "disabled" | "not_set";
  code_scanning_default_setup_options?: CodeScanningDefaultSetupOptions;
  /** The enablement status of code scanning delegated alert dismissal */
  code_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
  /** The enablement status of GitHub Secret Protection features. */
  secret_protection?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning */
  secret_scanning?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning push protection */
  secret_scanning_push_protection?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning validity checks */
  secret_scanning_validity_checks?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning non provider patterns */
  secret_scanning_non_provider_patterns?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Copilot secret scanning */
  secret_scanning_generic_secrets?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning delegated alert dismissal */
  secret_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning extended metadata */
  secret_scanning_extended_metadata?: "enabled" | "disabled" | "not_set";
  /** The enablement status of private vulnerability reporting */
  private_vulnerability_reporting?: "enabled" | "disabled" | "not_set";
  /** The enforcement status for a security configuration */
  enforcement?: "enforced" | "unenforced";
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<CodeSecurityConfiguration>
```

<sub>`POST /enterprises/{enterprise}/code-security/configurations` · `code-security/create-configuration-for-enterprise`</sub>

## `github.codeSecurity.deleteConfigurationForEnterprise`

Delete a code security configuration for an enterprise — [API reference](https://docs.github.com/rest/code-security/configurations#delete-a-code-security-configuration-for-an-enterprise)

```ts
github.codeSecurity.deleteConfigurationForEnterprise(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /enterprises/{enterprise}/code-security/configurations/{configuration_id}` · `code-security/delete-configuration-for-enterprise`</sub>

## `github.codeSecurity.getSingleConfigurationForEnterprise`

Retrieve a code security configuration of an enterprise — [API reference](https://docs.github.com/rest/code-security/configurations#retrieve-a-code-security-configuration-of-an-enterprise)

```ts
github.codeSecurity.getSingleConfigurationForEnterprise(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
}): Promise<CodeSecurityConfiguration>
```

<sub>`GET /enterprises/{enterprise}/code-security/configurations/{configuration_id}` · `code-security/get-single-configuration-for-enterprise`</sub>

## `github.codeSecurity.updateEnterpriseConfiguration`

Update a custom code security configuration for an enterprise — [API reference](https://docs.github.com/rest/code-security/configurations#update-a-custom-code-security-configuration-for-an-enterprise)

```ts
github.codeSecurity.updateEnterpriseConfiguration(input: {
  /** The name of the code security configuration. Must be unique across the enterprise. */
  name?: string;
  /** A description of the code security configuration */
  description?: string;
  /** The enablement status of GitHub Advanced Security features. `enabled` will enable both Code Security and Secret Protection features.  > [!WARNING] > `code_security` and `secret_protection` are deprecated values for this field. Prefer the individual `code_security` and `secret_protection` fields to set the status of these features.  */
  advanced_security?: "enabled" | "disabled" | "code_security" | "secret_protection";
  /** The enablement status of GitHub Code Security features. */
  code_security?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Dependency Graph */
  dependency_graph?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Automatic dependency submission */
  dependency_graph_autosubmit_action?: "enabled" | "disabled" | "not_set";
  /** Feature options for Automatic dependency submission */
  dependency_graph_autosubmit_action_options?: { labeled_runners?: boolean };
  /** The enablement status of Dependabot alerts */
  dependabot_alerts?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Dependabot security updates */
  dependabot_security_updates?: "enabled" | "disabled" | "not_set";
  /** The enablement status of code scanning default setup */
  code_scanning_default_setup?: "enabled" | "disabled" | "not_set";
  code_scanning_default_setup_options?: CodeScanningDefaultSetupOptions;
  code_scanning_options?: CodeScanningOptions;
  /** The enablement status of code scanning delegated alert dismissal */
  code_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
  /** The enablement status of GitHub Secret Protection features. */
  secret_protection?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning */
  secret_scanning?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning push protection */
  secret_scanning_push_protection?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning validity checks */
  secret_scanning_validity_checks?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning non-provider patterns */
  secret_scanning_non_provider_patterns?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Copilot secret scanning */
  secret_scanning_generic_secrets?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning delegated alert dismissal */
  secret_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning extended metadata */
  secret_scanning_extended_metadata?: "enabled" | "disabled" | "not_set";
  /** The enablement status of private vulnerability reporting */
  private_vulnerability_reporting?: "enabled" | "disabled" | "not_set";
  /** The enforcement status for a security configuration */
  enforcement?: "enforced" | "unenforced";
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
}): Promise<CodeSecurityConfiguration>
```

<sub>`PATCH /enterprises/{enterprise}/code-security/configurations/{configuration_id}` · `code-security/update-enterprise-configuration`</sub>

## `github.codeSecurity.attachEnterpriseConfiguration`

Attach an enterprise configuration to repositories — [API reference](https://docs.github.com/rest/code-security/configurations#attach-an-enterprise-configuration-to-repositories)

```ts
github.codeSecurity.attachEnterpriseConfiguration(input: {
  /** The type of repositories to attach the configuration to. */
  scope: "all" | "all_without_configurations";
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
}): Promise<{ [key: string]: unknown }>
```

<sub>`POST /enterprises/{enterprise}/code-security/configurations/{configuration_id}/attach` · `code-security/attach-enterprise-configuration`</sub>

## `github.codeSecurity.setConfigurationAsDefaultForEnterprise`

Set a code security configuration as a default for an enterprise — [API reference](https://docs.github.com/rest/code-security/configurations#set-a-code-security-configuration-as-a-default-for-an-enterprise)

```ts
github.codeSecurity.setConfigurationAsDefaultForEnterprise(input: {
  /** Specify which types of repository this security configuration should be applied to by default. */
  default_for_new_repos?: "all" | "none" | "private_and_internal" | "public";
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
}): Promise<{ default_for_new_repos?: "all" | "none" | "private_and_internal" | "public"; configuration?: CodeSecurityConfiguration }>
```

<sub>`PUT /enterprises/{enterprise}/code-security/configurations/{configuration_id}/defaults` · `code-security/set-configuration-as-default-for-enterprise`</sub>

## `github.codeSecurity.getRepositoriesForEnterpriseConfiguration`

Get repositories associated with an enterprise code security configuration — [API reference](https://docs.github.com/rest/code-security/configurations#get-repositories-associated-with-an-enterprise-code-security-configuration)

```ts
github.codeSecurity.getRepositoriesForEnterpriseConfiguration(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** A comma-separated list of statuses. If specified, only repositories with these attachment statuses will be returned.  Can be: `all`, `attached`, `attaching`, `removed`, `enforced`, `failed`, `updating`, `removed_by_enterprise` */
  status?: string;
}): Promise<(CodeSecurityConfigurationRepositories)[]>
```

<sub>`GET /enterprises/{enterprise}/code-security/configurations/{configuration_id}/repositories` · `code-security/get-repositories-for-enterprise-configuration`</sub>

## `github.codeSecurity.getDefaultConfigurationsForEnterprise`

Get default code security configurations for an enterprise — [API reference](https://docs.github.com/rest/code-security/configurations#get-default-code-security-configurations-for-an-enterprise)

```ts
github.codeSecurity.getDefaultConfigurationsForEnterprise(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<CodeSecurityDefaultConfigurations>
```

<sub>`GET /enterprises/{enterprise}/code-security/configurations/defaults` · `code-security/get-default-configurations-for-enterprise`</sub>

## `github.codeSecurity.getConfigurationsForOrg`

Get code security configurations for an organization — [API reference](https://docs.github.com/rest/code-security/configurations#get-code-security-configurations-for-an-organization)

```ts
github.codeSecurity.getConfigurationsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The target type of the code security configuration */
  target_type?: "global" | "all";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
}): Promise<(CodeSecurityConfiguration)[]>
```

<sub>`GET /orgs/{org}/code-security/configurations` · `code-security/get-configurations-for-org`</sub>

## `github.codeSecurity.createConfiguration`

Create a code security configuration — [API reference](https://docs.github.com/rest/code-security/configurations#create-a-code-security-configuration)

```ts
github.codeSecurity.createConfiguration(input: {
  /** The name of the code security configuration. Must be unique within the organization. */
  name: string;
  /** A description of the code security configuration */
  description?: string;
  /** The enablement status of GitHub Advanced Security features. `enabled` will enable both Code Security and Secret Protection features.  > [!WARNING] > `code_security` and `secret_protection` are deprecated values for this field. Prefer the individual `code_security` and `secret_protection` fields to set the status of these features.  */
  advanced_security?: "enabled" | "disabled" | "code_security" | "secret_protection";
  /** The enablement status of GitHub Code Security features. */
  code_security?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Dependency Graph */
  dependency_graph?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Automatic dependency submission */
  dependency_graph_autosubmit_action?: "enabled" | "disabled" | "not_set";
  /** Feature options for Automatic dependency submission */
  dependency_graph_autosubmit_action_options?: { labeled_runners?: boolean };
  /** The enablement status of Dependabot alerts */
  dependabot_alerts?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Dependabot security updates */
  dependabot_security_updates?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Dependabot delegated alert dismissal. Requires Dependabot alerts to be enabled. */
  dependabot_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
  code_scanning_options?: CodeScanningOptions;
  /** The enablement status of code scanning default setup */
  code_scanning_default_setup?: "enabled" | "disabled" | "not_set";
  code_scanning_default_setup_options?: CodeScanningDefaultSetupOptions;
  /** The enablement status of code scanning delegated alert dismissal */
  code_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
  /** The enablement status of GitHub Secret Protection features. */
  secret_protection?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning */
  secret_scanning?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning push protection */
  secret_scanning_push_protection?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning delegated bypass */
  secret_scanning_delegated_bypass?: "enabled" | "disabled" | "not_set";
  /** Feature options for secret scanning delegated bypass */
  secret_scanning_delegated_bypass_options?: { reviewers?: ({ reviewer_id: number; reviewer_type: "TEAM" | "ROLE"; mode?: "ALWAYS" | "EXEMPT" })[] };
  /** The enablement status of secret scanning validity checks */
  secret_scanning_validity_checks?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning non provider patterns */
  secret_scanning_non_provider_patterns?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Copilot secret scanning */
  secret_scanning_generic_secrets?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning delegated alert dismissal */
  secret_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning extended metadata */
  secret_scanning_extended_metadata?: "enabled" | "disabled" | "not_set";
  /** The enablement status of private vulnerability reporting */
  private_vulnerability_reporting?: "enabled" | "disabled" | "not_set";
  /** The enforcement status for a security configuration */
  enforcement?: "enforced" | "unenforced";
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<CodeSecurityConfiguration>
```

<sub>`POST /orgs/{org}/code-security/configurations` · `code-security/create-configuration`</sub>

## `github.codeSecurity.deleteConfiguration`

Delete a code security configuration — [API reference](https://docs.github.com/rest/code-security/configurations#delete-a-code-security-configuration)

```ts
github.codeSecurity.deleteConfiguration(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/code-security/configurations/{configuration_id}` · `code-security/delete-configuration`</sub>

## `github.codeSecurity.getConfiguration`

Get a code security configuration — [API reference](https://docs.github.com/rest/code-security/configurations#get-a-code-security-configuration)

```ts
github.codeSecurity.getConfiguration(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
}): Promise<CodeSecurityConfiguration>
```

<sub>`GET /orgs/{org}/code-security/configurations/{configuration_id}` · `code-security/get-configuration`</sub>

## `github.codeSecurity.updateConfiguration`

Update a code security configuration — [API reference](https://docs.github.com/rest/code-security/configurations#update-a-code-security-configuration)

```ts
github.codeSecurity.updateConfiguration(input: {
  /** The name of the code security configuration. Must be unique within the organization. */
  name?: string;
  /** A description of the code security configuration */
  description?: string;
  /** The enablement status of GitHub Advanced Security features. `enabled` will enable both Code Security and Secret Protection features.  > [!WARNING] > `code_security` and `secret_protection` are deprecated values for this field. Prefer the individual `code_security` and `secret_protection` fields to set the status of these features.  */
  advanced_security?: "enabled" | "disabled" | "code_security" | "secret_protection";
  /** The enablement status of GitHub Code Security features. */
  code_security?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Dependency Graph */
  dependency_graph?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Automatic dependency submission */
  dependency_graph_autosubmit_action?: "enabled" | "disabled" | "not_set";
  /** Feature options for Automatic dependency submission */
  dependency_graph_autosubmit_action_options?: { labeled_runners?: boolean };
  /** The enablement status of Dependabot alerts */
  dependabot_alerts?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Dependabot security updates */
  dependabot_security_updates?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Dependabot delegated alert dismissal. Requires Dependabot alerts to be enabled. */
  dependabot_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
  /** The enablement status of code scanning default setup */
  code_scanning_default_setup?: "enabled" | "disabled" | "not_set";
  code_scanning_default_setup_options?: CodeScanningDefaultSetupOptions;
  code_scanning_options?: CodeScanningOptions;
  /** The enablement status of code scanning delegated alert dismissal */
  code_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
  /** The enablement status of GitHub Secret Protection features. */
  secret_protection?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning */
  secret_scanning?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning push protection */
  secret_scanning_push_protection?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning delegated bypass */
  secret_scanning_delegated_bypass?: "enabled" | "disabled" | "not_set";
  /** Feature options for secret scanning delegated bypass */
  secret_scanning_delegated_bypass_options?: { reviewers?: ({ reviewer_id: number; reviewer_type: "TEAM" | "ROLE"; mode?: "ALWAYS" | "EXEMPT" })[] };
  /** The enablement status of secret scanning validity checks */
  secret_scanning_validity_checks?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning non-provider patterns */
  secret_scanning_non_provider_patterns?: "enabled" | "disabled" | "not_set";
  /** The enablement status of Copilot secret scanning */
  secret_scanning_generic_secrets?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning delegated alert dismissal */
  secret_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
  /** The enablement status of secret scanning extended metadata */
  secret_scanning_extended_metadata?: "enabled" | "disabled" | "not_set";
  /** The enablement status of private vulnerability reporting */
  private_vulnerability_reporting?: "enabled" | "disabled" | "not_set";
  /** The enforcement status for a security configuration */
  enforcement?: "enforced" | "unenforced";
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
}): Promise<CodeSecurityConfiguration>
```

<sub>`PATCH /orgs/{org}/code-security/configurations/{configuration_id}` · `code-security/update-configuration`</sub>

## `github.codeSecurity.attachConfiguration`

Attach a configuration to repositories — [API reference](https://docs.github.com/rest/code-security/configurations#attach-a-configuration-to-repositories)

```ts
github.codeSecurity.attachConfiguration(input: {
  /** The type of repositories to attach the configuration to. `selected` means the configuration will be attached to only the repositories specified by `selected_repository_ids` */
  scope: "all" | "all_without_configurations" | "public" | "private_or_internal" | "selected";
  /** An array of repository IDs to attach the configuration to. You can only provide a list of repository ids when the `scope` is set to `selected`. */
  selected_repository_ids?: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
}): Promise<{ [key: string]: unknown }>
```

<sub>`POST /orgs/{org}/code-security/configurations/{configuration_id}/attach` · `code-security/attach-configuration`</sub>

## `github.codeSecurity.setConfigurationAsDefault`

Set a code security configuration as a default for an organization — [API reference](https://docs.github.com/rest/code-security/configurations#set-a-code-security-configuration-as-a-default-for-an-organization)

```ts
github.codeSecurity.setConfigurationAsDefault(input: {
  /** Specify which types of repository this security configuration should be applied to by default. */
  default_for_new_repos?: "all" | "none" | "private_and_internal" | "public";
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
}): Promise<{ default_for_new_repos?: "all" | "none" | "private_and_internal" | "public"; configuration?: CodeSecurityConfiguration }>
```

<sub>`PUT /orgs/{org}/code-security/configurations/{configuration_id}/defaults` · `code-security/set-configuration-as-default`</sub>

## `github.codeSecurity.getRepositoriesForConfiguration`

Get repositories associated with a code security configuration — [API reference](https://docs.github.com/rest/code-security/configurations#get-repositories-associated-with-a-code-security-configuration)

```ts
github.codeSecurity.getRepositoriesForConfiguration(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the code security configuration. */
  configuration_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** A comma-separated list of statuses. If specified, only repositories with these attachment statuses will be returned.  Can be: `all`, `attached`, `attaching`, `detached`, `removed`, `enforced`, `failed`, `updating`, `removed_by_enterprise` */
  status?: string;
}): Promise<(CodeSecurityConfigurationRepositories)[]>
```

<sub>`GET /orgs/{org}/code-security/configurations/{configuration_id}/repositories` · `code-security/get-repositories-for-configuration`</sub>

## `github.codeSecurity.getDefaultConfigurations`

Get default code security configurations — [API reference](https://docs.github.com/rest/code-security/configurations#get-default-code-security-configurations)

```ts
github.codeSecurity.getDefaultConfigurations(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<CodeSecurityDefaultConfigurations>
```

<sub>`GET /orgs/{org}/code-security/configurations/defaults` · `code-security/get-default-configurations`</sub>

## `github.codeSecurity.detachConfiguration`

Detach configurations from repositories — [API reference](https://docs.github.com/rest/code-security/configurations#detach-configurations-from-repositories)

```ts
github.codeSecurity.detachConfiguration(input: {
  /** An array of repository IDs to detach from configurations. Up to 250 IDs can be provided. */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/code-security/configurations/detach` · `code-security/detach-configuration`</sub>

## `github.codeSecurity.getConfigurationForRepository`

Get the code security configuration associated with a repository — [API reference](https://docs.github.com/rest/code-security/configurations#get-the-code-security-configuration-associated-with-a-repository)

```ts
github.codeSecurity.getConfigurationForRepository(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<CodeSecurityConfigurationForRepository>
```

<sub>`GET /repos/{owner}/{repo}/code-security-configuration` · `code-security/get-configuration-for-repository`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
