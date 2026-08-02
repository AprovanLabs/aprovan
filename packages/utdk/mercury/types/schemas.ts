/** A summary of a SAFE request. */
export type ApiSafeRequest = {
  canceledAt?: UtcTime | null;
  discountRate?: number | null;
  documentUrl: string;
  expiresAt: UtcTime;
  governingState?: UsState | null;
  id: SafeRequestId;
  includesMostFavoredNationClause: boolean;
  includesProRataRightsLetter: boolean;
  investmentAmount: PositiveDollar;
  investmentDate: Day;
  investor: ApiSafeRequestInvestor;
  organization: ApiSafeRequestOrganization;
  paidAt?: UtcTime | null;
  signedByInvestorAt?: UtcTime | null;
  signedByOwnerAt?: UtcTime | null;
  valuationCap?: PositiveDollar | null;
  valuationType: ValuationType;
};

/** Details about the investor buying the equity. */
export type ApiSafeRequestInvestor = {
  additionalBylines?: string | null;
  address?: string | null;
  investorType: SafeRequestInvestorType;
  legalEntityName: string;
  signatoryEmail: Email;
  signatoryName: string;
  signatoryTitle?: string | null;
};

/** Details about the organization selling the equity */
export type ApiSafeRequestOrganization = {
  legalEntityName: string;
  signatoryEmail: Email;
  signatoryName: string;
  signatoryTitle: string;
};

export type Account = {
  accountNumber: string;
  availableBalance: number;
  canReceiveTransactions?: boolean | null;
  createdAt: UtcTime;
  currentBalance: number;
  dashboardLink: string;
  id: TransactionPartyId;
  kind: string;
  legalBusinessName: string;
  name: string;
  nickname?: string | null;
  routingNumber: string;
  status: AccountStatus;
  type: AccountType;
};

export type AccountCard = {
  cardId: string;
  createdAt: UtcTime;
  lastFourDigits: string;
  nameOnCard: string;
  network: CardNetwork;
  physicalCardStatus?: PhysicalCardStatus | null;
  status: CardStatus;
};

export type AccountCardsResponse = {
  cards: (AccountCard)[];
};

/** ID for the account statement */
export type AccountStatementId = string;

export type AccountStatementTransaction = {
  createdAt: UtcTime;
  id: TransactionMetadataId;
  postedAt?: UtcTime | null;
};

export type AccountStatus = "active" | "deleted" | "pending" | "archived";

export type AccountType = "mercury" | "external" | "recipient";

/** Paginated response containing a list of accounts.  | Use the page cursor information to fetch additional pages of accounts. */
export type AccountsPaginatedResponse = {
  /**  List of accounts in the current page */
  accounts: (Account)[];
  /**  Pagination information including cursors for navigating to next/previous pages */
  page: { nextPage?: TransactionPartyId; previousPage?: TransactionPartyId };
};

export type AddRecipientRequest = {
  /** Deprecated. Use checkInfo instead. */
  address?: AddressData;
  /** Information needed to send a physical check. */
  checkInfo?: CheckInfoRaw;
  /** Contact email address of the recipient */
  contactEmail?: Email;
  /** Information needed to send a domestic wire. */
  domesticWireRoutingInfo?: DomesticWireRoutingInfoRaw;
  /** Information needed to send an ACH. */
  electronicRoutingInfo?: ElectronicRoutingInfoRaw;
  emails: (Email)[];
  name: string;
  nickname?: string;
};

export type Address = {
  address1: string;
  address2?: string | null;
  city: string;
  country: Iso3166Alpha2;
  name: string;
  postalCode: string;
  region: Region;
};

export type AddressData = {
  address1: string;
  address2?: string | null;
  city: string;
  postalCode: string;
  state?: UsState | null;
};

export type AddressWithoutName = {
  address1: string;
  address2?: string | null;
  city: string;
  country: Iso3166Alpha2;
  postalCode: string;
  region: Region;
};

/** ID for the API event */
export type ApiEventId = string;

export type ApiEventOperationType = "create" | "update" | "delete";

export type ApiEventResourceType = "transaction" | "checkingAccount" | "savingsAccount" | "treasuryAccount" | "investmentAccount" | "creditAccount";

/** Represents a single event in the Mercury API event stream.  | Events track changes to resources over time, providing an audit trail  | of all modifications with before/after values and metadata about what changed. */
export type ApiEventResponse = {
  /**  List of JSON paths that were modified in this event */
  changedPaths: (string)[];
  id: ApiEventId & unknown;
  /**  JSON object containing the fields that were changed and their new values */
  mergePatch: { [key: string]: unknown };
  occurredAt: UtcTime & unknown;
  operationType: ApiEventOperationType & unknown;
  /**  JSON object containing the fields that were changed and their previous values before the update */
  previousValues?: { [key: string]: unknown } | null;
  resourceId: Uuid & unknown;
  resourceType: ApiEventResourceType & unknown;
  resourceVersion: ResourceVersion & unknown;
};

/** Paginated response containing a list of API events.  | Use the page cursor information to fetch additional pages of events. */
export type ApiEventsPaginatedResponse = {
  /**  List of events in the current page */
  events: (ApiEventResponse)[];
  /**  Pagination information including cursors for navigating to next/previous pages */
  page: { nextPage?: ApiEventId; previousPage?: ApiEventId };
};

export type ApiOrganizationKind = "personal" | "business";

export type ApiSendEmailOption = "DontSend" | "SendNow";

/** Request body for updating transaction metadata via the public API */
export type ApiUpdateTransactionRequest = {
  categoryId: CategoryId & unknown;
  note: NoteUpdate & unknown;
};

export type ApiUserRole = "administrator" | "bookkeeper" | "customUser" | "cardOnlyUser" | "employee";

/** The object representing a file attachment for an invoice.  The file is not a part of this object itself but information  for where to download it will be in this object. */
export type ApiV1ArAttachmentResponseData = {
  /**  The filename for the file. */
  fileName: string;
  id: AttachmentId & unknown;
  /**  The signed download URL for the file itself. */
  url: string;
};

/** The response type for fetching attachments related to an AR Invoice. */
export type ApiV1ArAttachmentsResponseData = {
  /**  The list of attachments */
  attachments: (ApiV1ArAttachmentResponseData)[];
};

/** Customer address information for Accounts Receivable API */
export type ApiV1ArCustomerAddress = {
  /**  Primary street address line. */
  address1: string;
  /**  Secondary street address line (optional). */
  address2?: string | null;
  /**  City name. */
  city: string;
  country: Iso3166Alpha2 & unknown;
  /**  Postal or ZIP code */
  postalCode: string;
  region: Region & unknown;
};

/** Address input for creating or updating customers */
export type ApiV1ArCustomerAddressInput = {
  /**  Primary street address line. */
  address1: string;
  /**  Secondary street address line (optional). */
  address2?: string | null;
  /**  City name. */
  city: string;
  country: Iso3166Alpha2 & unknown;
  /**  The mailing name of the address. */
  name: string;
  /**  Postal or ZIP code. */
  postalCode: string;
  region: Region & unknown;
};

/** Request data to create a customer using the public api */
export type ApiV1ArCustomerCreateRequest = {
  address?: ApiV1ArCustomerAddressInput & unknown | null;
  email: Email & unknown;
  /**  The name of the customer. */
  name: string;
};

/** Paginated response data for Accounts Receivable customers API endpoint */
export type ApiV1ArCustomerPaginatedResponseData = {
  /**  The list of customers for this page */
  customers: (ApiV1ArCustomerResponseData)[];
  /**  Pagination cursors for navigating to next/previous pages */
  page: { nextPage?: CustomerId; previousPage?: CustomerId };
};

/** Response data for Accounts Receivable customer API endpoints */
export type ApiV1ArCustomerResponseData = {
  address?: ApiV1ArCustomerAddress & unknown | null;
  deletedAt?: UtcTime & unknown | null;
  email: Email & unknown;
  id: CustomerId & unknown;
  /**  Name of customer. */
  name: string;
};

/** Request data to update a customer using the public api */
export type ApiV1ArCustomerUpdateRequest = {
  address?: ApiV1ArCustomerAddressInput & unknown | null;
  email: Email & unknown;
  /**  The name of the customer. */
  name: string;
  /**  Open invoices for the customer will be resent with updated data  when this is true. */
  resendOpenInvoices: boolean;
};

/** The request body to create an invoice. */
export type ApiV1ArInvoiceCreateRequest = {
  /**  Whether or not the invoice can be paid via ACH debit. */
  achDebitEnabled: boolean;
  /**  Emails to be CCed on invoice notifications/reminders. */
  ccEmails: (Email)[];
  /**  Whether or not the invoice can be paid via credit card. Requires Stripe to be setup for the Mercury account. */
  creditCardEnabled: boolean;
  customerId: CustomerId & unknown;
  destinationAccountId: TransactionPartyId & unknown;
  dueDate: Day & unknown;
  /**  Internal note for the invoice, visible by users in the organization but not visible to payers. */
  internalNote?: string | null;
  invoiceDate: Day & unknown;
  /**  The payer facing invoice number/identifier. */
  invoiceNumber?: string | null;
  /**  The line items for the invoice */
  lineItems: (ApiV1ArLineItemData)[];
  /**  Memo for the payer of the invoice. */
  payerMemo?: string | null;
  /**  Purchase order number for the invoice, if applicable. */
  poNumber?: string | null;
  sendEmailOption?: ApiSendEmailOption & unknown | null;
  servicePeriodEndDate?: Day & unknown | null;
  servicePeriodStartDate?: Day & unknown | null;
  /**  Whether or not the invoice payment instructions will show the real account and routing number for the destination account or use virtual account numbers instead. Virtual accounts are safer and are preferred in most cases. */
  useRealAccountNumber: boolean;
};

/** The response type for an invoice in the api. */
export type ApiV1ArInvoiceResponse = {
  /**  Whether or not the invoice can be paid via ach debit. */
  achDebitEnabled: boolean;
  amount: NonNegativeDollar & unknown;
  canceledAt?: UtcTime & unknown | null;
  /**  Emails to be CCed on invoice notifications/reminders. */
  ccEmails: (Email)[];
  createdAt: UtcTime & unknown;
  /**  Whether or not the invoice can be paid via credit card. Requires stripe to be  setup for the Mercury account. */
  creditCardEnabled: boolean;
  customerId: CustomerId & unknown;
  destinationAccountId: TransactionPartyId & unknown;
  dueDate: Day & unknown;
  id: InvoiceId & unknown;
  /**  Internal note for the invoice, visible by users in the  mercury organization but not visible to payers. */
  internalNote?: string | null;
  invoiceDate: Day & unknown;
  /**  The payer facing invoice number/identifier. */
  invoiceNumber: string;
  /**  The line items for the invoice. */
  lineItems: (ApiV1ArLineItemData)[];
  /**  Memo for the payer of the invoice. */
  payerMemo?: string | null;
  /**  Purchase order number for the invoice if applicable. */
  poNumber?: string | null;
  servicePeriodEndDate?: Day & unknown | null;
  servicePeriodStartDate?: Day & unknown | null;
  /**  Public slug for an invoice. Used to construct the pay page URL  as well as the URL to retrieve the PDF of the invoice. */
  slug: string;
  status: PaymentLinkStatus & unknown;
  updatedAt: UtcTime & unknown;
  /**  Whether or not the invoice payment instructions will show the real  account and routing number for the destination account or use  virtual account numbers instead. */
  useRealAccountNumber: boolean;
};

/** The request body to update an invoice. */
export type ApiV1ArInvoiceUpdateRequest = {
  /**  Whether or not the invoice can be paid via ACH debit. */
  achDebitEnabled: boolean;
  /**  List of emails to be CCed on notifications/reminders. */
  ccEmails: (Email)[];
  /**  Whether or not the invoice can be paid via credit card. Requires Stripe to be setup for the Mercury account. */
  creditCardEnabled: boolean;
  dueDate: Day & unknown;
  /**  Internal note for the invoice, visible by users in the organization but not visible to payers. */
  internalNote?: string | null;
  invoiceDate: Day & unknown;
  /**  The invoice number. */
  invoiceNumber: string;
  /**  The line items for the invoice */
  lineItems: (ApiV1ArLineItemData)[];
  /**  Memo for the payer of the invoice. */
  payerMemo?: string | null;
  /**  The purchase order number for the invoice if applicable. */
  poNumber?: string | null;
  servicePeriodEndDate?: Day & unknown | null;
  servicePeriodStartDate?: Day & unknown | null;
  /**  Whether or not the invoice payment instructions will show the real account and routing number for the destination account or use virtual account numbers instead. */
  useRealAccountNumber: boolean;
};

/** Response data for Accounts Receivable invoices API Endpoint */
export type ApiV1ArInvoicesData = {
  /**  Whether or not the invoice can be paid via ach debit. */
  achDebitEnabled: boolean;
  amount: NonNegativeDollar & unknown;
  canceledAt?: UtcTime & unknown | null;
  /**  Emails to be CCed on invoice notifications/reminders. */
  ccEmails: (Email)[];
  createdAt: UtcTime & unknown;
  /**  Whether or not the invoice can be paid via credit card. Requires stripe to be  setup for the Mercury account. */
  creditCardEnabled: boolean;
  customerId: CustomerId & unknown;
  destinationAccountId: TransactionPartyId & unknown;
  dueDate: Day & unknown;
  id: InvoiceId & unknown;
  /**  Internal note for the invoice, visible by users in the  mercury organization but not visible to payers. */
  internalNote?: string | null;
  invoiceDate: Day & unknown;
  /**  The payer facing invoice number/identifier. */
  invoiceNumber: string;
  /**  Memo for the payer of the invoice. */
  payerMemo?: string | null;
  /**  Purchase order number for the invoice if applicable. */
  poNumber?: string | null;
  /**  A unique identifier used to build public URLs for this invoice. Use it to construct the payment page URL (https://app.mercury.com/pay/{slug}) or fetch the invoice PDF via /api/v1/ar/invoices/{slug}/pdf. */
  slug: string;
  status: PaymentLinkStatus & unknown;
  updatedAt: UtcTime & unknown;
  /**  Whether or not the invoice payment instructions will show the real  account and routing number for the destination account or use  virtual account numbers instead. */
  useRealAccountNumber: boolean;
};

/** Paginated response containing a list of invoices.  | Use the page cursor information to fetch additional pages of invoices. */
export type ApiV1ArInvoicesPaginatedResponse = {
  /**  List of invoices in the current page */
  invoices: (ApiV1ArInvoicesData)[];
  /**  Pagination information including cursors for navigating to next/previous pages */
  page: { nextPage?: InvoiceId; previousPage?: InvoiceId };
};

/** Data for an invoice line item */
export type ApiV1ArLineItemData = {
  /**  the name of the line item */
  name: string;
  /**  the quantity of this item */
  quantity: number;
  /**  the sales tax applied to this item */
  salesTaxRate?: number | null;
  unitPrice: Dollar & unknown;
};

/** ID for the webhook */
export type ApiWebhookEndpointId = string;

/** Webhook configuration details */
export type ApiWebhookResponse = {
  createdAt: UtcTime & unknown;
  /**  Optional array of event types this webhook is subscribed to. Nothing means all events. */
  eventTypes?: (WebhookEventType)[] | null;
  /**  Optional array of resource field paths to filter events by. Nothing means no filtering. */
  filterPaths?: (ResourceField)[] | null;
  id: ApiWebhookEndpointId & unknown;
  /**  Webhook signing secret. Only returned on creation (POST), not on GET or UPDATE operations. */
  secret?: string | null;
  status: ApiWebhookStatus & unknown;
  updatedAt: UtcTime & unknown;
  /**  The URL that will receive webhook POST requests */
  url: string;
};

/** The status of the webhook endpoint. 'active': delivering events normally. 'paused': paused by the user. 'disabled': automatically disabled by the system due to consecutive delivery failures. A disabled webhook can be reactivated by updating its status to 'active'. */
export type ApiWebhookStatus = "active" | "paused" | "disabled";

/** API response for listing webhook endpoints with pagination */
export type ApiWebhooksPaginatedResponse = {
  /**  Pagination information including cursors for navigating to next/previous pages */
  page: { nextPage?: ApiWebhookEndpointId; previousPage?: ApiWebhookEndpointId };
  /**  List of webhooks in the current page */
  webhooks: (ApiWebhookResponse)[];
};

/** ID for the attachment. */
export type AttachmentId = string;

/** A line entry within a journal entry creation request. */
export type BooksApiCreateJournalEntryLineEntry = {
  amount: Dollar & unknown;
  debitCredit: BooksDebitCredit & unknown;
  /**  Description of the line entry */
  description: string;
  /**  The ledger this line entry is posted to */
  ledgerId: string;
  /**  Optional tags to associate with this line entry */
  tagIds?: (string)[] | null;
};

/** Line entry changes to apply to a journal entry: create, update, or delete. */
export type BooksApiUpdateJournalEntryChanges = {
  /**  New line entries to add */
  create?: (BooksApiUpdateJournalEntryLeCreate)[] | null;
  /**  IDs of line entries to remove */
  delete?: (string)[] | null;
  /**  Existing line entries to modify */
  update?: (BooksApiUpdateJournalEntryLeUpdate)[] | null;
};

/** A new line entry to create within an existing journal entry. */
export type BooksApiUpdateJournalEntryLeCreate = {
  amount: Dollar & unknown;
  debitCredit: BooksDebitCredit & unknown;
  /**  Description of the line entry */
  description: string;
  /**  The ledger this line entry is posted to */
  ledgerId: string;
  /**  Optional tags to associate with this line entry */
  tagIds?: (string)[] | null;
};

/** Updates to apply to an existing line entry. */
export type BooksApiUpdateJournalEntryLeUpdate = {
  amount?: Dollar & unknown | null;
  debitCredit?: BooksDebitCredit & unknown | null;
  /**  Updated description */
  description?: string | null;
  /**  The ID of the line entry to update */
  id: string;
  /**  Updated ledger */
  ledgerId?: string | null;
  /**  Updated tags */
  tagIds?: (string)[] | null;
};

export type BooksAccountingBasis = "cash" | "accrual";

/** An accrual source is a record of a financial transaction that has been recorded (e.g. invoice or bill)  | It used to generate journal entries in books and tracking payments against it. */
export type BooksAccrualSourceBaseResponse = {
  amountOutstanding: Dollar & unknown;
  amountPaid: Dollar & unknown;
  displayStatus: BooksAccrualSourceDisplayStatus & unknown;
  dueDate?: Day & unknown | null;
  effectiveDate: Day & unknown;
  /**  The external ID of the accrual source, if applicable */
  externalId?: string | null;
  externalPartyId?: BooksExternalPartyId & unknown | null;
  grossAmount: Dollar & unknown;
  /**  The ID of the accrual source */
  id: string;
  /**  The lines that make up the accrual source. At least one line is required. */
  lines?: (BooksAccrualSourceLine)[] | null;
  /**  Optional notes or memo for the accrual source */
  notes?: string | null;
  /**  The reference number of the accrual source */
  referenceNumber: string;
  status: BooksAccrualSourceStatus & unknown;
  /**  The type of the accrual source */
  type: "invoice" | "bill" | "payroll";
};

export type BooksAccrualSourceDisplayStatus = "open" | "paid" | "draft" | "cancelled" | "overdue" | "partiallyPaid";

/** A file associated with an accrual source */
export type BooksAccrualSourceFile = {
  /**  The name of the file */
  fileName: string;
  /**  The ID of the accrual source file */
  id: string;
};

/** A line item in an accrual source */
export type BooksAccrualSourceLine = {
  /**  The ID of the ledger */
  accountId: string;
  /**  The ID of the accrual source */
  accrualSourceId: string;
  amount: Dollar & unknown;
  /**  The description of the accrual source line */
  description: string;
  /**  The external ID of the accrual source line. This is the ID of the accrual source line in an external system. */
  externalId?: string | null;
  /**  The ID of the accrual source line */
  id: string;
  /**  The line number. Used for maintaining a consistent order of lines within an accrual source. */
  lineNumber: number;
};

/** Payment application for an accrual source */
export type BooksAccrualSourcePaymentApplication = {
  /**  Applicable adjustments */
  adjustments: (BooksPaymentApplicationAccrualAdjustment)[];
  lineEntry: BooksAccrualSourcePaymentApplicationLineEntry & unknown;
  matchedAmount: Dollar & unknown;
  /**  The ID of the payment application */
  paymentApplicationId: string;
  /**  The source type of the payment application */
  sourceType: "bankTransaction" | "customerCredit" | "manual";
  /**  The status of the payment application */
  status: "proposed" | "confirmed" | "rejected";
};

/** Line entry metadata for an accrual source payment application */
export type BooksAccrualSourcePaymentApplicationLineEntry = {
  /**  The description of the journal entry */
  journalEntryDescription: string;
  /**  The ID of the line entry's journal entry */
  journalEntryId: string;
  lineEntryAmount: Dollar & unknown;
  /**  The description of the line entry */
  lineEntryDescription: string;
  /**  The ID of the line entry */
  lineEntryId: string;
};

/** An accrual source is a record of a financial transaction that has been recorded (e.g. invoice or bill)  | It used to generate journal entries in books and tracking payments against it. */
export type BooksAccrualSourceResponse = {
  amountOutstanding: Dollar & unknown;
  amountPaid: Dollar & unknown;
  displayStatus: BooksAccrualSourceDisplayStatus & unknown;
  dueDate?: Day & unknown | null;
  effectiveDate: Day & unknown;
  /**  The external ID of the accrual source, if applicable */
  externalId?: string | null;
  externalPartyId?: BooksExternalPartyId & unknown | null;
  /**  The files associated with the accrual source, if any */
  files?: (BooksAccrualSourceFile)[] | null;
  grossAmount: Dollar & unknown;
  /**  The ID of the accrual source. Missing when the accrual source has  not yet been created in Teal — i.e. when the synchronous Teal sync  failed and was deferred to an async workflow. Signal that the accrual source is pending sync. */
  id?: string | null;
  /**  The journal entry IDs generated from the accrual source. */
  journalEntryIds: (string)[];
  /**  The lines that make up the accrual source. At least one line is required. */
  lines?: (BooksAccrualSourceLine)[] | null;
  /**  Optional notes or memo for the accrual source */
  notes?: string | null;
  /**  Payments applied to the accrual source */
  paymentApplications?: (BooksAccrualSourcePaymentApplication)[] | null;
  /**  The reference number of the accrual source */
  referenceNumber: string;
  status: BooksAccrualSourceStatus & unknown;
  /**  The type of the accrual source */
  type: "invoice" | "bill" | "payroll";
};

export type BooksAccrualSourceStatus = "open" | "paid" | "draft" | "cancelled";

export type BooksCategorizerType = "aI" | "rules" | "similarity" | "transferBetweenAccounts" | "uncategorized" | "user";

/** A chart of accounts template */
export type BooksChartOfAccountsTemplate = {
  accountingBasis: BooksAccountingBasis & unknown;
  /**  The ID of the template */
  id: string;
  /**  The name of the template */
  name: string;
  type: BooksChartOfAccountsTemplateType & unknown;
};

export type BooksChartOfAccountsTemplateType = "agent" | "platform";

/** ID for this books counterparty */
export type BooksCounterpartyId = string;

export type BooksDebitCredit = "debit" | "credit";

export type BooksExternalPartyId = { contents: BooksCounterpartyId; tag: "counterpartyId" } | { contents: CustomerId; tag: "customerId" };

export type BooksFinancialAccountType = "bankAccount" | "creditCard" | "payments" | "payroll" | "loan" | "prepaidCard" | "accountsReceivable" | "accountsPayable" | "investment" | "treasury";

export type BooksJournalEntry = {
  accrualSource?: BooksAccrualSourceResponse & unknown | null;
  creationDate: UtcTime & unknown;
  creationSource: BooksJournalEntryCreationSource & unknown;
  datetime: UtcTime & unknown;
  /**  An arbitrary string on the object, useful for displaying to the user. */
  description: string;
  /**  The unique ID of the object. */
  id: string;
  /**  Whether the Journal Entry represents an opening balance. */
  isOpeningBalance: boolean;
  /**  List of Line Entries. Included in expanded responses. */
  lineEntries?: (BooksLineEntry)[] | null;
  /**  The ids of the Line Entries detailing the Journal Entry's movement of value. */
  lineEntryIds?: (string)[] | null;
};

export type BooksJournalEntryCreationSource = "manual" | "transaction" | "accrual" | "paymentApplication" | "legacy";

export type BooksLedgerSubType = "currentAssets" | "nonCurrentAssets" | "transfersBetweenAccounts" | "uncategorizedAssets" | "currentLiabilities" | "nonCurrentLiabilities" | "equity" | "operatingRevenues" | "otherIncome" | "costOfGoodsSold" | "operatingExpenses" | "otherExpenses" | "retainedEarnings";

/** A ledger template within a Chart of Accounts template */
export type BooksLedgerTemplate = {
  /**  Child ledger templates for hierarchical organization */
  children?: (BooksLedgerTemplate)[] | null;
  debitCredit: BooksDebitCredit & unknown;
  /**  Whether users can edit this ledger */
  editable: boolean;
  financialAccountType?: BooksFinancialAccountType & unknown | null;
  /**  Unique identifier for the ledger template */
  id: string;
  /**  Whether this ledger is required in all COA instances */
  isRequired: boolean;
  /**  Name of the ledger */
  name: string;
  /**  Parent ledger ID for hierarchical organization */
  parentId?: string | null;
  /**  Whether to include this ledger in cash flow reports */
  reportCashFlow: boolean;
  /**  Sort code for ordering ledgers */
  sortCode: string;
  subType: BooksLedgerSubType & unknown;
  type: BooksLedgerType & unknown;
};

export type BooksLedgerType = "asset" | "liability" | "equity" | "revenue" | "expense";

export type BooksLineEntry = {
  accrualSource?: BooksAccrualSourceBaseResponse & unknown | null;
  amount: Dollar & unknown;
  datetime: UtcTime & unknown;
  debitCredit: BooksDebitCredit & unknown;
  /**  An arbitrary string on the object, useful for displaying to the user or for categorization. */
  description?: string | null;
  /**  Indicates if the Line Entry can be manually added or removed from a Ledger, as dictated by the `editable` property on the Ledger. */
  editable: boolean;
  /**  The unique ID of the object. */
  id: string;
  /**  An arbitrary string on the object, useful for displaying to the user. */
  journalEntryDescription: string;
  /**  The ID of the associated Journal Entry. */
  journalEntryId: string;
  /**  The ID of the Line Entry's Ledger. */
  ledgerId: string;
  /**  The name of the Line Entry's Ledger. */
  ledgerName: string;
  /**  Expandable. IDs of the ledgers on the other side(s) of the line entry with opposite debit/credit. */
  opposingLedgerIds?: (string)[] | null;
  /**  Payments applied to an accrual source (bill/invoice) using the Line Entry. */
  paymentApplications?: (BooksLineEntryPaymentApplication)[] | null;
  /**  If the Line Entry is identified as a transfer between accounts, the ID  of the Line Entry in the opposing Ledger. Related guide:  [Auto-categorization](https://docs.teal.dev/guides/platform/categorization/pipeline#transfers-between-accounts) */
  relatedLineEntryId?: string | null;
  /**  The tags associated with the line entry, if any. */
  tags?: (BooksTag)[] | null;
  transaction?: BooksTransaction & unknown | null;
  /**  The ID of the associated Transaction, if one exists. */
  transactionId?: string | null;
};

/** Payment application for a line entry */
export type BooksLineEntryPaymentApplication = {
  accrualSource?: BooksLineEntryPaymentApplicationAccrualSource & unknown | null;
  /**  Applicable adjustments */
  adjustments: (BooksPaymentApplicationAccrualAdjustment)[];
  matchedAmount: Dollar & unknown;
  /**  The ID of the payment application */
  paymentApplicationId: string;
  /**  The source type of the payment application */
  sourceType: "bankTransaction" | "customerCredit" | "manual";
  /**  The status of the payment application */
  status: "proposed" | "confirmed" | "rejected";
};

/** Accrual source metadata for a line entry payment application */
export type BooksLineEntryPaymentApplicationAccrualSource = {
  /**  The ID of the accrual source */
  accrualSourceId: string;
  effectiveDate: Day & unknown;
  /**  The external ID of the accrual source */
  externalId?: string | null;
  externalPartyId?: BooksExternalPartyId & unknown | null;
  grossAmount: Dollar & unknown;
  /**  The reference number of the accrual source */
  referenceNumber: string;
  /**  The type of the accrual source */
  type: "invoice" | "bill" | "payroll";
};

/** Adjustment for an accrual source */
export type BooksPaymentApplicationAccrualAdjustment = {
  /**  ID of the adjustment */
  accrualAdjustmentId: string;
  amount: Dollar & unknown;
  /**  ID of the applicable credit ledger */
  creditAccountId: string;
  /**  ID of the applicable debit ledger */
  debitAccountId: string;
};

/** A tag used for categorizing transactions in Books. */
export type BooksTag = {
  /**  Unique identifier for the tag. */
  id: string;
  /**  Display name of the tag. */
  name: string;
  /** unique id for a tag group */
  tagGroupId: string;
};

export type BooksTransaction = {
  amount: Dollar;
  /**  Attachments associated with the transaction from Mercury Banking, if any. */
  attachments?: (BooksTransactionAttachment)[] | null;
  /**  The last four digits of the card used for the transaction, if applicable. */
  cardLastFourDigits?: string | null;
  categorizationMethod?: BooksCategorizerType | null;
  /**  The name of the transaction counterparty (To/From), if available. */
  counterpartyName?: string | null;
  customCategoryId?: string | null;
  /**  The display name of the Banking custom category assigned to this transaction, if any. */
  customCategoryName?: string | null;
  datetime: UtcTime;
  description: string;
  externalMetadataId?: string | null;
  /** unique id for a transaction */
  id: string;
  /** unique id for a journal entry */
  journalEntryId?: string | null;
  /** unique id for a ledger */
  ledgerId?: string | null;
  /** unique id for a line entry */
  lineEntryId?: string | null;
  /**  The merchant category code (MCC) for the transaction, if available. */
  merchantCategoryCode?: string | null;
  /**  A note on the transaction set in Mercury Banking, if any. */
  note?: string | null;
  opposingLineEntryIds?: (string)[] | null;
  personal: boolean;
  postedStatus: BooksTransactionPostedStatus;
  reviewStatus: BooksTransactionReviewStatus;
  sourceAccountId: string;
  teamMemberId?: string | null;
  /**  The full name of the team member associated with this transaction, if any. */
  teamMemberName?: string | null;
  transactionMethodKind?: TransactionMethodKind & unknown | null;
};

/** An attachment on a Mercury transaction, including its ID, filename, and a signed download URL. */
export type BooksTransactionAttachment = {
  /**  A presigned URL for downloading the attachment (valid for 1 hour). */
  downloadUrl: string;
  /**  The filename of the attachment. */
  fileName: string;
  /**  The unique identifier of the attachment. */
  id: string;
};

export type BooksTransactionPostedStatus = "notPosted" | "posted" | "deleted";

export type BooksTransactionReviewStatus = "reviewed" | "unreviewed";

/** Card domain object */
export type Card = {
  /**  The Mercury account this card is associated with. */
  accountId: string;
  createdAt: UtcTime & unknown;
  expiration: CardExpiration & unknown;
  /**  Unique identifier for the card. */
  id: string;
  kind: CardKind & unknown;
  /**  Last four digits of the card's primary account number (PAN). */
  lastFour: string;
  /**  Cardholder name printed on the card. */
  nameOnCard: string;
  /**  Optional user-assigned label for the card. */
  nickname?: string | null;
  physicalCardStatus?: PhysicalCardStatus & unknown | null;
  spendLimit?: SpendLimit & unknown | null;
  status: CardStatus & unknown;
  type: CardType & unknown;
  updatedAt: UtcTime & unknown;
  /**  Mercury User who owns the card. */
  userId: string;
};

/** Month and year the card expires. */
export type CardExpiration = {
  /** Calendar month. */
  month: number;
  /** Four-digit calendar year. */
  year: number;
};

export type CardKind = "debit" | "credit";

/** Paginated response containing a list of cards. */
export type CardListResponse = {
  /**  List of cards in the current page. */
  cards: (Card)[];
  /**  Pagination cursors for navigating to next/previous pages. */
  page: { nextPage?: string; previousPage?: string };
};

export type CardNetwork = "visa" | "mastercard";

export type CardStatus = "active" | "frozen" | "cancelled" | "inactive" | "expired" | "suspended";

export type CardType = "virtual" | "physical";

/** Paginated response containing a list of categories.  | Use the page cursor information to fetch additional pages of categories. */
export type CategoriesPaginatedResponse = {
  /**  List of categories in the current page */
  categories: (CategoryData)[];
  /**  Pagination information including cursors for navigating to next/previous pages */
  page: { nextPage?: CategoryId; previousPage?: CategoryId };
};

/** Represents an expense category for transaction classification. */
export type CategoryData = {
  id: CategoryId & unknown;
  /**  The name of the category */
  name: string;
  /**  Whether this category is applicable to card transactions */
  visibleForCardSpend: boolean;
  /**  Whether this category is applicable to all other transaction kinds */
  visibleForOther: boolean;
  /**  Whether this category is applicable to expense reimbursement transactions */
  visibleForReimbursements: boolean;
};

/** ID for the category */
export type CategoryId = string;

export type CategoryName = string;

export type CheckInfo = {
  address: AddressWithoutName;
};

export type CheckInfoRaw = {
  address: AddressWithoutName & unknown;
};

/** Response after creating a COA template. */
export type CreateBooksApiAgentCoaTemplateResponse = {
  coaTemplate: BooksChartOfAccountsTemplate & unknown;
};

/** Response after creating a ledger template. */
export type CreateBooksApiAgentLedgerTemplateResponse = {
  ledgerTemplate: BooksLedgerTemplate & unknown;
};

/** Request to create a new Chart of Accounts template. */
export type CreateBooksApiCoaTemplateRequest = {
  accountingBasis: BooksAccountingBasis & unknown;
  /**  An arbitrary string on the object, useful for identifying the Chart of Accounts template. */
  name: string;
};

/** Response for a bulk journal entry creation request. */
export type CreateBooksApiJournalEntriesBulkResponse = {
  /**  The created journal entries */
  journalEntries: (BooksJournalEntry)[];
};

/** Request to create a single journal entry. */
export type CreateBooksApiJournalEntryRequest = {
  datetime: UtcTime & unknown;
  /**  Description of the journal entry */
  description: string;
  /**  The line entries that compose this journal entry */
  lineEntries: (BooksApiCreateJournalEntryLineEntry)[];
};

/** Request to create a new ledger template within a COA template. */
export type CreateBooksApiLedgerTemplateRequest = {
  /**  The COA Template Id. */
  coaTemplateId: string;
  debitCredit: BooksDebitCredit & unknown;
  /**  Whether line entries can be manually added or removed from the ledger. */
  editable: boolean;
  financialAccountType: BooksFinancialAccountType & unknown;
  ledgerSubType: BooksLedgerSubType & unknown;
  ledgerType: BooksLedgerType & unknown;
  /**  The name of the ledger. */
  name: string;
  /**  If the ledger is a child Ledger, the ID of the parent ledger object. */
  parentId?: string | null;
  /**  Whether Teal includes this ledger in the cash flow report. */
  reportCashFlow: boolean;
  /**  Determines the display order in reports, ordered digit by digit. */
  sortCode: string;
};

/** Request body for creating a card */
export type CreateCardRequest = {
  /**  The deposit account the new card will draw funds from. */
  accountId: string;
  kind: CardKind & unknown;
  /**  Optional user-assigned label for the card. */
  nickname?: string | null;
  spendLimit?: SpendLimit & unknown | null;
  type: CreateCardType & unknown;
  /**  The user to assign as the cardholder. */
  userId: string;
};

export type CreateCardType = "virtual";

/** Request body for creating a new expense category */
export type CreateCategoryApiRequest = {
  name: CategoryName & unknown;
  /**  Whether this category is applicable to card transactions */
  visibleForCardSpend: boolean;
  /**  Whether this category is applicable to all other transaction kinds */
  visibleForOther: boolean;
  /**  Whether this category is applicable to expense reimbursement transactions */
  visibleForReimbursements: boolean;
};

/** Request body for creating a new webhook endpoint */
export type CreateWebhookParams = {
  /**  Optional array of event types to subscribe to. Nothing means subscribe to all event types. */
  eventTypes?: (WebhookEventType)[] | null;
  /**  Optional array of resource field paths to filter events by. When specified, webhook events will only be sent when one of these fields changes. Nothing means no filtering (all events are sent). */
  filterPaths?: (ResourceField)[] | null;
  /**  The URL to which webhook events will be delivered */
  url: string;
};

export type CreditAccount = {
  availableBalance: number;
  createdAt: UtcTime;
  currentBalance: number;
  id: TransactionPartyId;
  status: AccountStatus;
};

export type CreditAccountsResponse = {
  accounts: (CreditAccount)[];
};

export type CreditCardId = string;

export type CreditCardInfo = {
  email?: string | null;
  id: CreditCardId;
  paymentMethod: string;
};

export type CurrencyCode = string;

export type CurrencyExchangeInfo = {
  convertedFromAmount: number;
  convertedFromCurrency: CurrencyCode;
  convertedToAmount: number;
  convertedToCurrency: CurrencyCode;
  /**  Exchange rate goes from "from currency" to "to currency"  (ie from currency * exchange rate = to currency) */
  exchangeRate: number;
  feeAmount: number;
  feePercentage: number;
  feeTransactionId?: TransactionMetadataId | null;
};

/** The customer who will receive the invoice. Use the /api/v1/ar/customers endpoint to list your customers and find the corresponding id, or create a new customer first. */
export type CustomerId = string;

export type Day = string;

export type DebitCardId = string;

export type DebitCardInfo = {
  id: DebitCardId;
};

/** Request to delete journal entries. */
export type DeleteBooksApiJournalEntriesRequest = {
  /**  A list of journal entry ids to delete */
  journalEntryIds: (string)[];
};

export type DepositoryAccountStatement = {
  accountNumber: string;
  companyLegalAddress: Address;
  companyLegalName: string;
  downloadUrl: string;
  ein?: string | null;
  endDate: UtcTime;
  endingBalance: Dollar;
  id: AccountStatementId;
  routingNumber: string;
  startDate: UtcTime;
  transactions: (AccountStatementTransaction)[];
};

/** Paginated response for depository account statements (v1 API) */
export type DepositoryAccountStatementsPaginatedResponse = {
  page: { nextPage?: AccountStatementId; previousPage?: AccountStatementId };
  statements: (DepositoryAccountStatement)[];
};

/** A dollar amount */
export type Dollar = number;

export type DomesticWireRoutingInfo = {
  accountNumber: string;
  address?: AddressWithoutName | null;
  bankName?: string | null;
  routingNumber: string;
};

export type DomesticWireRoutingInfoRaw = {
  /**  The account number of the bank account to use for domestic wire payments. */
  accountNumber: string;
  address: AddressWithoutName & unknown;
  /**  The name of the beneficiary of the domestic wire. This is the name of the entity that will receive the domestic wire. */
  defaultForBenefitOf?: string | null;
  /**  The routing number of the bank account to use for domestic wire payments. */
  routingNumber: string;
};

/** Request body for editing an existing expense category. All fields are optional. */
export type EditCategoryApiRequest = {
  name?: CategoryName & unknown | null;
  /**  Whether this category is applicable to card transactions */
  visibleForCardSpend?: boolean | null;
  /**  Whether this category is applicable to all other transaction kinds */
  visibleForOther?: boolean | null;
  /**  Whether this category is applicable to expense reimbursement transactions */
  visibleForReimbursements?: boolean | null;
};

export type EditRecipientRequest = {
  /** Deprecated. Use checkInfo instead. */
  address?: AddressData;
  /** Information needed to send a check. */
  checkInfo?: CheckInfoRaw;
  /** Contact email address of the recipient */
  contactEmail?: Email;
  /** Information needed to send a domestic wire. */
  domesticWireRoutingInfo?: DomesticWireRoutingInfoRaw;
  /** Information needed to send an ACH. */
  electronicRoutingInfo?: ElectronicRoutingInfoRaw;
  emails?: (Email)[];
  name?: string;
  nickname?: string;
};

export type ElectronicAccountType = "businessChecking" | "businessSavings" | "personalChecking" | "personalSavings";

export type ElectronicRoutingInfo = {
  accountNumber: string;
  address?: AddressWithoutName | null;
  bankName?: string | null;
  electronicAccountType: ElectronicAccountType;
  routingNumber: string;
};

export type ElectronicRoutingInfoRaw = {
  /**  The account number of the bank account to use for ACH payments. */
  accountNumber: string;
  address: AddressWithoutName & unknown;
  electronicAccountType: ElectronicAccountType & unknown;
  /**  The routing number of the bank account to use for ACH payments. */
  routingNumber: string;
};

export type Email = string;

/** Response containing a single agent COA template. */
export type GetBooksApiAgentCoaTemplateResponse = {
  coaTemplate: BooksChartOfAccountsTemplate & unknown;
};

/** Response containing a list of agent COA templates. */
export type GetBooksApiAgentCoaTemplatesResponse = {
  /**  Agent-created COA templates */
  agentTemplates: (BooksChartOfAccountsTemplate)[];
  /**  Platform default COA templates available to this agent */
  defaultTemplates: (BooksChartOfAccountsTemplate)[];
  /**  Token for fetching the next page of results */
  nextPageToken?: string | null;
  /**  Token for fetching the previous page of results */
  prevPageToken?: string | null;
};

/** Response containing a paginated list of journal entries. */
export type GetBooksApiJournalEntriesResponse = {
  /**  The journal entries matching the query */
  journalEntries: (BooksJournalEntry)[];
  /**  Token to fetch the next page of results */
  nextPageToken?: string | null;
  /**  Token to fetch the previous page of results */
  prevPageToken?: string | null;
};

/** Response containing a single journal entry. */
export type GetBooksApiJournalEntryResponse = {
  journalEntry: BooksJournalEntry & unknown;
};

/** A GL code allocation on a transaction — a GL code name paired with the amount  allocated to it. When a transaction is fully categorized, the amounts across all  allocations sum to the transaction total. */
export type GlAllocation = {
  /**  The amount allocated to this GL code */
  amount: number;
  /**  Optional user-provided description for this allocation */
  description?: string | null;
  /**  The name of the GL code from the connected accounting integration */
  glCodeName: string;
};

export type Iso3166Alpha2 = string;

/** Request body for POST /api/v1/transfer endpoint.  Transfers funds between two depository, treasury, or investment accounts belonging to the same organization. */
export type InternalTransferApiRequest = {
  amount: PositiveDollar;
  destinationAccountId: TransactionPartyId;
  idempotencyKey: string;
  note?: string | null;
  sourceAccountId: TransactionPartyId;
};

/** Response for POST /api/v1/transfer endpoint.  Returns both the credit and debit transactions for the transfer (depository, treasury, or investment). */
export type InternalTransferApiResponse = {
  creditTransaction: Transaction;
  debitTransaction: Transaction;
};

export type InternationalWireAustraliaSpecificData = {
  bsbCode: string;
};

export type InternationalWireBrazilSpecificData = {
  legalId: string;
};

export type InternationalWireCanadaSpecificData = {
  bankCode: string;
  transitNumber: string;
};

export type InternationalWireChileSpecificData = {
  legalId: string;
};

export type InternationalWireColombiaSpecificData = {
  legalId: string;
};

export type InternationalWireCorrespondentInfo = {
  bankName?: string | null;
  routingNumber?: string | null;
  swiftCode?: string | null;
};

export type InternationalWireCountrySpecificData = {
  australia?: InternationalWireAustraliaSpecificData | null;
  brazil?: InternationalWireBrazilSpecificData | null;
  canada?: InternationalWireCanadaSpecificData | null;
  chile?: InternationalWireChileSpecificData | null;
  colombia?: InternationalWireColombiaSpecificData | null;
  dominicanRepublic?: InternationalWireDominicanRepublicSpecificData | null;
  honduras?: InternationalWireHondurasSpecificData | null;
  india?: InternationalWireIndiaSpecificData | null;
  kazakhstan?: InternationalWireKazakhstanSpecificData | null;
  pakistan?: InternationalWirePakistanSpecificData | null;
  paraguay?: InternationalWireParaguaySpecificData | null;
  philippines?: InternationalWirePhilippinesSpecificData | null;
  russia?: InternationalWireRussiaSpecificData | null;
  southAfrica?: InternationalWireSouthAfricaSpecificData | null;
};

export type InternationalWireDominicanRepublicSpecificData = {
  accountType: SwiftBankAccountType;
  legalId: string;
};

export type InternationalWireHondurasSpecificData = {
  accountType: SwiftBankAccountType;
  legalId: string;
};

export type InternationalWireIndiaSpecificData = {
  ifscCode: string;
};

export type InternationalWireKazakhstanSpecificData = {
  legalId: string;
};

export type InternationalWirePakistanSpecificData = {
  legalId: string;
  legalIdType: PakistaniLegalIdType;
};

export type InternationalWireParaguaySpecificData = {
  legalId: string;
};

export type InternationalWirePhilippinesSpecificData = {
  routingNumber: string;
};

export type InternationalWireRoutingInfo = {
  address?: AddressWithoutName | null;
  bankDetails?: SwiftCodeData | null;
  correspondentInfo?: InternationalWireCorrespondentInfo | null;
  countrySpecific: InternationalWireCountrySpecificData;
  emailAddress?: string | null;
  iban: string;
  phoneNumber?: string | null;
  swiftCode: string;
};

export type InternationalWireRussiaSpecificData = {
  inn: string;
};

export type InternationalWireSouthAfricaSpecificData = {
  branchCode: string;
};

/** ID for the invoice. */
export type InvoiceId = string;

/** Merchant information for card transactions */
export type MerchantData = {
  category?: MercuryCategory & unknown | null;
  /**  4-digit merchant category code (MCC) for card transactions */
  categoryCode?: string | null;
  /**  Merchant ID for card transactions */
  id?: string | null;
};

export type MercuryCategory = "Other" | "Advertising" | "Airlines" | "AlcoholAndBars" | "BooksAndNewspaper" | "CarRental" | "Charity" | "Clothing" | "Conferences" | "Education" | "Electronics" | "Entertainment" | "FacilitiesExpenses" | "Fees" | "FoodDelivery" | "FuelAndGas" | "Gambling" | "GovernmentServices" | "Grocery" | "GroundTransportation" | "Insurance" | "InternetAndTelephone" | "Legal" | "Lodging" | "Medical" | "Memberships" | "OfficeSupplies" | "OtherTravel" | "Parking" | "Political" | "ProfessionalServices" | "Restaurants" | "Retail" | "RideshareAndTaxis" | "Shipping" | "Software" | "Taxes" | "Utilities" | "VehicleExpenses";

/** ID for the credit statement period */
export type MercuryCreditAccountStatementPeriodId = string;

/** Nickname update action. Omit the field to keep the current nickname, send null or an empty/whitespace-only string to clear it, or send a string to set it. */
export type NicknameUpdate = string | null;

/** A positive dollar amount with at least 1 cent. */
export type NonNegativeDollar = number;

/** Note update action. Omit field to keep current note, send null or empty string to clear note, send text to set note. */
export type NoteUpdate = string | null;

/** DBA (Doing Business As) information */
export type OrganizationDba = {
  /**  Whether this DBA is set as the default for payments */
  dbaIsDefault: boolean;
  /**  The DBA name */
  dbaName: string;
};

/** Organization information */
export type OrganizationInfo = {
  /**  List of DBAs (Doing Business As names) for this organization */
  dbas: (OrganizationDba)[];
  /**  Employer Identification Number (EIN), if available */
  ein?: string | null;
  id: Uuid & unknown;
  kind: ApiOrganizationKind & unknown;
  /**  Legal business name as registered */
  legalBusinessName: string;
};

/** Response containing organization details. */
export type OrganizationResponse = {
  organization: OrganizationInfo & unknown;
};

export type PdfDocument = string;

export type PageTotal = number;

export type PakistaniLegalIdType = "CNIC" | "SNIC" | "Passport" | "NTN";

export type PaymentLinkStatus = "Unpaid" | "Paid" | "Cancelled" | "Processing";

export type PaymentMethod = "ach" | "check" | "domesticWire" | "internationalWire" | "realTimePayment";

export type PhysicalCardStatus = "inactive" | "active" | "locked";

/** A positive dollar amount with at least 1 cent. */
export type PositiveDollar = number;

export type PostTransactionApiRequest = {
  /** Amount of USD you want to send, must be a positive number. */
  amount: PositiveDollar;
  /** Optional external memo */
  externalMemo?: string;
  /** Unique string identifying the transaction */
  idempotencyKey: string;
  /** Optional note */
  note?: string;
  /** If domesticWire is used, then the purpose field is required. */
  paymentMethod: PostTransactionPaymentMethod;
  /** Purpose of payment with category and optional additional info. Required when paymentMethod is 'domesticWire'. */
  purpose?: PostTransactionSendMoneyPurpose;
  /** Recipient ID from the /recipients endpoint. */
  recipientId: TransactionPartyId;
};

export type PostTransactionPaymentMethod = "ach" | "check" | "domesticWire";

/** External API representation of SendMoneyPurpose.  Only exposes the 'simple' field to decouple internal implementation from external API. */
export type PostTransactionSendMoneyPurpose = {
  simple?: SimplePurpose | null;
};

export type RealTimePaymentRoutingInfo = {
  accountNumber: string;
  address?: AddressWithoutName | null;
  bankName?: string | null;
  routingNumber: string;
};

export type RecipientAttachment = {
  /**  Name of the uploaded file */
  fileName: string;
  formType?: TaxFormType & unknown | null;
  uploadedAt: UtcTime & unknown;
  /**  Presigned URL to download the attachment (valid for 12 hours) */
  url: string;
};

export type RecipientAttachmentWithId = {
  /**  Name of the uploaded file */
  fileName: string;
  formType?: TaxFormType & unknown | null;
  id: RecipientTaxFormAttachmentId & unknown;
  recipientId: TransactionPartyId & unknown;
  uploadedAt: UtcTime & unknown;
  /**  Presigned URL to download the attachment (valid for 12 hours) */
  url: string;
};

/** ID for the recipient */
export type RecipientId = string;

export type RecipientInfo = {
  address?: Address | null;
  attachments: (RecipientAttachment)[];
  checkInfo?: CheckInfo | null;
  contactEmail?: Email | null;
  dateLastPaid?: UtcTime | null;
  defaultAddress?: AddressWithoutName | null;
  defaultPaymentMethod: PaymentMethod;
  domesticWireRoutingInfo?: DomesticWireRoutingInfo | null;
  electronicRoutingInfo?: ElectronicRoutingInfo | null;
  emails: (Email)[];
  id: TransactionPartyId;
  internationalWireRoutingInfo?: InternationalWireRoutingInfo | null;
  isBusiness?: boolean | null;
  name: string;
  nickname?: string | null;
  realTimePaymentRoutingInfo?: RealTimePaymentRoutingInfo | null;
  status: RecipientStatus;
};

export type RecipientStatus = "active" | "deleted";

/** ID for the recipient tax form attachment */
export type RecipientTaxFormAttachmentId = string;

export type RecipientsAttachmentsPaginatedResponse = {
  /**  List of attachments with recipient IDs */
  attachments: (RecipientAttachmentWithId)[];
  /**  Pagination information */
  page: { nextPage?: RecipientTaxFormAttachmentId; previousPage?: RecipientTaxFormAttachmentId };
  total: PageTotal & unknown;
};

export type RecipientsPaginatedResponse = {
  /**  Pagination information including cursors for navigating to next/previous pages */
  page: { nextPage?: RecipientId; previousPage?: RecipientId };
  /**  List of recipients in the current page */
  recipients: (RecipientInfo)[];
  total: PageTotal & unknown;
};

export type Region = string;

/** A Public API version of RelatedTransactionData. */
export type RelatedTransactionData = {
  accountId: TransactionPartyId;
  amount: number;
  id: TransactionMetadataId;
  relationKind: TransactionRelationKind;
};

export type RequestSendMoneyPaymentMethod = "ach" | "check" | "domesticWire" | "internationalWire";

export type ResourceField = "transaction.amount" | "transaction.bankDescription" | "transaction.categoryData" | "transaction.customCategory" | "transaction.customCategory.id" | "transaction.customCategory.name" | "transaction.mercuryCategory" | "transaction.estimatedDeliveryDate" | "transaction.externalMemo" | "transaction.failedAt" | "transaction.note" | "transaction.postedAt" | "transaction.reasonForFailure" | "transaction.status" | "checkingAccount.availableBalance" | "checkingAccount.currentBalance" | "checkingAccount.inFlightBalance" | "savingsAccount.availableBalance" | "savingsAccount.currentBalance" | "savingsAccount.inFlightBalance" | "treasuryAccount.availableBalance" | "treasuryAccount.currentBalance" | "treasuryAccount.inFlightBalance" | "investmentAccount.availableBalance" | "investmentAccount.currentBalance" | "investmentAccount.inFlightBalance" | "creditAccount.availableBalance" | "creditAccount.currentBalance" | "creditAccount.inFlightBalance";

export type ResourceVersion = number;

export type ReviewRequestStatus = "pendingApproval" | "approved" | "rejected" | "cancelled";

/** ID for the SAFE request */
export type SafeRequestId = string;

export type SafeRequestInvestorType = "SafeRequestInvestorTypeIndividual" | "SafeRequestInvestorTypeVentureFund" | "SafeRequestInvestorTypeOther";

export type SecurityIdType = "cusip";

export type SendMoneyApiRequest = {
  /** Amount of USD you want to send, must be a positive number. */
  amount: PositiveDollar;
  /** Optional external memo */
  externalMemo?: string;
  /** Unique string identifying the transaction */
  idempotencyKey: string;
  /** Optional note */
  note?: string;
  /** Payment method to use. */
  paymentMethod: RequestSendMoneyPaymentMethod;
  /** Recipient ID from the /recipients endpoint. */
  recipientId: TransactionPartyId;
};

/** ID for the send money approval request */
export type SendMoneyApprovalRequestId = string;

/** Extremely close to the internal type, but strips out potentially unwanted fields */
export type SendMoneyApprovalRequestResponse = {
  accountId: TransactionPartyId;
  amount: PositiveDollar;
  memo?: string | null;
  paymentMethod: RequestSendMoneyPaymentMethod;
  recipientId: TransactionPartyId;
  requestId: string;
  status: ReviewRequestStatus;
};

export type SendMoneyApprovalRequestsPaginatedResponse = {
  page: { nextPage?: SendMoneyApprovalRequestId; previousPage?: SendMoneyApprovalRequestId };
  requests: (SendMoneyApprovalRequestResponse)[];
};

export type SimplePurpose = {
  /** Additional information. Required for: Vendor (vendor name), Contractor (contractor name), Other (payment description). Optional for Subsidiary (subsidiary name). Not accepted for any other categories. */
  additionalInfo?: string;
  /** Payment category. */
  category: "Employee" | "Landlord" | "Vendor" | "Contractor" | "Subsidiary" | "TransferToMyExternalAccount" | "FamilyMemberOrFriend" | "ForGoodsOrServices" | "AngelInvestment" | "SavingsOrInvestments" | "Expenses" | "Travel" | "Other";
};

/** Pagination cursor for retrieving next batch of transactions */
export type SliceSequenceNumber = number;

/** Spending controls applied to a card */
export type SpendLimit = {
  /**  Maximum total spend allowed per interval, in cents. */
  amountCents: number;
  /**  Maximum ATM withdrawal allowed per interval, in cents. Null for virtual cards. */
  atmAmountCents?: number | null;
  interval: SpendLimitInterval & unknown;
};

export type SpendLimitInterval = "daily" | "weekly" | "monthly";

export type SwiftBankAccountType = "checking" | "savings";

export type SwiftCodeData = {
  bankCityState: string;
  bankCountry: Iso3166Alpha2;
  bankName: string;
};

export type TaxFormType = "w9" | "w8BEN" | "w8BENE" | "unknown";

export type Transaction = {
  accountId: TransactionPartyId & unknown;
  amount: number;
  attachments: (TransactionAttachment)[];
  bankDescription?: string | null;
  categoryData?: CategoryData | null;
  /**  Present for check deposits and mailed checks; Nothing otherwise. */
  checkNumber?: string | null;
  compliantWithReceiptPolicy: boolean;
  counterpartyId: TransactionPartyId;
  counterpartyName: string;
  counterpartyNickname?: string | null;
  createdAt: UtcTime;
  creditAccountPeriodId?: MercuryCreditAccountStatementPeriodId | null;
  currencyExchangeInfo?: CurrencyExchangeInfo | null;
  dashboardLink: string;
  details?: TransactionMethodData | null;
  estimatedDeliveryDate: UtcTime;
  externalMemo?: string | null;
  failedAt?: UtcTime | null;
  feeId?: TransactionMetadataId | null;
  /**  Deprecated: use transactionGlAllocations instead. This field does not reflect GL codes  assigned via Mercury auto-categorization rules. Preserved for backwards compatibility. */
  generalLedgerCodeName?: string | null;
  /**  GL code allocations assigned to this transaction via a connected accounting software  integration (e.g. QuickBooks, Xero, NetSuite). Each allocation has a GL code name and  the amount allocated to it; amounts sum to the transaction total when the transaction is  fully categorized. Empty if no GL codes have been assigned. Distinct from Mercury custom  categories (see transactionCategoryData). */
  glAllocations: (GlAllocation)[];
  hasGeneratedReceipt: boolean;
  id: TransactionMetadataId;
  kind: TransactionKind;
  merchant?: MerchantData & unknown | null;
  mercuryCategory?: MercuryCategory | null;
  note?: string | null;
  postedAt?: UtcTime | null;
  reasonForFailure?: string | null;
  relatedTransactions: (RelatedTransactionData)[];
  requestId?: string | null;
  status: TransactionStatus;
  /**  Present for transactions that have tracking numbers (e.g., RTP, ACH, wires); Nothing otherwise. */
  trackingNumber?: string | null;
};

export type TransactionAttachment = {
  attachmentType: TransactionAttachmentType;
  fileName: string;
  url: string;
};

export type TransactionAttachmentType = "checkImage" | "receipt" | "other";

export type TransactionKind = "externalTransfer" | "internalTransfer" | "outgoingPayment" | "creditCardCredit" | "creditCardTransaction" | "debitCardCredit" | "debitCardTransaction" | "cardInternationalTransactionFee" | "cardInternationalTransactionFeeRebate" | "cardInternationalTransactionFeeReversal" | "cardInternationalTransactionFeeRebateReversal" | "incomingDomesticWire" | "checkDeposit" | "incomingInternationalWire" | "treasuryTransfer" | "currencyCloudReturn" | "wireFee" | "personalBankingSubscriptionFee" | "billingEngineSubscriptionFee" | "expenseReimbursement" | "exogenousWireDrawdown" | "other";

/** ID for this transaction */
export type TransactionMetadataId = string;

export type TransactionMethodData = {
  address?: AddressData | null;
  creditCardInfo?: CreditCardInfo | null;
  debitCardInfo?: DebitCardInfo | null;
  domesticWireRoutingInfo?: DomesticWireRoutingInfo | null;
  electronicRoutingInfo?: ElectronicRoutingInfo | null;
  internationalWireRoutingInfo?: InternationalWireRoutingInfo | null;
};

export type TransactionMethodKind = "outgoingElectronicPayment" | "outgoingCheckPayment" | "endogenousOutgoingAchTransfer" | "endogenousIncomingAchTransfer" | "exogenousOutgoingAch" | "exogenousIncomingAch" | "incomingCredit" | "outgoingCredit" | "incomingDebit" | "outgoingDebit" | "internalTransfer" | "incomingCheck" | "outgoingInternationalWire" | "incomingInternationalWire" | "outgoingDomesticWire" | "incomingDomesticWire" | "wireFee" | "conversionFee" | "personalBankingSubscriptionFee" | "billingEngineSubscriptionFee" | "physicalCardUpgradeFee" | "exogenousOutgoingCheck" | "exogenousOutgoingWire" | "treasuryTransfer" | "investTransfer" | "currencyCloudReturn" | "internationalWirePartnerReturn" | "internalCreditAccountPayment" | "autoRoutingTransfer" | "ventureDebtFunding" | "ventureDebtRepayment" | "creditCashbackRewardsDeposit" | "externalCreditCashbackRewardsDeposit" | "interestPayment" | "outgoingProvisionalCredit" | "incomingProvisionalCredit" | "lineOfCreditFunding" | "lineOfCreditRepayment" | "lineOfCreditInterestRepayment" | "atmFeeReimbursement" | "atmFeeReimbursementReversal" | "expenseReimbursement" | "requestedPayment" | "exogenousWireDrawdown" | "incomingCreditAccountRepayment" | "cardIntlTransactionFee" | "cardIntlTransactionFeeRebate" | "cardIntlTransactionFeeReversal" | "cardIntlTransactionFeeRebateReversal" | "externalCreditAccountPayment" | "realtimePayment" | "outgoingRealTimePayment" | "balanceHold" | "linkedMercuryAccountTransfer";

/** ID for a Mercury account. */
export type TransactionPartyId = string;

export type TransactionRelationKind = "ProvisionalCreditReversalToMerchantRefund" | "MerchantRefundToProvisionalCreditReversal" | "MerchantRefundToFraudulentCharge" | "FraudulentChargeToMerchantRefund" | "PaymentRefundToFailedPayment" | "FailedPaymentToPaymentRefund" | "GiftCompensationToOriginalTransaction" | "FeePaymentToOriginalTransaction" | "OriginalTransactionToFeePayment" | "FeePaymentToFeeRebate" | "FeeRebateToFeePayment" | "FeePaymentToFeeReversal" | "FeeReversalToFeePayment" | "FeeRebateToFeeRebateReversal" | "FeeRebateReversalToFeeRebate" | "TreasurySplitLiquidation" | "ProvisionalCreditToOriginalCharge" | "OriginalChargeToProvisionalCredit" | "FeeAtmReimbursementToAtmTransaction" | "AtmTransactionToFeeAtmReimbursement" | "AtmTransactionToAtmReimbursementReversal" | "AtmReimbursementReversalToAtmTransaction" | "ReturnToOriginalTransaction" | "OriginalTransactionToReturn" | "ProvisionalCreditToReversal" | "ReversalToProvisionalCredit";

export type TransactionStatus = "pending" | "sent" | "cancelled" | "failed" | "reversed" | "blocked";

export type TransactionsPaginatedResponse = {
  page: { nextPage?: Uuid; previousPage?: Uuid };
  transactions: (Transaction)[];
};

export type TransactionsResponse = {
  total: number;
  transactions: (Transaction)[];
};

export type TreasuryAccount = {
  availableBalance: number;
  createdAt: UtcTime;
  currentBalance: number;
  id: TransactionPartyId;
  /**  Monthly net return breakdown with dividend and fee details */
  netReturns: (TreasuryNetReturn)[];
  status: AccountStatus;
};

/** Paginated response type for treasury accounts API endpoint */
export type TreasuryAccountsPaginatedResponse = {
  /**  List of treasury accounts in the current page */
  accounts: (TreasuryAccount)[];
  /**  Pagination information including cursors for navigating to next/previous pages */
  page: { nextPage?: TransactionPartyId; previousPage?: TransactionPartyId };
};

/** Dividend information for a specific treasury security */
export type TreasuryDividend = {
  /**  Dividend amount for this security */
  amount: number;
  /**  Security identifier (e.g., "617455696") */
  id: string;
  /**  Human-readable security name (e.g., "Morgan Stanley Ultra-Short Income Portfolio Class IR") */
  securityName: string;
  type: SecurityIdType & unknown;
};

/** ID for this treasury transaction */
export type TreasuryLedgerPostedTransactionId = string;

/** Monthly net return breakdown for a treasury account */
export type TreasuryNetReturn = {
  /**  List of dividends received by security */
  dividends: (TreasuryDividend)[];
  month: Day & unknown;
  /**  Net return amount (dividends minus fees) */
  netAmount: number;
  status: TreasuryNetReturnStatus & unknown;
  /**  Treasury fee charged for this period (positive value) */
  treasuryFee: number;
};

export type TreasuryNetReturnStatus = "processing" | "pending" | "charged" | "error";

/** Individual treasury statement in the response */
export type TreasuryStatement = {
  accountId: TransactionPartyId & unknown;
  createdAt: UtcTime & unknown;
  creationDate: UtcTime & unknown;
  /**  Human-readable description of the statement */
  description: string;
  documentType: TreasuryStatementDocumentType & unknown;
  /**  URL to download the statement PDF */
  downloadUrl: string;
  id: AccountStatementId & unknown;
  periodEnd: Day & unknown;
  periodStart: Day & unknown;
  updatedAt: UtcTime & unknown;
};

export type TreasuryStatementDocumentType = "MonthlyStatement" | "TradeConfirmation" | "1099" | "1099R" | "1042S" | "5498" | "5498ESA" | "1099Q" | "FMV" | "SDIRA";

/** Paginated response for treasury account statements */
export type TreasuryStatementsPaginatedResponse = {
  page: { nextPage?: AccountStatementId; previousPage?: AccountStatementId };
  statements: (TreasuryStatement)[];
};

export type TreasuryTransactionDetails = {
  creditDescription?: string | null;
  depositCounterpartyId?: TransactionPartyId | null;
  feeDescription?: string | null;
  manualAmendmentDescription?: string | null;
  security?: string | null;
  sweepDirection?: string | null;
  tradeAction?: string | null;
  withdrawalCounterpartyId?: TransactionPartyId | null;
};

export type TreasuryTransactionType = "depositCanceled" | "depositComplete" | "depositFailed" | "depositReturned" | "mercuryFeePosted" | "mercuryFeeFailed" | "mercuryFeeRefunded" | "mercuryFeeCanceled" | "withdrawalPosted" | "withdrawalFailed" | "withdrawalCanceled" | "withdrawalReturned" | "revertTxn" | "interestPosted" | "interestCanceled" | "manualAmendmentPosted" | "mercuryCreditPosted" | "mercuryCreditFailed" | "dividendPosted" | "dividendCanceled" | "dividendReinvestmentPosted" | "mutualFundTradeFailed" | "mutualFundTradePosted" | "sweepInPosted" | "sweepOutPosted" | "sweepReconcilePosted" | "valuationChangePosted" | "oemsMutualFundOrderSettled" | "oemsMutualFundOrderCanceled" | "oemsMutualFundOrderRejected";

/** Response type for treasury transactions API endpoint */
export type TreasuryTransactionsResponse = {
  cursor?: SliceSequenceNumber & unknown | null;
  /**  List of treasury transactions in the response */
  transactions: (TreasuryTxn)[];
};

/** Treasury transaction data for external API consumption */
export type TreasuryTxn = {
  accountId: TransactionPartyId;
  additionalDetails?: string | null;
  amount: number;
  balance: number;
  canonicalDay: Day;
  description: string;
  details?: TreasuryTransactionDetails | null;
  id: TreasuryLedgerPostedTransactionId;
  security?: string | null;
  type: TreasuryTransactionType;
};

export type UsState = "AL" | "AK" | "AZ" | "AR" | "CA" | "CO" | "CT" | "DE" | "DC" | "FL" | "GA" | "HI" | "ID" | "IL" | "IN" | "IA" | "KS" | "KY" | "LA" | "ME" | "MD" | "MA" | "MI" | "MN" | "MS" | "MO" | "MT" | "NE" | "NV" | "NH" | "NJ" | "NM" | "NY" | "NC" | "ND" | "OH" | "OK" | "OR" | "PA" | "RI" | "SC" | "SD" | "TN" | "TX" | "UT" | "VT" | "VA" | "WA" | "WV" | "WI" | "WY";

export type UtcTime = string;

export type Uuid = string;

/** Response after updating a ledger template. */
export type UpdateBooksApiAgentLedgerTemplateResponse = {
  ledgerTemplate: BooksLedgerTemplate & unknown;
};

/** Request to update multiple journal entries in a single call. */
export type UpdateBooksApiJournalEntriesRequest = {
  /**  The individual journal entry updates */
  updates: (UpdateBooksApiJournalEntryRequest)[];
};

/** Request to update a single journal entry. */
export type UpdateBooksApiJournalEntryRequest = {
  datetime?: UtcTime & unknown | null;
  /**  Updated description */
  description?: string | null;
  /**  The ID of the journal entry to update */
  journalEntryId: string;
  lineEntryChanges?: BooksApiUpdateJournalEntryChanges & unknown | null;
};

/** Request to update an existing ledger template. */
export type UpdateBooksApiLedgerTemplateRequest = {
  /**  The name of the ledger. */
  name?: string | null;
  /**  Determines the display order in reports, ordered digit by digit. */
  sortCode?: string | null;
};

/** Request body for updating a card. At least one updateable field must be provided;  requests where every field is the same are rejected. */
export type UpdateCardRequest = {
  nickname: NicknameUpdate & unknown;
  spendLimit?: SpendLimit & unknown | null;
};

/** Request body for updating an existing webhook endpoint.  All fields are optional - only provided fields will be updated. */
export type UpdateWebhookParams = {
  /**  Event types to subscribe to. Send null to subscribe to all event types. Send an array to subscribe to specific types. Omit to leave unchanged. */
  eventTypes?: (WebhookEventType)[] | null;
  /**  Resource field paths to filter events by. When specified, webhook events will only be sent when one of these fields changes. Send null for no filtering. Send an array to filter by specific fields. Omit to leave unchanged. */
  filterPaths?: (ResourceField)[] | null;
  status?: WebhookUpdateStatus & unknown | null;
  /**  The URL to which webhook events will be delivered. Omit to leave unchanged. */
  url?: string | null;
};

/** Details of a user within an organization. */
export type UserDetails = {
  /**  User's email address */
  email: string;
  /**  User's first name */
  firstName: string;
  /**  User's last name */
  lastName: string;
  organizationRole: ApiUserRole & unknown;
  userId: UserId & unknown;
};

/** ID for the user */
export type UserId = string;

/** Paginated response containing a list of organization users. */
export type UsersPaginatedResponse = {
  /**  Pagination information including cursors for navigating to next/previous pages */
  page: { nextPage?: UserId; previousPage?: UserId };
  /**  List of users in the current page */
  users: (UserDetails)[];
};

export type ValuationType = "PreMoney" | "PostMoney" | "NoValuation";

/** Request body for verifying a webhook endpoint */
export type VerifyWebhookParams = {
  eventType?: WebhookEventType & unknown | null;
};

export type WebhookEventType = "transaction.created" | "transaction.updated" | "checkingAccount.balance.updated" | "savingsAccount.balance.updated" | "treasuryAccount.balance.updated" | "investmentAccount.balance.updated" | "creditAccount.balance.updated";

export type WebhookUpdateStatus = "active" | "paused";
