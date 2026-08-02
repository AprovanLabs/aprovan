# Security Advisories

10 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.securityAdvisories.listGlobalAdvisories`

List global security advisories — [API reference](https://docs.github.com/rest/security-advisories/global-advisories#list-global-security-advisories)

```ts
github.securityAdvisories.listGlobalAdvisories(input: {
  /** If specified, only advisories with this GHSA (GitHub Security Advisory) identifier will be returned. */
  ghsa_id?: string;
  /** If specified, only advisories of this type will be returned. By default, a request with no other parameters defined will only return reviewed advisories that are not malware. */
  type?: "reviewed" | "malware" | "unreviewed";
  /** If specified, only advisories with this CVE (Common Vulnerabilities and Exposures) identifier will be returned. */
  cve_id?: string;
  ecosystem?: SecurityAdvisoryEcosystems;
  /** If specified, only advisories with these severities will be returned. */
  severity?: "unknown" | "low" | "medium" | "high" | "critical";
  /** If specified, only advisories with these Common Weakness Enumerations (CWEs) will be returned.  Example: `cwes=79,284,22` or `cwes[]=79&cwes[]=284&cwes[]=22` */
  cwes?: string | (string)[];
  /** Whether to only return advisories that have been withdrawn. */
  is_withdrawn?: boolean;
  /** If specified, only return advisories that affect any of `package` or `package@version`. A maximum of 1000 packages can be specified. If the query parameter causes the URL to exceed the maximum URL length supported by your client, you must specify fewer packages.  Example: `affects=package1,package2@1.0.0,package3@2.0.0` or `affects[]=package1&affects[]=package2@1.0.0` */
  affects?: string | (string)[];
  /** If specified, only return advisories that were published on a date or date range.  For more information on the syntax of the date range, see "[Understanding the search syntax](https://docs.github.com/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-dates)." */
  published?: string;
  /** If specified, only return advisories that were updated on a date or date range.  For more information on the syntax of the date range, see "[Understanding the search syntax](https://docs.github.com/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-dates)." */
  updated?: string;
  /** If specified, only show advisories that were updated or published on a date or date range.  For more information on the syntax of the date range, see "[Understanding the search syntax](https://docs.github.com/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-dates)." */
  modified?: string;
  /** If specified, only return advisories that have an EPSS percentage score that matches the provided value. The EPSS percentage represents the likelihood of a CVE being exploited. */
  epss_percentage?: string;
  /** If specified, only return advisories that have an EPSS percentile score that matches the provided value. The EPSS percentile represents the relative rank of the CVE's likelihood of being exploited compared to other CVEs. */
  epss_percentile?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The property to sort the results by. */
  sort?: "updated" | "published" | "epss_percentage" | "epss_percentile";
}): Promise<(GlobalAdvisory)[]>
```

<sub>`GET /advisories` · `security-advisories/list-global-advisories`</sub>

## `github.securityAdvisories.getGlobalAdvisory`

Get a global security advisory — [API reference](https://docs.github.com/rest/security-advisories/global-advisories#get-a-global-security-advisory)

```ts
github.securityAdvisories.getGlobalAdvisory(input: {
  /** The GHSA (GitHub Security Advisory) identifier of the advisory. */
  ghsa_id: string;
}): Promise<GlobalAdvisory>
```

<sub>`GET /advisories/{ghsa_id}` · `security-advisories/get-global-advisory`</sub>

## `github.securityAdvisories.listOrgRepositoryAdvisories`

List repository security advisories for an organization — [API reference](https://docs.github.com/rest/security-advisories/repository-advisories#list-repository-security-advisories-for-an-organization)

```ts
github.securityAdvisories.listOrgRepositoryAdvisories(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The property to sort the results by. */
  sort?: "created" | "updated" | "published";
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** The number of advisories to return per page. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** Filter by the state of the repository advisories. Only advisories of this state will be returned. */
  state?: "triage" | "draft" | "published" | "closed";
}): Promise<(RepositoryAdvisory)[]>
```

<sub>`GET /orgs/{org}/security-advisories` · `security-advisories/list-org-repository-advisories`</sub>

## `github.securityAdvisories.listRepositoryAdvisories`

List repository security advisories — [API reference](https://docs.github.com/rest/security-advisories/repository-advisories#list-repository-security-advisories)

```ts
github.securityAdvisories.listRepositoryAdvisories(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The property to sort the results by. */
  sort?: "created" | "updated" | "published";
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** The number of advisories to return per page. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** Filter by state of the repository advisories. Only advisories of this state will be returned. */
  state?: "triage" | "draft" | "published" | "closed";
}): Promise<(RepositoryAdvisory)[]>
```

<sub>`GET /repos/{owner}/{repo}/security-advisories` · `security-advisories/list-repository-advisories`</sub>

## `github.securityAdvisories.createRepositoryAdvisory`

Create a repository security advisory — [API reference](https://docs.github.com/rest/security-advisories/repository-advisories#create-a-repository-security-advisory)

```ts
github.securityAdvisories.createRepositoryAdvisory(input: {
  /** A short summary of the advisory. */
  summary: string;
  /** A detailed description of what the advisory impacts. */
  description: string;
  /** The Common Vulnerabilities and Exposures (CVE) ID. */
  cve_id?: string | null;
  /** A product affected by the vulnerability detailed in a repository security advisory. */
  vulnerabilities: ({ package: { ecosystem: SecurityAdvisoryEcosystems; name?: string | null }; vulnerable_version_range?: string | null; patched_versions?: string | null; vulnerable_functions?: (string)[] | null })[];
  /** A list of Common Weakness Enumeration (CWE) IDs. */
  cwe_ids?: (string)[] | null;
  /** A list of users receiving credit for their participation in the security advisory. */
  credits?: ({ login: string; type: SecurityAdvisoryCreditTypes })[] | null;
  /** The severity of the advisory. You must choose between setting this field or `cvss_vector_string`. */
  severity?: "critical" | "high" | "medium" | "low" | null;
  /** The CVSS vector that calculates the severity of the advisory. You must choose between setting this field or `severity`. */
  cvss_vector_string?: string | null;
  /** Whether to create a temporary private fork of the repository to collaborate on a fix. */
  start_private_fork?: boolean;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<RepositoryAdvisory>
```

<sub>`POST /repos/{owner}/{repo}/security-advisories` · `security-advisories/create-repository-advisory`</sub>

## `github.securityAdvisories.getRepositoryAdvisory`

Get a repository security advisory — [API reference](https://docs.github.com/rest/security-advisories/repository-advisories#get-a-repository-security-advisory)

```ts
github.securityAdvisories.getRepositoryAdvisory(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The GHSA (GitHub Security Advisory) identifier of the advisory. */
  ghsa_id: string;
}): Promise<RepositoryAdvisory>
```

<sub>`GET /repos/{owner}/{repo}/security-advisories/{ghsa_id}` · `security-advisories/get-repository-advisory`</sub>

## `github.securityAdvisories.updateRepositoryAdvisory`

Update a repository security advisory — [API reference](https://docs.github.com/rest/security-advisories/repository-advisories#update-a-repository-security-advisory)

```ts
github.securityAdvisories.updateRepositoryAdvisory(input: {
  /** A short summary of the advisory. */
  summary?: string;
  /** A detailed description of what the advisory impacts. */
  description?: string;
  /** The Common Vulnerabilities and Exposures (CVE) ID. */
  cve_id?: string | null;
  /** A product affected by the vulnerability detailed in a repository security advisory. */
  vulnerabilities?: ({ package: { ecosystem: SecurityAdvisoryEcosystems; name?: string | null }; vulnerable_version_range?: string | null; patched_versions?: string | null; vulnerable_functions?: (string)[] | null })[];
  /** A list of Common Weakness Enumeration (CWE) IDs. */
  cwe_ids?: (string)[] | null;
  /** A list of users receiving credit for their participation in the security advisory. */
  credits?: ({ login: string; type: SecurityAdvisoryCreditTypes })[] | null;
  /** The severity of the advisory. You must choose between setting this field or `cvss_vector_string`. */
  severity?: "critical" | "high" | "medium" | "low" | null;
  /** The CVSS vector that calculates the severity of the advisory. You must choose between setting this field or `severity`. */
  cvss_vector_string?: string | null;
  /** The state of the advisory. */
  state?: "published" | "closed" | "draft";
  /** A list of usernames who have been granted write access to the advisory. */
  collaborating_users?: (string)[] | null;
  /** A list of team slugs which have been granted write access to the advisory. */
  collaborating_teams?: (string)[] | null;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The GHSA (GitHub Security Advisory) identifier of the advisory. */
  ghsa_id: string;
}): Promise<RepositoryAdvisory>
```

<sub>`PATCH /repos/{owner}/{repo}/security-advisories/{ghsa_id}` · `security-advisories/update-repository-advisory`</sub>

## `github.securityAdvisories.createRepositoryAdvisoryCveRequest`

Request a CVE for a repository security advisory — [API reference](https://docs.github.com/rest/security-advisories/repository-advisories#request-a-cve-for-a-repository-security-advisory)

```ts
github.securityAdvisories.createRepositoryAdvisoryCveRequest(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The GHSA (GitHub Security Advisory) identifier of the advisory. */
  ghsa_id: string;
}): Promise<{ [key: string]: unknown }>
```

<sub>`POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/cve` · `security-advisories/create-repository-advisory-cve-request`</sub>

## `github.securityAdvisories.createFork`

Create a temporary private fork — [API reference](https://docs.github.com/rest/security-advisories/repository-advisories#create-a-temporary-private-fork)

```ts
github.securityAdvisories.createFork(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The GHSA (GitHub Security Advisory) identifier of the advisory. */
  ghsa_id: string;
}): Promise<FullRepository>
```

<sub>`POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/forks` · `security-advisories/create-fork`</sub>

## `github.securityAdvisories.createPrivateVulnerabilityReport`

Privately report a security vulnerability — [API reference](https://docs.github.com/rest/security-advisories/repository-advisories#privately-report-a-security-vulnerability)

```ts
github.securityAdvisories.createPrivateVulnerabilityReport(input: {
  /** A short summary of the advisory. */
  summary: string;
  /** A detailed description of what the advisory impacts. */
  description: string;
  /** An array of products affected by the vulnerability detailed in a repository security advisory. */
  vulnerabilities?: ({ package: { ecosystem: SecurityAdvisoryEcosystems; name?: string | null }; vulnerable_version_range?: string | null; patched_versions?: string | null; vulnerable_functions?: (string)[] | null })[] | null;
  /** A list of Common Weakness Enumeration (CWE) IDs. */
  cwe_ids?: (string)[] | null;
  /** The severity of the advisory. You must choose between setting this field or `cvss_vector_string`. */
  severity?: "critical" | "high" | "medium" | "low" | null;
  /** The CVSS vector that calculates the severity of the advisory. You must choose between setting this field or `severity`. */
  cvss_vector_string?: string | null;
  /** Whether to create a temporary private fork of the repository to collaborate on a fix. */
  start_private_fork?: boolean;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<RepositoryAdvisory>
```

<sub>`POST /repos/{owner}/{repo}/security-advisories/reports` · `security-advisories/create-private-vulnerability-report`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
