# Hosted Compute

6 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.hostedCompute.listNetworkConfigurationsForOrg`

List hosted compute network configurations for an organization — [API reference](https://docs.github.com/rest/orgs/network-configurations#list-hosted-compute-network-configurations-for-an-organization)

```ts
github.hostedCompute.listNetworkConfigurationsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; network_configurations: (NetworkConfiguration)[] }>
```

<sub>`GET /orgs/{org}/settings/network-configurations` · `hosted-compute/list-network-configurations-for-org`</sub>

## `github.hostedCompute.createNetworkConfigurationForOrg`

Create a hosted compute network configuration for an organization — [API reference](https://docs.github.com/rest/orgs/network-configurations#create-a-hosted-compute-network-configuration-for-an-organization)

```ts
github.hostedCompute.createNetworkConfigurationForOrg(input: {
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
}): Promise<NetworkConfiguration>
```

<sub>`POST /orgs/{org}/settings/network-configurations` · `hosted-compute/create-network-configuration-for-org`</sub>

## `github.hostedCompute.deleteNetworkConfigurationFromOrg`

Delete a hosted compute network configuration from an organization — [API reference](https://docs.github.com/rest/orgs/network-configurations#delete-a-hosted-compute-network-configuration-from-an-organization)

```ts
github.hostedCompute.deleteNetworkConfigurationFromOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the hosted compute network configuration. */
  network_configuration_id: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/settings/network-configurations/{network_configuration_id}` · `hosted-compute/delete-network-configuration-from-org`</sub>

## `github.hostedCompute.getNetworkConfigurationForOrg`

Get a hosted compute network configuration for an organization — [API reference](https://docs.github.com/rest/orgs/network-configurations#get-a-hosted-compute-network-configuration-for-an-organization)

```ts
github.hostedCompute.getNetworkConfigurationForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the hosted compute network configuration. */
  network_configuration_id: string;
}): Promise<NetworkConfiguration>
```

<sub>`GET /orgs/{org}/settings/network-configurations/{network_configuration_id}` · `hosted-compute/get-network-configuration-for-org`</sub>

## `github.hostedCompute.updateNetworkConfigurationForOrg`

Update a hosted compute network configuration for an organization — [API reference](https://docs.github.com/rest/orgs/network-configurations#update-a-hosted-compute-network-configuration-for-an-organization)

```ts
github.hostedCompute.updateNetworkConfigurationForOrg(input: {
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
}): Promise<NetworkConfiguration>
```

<sub>`PATCH /orgs/{org}/settings/network-configurations/{network_configuration_id}` · `hosted-compute/update-network-configuration-for-org`</sub>

## `github.hostedCompute.getNetworkSettingsForOrg`

Get a hosted compute network settings resource for an organization — [API reference](https://docs.github.com/rest/orgs/network-configurations#get-a-hosted-compute-network-settings-resource-for-an-organization)

```ts
github.hostedCompute.getNetworkSettingsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the hosted compute network settings. */
  network_settings_id: string;
}): Promise<NetworkSettings>
```

<sub>`GET /orgs/{org}/settings/network-settings/{network_settings_id}` · `hosted-compute/get-network-settings-for-org`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
