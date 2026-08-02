import type { BasicError, CodeScanningDefaultSetupOptions, CodeScanningOptions, CodeSecurityConfiguration, CodeSecurityConfigurationForRepository, CodeSecurityConfigurationRepositories, CodeSecurityDefaultConfigurations } from "./schemas.js";

export type CodeSecurityOperations = {
  /**
   * Get code security configurations for an enterprise
   * @see https://docs.github.com/rest/code-security/configurations#get-code-security-configurations-for-an-enterprise
   */
  getConfigurationsForEnterprise: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
  }) => Promise<(CodeSecurityConfiguration)[]>;

  /**
   * Create a code security configuration for an enterprise
   * @see https://docs.github.com/rest/code-security/configurations#create-a-code-security-configuration-for-an-enterprise
   */
  createConfigurationForEnterprise: (input: {
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
  }) => Promise<CodeSecurityConfiguration>;

  /**
   * Get default code security configurations for an enterprise
   * @see https://docs.github.com/rest/code-security/configurations#get-default-code-security-configurations-for-an-enterprise
   */
  getDefaultConfigurationsForEnterprise: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<CodeSecurityDefaultConfigurations>;

  /**
   * Retrieve a code security configuration of an enterprise
   * @see https://docs.github.com/rest/code-security/configurations#retrieve-a-code-security-configuration-of-an-enterprise
   */
  getSingleConfigurationForEnterprise: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The unique identifier of the code security configuration. */
    configuration_id: number;
  }) => Promise<CodeSecurityConfiguration>;

  /**
   * Update a custom code security configuration for an enterprise
   * @see https://docs.github.com/rest/code-security/configurations#update-a-custom-code-security-configuration-for-an-enterprise
   */
  updateEnterpriseConfiguration: (input: {
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
  }) => Promise<CodeSecurityConfiguration>;

  /**
   * Delete a code security configuration for an enterprise
   * @see https://docs.github.com/rest/code-security/configurations#delete-a-code-security-configuration-for-an-enterprise
   */
  deleteConfigurationForEnterprise: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The unique identifier of the code security configuration. */
    configuration_id: number;
  }) => Promise<BasicError>;

  /**
   * Attach an enterprise configuration to repositories
   * @see https://docs.github.com/rest/code-security/configurations#attach-an-enterprise-configuration-to-repositories
   */
  attachEnterpriseConfiguration: (input: {
    /** The type of repositories to attach the configuration to. */
    scope: "all" | "all_without_configurations";
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The unique identifier of the code security configuration. */
    configuration_id: number;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Set a code security configuration as a default for an enterprise
   * @see https://docs.github.com/rest/code-security/configurations#set-a-code-security-configuration-as-a-default-for-an-enterprise
   */
  setConfigurationAsDefaultForEnterprise: (input: {
    /** Specify which types of repository this security configuration should be applied to by default. */
    default_for_new_repos?: "all" | "none" | "private_and_internal" | "public";
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The unique identifier of the code security configuration. */
    configuration_id: number;
  }) => Promise<{ default_for_new_repos?: "all" | "none" | "private_and_internal" | "public"; configuration?: CodeSecurityConfiguration }>;

  /**
   * Get repositories associated with an enterprise code security configuration
   * @see https://docs.github.com/rest/code-security/configurations#get-repositories-associated-with-an-enterprise-code-security-configuration
   */
  getRepositoriesForEnterpriseConfiguration: (input: {
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
  }) => Promise<(CodeSecurityConfigurationRepositories)[]>;

  /**
   * Get code security configurations for an organization
   * @see https://docs.github.com/rest/code-security/configurations#get-code-security-configurations-for-an-organization
   */
  getConfigurationsForOrg: (input: {
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
  }) => Promise<(CodeSecurityConfiguration)[]>;

  /**
   * Create a code security configuration
   * @see https://docs.github.com/rest/code-security/configurations#create-a-code-security-configuration
   */
  createConfiguration: (input: {
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
  }) => Promise<CodeSecurityConfiguration>;

  /**
   * Get default code security configurations
   * @see https://docs.github.com/rest/code-security/configurations#get-default-code-security-configurations
   */
  getDefaultConfigurations: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<CodeSecurityDefaultConfigurations>;

  /**
   * Detach configurations from repositories
   * @see https://docs.github.com/rest/code-security/configurations#detach-configurations-from-repositories
   */
  detachConfiguration: (input: {
    /** An array of repository IDs to detach from configurations. Up to 250 IDs can be provided. */
    selected_repository_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Get a code security configuration
   * @see https://docs.github.com/rest/code-security/configurations#get-a-code-security-configuration
   */
  getConfiguration: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the code security configuration. */
    configuration_id: number;
  }) => Promise<CodeSecurityConfiguration>;

  /**
   * Update a code security configuration
   * @see https://docs.github.com/rest/code-security/configurations#update-a-code-security-configuration
   */
  updateConfiguration: (input: {
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
  }) => Promise<CodeSecurityConfiguration>;

  /**
   * Delete a code security configuration
   * @see https://docs.github.com/rest/code-security/configurations#delete-a-code-security-configuration
   */
  deleteConfiguration: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the code security configuration. */
    configuration_id: number;
  }) => Promise<BasicError>;

  /**
   * Attach a configuration to repositories
   * @see https://docs.github.com/rest/code-security/configurations#attach-a-configuration-to-repositories
   */
  attachConfiguration: (input: {
    /** The type of repositories to attach the configuration to. `selected` means the configuration will be attached to only the repositories specified by `selected_repository_ids` */
    scope: "all" | "all_without_configurations" | "public" | "private_or_internal" | "selected";
    /** An array of repository IDs to attach the configuration to. You can only provide a list of repository ids when the `scope` is set to `selected`. */
    selected_repository_ids?: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the code security configuration. */
    configuration_id: number;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Set a code security configuration as a default for an organization
   * @see https://docs.github.com/rest/code-security/configurations#set-a-code-security-configuration-as-a-default-for-an-organization
   */
  setConfigurationAsDefault: (input: {
    /** Specify which types of repository this security configuration should be applied to by default. */
    default_for_new_repos?: "all" | "none" | "private_and_internal" | "public";
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the code security configuration. */
    configuration_id: number;
  }) => Promise<{ default_for_new_repos?: "all" | "none" | "private_and_internal" | "public"; configuration?: CodeSecurityConfiguration }>;

  /**
   * Get repositories associated with a code security configuration
   * @see https://docs.github.com/rest/code-security/configurations#get-repositories-associated-with-a-code-security-configuration
   */
  getRepositoriesForConfiguration: (input: {
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
  }) => Promise<(CodeSecurityConfigurationRepositories)[]>;

  /**
   * Get the code security configuration associated with a repository
   * @see https://docs.github.com/rest/code-security/configurations#get-the-code-security-configuration-associated-with-a-repository
   */
  getConfigurationForRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<CodeSecurityConfigurationForRepository>;
};
