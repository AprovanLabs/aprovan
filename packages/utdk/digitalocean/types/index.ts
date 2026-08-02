

export type DigitaloceanClient = {
  getV21Clicks: () => Promise<unknown>;

  postV21ClicksKubernetes: () => Promise<unknown>;

  getV2Account: () => Promise<unknown>;

  getV2AccountKeys: () => Promise<unknown>;

  postV2AccountKeys: () => Promise<unknown>;

  getV2AccountKeysSshKeyIdentifier: () => Promise<unknown>;

  putV2AccountKeysSshKeyIdentifier: () => Promise<unknown>;

  deleteV2AccountKeysSshKeyIdentifier: () => Promise<unknown>;

  getV2Actions: () => Promise<unknown>;

  getV2ActionsActionId: () => Promise<unknown>;

  getV2AddOnsApps: () => Promise<unknown>;

  getV2AddOnsAppsAppSlugMetadata: () => Promise<unknown>;

  getV2AddOnsSaas: () => Promise<unknown>;

  postV2AddOnsSaas: () => Promise<unknown>;

  getV2AddOnsSaasResourceUuid: () => Promise<unknown>;

  deleteV2AddOnsSaasResourceUuid: () => Promise<unknown>;

  patchV2AddOnsSaasResourceUuid: () => Promise<unknown>;

  patchV2AddOnsSaasResourceUuidPlan: () => Promise<unknown>;

  getV2Apps: () => Promise<unknown>;

  postV2Apps: () => Promise<unknown>;

  deleteV2AppsId: () => Promise<unknown>;

  getV2AppsId: () => Promise<unknown>;

  putV2AppsId: () => Promise<unknown>;

  postV2AppsAppIdRestart: () => Promise<unknown>;

  getV2AppsAppIdComponentsComponentNameLogs: () => Promise<unknown>;

  getV2AppsAppIdComponentsComponentNameExec: () => Promise<unknown>;

  getV2AppsAppIdInstances: () => Promise<unknown>;

  getV2AppsAppIdDeployments: () => Promise<unknown>;

  postV2AppsAppIdDeployments: () => Promise<unknown>;

  getV2AppsAppIdDeploymentsDeploymentId: () => Promise<unknown>;

  postV2AppsAppIdDeploymentsDeploymentIdCancel: () => Promise<unknown>;

  getV2AppsAppIdDeploymentsDeploymentIdComponentsComponentNameLogs: () => Promise<unknown>;

  getV2AppsAppIdDeploymentsDeploymentIdLogs: () => Promise<unknown>;

  getV2AppsAppIdDeploymentsDeploymentIdComponentsComponentNameExec: () => Promise<unknown>;

  getV2AppsAppIdLogs: () => Promise<unknown>;

  getV2AppsAppIdJobInvocations: () => Promise<unknown>;

  getV2AppsAppIdJobInvocationsJobInvocationId: () => Promise<unknown>;

  postV2AppsAppIdJobInvocationsJobInvocationIdCancel: () => Promise<unknown>;

  getV2AppsAppIdJobsJobNameInvocationsJobInvocationIdLogs: () => Promise<unknown>;

  getV2AppsAppIdEvents: () => Promise<unknown>;

  getV2AppsAppIdEventsEventId: () => Promise<unknown>;

  postV2AppsAppIdEventsEventIdCancel: () => Promise<unknown>;

  getV2AppsAppIdEventsEventIdLogs: () => Promise<unknown>;

  getV2AppsTiersInstanceSizes: () => Promise<unknown>;

  getV2AppsTiersInstanceSizesSlug: () => Promise<unknown>;

  getV2AppsRegions: () => Promise<unknown>;

  postV2AppsPropose: () => Promise<unknown>;

  getV2AppsAppIdAlerts: () => Promise<unknown>;

  postV2AppsAppIdAlertsAlertIdDestinations: () => Promise<unknown>;

  postV2AppsAppIdRollback: () => Promise<unknown>;

  postV2AppsAppIdRollbackValidate: () => Promise<unknown>;

  postV2AppsAppIdRollbackCommit: () => Promise<unknown>;

  postV2AppsAppIdRollbackRevert: () => Promise<unknown>;

  getV2AppsAppIdMetricsBandwidthDaily: () => Promise<unknown>;

  postV2AppsMetricsBandwidthDaily: () => Promise<unknown>;

  getV2AppsAppIdHealth: () => Promise<unknown>;

  getV2CdnEndpoints: () => Promise<unknown>;

  postV2CdnEndpoints: () => Promise<unknown>;

  getV2CdnEndpointsCdnId: () => Promise<unknown>;

  putV2CdnEndpointsCdnId: () => Promise<unknown>;

  deleteV2CdnEndpointsCdnId: () => Promise<unknown>;

  deleteV2CdnEndpointsCdnIdCache: () => Promise<unknown>;

  getV2Certificates: () => Promise<unknown>;

  postV2Certificates: () => Promise<unknown>;

  getV2CertificatesCertificateId: () => Promise<unknown>;

  deleteV2CertificatesCertificateId: () => Promise<unknown>;

  getV2CustomersMyBalance: () => Promise<unknown>;

  getV2CustomersMyBillingHistory: () => Promise<unknown>;

  getV2CustomersMyInvoices: () => Promise<unknown>;

  getV2CustomersMyInvoicesInvoiceUuid: () => Promise<unknown>;

  getV2CustomersMyInvoicesInvoiceUuidCsv: () => Promise<unknown>;

  getV2CustomersMyInvoicesInvoiceUuidPdf: () => Promise<unknown>;

  getV2CustomersMyInvoicesInvoiceUuidSummary: () => Promise<unknown>;

  getV2BillingAccountUrnInsightsStartDateEndDate: () => Promise<unknown>;

  getV2DatabasesOptions: () => Promise<unknown>;

  getV2Databases: () => Promise<unknown>;

  postV2Databases: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuid: () => Promise<unknown>;

  deleteV2DatabasesDatabaseClusterUuid: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidConfig: () => Promise<unknown>;

  patchV2DatabasesDatabaseClusterUuidConfig: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidCa: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidOnlineMigration: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidOnlineMigration: () => Promise<unknown>;

  deleteV2DatabasesDatabaseClusterUuidOnlineMigrationMigrationId: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidMigrate: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidResize: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidFirewall: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidFirewall: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidMaintenance: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidInstallUpdate: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidBackups: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidReplicas: () => Promise<unknown>;

  postV2DatabasesDatabaseClusterUuidReplicas: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidEvents: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidReplicasReplicaName: () => Promise<unknown>;

  deleteV2DatabasesDatabaseClusterUuidReplicasReplicaName: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidReplicasReplicaNamePromote: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidUsers: () => Promise<unknown>;

  postV2DatabasesDatabaseClusterUuidUsers: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidUsersUsername: () => Promise<unknown>;

  deleteV2DatabasesDatabaseClusterUuidUsersUsername: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidUsersUsername: () => Promise<unknown>;

  postV2DatabasesDatabaseClusterUuidUsersUsernameResetAuth: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidDbs: () => Promise<unknown>;

  postV2DatabasesDatabaseClusterUuidDbs: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidDbsDatabaseName: () => Promise<unknown>;

  deleteV2DatabasesDatabaseClusterUuidDbsDatabaseName: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidPools: () => Promise<unknown>;

  postV2DatabasesDatabaseClusterUuidPools: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidPoolsPoolName: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidPoolsPoolName: () => Promise<unknown>;

  deleteV2DatabasesDatabaseClusterUuidPoolsPoolName: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidEvictionPolicy: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidEvictionPolicy: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidSqlMode: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidSqlMode: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidUpgrade: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidAutoscale: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidAutoscale: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidTopics: () => Promise<unknown>;

  postV2DatabasesDatabaseClusterUuidTopics: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidTopicsTopicName: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidTopicsTopicName: () => Promise<unknown>;

  deleteV2DatabasesDatabaseClusterUuidTopicsTopicName: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidLogsink: () => Promise<unknown>;

  postV2DatabasesDatabaseClusterUuidLogsink: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidLogsinkLogsinkId: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidLogsinkLogsinkId: () => Promise<unknown>;

  deleteV2DatabasesDatabaseClusterUuidLogsinkLogsinkId: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidSchemaRegistry: () => Promise<unknown>;

  postV2DatabasesDatabaseClusterUuidSchemaRegistry: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidSchemaRegistrySubjectName: () => Promise<unknown>;

  deleteV2DatabasesDatabaseClusterUuidSchemaRegistrySubjectName: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidSchemaRegistrySubjectNameVersionsVersion: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidSchemaRegistryConfig: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidSchemaRegistryConfig: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidSchemaRegistryConfigSubjectName: () => Promise<unknown>;

  putV2DatabasesDatabaseClusterUuidSchemaRegistryConfigSubjectName: () => Promise<unknown>;

  getV2DatabasesMetricsCredentials: () => Promise<unknown>;

  putV2DatabasesMetricsCredentials: () => Promise<unknown>;

  getV2DatabasesDatabaseClusterUuidIndexes: () => Promise<unknown>;

  deleteV2DatabasesDatabaseClusterUuidIndexesIndexName: () => Promise<unknown>;

  getV2DedicatedInferencesDedicatedInferenceId: () => Promise<unknown>;

  patchV2DedicatedInferencesDedicatedInferenceId: () => Promise<unknown>;

  deleteV2DedicatedInferencesDedicatedInferenceId: () => Promise<unknown>;

  getV2DedicatedInferences: () => Promise<unknown>;

  postV2DedicatedInferences: () => Promise<unknown>;

  getV2DedicatedInferencesDedicatedInferenceIdAccelerators: () => Promise<unknown>;

  getV2DedicatedInferencesDedicatedInferenceIdAcceleratorsAcceleratorId: () => Promise<unknown>;

  getV2DedicatedInferencesDedicatedInferenceIdCa: () => Promise<unknown>;

  getV2DedicatedInferencesDedicatedInferenceIdTokens: () => Promise<unknown>;

  postV2DedicatedInferencesDedicatedInferenceIdTokens: () => Promise<unknown>;

  deleteV2DedicatedInferencesDedicatedInferenceIdTokensTokenId: () => Promise<unknown>;

  getV2DedicatedInferencesSizes: () => Promise<unknown>;

  getV2DedicatedInferencesGpuModelConfig: () => Promise<unknown>;

  getV2Domains: () => Promise<unknown>;

  postV2Domains: () => Promise<unknown>;

  getV2DomainsDomainName: () => Promise<unknown>;

  deleteV2DomainsDomainName: () => Promise<unknown>;

  getV2DomainsDomainNameRecords: () => Promise<unknown>;

  postV2DomainsDomainNameRecords: () => Promise<unknown>;

  getV2DomainsDomainNameRecordsDomainRecordId: () => Promise<unknown>;

  patchV2DomainsDomainNameRecordsDomainRecordId: () => Promise<unknown>;

  putV2DomainsDomainNameRecordsDomainRecordId: () => Promise<unknown>;

  deleteV2DomainsDomainNameRecordsDomainRecordId: () => Promise<unknown>;

  getV2Droplets: () => Promise<unknown>;

  postV2Droplets: () => Promise<unknown>;

  deleteV2Droplets: () => Promise<unknown>;

  getV2DropletsDropletId: () => Promise<unknown>;

  deleteV2DropletsDropletId: () => Promise<unknown>;

  getV2DropletsDropletIdBackups: () => Promise<unknown>;

  getV2DropletsDropletIdBackupsPolicy: () => Promise<unknown>;

  getV2DropletsBackupsPolicies: () => Promise<unknown>;

  getV2DropletsBackupsSupportedPolicies: () => Promise<unknown>;

  getV2DropletsDropletIdSnapshots: () => Promise<unknown>;

  getV2DropletsDropletIdActions: () => Promise<unknown>;

  postV2DropletsDropletIdActions: () => Promise<unknown>;

  postV2DropletsActions: () => Promise<unknown>;

  getV2DropletsDropletIdActionsActionId: () => Promise<unknown>;

  getV2DropletsDropletIdKernels: () => Promise<unknown>;

  getV2DropletsDropletIdFirewalls: () => Promise<unknown>;

  getV2DropletsDropletIdNeighbors: () => Promise<unknown>;

  getV2DropletsDropletIdDestroyWithAssociatedResources: () => Promise<unknown>;

  deleteV2DropletsDropletIdDestroyWithAssociatedResourcesSelective: () => Promise<unknown>;

  deleteV2DropletsDropletIdDestroyWithAssociatedResourcesDangerous: () => Promise<unknown>;

  getV2DropletsDropletIdDestroyWithAssociatedResourcesStatus: () => Promise<unknown>;

  postV2DropletsDropletIdDestroyWithAssociatedResourcesRetry: () => Promise<unknown>;

  getV2DropletsAutoscale: () => Promise<unknown>;

  postV2DropletsAutoscale: () => Promise<unknown>;

  getV2DropletsAutoscaleAutoscalePoolId: () => Promise<unknown>;

  putV2DropletsAutoscaleAutoscalePoolId: () => Promise<unknown>;

  deleteV2DropletsAutoscaleAutoscalePoolId: () => Promise<unknown>;

  deleteV2DropletsAutoscaleAutoscalePoolIdDangerous: () => Promise<unknown>;

  getV2DropletsAutoscaleAutoscalePoolIdMembers: () => Promise<unknown>;

  getV2DropletsAutoscaleAutoscalePoolIdHistory: () => Promise<unknown>;

  getV2Firewalls: () => Promise<unknown>;

  postV2Firewalls: () => Promise<unknown>;

  getV2FirewallsFirewallId: () => Promise<unknown>;

  putV2FirewallsFirewallId: () => Promise<unknown>;

  deleteV2FirewallsFirewallId: () => Promise<unknown>;

  postV2FirewallsFirewallIdDroplets: () => Promise<unknown>;

  deleteV2FirewallsFirewallIdDroplets: () => Promise<unknown>;

  postV2FirewallsFirewallIdTags: () => Promise<unknown>;

  deleteV2FirewallsFirewallIdTags: () => Promise<unknown>;

  postV2FirewallsFirewallIdRules: () => Promise<unknown>;

  deleteV2FirewallsFirewallIdRules: () => Promise<unknown>;

  getV2FloatingIps: () => Promise<unknown>;

  postV2FloatingIps: () => Promise<unknown>;

  getV2FloatingIpsFloatingIp: () => Promise<unknown>;

  deleteV2FloatingIpsFloatingIp: () => Promise<unknown>;

  getV2FloatingIpsFloatingIpActions: () => Promise<unknown>;

  postV2FloatingIpsFloatingIpActions: () => Promise<unknown>;

  getV2FloatingIpsFloatingIpActionsActionId: () => Promise<unknown>;

  getV2FunctionsNamespaces: () => Promise<unknown>;

  postV2FunctionsNamespaces: () => Promise<unknown>;

  getV2FunctionsNamespacesNamespaceId: () => Promise<unknown>;

  deleteV2FunctionsNamespacesNamespaceId: () => Promise<unknown>;

  getV2FunctionsNamespacesNamespaceIdTriggers: () => Promise<unknown>;

  postV2FunctionsNamespacesNamespaceIdTriggers: () => Promise<unknown>;

  getV2FunctionsNamespacesNamespaceIdTriggersTriggerName: () => Promise<unknown>;

  putV2FunctionsNamespacesNamespaceIdTriggersTriggerName: () => Promise<unknown>;

  deleteV2FunctionsNamespacesNamespaceIdTriggersTriggerName: () => Promise<unknown>;

  getV2FunctionsNamespacesNamespaceIdKeys: () => Promise<unknown>;

  postV2FunctionsNamespacesNamespaceIdKeys: () => Promise<unknown>;

  putV2FunctionsNamespacesNamespaceIdKeysKeyId: () => Promise<unknown>;

  deleteV2FunctionsNamespacesNamespaceIdKeysKeyId: () => Promise<unknown>;

  getV2Images: () => Promise<unknown>;

  postV2Images: () => Promise<unknown>;

  getV2ImagesImageId: () => Promise<unknown>;

  putV2ImagesImageId: () => Promise<unknown>;

  deleteV2ImagesImageId: () => Promise<unknown>;

  postV2ImagesImageIdAccountTransfer: () => Promise<unknown>;

  postV2ImagesImageIdAccountTransferAccept: () => Promise<unknown>;

  postV2ImagesImageIdAccountTransferCancel: () => Promise<unknown>;

  postV2ImagesImageIdAccountTransferDecline: () => Promise<unknown>;

  getV2ImagesImageIdActions: () => Promise<unknown>;

  postV2ImagesImageIdActions: () => Promise<unknown>;

  getV2ImagesImageIdActionsActionId: () => Promise<unknown>;

  getV2KubernetesClusters: () => Promise<unknown>;

  postV2KubernetesClusters: () => Promise<unknown>;

  getV2KubernetesClustersClusterId: () => Promise<unknown>;

  putV2KubernetesClustersClusterId: () => Promise<unknown>;

  deleteV2KubernetesClustersClusterId: () => Promise<unknown>;

  getV2KubernetesClustersClusterIdDestroyWithAssociatedResources: () => Promise<unknown>;

  deleteV2KubernetesClustersClusterIdDestroyWithAssociatedResourcesSelective: () => Promise<unknown>;

  deleteV2KubernetesClustersClusterIdDestroyWithAssociatedResourcesDangerous: () => Promise<unknown>;

  getV2KubernetesClustersClusterIdKubeconfig: () => Promise<unknown>;

  getV2KubernetesClustersClusterIdCredentials: () => Promise<unknown>;

  getV2KubernetesClustersClusterIdUpgrades: () => Promise<unknown>;

  postV2KubernetesClustersClusterIdUpgrade: () => Promise<unknown>;

  getV2KubernetesClustersClusterIdNodePools: () => Promise<unknown>;

  postV2KubernetesClustersClusterIdNodePools: () => Promise<unknown>;

  getV2KubernetesClustersClusterIdNodePoolsNodePoolId: () => Promise<unknown>;

  putV2KubernetesClustersClusterIdNodePoolsNodePoolId: () => Promise<unknown>;

  deleteV2KubernetesClustersClusterIdNodePoolsNodePoolId: () => Promise<unknown>;

  deleteV2KubernetesClustersClusterIdNodePoolsNodePoolIdNodesNodeId: () => Promise<unknown>;

  postV2KubernetesClustersClusterIdNodePoolsNodePoolIdRecycle: () => Promise<unknown>;

  getV2KubernetesClustersClusterIdUser: () => Promise<unknown>;

  getV2KubernetesOptions: () => Promise<unknown>;

  postV2KubernetesClustersClusterIdClusterlint: () => Promise<unknown>;

  getV2KubernetesClustersClusterIdClusterlint: () => Promise<unknown>;

  postV2KubernetesRegistry: () => Promise<unknown>;

  deleteV2KubernetesRegistry: () => Promise<unknown>;

  postV2KubernetesRegistries: () => Promise<unknown>;

  deleteV2KubernetesRegistries: () => Promise<unknown>;

  getV2KubernetesClustersClusterIdStatusMessages: () => Promise<unknown>;

  postV2LoadBalancers: () => Promise<unknown>;

  getV2LoadBalancers: () => Promise<unknown>;

  getV2LoadBalancersLbId: () => Promise<unknown>;

  putV2LoadBalancersLbId: () => Promise<unknown>;

  deleteV2LoadBalancersLbId: () => Promise<unknown>;

  deleteV2LoadBalancersLbIdCache: () => Promise<unknown>;

  postV2LoadBalancersLbIdDroplets: () => Promise<unknown>;

  deleteV2LoadBalancersLbIdDroplets: () => Promise<unknown>;

  postV2LoadBalancersLbIdForwardingRules: () => Promise<unknown>;

  deleteV2LoadBalancersLbIdForwardingRules: () => Promise<unknown>;

  getV2MonitoringAlerts: () => Promise<unknown>;

  postV2MonitoringAlerts: () => Promise<unknown>;

  getV2MonitoringAlertsAlertUuid: () => Promise<unknown>;

  putV2MonitoringAlertsAlertUuid: () => Promise<unknown>;

  deleteV2MonitoringAlertsAlertUuid: () => Promise<unknown>;

  getV2MonitoringMetricsDropletBandwidth: () => Promise<unknown>;

  getV2MonitoringMetricsDropletCpu: () => Promise<unknown>;

  getV2MonitoringMetricsDropletFilesystemFree: () => Promise<unknown>;

  getV2MonitoringMetricsDropletFilesystemSize: () => Promise<unknown>;

  getV2MonitoringMetricsDropletLoad1: () => Promise<unknown>;

  getV2MonitoringMetricsDropletLoad5: () => Promise<unknown>;

  getV2MonitoringMetricsDropletLoad15: () => Promise<unknown>;

  getV2MonitoringMetricsDropletMemoryCached: () => Promise<unknown>;

  getV2MonitoringMetricsDropletMemoryFree: () => Promise<unknown>;

  getV2MonitoringMetricsDropletMemoryTotal: () => Promise<unknown>;

  getV2MonitoringMetricsDropletMemoryAvailable: () => Promise<unknown>;

  getV2MonitoringMetricsAppsMemoryPercentage: () => Promise<unknown>;

  getV2MonitoringMetricsAppsCpuPercentage: () => Promise<unknown>;

  getV2MonitoringMetricsAppsRestartCount: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendConnectionsCurrent: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendConnectionsLimit: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendCpuUtilization: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendFirewallDroppedBytes: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendFirewallDroppedPackets: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendHttpResponses: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendHttpRequestsPerSecond: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendNetworkThroughputHttp: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendNetworkThroughputUdp: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendNetworkThroughputTcp: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendNlbTcpNetworkThroughput: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendNlbUdpNetworkThroughput: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendTlsConnectionsCurrent: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendTlsConnectionsLimit: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerFrontendTlsConnectionsExceedingRateLimit: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsHttpSessionDurationAvg: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsHttpSessionDuration50P: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsHttpSessionDuration95P: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsHttpResponseTimeAvg: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsHttpResponseTime50P: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsHttpResponseTime95P: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsHttpResponseTime99P: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsQueueSize: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsHttpResponses: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsConnections: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsHealthChecks: () => Promise<unknown>;

  getV2MonitoringMetricsLoadBalancerDropletsDowntime: () => Promise<unknown>;

  getV2MonitoringMetricsDropletAutoscaleCurrentInstances: () => Promise<unknown>;

  getV2MonitoringMetricsDropletAutoscaleTargetInstances: () => Promise<unknown>;

  getV2MonitoringMetricsDropletAutoscaleCurrentCpuUtilization: () => Promise<unknown>;

  getV2MonitoringMetricsDropletAutoscaleTargetCpuUtilization: () => Promise<unknown>;

  getV2MonitoringMetricsDropletAutoscaleCurrentMemoryUtilization: () => Promise<unknown>;

  getV2MonitoringMetricsDropletAutoscaleTargetMemoryUtilization: () => Promise<unknown>;

  getV2MonitoringMetricsDatabaseMysqlCpuUsage: () => Promise<unknown>;

  getV2MonitoringMetricsDatabaseMysqlLoad: () => Promise<unknown>;

  getV2MonitoringMetricsDatabaseMysqlMemoryUsage: () => Promise<unknown>;

  getV2MonitoringMetricsDatabaseMysqlDiskUsage: () => Promise<unknown>;

  getV2MonitoringMetricsDatabaseMysqlThreadsConnected: () => Promise<unknown>;

  getV2MonitoringMetricsDatabaseMysqlThreadsCreatedRate: () => Promise<unknown>;

  getV2MonitoringMetricsDatabaseMysqlThreadsActive: () => Promise<unknown>;

  getV2MonitoringMetricsDatabaseMysqlIndexVsSequentialReads: () => Promise<unknown>;

  getV2MonitoringMetricsDatabaseMysqlOpRates: () => Promise<unknown>;

  getV2MonitoringMetricsDatabaseMysqlSchemaThroughput: () => Promise<unknown>;

  getV2MonitoringMetricsDatabaseMysqlSchemaLatency: () => Promise<unknown>;

  postV2MonitoringSinksDestinations: () => Promise<unknown>;

  getV2MonitoringSinksDestinations: () => Promise<unknown>;

  getV2MonitoringSinksDestinationsDestinationUuid: () => Promise<unknown>;

  postV2MonitoringSinksDestinationsDestinationUuid: () => Promise<unknown>;

  deleteV2MonitoringSinksDestinationsDestinationUuid: () => Promise<unknown>;

  postV2MonitoringSinks: () => Promise<unknown>;

  getV2MonitoringSinks: () => Promise<unknown>;

  getV2MonitoringSinksSinkUuid: () => Promise<unknown>;

  deleteV2MonitoringSinksSinkUuid: () => Promise<unknown>;

  postV2Nfs: () => Promise<unknown>;

  getV2Nfs: () => Promise<unknown>;

  getV2NfsNfsId: () => Promise<unknown>;

  deleteV2NfsNfsId: () => Promise<unknown>;

  postV2NfsNfsIdActions: () => Promise<unknown>;

  getV2NfsSnapshots: () => Promise<unknown>;

  getV2NfsSnapshotsNfsSnapshotId: () => Promise<unknown>;

  deleteV2NfsSnapshotsNfsSnapshotId: () => Promise<unknown>;

  getV2PartnerNetworkConnectAttachments: () => Promise<unknown>;

  postV2PartnerNetworkConnectAttachments: () => Promise<unknown>;

  getV2PartnerNetworkConnectAttachmentsPaId: () => Promise<unknown>;

  patchV2PartnerNetworkConnectAttachmentsPaId: () => Promise<unknown>;

  deleteV2PartnerNetworkConnectAttachmentsPaId: () => Promise<unknown>;

  getV2PartnerNetworkConnectAttachmentsPaIdBgpAuthKey: () => Promise<unknown>;

  getV2PartnerNetworkConnectAttachmentsPaIdRemoteRoutes: () => Promise<unknown>;

  getV2PartnerNetworkConnectAttachmentsPaIdServiceKey: () => Promise<unknown>;

  postV2PartnerNetworkConnectAttachmentsPaIdServiceKey: () => Promise<unknown>;

  getV2Projects: () => Promise<unknown>;

  postV2Projects: () => Promise<unknown>;

  getV2ProjectsDefault: () => Promise<unknown>;

  putV2ProjectsDefault: () => Promise<unknown>;

  patchV2ProjectsDefault: () => Promise<unknown>;

  getV2ProjectsProjectId: () => Promise<unknown>;

  putV2ProjectsProjectId: () => Promise<unknown>;

  patchV2ProjectsProjectId: () => Promise<unknown>;

  deleteV2ProjectsProjectId: () => Promise<unknown>;

  getV2ProjectsProjectIdResources: () => Promise<unknown>;

  postV2ProjectsProjectIdResources: () => Promise<unknown>;

  getV2ProjectsDefaultResources: () => Promise<unknown>;

  postV2ProjectsDefaultResources: () => Promise<unknown>;

  getV2Regions: () => Promise<unknown>;

  getV2Registries: () => Promise<unknown>;

  postV2Registries: () => Promise<unknown>;

  getV2RegistriesRegistryName: () => Promise<unknown>;

  deleteV2RegistriesRegistryName: () => Promise<unknown>;

  getV2RegistriesRegistryNameDockerCredentials: () => Promise<unknown>;

  getV2RegistriesSubscription: () => Promise<unknown>;

  postV2RegistriesSubscription: () => Promise<unknown>;

  getV2RegistriesOptions: () => Promise<unknown>;

  getV2RegistriesRegistryNameGarbageCollection: () => Promise<unknown>;

  postV2RegistriesRegistryNameGarbageCollection: () => Promise<unknown>;

  getV2RegistriesRegistryNameGarbageCollections: () => Promise<unknown>;

  putV2RegistriesRegistryNameGarbageCollectionGarbageCollectionUuid: () => Promise<unknown>;

  getV2RegistriesRegistryNameRepositoriesv2: () => Promise<unknown>;

  deleteV2RegistriesRegistryNameRepositoriesRepositoryName: () => Promise<unknown>;

  getV2RegistriesRegistryNameRepositoriesRepositoryNameTags: () => Promise<unknown>;

  deleteV2RegistriesRegistryNameRepositoriesRepositoryNameTagsRepositoryTag: () => Promise<unknown>;

  getV2RegistriesRegistryNameRepositoriesRepositoryNameDigests: () => Promise<unknown>;

  deleteV2RegistriesRegistryNameRepositoriesRepositoryNameDigestsManifestDigest: () => Promise<unknown>;

  postV2RegistriesValidateName: () => Promise<unknown>;

  getV2Registry: () => Promise<unknown>;

  postV2Registry: () => Promise<unknown>;

  deleteV2Registry: () => Promise<unknown>;

  getV2RegistrySubscription: () => Promise<unknown>;

  postV2RegistrySubscription: () => Promise<unknown>;

  getV2RegistryDockerCredentials: () => Promise<unknown>;

  postV2RegistryValidateName: () => Promise<unknown>;

  getV2RegistryRegistryNameRepositories: () => Promise<unknown>;

  getV2RegistryRegistryNameRepositoriesv2: () => Promise<unknown>;

  getV2RegistryRegistryNameRepositoriesRepositoryNameTags: () => Promise<unknown>;

  deleteV2RegistryRegistryNameRepositoriesRepositoryNameTagsRepositoryTag: () => Promise<unknown>;

  getV2RegistryRegistryNameRepositoriesRepositoryNameDigests: () => Promise<unknown>;

  deleteV2RegistryRegistryNameRepositoriesRepositoryNameDigestsManifestDigest: () => Promise<unknown>;

  postV2RegistryRegistryNameGarbageCollection: () => Promise<unknown>;

  getV2RegistryRegistryNameGarbageCollection: () => Promise<unknown>;

  getV2RegistryRegistryNameGarbageCollections: () => Promise<unknown>;

  putV2RegistryRegistryNameGarbageCollectionGarbageCollectionUuid: () => Promise<unknown>;

  getV2RegistryOptions: () => Promise<unknown>;

  getV2ReportsDropletNeighborsIds: () => Promise<unknown>;

  getV2ReservedIps: () => Promise<unknown>;

  postV2ReservedIps: () => Promise<unknown>;

  getV2ReservedIpsReservedIp: () => Promise<unknown>;

  deleteV2ReservedIpsReservedIp: () => Promise<unknown>;

  getV2ReservedIpsReservedIpActions: () => Promise<unknown>;

  postV2ReservedIpsReservedIpActions: () => Promise<unknown>;

  getV2ReservedIpsReservedIpActionsActionId: () => Promise<unknown>;

  getV2ReservedIpv6: () => Promise<unknown>;

  postV2ReservedIpv6: () => Promise<unknown>;

  getV2ReservedIpv6ReservedIpv6: () => Promise<unknown>;

  deleteV2ReservedIpv6ReservedIpv6: () => Promise<unknown>;

  postV2ReservedIpv6ReservedIpv6Actions: () => Promise<unknown>;

  postV2ByoipPrefixes: () => Promise<unknown>;

  getV2ByoipPrefixes: () => Promise<unknown>;

  getV2ByoipPrefixesByoipPrefixUuid: () => Promise<unknown>;

  deleteV2ByoipPrefixesByoipPrefixUuid: () => Promise<unknown>;

  patchV2ByoipPrefixesByoipPrefixUuid: () => Promise<unknown>;

  getV2ByoipPrefixesByoipPrefixUuidIps: () => Promise<unknown>;

  getV2SecurityScans: () => Promise<unknown>;

  postV2SecurityScans: () => Promise<unknown>;

  getV2SecurityScansScanId: () => Promise<unknown>;

  getV2SecurityScansLatest: () => Promise<unknown>;

  postV2SecurityScansRules: () => Promise<unknown>;

  getV2SecurityScansScanIdFindingsFindingUuidAffectedResources: () => Promise<unknown>;

  getV2SecuritySettings: () => Promise<unknown>;

  putV2SecuritySettingsPlan: () => Promise<unknown>;

  postV2SecuritySettingsSuppressions: () => Promise<unknown>;

  deleteV2SecuritySettingsSuppressionsSuppressionUuid: () => Promise<unknown>;

  getV2Sizes: () => Promise<unknown>;

  getV2Snapshots: () => Promise<unknown>;

  getV2SnapshotsSnapshotId: () => Promise<unknown>;

  deleteV2SnapshotsSnapshotId: () => Promise<unknown>;

  getV2SpacesKeys: () => Promise<unknown>;

  postV2SpacesKeys: () => Promise<unknown>;

  getV2SpacesKeysAccessKey: () => Promise<unknown>;

  deleteV2SpacesKeysAccessKey: () => Promise<unknown>;

  putV2SpacesKeysAccessKey: () => Promise<unknown>;

  patchV2SpacesKeysAccessKey: () => Promise<unknown>;

  getV2Tags: () => Promise<unknown>;

  postV2Tags: () => Promise<unknown>;

  getV2TagsTagId: () => Promise<unknown>;

  deleteV2TagsTagId: () => Promise<unknown>;

  postV2TagsTagIdResources: () => Promise<unknown>;

  deleteV2TagsTagIdResources: () => Promise<unknown>;

  getV2Volumes: () => Promise<unknown>;

  postV2Volumes: () => Promise<unknown>;

  deleteV2Volumes: () => Promise<unknown>;

  postV2VolumesActions: () => Promise<unknown>;

  getV2VolumesSnapshotsSnapshotId: () => Promise<unknown>;

  deleteV2VolumesSnapshotsSnapshotId: () => Promise<unknown>;

  getV2VolumesVolumeId: () => Promise<unknown>;

  deleteV2VolumesVolumeId: () => Promise<unknown>;

  getV2VolumesVolumeIdActions: () => Promise<unknown>;

  postV2VolumesVolumeIdActions: () => Promise<unknown>;

  getV2VolumesVolumeIdActionsActionId: () => Promise<unknown>;

  getV2VolumesVolumeIdSnapshots: () => Promise<unknown>;

  postV2VolumesVolumeIdSnapshots: () => Promise<unknown>;

  getV2Vpcs: () => Promise<unknown>;

  postV2Vpcs: () => Promise<unknown>;

  getV2VpcsVpcId: () => Promise<unknown>;

  putV2VpcsVpcId: () => Promise<unknown>;

  patchV2VpcsVpcId: () => Promise<unknown>;

  deleteV2VpcsVpcId: () => Promise<unknown>;

  getV2VpcsVpcIdMembers: () => Promise<unknown>;

  getV2VpcsVpcIdPeerings: () => Promise<unknown>;

  postV2VpcsVpcIdPeerings: () => Promise<unknown>;

  patchV2VpcsVpcIdPeeringsVpcPeeringId: () => Promise<unknown>;

  getV2VpcPeerings: () => Promise<unknown>;

  postV2VpcPeerings: () => Promise<unknown>;

  getV2VpcPeeringsVpcPeeringId: () => Promise<unknown>;

  patchV2VpcPeeringsVpcPeeringId: () => Promise<unknown>;

  deleteV2VpcPeeringsVpcPeeringId: () => Promise<unknown>;

  getV2VpcNatGateways: () => Promise<unknown>;

  postV2VpcNatGateways: () => Promise<unknown>;

  getV2VpcNatGatewaysId: () => Promise<unknown>;

  putV2VpcNatGatewaysId: () => Promise<unknown>;

  deleteV2VpcNatGatewaysId: () => Promise<unknown>;

  getV2UptimeChecks: () => Promise<unknown>;

  postV2UptimeChecks: () => Promise<unknown>;

  getV2UptimeChecksCheckId: () => Promise<unknown>;

  putV2UptimeChecksCheckId: () => Promise<unknown>;

  deleteV2UptimeChecksCheckId: () => Promise<unknown>;

  getV2UptimeChecksCheckIdState: () => Promise<unknown>;

  getV2UptimeChecksCheckIdAlerts: () => Promise<unknown>;

  postV2UptimeChecksCheckIdAlerts: () => Promise<unknown>;

  getV2UptimeChecksCheckIdAlertsAlertId: () => Promise<unknown>;

  putV2UptimeChecksCheckIdAlertsAlertId: () => Promise<unknown>;

  deleteV2UptimeChecksCheckIdAlertsAlertId: () => Promise<unknown>;

  getV2GenAiAgents: () => Promise<unknown>;

  postV2GenAiAgents: () => Promise<unknown>;

  getV2GenAiAgentsAgentUuidApiKeys: () => Promise<unknown>;

  postV2GenAiAgentsAgentUuidApiKeys: () => Promise<unknown>;

  putV2GenAiAgentsAgentUuidApiKeysApiKeyUuid: () => Promise<unknown>;

  deleteV2GenAiAgentsAgentUuidApiKeysApiKeyUuid: () => Promise<unknown>;

  putV2GenAiAgentsAgentUuidApiKeysApiKeyUuidRegenerate: () => Promise<unknown>;

  postV2GenAiAgentsAgentUuidFunctions: () => Promise<unknown>;

  putV2GenAiAgentsAgentUuidFunctionsFunctionUuid: () => Promise<unknown>;

  deleteV2GenAiAgentsAgentUuidFunctionsFunctionUuid: () => Promise<unknown>;

  postV2GenAiAgentsAgentUuidGuardrails: () => Promise<unknown>;

  deleteV2GenAiAgentsAgentUuidGuardrailsGuardrailUuid: () => Promise<unknown>;

  postV2GenAiAgentsAgentUuidKnowledgeBases: () => Promise<unknown>;

  postV2GenAiAgentsAgentUuidKnowledgeBasesKnowledgeBaseUuid: () => Promise<unknown>;

  deleteV2GenAiAgentsAgentUuidKnowledgeBasesKnowledgeBaseUuid: () => Promise<unknown>;

  postV2GenAiAgentsParentAgentUuidChildAgentsChildAgentUuid: () => Promise<unknown>;

  putV2GenAiAgentsParentAgentUuidChildAgentsChildAgentUuid: () => Promise<unknown>;

  deleteV2GenAiAgentsParentAgentUuidChildAgentsChildAgentUuid: () => Promise<unknown>;

  getV2GenAiAgentsUuid: () => Promise<unknown>;

  putV2GenAiAgentsUuid: () => Promise<unknown>;

  deleteV2GenAiAgentsUuid: () => Promise<unknown>;

  getV2GenAiAgentsUuidChildAgents: () => Promise<unknown>;

  putV2GenAiAgentsUuidDeploymentVisibility: () => Promise<unknown>;

  getV2GenAiAgentsUuidUsage: () => Promise<unknown>;

  getV2GenAiAgentsUuidVersions: () => Promise<unknown>;

  putV2GenAiAgentsUuidVersions: () => Promise<unknown>;

  getV2GenAiAnthropicKeys: () => Promise<unknown>;

  postV2GenAiAnthropicKeys: () => Promise<unknown>;

  getV2GenAiAnthropicKeysApiKeyUuid: () => Promise<unknown>;

  putV2GenAiAnthropicKeysApiKeyUuid: () => Promise<unknown>;

  deleteV2GenAiAnthropicKeysApiKeyUuid: () => Promise<unknown>;

  getV2GenAiAnthropicKeysUuidAgents: () => Promise<unknown>;

  getV2GenAiCustomModels: () => Promise<unknown>;

  postV2GenAiCustomModelsImport: () => Promise<unknown>;

  getV2GenAiCustomModelsUuid: () => Promise<unknown>;

  deleteV2GenAiCustomModelsUuid: () => Promise<unknown>;

  patchV2GenAiCustomModelsUuidMetadata: () => Promise<unknown>;

  getV2GenAiEvaluationDatasets: () => Promise<unknown>;

  postV2GenAiEvaluationDatasets: () => Promise<unknown>;

  postV2GenAiEvaluationDatasetsFileUploadPresignedUrls: () => Promise<unknown>;

  getV2GenAiEvaluationDatasetsDatasetUuidDownloadUrl: () => Promise<unknown>;

  getV2GenAiEvaluationMetrics: () => Promise<unknown>;

  postV2GenAiEvaluationRuns: () => Promise<unknown>;

  getV2GenAiEvaluationRunsEvaluationRunUuid: () => Promise<unknown>;

  getV2GenAiEvaluationRunsEvaluationRunUuidResults: () => Promise<unknown>;

  getV2GenAiEvaluationRunsEvaluationRunUuidResultsPromptId: () => Promise<unknown>;

  getV2GenAiEvaluationTestCases: () => Promise<unknown>;

  postV2GenAiEvaluationTestCases: () => Promise<unknown>;

  getV2GenAiEvaluationTestCasesEvaluationTestCaseUuidEvaluationRuns: () => Promise<unknown>;

  getV2GenAiEvaluationTestCasesTestCaseUuid: () => Promise<unknown>;

  putV2GenAiEvaluationTestCasesTestCaseUuid: () => Promise<unknown>;

  getV2GenAiIndexingJobs: () => Promise<unknown>;

  postV2GenAiIndexingJobs: () => Promise<unknown>;

  getV2GenAiIndexingJobsIndexingJobUuidDataSources: () => Promise<unknown>;

  getV2GenAiIndexingJobsIndexingJobUuidDetailsSignedUrl: () => Promise<unknown>;

  getV2GenAiIndexingJobsUuid: () => Promise<unknown>;

  putV2GenAiIndexingJobsUuidCancel: () => Promise<unknown>;

  getV2GenAiKnowledgeBases: () => Promise<unknown>;

  postV2GenAiKnowledgeBases: () => Promise<unknown>;

  postV2GenAiKnowledgeBasesDataSourcesFileUploadPresignedUrls: () => Promise<unknown>;

  getV2GenAiKnowledgeBasesKnowledgeBaseUuidDataSources: () => Promise<unknown>;

  postV2GenAiKnowledgeBasesKnowledgeBaseUuidDataSources: () => Promise<unknown>;

  putV2GenAiKnowledgeBasesKnowledgeBaseUuidDataSourcesDataSourceUuid: () => Promise<unknown>;

  deleteV2GenAiKnowledgeBasesKnowledgeBaseUuidDataSourcesDataSourceUuid: () => Promise<unknown>;

  getV2GenAiKnowledgeBasesKnowledgeBaseUuidIndexingJobs: () => Promise<unknown>;

  getV2GenAiKnowledgeBasesUuid: () => Promise<unknown>;

  putV2GenAiKnowledgeBasesUuid: () => Promise<unknown>;

  deleteV2GenAiKnowledgeBasesUuid: () => Promise<unknown>;

  postV2GenAiModelEvaluationDatasetsFileUploadPresignedUrls: () => Promise<unknown>;

  getV2GenAiModelEvaluationMetrics: () => Promise<unknown>;

  getV2GenAiModelEvaluationPresets: () => Promise<unknown>;

  getV2GenAiModelEvaluationPresetsEvalPresetUuid: () => Promise<unknown>;

  deleteV2GenAiModelEvaluationPresetsEvalPresetUuid: () => Promise<unknown>;

  getV2GenAiModelEvaluationRuns: () => Promise<unknown>;

  postV2GenAiModelEvaluationRuns: () => Promise<unknown>;

  getV2GenAiModelEvaluationRunsEvalRunUuid: () => Promise<unknown>;

  deleteV2GenAiModelEvaluationRunsEvalRunUuid: () => Promise<unknown>;

  putV2GenAiModelEvaluationRunsEvalRunUuidCancel: () => Promise<unknown>;

  getV2GenAiModelEvaluationRunsEvalRunUuidResultsDownloadUrl: () => Promise<unknown>;

  getV2GenAiModels: () => Promise<unknown>;

  getV2GenAiModelsApiKeys: () => Promise<unknown>;

  postV2GenAiModelsApiKeys: () => Promise<unknown>;

  putV2GenAiModelsApiKeysApiKeyUuid: () => Promise<unknown>;

  deleteV2GenAiModelsApiKeysApiKeyUuid: () => Promise<unknown>;

  putV2GenAiModelsApiKeysApiKeyUuidRegenerate: () => Promise<unknown>;

  getV2GenAiModelsCatalog: () => Promise<unknown>;

  getV2GenAiModelsCatalogId: () => Promise<unknown>;

  getV2GenAiModelsRouters: () => Promise<unknown>;

  postV2GenAiModelsRouters: () => Promise<unknown>;

  getV2GenAiModelsRoutersPresets: () => Promise<unknown>;

  getV2GenAiModelsRoutersTasksPresets: () => Promise<unknown>;

  getV2GenAiModelsRoutersUuid: () => Promise<unknown>;

  putV2GenAiModelsRoutersUuid: () => Promise<unknown>;

  deleteV2GenAiModelsRoutersUuid: () => Promise<unknown>;

  postV2GenAiOauth2DropboxTokens: () => Promise<unknown>;

  getV2GenAiOauth2Url: () => Promise<unknown>;

  getV2GenAiOpenaiKeys: () => Promise<unknown>;

  postV2GenAiOpenaiKeys: () => Promise<unknown>;

  getV2GenAiOpenaiKeysApiKeyUuid: () => Promise<unknown>;

  putV2GenAiOpenaiKeysApiKeyUuid: () => Promise<unknown>;

  deleteV2GenAiOpenaiKeysApiKeyUuid: () => Promise<unknown>;

  getV2GenAiOpenaiKeysUuidAgents: () => Promise<unknown>;

  getV2GenAiRegions: () => Promise<unknown>;

  postV2GenAiScheduledIndexing: () => Promise<unknown>;

  getV2GenAiScheduledIndexingKnowledgeBaseKnowledgeBaseUuid: () => Promise<unknown>;

  deleteV2GenAiScheduledIndexingUuid: () => Promise<unknown>;

  getV2GenAiWorkspaces: () => Promise<unknown>;

  postV2GenAiWorkspaces: () => Promise<unknown>;

  getV2GenAiWorkspacesWorkspaceUuid: () => Promise<unknown>;

  putV2GenAiWorkspacesWorkspaceUuid: () => Promise<unknown>;

  deleteV2GenAiWorkspacesWorkspaceUuid: () => Promise<unknown>;

  getV2GenAiWorkspacesWorkspaceUuidAgents: () => Promise<unknown>;

  putV2GenAiWorkspacesWorkspaceUuidAgents: () => Promise<unknown>;

  getV2GenAiWorkspacesWorkspaceUuidEvaluationTestCases: () => Promise<unknown>;

  postV1ChatCompletions: () => Promise<unknown>;

  postV1Messages: () => Promise<unknown>;

  postV1Embeddings: () => Promise<unknown>;

  postApiV1ChatCompletions: () => Promise<unknown>;

  postV1ImagesGenerations: () => Promise<unknown>;

  getV1Models: () => Promise<unknown>;

  postV1Responses: () => Promise<unknown>;

  postV1AsyncInvoke: () => Promise<unknown>;

  postV1BatchesFiles: () => Promise<unknown>;

  putUploadUrl: () => Promise<unknown>;

  postV1Batches: () => Promise<unknown>;

  getV1Batches: () => Promise<unknown>;

  getV1BatchesBatchId: () => Promise<unknown>;

  getV1BatchesBatchIdResults: () => Promise<unknown>;

  postV1BatchesBatchIdCancel: () => Promise<unknown>;
};


