import type { Account, AccountCardsResponse, AccountsPaginatedResponse, AddressData, ApiEventResponse, ApiEventsPaginatedResponse, ApiSafeRequest, ApiSendEmailOption, ApiV1ArAttachmentResponseData, ApiV1ArAttachmentsResponseData, ApiV1ArCustomerAddressInput, ApiV1ArCustomerPaginatedResponseData, ApiV1ArCustomerResponseData, ApiV1ArInvoiceResponse, ApiV1ArInvoicesPaginatedResponse, ApiV1ArLineItemData, ApiWebhookResponse, ApiWebhooksPaginatedResponse, BooksAccountingBasis, BooksDebitCredit, BooksFinancialAccountType, BooksLedgerSubType, BooksLedgerType, Card, CardKind, CardListResponse, CategoriesPaginatedResponse, CategoryData, CategoryId, CategoryName, CheckInfoRaw, CreateBooksApiAgentCoaTemplateResponse, CreateBooksApiAgentLedgerTemplateResponse, CreateBooksApiJournalEntriesBulkResponse, CreateBooksApiJournalEntryRequest, CreateCardType, CreditAccountsResponse, CustomerId, Day, DepositoryAccountStatementsPaginatedResponse, DomesticWireRoutingInfoRaw, ElectronicRoutingInfoRaw, Email, GetBooksApiAgentCoaTemplateResponse, GetBooksApiAgentCoaTemplatesResponse, GetBooksApiJournalEntriesResponse, GetBooksApiJournalEntryResponse, InternalTransferApiResponse, NicknameUpdate, NoteUpdate, OrganizationResponse, PdfDocument, PositiveDollar, PostTransactionPaymentMethod, PostTransactionSendMoneyPurpose, RecipientInfo, RecipientsAttachmentsPaginatedResponse, RecipientsPaginatedResponse, RequestSendMoneyPaymentMethod, ResourceField, SendMoneyApprovalRequestResponse, SendMoneyApprovalRequestsPaginatedResponse, SpendLimit, Transaction, TransactionPartyId, TransactionsPaginatedResponse, TransactionsResponse, TreasuryAccountsPaginatedResponse, TreasuryStatementsPaginatedResponse, TreasuryTransactionsResponse, UpdateBooksApiAgentLedgerTemplateResponse, UpdateBooksApiJournalEntryRequest, UserDetails, UsersPaginatedResponse, WebhookEventType, WebhookUpdateStatus } from "./schemas.js";

export type MercuryClient = {
  /**
   * Get account by ID
   */
  getAccount: (input: {
    /** ID for a Mercury account. */
    accountId: string;
  }) => Promise<Account>;

  /**
   * Get cards for account
   */
  getAccountCards: (input: {
    /** ID for a Mercury account. */
    accountId: string;
  }) => Promise<AccountCardsResponse>;

  /**
   * Request to send money
   */
  requestSendMoney: (input: {
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
    /** ID for a Mercury account. */
    accountId: string;
  }) => Promise<SendMoneyApprovalRequestResponse>;

  /**
   * Get account statements
   */
  getAccountStatements: (input: {
    /** ID for a Mercury account. */
    accountId: string;
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'desc' */
    order?: "asc" | "desc";
    /** The ID of the statement to start the page after (exclusive). When provided, results will begin with the statement immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the statement to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
    /** Filter statements where the period start date is on or after this date. Format: YYYY-MM-DD */
    start?: string;
    /** Filter statements where the period start date is on or before this date. If the date is in the future, defaults to the current date. Format: YYYY-MM-DD */
    end?: string;
  }) => Promise<DepositoryAccountStatementsPaginatedResponse>;

  /**
   * Get transaction by ID
   */
  getTransaction: (input: {
    /** ID for a Mercury account. */
    accountId: string;
    /** ID for this transaction */
    transactionId: string;
  }) => Promise<Transaction>;

  /**
   * List account transactions
   */
  listAccountTransactions: (input: {
    /** ID for a Mercury account. */
    accountId: string;
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** Earliest date to filter transactions. If not provided, defaults to 30 days before the current date. Format: YYYY-MM-DD or ISO 8601 string */
    start?: string;
    /** Latest date to filter transactions. If not provided, defaults to the current date. Format: YYYY-MM-DD or ISO 8601 string */
    end?: string;
    /** Search term to filter transactions by description or counterparty name */
    search?: string;
    status?: "pending" | "sent" | "cancelled" | "failed" | "reversed" | "blocked";
    /** Number of results to skip for pagination */
    offset?: number;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'desc' */
    order?: "asc" | "desc";
    /** ID returned from /account/:id/request-send-money */
    requestId?: string;
    /** Name of mercuryCategory you want to filter on. Merchant Type in the UI. */
    mercuryCategory?: string;
    /** UUID of a custom category. Can be returned from /categories endpoint. */
    categoryId?: string;
  }) => Promise<TransactionsResponse>;

  /**
   * Send money to a recipient
   */
  createTransaction: (input: {
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
    /** ID for a Mercury account. */
    accountId: string;
  }) => Promise<Transaction>;

  /**
   * Get all accounts
   */
  getAccounts: (input: {
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
    /** The ID of the account to start the page after (exclusive). When provided, results will begin with the account immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the account to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
  }) => Promise<AccountsPaginatedResponse>;

  /**
   * Get an attachment
   */
  getAttachment: (input: {
    /** ID for the attachment. */
    attachmentId: string;
  }) => Promise<ApiV1ArAttachmentResponseData>;

  /**
   * List all customers
   */
  listCustomers: (input: {
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** The ID of the customer to start the page after (exclusive). When provided, results will begin with the customer immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the customer to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
  }) => Promise<ApiV1ArCustomerPaginatedResponseData>;

  /**
   * Create a customer
   */
  createCustomer: (input: {
    address?: ApiV1ArCustomerAddressInput & unknown | null;
    email: Email & unknown;
    /**  The name of the customer. */
    name: string;
  }) => Promise<ApiV1ArCustomerResponseData>;

  /**
   * Delete a customer
   */
  deleteCustomer: (input: {
    /** The customer who will receive the invoice. Use the /api/v1/ar/customers endpoint to list your customers and find the corresponding id, or create a new customer first. */
    customerId: string;
  }) => Promise<unknown>;

  /**
   * Get a customer
   */
  getCustomer: (input: {
    /** The customer who will receive the invoice. Use the /api/v1/ar/customers endpoint to list your customers and find the corresponding id, or create a new customer first. */
    customerId: string;
  }) => Promise<ApiV1ArCustomerResponseData>;

  /**
   * Update a customer
   */
  updateCustomer: (input: {
    address?: ApiV1ArCustomerAddressInput & unknown | null;
    email: Email & unknown;
    /**  The name of the customer. */
    name: string;
    /**  Open invoices for the customer will be resent with updated data  when this is true. */
    resendOpenInvoices: boolean;
    /** The customer who will receive the invoice. Use the /api/v1/ar/customers endpoint to list your customers and find the corresponding id, or create a new customer first. */
    customerId: string;
  }) => Promise<ApiV1ArCustomerResponseData>;

  /**
   * List all invoices
   */
  listInvoices: (input: {
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
    /** The ID of the invoice to start the page after (exclusive). When provided, results will begin with the invoice immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the invoice to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
  }) => Promise<ApiV1ArInvoicesPaginatedResponse>;

  /**
   * Create an invoice
   */
  createInvoice: (input: {
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
  }) => Promise<ApiV1ArInvoiceResponse>;

  /**
   * Get an invoice
   */
  getInvoice: (input: {
    /** ID for the invoice. */
    invoiceId: string;
  }) => Promise<ApiV1ArInvoiceResponse>;

  /**
   * Update an invoice
   */
  updateInvoice: (input: {
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
    /** ID for the invoice. */
    invoiceId: string;
  }) => Promise<ApiV1ArInvoiceResponse>;

  /**
   * List invoice attachments
   */
  listInvoiceAttachments: (input: {
    /** ID for the invoice. */
    invoiceId: string;
  }) => Promise<ApiV1ArAttachmentsResponseData>;

  /**
   * Cancel an invoice
   */
  cancelInvoice: (input: {
    /** ID for the invoice. */
    invoiceId: string;
  }) => Promise<unknown>;

  /**
   * Download invoice PDF
   */
  getInvoicePdf: (input: {
    /** ID for the invoice. */
    invoiceId: string;
  }) => Promise<PdfDocument>;

  /**
   * Delete a Chart of Accounts Template
   */
  deleteBooksAgentCoaTemplate: (input: {
    /** unique id for a chart of accounts template */
    coaTemplateId: string;
  }) => Promise<(unknown)[]>;

  /**
   * Retrieve a Chart of Accounts Template
   */
  getBooksAgentCoaTemplate: (input: {
    /** unique id for a chart of accounts template */
    coaTemplateId: string;
    /** Comma-separated list of expandable paths. */
    expand?: "ledgers";
  }) => Promise<GetBooksApiAgentCoaTemplateResponse>;

  /**
   * List all Chart of Accounts Templates
   */
  getBooksAgentCoaTemplates: (input: {
    /** token for pagination */
    pageToken?: string;
    /** The number of records to return. Max limit is 100. */
    limit?: number;
    /** Comma-separated list of expandable paths. */
    expand?: "ledgers";
  }) => Promise<GetBooksApiAgentCoaTemplatesResponse>;

  /**
   * Create a Chart of Accounts Template
   */
  postBooksAgentCoaTemplates: (input: {
    accountingBasis: BooksAccountingBasis & unknown;
    /**  An arbitrary string on the object, useful for identifying the Chart of Accounts template. */
    name: string;
    /** Comma-separated list of expandable paths. */
    expand?: "ledgers";
  }) => Promise<CreateBooksApiAgentCoaTemplateResponse>;

  /**
   * Delete a Ledger Template
   */
  deleteBooksAgentLedgerTemplate: (input: {
    /** unique id for a ledger */
    ledgerId: string;
  }) => Promise<(unknown)[]>;

  /**
   * Update a Ledger Template
   */
  putBooksAgentLedgerTemplate: (input: {
    /**  The name of the ledger. */
    name?: string | null;
    /**  Determines the display order in reports, ordered digit by digit. */
    sortCode?: string | null;
    /** unique id for a ledger */
    ledgerId: string;
  }) => Promise<UpdateBooksApiAgentLedgerTemplateResponse>;

  /**
   * Create a Ledger Template
   */
  postBooksAgentLedgerTemplates: (input: {
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
  }) => Promise<CreateBooksApiAgentLedgerTemplateResponse>;

  /**
   * Bulk delete journal entries
   */
  deleteBooksJournalEntries: (input: {
    /**  A list of journal entry ids to delete */
    journalEntryIds: (string)[];
    booksId: string;
  }) => Promise<(unknown)[]>;

  /**
   * List all journal entries
   */
  getBooksJournalEntries: (input: {
    booksId: string;
    /** Only return Journal Entries after the start date (inclusive). */
    startDate?: string;
    /** Only return Journal Entries before the end date (inclusive). */
    endDate?: string;
    /** Only return Journal Entries where at least one Line Entry belongs to the specified Ledger. */
    ledgerId?: string;
    /** Only return Journal Entries with the specified creation source. */
    creationSource?: "manual" | "transaction" | "accrual" | "paymentApplication" | "legacy";
    /** The sort order for the results. */
    journalEntrySort?: "descriptionAsc" | "descriptionDesc" | "dateTimeAsc" | "dateTimeDesc" | "amountAsc" | "amountDesc";
    /** Comma-separated list of expandable paths. */
    expand?: "lineEntries" | "lineEntries.transactions" | "lineEntries.ledger" | "lineEntries.opposingLedgerIds" | "lineEntries.paymentApplications" | "accrualSource";
    /** token for pagination */
    pageToken?: string;
    /** Only return Journal Entries where the description matches the specified keyword(s). */
    keywords?: string;
    /** Only return journal entries with the specified monetary amount.  If specified, `minAmount` and `maxAmount` parameters are ignored.  If no decimal place provided, rounded values will be matched.  E.g. an input of `100` will match 100.13 and 100.45, but an input of `100.13` will only match that value. */
    amount?: number;
    /** Only return journal entries with a monetary amount of at least the specified amount.  Ignored if `amount` is set. */
    minAmount?: number;
    /** Only return journal entries with a monetary amount less than specified amount.  Ignored if `amount` is set. */
    maxAmount?: number;
    /** One or more comma-separated lists of ledger IDs.  Only return Journal Entries where at least one Line Entry belongs to one of the specified ledgers in a group.  Specifying multiple groups will return an intersection of the matches. */
    ledgerIdGroups?: (string)[];
    /** The maximum number of journal entries to return per page. */
    limit?: number;
  }) => Promise<GetBooksApiJournalEntriesResponse>;

  /**
   * Create multiple Journal Entries
   */
  postBooksJournalEntries: (input: {
    body?: (CreateBooksApiJournalEntryRequest)[];
    booksId: string;
    /** Comma-separated list of expandable paths. */
    expand?: "lineEntries" | "lineEntries.transactions" | "lineEntries.ledger" | "lineEntries.opposingLedgerIds" | "lineEntries.paymentApplications" | "accrualSource";
    /** An optional identifier for audit logging. */
    modifiedBy?: string;
  }) => Promise<CreateBooksApiJournalEntriesBulkResponse>;

  /**
   * Bulk update journal entries
   */
  putBooksJournalEntries: (input: {
    /**  The individual journal entry updates */
    updates: (UpdateBooksApiJournalEntryRequest)[];
    booksId: string;
  }) => Promise<(unknown)[]>;

  /**
   * Retrieve a Journal Entry
   */
  getBooksJournalEntry: (input: {
    booksId: string;
    /** unique id for a journal entry */
    journalEntryId: string;
    expand?: "lineEntries" | "lineEntries.transactions" | "lineEntries.ledger" | "lineEntries.opposingLedgerIds" | "lineEntries.paymentApplications" | "accrualSource";
  }) => Promise<GetBooksApiJournalEntryResponse>;

  /**
   * List cards
   */
  listCards: (input: {
    /** Filter cards by one or more account IDs. */
    accountId?: (string)[];
    /** Filter cards by one or more statuses. */
    status?: ("active" | "frozen" | "cancelled" | "inactive" | "expired" | "suspended")[];
    /** Filter cards by type (virtual or physical). */
    type?: ("virtual" | "physical")[];
    /** Filter cards by kind (debit or credit). */
    kind?: ("debit" | "credit")[];
    /** Filter cards by one or more cardholder user IDs. */
    userId?: (string)[];
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 500 */
    limit?: number;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
    /** The ID of the card to start the page after (exclusive). When provided, results will begin with the card immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the card to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
  }) => Promise<CardListResponse>;

  /**
   * Create a card
   */
  createCard: (input: {
    /**  The deposit account the new card will draw funds from. */
    accountId: string;
    kind: CardKind & unknown;
    /**  Optional user-assigned label for the card. */
    nickname?: string | null;
    spendLimit?: SpendLimit & unknown | null;
    type: CreateCardType & unknown;
    /**  The user to assign as the cardholder. */
    userId: string;
  }) => Promise<Card>;

  /**
   * Get a card
   */
  getCard: (input: {
    /** Unique identifier for a card */
    cardId: string;
  }) => Promise<Card>;

  /**
   * Update a card
   */
  updateCard: (input: {
    nickname: NicknameUpdate & unknown;
    spendLimit?: SpendLimit & unknown | null;
    /** Unique identifier for a card */
    cardId: string;
  }) => Promise<Card>;

  /**
   * Cancel a card
   */
  cancelCard: (input: {
    /** Unique identifier for a card */
    cardId: string;
  }) => Promise<Card>;

  /**
   * Freeze a card
   */
  freezeCard: (input: {
    /** Unique identifier for a card */
    cardId: string;
  }) => Promise<Card>;

  /**
   * Unfreeze a card
   */
  unfreezeCard: (input: {
    /** Unique identifier for a card */
    cardId: string;
  }) => Promise<Card>;

  /**
   * List all categories
   */
  listCategories: (input: {
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
    /** The ID of the category to start the page after (exclusive). When provided, results will begin with the category immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the category to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
  }) => Promise<CategoriesPaginatedResponse>;

  /**
   * Create a new category
   */
  createCategory: (input: {
    name: CategoryName & unknown;
    /**  Whether this category is applicable to card transactions */
    visibleForCardSpend: boolean;
    /**  Whether this category is applicable to all other transaction kinds */
    visibleForOther: boolean;
    /**  Whether this category is applicable to expense reimbursement transactions */
    visibleForReimbursements: boolean;
  }) => Promise<CategoryData>;

  /**
   * Edit a category
   */
  editCategory: (input: {
    name?: CategoryName & unknown | null;
    /**  Whether this category is applicable to card transactions */
    visibleForCardSpend?: boolean | null;
    /**  Whether this category is applicable to all other transaction kinds */
    visibleForOther?: boolean | null;
    /**  Whether this category is applicable to expense reimbursement transactions */
    visibleForReimbursements?: boolean | null;
    /** ID for the category */
    expenseCategoryId: string;
  }) => Promise<CategoryData>;

  /**
   * List all credit accounts
   */
  listCredit: () => Promise<CreditAccountsResponse>;

  /**
   * Get all events
   */
  getEvents: (input: {
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** The ID of the event to start the page after (exclusive). When provided, results will begin with the event immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the event to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
    resourceType?: "transaction" | "checkingAccount" | "savingsAccount" | "treasuryAccount" | "investmentAccount" | "creditAccount";
    resourceId?: string;
  }) => Promise<ApiEventsPaginatedResponse>;

  /**
   * Get event by ID
   */
  getEvent: (input: {
    /** ID for the API event */
    eventId: string;
  }) => Promise<ApiEventResponse>;

  /**
   * Get organization information
   */
  getOrganization: () => Promise<OrganizationResponse>;

  /**
   * Get recipient by ID
   */
  getRecipient: (input: {
    /** ID for a Mercury account. */
    recipientId: string;
  }) => Promise<RecipientInfo>;

  /**
   * Edit information about a specific recipient
   */
  updateRecipient: (input: {
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
    /** ID for a Mercury account. */
    recipientId: string;
  }) => Promise<RecipientInfo>;

  /**
   * Upload a recipient attachment
   */
  uploadRecipientAttachment: (input: {
    /** The file to upload (tax form document) */
    file: string;
    /** ID of the recipient to attach the file to */
    recipientId: string;
  }) => Promise<unknown>;

  /**
   * Get all recipients
   */
  getRecipients: (input: {
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** The ID of the recipient to start the page after (exclusive). When provided, results will begin with the recipient immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the recipient to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
  }) => Promise<RecipientsPaginatedResponse>;

  /**
   * Add a new recipient
   */
  createRecipient: (input: {
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
  }) => Promise<RecipientInfo>;

  /**
   * List all recipient attachments
   */
  listRecipientsAttachments: (input: {
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** The ID of the recipient attachment to start the page after (exclusive). When provided, results will begin with the recipient attachment immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the recipient attachment to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
  }) => Promise<RecipientsAttachmentsPaginatedResponse>;

  /**
   * List send money approval requests
   */
  listSendMoneyApprovalRequests: (input: {
    /** ID for a Mercury account. */
    accountId?: string;
    status?: "pendingApproval" | "approved" | "rejected" | "cancelled";
    /** The ID of the send money approval request to start the page after (exclusive). When provided, results will begin with the send money approval request immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the send money approval request to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
  }) => Promise<SendMoneyApprovalRequestsPaginatedResponse>;

  /**
   * Get send money approval request by ID
   */
  getSendMoneyApprovalRequest: (input: {
    /** ID for the send money approval request */
    requestId: string;
  }) => Promise<SendMoneyApprovalRequestResponse>;

  /**
   * Get all SAFEs
   */
  getSafeRequests: () => Promise<(ApiSafeRequest)[]>;

  /**
   * Get SAFE by ID
   */
  getSafeRequest: (input: {
    /** ID for the SAFE request */
    safeRequestId: string;
  }) => Promise<ApiSafeRequest>;

  /**
   * Download SAFE document
   */
  getSafeRequestDocument: (input: {
    /** ID for the SAFE request */
    safeRequestId: string;
  }) => Promise<PdfDocument>;

  /**
   * Download account statement PDF
   */
  getStatementPdf: (input: {
    /** ID for the account statement */
    statementId: string;
  }) => Promise<PdfDocument>;

  /**
   * Get a transaction by ID
   */
  getTransactionById: (input: {
    /** ID for this transaction */
    transactionId: string;
  }) => Promise<Transaction>;

  /**
   * Update transaction metadata
   */
  updateTransaction: (input: {
    categoryId: CategoryId & unknown;
    note: NoteUpdate & unknown;
    /** ID for this transaction */
    transactionId: string;
  }) => Promise<Transaction>;

  /**
   * Upload a transaction attachment
   */
  uploadTransactionAttachment: (input: {
    /** Type of attachment: 'receipt', 'bill', or 'other'. Defaults to 'other'. */
    attachmentType?: "receipt" | "bill" | "other";
    /** The file to upload */
    file: string;
    /** ID of the transaction to attach the file to */
    transactionId: string;
  }) => Promise<unknown>;

  /**
   * List all transactions
   */
  listTransactions: (input: {
    status?: ("pending" | "sent" | "cancelled" | "failed" | "reversed" | "blocked")[];
    /** Search term to look for in transaction descriptions. */
    search?: string;
    /** Earliest createdAt date to filter for. If not provided, it defaults to the date of your first transaction. Format: YYYY-MM-DD or an ISO 8601 string. Please note that your Mercury transactions on your Dashboard might have their postedAt date displayed, as opposed to createdAt */
    start?: string;
    /** Latest createdAt date to filter for. If it’s not provided, it defaults to current day. Format: YYYY-MM-DD or an ISO 8601 string. Please note that your Mercury transactions on your Dashboard might have their postedAt date displayed, as opposed to createdAt */
    end?: string;
    /** Earliest postedAt date to filter for. Format: YYYY-MM-DD or an ISO 8601 string */
    postedStart?: string;
    /** Latest postedAt date to filter for. Format: YYYY-MM-DD or an ISO 8601 string */
    postedEnd?: string;
    accountId?: (string)[];
    /** Name of mercuryCategory you want to filter on. Merchant Type in the UI. */
    mercuryCategory?: string;
    /** UUID of a custom category. Can be returned from /categories endpoint. */
    categoryId?: string;
    /** The ID of the resource to start the page at (inclusive). When provided, results will begin with and include the resource with this ID. Use this to retrieve a specific page when you know the exact starting point. Cannot be combined with start_after or end_before. */
    start_at?: string;
    /** The ID of the transaction to start the page after (exclusive). When provided, results will begin with the transaction immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the transaction to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
  }) => Promise<TransactionsPaginatedResponse>;

  /**
   * Create an internal transfer
   */
  createInternalTransfer: (input: {
    amount: PositiveDollar;
    destinationAccountId: TransactionPartyId;
    idempotencyKey: string;
    note?: string | null;
    sourceAccountId: TransactionPartyId;
  }) => Promise<InternalTransferApiResponse>;

  /**
   * Get all treasury accounts
   */
  getTreasury: (input: {
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** The ID of the account to start the page after (exclusive). When provided, results will begin with the account immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the account to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
  }) => Promise<TreasuryAccountsPaginatedResponse>;

  /**
   * Get treasury account statements
   */
  getTreasuryStatements: (input: {
    /** ID for a Mercury account. */
    treasuryId: string;
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
    /** The ID of the statement to start the page after (exclusive). When provided, results will begin with the statement immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the statement to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
    /** Filter statements by document type. */
    documentType?: "MonthlyStatement" | "TradeConfirmation" | "1099" | "1099R" | "1042S" | "5498" | "5498ESA" | "1099Q" | "FMV" | "SDIRA";
  }) => Promise<TreasuryStatementsPaginatedResponse>;

  /**
   * Get treasury transactions
   */
  getTreasuryTransactions: (input: {
    /** ID for a Mercury account. */
    treasuryId: string;
    /** Maximum number of results to return. Defaults to 100 */
    limit?: number;
    /** Sort order for transactions. Can be 'asc' or 'desc'. Defaults to 'desc' */
    order?: "asc" | "desc";
    /** Pagination cursor for retrieving next batch of transactions. Must be an integer >= 0 */
    cursor?: number;
  }) => Promise<TreasuryTransactionsResponse>;

  /**
   * Get all users
   */
  getUsers: (input: {
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** The ID of the user to start the page after (exclusive). When provided, results will begin with the user immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the user to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
  }) => Promise<UsersPaginatedResponse>;

  /**
   * Get user by ID
   */
  getUser: (input: {
    /** ID for the user */
    userId: string;
  }) => Promise<UserDetails>;

  /**
   * Get webhook endpoints
   */
  getWebhooks: (input: {
    status?: ("active" | "paused" | "disabled" | "deleted")[];
    /** Maximum number of results to return. Allowed range: 1 to 1000. Defaults to 1000 */
    limit?: number;
    /** The ID of the webhook to start the page after (exclusive). When provided, results will begin with the webhook immediately following this ID. Use this for standard forward pagination to get the next page of results. Cannot be combined with end_before. */
    start_after?: string;
    /** The ID of the webhook to end the page before (exclusive). When provided, results will end just before this ID and work backwards. Use this for reverse pagination or to retrieve previous pages. Cannot be combined with start_after. */
    end_before?: string;
    /** Sort order. Can be 'asc' or 'desc'. Defaults to 'asc' */
    order?: "asc" | "desc";
  }) => Promise<ApiWebhooksPaginatedResponse>;

  /**
   * Create a new webhook endpoint
   */
  createWebhook: (input: {
    /**  Optional array of event types to subscribe to. Nothing means subscribe to all event types. */
    eventTypes?: (WebhookEventType)[] | null;
    /**  Optional array of resource field paths to filter events by. When specified, webhook events will only be sent when one of these fields changes. Nothing means no filtering (all events are sent). */
    filterPaths?: (ResourceField)[] | null;
    /**  The URL to which webhook events will be delivered */
    url: string;
  }) => Promise<ApiWebhookResponse>;

  /**
   * Delete a webhook endpoint
   */
  deleteWebhook: (input: {
    /** ID for the webhook */
    webhookEndpointId: string;
  }) => Promise<unknown>;

  /**
   * Get webhook endpoint by ID
   */
  getWebhook: (input: {
    /** ID for the webhook */
    webhookEndpointId: string;
  }) => Promise<ApiWebhookResponse>;

  /**
   * Update an existing webhook endpoint
   */
  updateWebhook: (input: {
    /**  Event types to subscribe to. Send null to subscribe to all event types. Send an array to subscribe to specific types. Omit to leave unchanged. */
    eventTypes?: (WebhookEventType)[] | null;
    /**  Resource field paths to filter events by. When specified, webhook events will only be sent when one of these fields changes. Send null for no filtering. Send an array to filter by specific fields. Omit to leave unchanged. */
    filterPaths?: (ResourceField)[] | null;
    status?: WebhookUpdateStatus & unknown | null;
    /**  The URL to which webhook events will be delivered. Omit to leave unchanged. */
    url?: string | null;
    /** ID for the webhook */
    webhookEndpointId: string;
  }) => Promise<ApiWebhookResponse>;

  /**
   * Verify a webhook endpoint
   */
  verifyWebhook: (input: {
    eventType?: WebhookEventType & unknown | null;
    /** ID for the webhook */
    webhookEndpointId: string;
  }) => Promise<unknown>;
};

export * from "./schemas.js";
