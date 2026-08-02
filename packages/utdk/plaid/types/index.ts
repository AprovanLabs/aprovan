import type { AccessToken, AccessTokenNullable, AccountsBalanceGetRequestOptions, AccountsGetRequestOptions, AccountsGetResponse, AchClass, ApiClientId, ApiSecret, ApplicationGetResponse, ApplicationId, AssetReportAuditCopyCreateResponse, AssetReportAuditCopyPdfGetResponse, AssetReportAuditCopyRemoveResponse, AssetReportCreateRequestOptions, AssetReportCreateResponse, AssetReportFilterResponse, AssetReportFreddieGetResponse, AssetReportGetRequestOptions, AssetReportGetResponse, AssetReportPdfGetRequestOptions, AssetReportPdfGetResponse, AssetReportRefreshAssetReportToken, AssetReportRefreshRequestOptions, AssetReportRefreshResponse, AssetReportRemoveResponse, AssetReportToken, AssetReportTokenNullable, AuthGetRequestOptions, AuthGetResponse, AuthVerifyRequestNumbers, AuthVerifyResponse, BankTransferAccessToken, BankTransferAmount, BankTransferBalanceGetResponse, BankTransferCancelResponse, BankTransferCreateResponse, BankTransferDirection, BankTransferEventListBankTransferType, BankTransferEventListDirection, BankTransferEventListResponse, BankTransferEventSyncResponse, BankTransferEventType, BankTransferFailure, BankTransferGetResponse, BankTransferId, BankTransferIdempotencyKey, BankTransferListResponse, BankTransferMetadata, BankTransferMigrateAccountResponse, BankTransferNetwork, BankTransferSweepGetResponse, BankTransferSweepListResponse, BankTransferType, BankTransferUser, BeaconAccountRiskEvaluateEvaluationReason, BeaconAccountRiskEvaluateRequestOptions, BeaconAccountRiskEvaluateResponse, BeaconDuplicateGetResponse, BeaconDuplicateId, BeaconProgramId, BeaconReportCreateResponse, BeaconReportCreateType, BeaconReportGetResponse, BeaconReportId, BeaconReportListResponse, BeaconReportSyndicationGetResponse, BeaconReportSyndicationId, BeaconReportSyndicationListResponse, BeaconUserAccountInsightsGetResponse, BeaconUserCreateResponse, BeaconUserGetResponse, BeaconUserHistoryListResponse, BeaconUserId, BeaconUserRequestData, BeaconUserStatus, BeaconUserUpdateRequestData, BeaconUserUpdateResponse, BetaEwaReportV1GetResponse, BetaPartnerCustomerV1CreateResponse, BetaPartnerCustomerV1EnableResponse, BetaPartnerCustomerV1GetResponse, BetaPartnerCustomerV1UpdateResponse, BusinessVerificationCreateRequestBusiness, BusinessVerificationCreateResponse, BusinessVerificationGetResponse, BusinessVerificationId, CashFlowUpdatesEventWebhookCodes, CashflowReportGetRequestOptions, CashflowReportGetResponse, CashflowReportInsightsGetResponse, CashflowReportRefreshResponse, CashflowReportTransactionsGetRequestOptions, CashflowReportTransactionsGetResponse, CategoriesGetRequest, CategoriesGetResponse, ClientProvidedRawTransaction, ClientProvidedTransaction, ClientUserId, ClientUserIdentity, ConsentEventsGetResponse, ConsentPaymentIdempotencyKey, ConsumerReportPdfGetResponse, ConsumerReportPermissiblePurpose, ConsumerReportUserIdentity, CountryCode, CraCheckReportBaseReportGetResponse, CraCheckReportCashflowInsightsGetOptions, CraCheckReportCashflowInsightsGetResponse, CraCheckReportCreateBaseReportOptions, CraCheckReportCreatePartnerInsightsOptions, CraCheckReportCreateResponse, CraCheckReportIncomeInsightsGetOptions, CraCheckReportIncomeInsightsGetResponse, CraCheckReportLendScoreGetOptions, CraCheckReportLendScoreGetResponse, CraCheckReportNetworkInsightsGetOptions, CraCheckReportNetworkInsightsGetResponse, CraCheckReportPartnerInsightsGetOptions, CraCheckReportPartnerInsightsGetPartnerInsights, CraCheckReportPartnerInsightsGetResponse, CraCheckReportPdfGetResponse, CraCheckReportVerificationGetEmploymentRefreshOptions, CraCheckReportVerificationGetReportType, CraCheckReportVerificationGetResponse, CraCheckReportVerificationPdfGetResponse, CraCheckReportVerificationPdfReportType, CraCreditProfileInquiryType, CraCreditProfileReportGetResponse, CraCreditProfileReportType, CraCreditProfileReportVersion, CraLoanApplication, CraLoanRegister, CraLoanUnregister, CraLoanUnregisterResponse, CraLoanUpdate, CraLoansApplicationsRegisterResponse, CraLoansRegisterResponse, CraLoansUpdateResponse, CraMonitoringInsightsGetResponse, CraMonitoringInsightsSubscribeResponse, CraMonitoringInsightsSubscriptionId, CraMonitoringInsightsUnsubscribeResponse, CraPartnerInsightsGetResponse, CraPdfAddOns, CraUserTier, CreditAuditCopyTokenCreateResponse, CreditAuditCopyTokenRemoveResponse, CreditAuditCopyTokenUpdateResponse, CreditBankEmploymentGetResponse, CreditBankIncomeCategory, CreditBankIncomeGetRequestOptions, CreditBankIncomeGetResponse, CreditBankIncomePdfGetResponse, CreditBankIncomeRefreshRequestOptions, CreditBankIncomeRefreshResponse, CreditBankIncomeWebhookUpdateResponse, CreditBankStatementsUploadsGetRequestOptions, CreditBankStatementsUploadsGetResponse, CreditEmploymentGetResponse, CreditFreddieMacReportsGetResponse, CreditPayrollIncomeGetRequestOptions, CreditPayrollIncomeGetResponse, CreditPayrollIncomeParsingConfigUpdateResponse, CreditPayrollIncomePrecheckResponse, CreditPayrollIncomeRefreshRequestOptions, CreditPayrollIncomeRefreshResponse, CreditPayrollIncomeRiskSignalsGetResponse, CreditRelayCreateResponse, CreditRelayPdfGetResponse, CreditRelayRefreshResponse, CreditRelayRemoveResponse, CreditSessionsGetResponse, Cursor, CustomSandboxTransaction, DashboardUserGetResponse, DashboardUserId, DashboardUserListResponse, EmployersSearchResponse, EmploymentVerificationGetResponse, EntityWatchlistProgramId, EntityWatchlistScreeningHitId, EntityWatchlistScreeningId, EntityWatchlistSearchTerms, ExternalPaymentInitiationConsentOptions, ExternalPaymentOptions, ExternalPaymentScheduleRequest, FdxHateoasLink, FdxNotificationCategory, FdxNotificationPayload, FdxNotificationPriority, FdxNotificationSeverity, FdxNotificationType, FdxParty, FdxTimestamp, FraudAmount, GetRecipientResponse, GetRecipientsResponse, IdempotencyFlag, IdentityDocumentsUploadsGetRequestOptions, IdentityDocumentsUploadsGetResponse, IdentityGetRequestOptions, IdentityGetResponse, IdentityMatchRequestOptions, IdentityMatchResponse, IdentityMatchUser, IdentityRefreshResponse, IdentityVerificationAutofillCreateResponse, IdentityVerificationConsent, IdentityVerificationCreateRequestUser, IdentityVerificationCreateResponse, IdentityVerificationGetResponse, IdentityVerificationId, IdentityVerificationListResponse, IdentityVerificationRequestUser, IdentityVerificationRetryRequestStepsObject, IdentityVerificationRetryResponse, IdentityVerificationTemplateId, IncomeVerificationCreateRequestOptions, IncomeVerificationCreateResponse, IncomeVerificationDocParsingConfig, IncomeVerificationPaystubsGetResponse, IncomeVerificationPrecheckEmployer, IncomeVerificationPrecheckMilitaryInfo, IncomeVerificationPrecheckPayrollInstitution, IncomeVerificationPrecheckResponse, IncomeVerificationPrecheckUser, IncomeVerificationTaxformsGetResponse, InstitutionsGetByIdRequestOptions, InstitutionsGetByIdResponse, InstitutionsGetRequestOptions, InstitutionsGetResponse, InstitutionsSearchRequestOptions, InstitutionsSearchResponse, InvestmentHoldingsGetRequestOptions, InvestmentsAuthGetRequestOptions, InvestmentsAuthGetResponse, InvestmentsHoldingsGetResponse, InvestmentsRefreshResponse, InvestmentsTransactionsGetRequestOptions, InvestmentsTransactionsGetResponse, Iso8601Date, IssuesGetResponse, IssuesSearchResponse, IssuesSubscribeResponse, ItemAccessTokenInvalidateResponse, ItemActivityListResponse, ItemApplicationListResponse, ItemApplicationScopesUpdateResponse, ItemApplicationUnlinkResponse, ItemGetResponse, ItemHandleFraudReportResponse, ItemId, ItemImportRequestInstitutionId, ItemImportRequestOptions, ItemImportRequestUserAuth, ItemImportResponse, ItemProductsTerminateReasonCode, ItemProductsTerminateResponse, ItemPublicTokenCreateResponse, ItemPublicTokenExchangeResponse, ItemRemoveReasonCode, ItemRemoveResponse, ItemWebhookUpdateResponse, LedgerDepositIdempotencyKey, LedgerDistributeIdempotencyKey, LedgerEventSourceType, LedgerWithdrawIdempotencyKey, LiabilitiesGetRequestOptions, LiabilitiesGetResponse, LinkDeliveryCreateResponse, LinkDeliveryGetResponse, LinkDeliveryOptions, LinkOAuthCorrelationIdExchangeResponse, LinkTokenAccountFilters, LinkTokenCashflowReport, LinkTokenCreateCardSwitch, LinkTokenCreateHostedLink, LinkTokenCreateIdentity, LinkTokenCreateInstitutionData, LinkTokenCreateRequestAppearanceMode, LinkTokenCreateRequestAuth, LinkTokenCreateRequestBaseReport, LinkTokenCreateRequestCraOptions, LinkTokenCreateRequestCreditPartnerInsights, LinkTokenCreateRequestEmployment, LinkTokenCreateRequestIdentityVerification, LinkTokenCreateRequestIncomeVerification, LinkTokenCreateRequestPaymentConfiguration, LinkTokenCreateRequestPaymentInitiation, LinkTokenCreateRequestRedirectUri, LinkTokenCreateRequestStatements, LinkTokenCreateRequestTransfer, LinkTokenCreateRequestUpdate, LinkTokenCreateRequestUser, LinkTokenCreateResponse, LinkTokenEuConfig, LinkTokenGetResponse, LinkTokenInvestments, LinkTokenInvestmentsAuth, LinkTokenTransactions, MonitoringConsumerReportPermissiblePurpose, NetworkInsightsReportGetResponse, NetworkStatusGetResponse, NetworkStatusGetUser, NewUserId, OAuthAnyToken, OAuthGrantType, OAuthIntrospectResponse, OAuthRefreshToken, OAuthRevokeResponse, OAuthScope, OAuthSubjectTokenType, OAuthTokenResponse, OauthApiSecret, OriginatingFundSource, PartnerCustomerCreateResponse, PartnerCustomerEnableResponse, PartnerCustomerGetResponse, PartnerCustomerOAuthInstitutionsGetResponse, PartnerCustomerRemoveResponse, PartnerEndCustomerAddress, PartnerEndCustomerAssetsUnderManagement, PartnerEndCustomerBankAddendumAcceptance, PartnerEndCustomerBillingContact, PartnerEndCustomerCustomerSupportInfo, PartnerEndCustomerQuestionnaires, PartnerEndCustomerTechnicalContact, PaymentAmount, PaymentAmountToRefund, PaymentInitiationAddress, PaymentInitiationConsentConstraints, PaymentInitiationConsentCreateResponse, PaymentInitiationConsentGetResponse, PaymentInitiationConsentPayerDetails, PaymentInitiationConsentPaymentExecuteResponse, PaymentInitiationConsentProcessingMode, PaymentInitiationConsentRevokeResponse, PaymentInitiationConsentScope, PaymentInitiationConsentType, PaymentInitiationPaymentCreateResponse, PaymentInitiationPaymentGetResponse, PaymentInitiationPaymentListResponse, PaymentInitiationPaymentReverseResponse, PaymentInitiationPaymentTokenCreateResponse, PaymentInitiationRecipientCreateResponse, PaymentInitiationRecipientGetResponse, PaymentInitiationRecipientListResponse, PaymentProfileCreateResponse, PaymentProfileGetResponse, PaymentProfileRemoveResponse, PaymentProfileToken, PfcDetailedCategory, PfcPrimaryCategory, PlaidError, PlaidUserId, ProcessorAccountGetResponse, ProcessorAuthGetResponse, ProcessorBalanceGetRequestOptions, ProcessorBalanceGetResponse, ProcessorBankTransferCreateResponse, ProcessorIdentityGetResponse, ProcessorIdentityMatchResponse, ProcessorInvestmentsAuthGetResponse, ProcessorInvestmentsHoldingsGetResponse, ProcessorInvestmentsTransactionsGetResponse, ProcessorLiabilitiesGetResponse, ProcessorSignalDecisionReportResponse, ProcessorSignalEvaluateResponse, ProcessorSignalPrepareResponse, ProcessorSignalReturnReportResponse, ProcessorStripeBankAccountTokenCreateResponse, ProcessorToken, ProcessorTokenCreateResponse, ProcessorTokenPermissionsGetResponse, ProcessorTokenPermissionsSetResponse, ProcessorTokenWebhookUpdateResponse, ProcessorTransactionsGetRequestOptions, ProcessorTransactionsGetResponse, ProcessorTransactionsRecurringGetResponse, ProcessorTransactionsRefreshResponse, ProcessorTransactionsSyncResponse, Products, ProfileNetworkStatusGetResponse, ProtectBankAccount, ProtectComputeResponse, ProtectEvent, ProtectEventGetResponse, ProtectEventSendResponse, ProtectIncidentEvent, ProtectModelInputs, ProtectReportConfidence, ProtectReportCreateResponse, ProtectReportSource, ProtectReportType, ProtectUser, ProtectUserInsightsGetResponse, ReasonCode, RecipientBacsNullable, RecurringTransferId, ReportType, ReviewComment, SandboxBankIncomeFireWebhookResponse, SandboxBankIncomeWebhookFireRequestWebhookCode, SandboxBankIncomeWebhookFireRequestWebhookFields, SandboxBankTransferFireWebhookResponse, SandboxBankTransferSimulateResponse, SandboxCraCashflowUpdatesUpdateResponse, SandboxIncomeFireWebhookResponse, SandboxIncomeWebhookFireRequestWebhookCode, SandboxItemApplicationSeedResponse, SandboxItemFireWebhookResponse, SandboxItemResetLoginResponse, SandboxItemSetVerificationStatusResponse, SandboxOauthSelectAccountsResponse, SandboxPaymentProfileResetLoginResponse, SandboxPaymentSimulateResponse, SandboxProcessorTokenCreateRequestOptions, SandboxProcessorTokenCreateResponse, SandboxPublicTokenCreateRequestOptions, SandboxPublicTokenCreateResponse, SandboxTransactionsCreateResponse, SandboxTransferFireWebhookResponse, SandboxTransferLedgerDepositSimulateResponse, SandboxTransferLedgerSimulateAvailableResponse, SandboxTransferLedgerWithdrawSimulateResponse, SandboxTransferRefundSimulateResponse, SandboxTransferRepaymentSimulateResponse, SandboxTransferSimulateResponse, SandboxTransferSweepSimulateResponse, SandboxTransferTestClockAdvanceResponse, SandboxTransferTestClockCreateResponse, SandboxTransferTestClockGetResponse, SandboxTransferTestClockListResponse, SandboxUserResetLoginResponse, Scopes, ScopesContext, ScopesState, SessionTokenCreateRequestUser, SessionTokenCreateResponse, SignalDecisionOutcome, SignalDecisionReportResponse, SignalDevice, SignalEvaluateResponse, SignalPaymentMethod, SignalPrepareResponse, SignalReturnReportResponse, SignalScheduleDefaultPaymentMethod, SignalScheduleResponse, SignalUser, StatementsDownloadResponse, StatementsListResponse, StatementsRefreshResponse, Strategy, SweepDescription, SweepStatus, SweepTrigger, ThirdPartyUserToken, TransactionsEnhanceGetResponse, TransactionsEnrichRequestOptions, TransactionsEnrichResponse, TransactionsGetRequestOptions, TransactionsGetResponse, TransactionsRecurringGetRequestOptions, TransactionsRecurringGetResponse, TransactionsRefreshResponse, TransactionsRuleDetails, TransactionsRulesCreateResponse, TransactionsRulesListResponse, TransactionsRulesRemoveResponse, TransactionsSyncRequestOptions, TransactionsSyncResponse, TransactionsUserInsightsGetResponse, TransferAccessToken, TransferAccountId, TransferAchNetwork, TransferAmount, TransferAuthorizationCancelResponse, TransferAuthorizationCreateResponse, TransferAuthorizationDevice, TransferAuthorizationId, TransferAuthorizationIdempotencyKey, TransferAuthorizationUserInRequest, TransferBalanceGetResponse, TransferBalanceType, TransferCancelResponse, TransferCapabilitiesGetResponse, TransferConfigurationGetResponse, TransferCreateIdempotencyKey, TransferCreateResponse, TransferCreditFundsSource, TransferDevice, TransferDiligenceDocumentUploadResponse, TransferDiligenceSubmitResponse, TransferDocumentPurpose, TransferEventListResponse, TransferEventListTransferType, TransferEventSyncResponse, TransferEventType, TransferFacilitatorFee, TransferFailure, TransferFundingAccount, TransferFundingAccountWithDisplayName, TransferGetResponse, TransferId, TransferIdForRefund, TransferIntentCreateMode, TransferIntentCreateNetwork, TransferIntentCreateResponse, TransferIntentGetResponse, TransferLedgerDepositResponse, TransferLedgerDistributeResponse, TransferLedgerEventListResponse, TransferLedgerFundingAccountIdRequest, TransferLedgerGetResponse, TransferLedgerSweepSimulateEventType, TransferLedgerWithdrawResponse, TransferListResponse, TransferMetadata, TransferMetricsGetResponse, TransferMigrateAccountResponse, TransferMigratedFundingAccountIdRequest, TransferNetwork, TransferOriginatorClientId, TransferOriginatorCreateResponse, TransferOriginatorDiligence, TransferOriginatorFundingAccountCreateResponse, TransferOriginatorFundingAccountUpdateResponse, TransferOriginatorGetResponse, TransferOriginatorListResponse, TransferPaymentProfileToken, TransferPlatformOriginatorClientId, TransferPlatformOriginatorCreateResponse, TransferPlatformPersonAddress, TransferPlatformPersonCreateResponse, TransferPlatformPersonIdNumber, TransferPlatformPersonName, TransferPlatformRequirementSubmission, TransferPlatformRequirementSubmitResponse, TransferPlatformTosAcceptanceMetadata, TransferQuestionnaireCreateResponse, TransferRecurringCancelResponse, TransferRecurringCreateResponse, TransferRecurringGetResponse, TransferRecurringIdempotencyKey, TransferRecurringListResponse, TransferRecurringNetwork, TransferRecurringSchedule, TransferRefundAmount, TransferRefundCancelResponse, TransferRefundCreateResponse, TransferRefundGetResponse, TransferRefundId, TransferRefundIdempotencyKey, TransferRepaymentListResponse, TransferRepaymentReturnListResponse, TransferSweepGetResponse, TransferSweepId, TransferSweepListResponse, TransferTestClockId, TransferType, TransferUserInRequest, TransferUserInRequestDeprecated, TransferWireDetails, UpdateEntityScreeningRequestSearchTerms, UpdateIndividualScreeningRequestSearchTerms, UserAccountSessionEvent, UserAccountSessionEventSendResponse, UserAccountSessionGetResponse, UserBasedProducts, UserCreateResponse, UserFinancialDataRefreshResponse, UserGetResponse, UserId, UserIdentityRemoveResponse, UserItemsAssociateResponse, UserItemsGetResponse, UserItemsRemoveResponse, UserProductsTerminateResponse, UserRemoveResponse, UserThirdPartyTokenCreateResponse, UserThirdPartyTokenRemoveResponse, UserToken, UserTransactionsRefreshResponse, UserUpdateResponse, VirtualTime, WalletCreateResponse, WalletGetResponse, WalletIsoCurrencyCode, WalletListResponse, WalletTransactionAmount, WalletTransactionCounterparty, WalletTransactionExecuteResponse, WalletTransactionGetResponse, WalletTransactionIdempotencyKey, WalletTransactionListRequestOptions, WalletTransactionListResponse, WatchlistProgramId, WatchlistScreeningEntityCreateResponse, WatchlistScreeningEntityGetResponse, WatchlistScreeningEntityHistoryListResponse, WatchlistScreeningEntityHitListResponse, WatchlistScreeningEntityListResponse, WatchlistScreeningEntityProgramGetResponse, WatchlistScreeningEntityProgramListResponse, WatchlistScreeningEntityReviewCreateResponse, WatchlistScreeningEntityReviewListResponse, WatchlistScreeningEntityUpdateRequestResettableFieldList, WatchlistScreeningEntityUpdateResponse, WatchlistScreeningHitId, WatchlistScreeningIndividualCreateResponse, WatchlistScreeningIndividualGetResponse, WatchlistScreeningIndividualHistoryListResponse, WatchlistScreeningIndividualHitListResponse, WatchlistScreeningIndividualId, WatchlistScreeningIndividualListResponse, WatchlistScreeningIndividualProgramGetResponse, WatchlistScreeningIndividualProgramListResponse, WatchlistScreeningIndividualReviewCreateResponse, WatchlistScreeningIndividualReviewListResponse, WatchlistScreeningIndividualUpdateRequestResettableFieldList, WatchlistScreeningIndividualUpdateResponse, WatchlistScreeningRequestSearchTerms, WatchlistScreeningStatus, WebhookType, WebhookVerificationKeyGetResponse } from "./schemas.js";

export type PlaidClient = {
  /**
   * Create an Asset Report
   * @see /api/products/assets/#asset_reportcreate
   */
  assetReportCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** An array of access tokens corresponding to the Items that will be included in the report. The `assets` product must have been initialized for the Items during link; the Assets product cannot be added after initialization. */
    access_tokens?: (AccessToken)[];
    /** The maximum integer number of days of history to include in the Asset Report. If using Fannie Mae Day 1 Certainty, `days_requested` must be at least 61 for new originations or at least 31 for refinancings.  An Asset Report requested with "Additional History" (that is, with more than 61 days of transaction history) will incur an Additional History fee. */
    days_requested: number;
    options?: AssetReportCreateRequestOptions;
  }) => Promise<AssetReportCreateResponse>;

  /**
   * Retrieve an Asset Report
   * @see /api/products/assets/#asset_reportget
   */
  assetReportGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    asset_report_token?: AssetReportTokenNullable;
    /** The user token associated with the User for which to create an asset report for. The latest asset report associated with the User will be returned */
    user_token?: string;
    /** `true` if you would like to retrieve the Asset Report with Insights, `false` otherwise. This field defaults to `false` if omitted. */
    include_insights?: boolean;
    /** `true` to fetch "fast" version of asset report. Defaults to false if omitted. Can only be used if `/asset_report/create` was called with `options.add_ons` set to `["fast_assets"]`. */
    fast_report?: boolean;
    options?: AssetReportGetRequestOptions;
  }) => Promise<AssetReportGetResponse>;

  /**
   * Retrieve a PDF Asset Report
   * @see /api/products/assets/#asset_reportpdfget
   */
  assetReportPdfGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    asset_report_token: AssetReportToken;
    options?: AssetReportPdfGetRequestOptions;
  }) => Promise<AssetReportPdfGetResponse>;

  /**
   * Refresh an Asset Report
   * @see /api/products/assets/#asset_reportrefresh
   */
  assetReportRefresh: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    asset_report_token: AssetReportRefreshAssetReportToken;
    /** The maximum number of days of history to include in the Asset Report. Must be an integer. If not specified, the value from the original call to `/asset_report/create` will be used. */
    days_requested?: number | null;
    options?: AssetReportRefreshRequestOptions;
  }) => Promise<AssetReportRefreshResponse>;

  /**
   * Filter Asset Report
   * @see /api/products/assets/#asset_reportfilter
   */
  assetReportFilter: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    asset_report_token: AssetReportToken;
    /** The accounts to exclude from the Asset Report, identified by `account_id`. */
    account_ids_to_exclude: (string)[];
  }) => Promise<AssetReportFilterResponse>;

  /**
   * Delete an Asset Report
   * @see /api/products/assets/#asset_reportremove
   */
  assetReportRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    asset_report_token: AssetReportToken;
  }) => Promise<AssetReportRemoveResponse>;

  /**
   * Create Asset Report Audit Copy
   * @see /api/products/assets/#asset_reportaudit_copycreate
   */
  assetReportAuditCopyCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    asset_report_token: AssetReportToken;
    /** The `auditor_id` of the third party with whom you would like to share the Asset Report. */
    auditor_id?: string;
  }) => Promise<AssetReportAuditCopyCreateResponse>;

  /**
   * Retrieve an Asset Report Audit Copy
   * @see /none/
   */
  assetReportAuditCopyGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `audit_copy_token` granting access to the Audit Copy you would like to get. */
    audit_copy_token: string;
  }) => Promise<AssetReportGetResponse>;

  /**
   * Retrieve a PDF Asset Report Audit Copy
   * @see /none/
   */
  assetReportAuditCopyPdfGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `audit_copy_token` granting access to the Audit Copy you would like to get as a PDF. */
    audit_copy_token: string;
    options?: AssetReportPdfGetRequestOptions;
  }) => Promise<AssetReportAuditCopyPdfGetResponse>;

  /**
   * Remove Asset Report Audit Copy
   * @see /api/products/assets/#asset_reportaudit_copyremove
   */
  assetReportAuditCopyRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `audit_copy_token` granting access to the Audit Copy you would like to revoke. */
    audit_copy_token: string;
  }) => Promise<AssetReportAuditCopyRemoveResponse>;

  /**
   * Subscribe to Monitoring Insights
   * @see /api/products/check/#cramonitoring_insightssubscribe
   */
  craMonitoringInsightsSubscribe: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    /** The item ID to subscribe for Cash Flow Updates. */
    item_id?: string;
    /** URL to which Plaid will send Cash Flow Updates webhooks, for example when the requested Cash Flow Updates report is ready. */
    webhook: string;
    /** Income categories to include in Cash Flow Updates. If empty or `null`, this field will default to including all possible categories. */
    income_categories?: (CreditBankIncomeCategory)[] | null;
    user_token?: UserToken;
  }) => Promise<CraMonitoringInsightsSubscribeResponse>;

  /**
   * Unsubscribe from Monitoring Insights
   * @see /api/products/check/#cramonitoring_insightsunsubscribe
   */
  craMonitoringInsightsUnsubscribe: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    subscription_id: CraMonitoringInsightsSubscriptionId;
  }) => Promise<CraMonitoringInsightsUnsubscribeResponse>;

  /**
   * Retrieve a Monitoring Insights Report
   * @see /api/products/check/#cramonitoring_insightsget
   */
  craMonitoringInsightsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    consumer_report_permissible_purpose: MonitoringConsumerReportPermissiblePurpose;
    user_token?: UserToken;
  }) => Promise<CraMonitoringInsightsGetResponse>;

  /**
   * Update an Audit Copy Token
   * @see /none/
   */
  creditAuditCopyTokenUpdate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `audit_copy_token` you would like to update. */
    audit_copy_token: string;
    /** Array of tokens which the specified Audit Copy Token will be updated with. The types of token supported are asset report token and employment report token. There can be at most 1 of each token type in the array. */
    report_tokens: (AssetReportToken)[];
  }) => Promise<CreditAuditCopyTokenUpdateResponse>;

  /**
   * Retrieve cash flow insights from the bank accounts used for income verification
   * @see /api/products/income/#crapartner_insightsget
   */
  craPartnerInsightsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token: UserToken;
    user_tier?: CraUserTier;
  }) => Promise<CraPartnerInsightsGetResponse>;

  /**
   * Retrieve cash flow information from your user's banks
   * @see /api/products/check/#cracheck_reportincome_insightsget
   */
  craCheckReportIncomeInsightsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token?: UserToken;
    third_party_user_token?: ThirdPartyUserToken;
    user_id?: NewUserId;
    options?: CraCheckReportIncomeInsightsGetOptions;
  }) => Promise<CraCheckReportIncomeInsightsGetResponse>;

  /**
   * Retrieve a Base Report
   * @see /api/products/check/#cracheck_reportbase_reportget
   */
  craCheckReportBaseReportGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    third_party_user_token?: ThirdPartyUserToken;
    /** The item IDs to include in the Base Report. If not provided, all items associated with the user will be included. */
    item_ids?: (ItemId)[] | null;
    user_token?: UserToken;
    user_tier?: CraUserTier;
  }) => Promise<CraCheckReportBaseReportGetResponse>;

  /**
   * Retrieve Consumer Reports as a PDF
   * @see /api/products/check/#cracheck_reportpdfget
   */
  craCheckReportPdfGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    third_party_user_token?: ThirdPartyUserToken;
    /** Use this field to include other reports in the PDF. */
    add_ons?: (CraPdfAddOns)[];
    user_token?: UserToken;
  }) => Promise<CraCheckReportPdfGetResponse>;

  /**
   * Refresh or create a Consumer Report
   * @see /api/products/check/#cracheck_reportcreate
   */
  craCheckReportCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    user_token?: UserToken;
    /** The destination URL to which webhooks will be sent  */
    webhook: string;
    /** The number of days of data to request for the report. Default value is 365; maximum is 731; minimum is 180. If a value lower than 180 is provided, a minimum of 180 days of history will be requested. */
    days_requested: number;
    /** The minimum number of days of data required for the report to be successfully generated. */
    days_required?: number;
    /** Client-generated identifier, which can be used by lenders to track loan applications. */
    client_report_id?: string | null;
    /** Specifies a list of products that will be eagerly generated when creating the report (in addition to the Base Report, which is always eagerly generated). These products will be made available before a success webhook is sent. Use this option to minimize response latency for product `/get` endpoints. Note that specifying `cra_partner_insights` in this field will trigger a billable event. Other products are not billed until the respective reports are fetched via product-specific `/get` endpoints. */
    products?: (Products)[] | null;
    base_report?: CraCheckReportCreateBaseReportOptions;
    cashflow_insights?: CraCheckReportCashflowInsightsGetOptions;
    partner_insights?: CraCheckReportCreatePartnerInsightsOptions;
    lend_score?: CraCheckReportLendScoreGetOptions;
    network_insights?: CraCheckReportNetworkInsightsGetOptions;
    /** Indicates that investment data should be extracted from the linked account(s). */
    include_investments?: boolean | null;
    income_insights?: CraCheckReportIncomeInsightsGetOptions;
    consumer_report_permissible_purpose: ConsumerReportPermissiblePurpose;
  }) => Promise<CraCheckReportCreateResponse>;

  /**
   * Retrieve cash flow insights from partners
   * @see /api/products/check/#cracheck_reportpartner_insightsget
   */
  craCheckReportPartnerInsightsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    third_party_user_token?: ThirdPartyUserToken;
    user_token?: UserToken;
    user_tier?: CraUserTier;
    partner_insights?: CraCheckReportPartnerInsightsGetPartnerInsights;
    options?: CraCheckReportPartnerInsightsGetOptions;
  }) => Promise<CraCheckReportPartnerInsightsGetResponse>;

  /**
   * Retrieve cash flow insights from your user's banking data
   * @see /api/products/check/#cracheck_reportcashflow_insightsget
   */
  craCheckReportCashflowInsightsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    third_party_user_token?: ThirdPartyUserToken;
    user_token?: UserToken;
    options?: CraCheckReportCashflowInsightsGetOptions;
  }) => Promise<CraCheckReportCashflowInsightsGetResponse>;

  /**
   * Retrieve the LendScore from your user's banking data
   * @see /api/products/check/#cracheck_reportlend_scoreget
   */
  craCheckReportLendScoreGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    third_party_user_token?: ThirdPartyUserToken;
    user_token?: UserToken;
    options?: CraCheckReportLendScoreGetOptions;
  }) => Promise<CraCheckReportLendScoreGetResponse>;

  /**
   * Retrieve network attributes for the user
   * @see /api/products/check/#cracheck_reportnetwork_insightsget
   */
  craCheckReportNetworkInsightsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    options?: CraCheckReportNetworkInsightsGetOptions;
    third_party_user_token?: ThirdPartyUserToken;
    user_token?: UserToken;
  }) => Promise<CraCheckReportNetworkInsightsGetResponse>;

  /**
   * Retrieve various home lending reports for a user.
   * @see /api/products/check/#cracheck_reportverificationget
   */
  craCheckReportVerificationGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    /** Specifies which types of home lending reports are expected in the response */
    reports_requested: (CraCheckReportVerificationGetReportType)[];
    employment_refresh_options?: CraCheckReportVerificationGetEmploymentRefreshOptions;
    user_token?: UserToken;
  }) => Promise<CraCheckReportVerificationGetResponse>;

  /**
   * Retrieve Consumer Reports as a Verification PDF
   * @see /api/products/check/#cracheck_reportverificationpdfget
   */
  craCheckReportVerificationPdfGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    third_party_user_token?: ThirdPartyUserToken;
    report_requested: CraCheckReportVerificationPdfReportType;
    user_token?: UserToken;
  }) => Promise<CraCheckReportVerificationPdfGetResponse>;

  /**
   * Register loan applications and decisions.
   * @see /none/
   */
  craLoansApplicationsRegister: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A list of loan applications to register. */
    applications: (CraLoanApplication)[];
  }) => Promise<CraLoansApplicationsRegisterResponse>;

  /**
   * Register a list of loans to their applicants.
   * @see /none/
   */
  craLoansRegister: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A list of loans to register. */
    loans: (CraLoanRegister)[];
  }) => Promise<CraLoansRegisterResponse>;

  /**
   * Updates loan data.
   * @see /none/
   */
  craLoansUpdate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A list of loans to update. */
    loans: (CraLoanUpdate)[];
  }) => Promise<CraLoansUpdateResponse>;

  /**
   * Unregister a list of loans.
   * @see /none/
   */
  craLoansUnregister: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A list of loans to unregister. */
    loans: (CraLoanUnregister)[];
  }) => Promise<CraLoanUnregisterResponse>;

  /**
   * Retrieve the credit profile report for a user
   * @see /none/
   */
  craCreditProfileReportGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id: NewUserId;
    consumer_report_permissible_purpose: ConsumerReportPermissiblePurpose;
    /** Client-generated identifier, which can be used by lenders to track loan applications. */
    client_report_id: string;
    report_type: CraCreditProfileReportType;
    inquiry_type: CraCreditProfileInquiryType;
    version: CraCreditProfileReportVersion;
  }) => Promise<CraCreditProfileReportGetResponse>;

  /**
   * Retrieve a PDF Reports
   * @see /none/
   */
  consumerReportPdfGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token: UserToken;
  }) => Promise<ConsumerReportPdfGetResponse>;

  /**
   * Create or refresh an OAuth access token
   * @see /api/oauth/#oauthtoken
   */
  oauthToken: (input: {
    grant_type: OAuthGrantType;
    client_id?: ApiClientId;
    client_secret?: OauthApiSecret;
    secret?: OauthApiSecret;
    scope?: OAuthScope;
    refresh_token?: OAuthRefreshToken;
    /** URI of the target resource server */
    resource?: string;
    /** Used when exchanging a token. The meaning depends on the `subject_token_type`:  - For `urn:plaid:params:tokens:user`: Must be the same as the `client_id`. - For `urn:plaid:params:oauth:user-token`: The other `client_id` to exchange tokens to. - For `urn:plaid:params:credit:multi-user`:  a `client_id` or one of the supported CRA partner URNs: `urn:plaid:params:cra-partner:experian`, `urn:plaid:params:cra-partner:fannie-mae`, or `urn:plaid:params:cra-partner:freddie-mac`. */
    audience?: string;
    /** Token representing the subject. The `subject token` must be an OAuth refresh token issued from the `/oauth/token` endpoint. The meaning depends on the `subject_token_type`. */
    subject_token?: string;
    subject_token_type?: OAuthSubjectTokenType;
  }) => Promise<OAuthTokenResponse>;

  /**
   * Get metadata about an OAuth token
   * @see /api/oauth/#oauthintrospect
   */
  oauthIntrospect: (input: {
    token: OAuthAnyToken;
    client_id?: ApiClientId;
    client_secret?: OauthApiSecret;
    secret?: OauthApiSecret;
  }) => Promise<OAuthIntrospectResponse>;

  /**
   * Revoke an OAuth token
   * @see /api/oauth/#oauthrevoke
   */
  oauthRevoke: (input: {
    token: OAuthAnyToken;
    client_id?: ApiClientId;
    client_secret?: OauthApiSecret;
    secret?: OauthApiSecret;
  }) => Promise<OAuthRevokeResponse>;

  /**
   * Retrieve a list of all statements associated with an item.
   * @see /api/products/statements#statementslist
   */
  statementsList: (input: {
    access_token: AccessToken;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<StatementsListResponse>;

  /**
   * Retrieve a single statement.
   * @see /api/products/statements#statementsdownload
   */
  statementsDownload: (input: {
    access_token: AccessToken;
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Plaid's unique identifier for the statement. */
    statement_id: string;
  }) => Promise<StatementsDownloadResponse>;

  /**
   * Refresh statements data.
   * @see /api/products/statements#statementsrefresh
   */
  statementsRefresh: (input: {
    access_token: AccessToken;
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The start date for statements, in "YYYY-MM-DD" format, e.g. "2023-08-30". To determine whether a statement falls within the specified date range, Plaid will use the statement posted date. The statement posted date is typically either the last day of the statement period, or the following day. */
    start_date: string;
    /** The end date for statements, in "YYYY-MM-DD" format, e.g. "2023-10-30". You can request up to two years of data. To determine whether a statement falls within the specified date range, Plaid will use the statement posted date. The statement posted date is typically either the last day of the statement period, or the following day. */
    end_date: string;
  }) => Promise<StatementsRefreshResponse>;

  /**
   * List a historical log of item consent events
   * @see /api/consent/#consenteventsget
   */
  consentEventsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
  }) => Promise<ConsentEventsGetResponse>;

  /**
   * List a historical log of user consent events
   */
  itemActivityList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token?: AccessToken;
    /** Cursor used for pagination. */
    cursor?: string;
    count?: number;
  }) => Promise<ItemActivityListResponse>;

  /**
   * List a user’s connected applications
   */
  itemApplicationList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token?: AccessTokenNullable;
  }) => Promise<ItemApplicationListResponse>;

  /**
   * Unlink a user’s connected application
   * @see none
   */
  itemApplicationUnlink: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    application_id: ApplicationId;
  }) => Promise<ItemApplicationUnlinkResponse>;

  /**
   * Update the scopes of access for a particular application
   */
  itemApplicationScopesUpdate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    application_id: ApplicationId;
    scopes: Scopes;
    state?: ScopesState;
    context: ScopesContext;
  }) => Promise<ItemApplicationScopesUpdateResponse>;

  /**
   * Retrieve information about a Plaid application
   */
  applicationGet: (input: {
    client_id: ApiClientId;
    secret: ApiSecret;
    application_id: ApplicationId;
  }) => Promise<ApplicationGetResponse>;

  /**
   * Retrieve an Item
   * @see /api/items/#itemget
   */
  itemGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
  }) => Promise<ItemGetResponse>;

  /**
   * Retrieve User Account
   * @see /api/products/layer/#user_accountsessionget
   */
  userAccountSessionGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The public token generated by the end user Layer session. */
    public_token: string;
  }) => Promise<UserAccountSessionGetResponse>;

  /**
   * Send User Account Session Event
   * @see /api/products/layer/#user_accountsessioneventsend
   */
  userAccountSessionEventSend: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Optional cohort identifier for the user session. */
    cohort_id?: string;
    /** The Link session identifier. */
    link_session_id: string;
    event: UserAccountSessionEvent;
  }) => Promise<UserAccountSessionEventSendResponse>;

  /**
   * Check a user's Plaid Network status
   * @see /api/profile/#networkstatusget
   */
  profileNetworkStatusGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user: NetworkStatusGetUser;
  }) => Promise<ProfileNetworkStatusGetResponse>;

  /**
   * Check a user's Plaid Network status
   * @see /api/network/#networkstatusget
   */
  networkStatusGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user: NetworkStatusGetUser;
    /** The id of a template defined in Plaid Dashboard. This field is used if you have additional criteria that you want to check against (e.g. Layer eligibility). */
    template_id?: string;
  }) => Promise<NetworkStatusGetResponse>;

  /**
   * Retrieve auth data
   * @see /api/products/auth/#authget
   */
  authGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    options?: AuthGetRequestOptions;
  }) => Promise<AuthGetResponse>;

  /**
   * Verify auth data
   * @see /api/products/auth/#authverify
   */
  authVerify: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Account owner's legal name */
    legal_name?: string | null;
    numbers: AuthVerifyRequestNumbers;
  }) => Promise<AuthVerifyResponse>;

  /**
   * Get transaction data
   * @see /api/products/transactions/#transactionsget
   */
  transactionsGet: (input: {
    client_id?: ApiClientId;
    options?: TransactionsGetRequestOptions;
    access_token: AccessToken;
    secret?: ApiSecret;
    /** The earliest date for which data should be returned. Dates should be formatted as YYYY-MM-DD. */
    start_date: string;
    /** The latest date for which data should be returned. Dates should be formatted as YYYY-MM-DD. */
    end_date: string;
  }) => Promise<TransactionsGetResponse>;

  /**
   * Refresh transaction data
   * @see /api/products/transactions/#transactionsrefresh
   */
  transactionsRefresh: (input: {
    client_id?: ApiClientId;
    access_token: AccessToken;
    secret?: ApiSecret;
  }) => Promise<TransactionsRefreshResponse>;

  /**
   * Create sandbox transactions
   * @see /api/sandbox/#sandboxtransactionscreate
   */
  sandboxTransactionsCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    /** List of transactions to be added */
    transactions: (CustomSandboxTransaction)[];
  }) => Promise<SandboxTransactionsCreateResponse>;

  /**
   * Refresh transaction data in `cashflow_report`
   * @see /api/products/transactions/#cashflowReportRefresh
   */
  cashflowReportRefresh: (input: {
    client_id?: ApiClientId;
    access_token: AccessToken;
    secret?: ApiSecret;
    /** Number of days to retrieve transactions data for (1 to 730) */
    days_requested: number;
  }) => Promise<CashflowReportRefreshResponse>;

  /**
   * Gets transaction data in `cashflow_report`
   * @see /api/products/transactions/#cashflowReportGet
   */
  cashflowReportGet: (input: {
    client_id?: ApiClientId;
    access_token: AccessToken;
    secret?: ApiSecret;
    /** Number of days to retrieve transactions data for (1 to 730) */
    days_requested: number;
    /** Number of transactions to fetch per call */
    count?: number;
    /** The cursor value represents the last update requested. Pass in the empty string "" in the first call. */
    cursor?: string;
    options?: CashflowReportGetRequestOptions;
  }) => Promise<CashflowReportGetResponse>;

  /**
   * Gets transaction data in cashflow_report
   * @see /api/products/transactions/#cashflowReportTransactionsGet
   */
  cashflowReportTransactionsGet: (input: {
    client_id?: ApiClientId;
    access_token: AccessToken;
    secret?: ApiSecret;
    /** Number of transactions to fetch per call */
    count?: number;
    /** The cursor value represents the last update requested. Pass in the empty string "" in the first call. */
    cursor?: string;
    options?: CashflowReportTransactionsGetRequestOptions;
  }) => Promise<CashflowReportTransactionsGetResponse>;

  /**
   * Gets insights data in Cashflow Report
   * @see /api/products/transactions/#cashflowReportInsightsGet
   */
  cashflowReportInsightsGet: (input: {
    client_id?: ApiClientId;
    access_token: AccessToken;
    secret?: ApiSecret;
  }) => Promise<CashflowReportInsightsGetResponse>;

  /**
   * Fetch recurring transaction streams
   * @see /api/products/transactions/#transactionsrecurringget
   */
  transactionsRecurringGet: (input: {
    client_id?: ApiClientId;
    access_token: AccessToken;
    secret?: ApiSecret;
    options?: TransactionsRecurringGetRequestOptions;
    /** An optional list of `account_ids` to retrieve for the Item. Retrieves all active accounts on item if no `account_id`s are provided.  Note: An error will be returned if a provided `account_id` is not associated with the Item. */
    account_ids?: (string)[];
  }) => Promise<TransactionsRecurringGetResponse>;

  /**
   * Get incremental transaction updates on an Item
   * @see /api/products/transactions/#transactionssync
   */
  transactionsSync: (input: {
    client_id?: ApiClientId;
    access_token: AccessToken;
    secret?: ApiSecret;
    /** The cursor value represents the last update requested. Providing it will cause the response to only return changes after this update. If omitted, the entire history of updates will be returned, starting with the first-added transactions on the Item. The cursor also accepts the special value of `"now"`, which can be used to fast-forward the cursor as part of migrating an existing Item from `/transactions/get` to `/transactions/sync`. For more information, see the [Transactions sync migration guide](https://plaid.com/docs/transactions/sync-migration/). Note that using the `"now"` value is not supported for any use case other than migrating existing Items from `/transactions/get`.  The upper-bound length of this cursor is 256 characters of base64. */
    cursor?: string;
    /** The number of transaction updates to fetch. */
    count?: number;
    options?: TransactionsSyncRequestOptions;
  }) => Promise<TransactionsSyncResponse>;

  /**
   * Enrich locally-held transaction data
   * @see /api/products/enrich/#transactionsenrich
   */
  transactionsEnrich: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The account type for the requested transactions (either `depository` or `credit`). */
    account_type: string;
    /** An array of transaction objects to be enriched by Plaid. Maximum of 100 transactions per request. */
    transactions: (ClientProvidedTransaction)[];
    options?: TransactionsEnrichRequestOptions;
  }) => Promise<TransactionsEnrichResponse>;

  /**
   * Refresh user items for Transactions bundle
   * @see /api/products/transactions/#usertransactionsrefresh
   */
  userTransactionsRefresh: (input: {
    /** A Plaid-generated ID that identifies the end user. */
    user_id: string;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<UserTransactionsRefreshResponse>;

  /**
   * Refresh user items for Financial-Insights bundle
   * @see /api/products/transactions/#userfinancialdatarefresh
   */
  userFinancialDataRefresh: (input: {
    /** A Plaid-generated ID that identifies the end user. */
    user_id: string;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<UserFinancialDataRefreshResponse>;

  /**
   * Get details of all supported institutions
   * @see /api/institutions/#institutionsget
   */
  institutionsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The total number of Institutions to return. */
    count: number;
    /** The number of Institutions to skip. */
    offset: number;
    /** Specify which country or countries to include institutions from, using the ISO-3166-1 alpha-2 country code standard.  In API versions 2019-05-29 and earlier, the `country_codes` parameter is an optional parameter within the `options` object and will default to `[US]` if it is not supplied.  */
    country_codes: (CountryCode)[];
    options?: InstitutionsGetRequestOptions;
  }) => Promise<InstitutionsGetResponse>;

  /**
   * Search institutions
   * @see /api/institutions/#institutionssearch
   */
  institutionsSearch: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The search query. Institutions with names matching the query are returned */
    query: string;
    /** Filter the Institutions based on whether they support all products listed in `products`. Provide `null` to get institutions regardless of supported products. Note that when `auth` is specified as a product, if you are enabled for Instant Match or Automated Micro-deposits, institutions that support those products will be returned even if `auth` is not present in their product array. To search for Transfer support, use `auth`; to search for Signal Transaction Scores support, use `balance`. */
    products?: (Products)[] | null;
    /** Specify which country or countries to include institutions from, using the ISO-3166-1 alpha-2 country code standard. In API versions 2019-05-29 and earlier, the `country_codes` parameter is an optional parameter within the `options` object and will default to `[US]` if it is not supplied.  */
    country_codes: (CountryCode)[];
    options?: InstitutionsSearchRequestOptions;
  }) => Promise<InstitutionsSearchResponse>;

  /**
   * Get details of an institution
   * @see /api/institutions/#institutionsget_by_id
   */
  institutionsGetById: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the institution to get details about */
    institution_id: string;
    /** Specify which country or countries to include institutions from, using the ISO-3166-1 alpha-2 country code standard. In API versions 2019-05-29 and earlier, the `country_codes` parameter is an optional parameter within the `options` object and will default to `[US]` if it is not supplied.  */
    country_codes: (CountryCode)[];
    options?: InstitutionsGetByIdRequestOptions;
  }) => Promise<InstitutionsGetByIdResponse>;

  /**
   * Remove an Item
   * @see /api/items/#itemremove
   */
  itemRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    reason_code?: ItemRemoveReasonCode;
    /** Additional context or details about the reason for removing the item. Personally identifiable information, such as an email address or phone number, should not be included in the `reason_note`. */
    reason_note?: string | null;
  }) => Promise<ItemRemoveResponse>;

  /**
   * Terminate products for an Item
   * @see /api/items/#itemproductsterminate
   */
  itemProductsTerminate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    reason_code: ItemProductsTerminateReasonCode;
    /** Additional context or details about the reason for terminating products on the Item. Personally identifiable information, such as an email address or phone number, should not be included in the `reason_note`. */
    reason_note?: string | null;
  }) => Promise<ItemProductsTerminateResponse>;

  /**
   * Report fraud for an Item
   * @see /api/items/#itemhandlefraudreport
   */
  itemHandleFraudReport: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    /** The Plaid User ID associated with the report. */
    user_id?: string | null;
    incident_event?: ProtectIncidentEvent;
    report_confidence: ProtectReportConfidence;
    report_type: ProtectReportType;
    report_source: ProtectReportSource;
    bank_account?: ProtectBankAccount;
    /** Must be a valid ACH return code (e.g. `R01`), required if `report_type` is `ACH_RETURN`. */
    ach_return_code?: string | null;
    /** Additional context or details about the report, required if `report_type` is `OTHER`. */
    notes?: string | null;
  }) => Promise<ItemHandleFraudReportResponse>;

  /**
   * Retrieve accounts
   * @see /api/accounts/#accountsget
   */
  accountsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    options?: AccountsGetRequestOptions;
  }) => Promise<AccountsGetResponse>;

  /**
   * (Deprecated) Get legacy categories
   * @see /api/products/transactions/#categoriesget
   */
  categoriesGet: (input: {
    body: CategoriesGetRequest;
  }) => Promise<CategoriesGetResponse>;

  /**
   * Create a test Item and processor token
   * @see /api/sandbox/#sandboxprocessor_tokencreate
   */
  sandboxProcessorTokenCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the institution the Item will be associated with */
    institution_id: string;
    options?: SandboxProcessorTokenCreateRequestOptions;
  }) => Promise<SandboxProcessorTokenCreateResponse>;

  /**
   * Create a test Item
   * @see /api/sandbox/#sandboxpublic_tokencreate
   */
  sandboxPublicTokenCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the institution the Item will be associated with */
    institution_id: string;
    /** The products to initially pull for the Item. May be any products that the specified `institution_id` supports. This array may not be empty. */
    initial_products: (Products)[];
    options?: SandboxPublicTokenCreateRequestOptions;
    user_token?: UserToken;
    user_id?: NewUserId;
  }) => Promise<SandboxPublicTokenCreateResponse>;

  /**
   * Fire a test webhook
   * @see /api/sandbox/#sandboxitemfire_webhook
   */
  sandboxItemFireWebhook: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    webhook_type?: WebhookType;
    /** The webhook codes that can be fired by this test endpoint. */
    webhook_code: "DEFAULT_UPDATE" | "NEW_ACCOUNTS_AVAILABLE" | "SMS_MICRODEPOSITS_VERIFICATION" | "AUTHORIZATION_GRANTED" | "USER_PERMISSION_REVOKED" | "USER_ACCOUNT_REVOKED" | "PENDING_DISCONNECT" | "RECURRING_TRANSACTIONS_UPDATE" | "LOGIN_REPAIRED" | "SYNC_UPDATES_AVAILABLE" | "PRODUCT_READY" | "ERROR";
  }) => Promise<SandboxItemFireWebhookResponse>;

  /**
   * Retrieve real-time balance data
   * @see /api/products/signal/#accountsbalanceget
   */
  accountsBalanceGet: (input: {
    access_token: AccessToken;
    secret?: ApiSecret;
    client_id?: ApiClientId;
    options?: AccountsBalanceGetRequestOptions;
  }) => Promise<AccountsGetResponse>;

  /**
   * Retrieve identity data
   * @see /api/products/identity/#identityget
   */
  identityGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    options?: IdentityGetRequestOptions;
  }) => Promise<IdentityGetResponse>;

  /**
   * Returns uploaded document identity
   * @see /api/products/identity/#identitydocumentsuploadsget
   */
  identityDocumentsUploadsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    options?: IdentityDocumentsUploadsGetRequestOptions;
  }) => Promise<IdentityDocumentsUploadsGetResponse>;

  /**
   * Retrieve identity match score
   * @see /api/products/identity/#identitymatch
   */
  identityMatch: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    user?: IdentityMatchUser;
    options?: IdentityMatchRequestOptions;
  }) => Promise<IdentityMatchResponse>;

  /**
   * Refresh identity data
   * @see /api/products/identity/#identityrefresh
   */
  identityRefresh: (input: {
    client_id?: ApiClientId;
    access_token: AccessToken;
    secret?: ApiSecret;
  }) => Promise<IdentityRefreshResponse>;

  /**
   * Retrieve a dashboard user
   * @see /api/kyc-aml-users/#dashboard_userget
   */
  dashboardUserGet: (input: {
    dashboard_user_id: DashboardUserId;
    secret?: ApiSecret;
    client_id?: ApiClientId;
  }) => Promise<DashboardUserGetResponse>;

  /**
   * List dashboard users
   * @see /api/kyc-aml-users/#dashboard_userlist
   */
  dashboardUserList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    cursor?: Cursor;
  }) => Promise<DashboardUserListResponse>;

  /**
   * Create a new Identity Verification
   * @see /api/products/identity-verification/#identity_verificationcreate
   */
  identityVerificationCreate: (input: {
    client_user_id?: ClientUserId;
    user_id?: PlaidUserId;
    /** A flag specifying whether you would like Plaid to expose a shareable URL for the verification being created. */
    is_shareable: boolean;
    template_id: IdentityVerificationTemplateId;
    gave_consent: IdentityVerificationConsent;
    user?: IdentityVerificationCreateRequestUser;
    client_id?: ApiClientId;
    secret?: ApiSecret;
    is_idempotent?: IdempotencyFlag;
  }) => Promise<IdentityVerificationCreateResponse>;

  /**
   * Retrieve Identity Verification
   * @see /api/products/identity-verification/#identity_verificationget
   */
  identityVerificationGet: (input: {
    identity_verification_id: IdentityVerificationId;
    secret?: ApiSecret;
    client_id?: ApiClientId;
  }) => Promise<IdentityVerificationGetResponse>;

  /**
   * List Identity Verifications
   * @see /api/products/identity-verification/#identity_verificationlist
   */
  identityVerificationList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    template_id: IdentityVerificationTemplateId;
    client_user_id?: ClientUserId;
    /** A unique user identifier, created by calling `/user/create`. Either a `user_id` or the `client_user_id` must be provided. The `user_id` may only be used instead of the `client_user_id` if you were not a pre-existing user of `/user/create` as of December 10, 2025; for more details, see [New User APIs](https://plaid.com/docs/api/users/user-apis). If both this field and the `client_user_id` are present in the request, the `user_id` must have been created from the provided `client_user_id`. */
    user_id?: PlaidUserId | null;
    cursor?: Cursor;
  }) => Promise<IdentityVerificationListResponse>;

  /**
   * Retry an Identity Verification
   * @see /api/products/identity-verification/#identity_verificationretry
   */
  identityVerificationRetry: (input: {
    client_user_id: ClientUserId;
    template_id: IdentityVerificationTemplateId;
    strategy: Strategy;
    user?: IdentityVerificationRequestUser;
    steps?: IdentityVerificationRetryRequestStepsObject;
    /** A flag specifying whether you would like Plaid to expose a shareable URL for the verification being retried. If a value for this flag is not specified, the `is_shareable` setting from the original verification attempt will be used. */
    is_shareable?: boolean | null;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<IdentityVerificationRetryResponse>;

  /**
   * Create a watchlist screening for an entity
   * @see /api/products/monitor/#watchlist_screeningentitycreate
   */
  watchlistScreeningEntityCreate: (input: {
    search_terms: EntityWatchlistSearchTerms;
    client_user_id?: ClientUserId;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<WatchlistScreeningEntityCreateResponse>;

  /**
   * Get an entity screening
   * @see /api/products/monitor/#watchlist_screeningentityget
   */
  watchlistScreeningEntityGet: (input: {
    entity_watchlist_screening_id: EntityWatchlistScreeningId;
    secret?: ApiSecret;
    client_id?: ApiClientId;
  }) => Promise<WatchlistScreeningEntityGetResponse>;

  /**
   * List history for entity watchlist screenings
   * @see /api/products/monitor/#watchlist_screeningentityhistorylist
   */
  watchlistScreeningEntityHistoryList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    entity_watchlist_screening_id: EntityWatchlistScreeningId;
    cursor?: Cursor;
  }) => Promise<WatchlistScreeningEntityHistoryListResponse>;

  /**
   * List hits for entity watchlist screenings
   * @see /api/products/monitor/#watchlist_screeningentityhitlist
   */
  watchlistScreeningEntityHitList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    entity_watchlist_screening_id: EntityWatchlistScreeningId;
    cursor?: Cursor;
  }) => Promise<WatchlistScreeningEntityHitListResponse>;

  /**
   * List entity watchlist screenings
   * @see /api/products/monitor/#watchlist_screeningentitylist
   */
  watchlistScreeningEntityList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    entity_watchlist_program_id: EntityWatchlistProgramId;
    client_user_id?: ClientUserId;
    status?: WatchlistScreeningStatus;
    assignee?: DashboardUserId;
    cursor?: Cursor;
  }) => Promise<WatchlistScreeningEntityListResponse>;

  /**
   * Get entity watchlist screening program
   * @see /api/products/monitor/#watchlist_screeningentityprogramget
   */
  watchlistScreeningEntityProgramGet: (input: {
    entity_watchlist_program_id: EntityWatchlistProgramId;
    secret?: ApiSecret;
    client_id?: ApiClientId;
  }) => Promise<WatchlistScreeningEntityProgramGetResponse>;

  /**
   * List entity watchlist screening programs
   * @see /api/products/monitor/#watchlist_screeningentityprogramlist
   */
  watchlistScreeningEntityProgramList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    cursor?: Cursor;
  }) => Promise<WatchlistScreeningEntityProgramListResponse>;

  /**
   * Create a review for an entity watchlist screening
   * @see /api/products/monitor/#watchlist_screeningentityreviewcreate
   */
  watchlistScreeningEntityReviewCreate: (input: {
    /** Hits to mark as a true positive after thorough manual review. These hits will never recur or be updated once dismissed. In most cases, confirmed hits indicate that the customer should be rejected. */
    confirmed_hits: (EntityWatchlistScreeningHitId)[];
    /** Hits to mark as a false positive after thorough manual review. These hits will never recur or be updated once dismissed. */
    dismissed_hits: (EntityWatchlistScreeningHitId)[];
    comment?: ReviewComment;
    client_id?: ApiClientId;
    secret?: ApiSecret;
    entity_watchlist_screening_id: EntityWatchlistScreeningId;
  }) => Promise<WatchlistScreeningEntityReviewCreateResponse>;

  /**
   * List reviews for entity watchlist screenings
   * @see /api/products/monitor/#watchlist_screeningentityreviewlist
   */
  watchlistScreeningEntityReviewList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    entity_watchlist_screening_id: EntityWatchlistScreeningId;
    cursor?: Cursor;
  }) => Promise<WatchlistScreeningEntityReviewListResponse>;

  /**
   * Update an entity screening
   * @see /api/products/monitor/#watchlist_screeningentityupdate
   */
  watchlistScreeningEntityUpdate: (input: {
    entity_watchlist_screening_id: EntityWatchlistScreeningId;
    search_terms?: UpdateEntityScreeningRequestSearchTerms;
    assignee?: DashboardUserId;
    status?: WatchlistScreeningStatus;
    client_user_id?: ClientUserId;
    client_id?: ApiClientId;
    secret?: ApiSecret;
    reset_fields?: WatchlistScreeningEntityUpdateRequestResettableFieldList;
  }) => Promise<WatchlistScreeningEntityUpdateResponse>;

  /**
   * Create a watchlist screening for a person
   * @see /api/products/monitor/#watchlist_screeningindividualcreate
   */
  watchlistScreeningIndividualCreate: (input: {
    search_terms: WatchlistScreeningRequestSearchTerms;
    client_user_id?: ClientUserId;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<WatchlistScreeningIndividualCreateResponse>;

  /**
   * Retrieve an individual watchlist screening
   * @see /api/products/monitor/#watchlist_screeningindividualget
   */
  watchlistScreeningIndividualGet: (input: {
    watchlist_screening_id: WatchlistScreeningIndividualId;
    secret?: ApiSecret;
    client_id?: ApiClientId;
  }) => Promise<WatchlistScreeningIndividualGetResponse>;

  /**
   * List history for individual watchlist screenings
   * @see /api/products/monitor/#watchlist_screeningindividualhistorylist
   */
  watchlistScreeningIndividualHistoryList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    watchlist_screening_id: WatchlistScreeningIndividualId;
    cursor?: Cursor;
  }) => Promise<WatchlistScreeningIndividualHistoryListResponse>;

  /**
   * List hits for individual watchlist screening
   * @see /api/products/monitor/#watchlist_screeningindividualhitlist
   */
  watchlistScreeningIndividualHitList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    watchlist_screening_id: WatchlistScreeningIndividualId;
    cursor?: Cursor;
  }) => Promise<WatchlistScreeningIndividualHitListResponse>;

  /**
   * List Individual Watchlist Screenings
   * @see /api/products/monitor/#watchlist_screeningindividuallist
   */
  watchlistScreeningIndividualList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    watchlist_program_id: WatchlistProgramId;
    client_user_id?: ClientUserId;
    status?: WatchlistScreeningStatus;
    assignee?: DashboardUserId;
    cursor?: Cursor;
  }) => Promise<WatchlistScreeningIndividualListResponse>;

  /**
   * Get individual watchlist screening program
   * @see /api/products/monitor/#watchlist_screeningindividualprogramget
   */
  watchlistScreeningIndividualProgramGet: (input: {
    watchlist_program_id: WatchlistProgramId;
    secret?: ApiSecret;
    client_id?: ApiClientId;
  }) => Promise<WatchlistScreeningIndividualProgramGetResponse>;

  /**
   * List individual watchlist screening programs
   * @see /api/products/monitor/#watchlist_screeningindividualprogramlist
   */
  watchlistScreeningIndividualProgramList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    cursor?: Cursor;
  }) => Promise<WatchlistScreeningIndividualProgramListResponse>;

  /**
   * Create a review for an individual watchlist screening
   * @see /api/products/monitor/#watchlist_screeningindividualreviewcreate
   */
  watchlistScreeningIndividualReviewCreate: (input: {
    /** Hits to mark as a true positive after thorough manual review. These hits will never recur or be updated once dismissed. In most cases, confirmed hits indicate that the customer should be rejected. */
    confirmed_hits: (WatchlistScreeningHitId)[];
    /** Hits to mark as a false positive after thorough manual review. These hits will never recur or be updated once dismissed. */
    dismissed_hits: (WatchlistScreeningHitId)[];
    comment?: ReviewComment;
    client_id?: ApiClientId;
    secret?: ApiSecret;
    watchlist_screening_id: WatchlistScreeningIndividualId;
  }) => Promise<WatchlistScreeningIndividualReviewCreateResponse>;

  /**
   * List reviews for individual watchlist screenings
   * @see /api/products/monitor/#watchlist_screeningindividualreviewlist
   */
  watchlistScreeningIndividualReviewList: (input: {
    secret?: ApiSecret;
    client_id?: ApiClientId;
    watchlist_screening_id: WatchlistScreeningIndividualId;
    cursor?: Cursor;
  }) => Promise<WatchlistScreeningIndividualReviewListResponse>;

  /**
   * Update individual watchlist screening
   * @see /api/products/monitor/#watchlist_screeningindividualupdate
   */
  watchlistScreeningIndividualUpdate: (input: {
    watchlist_screening_id: WatchlistScreeningIndividualId;
    search_terms?: UpdateIndividualScreeningRequestSearchTerms;
    assignee?: DashboardUserId;
    status?: WatchlistScreeningStatus;
    client_user_id?: ClientUserId;
    client_id?: ApiClientId;
    secret?: ApiSecret;
    reset_fields?: WatchlistScreeningIndividualUpdateRequestResettableFieldList;
  }) => Promise<WatchlistScreeningIndividualUpdateResponse>;

  /**
   * Evaluate risk of a bank account
   * @see none
   */
  beaconAccountRiskEvaluate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token?: AccessToken;
    options?: BeaconAccountRiskEvaluateRequestOptions;
    /** A unique ID that identifies the end user in your system. This ID is used to correlate requests by a user with multiple evaluations and/or multiple linked accounts. Personally identifiable information, such as an email address or phone number, should not be used in the `client_user_id`. */
    client_user_id?: string;
    /** Unique identifier of what you are looking to evaluate (account add, information change, etc.) to allow us to tie the activity to the decisions and possible fraud outcome sent via our feedback endpoints. You can use your internal request ID or similar. */
    client_evaluation_id?: string;
    evaluation_reason?: BeaconAccountRiskEvaluateEvaluationReason;
    device?: SignalDevice;
    /** The time the event for evaluation has occurred. Populate this field for backfilling data. If you don’t populate this field, we’ll use the timestamp at the time of receipt. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ). */
    evaluate_time?: string;
  }) => Promise<BeaconAccountRiskEvaluateResponse>;

  /**
   * Create a Beacon User
   * @see /api/products/beacon/#beaconusercreate
   */
  beaconUserCreate: (input: {
    program_id: BeaconProgramId;
    client_user_id: ClientUserId;
    user: BeaconUserRequestData;
    /** Send this array of access tokens to link accounts to the Beacon User and have them evaluated for Account Insights. A maximum of 50 accounts total can be added to a single Beacon User. */
    access_tokens?: (AccessToken)[] | null;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconUserCreateResponse>;

  /**
   * Get a Beacon User
   * @see /api/products/beacon/#beaconuserget
   */
  beaconUserGet: (input: {
    beacon_user_id: BeaconUserId;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconUserGetResponse>;

  /**
   * Review a Beacon User
   * @see /api/products/beacon/#beaconuserreview
   */
  beaconUserReview: (input: {
    beacon_user_id: BeaconUserId;
    status: BeaconUserStatus;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconUserGetResponse>;

  /**
   * Create a Beacon Report
   * @see /api/products/beacon/#beaconreportcreate
   */
  beaconReportCreate: (input: {
    beacon_user_id: BeaconUserId;
    type: BeaconReportCreateType;
    fraud_date: Iso8601Date;
    fraud_amount?: FraudAmount;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconReportCreateResponse>;

  /**
   * List Beacon Reports for a Beacon User
   * @see /api/products/beacon/#beaconreportlist
   */
  beaconReportList: (input: {
    beacon_user_id: BeaconUserId;
    cursor?: Cursor;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconReportListResponse>;

  /**
   * List Beacon Report Syndications for a Beacon User
   * @see /api/products/beacon/#beaconreport_syndicationlist
   */
  beaconReportSyndicationList: (input: {
    beacon_user_id: BeaconUserId;
    cursor?: Cursor;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconReportSyndicationListResponse>;

  /**
   * Get a Beacon Report
   * @see /api/products/beacon/#beaconreportget
   */
  beaconReportGet: (input: {
    beacon_report_id: BeaconReportId;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconReportGetResponse>;

  /**
   * Get a Beacon Report Syndication
   * @see /api/products/beacon/#beaconreport_syndicationget
   */
  beaconReportSyndicationGet: (input: {
    beacon_report_syndication_id: BeaconReportSyndicationId;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconReportSyndicationGetResponse>;

  /**
   * Update the identity data of a Beacon User
   * @see /api/products/beacon/#beaconuserupdate
   */
  beaconUserUpdate: (input: {
    beacon_user_id: BeaconUserId;
    user?: BeaconUserUpdateRequestData;
    /** Send this array of access tokens to add accounts to this user for evaluation. This will add accounts to this Beacon User. If left null only existing accounts will be returned in response. A maximum of 50 accounts total can be added to a Beacon User. */
    access_tokens?: (AccessToken)[] | null;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconUserUpdateResponse>;

  /**
   * Get a Beacon Duplicate
   * @see /api/products/beacon/#beaconduplicateget
   */
  beaconDuplicateGet: (input: {
    beacon_duplicate_id: BeaconDuplicateId;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconDuplicateGetResponse>;

  /**
   * Create autofill for an Identity Verification
   * @see /api/products/identity-verification/#identity_verificationautofillcreate
   */
  identityVerificationAutofillCreate: (input: {
    identity_verification_id: IdentityVerificationId;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<IdentityVerificationAutofillCreateResponse>;

  /**
   * List a Beacon User's history
   * @see /api/products/beacon/#beaconuserhistorylist
   */
  beaconUserHistoryList: (input: {
    beacon_user_id: BeaconUserId;
    cursor?: Cursor;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconUserHistoryListResponse>;

  /**
   * Get Account Insights for a Beacon User
   * @see /api/products/beacon/#beaconuseraccount_insightsget
   */
  beaconUserAccountInsightsGet: (input: {
    beacon_user_id: BeaconUserId;
    access_token: AccessToken;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BeaconUserAccountInsightsGetResponse>;

  /**
   * Get Protect user insights
   * @see /api/products/protect/#protectuserinsightsget
   */
  protectUserInsightsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The Plaid User ID. Either `user_id` or `client_user_id` must be provided. */
    user_id?: string;
    /** A unique ID representing the end user. Either `user_id` or `client_user_id` must be provided. */
    client_user_id?: string;
  }) => Promise<ProtectUserInsightsGetResponse>;

  /**
   * Create a Protect report
   * @see /api/products/protect/#protectreportcreate
   */
  protectReportCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The Plaid User ID associated with the report. */
    user_id?: string;
    incident_event?: ProtectIncidentEvent;
    report_confidence: ProtectReportConfidence;
    report_type: ProtectReportType;
    report_source: ProtectReportSource;
    bank_account?: ProtectBankAccount;
    /** Must be a valid ACH return code (e.g. `R01`), required if `report_type` is `ACH_RETURN`. */
    ach_return_code?: string | null;
    /** Additional context or details about the report, required if `report_type` is `OTHER`. */
    notes?: string | null;
  }) => Promise<ProtectReportCreateResponse>;

  /**
   * Compute Protect Trust Index Score
   * @see /api/products/protect/#protectcompute
   */
  protectCompute: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The name of the Trust Index model to use for calculating the Trust Index Score, with a major.minor version suffix. Examples include `ti-link-session-2.0` and `ti-identity-2.0`. The model specified may require certain fields within `model_inputs`. For example, `ti-link-session-2.0` requires the `link` field to be provided in `model_inputs`. */
    model: string;
    user: ProtectUser;
    model_inputs?: ProtectModelInputs;
  }) => Promise<ProtectComputeResponse>;

  /**
   * Send a new event to enrich user data
   * @see none
   */
  protectEventSend: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Timestamp of the event. Might be the current moment or a time in the past. In [ISO 8601](https://wikipedia.org/wiki/ISO_8601) format, e.g. `"2017-09-14T14:42:19.350Z"` */
    timestamp?: string;
    event: ProtectEvent;
    /** Protect Session ID should be provided for any event correlated with a frontend user session started via the Protect SDK. */
    protect_session_id?: string;
    /** Whether this event should be scored with Trust Index. The default is false. */
    request_trust_index?: boolean;
  }) => Promise<ProtectEventSendResponse>;

  /**
   * Get information about a user event
   * @see none
   */
  protectEventGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The event ID to retrieve information for. */
    event_id: string;
  }) => Promise<ProtectEventGetResponse>;

  /**
   * Get a business verification
   * @see /api/products/business-verification/#businessverificationget
   */
  businessVerificationGet: (input: {
    business_verification_id: BusinessVerificationId;
    secret?: ApiSecret;
    client_id?: ApiClientId;
  }) => Promise<BusinessVerificationGetResponse>;

  /**
   * Create a business verification
   * @see /api/products/business-verification/#businessverificationcreate
   */
  businessVerificationCreate: (input: {
    client_user_id: ClientUserId;
    business?: BusinessVerificationCreateRequestBusiness;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BusinessVerificationCreateResponse>;

  /**
   * Retrieve Auth data
   * @see /api/processor-partners/#processorauthget
   */
  processorAuthGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
  }) => Promise<ProcessorAuthGetResponse>;

  /**
   * Retrieve the account associated with a processor token
   * @see /api/processor-partners/#processoraccountget
   */
  processorAccountGet: (input: {
    client_id?: ApiClientId;
    processor_token: ProcessorToken;
    secret?: ApiSecret;
  }) => Promise<ProcessorAccountGetResponse>;

  /**
   * Retrieve Investment Holdings
   * @see /api/processor-partners/#processorinvestmentsholdingsget
   */
  processorInvestmentsHoldingsGet: (input: {
    client_id?: ApiClientId;
    processor_token: ProcessorToken;
    secret?: ApiSecret;
  }) => Promise<ProcessorInvestmentsHoldingsGetResponse>;

  /**
   * Get investment account authentication data
   * @see /api/processor-partners/#processorinvestmentsauthget
   */
  processorInvestmentsAuthGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
  }) => Promise<ProcessorInvestmentsAuthGetResponse>;

  /**
   * Get investment transactions data
   * @see /api/processor-partners/#processorinvestmentstransactionsget
   */
  processorInvestmentsTransactionsGet: (input: {
    client_id?: ApiClientId;
    options?: InvestmentsTransactionsGetRequestOptions;
    processor_token: ProcessorToken;
    secret?: ApiSecret;
    /** The earliest date for which data should be returned. Dates should be formatted as YYYY-MM-DD. */
    start_date: string;
    /** The latest date for which data should be returned. Dates should be formatted as YYYY-MM-DD. */
    end_date: string;
  }) => Promise<ProcessorInvestmentsTransactionsGetResponse>;

  /**
   * Get transaction data
   * @see /api/processor-partners/#processortransactionsget
   */
  processorTransactionsGet: (input: {
    client_id?: ApiClientId;
    options?: ProcessorTransactionsGetRequestOptions;
    processor_token: ProcessorToken;
    secret?: ApiSecret;
    /** The earliest date for which data should be returned. Dates should be formatted as YYYY-MM-DD. */
    start_date: string;
    /** The latest date for which data should be returned. Dates should be formatted as YYYY-MM-DD. */
    end_date: string;
  }) => Promise<ProcessorTransactionsGetResponse>;

  /**
   * Get incremental transaction updates on a processor token
   * @see /api/processor-partners/#processortransactionssync
   */
  processorTransactionsSync: (input: {
    client_id?: ApiClientId;
    processor_token: ProcessorToken;
    secret?: ApiSecret;
    /** The cursor value represents the last update requested. Providing it will cause the response to only return changes after this update. If omitted, the entire history of updates will be returned, starting with the first-added transactions on the item. Note: The upper-bound length of this cursor is 256 characters of base64. */
    cursor?: string;
    /** The number of transaction updates to fetch. */
    count?: number;
    options?: TransactionsSyncRequestOptions;
  }) => Promise<ProcessorTransactionsSyncResponse>;

  /**
   * Refresh transaction data
   * @see /api/processor-partners/#processortransactionsrefresh
   */
  processorTransactionsRefresh: (input: {
    client_id?: ApiClientId;
    processor_token: ProcessorToken;
    secret?: ApiSecret;
  }) => Promise<ProcessorTransactionsRefreshResponse>;

  /**
   * Fetch recurring transaction streams
   * @see /api/processor-partners/#processortransactionsrecurringget
   */
  processorTransactionsRecurringGet: (input: {
    client_id?: ApiClientId;
    processor_token: ProcessorToken;
    secret?: ApiSecret;
    options?: TransactionsRecurringGetRequestOptions;
  }) => Promise<ProcessorTransactionsRecurringGetResponse>;

  /**
   * Evaluate a planned ACH transaction
   * @see /api/processor-partners/#processorsignalevaluate
   */
  processorSignalEvaluate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
    /** The unique ID that you would like to use to refer to this transaction. For your convenience mapping your internal data, you could use your internal ID/identifier for this transaction. The max length for this field is 36 characters. */
    client_transaction_id: string;
    /** The transaction amount, in USD (e.g. `102.05`) */
    amount: number;
    /** `true` if the end user is present while initiating the ACH transfer and the endpoint is being called; `false` otherwise (for example, when the ACH transfer is scheduled and the end user is not present, or you call this endpoint after the ACH transfer but before submitting the Nacha file for ACH processing). */
    user_present?: boolean | null;
    /** A unique ID that identifies the end user in your system. This ID is used to correlate requests by a user with multiple Items. Personally identifiable information, such as an email address or phone number, should not be used in the `client_user_id`. */
    client_user_id?: string;
    /** **true** if the ACH transaction is a recurring transaction; **false** otherwise  */
    is_recurring?: boolean | null;
    /** The default ACH or non-ACH payment method to complete the transaction. `SAME_DAY_ACH`: Same Day ACH by Nacha. The debit transaction is processed and settled on the same day. `STANDARD_ACH`: standard ACH by Nacha. `MULTIPLE_PAYMENT_METHODS`: if there is no default debit rail or there are multiple payment methods. Possible values:  `SAME_DAY_ACH`, `STANDARD_ACH`, `MULTIPLE_PAYMENT_METHODS` */
    default_payment_method?: string | null;
    user?: SignalUser;
    device?: SignalDevice;
    /** The key of the ruleset to use for this transaction. You can configure a ruleset using the Plaid Dashboard, under [Signal->Rules](https://dashboard.plaid.com/signal/risk-profiles). If not provided, for customers who began using Signal Transaction Scores before October 15, 2025, by default, no ruleset will be used; for customers who began using Signal Transaction Scores after that date, or for Balance customers, the `default` ruleset will be used. For more details, or to opt out of using a ruleset, see [Signal Rules](https://plaid.com/docs/signal/signal-rules/). */
    ruleset_key?: string | null;
  }) => Promise<ProcessorSignalEvaluateResponse>;

  /**
   * Report whether you initiated an ACH transaction
   * @see /api/processor-partners/#processorsignaldecisionreport
   */
  processorSignalDecisionReport: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
    /** Must be the same as the `client_transaction_id` supplied when calling `/processor/signal/evaluate` */
    client_transaction_id: string;
    /** `true` if the ACH transaction was initiated, `false` otherwise.  This field must be returned as a boolean. If formatted incorrectly, this will result in an [`INVALID_FIELD`](https://plaid.com/docs/errors/invalid-request/#invalid_field) error. */
    initiated: boolean;
    /** The actual number of days (hold time) since the ACH debit transaction that you wait before making funds available to your customers. The holding time could affect the ACH return rate.  For example, use 0 if you make funds available to your customers instantly or the same day following the debit transaction, or 1 if you make funds available the next day following the debit initialization. */
    days_funds_on_hold?: number | null;
    decision_outcome?: SignalDecisionOutcome;
    payment_method?: SignalPaymentMethod;
    /** The amount (in USD) made available to your customers instantly following the debit transaction. It could be a partial amount of the requested transaction (example: 102.05). */
    amount_instantly_available?: number | null;
  }) => Promise<ProcessorSignalDecisionReportResponse>;

  /**
   * Report a return for an ACH transaction
   * @see /api/processor-partners/#processorsignalreturnreport
   */
  processorSignalReturnReport: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
    /** Must be the same as the `client_transaction_id` supplied when calling `/processor/signal/evaluate` */
    client_transaction_id: string;
    /** Must be a valid ACH return code (e.g. "R01")  If formatted incorrectly, this will result in an [`INVALID_FIELD`](https://plaid.com/docs/errors/invalid-request/#invalid_field) error. */
    return_code: string;
    /** Date and time when you receive the returns from your payment processors, in ISO 8601 format (`YYYY-MM-DDTHH:mm:ssZ`). */
    returned_at?: string | null;
  }) => Promise<ProcessorSignalReturnReportResponse>;

  /**
   * Opt-in a processor token to Signal
   * @see /api/processor-partners/#processorsignalprepare
   */
  processorSignalPrepare: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
  }) => Promise<ProcessorSignalPrepareResponse>;

  /**
   * Create a bank transfer as a processor
   * @see /api/processor-partners/#bank_transfercreate
   */
  processorBankTransferCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    idempotency_key: BankTransferIdempotencyKey;
    processor_token: ProcessorToken;
    type: BankTransferType;
    network: BankTransferNetwork;
    amount: BankTransferAmount;
    /** The currency of the transfer amount – should be set to "USD". */
    iso_currency_code: string;
    /** The transfer description. Maximum of 10 characters. */
    description: string;
    ach_class?: AchClass;
    user: BankTransferUser;
    /** An arbitrary string provided by the client for storage with the bank transfer. May be up to 100 characters. */
    custom_tag?: string | null;
    metadata?: BankTransferMetadata;
    /** Plaid’s unique identifier for the origination account for this transfer. If you have more than one origination account, this value must be specified. */
    origination_account_id?: string | null;
  }) => Promise<ProcessorBankTransferCreateResponse>;

  /**
   * Retrieve Liabilities data
   * @see /api/processor-partners/#processorliabilitiesget
   */
  processorLiabilitiesGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
  }) => Promise<ProcessorLiabilitiesGetResponse>;

  /**
   * Retrieve Identity data
   * @see /api/processor-partners/#processoridentityget
   */
  processorIdentityGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
  }) => Promise<ProcessorIdentityGetResponse>;

  /**
   * Retrieve identity match score
   * @see /api/processor-partners/#processoridentitymatch
   */
  processorIdentityMatch: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
    user?: IdentityMatchUser;
  }) => Promise<ProcessorIdentityMatchResponse>;

  /**
   * Retrieve Balance data
   * @see /api/processor-partners/#processorbalanceget
   */
  processorBalanceGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
    options?: ProcessorBalanceGetRequestOptions;
  }) => Promise<ProcessorBalanceGetResponse>;

  /**
   * Update Webhook URL
   * @see /api/items/#itemwebhookupdate
   */
  itemWebhookUpdate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    /** The new webhook URL to associate with the Item. To remove a webhook from an Item, set to `null`. */
    webhook?: string | null;
  }) => Promise<ItemWebhookUpdateResponse>;

  /**
   * Invalidate access_token
   * @see /api/items/#itemaccess_tokeninvalidate
   */
  itemAccessTokenInvalidate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
  }) => Promise<ItemAccessTokenInvalidateResponse>;

  /**
   * Get webhook verification key
   * @see /api/webhooks/webhook-verification/#get-webhook-verification-key
   */
  webhookVerificationKeyGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The key ID ( `kid` ) from the JWT header. */
    key_id: string;
  }) => Promise<WebhookVerificationKeyGetResponse>;

  /**
   * Retrieve Liabilities data
   * @see /api/products/liabilities/#liabilitiesget
   */
  liabilitiesGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    options?: LiabilitiesGetRequestOptions;
  }) => Promise<LiabilitiesGetResponse>;

  /**
   * Create payment recipient
   * @see /api/products/payment-initiation/#payment_initiationrecipientcreate
   */
  paymentInitiationRecipientCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The name of the recipient. We recommend using strings of length 18 or less and avoid special characters to ensure compatibility with all institutions. */
    name: string;
    /** The International Bank Account Number (IBAN) for the recipient. If BACS data is not provided, an IBAN is required. */
    iban?: string | null;
    bacs?: RecipientBacsNullable;
    address?: PaymentInitiationAddress;
  }) => Promise<PaymentInitiationRecipientCreateResponse>;

  /**
   * Reverse an existing payment
   * @see /api/products/payment-initiation/#payment_initiationpaymentreverse
   */
  paymentInitiationPaymentReverse: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the payment to reverse */
    payment_id: string;
    idempotency_key: WalletTransactionIdempotencyKey;
    /** A reference for the refund. This must be an alphanumeric string with 6 to 18 characters and must not contain any special characters or spaces. */
    reference: string;
    amount?: PaymentAmountToRefund;
    /** The counterparty's birthdate, in [ISO 8601](https://wikipedia.org/wiki/ISO_8601) (YYYY-MM-DD) format. */
    counterparty_date_of_birth?: string | null;
    counterparty_address?: PaymentInitiationAddress;
  }) => Promise<PaymentInitiationPaymentReverseResponse>;

  /**
   * Get payment recipient
   * @see /api/products/payment-initiation/#payment_initiationrecipientget
   */
  paymentInitiationRecipientGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the recipient */
    recipient_id: string;
  }) => Promise<PaymentInitiationRecipientGetResponse>;

  /**
   * List payment recipients
   * @see /api/products/payment-initiation/#payment_initiationrecipientlist
   */
  paymentInitiationRecipientList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The maximum number of recipients to return. If `count` is not specified, a maximum of 100 recipients will be returned, beginning with the recipient at the cursor (if specified). */
    count?: number | null;
    /** A value representing the latest recipient to be included in the response. Set this from `next_cursor` received from the previous `/payment_initiation/recipient/list` request. If provided, the response will only contain that recipient and recipients created before it. If omitted, the response will contain recipients starting from the most recent, and in descending order by the `created_at` time. */
    cursor?: string;
  }) => Promise<PaymentInitiationRecipientListResponse>;

  /**
   * Create a payment
   * @see /api/products/payment-initiation/#payment_initiationpaymentcreate
   */
  paymentInitiationPaymentCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the recipient the payment is for. */
    recipient_id: string;
    /** A reference for the payment. This must be an alphanumeric string with at most 18 characters and must not contain any special characters (since not all institutions support them). In order to track settlement via Payment Confirmation, each payment must have a unique reference. If the reference provided through the API is not unique, Plaid will adjust it. Some institutions may limit the reference to less than 18 characters. If necessary, Plaid will adjust the reference by truncating it to fit the institution's requirements. Both the originally provided and automatically adjusted references (if any) can be found in the `reference` and `adjusted_reference` fields, respectively. */
    reference: string;
    amount: PaymentAmount;
    schedule?: ExternalPaymentScheduleRequest;
    options?: ExternalPaymentOptions;
  }) => Promise<PaymentInitiationPaymentCreateResponse>;

  /**
   * Create payment token
   * @see /link/maintain-legacy-integration/#creating-a-payment-token
   */
  createPaymentToken: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `payment_id` returned from `/payment_initiation/payment/create`. */
    payment_id: string;
  }) => Promise<PaymentInitiationPaymentTokenCreateResponse>;

  /**
   * Create payment consent
   * @see /api/products/payment-initiation/#payment_initiationconsentcreate
   */
  paymentInitiationConsentCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the recipient the payment consent is for. The created consent can be used to transfer funds to this recipient only. */
    recipient_id: string;
    /** A reference for the payment consent. This must be an alphanumeric string with at most 18 characters and must not contain any special characters. */
    reference: string;
    /** An array of payment consent scopes. */
    scopes?: (PaymentInitiationConsentScope)[];
    type?: PaymentInitiationConsentType;
    constraints: PaymentInitiationConsentConstraints;
    options?: ExternalPaymentInitiationConsentOptions;
    payer_details?: PaymentInitiationConsentPayerDetails;
  }) => Promise<PaymentInitiationConsentCreateResponse>;

  /**
   * Get payment consent
   * @see /api/products/payment-initiation/#payment_initiationconsentget
   */
  paymentInitiationConsentGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `consent_id` returned from `/payment_initiation/consent/create`. */
    consent_id: string;
  }) => Promise<PaymentInitiationConsentGetResponse>;

  /**
   * Revoke payment consent
   * @see /api/products/payment-initiation/#payment_initiationconsentrevoke
   */
  paymentInitiationConsentRevoke: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The consent ID. */
    consent_id: string;
  }) => Promise<PaymentInitiationConsentRevokeResponse>;

  /**
   * Execute a single payment using consent
   * @see /api/products/payment-initiation/#payment_initiationconsentpaymentexecute
   */
  paymentInitiationConsentPaymentExecute: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The consent ID. */
    consent_id: string;
    amount: PaymentAmount;
    idempotency_key: ConsentPaymentIdempotencyKey;
    /** A reference for the payment. This must be an alphanumeric string with at most 18 characters and must not contain any special characters (since not all institutions support them). If not provided, Plaid will automatically fall back to the reference from consent. In order to track settlement via Payment Confirmation, each payment must have a unique reference. If the reference provided through the API is not unique, Plaid will adjust it. Some institutions may limit the reference to less than 18 characters. If necessary, Plaid will adjust the reference by truncating it to fit the institution's requirements. Both the originally provided and automatically adjusted references (if any) can be found in the `reference` and `adjusted_reference` fields, respectively. */
    reference?: string | null;
    scope?: PaymentInitiationConsentScope & string | null;
    processing_mode?: PaymentInitiationConsentProcessingMode;
  }) => Promise<PaymentInitiationConsentPaymentExecuteResponse>;

  /**
   * Force a Sandbox Item into an error state
   * @see /api/sandbox/#sandboxitemreset_login
   */
  sandboxItemResetLogin: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
  }) => Promise<SandboxItemResetLoginResponse>;

  /**
   * Seed a connected application for a Permissions Manager sandbox item
   */
  sandboxItemApplicationSeed: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    application_id: ApplicationId;
  }) => Promise<SandboxItemApplicationSeedResponse>;

  /**
   * Set verification status for Sandbox account
   * @see /api/sandbox/#sandboxitemset_verification_status
   */
  sandboxItemSetVerificationStatus: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    /** The `account_id` of the account whose verification status is to be modified */
    account_id: string;
    /** The verification status to set the account to. */
    verification_status: "automatically_verified" | "verification_expired";
  }) => Promise<SandboxItemSetVerificationStatusResponse>;

  /**
   * Force item(s) for a Sandbox User into an error state
   * @see /api/sandbox/#sandboxuserreset_login
   */
  sandboxUserResetLogin: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token?: UserToken;
    /** An array of `item_id`s associated with the User to be reset.  If empty or `null`, this field will default to resetting all Items associated with the User. */
    item_ids?: (ItemId)[] | null;
    user_id?: NewUserId;
  }) => Promise<SandboxUserResetLoginResponse>;

  /**
   * Exchange public token for an access token
   * @see /api/items/#itempublic_tokenexchange
   */
  itemPublicTokenExchange: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Your `public_token`, obtained from the Link `onSuccess` callback or `/sandbox/item/public_token/create`. */
    public_token: string;
  }) => Promise<ItemPublicTokenExchangeResponse>;

  /**
   * Create public token
   * @see /api/link/#itempublic_tokencreate
   */
  itemCreatePublicToken: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
  }) => Promise<ItemPublicTokenCreateResponse>;

  /**
   * Create user
   * @see /api/users/#usercreate
   */
  userCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A unique ID representing the end user. Maximum of 128 characters. Typically this will be a user ID number from your application. Personally identifiable information, such as an email address or phone number, should not be used in the `client_user_id`. */
    client_user_id: string;
    identity?: ClientUserIdentity;
    /** A unique ID representing a CRA reseller's end customer. Maximum of 128 characters. */
    end_customer?: string;
    consumer_report_user_identity?: ConsumerReportUserIdentity;
    /** If your integration with the User API predates December 10, 2025, set this field to `true` to opt into the [new User API](https://plaid.com/docs/api/users/user-apis/). When enabled, you can use the `identity` field instead of `consumer_report_user_identity`. */
    with_upgraded_user?: boolean;
  }, options?: { headers?: { "Plaid-New-User-API-Enabled"?: boolean } }) => Promise<UserCreateResponse>;

  /**
   * Retrieve user identity and information
   * @see /api/users/#userget
   */
  userGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id: NewUserId;
  }, options?: { headers?: { "Plaid-New-User-API-Enabled"?: boolean } }) => Promise<UserGetResponse>;

  /**
   * Remove user identity data
   * @see /api/users/#useridentityremove
   */
  userIdentityRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id: NewUserId;
  }, options?: { headers?: { "Plaid-New-User-API-Enabled"?: boolean } }) => Promise<UserIdentityRemoveResponse>;

  /**
   * Update user information
   * @see /api/users/#userupdate
   */
  userUpdate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    identity?: ClientUserIdentity;
    user_token?: UserToken;
    consumer_report_user_identity?: ConsumerReportUserIdentity;
  }, options?: { headers?: { "Plaid-New-User-API-Enabled"?: boolean } }) => Promise<UserUpdateResponse>;

  /**
   * Remove user
   * @see /api/users/#userremove
   */
  userRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id?: NewUserId;
    user_token?: UserToken;
  }, options?: { headers?: { "Plaid-New-User-API-Enabled"?: boolean } }) => Promise<UserRemoveResponse>;

  /**
   * Terminate user-based products
   * @see /api/users/#userproductsterminate
   */
  userProductsTerminate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id: NewUserId;
    /** An optional list of user-based products to terminate. If not provided, all user-based products will be terminated. */
    products?: (UserBasedProducts)[];
  }) => Promise<UserProductsTerminateResponse>;

  /**
   * Get Items associated with a User
   * @see /api/users/#useritemsget
   */
  userItemsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token?: UserToken;
    user_id?: NewUserId;
  }) => Promise<UserItemsGetResponse>;

  /**
   * Associate Items to a User
   * @see /api/users/#useritemsassociate
   */
  userItemsAssociate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_id: NewUserId;
    /** An array of `item_id`s to be associated with the `user_id`. */
    item_ids: (ItemId)[];
  }) => Promise<UserItemsAssociateResponse>;

  /**
   * Remove Items from a User
   * @see /api/users/#useritemsremove
   */
  userItemsRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token?: UserToken;
    user_id?: NewUserId;
    /** An array of `item_id`s to be deleted. All Items for removal must be currently associated with the provided `user_id` or `user_token`. Otherwise, the entire operation will error and no Items will be deleted. */
    item_ids: (ItemId)[];
  }) => Promise<UserItemsRemoveResponse>;

  /**
   * Create a third-party user token
   * @see /api/users/#userthirdpartytokencreate
   */
  userThirdPartyTokenCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token?: UserToken;
    /** The Plaid API `client_id` of the third-party client the token will be shared with. The token will only be valid for the specified client. */
    third_party_client_id: string;
    /** The expiration date and time for the third-party user token in [ISO 8601](https://wikipedia.org/wiki/ISO_8601) format (`YYYY-MM-DDThh:mm:ssZ`). The expiration is restricted to a maximum of 24 hours from the token's creation time. If not provided, the token will automatically expire after 24 hours. */
    expiration_time?: string | null;
    user_id?: NewUserId;
  }) => Promise<UserThirdPartyTokenCreateResponse>;

  /**
   * Remove a third-party user token
   * @see /api/users/#userthirdpartytokenremove
   */
  userThirdPartyTokenRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    third_party_user_token: ThirdPartyUserToken;
  }) => Promise<UserThirdPartyTokenRemoveResponse>;

  /**
   * Retrieve Link sessions for your user
   * @see /api/products/income/#creditsessionsget
   */
  creditSessionsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token: UserToken;
  }) => Promise<CreditSessionsGetResponse>;

  /**
   * Get payment details
   * @see /api/products/payment-initiation/#payment_initiationpaymentget
   */
  paymentInitiationPaymentGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `payment_id` returned from `/payment_initiation/payment/create`. */
    payment_id: string;
  }) => Promise<PaymentInitiationPaymentGetResponse>;

  /**
   * List payments
   * @see /api/products/payment-initiation/#payment_initiationpaymentlist
   */
  paymentInitiationPaymentList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The maximum number of payments to return. If `count` is not specified, a maximum of 10 payments will be returned, beginning with the most recent payment before the cursor (if specified). */
    count?: number | null;
    /** A string in RFC 3339 format (i.e. "2019-12-06T22:35:49Z"). Only payments created before the cursor will be returned. */
    cursor?: string | null;
    /** The consent ID. If specified, only payments, executed using this consent, will be returned. */
    consent_id?: string | null;
  }) => Promise<PaymentInitiationPaymentListResponse>;

  /**
   * Get Investment holdings
   * @see /api/products/investments/#investmentsholdingsget
   */
  investmentsHoldingsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    options?: InvestmentHoldingsGetRequestOptions;
  }) => Promise<InvestmentsHoldingsGetResponse>;

  /**
   * Get investment transactions
   * @see /api/products/investments/#investmentstransactionsget
   */
  investmentsTransactionsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    /** The earliest date for which to fetch transaction history. Dates should be formatted as YYYY-MM-DD. */
    start_date: string;
    /** The most recent date for which to fetch transaction history. Dates should be formatted as YYYY-MM-DD. */
    end_date: string;
    options?: InvestmentsTransactionsGetRequestOptions;
  }) => Promise<InvestmentsTransactionsGetResponse>;

  /**
   * Refresh investment data
   * @see /api/products/investments/#investmentsrefresh
   */
  investmentsRefresh: (input: {
    client_id?: ApiClientId;
    access_token: AccessToken;
    secret?: ApiSecret;
  }) => Promise<InvestmentsRefreshResponse>;

  /**
   * Get data needed to authorize an investments transfer
   * @see /api/products/investments-move/#investmentsauthget
   */
  investmentsAuthGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    options?: InvestmentsAuthGetRequestOptions;
  }) => Promise<InvestmentsAuthGetResponse>;

  /**
   * Create processor token
   * @see /api/processors/#processortokencreate
   */
  processorTokenCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    /** The `account_id` value obtained from the `onSuccess` callback in Link */
    account_id: string;
    /** The processor you are integrating with. */
    processor: "dwolla" | "galileo" | "modern_treasury" | "ocrolus" | "vesta" | "drivewealth" | "vopay" | "achq" | "check" | "checkbook" | "circle" | "sila_money" | "rize" | "svb_api" | "unit" | "wyre" | "lithic" | "alpaca" | "astra" | "moov" | "treasury_prime" | "marqeta" | "checkout" | "solid" | "highnote" | "gemini" | "apex_clearing" | "gusto" | "adyen" | "atomic" | "i2c" | "wepay" | "riskified" | "utb" | "adp_roll" | "fortress_trust" | "bond" | "bakkt" | "teal" | "zero_hash" | "taba_pay" | "knot" | "sardine" | "alloy" | "finix" | "nuvei" | "layer" | "boom" | "paynote" | "stake" | "wedbush" | "esusu" | "ansa" | "scribeup" | "straddle" | "loanpro" | "bloom_credit" | "sfox" | "brale" | "parafin" | "cardless" | "open_ledger" | "valon" | "gainbridge" | "cardlytics" | "pinwheel" | "thread_bank" | "array" | "fiant" | "oatfi" | "curinos";
  }) => Promise<ProcessorTokenCreateResponse>;

  /**
   * Control a processor's access to products
   * @see /api/processors/#processortokenpermissionsset
   */
  processorTokenPermissionsSet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
    /** A list of products the processor token should have access to. An empty list will grant access to all products. */
    products: (Products)[];
  }) => Promise<ProcessorTokenPermissionsSetResponse>;

  /**
   * Get a processor token's product permissions
   * @see /api/processors/#processortokenpermissionsget
   */
  processorTokenPermissionsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
  }) => Promise<ProcessorTokenPermissionsGetResponse>;

  /**
   * Update a processor token's webhook URL
   * @see /api/processor-partners/#processortokenwebhookupdate
   */
  processorTokenWebhookUpdate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    processor_token: ProcessorToken;
    /** The new webhook URL to associate with the processor token. To remove a webhook from a processor token, set to `null`. */
    webhook: string | null;
  }) => Promise<ProcessorTokenWebhookUpdateResponse>;

  /**
   * Create Stripe bank account token
   * @see /api/processors/#processorstripebank_account_tokencreate
   */
  processorStripeBankAccountTokenCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    /** The `account_id` value obtained from the `onSuccess` callback in Link */
    account_id: string;
  }) => Promise<ProcessorStripeBankAccountTokenCreateResponse>;

  /**
   * Create Apex bank account token
   * @see /none/
   */
  processorApexProcessorTokenCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    /** The `account_id` value obtained from the `onSuccess` callback in Link */
    account_id: string;
  }) => Promise<ProcessorTokenCreateResponse>;

  /**
   * Import Item
   */
  itemImport: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    institution_id?: ItemImportRequestInstitutionId;
    /** Array of product strings */
    products: (Products)[];
    user_auth: ItemImportRequestUserAuth;
    options?: ItemImportRequestOptions;
  }) => Promise<ItemImportResponse>;

  /**
   * Create Link Token
   * @see /api/link/#linktokencreate
   */
  linkTokenCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The name of your application, as it should be displayed in Link. Maximum length of 30 characters. If a value longer than 30 characters is provided, Link will display "This Application" instead. */
    client_name: string;
    /** The language that Link should be displayed in. When initializing with Identity Verification, this field is not used; for more details, see [Identity Verification supported languages](https://plaid.com/docs/identity-verification/#supported-languages).  Supported languages are: - Danish (`'da'`) - Dutch (`'nl'`) - English (`'en'`) - Estonian (`'et'`) - French (`'fr'`) - German (`'de'`) - Hindi (`'hi'`) - Italian (`'it'`) - Latvian (`'lv'`) - Lithuanian (`'lt'`) - Norwegian (`'no'`) - Polish (`'pl'`) - Portuguese (`'pt'`) - Romanian (`'ro'`) - Spanish (`'es'`) - Swedish (`'sv'`) - Vietnamese (`'vi'`)  When using a Link customization, the language configured here must match the setting in the customization, or the customization will not be applied. */
    language: string;
    /** Specify an array of Plaid-supported country codes using the ISO-3166-1 alpha-2 country code standard. Institutions from all listed countries will be shown. For a complete mapping of supported products by country, see https://plaid.com/global/. For access to additional countries beyond what you have been approved for, [contact Sales](https://plaid.com/contact/), your account manager, or support.  If using Identity Verification, `country_codes` should be set to the country where your company is based, not the country where your user is located. For all other products, `country_codes` represents the location of your user's financial institution.  If Link is launched with multiple country codes, only products that you are enabled for in all countries will be used by Link. While all countries are enabled by default in Sandbox, in Production only the countries you have requested access for are shown. To request access to additional countries, [file a product access Support ticket](https://dashboard.plaid.com/support/new/product-and-development/product-troubleshooting/request-product-access) via the Plaid dashboard.  If using a Link customization, make sure the country codes in the customization match those specified in `country_codes`, or the customization may not be applied.  If using the Auth features Instant Match, Instant Micro-deposits, Same-day Micro-deposits, Automated Micro-deposits, or Database Auth, `country_codes` must be set to `['US']`. */
    country_codes: (CountryCode)[];
    user?: LinkTokenCreateRequestUser;
    /** A `user_id` generated using `/user/create`. Required for integrations that began using Plaid Protect, Multi-Item Link, or Plaid Check Consumer Report after December 10, 2025. For more details, see [new User APIs](https://plaid.com/docs/api/users/user-apis). One of either the `user_id` or the `user` field is required. */
    user_id?: string;
    /** List of Plaid product(s) that the linked Item must support. If launching Link in update mode, should be omitted (unless you are using update mode to add a credit product, such as Assets, Statements, Income, or Plaid Check Consumer Report, to an existing Item); at least one `product` is required otherwise.  To maximize the number of institutions and accounts available, initialize Link with the minimal product set required for your use case, as the products specified will limit which institutions and account types will be available to your users in Link. Only institutions that support *all* requested products can be selected; if a user attempts to select an institution that does not support a listed product, a "Connectivity not supported" error message will appear in Link. For each specified product, the Item connected by the user must contain at least one compatible account. For details on compatible product / account type combinations, see [the account type/product support matrix](https://plaid.com/docs/api/accounts/#account-type--product-support-matrix).  To add products without limiting the institution list or account types, use the [`optional_products`](https://plaid.com/docs/api/link/#link-token-create-request-optional-products) or  [`required_if_supported_products`](https://plaid.com/docs/api/link/#link-token-create-request-required-if-supported-products) fields. Products can also be added to an Item by calling the product endpoint after obtaining an access token; this may require the product to be listed in the [`additional_consented_products`](https://plaid.com/docs/api/link/#link-token-create-request-additional-consented-products) array. For details, see [Choosing when to initialize products](https://plaid.com/docs/link/initializing-products/).  `balance` is *not* a valid value, the Balance product does not require explicit initialization and will automatically be initialized when any other product is initialized.  If launching Link with CRA products, `cra_base_reports` is required and must be included in the `products` array.  Note that, unless you have opted to disable Instant Match support, institutions that support Instant Match will also be shown in Link if `auth` is specified as a product, even though these institutions do not contain `auth` in their product array.  In Production, you will be billed for each product that you specify when initializing Link. Note that a product cannot be removed from an Item once the Item has been initialized with that product. To stop billing on an Item for subscription-based products, such as Liabilities, Investments, and Transactions, remove the Item via `/item/remove`. */
    products?: (Products)[] | null;
    /** List of Plaid product(s) you wish to use only if the institution and account(s) selected by the user support the product. Institutions that do not support these products will still be shown in Link. The products will only be extracted and billed if the user selects an institution and account type that supports them.  There should be no overlap between this array and the `products`, `optional_products`, or `additional_consented_products` arrays. The `products` array must have at least one product.  For more details on using this feature, see [Required if Supported Products](https://plaid.com/docs/link/initializing-products/#required-if-supported-products). */
    required_if_supported_products?: (Products)[] | null;
    /** List of Plaid product(s) that will enhance the consumer's use case, but that your app can function without. Plaid will attempt to fetch data for these products on a best-effort basis, and failure to support these products will not affect Item creation.  There should be no overlap between this array and the `products`, `required_if_supported_products`, or `additional_consented_products` arrays. The `products` array must have at least one product.  For more details on using this feature, see [Optional Products](https://plaid.com/docs/link/initializing-products/#optional-products). */
    optional_products?: (Products)[] | null;
    /** List of additional Plaid product(s) you wish to collect consent for to support your use case. These products will not be billed until you start using them by calling the relevant endpoints.  `balance` is *not* a valid value, the Balance product does not require explicit initialization and will automatically have consent collected.  Institutions that do not support these products will still be shown in Link.  There should be no overlap between this array and the `products` or `required_if_supported_products` arrays.  If you include `signal` in `additional_consented_products`, you will need to call [`/signal/prepare`](https://plaid.com/docs/api/products/signal/#signalprepare) before calling `/signal/evaluate` for the first time on an Item in order to get the most accurate results. For more details, see [`/signal/prepare`](https://plaid.com/docs/api/products/signal/#signalprepare). */
    additional_consented_products?: (Products)[] | null;
    /** The destination URL to which any webhooks should be sent. Note that webhooks for Payment Initiation (e-wallet transactions only), Transfer, Bank Transfer (including Auth micro-deposit notification webhooks), Monitor, and Identity Verification are configured via the Dashboard instead. In update mode, this field will not have an effect; to update the webhook receiver endpoint for an existing Item, use `/item/webhook/update` instead. */
    webhook?: string;
    /** The `access_token` associated with the Item to update or reference, used when updating, modifying, or accessing an existing `access_token`. Used when launching Link in update mode, when completing the Same-day (manual) Micro-deposit flow, or (optionally) when initializing Link for a returning user as part of the Transfer UI flow. */
    access_token?: string | null;
    /** A list of access tokens associated with the items to update in Link update mode for the Assets product. Using this instead of the `access_token` field allows the updating of multiple items at once. This feature is in closed beta, please contact your account manager for more info. */
    access_tokens?: (string)[];
    /** The name of the Link customization from the Plaid Dashboard to be applied to Link. If not specified, the `default` customization will be used. When using a Link customization, the language in the customization must match the language selected via the `language` parameter, and the countries in the customization should match the country codes selected via `country_codes`. */
    link_customization_name?: string;
    appearance_mode?: LinkTokenCreateRequestAppearanceMode;
    redirect_uri?: LinkTokenCreateRequestRedirectUri;
    /** The name of your app's Android package. Required if using the `link_token` to initialize Link on Android. Any package name specified here must also be added to the Allowed Android package names setting on the [developer dashboard](https://dashboard.plaid.com/team/api). When creating a `link_token` for initializing Link on other platforms, `android_package_name` must be left blank and `redirect_uri` should be used instead. */
    android_package_name?: string;
    institution_data?: LinkTokenCreateInstitutionData;
    card_switch?: LinkTokenCreateCardSwitch;
    account_filters?: LinkTokenAccountFilters;
    eu_config?: LinkTokenEuConfig;
    /** Used for certain legacy use cases */
    institution_id?: string;
    payment_configuration?: LinkTokenCreateRequestPaymentConfiguration;
    payment_initiation?: LinkTokenCreateRequestPaymentInitiation;
    employment?: LinkTokenCreateRequestEmployment;
    income_verification?: LinkTokenCreateRequestIncomeVerification;
    base_report?: LinkTokenCreateRequestBaseReport;
    credit_partner_insights?: LinkTokenCreateRequestCreditPartnerInsights;
    cra_options?: LinkTokenCreateRequestCraOptions;
    consumer_report_permissible_purpose?: ConsumerReportPermissiblePurpose;
    auth?: LinkTokenCreateRequestAuth;
    transfer?: LinkTokenCreateRequestTransfer;
    update?: LinkTokenCreateRequestUpdate;
    identity_verification?: LinkTokenCreateRequestIdentityVerification;
    statements?: LinkTokenCreateRequestStatements;
    /** A third party user token associated with the current user. */
    third_party_user_token?: string;
    investments?: LinkTokenInvestments;
    investments_auth?: LinkTokenInvestmentsAuth;
    hosted_link?: LinkTokenCreateHostedLink;
    transactions?: LinkTokenTransactions;
    cashflow_report?: LinkTokenCashflowReport;
    /** If `true`, request a CRA connection. Defaults to `false`. */
    cra_enabled?: boolean;
    identity?: LinkTokenCreateIdentity;
    /** If `true`, indicates that client supports linking FinanceKit / AppleCard items. Defaults to `false`. */
    financekit_supported?: boolean;
    /** If `true`, enable linking multiple items in the same Link session. Defaults to `false`. */
    enable_multi_item_link?: boolean;
    /** A user token generated using `/user/create`. Any Item created during the Link session will be associated with the user. Integrations that began using Plaid Protect, Multi-Item Link, or Plaid Check Consumer Report before December 10, 2025 use this field instead of the `user_id`. */
    user_token?: string;
  }) => Promise<LinkTokenCreateResponse>;

  /**
   * Get Link Token
   * @see /api/link/#linktokenget
   */
  linkTokenGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A `link_token` from a previous invocation of `/link/token/create` */
    link_token: string;
  }) => Promise<LinkTokenGetResponse>;

  /**
   * Exchange the Link Correlation Id for a Link Token
   * @see /api/oauth/#linkcorrelationid
   */
  linkOauthCorrelationIdExchange: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A `link_correlation_id` from a received OAuth redirect URI callback */
    link_correlation_id: string;
  }) => Promise<LinkOAuthCorrelationIdExchangeResponse>;

  /**
   * Create a Link token for Layer
   * @see /api/products/layer/#sessiontokencreate
   */
  sessionTokenCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The id of a template defined in Plaid Dashboard */
    template_id: string;
    user?: SessionTokenCreateRequestUser;
    redirect_uri?: LinkTokenCreateRequestRedirectUri;
    /** The name of your app's Android package. Required if using the session token to initialize Layer on Android. Any package name specified here must also be added to the Allowed Android package names setting on the [developer dashboard](https://dashboard.plaid.com/team/api). When creating a session token for initializing Layer on other platforms, `android_package_name` must be left blank and `redirect_uri` should be used instead. */
    android_package_name?: string;
    /** The destination URL to which any webhooks should be sent. If you use the same webhook listener for all Sandbox or all Production activity, set this value in the Layer template editor in the Dashboard instead. Only provide a value in this field if you need to use multiple webhook URLs per environment (an uncommon use case). If provided, a value in this field will take priority over webhook values set in the Layer template editor. */
    webhook?: string;
    user_id?: NewUserId;
  }) => Promise<SessionTokenCreateResponse>;

  /**
   * Retrieve a transfer
   * @see /api/products/transfer/reading-transfers/#transferget
   */
  transferGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    transfer_id?: TransferId;
    authorization_id?: TransferAuthorizationId;
    /** The Plaid client ID of the transfer originator. Should only be present if `client_id` is a third-party sender (TPS). */
    originator_client_id?: string | null;
  }) => Promise<TransferGetResponse>;

  /**
   * Retrieve a recurring transfer
   * @see /api/products/transfer/recurring-transfers/#transferrecurringget
   */
  transferRecurringGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    recurring_transfer_id: RecurringTransferId;
  }) => Promise<TransferRecurringGetResponse>;

  /**
   * Retrieve a bank transfer
   * @see /bank-transfers/reference#bank_transferget
   */
  bankTransferGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    bank_transfer_id: BankTransferId;
  }) => Promise<BankTransferGetResponse>;

  /**
   * Create a transfer authorization
   * @see /api/products/transfer/initiating-transfers/#transferauthorizationcreate
   */
  transferAuthorizationCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: TransferAccessToken;
    account_id: TransferAccountId;
    funding_account_id?: TransferMigratedFundingAccountIdRequest;
    /** Specify which ledger balance should be used to fund the transfer. You can find a list of `ledger_id`s in the Accounts page of your Plaid Dashboard. If this field is left blank, this will default to id of the default ledger balance. */
    ledger_id?: string | null;
    payment_profile_token?: TransferPaymentProfileToken;
    type: TransferType;
    network: TransferNetwork;
    amount: TransferAmount;
    ach_class?: AchClass;
    wire_details?: TransferWireDetails;
    user: TransferAuthorizationUserInRequest;
    device?: TransferAuthorizationDevice;
    /** Plaid's unique identifier for the origination account for this authorization. If not specified, the default account will be used. */
    origination_account_id?: string;
    /** The currency of the transfer amount. The default value is "USD". */
    iso_currency_code?: string;
    idempotency_key?: TransferAuthorizationIdempotencyKey;
    /** If the end user is initiating the specific transfer themselves via an interactive UI, this should be `true`; for automatic recurring payments where the end user is not actually initiating each individual transfer, it should be `false`. This field is not currently used and is present to support planned future functionality. */
    user_present?: boolean | null;
    /** If set to `false`, Plaid will not offer a `guarantee_decision` for this request (Guarantee customers only). This field is deprecated in favor for `guarantee`. */
    with_guarantee?: boolean | null;
    /** Indicates whether the transfer should be evaluated for guarantee coverage. When set to `true`, Plaid assesses the transfer for guarantee coverage and returns a decision in the authorization response. When omitted or set to `false`, the authorization is evaluated without guarantee coverage. */
    request_guarantee?: boolean | null;
    /** The unique identifier returned by Plaid's [beacon](https://plaid.com/docs/transfer/guarantee/#using-a-beacon) when it is run on your webpage. */
    beacon_session_id?: string | null;
    /** The Plaid client ID that is the originator of this transfer. Only needed if creating transfers on behalf of another client as a [Platform customer](https://plaid.com/docs/transfer/application/#originators-vs-platforms). */
    originator_client_id?: string | null;
    credit_funds_source?: TransferCreditFundsSource;
    /** Plaid’s unique identifier for a test clock. This field may only be used when using `sandbox` environment. If provided, the `authorization` is created at the `virtual_time` on the provided test clock. */
    test_clock_id?: string | null;
    /** The key of the Ruleset for the transaction. This feature is currently in closed beta; to request access, contact your account manager. */
    ruleset_key?: string | null;
  }) => Promise<TransferAuthorizationCreateResponse>;

  /**
   * Cancel a transfer authorization
   * @see /api/products/transfer/initiating-transfers/#transferauthorizationcancel
   */
  transferAuthorizationCancel: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    authorization_id: TransferAuthorizationId;
  }) => Promise<TransferAuthorizationCancelResponse>;

  /**
   * (Deprecated) Retrieve a balance held with Plaid
   * @see /api/products/transfer/balance/#transferbalanceget
   */
  transferBalanceGet: (input: {
    client_id?: ApiClientId;
    /** Client ID of the end customer. */
    originator_client_id?: string | null;
    secret?: ApiSecret;
    type?: TransferBalanceType;
  }) => Promise<TransferBalanceGetResponse>;

  /**
   * Get RTP eligibility information of a transfer
   * @see /api/products/transfer/account-linking/#transfercapabilitiesget
   */
  transferCapabilitiesGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: TransferAccessToken;
    account_id: TransferAccountId;
    payment_profile_token?: PaymentProfileToken;
  }) => Promise<TransferCapabilitiesGetResponse>;

  /**
   * Get transfer product configuration
   * @see /api/products/transfer/metrics/#transferconfigurationget
   */
  transferConfigurationGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The Plaid client ID of the transfer originator. Should only be present if `client_id` is a [Platform customer](https://plaid.com/docs/transfer/application/#originators-vs-platforms). */
    originator_client_id?: string | null;
  }) => Promise<TransferConfigurationGetResponse>;

  /**
   * Retrieve Plaid Ledger balance
   * @see /api/products/transfer/ledger/#transferledgerget
   */
  transferLedgerGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Specify which ledger balance to get. Customers can find a list of `ledger_id`s in the Accounts page of your Plaid Dashboard. If this field is left blank, this will default to id of the default ledger balance. */
    ledger_id?: string | null;
    /** Client ID of the end customer. */
    originator_client_id?: string | null;
  }) => Promise<TransferLedgerGetResponse>;

  /**
   * Move available balance between ledgers
   * @see /api/products/transfer/ledger/#transferledgerdistribute
   */
  transferLedgerDistribute: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The Ledger to pull money from. */
    from_ledger_id: string;
    /** The Ledger to credit money to. */
    to_ledger_id: string;
    /** The amount to move (decimal string with two digits of precision e.g. "10.00"). Amount must be positive. */
    amount: string;
    idempotency_key: LedgerDistributeIdempotencyKey;
    /** An optional description for the ledger distribute operation. */
    description?: string;
  }) => Promise<TransferLedgerDistributeResponse>;

  /**
   * Deposit funds into a Plaid Ledger balance
   * @see /api/products/transfer/ledger/#transferledgerdeposit
   */
  transferLedgerDeposit: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    originator_client_id?: TransferOriginatorClientId;
    funding_account_id?: TransferLedgerFundingAccountIdRequest;
    /** Specify which ledger balance to deposit to. Customers can find a list of `ledger_id`s in the Accounts page of your Plaid Dashboard. If this field is left blank, this will default to id of the default ledger balance. */
    ledger_id?: string | null;
    /** A positive amount of how much will be deposited into ledger (decimal string with two digits of precision e.g. "5.50"). */
    amount: string;
    description?: SweepDescription;
    idempotency_key: LedgerDepositIdempotencyKey;
    network: TransferAchNetwork;
  }) => Promise<TransferLedgerDepositResponse>;

  /**
   * Withdraw funds from a Plaid Ledger balance
   * @see /api/products/transfer/ledger/#transferledgerwithdraw
   */
  transferLedgerWithdraw: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    originator_client_id?: TransferOriginatorClientId;
    funding_account_id?: TransferLedgerFundingAccountIdRequest;
    /** Specify which ledger balance to withdraw from. Customers can find a list of `ledger_id`s in the Accounts page of your Plaid Dashboard. If this field is left blank, this will default to id of the default ledger balance. */
    ledger_id?: string | null;
    /** A positive amount of how much will be withdrawn from the ledger balance (decimal string with two digits of precision e.g. "5.50"). */
    amount: string;
    description?: SweepDescription;
    idempotency_key: LedgerWithdrawIdempotencyKey;
    network: TransferNetwork;
  }) => Promise<TransferLedgerWithdrawResponse>;

  /**
   * Update the funding account associated with the originator
   * @see /api/products/transfer/platform-payments/#transferoriginatorfunding_accountupdate
   */
  transferOriginatorFundingAccountUpdate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The Plaid client ID of the transfer originator. */
    originator_client_id: string;
    funding_account: TransferFundingAccount;
  }) => Promise<TransferOriginatorFundingAccountUpdateResponse>;

  /**
   * Create a new funding account for an originator
   * @see /api/products/transfer/platform-payments/#transferoriginatorfunding_accountcreate
   */
  transferOriginatorFundingAccountCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The Plaid client ID of the transfer originator. */
    originator_client_id: string;
    funding_account: TransferFundingAccountWithDisplayName;
  }) => Promise<TransferOriginatorFundingAccountCreateResponse>;

  /**
   * Get transfer product usage metrics
   * @see /api/products/transfer/metrics/#transfermetricsget
   */
  transferMetricsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The Plaid client ID of the transfer originator. Should only be present if `client_id` is a [Platform customer](https://plaid.com/docs/transfer/application/#originators-vs-platforms). */
    originator_client_id?: string | null;
  }) => Promise<TransferMetricsGetResponse>;

  /**
   * Create a transfer
   * @see /api/products/transfer/initiating-transfers/#transfercreate
   */
  transferCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    idempotency_key?: TransferCreateIdempotencyKey;
    access_token: TransferAccessToken;
    account_id: TransferAccountId;
    /** Plaid’s unique identifier for a transfer authorization. This parameter also serves the purpose of acting as an idempotency identifier. */
    authorization_id: string;
    type?: TransferType;
    network?: TransferNetwork;
    amount?: TransferAmount;
    /** The transfer description, maximum of 15 characters (RTP transactions) or 10 characters (ACH transactions). Should represent why the money is moving, not your company name. For recommendations on setting the `description` field to avoid ACH returns, see [Description field recommendations](https://www.plaid.com/docs/transfer/creating-transfers/#description-field-recommendations).  If reprocessing a returned transfer, the `description` field must be `"Retry 1"` or `"Retry 2"`. You may retry a transfer up to 2 times, within 180 days of creating the original transfer. Only transfers that were returned with code `R01` or `R09` may be retried. */
    description: string;
    ach_class?: AchClass;
    user?: TransferUserInRequestDeprecated;
    metadata?: TransferMetadata;
    /** Plaid’s unique identifier for the origination account for this transfer. If you have more than one origination account, this value must be specified. Otherwise, this field should be left blank. */
    origination_account_id?: string | null;
    /** The currency of the transfer amount. The default value is "USD". */
    iso_currency_code?: string;
    /** Plaid’s unique identifier for a test clock. This field may only be used when using `sandbox` environment. If provided, the `transfer` is created at the `virtual_time` on the provided `test_clock`. */
    test_clock_id?: string | null;
    facilitator_fee?: TransferFacilitatorFee;
  }) => Promise<TransferCreateResponse>;

  /**
   * Create a recurring transfer
   * @see /api/products/transfer/recurring-transfers/#transferrecurringcreate
   */
  transferRecurringCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: TransferAccessToken;
    idempotency_key: TransferRecurringIdempotencyKey;
    account_id: TransferAccountId;
    /** Specify the account used to fund the transfer. Customers can find a list of `funding_account_id`s in the Accounts page of your Plaid Dashboard, under the "Account ID" column. If this field is left blank, it will default to the default `funding_account_id` specified during onboarding. */
    funding_account_id?: string | null;
    type: TransferType;
    network: TransferRecurringNetwork;
    ach_class?: AchClass;
    amount: TransferAmount;
    /** If the end user is initiating the specific transfer themselves via an interactive UI, this should be `true`; for automatic recurring payments where the end user is not actually initiating each individual transfer, it should be `false`. */
    user_present?: boolean | null;
    /** The currency of the transfer amount. The default value is "USD". */
    iso_currency_code?: string;
    /** The description of the recurring transfer. */
    description: string;
    /** Plaid’s unique identifier for a test clock. This field may only be used when using the `sandbox` environment. If provided, the created `recurring_transfer` is associated with the `test_clock`. New originations are automatically generated when the associated `test_clock` advances. For more details, see [Simulating recurring transfers](https://plaid.com/docs/transfer/sandbox/#simulating-recurring-transfers). */
    test_clock_id?: string | null;
    schedule: TransferRecurringSchedule;
    user: TransferUserInRequest;
    device?: TransferDevice;
  }) => Promise<TransferRecurringCreateResponse>;

  /**
   * Create a bank transfer
   * @see /bank-transfers/reference#bank_transfercreate
   */
  bankTransferCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    idempotency_key: BankTransferIdempotencyKey;
    access_token: BankTransferAccessToken;
    /** The Plaid `account_id` for the account that will be debited or credited. */
    account_id: string;
    type: BankTransferType;
    network: BankTransferNetwork;
    amount: BankTransferAmount;
    /** The currency of the transfer amount – should be set to "USD". */
    iso_currency_code: string;
    /** The transfer description. Maximum of 10 characters. */
    description: string;
    ach_class?: AchClass;
    user: BankTransferUser;
    /** An arbitrary string provided by the client for storage with the bank transfer. May be up to 100 characters. */
    custom_tag?: string | null;
    metadata?: BankTransferMetadata;
    /** Plaid’s unique identifier for the origination account for this transfer. If you have more than one origination account, this value must be specified. Otherwise, this field should be left blank. */
    origination_account_id?: string | null;
  }) => Promise<BankTransferCreateResponse>;

  /**
   * List transfers
   * @see /api/products/transfer/reading-transfers/#transferlist
   */
  transferList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The start `created` datetime of transfers to list. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    start_date?: string | null;
    /** The end `created` datetime of transfers to list. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    end_date?: string | null;
    /** The maximum number of transfers to return. */
    count?: number;
    /** The number of transfers to skip before returning results. */
    offset?: number;
    /** Filter transfers to only those originated through the specified origination account. */
    origination_account_id?: string | null;
    /** Filter transfers to only those with the specified originator client. */
    originator_client_id?: string | null;
    /** Filter transfers to only those with the specified `funding_account_id`. */
    funding_account_id?: string | null;
  }) => Promise<TransferListResponse>;

  /**
   * List recurring transfers
   * @see /api/products/transfer/recurring-transfers/#transferrecurringlist
   */
  transferRecurringList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The start `created` datetime of recurring transfers to list. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    start_time?: string | null;
    /** The end `created` datetime of recurring transfers to list. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    end_time?: string | null;
    /** The maximum number of recurring transfers to return. */
    count?: number;
    /** The number of recurring transfers to skip before returning results. */
    offset?: number;
    /** Filter recurring transfers to only those with the specified `funding_account_id`. */
    funding_account_id?: string | null;
  }) => Promise<TransferRecurringListResponse>;

  /**
   * List bank transfers
   * @see /bank-transfers/reference#bank_transferlist
   */
  bankTransferList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The start datetime of bank transfers to list. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    start_date?: string | null;
    /** The end datetime of bank transfers to list. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    end_date?: string | null;
    /** The maximum number of bank transfers to return. */
    count?: number;
    /** The number of bank transfers to skip before returning results. */
    offset?: number;
    /** Filter bank transfers to only those originated through the specified origination account. */
    origination_account_id?: string | null;
    direction?: BankTransferDirection;
  }) => Promise<BankTransferListResponse>;

  /**
   * Cancel a transfer
   * @see /api/products/transfer/initiating-transfers/#transfercancel
   */
  transferCancel: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    transfer_id: TransferId;
    /** The Plaid client ID of the transfer originator. Should only be present if `client_id` is a third-party sender (TPS). */
    originator_client_id?: string | null;
    reason_code?: ReasonCode;
  }) => Promise<TransferCancelResponse>;

  /**
   * Cancel a recurring transfer.
   * @see /api/products/transfer/recurring-transfers/#transferrecurringcancel
   */
  transferRecurringCancel: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    recurring_transfer_id: RecurringTransferId;
  }) => Promise<TransferRecurringCancelResponse>;

  /**
   * Cancel a bank transfer
   * @see /bank-transfers/reference#bank_transfercancel
   */
  bankTransferCancel: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    bank_transfer_id: BankTransferId;
  }) => Promise<BankTransferCancelResponse>;

  /**
   * List transfer events
   * @see /api/products/transfer/reading-transfers/#transfereventlist
   */
  transferEventList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The start `created` datetime of transfers to list. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    start_date?: string | null;
    /** The end `created` datetime of transfers to list. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    end_date?: string | null;
    /** Plaid’s unique identifier for a transfer. */
    transfer_id?: string | null;
    /** The account ID to get events for all transactions to/from an account. */
    account_id?: string | null;
    transfer_type?: TransferEventListTransferType;
    /** Filter events by event type. */
    event_types?: (TransferEventType)[];
    /** Plaid’s unique identifier for a sweep. */
    sweep_id?: string;
    /** The maximum number of transfer events to return. If the number of events matching the above parameters is greater than `count`, the most recent events will be returned. */
    count?: number | null;
    /** The offset into the list of transfer events. When `count`=25 and `offset`=0, the first 25 events will be returned. When `count`=25 and `offset`=25, the next 25 events will be returned. */
    offset?: number | null;
    /** The origination account ID to get events for transfers from a specific origination account. */
    origination_account_id?: string | null;
    /** Filter transfer events to only those with the specified originator client. */
    originator_client_id?: string | null;
    /** Filter transfer events to only those with the specified `funding_account_id`. */
    funding_account_id?: string | null;
  }) => Promise<TransferEventListResponse>;

  /**
   * List transfer ledger events
   * @see /api/products/transfer/ledger/#transferledgereventlist
   */
  transferLedgerEventList: (input: {
    client_id?: ApiClientId;
    /** Filter transfer events to only those with the specified originator client. (This field is specifically for resellers. Caller's client ID will be used if this field is not specified.) */
    originator_client_id?: string | null;
    secret?: ApiSecret;
    /** The start created datetime of transfers to list. This should be in RFC 3339 format (i.e. 2019-12-06T22:35:49Z) */
    start_date?: string | null;
    /** The end created datetime of transfers to list. This should be in RFC 3339 format (i.e. 2019-12-06T22:35:49Z) */
    end_date?: string | null;
    /** Plaid's unique identifier for a Plaid Ledger Balance. */
    ledger_id?: string | null;
    /** Plaid's unique identifier for the ledger event. */
    ledger_event_id?: string | null;
    source_type?: LedgerEventSourceType;
    /** Plaid's unique identifier for a transfer, sweep, or refund. */
    source_id?: string | null;
    /** The maximum number of transfer events to return. If the number of events matching the above parameters is greater than `count`, the most recent events will be returned. */
    count?: number | null;
    /** The offset into the list of transfer events. When `count`=25 and `offset`=0, the first 25 events will be returned. When `count`=25 and `offset`=25, the next 25 events will be returned. */
    offset?: number | null;
  }) => Promise<TransferLedgerEventListResponse>;

  /**
   * List bank transfer events
   * @see /api/products/auth#bank_transfereventlist
   */
  bankTransferEventList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The start datetime of bank transfers to list. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    start_date?: string | null;
    /** The end datetime of bank transfers to list. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    end_date?: string | null;
    /** Plaid’s unique identifier for a bank transfer. */
    bank_transfer_id?: string | null;
    /** The account ID to get events for all transactions to/from an account. */
    account_id?: string | null;
    bank_transfer_type?: BankTransferEventListBankTransferType;
    /** Filter events by event type. */
    event_types?: (BankTransferEventType)[];
    /** The maximum number of bank transfer events to return. If the number of events matching the above parameters is greater than `count`, the most recent events will be returned. */
    count?: number | null;
    /** The offset into the list of bank transfer events. When `count`=25 and `offset`=0, the first 25 events will be returned. When `count`=25 and `offset`=25, the next 25 bank transfer events will be returned. */
    offset?: number | null;
    /** The origination account ID to get events for transfers from a specific origination account. */
    origination_account_id?: string | null;
    direction?: BankTransferEventListDirection;
  }) => Promise<BankTransferEventListResponse>;

  /**
   * Sync transfer events
   * @see /api/products/transfer/reading-transfers/#transfereventsync
   */
  transferEventSync: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The latest (largest) `event_id` fetched via the sync endpoint, or 0 initially. */
    after_id: number;
    /** The maximum number of transfer events to return. */
    count?: number | null;
  }) => Promise<TransferEventSyncResponse>;

  /**
   * Sync bank transfer events
   * @see /api/products/auth/#bank_transfereventsync
   */
  bankTransferEventSync: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The latest (largest) `event_id` fetched via the sync endpoint, or 0 initially. */
    after_id: number;
    /** The maximum number of bank transfer events to return. */
    count?: number | null;
  }) => Promise<BankTransferEventSyncResponse>;

  /**
   * Retrieve a sweep
   * @see /api/products/transfer/reading-transfers/#transfersweepget
   */
  transferSweepGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Plaid's unique identifier for the sweep (UUID) or a shortened form consisting of the first 8 characters of the identifier (8-digit hexadecimal string). */
    sweep_id: string;
  }) => Promise<TransferSweepGetResponse>;

  /**
   * Retrieve a sweep
   * @see /api/products/transfer/#bank_transfersweepget
   */
  bankTransferSweepGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Identifier of the sweep. */
    sweep_id: string;
  }) => Promise<BankTransferSweepGetResponse>;

  /**
   * List sweeps
   * @see /api/products/transfer/reading-transfers/#transfersweeplist
   */
  transferSweepList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The start `created` datetime of sweeps to return (RFC 3339 format). */
    start_date?: string | null;
    /** The end `created` datetime of sweeps to return (RFC 3339 format). */
    end_date?: string | null;
    /** The maximum number of sweeps to return. */
    count?: number | null;
    /** The number of sweeps to skip before returning results. */
    offset?: number;
    /** Filter sweeps to only those with the specified amount. */
    amount?: string | null;
    status?: SweepStatus;
    /** Filter sweeps to only those with the specified originator client. */
    originator_client_id?: string | null;
    /** Filter sweeps to only those with the specified `funding_account_id`. */
    funding_account_id?: string | null;
    /** Filter sweeps to only those with the included `transfer_id`. */
    transfer_id?: string | null;
    trigger?: SweepTrigger;
  }) => Promise<TransferSweepListResponse>;

  /**
   * List sweeps
   * @see /api/products/transfer/#bank_transfersweeplist
   */
  bankTransferSweepList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** If multiple origination accounts are available, `origination_account_id` must be used to specify the account that the sweeps belong to. */
    origination_account_id?: string | null;
    /** The start `created` datetime of sweeps to return (RFC 3339 format). */
    start_time?: string | null;
    /** The end `created` datetime of sweeps to return (RFC 3339 format). */
    end_time?: string | null;
    /** The maximum number of sweeps to return. */
    count?: number | null;
  }) => Promise<BankTransferSweepListResponse>;

  /**
   * Get balance of your Bank Transfer account
   * @see /bank-transfers/reference#bank_transferbalanceget
   */
  bankTransferBalanceGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** If multiple origination accounts are available, `origination_account_id` must be used to specify the account for which balance will be returned. */
    origination_account_id?: string | null;
  }) => Promise<BankTransferBalanceGetResponse>;

  /**
   * Migrate account into Bank Transfers
   * @see /bank-transfers/reference#bank_transfermigrate_account
   */
  bankTransferMigrateAccount: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The user's account number. */
    account_number: string;
    /** The user's routing number. */
    routing_number: string;
    /** The user's wire transfer routing number. This is the ABA number; for some institutions, this may differ from the ACH number used in `routing_number`. */
    wire_routing_number?: string;
    /** The type of the bank account (`checking` or `savings`). */
    account_type: string;
  }) => Promise<BankTransferMigrateAccountResponse>;

  /**
   * Migrate account into Transfers
   * @see /api/products/transfer/account-linking/#transfermigrate_account
   */
  transferMigrateAccount: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The user's account number. */
    account_number: string;
    /** The user's routing number. */
    routing_number: string;
    /** The user's wire transfer routing number. This is the ABA number; for some institutions, this may differ from the ACH number used in `routing_number`. This field must be set for the created item to be eligible for wire transfers. */
    wire_routing_number?: string;
    /** The type of the bank account (`checking` or `savings`). */
    account_type: string;
  }) => Promise<TransferMigrateAccountResponse>;

  /**
   * Create a transfer intent object to invoke the Transfer UI
   * @see /api/products/transfer/account-linking/#transferintentcreate
   */
  transferIntentCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The Plaid `account_id` corresponding to the end-user account that will be debited or credited. */
    account_id?: string | null;
    funding_account_id?: TransferMigratedFundingAccountIdRequest;
    mode: TransferIntentCreateMode;
    network?: TransferIntentCreateNetwork;
    amount: TransferAmount;
    /** A description for the underlying transfer. Maximum of 15 characters. */
    description: string;
    ach_class?: AchClass;
    /** Plaid’s unique identifier for the origination account for the intent. If not provided, the default account will be used. */
    origination_account_id?: string | null;
    user: TransferUserInRequest;
    metadata?: TransferMetadata;
    /** The currency of the transfer amount, e.g. "USD" */
    iso_currency_code?: string;
    /** When `true`, the transfer requires a `GUARANTEED` decision by Plaid to proceed (Guarantee customers only). */
    require_guarantee?: boolean | null;
  }) => Promise<TransferIntentCreateResponse>;

  /**
   * Retrieve more information about a transfer intent
   * @see /api/products/transfer/account-linking/#transferintentget
   */
  transferIntentGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Plaid's unique identifier for a transfer intent object. */
    transfer_intent_id: string;
  }) => Promise<TransferIntentGetResponse>;

  /**
   * Lists historical repayments
   * @see /api/products/transfer/#transferrepaymentlist
   */
  transferRepaymentList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The start `created` datetime of repayments to return (RFC 3339 format). */
    start_date?: string | null;
    /** The end `created` datetime of repayments to return (RFC 3339 format). */
    end_date?: string | null;
    /** The maximum number of repayments to return. */
    count?: number | null;
    /** The number of repayments to skip before returning results. */
    offset?: number;
  }) => Promise<TransferRepaymentListResponse>;

  /**
   * List the returns included in a repayment
   * @see /api/products/transfer/#transferrepaymentreturnlist
   */
  transferRepaymentReturnList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Identifier of the repayment to query. */
    repayment_id: string;
    /** The maximum number of repayments to return. */
    count?: number | null;
    /** The number of repayments to skip before returning results. */
    offset?: number;
  }) => Promise<TransferRepaymentReturnListResponse>;

  /**
   * Submit additional onboarding information on behalf of an originator
   * @see /api/products/transfer/platform-payments/#transferplatformrequirementsubmit
   */
  transferPlatformRequirementSubmit: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The client ID of the originator */
    originator_client_id: string;
    /** Use the `/transfer/platform/requirement/submit` endpoint to submit a list of requirement submissions that all relate to the originator. Must contain between 1 and 50 requirement submissions. See [Requirement type schema documentation](https://docs.google.com/document/d/1NEQkTD0sVK50iAQi6xHigrexDUxZ4QxXqSEfV_FFTiU/) for a list of requirements and possible values. */
    requirement_submissions: (TransferPlatformRequirementSubmission)[];
  }) => Promise<TransferPlatformRequirementSubmitResponse>;

  /**
   * Create a new originator
   * @see /api/products/transfer/platform-payments/#transferoriginatorcreate
   */
  transferOriginatorCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The company name of the end customer being created. This will be displayed in public-facing surfaces, e.g. Plaid Dashboard. */
    company_name: string;
  }) => Promise<TransferOriginatorCreateResponse>;

  /**
   * Generate a Plaid-hosted onboarding UI URL.
   * @see /api/products/transfer/platform-payments/#transferquestionnairecreate
   */
  transferQuestionnaireCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Client ID of the end customer. */
    originator_client_id: string;
    /** URL the end customer will be redirected to after completing questions in Plaid-hosted onboarding flow. */
    redirect_uri: string;
  }) => Promise<TransferQuestionnaireCreateResponse>;

  /**
   * Submit transfer diligence on behalf of the originator
   * @see /api/products/transfer/platform-payments/#transferdiligencesubmit
   */
  transferDiligenceSubmit: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Client ID of the originator whose diligence that you want to submit. */
    originator_client_id: string;
    originator_diligence: TransferOriginatorDiligence;
  }) => Promise<TransferDiligenceSubmitResponse>;

  /**
   * Upload transfer diligence document on behalf of the originator
   * @see /api/products/transfer/platform-payments/#transferdiligencedocumentupload
   */
  transferDiligenceDocumentUpload: (input: {
    /** The Client ID of the originator whose document that you want to upload. */
    originator_client_id: string;
    /** A file to upload. The file size must be less than 20MB. Supported file extensions: .pdf. */
    file: string;
    purpose: TransferDocumentPurpose;
  }) => Promise<TransferDiligenceDocumentUploadResponse>;

  /**
   * Get status of an originator's onboarding
   * @see /api/products/transfer/platform-payments/#transferoriginatorget
   */
  transferOriginatorGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Client ID of the end customer (i.e. the originator). */
    originator_client_id: string;
  }) => Promise<TransferOriginatorGetResponse>;

  /**
   * Get status of all originators' onboarding
   * @see /api/products/transfer/platform-payments/#transferoriginatorlist
   */
  transferOriginatorList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The maximum number of originators to return. */
    count?: number | null;
    /** The number of originators to skip before returning results. */
    offset?: number | null;
  }) => Promise<TransferOriginatorListResponse>;

  /**
   * Create a refund
   * @see /api/products/transfer/refunds/#transferrefundcreate
   */
  transferRefundCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    transfer_id: TransferIdForRefund;
    amount: TransferRefundAmount;
    idempotency_key: TransferRefundIdempotencyKey;
  }) => Promise<TransferRefundCreateResponse>;

  /**
   * Retrieve a refund
   * @see /api/products/transfer/refunds/#transferrefundget
   */
  transferRefundGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    refund_id: TransferRefundId;
  }) => Promise<TransferRefundGetResponse>;

  /**
   * Cancel a refund
   * @see /api/products/transfer/refunds/#transferrefundcancel
   */
  transferRefundCancel: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    refund_id: TransferRefundId;
  }) => Promise<TransferRefundCancelResponse>;

  /**
   * Create an originator for Transfer for Platforms customers
   * @see /api/products/transfer/platform-payments/#transferplatformoriginatorcreate
   */
  transferPlatformOriginatorCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    originator_client_id: TransferPlatformOriginatorClientId;
    tos_acceptance_metadata: TransferPlatformTosAcceptanceMetadata;
    /** ISO8601 timestamp indicating the most recent time the platform collected onboarding data from the originator */
    originator_reviewed_at: string;
    /** The webhook URL to which a `PLATFORM_ONBOARDING_UPDATE` webhook should be sent. */
    webhook?: string;
  }) => Promise<TransferPlatformOriginatorCreateResponse>;

  /**
   * Create a person associated with an originator
   * @see /api/products/transfer/platform-payments/#transferplatformpersoncreate
   */
  transferPlatformPersonCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    originator_client_id: TransferPlatformOriginatorClientId;
    name?: TransferPlatformPersonName;
    /** A valid email address. Must not have leading or trailing spaces. */
    email_address?: string;
    /** A valid phone number in E.164 format. Phone number input may be validated against valid number ranges; number strings that do not match a real-world phone numbering scheme may cause the request to fail, even in the Sandbox test environment. */
    phone_number?: string;
    address?: TransferPlatformPersonAddress;
    id_number?: TransferPlatformPersonIdNumber;
    /** The date of birth of the person. Formatted as YYYY-MM-DD. */
    date_of_birth?: string;
    /** The relationship between this person and the originator they are related to. */
    relationship_to_originator?: string;
    /** The percentage of ownership this person has in the onboarding business. Only applicable to beneficial owners with 25% or more ownership. */
    ownership_percentage?: number;
    /** The title of the person at the business. Only applicable to control persons - for example, "CEO", "President", "Owner", etc. */
    title?: string;
  }) => Promise<TransferPlatformPersonCreateResponse>;

  /**
   * Simulate a bank transfer event in Sandbox
   * @see /bank-transfers/reference/#sandboxbank_transfersimulate
   */
  sandboxBankTransferSimulate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    bank_transfer_id: BankTransferId;
    /** The asynchronous event to be simulated. May be: `posted`, `failed`, or `reversed`.  An error will be returned if the event type is incompatible with the current transfer status. Compatible status --> event type transitions include:  `pending` --> `failed`  `pending` --> `posted`  `posted` --> `reversed`  */
    event_type: string;
    failure_reason?: BankTransferFailure;
  }) => Promise<SandboxBankTransferSimulateResponse>;

  /**
   * Simulate creating a sweep
   * @see /api/sandbox/#sandboxtransfersweepsimulate
   */
  sandboxTransferSweepSimulate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Plaid’s unique identifier for a test clock. If provided, the sweep to be simulated is created on the day of the `virtual_time` on the `test_clock`. If the date of `virtual_time` is on weekend or a federal holiday, the next available banking day is used. */
    test_clock_id?: string | null;
    /** The webhook URL to which a `TRANSFER_EVENTS_UPDATE` webhook should be sent. */
    webhook?: string;
  }) => Promise<SandboxTransferSweepSimulateResponse>;

  /**
   * Simulate a transfer event in Sandbox
   * @see /api/sandbox/#sandboxtransfersimulate
   */
  sandboxTransferSimulate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    transfer_id: TransferId;
    /** Plaid’s unique identifier for a test clock. If provided, the event to be simulated is created at the `virtual_time` on the provided `test_clock`. */
    test_clock_id?: string | null;
    /** The asynchronous event to be simulated. May be: `posted`, `settled`, `failed`, `funds_available`, or `returned`.  An error will be returned if the event type is incompatible with the current transfer status. Compatible status --> event type transitions include:  `pending` --> `failed`  `pending` --> `posted`  `posted` --> `returned`  `posted` --> `settled`  `settled` --> `funds_available` (only applicable to ACH debits.)  */
    event_type: string;
    failure_reason?: TransferFailure;
    /** The webhook URL to which a `TRANSFER_EVENTS_UPDATE` webhook should be sent. */
    webhook?: string;
  }) => Promise<SandboxTransferSimulateResponse>;

  /**
   * Simulate a refund event in Sandbox
   * @see /api/sandbox/#sandboxtransferrefundsimulate
   */
  sandboxTransferRefundSimulate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    refund_id: TransferRefundId;
    /** Plaid’s unique identifier for a test clock. If provided, the event to be simulated is created at the `virtual_time` on the provided `test_clock`. */
    test_clock_id?: string | null;
    /** The asynchronous event to be simulated. May be: `refund.posted`, `refund.settled`, `refund.failed`, or `refund.returned`.  An error will be returned if the event type is incompatible with the current refund status. Compatible status --> event type transitions include:  `refund.pending` --> `refund.failed`  `refund.pending` --> `refund.posted`  `refund.posted` --> `refund.returned`  `refund.posted` --> `refund.settled`  `refund.posted` events can only be simulated if the refunded transfer has been transitioned to settled. This mimics the ordering of events in Production.  */
    event_type: string;
    failure_reason?: TransferFailure;
    /** The webhook URL to which a `TRANSFER_EVENTS_UPDATE` webhook should be sent. */
    webhook?: string;
  }) => Promise<SandboxTransferRefundSimulateResponse>;

  /**
   * Simulate converting pending balance to available balance
   * @see /api/sandbox/#sandboxtransferledgersimulate_available
   */
  sandboxTransferLedgerSimulateAvailable: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Specify which ledger balance to simulate converting pending balance to available balance. If this field is left blank, this will default to id of the default ledger balance. */
    ledger_id?: string | null;
    /** Client ID of the end customer (i.e. the originator). Only applicable to Transfer for Platforms customers. */
    originator_client_id?: string | null;
    /** Plaid’s unique identifier for a test clock. If provided, only the pending balance that is due before the `virtual_timestamp` on the test clock will be converted. */
    test_clock_id?: string | null;
    /** The webhook URL to which a `TRANSFER_EVENTS_UPDATE` webhook should be sent. */
    webhook?: string;
  }) => Promise<SandboxTransferLedgerSimulateAvailableResponse>;

  /**
   * Simulate a ledger deposit event in Sandbox
   * @see /api/sandbox/#sandboxtransferledgerdepositsimulate
   */
  sandboxTransferLedgerDepositSimulate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    sweep_id: TransferSweepId;
    event_type: TransferLedgerSweepSimulateEventType;
    failure_reason?: TransferFailure;
  }) => Promise<SandboxTransferLedgerDepositSimulateResponse>;

  /**
   * Simulate a ledger withdraw event in Sandbox
   * @see /api/sandbox/#sandboxtransferledgerwithdrawsimulate
   */
  sandboxTransferLedgerWithdrawSimulate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    sweep_id: TransferSweepId;
    event_type: TransferLedgerSweepSimulateEventType;
    failure_reason?: TransferFailure;
  }) => Promise<SandboxTransferLedgerWithdrawSimulateResponse>;

  /**
   * Trigger the creation of a repayment
   * @see /api/sandbox/#sandboxtransferrepaymentsimulate
   */
  sandboxTransferRepaymentSimulate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<SandboxTransferRepaymentSimulateResponse>;

  /**
   * Manually fire a Transfer webhook
   * @see /api/sandbox/#sandboxtransferfire_webhook
   */
  sandboxTransferFireWebhook: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The URL to which the webhook should be sent. */
    webhook: string;
  }) => Promise<SandboxTransferFireWebhookResponse>;

  /**
   * Create a test clock
   * @see /api/sandbox/#sandboxtransfertest_clockcreate
   */
  sandboxTransferTestClockCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The virtual timestamp on the test clock. If not provided, the current timestamp will be used. This will be of the form `2006-01-02T15:04:05Z`. */
    virtual_time?: string | null;
  }) => Promise<SandboxTransferTestClockCreateResponse>;

  /**
   * Advance a test clock
   * @see /api/sandbox/#sandboxtransfertest_clockadvance
   */
  sandboxTransferTestClockAdvance: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    test_clock_id: TransferTestClockId;
    new_virtual_time: VirtualTime;
  }) => Promise<SandboxTransferTestClockAdvanceResponse>;

  /**
   * Get a test clock
   * @see /api/sandbox/#sandboxtransfertest_clockget
   */
  sandboxTransferTestClockGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    test_clock_id: TransferTestClockId;
  }) => Promise<SandboxTransferTestClockGetResponse>;

  /**
   * List test clocks
   * @see /api/sandbox/#sandboxtransfertest_clocklist
   */
  sandboxTransferTestClockList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The start virtual timestamp of test clocks to return. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    start_virtual_time?: string | null;
    /** The end virtual timestamp of test clocks to return. This should be in RFC 3339 format (i.e. `2019-12-06T22:35:49Z`) */
    end_virtual_time?: string | null;
    /** The maximum number of test clocks to return. */
    count?: number | null;
    /** The number of test clocks to skip before returning results. */
    offset?: number;
  }) => Promise<SandboxTransferTestClockListResponse>;

  /**
   * Reset the login of a Payment Profile
   * @see /api/sandbox/#sandboxpayment_profilereset_login
   */
  sandboxPaymentProfileResetLogin: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    payment_profile_token: PaymentProfileToken;
  }) => Promise<SandboxPaymentProfileResetLoginResponse>;

  /**
   * Simulate a payment event in Sandbox
   * @see /api/sandbox/#sandboxpaymentsimulate
   */
  sandboxPaymentSimulate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the payment to simulate */
    payment_id: string;
    /** The webhook url to use for any payment events triggered by the simulated status change. */
    webhook: string;
    /** The status to set the payment to.  Valid statuses include: - `PAYMENT_STATUS_INITIATED` - `PAYMENT_STATUS_INSUFFICIENT_FUNDS` - `PAYMENT_STATUS_FAILED` - `PAYMENT_STATUS_EXECUTED` - `PAYMENT_STATUS_SETTLED` - `PAYMENT_STATUS_CANCELLED` - `PAYMENT_STATUS_REJECTED` */
    status: string;
  }) => Promise<SandboxPaymentSimulateResponse>;

  /**
   * Search employer database
   * @see /api/employers/#employerssearch
   */
  employersSearch: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The employer name to be searched for. */
    query: string;
    /** The Plaid products the returned employers should support. Currently, this field must be set to `"deposit_switch"`. */
    products: (string)[];
  }) => Promise<EmployersSearchResponse>;

  /**
   * (Deprecated) Create an income verification instance
   * @see /api/products/income/#incomeverificationcreate
   */
  incomeVerificationCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The URL endpoint to which Plaid should send webhooks related to the progress of the income verification process. */
    webhook: string;
    /** The ID of a precheck created with `/income/verification/precheck`. Will be used to improve conversion of the income verification flow. */
    precheck_id?: string;
    options?: IncomeVerificationCreateRequestOptions;
  }) => Promise<IncomeVerificationCreateResponse>;

  /**
   * (Deprecated) Retrieve information from the paystubs used for income verification
   * @see /api/products/income/#incomeverificationpaystubsget
   */
  incomeVerificationPaystubsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the verification for which to get paystub information. */
    income_verification_id?: string | null;
    access_token?: AccessTokenNullable;
  }) => Promise<IncomeVerificationPaystubsGetResponse>;

  /**
   * (Deprecated) Download the original documents used for income verification
   * @see /api/products/income/#incomeverificationdocumentsdownload
   */
  incomeVerificationDocumentsDownload: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the verification. */
    income_verification_id?: string | null;
    access_token?: AccessTokenNullable;
    /** The document ID to download. If passed, a single document will be returned in the resulting zip file, rather than all document */
    document_id?: string | null;
  }) => Promise<string>;

  /**
   * (Deprecated) Retrieve information from the tax documents used for income verification
   * @see /api/products/income/#incomeverificationtaxformsget
   */
  incomeVerificationTaxformsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the verification. */
    income_verification_id?: string | null;
    access_token?: AccessTokenNullable;
  }) => Promise<IncomeVerificationTaxformsGetResponse>;

  /**
   * (Deprecated) Check digital income verification eligibility and optimize conversion
   * @see /api/products/income/#incomeverificationprecheck
   */
  incomeVerificationPrecheck: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user?: IncomeVerificationPrecheckUser;
    employer?: IncomeVerificationPrecheckEmployer;
    payroll_institution?: IncomeVerificationPrecheckPayrollInstitution;
    transactions_access_token?: AccessTokenNullable;
    /** An array of access tokens corresponding to Items belonging to the user whose eligibility is being checked. Note that if the Items specified here are not already initialized with `transactions`, providing them in this field will cause these Items to be initialized with (and billed for) the Transactions product. */
    transactions_access_tokens?: (AccessToken)[];
    us_military_info?: IncomeVerificationPrecheckMilitaryInfo;
  }) => Promise<IncomeVerificationPrecheckResponse>;

  /**
   * (Deprecated) Retrieve a summary of an individual's employment information
   * @see /api/products/income/#employmentverificationget
   */
  employmentVerificationGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
  }) => Promise<EmploymentVerificationGetResponse>;

  /**
   * Create Asset or Income Report Audit Copy Token
   * @see /api/products/income/#creditaudit_copy_tokencreate
   */
  creditAuditCopyTokenCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** List of report tokens; can include at most one VOA/standard Asset Report tokens and one VOE Asset Report Token. */
    report_tokens: (string)[];
  }) => Promise<CreditAuditCopyTokenCreateResponse>;

  /**
   * Remove an Audit Copy token
   * @see /api/products/income/#creditaudit_copy_tokenremove
   */
  creditReportAuditCopyRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `audit_copy_token` granting access to the Audit Copy you would like to revoke. */
    audit_copy_token: string;
  }) => Promise<CreditAuditCopyTokenRemoveResponse>;

  /**
   * Retrieve an Asset Report with Freddie Mac format. Only Freddie Mac can use this endpoint.
   * @see /none/
   */
  creditAssetReportFreddieMacGet: (input: {
    /** A token that can be shared with a third party auditor to allow them to obtain access to the Asset Report. This token should be stored securely. */
    audit_copy_token: string;
    client_id?: ApiClientId;
    secret?: ApiSecret;
    [key: string]: unknown;
  }) => Promise<AssetReportFreddieGetResponse>;

  /**
   * Retrieve an Asset Report with Freddie Mac format (aka VOA - Verification Of Assets), and a Verification Of Employment (VOE) report if this one is available. Only Freddie Mac can use this endpoint.
   * @see /none/
   */
  creditFreddieMacReportsGet: (input: {
    /** A token that can be shared with a third party auditor to allow them to obtain access to the Asset Report. This token should be stored securely. */
    audit_copy_token: string;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<CreditFreddieMacReportsGetResponse>;

  /**
   * Retrieve information from the bank accounts used for employment verification
   * @see /api/products/income/#creditbank_employmentget
   */
  creditBankEmploymentGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token: UserToken;
  }) => Promise<CreditBankEmploymentGetResponse>;

  /**
   * Retrieve information from the bank accounts used for income verification
   * @see /api/products/income/#creditbank_incomeget
   */
  creditBankIncomeGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token?: UserToken;
    user_id?: NewUserId;
    options?: CreditBankIncomeGetRequestOptions;
  }) => Promise<CreditBankIncomeGetResponse>;

  /**
   * Retrieve information from the bank accounts used for income verification in PDF format
   * @see /api/products/income/#creditbank_incomepdfget
   */
  creditBankIncomePdfGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token: UserToken;
    user_id?: NewUserId;
  }) => Promise<CreditBankIncomePdfGetResponse>;

  /**
   * Refresh a user's bank income information
   * @see /api/products/income/#creditbank_incomerefresh
   */
  creditBankIncomeRefresh: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token: UserToken;
    user_id?: NewUserId;
    options?: CreditBankIncomeRefreshRequestOptions;
  }) => Promise<CreditBankIncomeRefreshResponse>;

  /**
   * Subscribe and unsubscribe to proactive notifications for a user's income profile
   * @see /api/products/income/#creditbank_incomewebhookupdate
   */
  creditBankIncomeWebhookUpdate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token: UserToken;
    user_id?: NewUserId;
    /** Whether the user should be enabled for proactive webhook notifications when their income changes */
    enable_webhooks: boolean;
  }) => Promise<CreditBankIncomeWebhookUpdateResponse>;

  /**
   * Update the parsing configuration for a document income verification
   * @see /api/products/income/#creditpayroll_incomeparsing_configupdate
   */
  creditPayrollIncomeParsingConfigUpdate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token: UserToken;
    user_id?: NewUserId;
    item_id?: ItemId;
    /** The types of analysis to enable for the document income verification session */
    parsing_config: (IncomeVerificationDocParsingConfig)[];
    [key: string]: unknown;
  }) => Promise<CreditPayrollIncomeParsingConfigUpdateResponse>;

  /**
   * Retrieve data for a user's uploaded bank statements
   * @see /api/products/income/#creditbank_statementsuploadsget
   */
  creditBankStatementsUploadsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token: UserToken;
    options?: CreditBankStatementsUploadsGetRequestOptions;
  }) => Promise<CreditBankStatementsUploadsGetResponse>;

  /**
   * Retrieve a user's payroll information
   * @see /api/products/income/#creditpayroll_incomeget
   */
  creditPayrollIncomeGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token?: UserToken;
    user_id?: NewUserId;
    options?: CreditPayrollIncomeGetRequestOptions;
  }) => Promise<CreditPayrollIncomeGetResponse>;

  /**
   * Retrieve fraud insights for a user's manually uploaded document(s).
   * @see /api/products/income/#creditpayroll_incomerisk_signalsget
   */
  creditPayrollIncomeRiskSignalsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token?: UserToken;
    user_id?: NewUserId;
  }) => Promise<CreditPayrollIncomeRiskSignalsGetResponse>;

  /**
   * Check income verification eligibility and optimize conversion
   * @see /api/products/income/#creditpayroll_incomeprecheck
   */
  creditPayrollIncomePrecheck: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token?: UserToken;
    user_id?: NewUserId;
    /** An array of access tokens corresponding to Items belonging to the user whose eligibility is being checked. Note that if the Items specified here are not already initialized with `transactions`, providing them in this field will cause these Items to be initialized with (and billed for) the Transactions product. */
    access_tokens?: (AccessToken)[];
    employer?: IncomeVerificationPrecheckEmployer;
    us_military_info?: IncomeVerificationPrecheckMilitaryInfo;
    payroll_institution?: IncomeVerificationPrecheckPayrollInstitution;
  }) => Promise<CreditPayrollIncomePrecheckResponse>;

  /**
   * Retrieve a summary of an individual's employment information
   * @see /api/products/income/#creditemploymentget
   */
  creditEmploymentGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token: UserToken;
  }) => Promise<CreditEmploymentGetResponse>;

  /**
   * Refresh a digital payroll income verification
   * @see /api/products/income/#creditpayroll_incomerefresh
   */
  creditPayrollIncomeRefresh: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token: UserToken;
    user_id?: NewUserId;
    options?: CreditPayrollIncomeRefreshRequestOptions;
  }) => Promise<CreditPayrollIncomeRefreshResponse>;

  /**
   * Create a relay token to share an Asset Report with a partner client
   * @see /api/products/assets/#creditrelaycreate
   */
  creditRelayCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** List of report token strings, with at most one token of each report type. Currently only Asset Report token is supported. */
    report_tokens: (string)[];
    /** The `secondary_client_id` is the client id of the third party with whom you would like to share the relay token. */
    secondary_client_id: string;
    /** URL to which Plaid will send webhooks when the Secondary Client successfully retrieves an Asset Report by calling `/credit/relay/get`. */
    webhook?: string | null;
  }) => Promise<CreditRelayCreateResponse>;

  /**
   * Retrieve the reports associated with a relay token that was shared with you
   * @see /api/products/assets/#creditrelayget
   */
  creditRelayGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `relay_token` granting access to the report you would like to get. */
    relay_token: string;
    report_type: ReportType;
    /** `true` if you would like to retrieve the Asset Report with Insights, `false` otherwise. This field defaults to `false` if omitted. */
    include_insights?: boolean;
  }) => Promise<AssetReportGetResponse>;

  /**
   * Retrieve the pdf reports associated with a relay token that was shared with you (beta)
   * @see /api/products/assets/#creditrelaypdfget
   */
  creditRelayPdfGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `relay_token` granting access to the report you would like to get. */
    relay_token: string;
    report_type: ReportType;
  }) => Promise<CreditRelayPdfGetResponse>;

  /**
   * Refresh a report of a relay token
   * @see /api/products/assets/#creditrelayrefresh
   */
  creditRelayRefresh: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `relay_token` granting access to the report you would like to refresh. */
    relay_token: string;
    report_type: ReportType;
    /** The URL registered to receive webhooks when the report of a relay token has been refreshed. */
    webhook?: string | null;
  }) => Promise<CreditRelayRefreshResponse>;

  /**
   * Remove relay token
   * @see /api/products/assets/#creditrelayremove
   */
  creditRelayRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `relay_token` you would like to revoke. */
    relay_token: string;
  }) => Promise<CreditRelayRemoveResponse>;

  /**
   * Manually fire a Bank Transfer webhook
   * @see /bank-transfers/reference/#sandboxbank_transferfire_webhook
   */
  sandboxBankTransferFireWebhook: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The URL to which the webhook should be sent. */
    webhook: string;
  }) => Promise<SandboxBankTransferFireWebhookResponse>;

  /**
   * Manually fire an Income webhook
   * @see /api/sandbox/#sandboxincomefire_webhook
   */
  sandboxIncomeFireWebhook: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The Item ID associated with the verification. */
    item_id: string;
    user_id?: UserId;
    /** The URL to which the webhook should be sent. */
    webhook: string;
    /** `VERIFICATION_STATUS_PROCESSING_COMPLETE`: The income verification status processing has completed. If the user uploaded multiple documents, this webhook will fire when all documents have finished processing. Call the `/income/verification/paystubs/get` endpoint and check the document metadata to see which documents were successfully parsed.  `VERIFICATION_STATUS_PROCESSING_FAILED`: A failure occurred when attempting to process the verification documentation.  `VERIFICATION_STATUS_PENDING_APPROVAL`: (deprecated) The income verification has been sent to the user for review. */
    verification_status?: "VERIFICATION_STATUS_PROCESSING_COMPLETE" | "VERIFICATION_STATUS_PROCESSING_FAILED" | "VERIFICATION_STATUS_PENDING_APPROVAL";
    webhook_code: SandboxIncomeWebhookFireRequestWebhookCode;
  }) => Promise<SandboxIncomeFireWebhookResponse>;

  /**
   * Manually fire a bank income webhook in sandbox
   * @see /api/sandbox/#sandboxbankincomefire_webhook
   */
  sandboxBankIncomeFireWebhook: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The URL to which the webhook should be sent. If provided, this will override the URL set in the dashboard. */
    webhook_override?: string;
    webhook_code: SandboxBankIncomeWebhookFireRequestWebhookCode;
    webhook_fields: SandboxBankIncomeWebhookFireRequestWebhookFields;
  }) => Promise<SandboxBankIncomeFireWebhookResponse>;

  /**
   * Trigger an update for Cash Flow Updates
   * @see /api/sandbox/#sandboxcracashflow_updatesupdate
   */
  sandboxCraCashflowUpdatesUpdate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    user_token?: UserToken;
    /** Webhook codes corresponding to the Cash Flow Updates events to be simulated. */
    webhook_codes?: (CashFlowUpdatesEventWebhookCodes)[] | null;
    user_id?: NewUserId;
  }) => Promise<SandboxCraCashflowUpdatesUpdateResponse>;

  /**
   * Save the selected accounts when connecting to the Platypus Oauth institution
   */
  sandboxOauthSelectAccounts: (input: {
    oauth_state_id: string;
    accounts: (string)[];
  }) => Promise<SandboxOauthSelectAccountsResponse>;

  /**
   * Evaluate a planned ACH transaction
   * @see /api/products/signal#signalevaluate
   */
  signalEvaluate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    /** The Plaid `account_id` of the account that is the funding source for the proposed transaction. The `account_id` is returned in the `/accounts/get` endpoint as well as the [`onSuccess`](https://plaid.com/docs/link/ios/#link-ios-onsuccess-linkSuccess-metadata-accounts-id) callback metadata.  This will return an [`INVALID_ACCOUNT_ID`](https://plaid.com/docs/errors/invalid-input/#invalid_account_id) error if the account has been removed at the bank or if the `account_id` is no longer valid. */
    account_id: string;
    /** The unique ID that you would like to use to refer to this evaluation attempt - for example, a payment attempt ID. You will use this later to debug this evaluation, and/or report an ACH return, etc. The max length for this field is 36 characters. */
    client_transaction_id: string;
    /** The transaction amount, in USD (e.g. `102.05`) */
    amount: number;
    /** `true` if the end user is present while initiating the ACH transfer and the endpoint is being called; `false` otherwise (for example, when the ACH transfer is scheduled and the end user is not present, or you call this endpoint after the ACH transfer but before submitting the Nacha file for ACH processing). When using a Balance-only ruleset, this field is ignored. This field is not currently used as part of Signal Transaction Score evaluations, but may be used in the future. */
    user_present?: boolean | null;
    /** A unique ID that identifies the end user in your system. This ID is used to correlate requests by a user with multiple Items. Personally identifiable information, such as an email address or phone number, should not be used in the `client_user_id`. */
    client_user_id?: string;
    /** Use `true` if the ACH transaction is a part of recurring schedule (for example, a monthly repayment); `false` otherwise. When using a Balance-only ruleset, this field is ignored. */
    is_recurring?: boolean | null;
    /** The default ACH payment method to complete the transaction. When using a Balance-only ruleset, this field is ignored. `SAME_DAY_ACH`: Same Day ACH by Nacha. The debit transaction is processed and settled on the same day. `STANDARD_ACH`: Standard ACH by Nacha. `MULTIPLE_PAYMENT_METHODS`: If there is no default debit rail or there are multiple payment methods. Possible values:  `SAME_DAY_ACH`, `STANDARD_ACH`, `MULTIPLE_PAYMENT_METHODS` */
    default_payment_method?: string | null;
    user?: SignalUser;
    device?: SignalDevice;
    /** Specifying `risk_profile_key` is deprecated. Please provide `ruleset` instead. */
    risk_profile_key?: string | null;
    /** The key of the ruleset to use for evaluating this transaction. You can create a ruleset using the Plaid Dashboard, under [Signal->Rules](https://dashboard.plaid.com/signal/risk-profiles). If not provided, for all new customers as of October 15, 2025, the `default` ruleset will be used. For existing Signal Transaction Scores customers as of October 15, 2025, by default, no ruleset will be used if the `ruleset_key` is not provided. For more information, or to opt out of using rulesets, see [Signal Rules](https://plaid.com/docs/signal/signal-rules/). */
    ruleset_key?: string | null;
  }) => Promise<SignalEvaluateResponse>;

  /**
   * Schedule a planned ACH transaction
   * @see none
   */
  signalSchedule: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
    /** The Plaid `account_id` of the account that is the funding source for the proposed transaction. The `account_id` is returned in the `/accounts/get` endpoint as well as the [`onSuccess`](https://plaid.com/docs/link/ios/#link-ios-onsuccess-linkSuccess-metadata-accounts-id) callback metadata.  This will return an [`INVALID_ACCOUNT_ID`](https://plaid.com/docs/errors/invalid-input/#invalid_account_id) error if the account has been removed at the bank or if the `account_id` is no longer valid. */
    account_id: string;
    /** The unique ID that you would like to use to refer to this transaction. For your convenience mapping your internal data, you could use your internal ID/identifier for this transaction. The max length for this field is 36 characters. */
    client_transaction_id: string;
    /** The transaction amount, in USD (e.g. `102.05`) */
    amount: number;
    default_payment_method?: SignalScheduleDefaultPaymentMethod;
  }) => Promise<SignalScheduleResponse>;

  /**
   * Report whether you initiated an ACH transaction
   * @see /api/products/signal#signaldecisionreport
   */
  signalDecisionReport: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Must be the same as the `client_transaction_id` supplied when calling `/signal/evaluate` */
    client_transaction_id: string;
    /** `true` if the ACH transaction was initiated, `false` otherwise.  This field must be returned as a boolean. If formatted incorrectly, this will result in an [`INVALID_FIELD`](https://plaid.com/docs/errors/invalid-request/#invalid_field) error. */
    initiated: boolean;
    /** The actual number of days (hold time) since the ACH debit transaction that you wait before making funds available to your customers. The holding time could affect the ACH return rate.  For example, use 0 if you make funds available to your customers instantly or the same day following the debit transaction, or 1 if you make funds available the next day following the debit initialization. */
    days_funds_on_hold?: number | null;
    decision_outcome?: SignalDecisionOutcome;
    payment_method?: SignalPaymentMethod;
    /** The amount (in USD) made available to your customers instantly following the debit transaction. It could be a partial amount of the requested transaction (example: 102.05). */
    amount_instantly_available?: number | null;
    /** The date the ACH debit was submitted to the bank for processing (in ISO 8601 format: `YYYY-MM-DDTHH:mm:ssZ`). This field should correspond to the attempt initiated after the `/signal/schedule` call. */
    submitted_at?: string;
  }) => Promise<SignalDecisionReportResponse>;

  /**
   * Report a return for an ACH transaction
   * @see /api/products/signal#signalreturnreport
   */
  signalReturnReport: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** Must be the same as the `client_transaction_id` supplied when calling `/signal/evaluate` or `/accounts/balance/get`. */
    client_transaction_id: string;
    /** Must be a valid ACH return code (e.g. "R01")  If formatted incorrectly, this will result in an [`INVALID_FIELD`](https://plaid.com/docs/errors/invalid-request/#invalid_field) error. */
    return_code: string;
    /** Date and time when you receive the returns from your payment processors, in ISO 8601 format (`YYYY-MM-DDTHH:mm:ssZ`). */
    returned_at?: string | null;
  }) => Promise<SignalReturnReportResponse>;

  /**
   * Opt-in an Item to Signal Transaction Scores
   * @see /api/products/signal#signalprepare
   */
  signalPrepare: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    access_token: AccessToken;
  }) => Promise<SignalPrepareResponse>;

  /**
   * Create an e-wallet
   * @see /api/products/virtual-accounts/#walletcreate
   */
  walletCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    iso_currency_code: WalletIsoCurrencyCode;
  }) => Promise<WalletCreateResponse>;

  /**
   * Fetch an e-wallet
   * @see /api/products/virtual-accounts/#walletget
   */
  walletGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the e-wallet */
    wallet_id: string;
  }) => Promise<WalletGetResponse>;

  /**
   * Fetch a list of e-wallets
   * @see /api/products/virtual-accounts/#walletlist
   */
  walletList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    iso_currency_code?: WalletIsoCurrencyCode;
    /** A base64 value representing the latest e-wallet that has already been requested. Set this to `next_cursor` received from the previous `/wallet/list` request. If provided, the response will only contain e-wallets created before that e-wallet. If omitted, the response will contain e-wallets starting from the most recent, and in descending order. */
    cursor?: string;
    /** The number of e-wallets to fetch */
    count?: number;
  }) => Promise<WalletListResponse>;

  /**
   * Execute a transaction using an e-wallet
   * @see /api/products/virtual-accounts/#wallettransactionexecute
   */
  walletTransactionExecute: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    idempotency_key: WalletTransactionIdempotencyKey;
    /** The ID of the e-wallet to debit from */
    wallet_id: string;
    counterparty: WalletTransactionCounterparty;
    amount: WalletTransactionAmount;
    /** A reference for the transaction. This must be an alphanumeric string with 6 to 18 characters and must not contain any special characters or spaces. Ensure that the `reference` field is unique for each transaction. */
    reference: string;
    originating_fund_source?: OriginatingFundSource;
  }) => Promise<WalletTransactionExecuteResponse>;

  /**
   * Fetch an e-wallet transaction
   * @see /api/products/virtual-accounts/#wallettransactionget
   */
  walletTransactionGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the transaction to fetch */
    transaction_id: string;
  }) => Promise<WalletTransactionGetResponse>;

  /**
   * List e-wallet transactions
   * @see /api/products/virtual-accounts/#wallettransactionlist
   */
  walletTransactionList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID of the e-wallet to fetch transactions from */
    wallet_id: string;
    /** A value representing the latest transaction to be included in the response. Set this from `next_cursor` received in the previous `/wallet/transaction/list` request. If provided, the response will only contain that transaction and transactions created before it. If omitted, the response will contain transactions starting from the most recent, and in descending order by the `created_at` time. */
    cursor?: string;
    /** The number of transactions to fetch */
    count?: number;
    options?: WalletTransactionListRequestOptions;
  }) => Promise<WalletTransactionListResponse>;

  /**
   * enhance locally-held transaction data
   */
  transactionsEnhance: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The type of account for the requested transactions (`depository` or `credit`). */
    account_type: string;
    /** An array of raw transactions to be enhanced. */
    transactions: (ClientProvidedRawTransaction)[];
  }) => Promise<TransactionsEnhanceGetResponse>;

  /**
   * Create transaction category rule
   */
  transactionsRulesCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A unique ID representing the end user. This ID is used to associate rules with a specific user. */
    client_user_id: string;
    pfc_primary_category: PfcPrimaryCategory;
    pfc_detailed_category: PfcDetailedCategory;
    rule_details: TransactionsRuleDetails;
  }) => Promise<TransactionsRulesCreateResponse>;

  /**
   * Return a list of rules created for the Item associated with the access token.
   */
  transactionsRulesList: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A unique ID representing the end user whose rules should be listed. */
    client_user_id: string;
  }) => Promise<TransactionsRulesListResponse>;

  /**
   * Remove transaction rule
   */
  transactionsRulesRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A unique ID representing the end user the rule belongs to. */
    client_user_id: string;
    /** A rule's unique identifier */
    rule_id: string;
  }) => Promise<TransactionsRulesRemoveResponse>;

  /**
   * Obtain user insights based on transactions sent through /transactions/enrich
   * @see /api/products/enrich/#userinsightsget
   */
  transactionsUserInsightsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A unique client-provided `client_user_id` to retrieve insights for. */
    client_user_id: string;
  }) => Promise<TransactionsUserInsightsGetResponse>;

  /**
   * Get EWA Score Report
   * @see /api/products/beta/#betaewareportv1get
   */
  betaEwaReportV1Get: (input: {
    access_token: AccessToken;
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<BetaEwaReportV1GetResponse>;

  /**
   * Search for an Issue
   * @see /api/products/issues#issuessearch
   */
  issuesSearch: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A unique identifier for the Plaid Item. */
    item_id?: string;
    /** A unique identifier for the Link session. */
    link_session_id?: string;
    /** The `request_id` for the Link session that might have had an institution connection issue. */
    link_session_request_id?: string;
  }) => Promise<IssuesSearchResponse>;

  /**
   * Get an Issue
   * @see /api/products/issues/#issuesget
   */
  issuesGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The unique identifier of the issue to retrieve. */
    issue_id: string;
  }) => Promise<IssuesGetResponse>;

  /**
   * Subscribe to an Issue
   * @see /api/products/issues/#issuessubscribe
   */
  issuesSubscribe: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The unique identifier of the issue to subscribe to. */
    issue_id: string;
    /** The webhook URL where notifications should be sent when the issue status changes. */
    webhook: string;
  }) => Promise<IssuesSubscribeResponse>;

  /**
   * Create payment profile
   * @see /api/products/transfer/#payment_profilecreate
   */
  paymentProfileCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
  }) => Promise<PaymentProfileCreateResponse>;

  /**
   * Get payment profile
   * @see /api/products/transfer/#payment_profileget
   */
  paymentProfileGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    payment_profile_token: PaymentProfileToken;
  }) => Promise<PaymentProfileGetResponse>;

  /**
   * Remove payment profile
   * @see /api/products/transfer/#payment_profileremove
   */
  paymentProfileRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    payment_profile_token: PaymentProfileToken;
  }) => Promise<PaymentProfileRemoveResponse>;

  /**
   * Creates a new end customer for a Plaid reseller.
   * @see /api/partner/#partnercustomercreate
   */
  partnerCustomerCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The company name of the end customer being created. This will be used to display the end customer in the Plaid Dashboard. It will not be shown to end users. */
    company_name: string;
    /** Denotes whether or not the partner has completed attestation of diligence for the end customer to be created. */
    is_diligence_attested: boolean;
    /** The products to be enabled for the end customer. If empty or `null`, this field will default to the products enabled for the reseller at the time this endpoint is called. */
    products?: (Products)[];
    /** If `true`, the end customer's default Link customization will be set to match the partner's. You can always change the end customer's Link customization in the Plaid Dashboard. See the [Link Customization docs](https://plaid.com/docs/link/customization/) for more information. If you require the ability to programmatically create end customers using multiple different Link customization profiles, contact your Plaid Account Manager for assistance.  Important: Data Transparency Messaging (DTM) use cases will not be copied to the end customer's Link customization unless the **Publish changes** button is clicked after the use cases are applied. Link will not work in Production unless the end customer's DTM use cases are configured. For more details, see [Data Transparency Messaging](https://plaid.com/docs/link/data-transparency-messaging-migration-guide/). */
    create_link_customization?: boolean;
    /** Base64-encoded representation of the end customer's logo. Must be a PNG of size 1024x1024 under 4MB. The logo will be shared with financial institutions and shown to the end user during Link flows. A logo is required if `create_link_customization` is `true`. If `create_link_customization` is `false` and the logo is omitted, the partner's logo will be used if one exists, otherwise a stock logo will be used. */
    logo?: string;
    /** The end customer's legal name. This will be shared with financial institutions as part of the OAuth registration process. It will not be shown to end users. */
    legal_entity_name: string;
    /** The end customer's website. */
    website: string;
    /** The name of the end customer's application. This will be shown to end users when they go through the Plaid Link flow. The application name must be unique and cannot match the name of another application already registered with Plaid. */
    application_name: string;
    technical_contact?: PartnerEndCustomerTechnicalContact;
    billing_contact?: PartnerEndCustomerBillingContact;
    customer_support_info?: PartnerEndCustomerCustomerSupportInfo;
    address: PartnerEndCustomerAddress;
    /** Denotes whether the partner has forwarded the Plaid bank addendum to the end customer. */
    is_bank_addendum_completed: boolean;
    assets_under_management?: PartnerEndCustomerAssetsUnderManagement;
    /** A list of URIs indicating the destination(s) where a user can be forwarded after completing the Link flow; used to support OAuth authentication flows when launching Link in the browser or another app. URIs should not contain any query parameters. When used in Production, URIs must use https. To modify redirect URIs for an end customer after creating them, go to the end customer's [API page](https://dashboard.plaid.com/team/api) in the Dashboard. */
    redirect_uris?: (string)[];
    /** The unique identifier assigned to a financial institution by regulatory authorities, if applicable. For banks, this is the FDIC Certificate Number. For credit unions, this is the Credit Union Charter Number. */
    registration_number?: string;
  }) => Promise<PartnerCustomerCreateResponse>;

  /**
   * Returns a Plaid reseller's end customer.
   * @see /api/partner/#partnercustomerget
   */
  partnerCustomerGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    end_customer_client_id: string;
  }) => Promise<PartnerCustomerGetResponse>;

  /**
   * Enables a Plaid reseller's end customer in the Production environment.
   * @see /api/partner/#partnercustomerenable
   */
  partnerCustomerEnable: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    end_customer_client_id: string;
  }) => Promise<PartnerCustomerEnableResponse>;

  /**
   * Removes a Plaid reseller's end customer.
   * @see /api/partner/#partnercustomerremove
   */
  partnerCustomerRemove: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The `client_id` of the end customer to be removed. */
    end_customer_client_id: string;
  }) => Promise<PartnerCustomerRemoveResponse>;

  /**
   * Returns OAuth-institution registration information for a given end customer.
   * @see /api/partner/#partnercustomeroauth_institutionsget
   */
  partnerCustomerOauthInstitutionsGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    end_customer_client_id: string;
  }) => Promise<PartnerCustomerOAuthInstitutionsGetResponse>;

  /**
   * Creates a new end customer for a Plaid reseller.
   * @see /api/partner/#partnercustomercreate
   */
  betaPartnerCustomerV1Create: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The company name of the end customer being created. This will be used to display the end customer in the Plaid Dashboard. It will not be shown to end users. */
    company_name: string;
    /** Denotes whether or not the partner has completed attestation of diligence for the end customer to be created. */
    is_diligence_attested?: boolean;
    /** The products to be enabled for the end customer. If empty or `null`, this field will default to the products enabled for the reseller at the time this endpoint is called. */
    products?: (Products)[];
    /** If `true`, the end customer's default Link customization will be set to match the partner's. You can always change the end customer's Link customization in the Plaid Dashboard. See the [Link Customization docs](https://plaid.com/docs/link/customization/) for more information. If you require the ability to programmatically create end customers using multiple different Link customization profiles, contact your Plaid Account Manager for assistance.  Important: Data Transparency Messaging (DTM) use cases will not be copied to the end customer's Link customization unless the **Publish changes** button is clicked after the use cases are applied. Link will not work in Production unless the end customer's DTM use cases are configured. For more details, see [Data Transparency Messaging](https://plaid.com/docs/link/data-transparency-messaging-migration-guide/). */
    create_link_customization?: boolean;
    /** Base64-encoded representation of the end customer's logo. Must be a PNG of size 1024x1024 under 4MB. The logo will be shared with financial institutions and shown to the end user during Link flows. A logo is required if `create_link_customization` is `true`. If `create_link_customization` is `false` and the logo is omitted, the partner's logo will be used if one exists, otherwise a stock logo will be used. */
    logo?: string;
    /** The end customer's legal name. This will be shared with financial institutions as part of the OAuth registration process. It will not be shown to end users. */
    legal_entity_name?: string;
    /** The end customer's website. */
    website: string;
    /** The name of the end customer's application. This will be shown to end users when they go through the Plaid Link flow. The application name must be unique and cannot match the name of another application already registered with Plaid. */
    application_name: string;
    technical_contact?: PartnerEndCustomerTechnicalContact;
    billing_contact?: PartnerEndCustomerBillingContact;
    customer_support_info: PartnerEndCustomerCustomerSupportInfo;
    address: PartnerEndCustomerAddress;
    /** A list of URIs indicating the destination(s) where a user can be forwarded after completing the Link flow; used to support OAuth authentication flows when launching Link in the browser or another app. URIs should not contain any query parameters. When used in Production, URIs must use https. To modify redirect URIs for an end customer after creating them, go to the end customer's [API page](https://dashboard.plaid.com/team/api) in the Dashboard. */
    redirect_uris?: (string)[];
    bank_addendum_acceptance?: PartnerEndCustomerBankAddendumAcceptance;
    questionnaires?: PartnerEndCustomerQuestionnaires;
  }) => Promise<BetaPartnerCustomerV1CreateResponse>;

  /**
   * Retrieves the details of a Plaid reseller's end customer.
   * @see /api/partner/#partnercustomerget
   */
  betaPartnerCustomerV1Get: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    end_customer_client_id: string;
  }) => Promise<BetaPartnerCustomerV1GetResponse>;

  /**
   * Updates an existing end customer.
   * @see /api/partner/#partnercustomercreate
   */
  betaPartnerCustomerV1Update: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    end_customer_client_id: string;
    legal_entity_name?: string;
    redirect_uris?: (string)[];
    bank_addendum_acceptance?: PartnerEndCustomerBankAddendumAcceptance;
    questionnaires?: PartnerEndCustomerQuestionnaires;
    [key: string]: unknown;
  }) => Promise<BetaPartnerCustomerV1UpdateResponse>;

  /**
   * Enables a Plaid reseller's end customer in the Production environment.
   * @see /api/partner/#partnercustomerenable
   */
  betaPartnerCustomerV1Enable: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    end_customer_client_id: string;
    products?: (Products)[];
    [key: string]: unknown;
  }) => Promise<BetaPartnerCustomerV1EnableResponse>;

  /**
   * Create Hosted Link session
   * @see /assets/waitlist/hosted-link/
   */
  linkDeliveryCreate: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A `link_token` from a previous invocation of `/link/token/create`. */
    link_token: string;
    options?: LinkDeliveryOptions;
  }) => Promise<LinkDeliveryCreateResponse>;

  /**
   * Get Hosted Link session
   * @see /assets/waitlist/hosted-link/
   */
  linkDeliveryGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** The ID for the Hosted Link session from a previous invocation of `/link_delivery/create`. */
    link_delivery_session_id: string;
  }) => Promise<LinkDeliveryGetResponse>;

  /**
   * Webhook receiver for fdx notifications
   * @see /api/fdx/notifications/#post
   */
  fdxNotifications: (input: {
    /** Id of notification */
    notificationId: string;
    type: FdxNotificationType;
    /** An optional initiator-defined event subtype code or description if the event type needs to be further categorized or described. */
    subtype?: string;
    sentOn: FdxTimestamp;
    category: FdxNotificationCategory;
    severity?: FdxNotificationSeverity;
    priority?: FdxNotificationPriority;
    publisher?: FdxParty;
    subscriber?: FdxParty;
    notificationPayload: FdxNotificationPayload;
    url?: FdxHateoasLink;
  }) => Promise<PlaidError>;

  /**
   * Get Recipients
   */
  getRecipients: () => Promise<GetRecipientsResponse>;

  /**
   * Get Recipient
   */
  getRecipient: (input: {
    /** Recipient Identifier. Uniquely identifies the recipient */
    recipientId: string;
  }, options?: { headers?: { "OAUTH-STATE-ID"?: string } }) => Promise<GetRecipientResponse>;

  /**
   * Retrieve network insights for the provided `access_tokens`
   * @see /api/network_insights/report/#get
   */
  networkInsightsReportGet: (input: {
    client_id?: ApiClientId;
    secret?: ApiSecret;
    /** A list of access tokens that the Network Insights will be requested for. These correspond to previous Items a user has connected. */
    access_tokens: (AccessToken)[];
  }) => Promise<NetworkInsightsReportGetResponse>;
};

export * from "./schemas.js";
