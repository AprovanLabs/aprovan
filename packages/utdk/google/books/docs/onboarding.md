# Onboarding

2 operations · `utdk/google/books`

```ts
import books from "utdk/google/books";
```

## `books.booksOnboardingListCategories`

List categories for onboarding experience. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksOnboardingListCategories(input: {
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
  /** ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset. */
  locale?: string;
}): Promise<Category>
```

<sub>`GET /books/v1/onboarding/listCategories` · `books.onboarding.listCategories`</sub>

## `books.booksOnboardingListCategoryVolumes`

List available volumes under categories for onboarding experience. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksOnboardingListCategoryVolumes(input: {
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
  /** List of category ids requested. */
  categoryId?: (string)[];
  /** ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset. */
  locale?: string;
  /** The maximum allowed maturity rating of returned volumes. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
  /** Number of maximum results per page to be included in the response. */
  pageSize?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
}): Promise<Volume2>
```

<sub>`GET /books/v1/onboarding/listCategoryVolumes` · `books.onboarding.listCategoryVolumes`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
