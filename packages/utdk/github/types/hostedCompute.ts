import type { NetworkConfiguration, NetworkSettings } from "./schemas.js";

export type HostedComputeOperations = {
  /**
   * List hosted compute network configurations for an organization
   * @see https://docs.github.com/rest/orgs/network-configurations#list-hosted-compute-network-configurations-for-an-organization
   */
  listNetworkConfigurationsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; network_configurations: (NetworkConfiguration)[] }>;

  /**
   * Create a hosted compute network configuration for an organization
   * @see https://docs.github.com/rest/orgs/network-configurations#create-a-hosted-compute-network-configuration-for-an-organization
   */
  createNetworkConfigurationForOrg: (input: {
    /** Name of the network configuration. Must be between 1 and 100 characters and may only contain upper and lowercase letters a-z, numbers 0-9, '.', '-', and '_'. */
    name: string;
    /** The hosted compute service to use for the network configuration. */
    compute_service?: "none" | "actions";
    /** A list of identifiers of the network settings resources to use for the network configuration. Exactly one resource identifier must be specified in the list. */
    network_settings_ids: (string)[];
    /** A list of identifiers of the failover network settings resources to use for the network configuration. Exactly one resource identifier must be specified in the list. */
    failover_network_settings_ids?: (string)[];
    /** Indicates whether the failover network resource is enabled. */
    failover_network_enabled?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<NetworkConfiguration>;

  /**
   * Get a hosted compute network configuration for an organization
   * @see https://docs.github.com/rest/orgs/network-configurations#get-a-hosted-compute-network-configuration-for-an-organization
   */
  getNetworkConfigurationForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the hosted compute network configuration. */
    network_configuration_id: string;
  }) => Promise<NetworkConfiguration>;

  /**
   * Update a hosted compute network configuration for an organization
   * @see https://docs.github.com/rest/orgs/network-configurations#update-a-hosted-compute-network-configuration-for-an-organization
   */
  updateNetworkConfigurationForOrg: (input: {
    /** Name of the network configuration. Must be between 1 and 100 characters and may only contain upper and lowercase letters a-z, numbers 0-9, '.', '-', and '_'. */
    name?: string;
    /** The hosted compute service to use for the network configuration. */
    compute_service?: "none" | "actions";
    /** A list of identifiers of the network settings resources to use for the network configuration. Exactly one resource identifier must be specified in the list. */
    network_settings_ids?: (string)[];
    /** A list of identifiers of the failover network settings resources to use for the network configuration. Exactly one resource identifier must be specified in the list. */
    failover_network_settings_ids?: (string)[];
    /** Indicates whether the failover network resource is enabled. */
    failover_network_enabled?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the hosted compute network configuration. */
    network_configuration_id: string;
  }) => Promise<NetworkConfiguration>;

  /**
   * Delete a hosted compute network configuration from an organization
   * @see https://docs.github.com/rest/orgs/network-configurations#delete-a-hosted-compute-network-configuration-from-an-organization
   */
  deleteNetworkConfigurationFromOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the hosted compute network configuration. */
    network_configuration_id: string;
  }) => Promise<unknown>;

  /**
   * Get a hosted compute network settings resource for an organization
   * @see https://docs.github.com/rest/orgs/network-configurations#get-a-hosted-compute-network-settings-resource-for-an-organization
   */
  getNetworkSettingsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the hosted compute network settings. */
    network_settings_id: string;
  }) => Promise<NetworkSettings>;
};
