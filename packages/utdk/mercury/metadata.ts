import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "getAccount": {
    "accessPath": [
      "getAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/account/{accountId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "accountId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get account by ID"
  },
  "getAccountCards": {
    "accessPath": [
      "getAccountCards"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/account/{accountId}/cards",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "accountId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get cards for account"
  },
  "requestSendMoney": {
    "accessPath": [
      "requestSendMoney"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "externalMemo",
      "idempotencyKey",
      "note",
      "paymentMethod",
      "recipientId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/account/{accountId}/request-send-money",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "accountId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Request to send money"
  },
  "getAccountStatements": {
    "accessPath": [
      "getAccountStatements"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/account/{accountId}/statements",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "accountId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "start_after",
      "end_before",
      "start",
      "end"
    ],
    "description": "Get account statements"
  },
  "getTransaction": {
    "accessPath": [
      "getTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/account/{accountId}/transaction/{transactionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "accountId",
      "transactionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get transaction by ID"
  },
  "listAccountTransactions": {
    "accessPath": [
      "listAccountTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/account/{accountId}/transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "accountId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "start",
      "end",
      "search",
      "status",
      "offset",
      "order",
      "requestId",
      "mercuryCategory",
      "categoryId"
    ],
    "description": "List account transactions"
  },
  "createTransaction": {
    "accessPath": [
      "createTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "externalMemo",
      "idempotencyKey",
      "note",
      "paymentMethod",
      "purpose",
      "recipientId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/account/{accountId}/transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "accountId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send money to a recipient"
  },
  "getAccounts": {
    "accessPath": [
      "getAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "start_after",
      "end_before"
    ],
    "description": "Get all accounts"
  },
  "getAttachment": {
    "accessPath": [
      "getAttachment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/ar/attachments/{attachmentId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "attachmentId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get an attachment"
  },
  "listCustomers": {
    "accessPath": [
      "listCustomers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/ar/customers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "start_after",
      "end_before",
      "order"
    ],
    "description": "List all customers"
  },
  "createCustomer": {
    "accessPath": [
      "createCustomer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "email",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/ar/customers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a customer"
  },
  "deleteCustomer": {
    "accessPath": [
      "deleteCustomer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v1/ar/customers/{customerId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customerId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a customer"
  },
  "getCustomer": {
    "accessPath": [
      "getCustomer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/ar/customers/{customerId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customerId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a customer"
  },
  "updateCustomer": {
    "accessPath": [
      "updateCustomer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "email",
      "name",
      "resendOpenInvoices"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/ar/customers/{customerId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customerId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a customer"
  },
  "listInvoices": {
    "accessPath": [
      "listInvoices"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/ar/invoices",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "start_after",
      "end_before"
    ],
    "description": "List all invoices"
  },
  "createInvoice": {
    "accessPath": [
      "createInvoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "achDebitEnabled",
      "ccEmails",
      "creditCardEnabled",
      "customerId",
      "destinationAccountId",
      "dueDate",
      "internalNote",
      "invoiceDate",
      "invoiceNumber",
      "lineItems",
      "payerMemo",
      "poNumber",
      "sendEmailOption",
      "servicePeriodEndDate",
      "servicePeriodStartDate",
      "useRealAccountNumber"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/ar/invoices",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an invoice"
  },
  "getInvoice": {
    "accessPath": [
      "getInvoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/ar/invoices/{invoiceId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoiceId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get an invoice"
  },
  "updateInvoice": {
    "accessPath": [
      "updateInvoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "achDebitEnabled",
      "ccEmails",
      "creditCardEnabled",
      "dueDate",
      "internalNote",
      "invoiceDate",
      "invoiceNumber",
      "lineItems",
      "payerMemo",
      "poNumber",
      "servicePeriodEndDate",
      "servicePeriodStartDate",
      "useRealAccountNumber"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/ar/invoices/{invoiceId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoiceId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an invoice"
  },
  "listInvoiceAttachments": {
    "accessPath": [
      "listInvoiceAttachments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/ar/invoices/{invoiceId}/attachments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoiceId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List invoice attachments"
  },
  "cancelInvoice": {
    "accessPath": [
      "cancelInvoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/ar/invoices/{invoiceId}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoiceId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel an invoice"
  },
  "getInvoicePdf": {
    "accessPath": [
      "getInvoicePdf"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/ar/invoices/{invoiceId}/pdf",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoiceId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download invoice PDF"
  },
  "deleteBooksAgentCoaTemplate": {
    "accessPath": [
      "deleteBooksAgentCoaTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v1/books/agent-coa-template/{coaTemplateId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "coaTemplateId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Chart of Accounts Template"
  },
  "getBooksAgentCoaTemplate": {
    "accessPath": [
      "getBooksAgentCoaTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/books/agent-coa-template/{coaTemplateId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "coaTemplateId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Chart of Accounts Template"
  },
  "getBooksAgentCoaTemplates": {
    "accessPath": [
      "getBooksAgentCoaTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/books/agent-coa-templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "pageToken",
      "limit",
      "expand"
    ],
    "description": "List all Chart of Accounts Templates"
  },
  "postBooksAgentCoaTemplates": {
    "accessPath": [
      "postBooksAgentCoaTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "accountingBasis",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/books/agent-coa-templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Create a Chart of Accounts Template"
  },
  "deleteBooksAgentLedgerTemplate": {
    "accessPath": [
      "deleteBooksAgentLedgerTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v1/books/agent-ledger-template/{ledgerId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ledgerId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Ledger Template"
  },
  "putBooksAgentLedgerTemplate": {
    "accessPath": [
      "putBooksAgentLedgerTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "sortCode"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v1/books/agent-ledger-template/{ledgerId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ledgerId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a Ledger Template"
  },
  "postBooksAgentLedgerTemplates": {
    "accessPath": [
      "postBooksAgentLedgerTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "coaTemplateId",
      "debitCredit",
      "editable",
      "financialAccountType",
      "ledgerSubType",
      "ledgerType",
      "name",
      "parentId",
      "reportCashFlow",
      "sortCode"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/books/agent-ledger-templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Ledger Template"
  },
  "deleteBooksJournalEntries": {
    "accessPath": [
      "deleteBooksJournalEntries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "journalEntryIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v1/books/journal-entries/{booksId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "booksId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk delete journal entries"
  },
  "getBooksJournalEntries": {
    "accessPath": [
      "getBooksJournalEntries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/books/journal-entries/{booksId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "booksId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startDate",
      "endDate",
      "ledgerId",
      "creationSource",
      "journalEntrySort",
      "expand",
      "pageToken",
      "keywords",
      "amount",
      "minAmount",
      "maxAmount",
      "ledgerIdGroups",
      "limit"
    ],
    "description": "List all journal entries"
  },
  "postBooksJournalEntries": {
    "accessPath": [
      "postBooksJournalEntries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/books/journal-entries/{booksId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "booksId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "modifiedBy"
    ],
    "description": "Create multiple Journal Entries"
  },
  "putBooksJournalEntries": {
    "accessPath": [
      "putBooksJournalEntries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "updates"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v1/books/journal-entries/{booksId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "booksId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk update journal entries"
  },
  "getBooksJournalEntry": {
    "accessPath": [
      "getBooksJournalEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/books/journal-entry/{booksId}/{journalEntryId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "booksId",
      "journalEntryId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Journal Entry"
  },
  "listCards": {
    "accessPath": [
      "listCards"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/cards",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "status",
      "type",
      "kind",
      "userId",
      "limit",
      "order",
      "start_after",
      "end_before"
    ],
    "description": "List cards"
  },
  "createCard": {
    "accessPath": [
      "createCard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "accountId",
      "kind",
      "nickname",
      "spendLimit",
      "type",
      "userId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/cards",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a card"
  },
  "getCard": {
    "accessPath": [
      "getCard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/cards/{cardId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cardId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a card"
  },
  "updateCard": {
    "accessPath": [
      "updateCard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "nickname",
      "spendLimit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/cards/{cardId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cardId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a card"
  },
  "cancelCard": {
    "accessPath": [
      "cancelCard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/cards/{cardId}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cardId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a card"
  },
  "freezeCard": {
    "accessPath": [
      "freezeCard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/cards/{cardId}/freeze",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cardId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Freeze a card"
  },
  "unfreezeCard": {
    "accessPath": [
      "unfreezeCard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/cards/{cardId}/unfreeze",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cardId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unfreeze a card"
  },
  "listCategories": {
    "accessPath": [
      "listCategories"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/categories",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "start_after",
      "end_before"
    ],
    "description": "List all categories"
  },
  "createCategory": {
    "accessPath": [
      "createCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "visibleForCardSpend",
      "visibleForOther",
      "visibleForReimbursements"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/categories/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new category"
  },
  "editCategory": {
    "accessPath": [
      "editCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "visibleForCardSpend",
      "visibleForOther",
      "visibleForReimbursements"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/categories/{expenseCategoryId}/edit",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "expenseCategoryId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit a category"
  },
  "listCredit": {
    "accessPath": [
      "listCredit"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/credit",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all credit accounts"
  },
  "getEvents": {
    "accessPath": [
      "getEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "start_after",
      "end_before",
      "order",
      "resourceType",
      "resourceId"
    ],
    "description": "Get all events"
  },
  "getEvent": {
    "accessPath": [
      "getEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/events/{eventId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "eventId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get event by ID"
  },
  "getOrganization": {
    "accessPath": [
      "getOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/organization",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get organization information"
  },
  "getRecipient": {
    "accessPath": [
      "getRecipient"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/recipient/{recipientId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "recipientId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get recipient by ID"
  },
  "updateRecipient": {
    "accessPath": [
      "updateRecipient"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "checkInfo",
      "contactEmail",
      "domesticWireRoutingInfo",
      "electronicRoutingInfo",
      "emails",
      "name",
      "nickname"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/recipient/{recipientId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "recipientId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit information about a specific recipient"
  },
  "uploadRecipientAttachment": {
    "accessPath": [
      "uploadRecipientAttachment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/recipient/{recipientId}/attachments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "recipientId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Upload a recipient attachment",
    "parameterDescriptions": {
      "recipientId": "ID of the recipient to attach the file to"
    }
  },
  "getRecipients": {
    "accessPath": [
      "getRecipients"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/recipients",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "start_after",
      "end_before",
      "order"
    ],
    "description": "Get all recipients"
  },
  "createRecipient": {
    "accessPath": [
      "createRecipient"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "checkInfo",
      "contactEmail",
      "domesticWireRoutingInfo",
      "electronicRoutingInfo",
      "emails",
      "name",
      "nickname"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/recipients",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a new recipient"
  },
  "listRecipientsAttachments": {
    "accessPath": [
      "listRecipientsAttachments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/recipients/attachments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "start_after",
      "end_before",
      "order"
    ],
    "description": "List all recipient attachments"
  },
  "listSendMoneyApprovalRequests": {
    "accessPath": [
      "listSendMoneyApprovalRequests"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/request-send-money",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "status",
      "start_after",
      "end_before",
      "limit"
    ],
    "description": "List send money approval requests"
  },
  "getSendMoneyApprovalRequest": {
    "accessPath": [
      "getSendMoneyApprovalRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/request-send-money/{requestId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "requestId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get send money approval request by ID"
  },
  "getSafeRequests": {
    "accessPath": [
      "getSafeRequests"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/safes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all SAFEs"
  },
  "getSafeRequest": {
    "accessPath": [
      "getSafeRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/safes/{safeRequestId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "safeRequestId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get SAFE by ID"
  },
  "getSafeRequestDocument": {
    "accessPath": [
      "getSafeRequestDocument"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/safes/{safeRequestId}/document",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "safeRequestId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download SAFE document"
  },
  "getStatementPdf": {
    "accessPath": [
      "getStatementPdf"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/statements/{statementId}/pdf",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "statementId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download account statement PDF"
  },
  "getTransactionById": {
    "accessPath": [
      "getTransactionById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/transaction/{transactionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transactionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a transaction by ID"
  },
  "updateTransaction": {
    "accessPath": [
      "updateTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "categoryId",
      "note"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v1/transaction/{transactionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transactionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update transaction metadata"
  },
  "uploadTransactionAttachment": {
    "accessPath": [
      "uploadTransactionAttachment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "attachmentType",
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/transaction/{transactionId}/attachments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transactionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Upload a transaction attachment",
    "parameterDescriptions": {
      "transactionId": "ID of the transaction to attach the file to"
    }
  },
  "listTransactions": {
    "accessPath": [
      "listTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "status",
      "search",
      "start",
      "end",
      "postedStart",
      "postedEnd",
      "accountId",
      "mercuryCategory",
      "categoryId",
      "start_at",
      "start_after",
      "end_before",
      "limit",
      "order"
    ],
    "description": "List all transactions"
  },
  "createInternalTransfer": {
    "accessPath": [
      "createInternalTransfer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "destinationAccountId",
      "idempotencyKey",
      "note",
      "sourceAccountId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/transfer",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an internal transfer"
  },
  "getTreasury": {
    "accessPath": [
      "getTreasury"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/treasury",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "start_after",
      "end_before",
      "order"
    ],
    "description": "Get all treasury accounts"
  },
  "getTreasuryStatements": {
    "accessPath": [
      "getTreasuryStatements"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/treasury/{treasuryId}/statements",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "treasuryId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "start_after",
      "end_before",
      "documentType"
    ],
    "description": "Get treasury account statements"
  },
  "getTreasuryTransactions": {
    "accessPath": [
      "getTreasuryTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/treasury/{treasuryId}/transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "treasuryId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "cursor"
    ],
    "description": "Get treasury transactions"
  },
  "getUsers": {
    "accessPath": [
      "getUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "start_after",
      "end_before",
      "order"
    ],
    "description": "Get all users"
  },
  "getUser": {
    "accessPath": [
      "getUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/users/{userId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get user by ID"
  },
  "getWebhooks": {
    "accessPath": [
      "getWebhooks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "status",
      "limit",
      "start_after",
      "end_before",
      "order"
    ],
    "description": "Get webhook endpoints"
  },
  "createWebhook": {
    "accessPath": [
      "createWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "eventTypes",
      "filterPaths",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new webhook endpoint"
  },
  "deleteWebhook": {
    "accessPath": [
      "deleteWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v1/webhooks/{webhookEndpointId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhookEndpointId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a webhook endpoint"
  },
  "getWebhook": {
    "accessPath": [
      "getWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v1/webhooks/{webhookEndpointId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhookEndpointId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get webhook endpoint by ID"
  },
  "updateWebhook": {
    "accessPath": [
      "updateWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "eventTypes",
      "filterPaths",
      "status",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/webhooks/{webhookEndpointId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhookEndpointId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an existing webhook endpoint"
  },
  "verifyWebhook": {
    "accessPath": [
      "verifyWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "eventType"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v1/webhooks/{webhookEndpointId}/verify",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhookEndpointId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Verify a webhook endpoint"
  }
} satisfies ToolRuntimeMetadataMap;
