import type { Activity, Autolink, BasicError, BranchProtection, BranchRestrictionPolicy, BranchShort, BranchWithProtection, CheckAutomatedSecurityFixes, CheckImmutableReleases, CloneTraffic, CodeFrequencyStat, CodeownersErrors, Collaborator, CombinedCommitStatus, Commit, CommitActivity, CommitComment, CommitComparison, CommunityProfile, ContentDirectory, ContentFile, ContentSubmodule, ContentSymlink, ContentTraffic, Contributor, ContributorActivity, CustomDeploymentRuleApp, CustomPropertyValue, DeployKey, Deployment, DeploymentBranchPolicy, DeploymentBranchPolicySettings, DeploymentProtectionRule, DeploymentReviewerType, DeploymentStatus, Environment, FileCommit, FullRepository, Hook, HookDelivery, HookDeliveryItem, Integration, IssueType, Language, MergedUpstream, MinimalRepository, OrgRules, OrgRulesetConditions, Page, PageBuild, PageBuildStatus, PageDeployment, PagesDeploymentStatus, PagesHealthCheck, ParticipationStats, PreventSelfReview, ProtectedBranch, ProtectedBranchAdminEnforced, ProtectedBranchPullRequestReview, PullRequestSimple, ReferrerTraffic, Release, ReleaseAsset, ReleaseNotesContent, Repository, RepositoryCollaboratorPermission, RepositoryHashAlgorithm, RepositoryInvitation, RepositoryRule, RepositoryRuleDetailed, RepositoryRuleEnforcement, RepositoryRuleset, RepositoryRulesetBypassActor, RepositoryRulesetConditions, RuleSuite, RuleSuites, RulesetVersion, RulesetVersionWithState, ShortBranch, SimpleUser, Status, StatusCheckPolicy, Tag, Team, Topic, ViewTraffic, WaitTimer, WebhookConfig, WebhookConfigContentType, WebhookConfigInsecureSsl, WebhookConfigSecret, WebhookConfigUrl } from "./schemas.js";

export type ReposOperations = {
  /**
   * List organization repositories
   * @see https://docs.github.com/rest/repos/repos#list-organization-repositories
   */
  listForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Specifies the types of repositories you want returned. */
    type?: "all" | "public" | "private" | "forks" | "sources" | "member";
    /** The property to sort the results by. */
    sort?: "created" | "updated" | "pushed" | "full_name";
    /** The order to sort by. Default: `asc` when using `full_name`, otherwise `desc`. */
    direction?: "asc" | "desc";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MinimalRepository)[]>;

  /**
   * Create an organization repository
   * @see https://docs.github.com/rest/repos/repos#create-an-organization-repository
   */
  createInOrg: (input: {
    /** The name of the repository. */
    name: string;
    /** A short description of the repository. */
    description?: string;
    /** A URL with more information about the repository. */
    homepage?: string;
    /** Whether the repository is private. */
    private?: boolean;
    /** The visibility of the repository. */
    visibility?: "public" | "private";
    /** Either `true` to enable issues for this repository or `false` to disable them. */
    has_issues?: boolean;
    /** Either `true` to enable projects for this repository or `false` to disable them. **Note:** If you're creating a repository in an organization that has disabled repository projects, the default is `false`, and if you pass `true`, the API returns an error. */
    has_projects?: boolean;
    /** Either `true` to enable the wiki for this repository or `false` to disable it. */
    has_wiki?: boolean;
    /** Whether downloads are enabled. */
    has_downloads?: boolean;
    /** Either `true` to make this repo available as a template repository or `false` to prevent it. */
    is_template?: boolean;
    /** The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization. */
    team_id?: number;
    /** Pass `true` to create an initial commit with empty README. */
    auto_init?: boolean;
    /** Desired language or platform [.gitignore template](https://github.com/github/gitignore) to apply. Use the name of the template without the extension. For example, "Haskell". */
    gitignore_template?: string;
    /** Choose an [open source license template](https://choosealicense.com/) that best suits your needs, and then use the [license keyword](https://docs.github.com/articles/licensing-a-repository/#searching-github-by-license-type) as the `license_template` string. For example, "mit" or "mpl-2.0". */
    license_template?: string;
    /** Either `true` to allow squash-merging pull requests, or `false` to prevent squash-merging. */
    allow_squash_merge?: boolean;
    /** Either `true` to allow merging pull requests with a merge commit, or `false` to prevent merging pull requests with merge commits. */
    allow_merge_commit?: boolean;
    /** Either `true` to allow rebase-merging pull requests, or `false` to prevent rebase-merging. */
    allow_rebase_merge?: boolean;
    /** Either `true` to allow auto-merge on pull requests, or `false` to disallow auto-merge. */
    allow_auto_merge?: boolean;
    /** Either `true` to allow automatically deleting head branches when pull requests are merged, or `false` to prevent automatic deletion. **The authenticated user must be an organization owner to set this property to `true`.** */
    delete_branch_on_merge?: boolean;
    /** Either `true` to allow squash-merge commits to use pull request title, or `false` to use commit message. **This property is closing down. Please use `squash_merge_commit_title` instead. */
    use_squash_pr_title_as_default?: boolean;
    /** Required when using `squash_merge_commit_message`.  The default value for a squash merge commit title:  - `PR_TITLE` - default to the pull request's title. - `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit). */
    squash_merge_commit_title?: "PR_TITLE" | "COMMIT_OR_PR_TITLE";
    /** The default value for a squash merge commit message:  - `PR_BODY` - default to the pull request's body. - `COMMIT_MESSAGES` - default to the branch's commit messages. - `BLANK` - default to a blank commit message. */
    squash_merge_commit_message?: "PR_BODY" | "COMMIT_MESSAGES" | "BLANK";
    /** Required when using `merge_commit_message`.  The default value for a merge commit title.  - `PR_TITLE` - default to the pull request's title. - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name). */
    merge_commit_title?: "PR_TITLE" | "MERGE_MESSAGE";
    /** The default value for a merge commit message.  - `PR_TITLE` - default to the pull request's title. - `PR_BODY` - default to the pull request's body. - `BLANK` - default to a blank commit message. */
    merge_commit_message?: "PR_BODY" | "PR_TITLE" | "BLANK";
    /** The custom properties for the new repository. The keys are the custom property names, and the values are the corresponding custom property values. */
    custom_properties?: { [key: string]: unknown };
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<FullRepository>;

  /**
   * Get all organization repository rulesets
   * @see https://docs.github.com/rest/orgs/rules#get-all-organization-repository-rulesets
   */
  getOrgRulesets: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** A comma-separated list of rule targets to filter by. If provided, only rulesets that apply to the specified targets will be returned. For example, `branch,tag,push`.  */
    targets?: string;
  }) => Promise<(RepositoryRuleset)[]>;

  /**
   * Create an organization repository ruleset
   * @see https://docs.github.com/rest/orgs/rules#create-an-organization-repository-ruleset
   */
  createOrgRuleset: (input: {
    /** The name of the ruleset. */
    name: string;
    /** The target of the ruleset */
    target?: "branch" | "tag" | "push" | "repository";
    enforcement: RepositoryRuleEnforcement;
    /** The actors that can bypass the rules in this ruleset */
    bypass_actors?: (RepositoryRulesetBypassActor)[];
    conditions?: OrgRulesetConditions;
    /** An array of rules within the ruleset. */
    rules?: (OrgRules)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<RepositoryRuleset>;

  /**
   * List organization rule suites
   * @see https://docs.github.com/rest/orgs/rule-suites#list-organization-rule-suites
   */
  getOrgRuleSuites: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the ref. Cannot contain wildcard characters. Optionally prefix with `refs/heads/` to limit to branches or `refs/tags/` to limit to tags. Omit the prefix to search across all refs. When specified, only rule evaluations triggered for this ref will be returned. */
    ref?: string;
    /** The name of the repository to filter on. */
    repository_name?: string;
    /** The time period to filter by.  For example, `day` will filter for rule suites that occurred in the past 24 hours, and `week` will filter for rule suites that occurred in the past 7 days (168 hours). */
    time_period?: "hour" | "day" | "week" | "month";
    /** The handle for the GitHub user account to filter on. When specified, only rule evaluations triggered by this actor will be returned. */
    actor_name?: string;
    /** The rule suite results to filter on. When specified, only suites with this result will be returned. */
    rule_suite_result?: "pass" | "fail" | "bypass" | "all";
    /** The evaluate status to filter on. When specified, only rule suites resulting from rulesets with the specified evaluate status will be returned.   - `all` - all rule suites will be returned.   - `active` - only rule suites resulting from rulesets in active (non-evaluate) mode will be returned.   - `evaluate` - only rule suites resulting from rulesets in evaluate mode will be returned. */
    evaluate_status?: "all" | "active" | "evaluate";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<RuleSuites>;

  /**
   * Get an organization rule suite
   * @see https://docs.github.com/rest/orgs/rule-suites#get-an-organization-rule-suite
   */
  getOrgRuleSuite: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the rule suite result. To get this ID, you can use [GET /repos/{owner}/{repo}/rulesets/rule-suites](https://docs.github.com/rest/repos/rule-suites#list-repository-rule-suites) for repositories and [GET /orgs/{org}/rulesets/rule-suites](https://docs.github.com/rest/orgs/rule-suites#list-organization-rule-suites) for organizations. */
    rule_suite_id: number;
  }) => Promise<RuleSuite>;

  /**
   * Get an organization repository ruleset
   * @see https://docs.github.com/rest/orgs/rules#get-an-organization-repository-ruleset
   */
  getOrgRuleset: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The ID of the ruleset. */
    ruleset_id: number;
  }) => Promise<RepositoryRuleset>;

  /**
   * Update an organization repository ruleset
   * @see https://docs.github.com/rest/orgs/rules#update-an-organization-repository-ruleset
   */
  updateOrgRuleset: (input: {
    /** The name of the ruleset. */
    name?: string;
    /** The target of the ruleset */
    target?: "branch" | "tag" | "push" | "repository";
    enforcement?: RepositoryRuleEnforcement;
    /** The actors that can bypass the rules in this ruleset */
    bypass_actors?: (RepositoryRulesetBypassActor)[];
    conditions?: OrgRulesetConditions;
    /** An array of rules within the ruleset. */
    rules?: (OrgRules)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The ID of the ruleset. */
    ruleset_id: number;
  }) => Promise<RepositoryRuleset>;

  /**
   * Delete an organization repository ruleset
   * @see https://docs.github.com/rest/orgs/rules#delete-an-organization-repository-ruleset
   */
  deleteOrgRuleset: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The ID of the ruleset. */
    ruleset_id: number;
  }) => Promise<BasicError>;

  /**
   * Get a repository
   * @see https://docs.github.com/rest/repos/repos#get-a-repository
   */
  get: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<FullRepository>;

  /**
   * Update a repository
   * @see https://docs.github.com/rest/repos/repos#update-a-repository
   */
  update: (input: {
    /** The name of the repository. */
    name?: string;
    /** A short description of the repository. */
    description?: string;
    /** A URL with more information about the repository. */
    homepage?: string;
    /** Either `true` to make the repository private or `false` to make it public. Default: `false`.   **Note**: You will get a `422` error if the organization restricts [changing repository visibility](https://docs.github.com/articles/repository-permission-levels-for-an-organization#changing-the-visibility-of-repositories) to organization owners and a non-owner tries to change the value of private. */
    private?: boolean;
    /** The visibility of the repository. */
    visibility?: "public" | "private";
    /** Specify which security and analysis features to enable or disable for the repository.  To use this parameter, you must have admin permissions for the repository or be an owner or security manager for the organization that owns the repository. For more information, see "[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization)."  For example, to enable GitHub Advanced Security, use this data in the body of the `PATCH` request: `{ "security_and_analysis": {"advanced_security": { "status": "enabled" } } }`.  You can check which security and analysis features are currently enabled by using a `GET /repos/{owner}/{repo}` request. */
    security_and_analysis?: { advanced_security?: { status?: string }; code_security?: { status?: string }; secret_scanning?: { status?: string }; secret_scanning_push_protection?: { status?: string }; secret_scanning_ai_detection?: { status?: string }; secret_scanning_non_provider_patterns?: { status?: string }; secret_scanning_delegated_alert_dismissal?: { status?: string }; secret_scanning_delegated_bypass?: { status?: string }; secret_scanning_delegated_bypass_options?: { reviewers?: ({ reviewer_id: number; reviewer_type: "TEAM" | "ROLE"; mode?: "ALWAYS" | "EXEMPT" })[] } } | null;
    /** Either `true` to enable issues for this repository or `false` to disable them. */
    has_issues?: boolean;
    /** Either `true` to enable projects for this repository or `false` to disable them. **Note:** If you're creating a repository in an organization that has disabled repository projects, the default is `false`, and if you pass `true`, the API returns an error. */
    has_projects?: boolean;
    /** Either `true` to enable the wiki for this repository or `false` to disable it. */
    has_wiki?: boolean;
    /** Either `true` to allow pull requests for this repository or `false` to prevent pull requests. */
    has_pull_requests?: boolean;
    /** The policy that controls who can create pull requests for this repository: `all` or `collaborators_only`. */
    pull_request_creation_policy?: "all" | "collaborators_only";
    /** Either `true` to make this repo available as a template repository or `false` to prevent it. */
    is_template?: boolean;
    /** Updates the default branch for this repository. */
    default_branch?: string;
    /** Either `true` to allow squash-merging pull requests, or `false` to prevent squash-merging. */
    allow_squash_merge?: boolean;
    /** Either `true` to allow merging pull requests with a merge commit, or `false` to prevent merging pull requests with merge commits. */
    allow_merge_commit?: boolean;
    /** Either `true` to allow rebase-merging pull requests, or `false` to prevent rebase-merging. */
    allow_rebase_merge?: boolean;
    /** Either `true` to allow auto-merge on pull requests, or `false` to disallow auto-merge. */
    allow_auto_merge?: boolean;
    /** Either `true` to allow automatically deleting head branches when pull requests are merged, or `false` to prevent automatic deletion. */
    delete_branch_on_merge?: boolean;
    /** Either `true` to always allow a pull request head branch that is behind its base branch to be updated even if it is not required to be up to date before merging, or false otherwise. */
    allow_update_branch?: boolean;
    /** Either `true` to allow squash-merge commits to use pull request title, or `false` to use commit message. **This property is closing down. Please use `squash_merge_commit_title` instead. */
    use_squash_pr_title_as_default?: boolean;
    /** Required when using `squash_merge_commit_message`.  The default value for a squash merge commit title:  - `PR_TITLE` - default to the pull request's title. - `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit). */
    squash_merge_commit_title?: "PR_TITLE" | "COMMIT_OR_PR_TITLE";
    /** The default value for a squash merge commit message:  - `PR_BODY` - default to the pull request's body. - `COMMIT_MESSAGES` - default to the branch's commit messages. - `BLANK` - default to a blank commit message. */
    squash_merge_commit_message?: "PR_BODY" | "COMMIT_MESSAGES" | "BLANK";
    /** Required when using `merge_commit_message`.  The default value for a merge commit title.  - `PR_TITLE` - default to the pull request's title. - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name). */
    merge_commit_title?: "PR_TITLE" | "MERGE_MESSAGE";
    /** The default value for a merge commit message.  - `PR_TITLE` - default to the pull request's title. - `PR_BODY` - default to the pull request's body. - `BLANK` - default to a blank commit message. */
    merge_commit_message?: "PR_BODY" | "PR_TITLE" | "BLANK";
    /** Whether to archive this repository. `false` will unarchive a previously archived repository. */
    archived?: boolean;
    /** Either `true` to allow private forks, or `false` to prevent private forks. */
    allow_forking?: boolean;
    /** Either `true` to require contributors to sign off on web-based commits, or `false` to not require contributors to sign off on web-based commits. */
    web_commit_signoff_required?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<FullRepository>;

  /**
   * Delete a repository
   * @see https://docs.github.com/rest/repos/repos#delete-a-repository
   */
  delete: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * List repository activities
   * @see https://docs.github.com/rest/repos/repos#list-repository-activities
   */
  listActivities: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
    /** The Git reference for the activities you want to list.  The `ref` for a branch can be formatted either as `refs/heads/BRANCH_NAME` or `BRANCH_NAME`, where `BRANCH_NAME` is the name of your branch. */
    ref?: string;
    /** The GitHub username to use to filter by the actor who performed the activity. */
    actor?: string;
    /** The time period to filter by.  For example, `day` will filter for activity that occurred in the past 24 hours, and `week` will filter for activity that occurred in the past 7 days (168 hours). */
    time_period?: "day" | "week" | "month" | "quarter" | "year";
    /** The activity type to filter by.  For example, you can choose to filter by "force_push", to see all force pushes to the repository. */
    activity_type?: "push" | "force_push" | "branch_creation" | "branch_deletion" | "pr_merge" | "merge_queue_merge";
  }) => Promise<(Activity)[]>;

  /**
   * Create an attestation
   * @see https://docs.github.com/rest/repos/attestations#create-an-attestation
   */
  createAttestation: (input: {
    /** The attestation's Sigstore Bundle. Refer to the [Sigstore Bundle Specification](https://github.com/sigstore/protobuf-specs/blob/main/protos/sigstore_bundle.proto) for more information. */
    bundle: { mediaType?: string; verificationMaterial?: { [key: string]: unknown }; dsseEnvelope?: { [key: string]: unknown } };
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<{ id?: number }>;

  /**
   * List attestations
   * @see https://docs.github.com/rest/repos/attestations#list-attestations
   */
  listAttestations: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The parameter should be set to the attestation's subject's SHA256 digest, in the form `sha256:HEX_DIGEST`. */
    subject_digest: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
    /** Optional filter for fetching attestations with a given predicate type. This option accepts `provenance`, `sbom`, `release`, or freeform text for custom predicate types. */
    predicate_type?: string;
  }) => Promise<{ attestations?: ({ bundle?: { mediaType?: string; verificationMaterial?: { [key: string]: unknown }; dsseEnvelope?: { [key: string]: unknown } }; repository_id?: number; bundle_url?: string; initiator?: string })[] }>;

  /**
   * Get all autolinks of a repository
   * @see https://docs.github.com/rest/repos/autolinks#get-all-autolinks-of-a-repository
   */
  listAutolinks: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(Autolink)[]>;

  /**
   * Create an autolink reference for a repository
   * @see https://docs.github.com/rest/repos/autolinks#create-an-autolink-reference-for-a-repository
   */
  createAutolink: (input: {
    /** This prefix appended by certain characters will generate a link any time it is found in an issue, pull request, or commit. */
    key_prefix: string;
    /** The URL must contain `<num>` for the reference number. `<num>` matches different characters depending on the value of `is_alphanumeric`. */
    url_template: string;
    /** Whether this autolink reference matches alphanumeric characters. If true, the `<num>` parameter of the `url_template` matches alphanumeric characters `A-Z` (case insensitive), `0-9`, and `-`. If false, this autolink reference only matches numeric characters. */
    is_alphanumeric?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Autolink>;

  /**
   * Get an autolink reference of a repository
   * @see https://docs.github.com/rest/repos/autolinks#get-an-autolink-reference-of-a-repository
   */
  getAutolink: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the autolink. */
    autolink_id: number;
  }) => Promise<Autolink>;

  /**
   * Delete an autolink reference from a repository
   * @see https://docs.github.com/rest/repos/autolinks#delete-an-autolink-reference-from-a-repository
   */
  deleteAutolink: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the autolink. */
    autolink_id: number;
  }) => Promise<BasicError>;

  /**
   * Check if Dependabot security updates are enabled for a repository
   * @see https://docs.github.com/rest/repos/repos#check-if-dependabot-security-updates-are-enabled-for-a-repository
   */
  checkAutomatedSecurityFixes: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<CheckAutomatedSecurityFixes>;

  /**
   * Enable Dependabot security updates
   * @see https://docs.github.com/rest/repos/repos#enable-dependabot-security-updates
   */
  enableAutomatedSecurityFixes: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * Disable Dependabot security updates
   * @see https://docs.github.com/rest/repos/repos#disable-dependabot-security-updates
   */
  disableAutomatedSecurityFixes: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * List branches
   * @see https://docs.github.com/rest/branches/branches#list-branches
   */
  listBranches: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Setting to `true` returns only branches protected by branch protections or rulesets. When set to `false`, only unprotected branches are returned. Omitting this parameter returns all branches. */
    protected?: boolean;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(ShortBranch)[]>;

  /**
   * Get a branch
   * @see https://docs.github.com/rest/branches/branches#get-a-branch
   */
  getBranch: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<BranchWithProtection>;

  /**
   * Get branch protection
   * @see https://docs.github.com/rest/branches/branch-protection#get-branch-protection
   */
  getBranchProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<BranchProtection>;

  /**
   * Update branch protection
   * @see https://docs.github.com/rest/branches/branch-protection#update-branch-protection
   */
  updateBranchProtection: (input: {
    /** Require status checks to pass before merging. Set to `null` to disable. */
    required_status_checks: { strict: boolean; contexts: (string)[]; checks?: ({ context: string; app_id?: number })[] } | null;
    /** Enforce all configured restrictions for administrators. Set to `true` to enforce required status checks for repository administrators. Set to `null` to disable. */
    enforce_admins: boolean | null;
    /** Require at least one approving review on a pull request, before merging. Set to `null` to disable. */
    required_pull_request_reviews: { dismissal_restrictions?: { users?: (string)[]; teams?: (string)[]; apps?: (string)[] }; dismiss_stale_reviews?: boolean; require_code_owner_reviews?: boolean; required_approving_review_count?: number; require_last_push_approval?: boolean; bypass_pull_request_allowances?: { users?: (string)[]; teams?: (string)[]; apps?: (string)[] } } | null;
    /** Restrict who can push to the protected branch. User, app, and team `restrictions` are only available for organization-owned repositories. Set to `null` to disable. */
    restrictions: { users: (string)[]; teams: (string)[]; apps?: (string)[] } | null;
    /** Enforces a linear commit Git history, which prevents anyone from pushing merge commits to a branch. Set to `true` to enforce a linear commit history. Set to `false` to disable a linear commit Git history. Your repository must allow squash merging or rebase merging before you can enable a linear commit history. Default: `false`. For more information, see "[Requiring a linear commit history](https://docs.github.com/github/administering-a-repository/requiring-a-linear-commit-history)" in the GitHub Help documentation. */
    required_linear_history?: boolean;
    /** Permits force pushes to the protected branch by anyone with write access to the repository. Set to `true` to allow force pushes. Set to `false` or `null` to block force pushes. Default: `false`. For more information, see "[Enabling force pushes to a protected branch](https://docs.github.com/github/administering-a-repository/enabling-force-pushes-to-a-protected-branch)" in the GitHub Help documentation." */
    allow_force_pushes?: boolean | null;
    /** Allows deletion of the protected branch by anyone with write access to the repository. Set to `false` to prevent deletion of the protected branch. Default: `false`. For more information, see "[Enabling force pushes to a protected branch](https://docs.github.com/github/administering-a-repository/enabling-force-pushes-to-a-protected-branch)" in the GitHub Help documentation. */
    allow_deletions?: boolean;
    /** If set to `true`, the `restrictions` branch protection settings which limits who can push will also block pushes which create new branches, unless the push is initiated by a user, team, or app which has the ability to push. Set to `true` to restrict new branch creation. Default: `false`. */
    block_creations?: boolean;
    /** Requires all conversations on code to be resolved before a pull request can be merged into a branch that matches this rule. Set to `false` to disable. Default: `false`. */
    required_conversation_resolution?: boolean;
    /** Whether to set the branch as read-only. If this is true, users will not be able to push to the branch. Default: `false`. */
    lock_branch?: boolean;
    /** Whether users can pull changes from upstream when the branch is locked. Set to `true` to allow fork syncing. Set to `false` to prevent fork syncing. Default: `false`. */
    allow_fork_syncing?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<ProtectedBranch>;

  /**
   * Delete branch protection
   * @see https://docs.github.com/rest/branches/branch-protection#delete-branch-protection
   */
  deleteBranchProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<BasicError>;

  /**
   * Get admin branch protection
   * @see https://docs.github.com/rest/branches/branch-protection#get-admin-branch-protection
   */
  getAdminBranchProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<ProtectedBranchAdminEnforced>;

  /**
   * Set admin branch protection
   * @see https://docs.github.com/rest/branches/branch-protection#set-admin-branch-protection
   */
  setAdminBranchProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<ProtectedBranchAdminEnforced>;

  /**
   * Delete admin branch protection
   * @see https://docs.github.com/rest/branches/branch-protection#delete-admin-branch-protection
   */
  deleteAdminBranchProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<BasicError>;

  /**
   * Get pull request review protection
   * @see https://docs.github.com/rest/branches/branch-protection#get-pull-request-review-protection
   */
  getPullRequestReviewProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<ProtectedBranchPullRequestReview>;

  /**
   * Update pull request review protection
   * @see https://docs.github.com/rest/branches/branch-protection#update-pull-request-review-protection
   */
  updatePullRequestReviewProtection: (input: {
    /** Specify which users, teams, and apps can dismiss pull request reviews. Pass an empty `dismissal_restrictions` object to disable. User and team `dismissal_restrictions` are only available for organization-owned repositories. Omit this parameter for personal repositories. */
    dismissal_restrictions?: { users?: (string)[]; teams?: (string)[]; apps?: (string)[] };
    /** Set to `true` if you want to automatically dismiss approving reviews when someone pushes a new commit. */
    dismiss_stale_reviews?: boolean;
    /** Blocks merging pull requests until [code owners](https://docs.github.com/articles/about-code-owners/) have reviewed. */
    require_code_owner_reviews?: boolean;
    /** Specifies the number of reviewers required to approve pull requests. Use a number between 1 and 6 or 0 to not require reviewers. */
    required_approving_review_count?: number;
    /** Whether the most recent push must be approved by someone other than the person who pushed it. Default: `false` */
    require_last_push_approval?: boolean;
    /** Allow specific users, teams, or apps to bypass pull request requirements. */
    bypass_pull_request_allowances?: { users?: (string)[]; teams?: (string)[]; apps?: (string)[] };
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<ProtectedBranchPullRequestReview>;

  /**
   * Delete pull request review protection
   * @see https://docs.github.com/rest/branches/branch-protection#delete-pull-request-review-protection
   */
  deletePullRequestReviewProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<BasicError>;

  /**
   * Get commit signature protection
   * @see https://docs.github.com/rest/branches/branch-protection#get-commit-signature-protection
   */
  getCommitSignatureProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<ProtectedBranchAdminEnforced>;

  /**
   * Create commit signature protection
   * @see https://docs.github.com/rest/branches/branch-protection#create-commit-signature-protection
   */
  createCommitSignatureProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<ProtectedBranchAdminEnforced>;

  /**
   * Delete commit signature protection
   * @see https://docs.github.com/rest/branches/branch-protection#delete-commit-signature-protection
   */
  deleteCommitSignatureProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<BasicError>;

  /**
   * Get status checks protection
   * @see https://docs.github.com/rest/branches/branch-protection#get-status-checks-protection
   */
  getStatusChecksProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<StatusCheckPolicy>;

  /**
   * Update status check protection
   * @see https://docs.github.com/rest/branches/branch-protection#update-status-check-protection
   */
  updateStatusCheckProtection: (input: {
    /** Require branches to be up to date before merging. */
    strict?: boolean;
    /** **Closing down notice**: The list of status checks to require in order to merge into this branch. If any of these checks have recently been set by a particular GitHub App, they will be required to come from that app in future for the branch to merge. Use `checks` instead of `contexts` for more fine-grained control. */
    contexts?: (string)[];
    /** The list of status checks to require in order to merge into this branch. */
    checks?: ({ context: string; app_id?: number })[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<StatusCheckPolicy>;

  /**
   * Remove status check protection
   * @see https://docs.github.com/rest/branches/branch-protection#remove-status-check-protection
   */
  removeStatusCheckProtection: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<unknown>;

  /**
   * Get all status check contexts
   * @see https://docs.github.com/rest/branches/branch-protection#get-all-status-check-contexts
   */
  getAllStatusCheckContexts: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(string)[]>;

  /**
   * Add status check contexts
   * @see https://docs.github.com/rest/branches/branch-protection#add-status-check-contexts
   */
  addStatusCheckContexts: (input: {
    body?: { contexts: (string)[] } | (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(string)[]>;

  /**
   * Set status check contexts
   * @see https://docs.github.com/rest/branches/branch-protection#set-status-check-contexts
   */
  setStatusCheckContexts: (input: {
    body?: { contexts: (string)[] } | (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(string)[]>;

  /**
   * Remove status check contexts
   * @see https://docs.github.com/rest/branches/branch-protection#remove-status-check-contexts
   */
  removeStatusCheckContexts: (input: {
    body?: { contexts: (string)[] } | (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(string)[]>;

  /**
   * Get access restrictions
   * @see https://docs.github.com/rest/branches/branch-protection#get-access-restrictions
   */
  getAccessRestrictions: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<BranchRestrictionPolicy>;

  /**
   * Delete access restrictions
   * @see https://docs.github.com/rest/branches/branch-protection#delete-access-restrictions
   */
  deleteAccessRestrictions: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<unknown>;

  /**
   * Get apps with access to the protected branch
   * @see https://docs.github.com/rest/branches/branch-protection#get-apps-with-access-to-the-protected-branch
   */
  getAppsWithAccessToProtectedBranch: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(Integration)[]>;

  /**
   * Add app access restrictions
   * @see https://docs.github.com/rest/branches/branch-protection#add-app-access-restrictions
   */
  addAppAccessRestrictions: (input: {
    /** The GitHub Apps that have push access to this branch. Use the slugified version of the app name. **Note**: The list of users, apps, and teams in total is limited to 100 items. */
    apps: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(Integration)[]>;

  /**
   * Set app access restrictions
   * @see https://docs.github.com/rest/branches/branch-protection#set-app-access-restrictions
   */
  setAppAccessRestrictions: (input: {
    /** The GitHub Apps that have push access to this branch. Use the slugified version of the app name. **Note**: The list of users, apps, and teams in total is limited to 100 items. */
    apps: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(Integration)[]>;

  /**
   * Remove app access restrictions
   * @see https://docs.github.com/rest/branches/branch-protection#remove-app-access-restrictions
   */
  removeAppAccessRestrictions: (input: {
    /** The GitHub Apps that have push access to this branch. Use the slugified version of the app name. **Note**: The list of users, apps, and teams in total is limited to 100 items. */
    apps: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(Integration)[]>;

  /**
   * Get teams with access to the protected branch
   * @see https://docs.github.com/rest/branches/branch-protection#get-teams-with-access-to-the-protected-branch
   */
  getTeamsWithAccessToProtectedBranch: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(Team)[]>;

  /**
   * Add team access restrictions
   * @see https://docs.github.com/rest/branches/branch-protection#add-team-access-restrictions
   */
  addTeamAccessRestrictions: (input: {
    body?: { teams: (string)[] } | (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(Team)[]>;

  /**
   * Set team access restrictions
   * @see https://docs.github.com/rest/branches/branch-protection#set-team-access-restrictions
   */
  setTeamAccessRestrictions: (input: {
    body?: { teams: (string)[] } | (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(Team)[]>;

  /**
   * Remove team access restrictions
   * @see https://docs.github.com/rest/branches/branch-protection#remove-team-access-restrictions
   */
  removeTeamAccessRestrictions: (input: {
    body?: { teams: (string)[] } | (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(Team)[]>;

  /**
   * Get users with access to the protected branch
   * @see https://docs.github.com/rest/branches/branch-protection#get-users-with-access-to-the-protected-branch
   */
  getUsersWithAccessToProtectedBranch: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Add user access restrictions
   * @see https://docs.github.com/rest/branches/branch-protection#add-user-access-restrictions
   */
  addUserAccessRestrictions: (input: {
    /** The username for users */
    users: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Set user access restrictions
   * @see https://docs.github.com/rest/branches/branch-protection#set-user-access-restrictions
   */
  setUserAccessRestrictions: (input: {
    /** The username for users */
    users: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Remove user access restrictions
   * @see https://docs.github.com/rest/branches/branch-protection#remove-user-access-restrictions
   */
  removeUserAccessRestrictions: (input: {
    /** The username for users */
    users: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Rename a branch
   * @see https://docs.github.com/rest/branches/branches#rename-a-branch
   */
  renameBranch: (input: {
    /** The new name of the branch. */
    new_name: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
  }) => Promise<BranchWithProtection>;

  /**
   * List CODEOWNERS errors
   * @see https://docs.github.com/rest/repos/repos#list-codeowners-errors
   */
  codeownersErrors: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** A branch, tag or commit name used to determine which version of the CODEOWNERS file to use. Default: the repository's default branch (e.g. `main`) */
    ref?: string;
  }) => Promise<CodeownersErrors>;

  /**
   * List repository collaborators
   * @see https://docs.github.com/rest/collaborators/collaborators#list-repository-collaborators
   */
  listCollaborators: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Filter collaborators returned by their affiliation. `outside` means all outside collaborators of an organization-owned repository. `direct` means all collaborators with permissions to an organization-owned repository, regardless of organization membership status. `all` means all collaborators the authenticated user can see. */
    affiliation?: "outside" | "direct" | "all";
    /** Filter collaborators by the permissions they have on the repository. If not specified, all collaborators will be returned. */
    permission?: "pull" | "triage" | "push" | "maintain" | "admin";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Collaborator)[]>;

  /**
   * Check if a user is a repository collaborator
   * @see https://docs.github.com/rest/collaborators/collaborators#check-if-a-user-is-a-repository-collaborator
   */
  checkCollaborator: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<unknown>;

  /**
   * Add a repository collaborator
   * @see https://docs.github.com/rest/collaborators/collaborators#add-a-repository-collaborator
   */
  addCollaborator: (input: {
    /** The permission to grant the collaborator. **Only valid on organization-owned repositories.** We accept the following permissions to be set: `pull`, `triage`, `push`, `maintain`, `admin` and you can also specify a custom repository role name, if the owning organization has defined any. */
    permission?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<RepositoryInvitation>;

  /**
   * Remove a repository collaborator
   * @see https://docs.github.com/rest/collaborators/collaborators#remove-a-repository-collaborator
   */
  removeCollaborator: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Get repository permissions for a user
   * @see https://docs.github.com/rest/collaborators/collaborators#get-repository-permissions-for-a-user
   */
  getCollaboratorPermissionLevel: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<RepositoryCollaboratorPermission>;

  /**
   * List commit comments for a repository
   * @see https://docs.github.com/rest/commits/comments#list-commit-comments-for-a-repository
   */
  listCommitCommentsForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(CommitComment)[]>;

  /**
   * Get a commit comment
   * @see https://docs.github.com/rest/commits/comments#get-a-commit-comment
   */
  getCommitComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<CommitComment>;

  /**
   * Update a commit comment
   * @see https://docs.github.com/rest/commits/comments#update-a-commit-comment
   */
  updateCommitComment: (input: {
    /** The contents of the comment */
    body: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<CommitComment>;

  /**
   * Delete a commit comment
   * @see https://docs.github.com/rest/commits/comments#delete-a-commit-comment
   */
  deleteCommitComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<BasicError>;

  /**
   * List commits
   * @see https://docs.github.com/rest/commits/commits#list-commits
   */
  listCommits: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** SHA or branch to start listing commits from. Default: the repository’s default branch (usually `main`). */
    sha?: string;
    /** Only commits containing this file path will be returned. */
    path?: string;
    /** GitHub username or email address to use to filter by commit author. */
    author?: string;
    /** GitHub username or email address to use to filter by commit committer. */
    committer?: string;
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. Due to limitations of Git, timestamps must be between 1970-01-01 and 2099-12-31 (inclusive) or unexpected results may be returned. */
    since?: string;
    /** Only commits before this date will be returned. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. Due to limitations of Git, timestamps must be between 1970-01-01 and 2099-12-31 (inclusive) or unexpected results may be returned. */
    until?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Commit)[]>;

  /**
   * List branches for HEAD commit
   * @see https://docs.github.com/rest/commits/commits#list-branches-for-head-commit
   */
  listBranchesForHeadCommit: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The SHA of the commit. */
    commit_sha: string;
  }) => Promise<(BranchShort)[]>;

  /**
   * List commit comments
   * @see https://docs.github.com/rest/commits/comments#list-commit-comments
   */
  listCommentsForCommit: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The SHA of the commit. */
    commit_sha: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(CommitComment)[]>;

  /**
   * Create a commit comment
   * @see https://docs.github.com/rest/commits/comments#create-a-commit-comment
   */
  createCommitComment: (input: {
    /** The contents of the comment. */
    body: string;
    /** Relative path of the file to comment on. */
    path?: string;
    /** Line index in the diff to comment on. */
    position?: number;
    /** **Closing down notice**. Use **position** parameter instead. Line number in the file to comment on. */
    line?: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The SHA of the commit. */
    commit_sha: string;
  }) => Promise<CommitComment>;

  /**
   * List pull requests associated with a commit
   * @see https://docs.github.com/rest/commits/commits#list-pull-requests-associated-with-a-commit
   */
  listPullRequestsAssociatedWithCommit: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The SHA of the commit. */
    commit_sha: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(PullRequestSimple)[]>;

  /**
   * Get a commit
   * @see https://docs.github.com/rest/commits/commits#get-a-commit
   */
  getCommit: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The commit reference. Can be a commit SHA, branch name (`heads/BRANCH_NAME`), or tag name (`tags/TAG_NAME`). For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
    ref: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<Commit>;

  /**
   * Get the combined status for a specific reference
   * @see https://docs.github.com/rest/commits/statuses#get-the-combined-status-for-a-specific-reference
   */
  getCombinedStatusForRef: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The commit reference. Can be a commit SHA, branch name (`heads/BRANCH_NAME`), or tag name (`tags/TAG_NAME`). For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
    ref: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<CombinedCommitStatus>;

  /**
   * List commit statuses for a reference
   * @see https://docs.github.com/rest/commits/statuses#list-commit-statuses-for-a-reference
   */
  listCommitStatusesForRef: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The commit reference. Can be a commit SHA, branch name (`heads/BRANCH_NAME`), or tag name (`tags/TAG_NAME`). For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
    ref: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Status)[]>;

  /**
   * Get community profile metrics
   * @see https://docs.github.com/rest/metrics/community#get-community-profile-metrics
   */
  getCommunityProfileMetrics: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<CommunityProfile>;

  /**
   * Compare two commits
   * @see https://docs.github.com/rest/commits/commits#compare-two-commits
   */
  compareCommits: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The base branch and head branch to compare. This parameter expects the format `BASE...HEAD`. Both must be branch names in `repo`. To compare with a branch that exists in a different repository in the same network as `repo`, the `basehead` parameter expects the format `USERNAME:BASE...USERNAME:HEAD`. */
    basehead: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<CommitComparison>;

  /**
   * Get repository content
   * @see https://docs.github.com/rest/repos/contents#get-repository-content
   */
  getContent: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** path parameter */
    path: string;
    /** The name of the commit/branch/tag. Default: the repository’s default branch. */
    ref?: string;
  }) => Promise<ContentDirectory | ContentFile | ContentSymlink | ContentSubmodule>;

  /**
   * Create or update file contents
   * @see https://docs.github.com/rest/repos/contents#create-or-update-file-contents
   */
  createOrUpdateFileContents: (input: {
    /** The commit message. */
    message: string;
    /** The new file content, using Base64 encoding. */
    content: string;
    /** **Required if you are updating a file**. The blob SHA of the file being replaced. */
    sha?: string;
    /** The branch name. Default: the repository’s default branch. */
    branch?: string;
    /** The person that committed the file. Default: the authenticated user. */
    committer?: { name: string; email: string; date?: string };
    /** The author of the file. Default: The `committer` or the authenticated user if you omit `committer`. */
    author?: { name: string; email: string; date?: string };
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** path parameter */
    path: string;
  }) => Promise<FileCommit>;

  /**
   * Delete a file
   * @see https://docs.github.com/rest/repos/contents#delete-a-file
   */
  deleteFile: (input: {
    /** The commit message. */
    message: string;
    /** The blob SHA of the file being deleted. */
    sha: string;
    /** The branch name. Default: the repository’s default branch */
    branch?: string;
    /** object containing information about the committer. */
    committer?: { name?: string; email?: string };
    /** object containing information about the author. */
    author?: { name?: string; email?: string };
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** path parameter */
    path: string;
  }) => Promise<FileCommit>;

  /**
   * List repository contributors
   * @see https://docs.github.com/rest/repos/repos#list-repository-contributors
   */
  listContributors: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Set to `1` or `true` to include anonymous contributors in results. */
    anon?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Contributor)[]>;

  /**
   * List deployments
   * @see https://docs.github.com/rest/deployments/deployments#list-deployments
   */
  listDeployments: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The SHA recorded at creation time. */
    sha?: string;
    /** The name of the ref. This can be a branch, tag, or SHA. */
    ref?: string;
    /** The name of the task for the deployment (e.g., `deploy` or `deploy:migrations`). */
    task?: string;
    /** The name of the environment that was deployed to (e.g., `staging` or `production`). */
    environment?: string | null;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Deployment)[]>;

  /**
   * Create a deployment
   * @see https://docs.github.com/rest/deployments/deployments#create-a-deployment
   */
  createDeployment: (input: {
    /** The ref to deploy. This can be a branch, tag, or SHA. */
    ref: string;
    /** Specifies a task to execute (e.g., `deploy` or `deploy:migrations`). */
    task?: string;
    /** Attempts to automatically merge the default branch into the requested ref, if it's behind the default branch. */
    auto_merge?: boolean;
    /** The [status](https://docs.github.com/rest/commits/statuses) contexts to verify against commit status checks. If you omit this parameter, GitHub verifies all unique contexts before creating a deployment. To bypass checking entirely, pass an empty array. Defaults to all unique contexts. */
    required_contexts?: (string)[];
    payload?: { [key: string]: unknown } | string;
    /** Name for the target deployment environment (e.g., `production`, `staging`, `qa`). */
    environment?: string;
    /** Short description of the deployment. */
    description?: string | null;
    /** Specifies if the given environment is specific to the deployment and will no longer exist at some point in the future. Default: `false` */
    transient_environment?: boolean;
    /** Specifies if the given environment is one that end-users directly interact with. Default: `true` when `environment` is `production` and `false` otherwise. */
    production_environment?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Deployment>;

  /**
   * Get a deployment
   * @see https://docs.github.com/rest/deployments/deployments#get-a-deployment
   */
  getDeployment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** deployment_id parameter */
    deployment_id: number;
  }) => Promise<Deployment>;

  /**
   * Delete a deployment
   * @see https://docs.github.com/rest/deployments/deployments#delete-a-deployment
   */
  deleteDeployment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** deployment_id parameter */
    deployment_id: number;
  }) => Promise<BasicError>;

  /**
   * List deployment statuses
   * @see https://docs.github.com/rest/deployments/statuses#list-deployment-statuses
   */
  listDeploymentStatuses: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** deployment_id parameter */
    deployment_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(DeploymentStatus)[]>;

  /**
   * Create a deployment status
   * @see https://docs.github.com/rest/deployments/statuses#create-a-deployment-status
   */
  createDeploymentStatus: (input: {
    /** The state of the status. When you set a transient deployment to `inactive`, the deployment will be shown as `destroyed` in GitHub. */
    state: "error" | "failure" | "inactive" | "in_progress" | "queued" | "pending" | "success";
    /** The target URL to associate with this status. This URL should contain output to keep the user updated while the task is running or serve as historical information for what happened in the deployment.  > [!NOTE] > It's recommended to use the `log_url` parameter, which replaces `target_url`. */
    target_url?: string;
    /** The full URL of the deployment's output. This parameter replaces `target_url`. We will continue to accept `target_url` to support legacy uses, but we recommend replacing `target_url` with `log_url`. Setting `log_url` will automatically set `target_url` to the same value. Default: `""` */
    log_url?: string;
    /** A short description of the status. The maximum description length is 140 characters. */
    description?: string;
    /** Name for the target deployment environment, which can be changed when setting a deploy status. For example, `production`, `staging`, or `qa`. If not defined, the environment of the previous status on the deployment will be used, if it exists. Otherwise, the environment of the deployment will be used. */
    environment?: string;
    /** Sets the URL for accessing your environment. Default: `""` */
    environment_url?: string;
    /** Adds a new `inactive` status to all prior non-transient, non-production environment deployments with the same repository and `environment` name as the created status's deployment. An `inactive` status is only added to deployments that had a `success` state. Default: `true` */
    auto_inactive?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** deployment_id parameter */
    deployment_id: number;
  }) => Promise<DeploymentStatus>;

  /**
   * Get a deployment status
   * @see https://docs.github.com/rest/deployments/statuses#get-a-deployment-status
   */
  getDeploymentStatus: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** deployment_id parameter */
    deployment_id: number;
    status_id: number;
  }) => Promise<DeploymentStatus>;

  /**
   * Create a repository dispatch event
   * @see https://docs.github.com/rest/repos/repos#create-a-repository-dispatch-event
   */
  createDispatchEvent: (input: {
    /** A custom webhook event name. Must be 100 characters or fewer. */
    event_type: string;
    /** JSON payload with extra information about the webhook event that your action or workflow may use. The maximum number of top-level properties is 10. The total size of the JSON payload must be less than 64KB. */
    client_payload?: { [key: string]: unknown };
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * List environments
   * @see https://docs.github.com/rest/deployments/environments#list-environments
   */
  getAllEnvironments: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count?: number; environments?: (Environment)[] }>;

  /**
   * Get an environment
   * @see https://docs.github.com/rest/deployments/environments#get-an-environment
   */
  getEnvironment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
  }) => Promise<Environment>;

  /**
   * Create or update an environment
   * @see https://docs.github.com/rest/deployments/environments#create-or-update-an-environment
   */
  createOrUpdateEnvironment: (input: {
    wait_timer?: WaitTimer;
    prevent_self_review?: PreventSelfReview;
    /** The people or teams that may review jobs that reference the environment. You can list up to six users or teams as reviewers. The reviewers must have at least read access to the repository. Only one of the required reviewers needs to approve the job for it to proceed. */
    reviewers?: ({ type?: DeploymentReviewerType; id?: number })[] | null;
    deployment_branch_policy?: DeploymentBranchPolicySettings;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
  }) => Promise<Environment>;

  /**
   * Delete an environment
   * @see https://docs.github.com/rest/deployments/environments#delete-an-environment
   */
  deleteAnEnvironment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
  }) => Promise<unknown>;

  /**
   * List deployment branch policies
   * @see https://docs.github.com/rest/deployments/branch-policies#list-deployment-branch-policies
   */
  listDeploymentBranchPolicies: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; branch_policies: (DeploymentBranchPolicy)[] }>;

  /**
   * Create a deployment branch policy
   * @see https://docs.github.com/rest/deployments/branch-policies#create-a-deployment-branch-policy
   */
  createDeploymentBranchPolicy: (input: {
    /** The name pattern that branches or tags must match in order to deploy to the environment.  Wildcard characters will not match `/`. For example, to match branches that begin with `release/` and contain an additional single slash, use `release/*\/*`. For more information about pattern matching syntax, see the [Ruby File.fnmatch documentation](https://ruby-doc.org/core-2.5.1/File.html#method-c-fnmatch). */
    name: string;
    /** Whether this rule targets a branch or tag */
    type?: "branch" | "tag";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
  }) => Promise<DeploymentBranchPolicy>;

  /**
   * Get a deployment branch policy
   * @see https://docs.github.com/rest/deployments/branch-policies#get-a-deployment-branch-policy
   */
  getDeploymentBranchPolicy: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The unique identifier of the branch policy. */
    branch_policy_id: number;
  }) => Promise<DeploymentBranchPolicy>;

  /**
   * Update a deployment branch policy
   * @see https://docs.github.com/rest/deployments/branch-policies#update-a-deployment-branch-policy
   */
  updateDeploymentBranchPolicy: (input: {
    /** The name pattern that branches must match in order to deploy to the environment.  Wildcard characters will not match `/`. For example, to match branches that begin with `release/` and contain an additional single slash, use `release/*\/*`. For more information about pattern matching syntax, see the [Ruby File.fnmatch documentation](https://ruby-doc.org/core-2.5.1/File.html#method-c-fnmatch). */
    name: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The unique identifier of the branch policy. */
    branch_policy_id: number;
  }) => Promise<DeploymentBranchPolicy>;

  /**
   * Delete a deployment branch policy
   * @see https://docs.github.com/rest/deployments/branch-policies#delete-a-deployment-branch-policy
   */
  deleteDeploymentBranchPolicy: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The unique identifier of the branch policy. */
    branch_policy_id: number;
  }) => Promise<unknown>;

  /**
   * Get all deployment protection rules for an environment
   * @see https://docs.github.com/rest/deployments/protection-rules#get-all-deployment-protection-rules-for-an-environment
   */
  getAllDeploymentProtectionRules: (input: {
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
  }) => Promise<{ total_count?: number; custom_deployment_protection_rules?: (DeploymentProtectionRule)[] }>;

  /**
   * Create a custom deployment protection rule on an environment
   * @see https://docs.github.com/rest/deployments/protection-rules#create-a-custom-deployment-protection-rule-on-an-environment
   */
  createDeploymentProtectionRule: (input: {
    /** The ID of the custom app that will be enabled on the environment. */
    integration_id?: number;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
  }) => Promise<DeploymentProtectionRule>;

  /**
   * List custom deployment rule integrations available for an environment
   * @see https://docs.github.com/rest/deployments/protection-rules#list-custom-deployment-rule-integrations-available-for-an-environment
   */
  listCustomDeploymentRuleIntegrations: (input: {
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<{ total_count?: number; available_custom_deployment_protection_rule_integrations?: (CustomDeploymentRuleApp)[] }>;

  /**
   * Get a custom deployment protection rule
   * @see https://docs.github.com/rest/deployments/protection-rules#get-a-custom-deployment-protection-rule
   */
  getCustomDeploymentProtectionRule: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The unique identifier of the protection rule. */
    protection_rule_id: number;
  }) => Promise<DeploymentProtectionRule>;

  /**
   * Disable a custom protection rule for an environment
   * @see https://docs.github.com/rest/deployments/protection-rules#disable-a-custom-protection-rule-for-an-environment
   */
  disableDeploymentProtectionRule: (input: {
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The unique identifier of the protection rule. */
    protection_rule_id: number;
  }) => Promise<unknown>;

  /**
   * List forks
   * @see https://docs.github.com/rest/repos/forks#list-forks
   */
  listForks: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The sort order. `stargazers` will sort by star count. */
    sort?: "newest" | "oldest" | "stargazers" | "watchers";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MinimalRepository)[]>;

  /**
   * Create a fork
   * @see https://docs.github.com/rest/repos/forks#create-a-fork
   */
  createFork: (input: {
    /** Optional parameter to specify the organization name if forking into an organization. */
    organization?: string;
    /** When forking from an existing repository, a new name for the fork. */
    name?: string;
    /** When forking from an existing repository, fork with only the default branch. */
    default_branch_only?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<FullRepository>;

  /**
   * Get the hash algorithm for a repository
   * @see https://docs.github.com/rest/repos/repos#get-the-hash-algorithm-for-a-repository
   */
  getHashAlgorithm: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<RepositoryHashAlgorithm>;

  /**
   * List repository webhooks
   * @see https://docs.github.com/rest/repos/webhooks#list-repository-webhooks
   */
  listWebhooks: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Hook)[]>;

  /**
   * Create a repository webhook
   * @see https://docs.github.com/rest/repos/webhooks#create-a-repository-webhook
   */
  createWebhook: (input: {
    /** Use `web` to create a webhook. Default: `web`. This parameter only accepts the value `web`. */
    name?: string;
    /** Key/value pairs to provide settings for this webhook. */
    config?: { url?: WebhookConfigUrl; content_type?: WebhookConfigContentType; secret?: WebhookConfigSecret; insecure_ssl?: WebhookConfigInsecureSsl };
    /** Determines what [events](https://docs.github.com/webhooks/event-payloads) the hook is triggered for. */
    events?: (string)[];
    /** Determines if notifications are sent when the webhook is triggered. Set to `true` to send notifications. */
    active?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Hook>;

  /**
   * Get a repository webhook
   * @see https://docs.github.com/rest/repos/webhooks#get-a-repository-webhook
   */
  getWebhook: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<Hook>;

  /**
   * Update a repository webhook
   * @see https://docs.github.com/rest/repos/webhooks#update-a-repository-webhook
   */
  updateWebhook: (input: {
    config?: WebhookConfig;
    /** Determines what [events](https://docs.github.com/webhooks/event-payloads) the hook is triggered for. This replaces the entire array of events. */
    events?: (string)[];
    /** Determines a list of events to be added to the list of events that the Hook triggers for. */
    add_events?: (string)[];
    /** Determines a list of events to be removed from the list of events that the Hook triggers for. */
    remove_events?: (string)[];
    /** Determines if notifications are sent when the webhook is triggered. Set to `true` to send notifications. */
    active?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<Hook>;

  /**
   * Delete a repository webhook
   * @see https://docs.github.com/rest/repos/webhooks#delete-a-repository-webhook
   */
  deleteWebhook: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<BasicError>;

  /**
   * Get a webhook configuration for a repository
   * @see https://docs.github.com/rest/repos/webhooks#get-a-webhook-configuration-for-a-repository
   */
  getWebhookConfigForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<WebhookConfig>;

  /**
   * Update a webhook configuration for a repository
   * @see https://docs.github.com/rest/repos/webhooks#update-a-webhook-configuration-for-a-repository
   */
  updateWebhookConfigForRepo: (input: {
    url?: WebhookConfigUrl;
    content_type?: WebhookConfigContentType;
    secret?: WebhookConfigSecret;
    insecure_ssl?: WebhookConfigInsecureSsl;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<WebhookConfig>;

  /**
   * List deliveries for a repository webhook
   * @see https://docs.github.com/rest/repos/webhooks#list-deliveries-for-a-repository-webhook
   */
  listWebhookDeliveries: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** Used for pagination: the starting delivery from which the page of deliveries is fetched. Refer to the `link` header for the next and previous page cursors. */
    cursor?: string;
    /** Returns webhook deliveries filtered by delivery outcome classification based on `status_code` range. A `status` of `success` returns deliveries with a `status_code` in the 200-399 range (inclusive). A `status` of `failure` returns deliveries with a `status_code` in the 400-599 range (inclusive). */
    status?: "success" | "failure";
  }) => Promise<(HookDeliveryItem)[]>;

  /**
   * Get a delivery for a repository webhook
   * @see https://docs.github.com/rest/repos/webhooks#get-a-delivery-for-a-repository-webhook
   */
  getWebhookDelivery: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
    delivery_id: number;
  }) => Promise<HookDelivery>;

  /**
   * Redeliver a delivery for a repository webhook
   * @see https://docs.github.com/rest/repos/webhooks#redeliver-a-delivery-for-a-repository-webhook
   */
  redeliverWebhookDelivery: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
    delivery_id: number;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Ping a repository webhook
   * @see https://docs.github.com/rest/repos/webhooks#ping-a-repository-webhook
   */
  pingWebhook: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<BasicError>;

  /**
   * Test the push repository webhook
   * @see https://docs.github.com/rest/repos/webhooks#test-the-push-repository-webhook
   */
  testPushWebhook: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<BasicError>;

  /**
   * Check if immutable releases are enabled for a repository
   * @see https://docs.github.com/rest/repos/repos#check-if-immutable-releases-are-enabled-for-a-repository
   */
  checkImmutableReleases: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<CheckImmutableReleases>;

  /**
   * Enable immutable releases
   * @see https://docs.github.com/rest/repos/repos#enable-immutable-releases
   */
  enableImmutableReleases: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Disable immutable releases
   * @see https://docs.github.com/rest/repos/repos#disable-immutable-releases
   */
  disableImmutableReleases: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * List repository invitations
   * @see https://docs.github.com/rest/collaborators/invitations#list-repository-invitations
   */
  listInvitations: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(RepositoryInvitation)[]>;

  /**
   * Update a repository invitation
   * @see https://docs.github.com/rest/collaborators/invitations#update-a-repository-invitation
   */
  updateInvitation: (input: {
    /** The permissions that the associated user will have on the repository. Valid values are `read`, `write`, `maintain`, `triage`, and `admin`. */
    permissions?: "read" | "write" | "maintain" | "triage" | "admin";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the invitation. */
    invitation_id: number;
  }) => Promise<RepositoryInvitation>;

  /**
   * Delete a repository invitation
   * @see https://docs.github.com/rest/collaborators/invitations#delete-a-repository-invitation
   */
  deleteInvitation: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the invitation. */
    invitation_id: number;
  }) => Promise<unknown>;

  /**
   * List issue types for a repository
   * @see https://docs.github.com/rest/repos/issue-types#list-issue-types-for-a-repository
   */
  listIssueTypes: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(IssueType)[]>;

  /**
   * List deploy keys
   * @see https://docs.github.com/rest/deploy-keys/deploy-keys#list-deploy-keys
   */
  listDeployKeys: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(DeployKey)[]>;

  /**
   * Create a deploy key
   * @see https://docs.github.com/rest/deploy-keys/deploy-keys#create-a-deploy-key
   */
  createDeployKey: (input: {
    /** A name for the key. */
    title?: string;
    /** The contents of the key. */
    key: string;
    /** If `true`, the key will only be able to read repository contents. Otherwise, the key will be able to read and write.      Deploy keys with write access can perform the same actions as an organization member with admin access, or a collaborator on a personal repository. For more information, see "[Repository permission levels for an organization](https://docs.github.com/articles/repository-permission-levels-for-an-organization/)" and "[Permission levels for a user account repository](https://docs.github.com/articles/permission-levels-for-a-user-account-repository/)." */
    read_only?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<DeployKey>;

  /**
   * Get a deploy key
   * @see https://docs.github.com/rest/deploy-keys/deploy-keys#get-a-deploy-key
   */
  getDeployKey: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the key. */
    key_id: number;
  }) => Promise<DeployKey>;

  /**
   * Delete a deploy key
   * @see https://docs.github.com/rest/deploy-keys/deploy-keys#delete-a-deploy-key
   */
  deleteDeployKey: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the key. */
    key_id: number;
  }) => Promise<unknown>;

  /**
   * List repository languages
   * @see https://docs.github.com/rest/repos/repos#list-repository-languages
   */
  listLanguages: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Language>;

  /**
   * Sync a fork branch with the upstream repository
   * @see https://docs.github.com/rest/branches/branches#sync-a-fork-branch-with-the-upstream-repository
   */
  mergeUpstream: (input: {
    /** The name of the branch which should be updated to match upstream. */
    branch: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<MergedUpstream>;

  /**
   * Merge a branch
   * @see https://docs.github.com/rest/branches/branches#merge-a-branch
   */
  merge: (input: {
    /** The name of the base branch that the head will be merged into. */
    base: string;
    /** The head to merge. This can be a branch name or a commit SHA1. */
    head: string;
    /** Commit message to use for the merge commit. If omitted, a default message will be used. */
    commit_message?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Commit>;

  /**
   * Get a GitHub Pages site
   * @see https://docs.github.com/rest/pages/pages#get-a-apiname-pages-site
   */
  getPages: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Page>;

  /**
   * Create a GitHub Pages site
   * @see https://docs.github.com/rest/pages/pages#create-a-apiname-pages-site
   */
  createPagesSite: (input: {
    /** The source branch and directory used to publish your Pages site. */
    body: unknown | unknown | null;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Page>;

  /**
   * Update information about a GitHub Pages site
   * @see https://docs.github.com/rest/pages/pages#update-information-about-a-apiname-pages-site
   */
  updateInformationAboutPagesSite: (input: {
    body: unknown | unknown | unknown | unknown | unknown;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Delete a GitHub Pages site
   * @see https://docs.github.com/rest/pages/pages#delete-a-apiname-pages-site
   */
  deletePagesSite: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * List GitHub Pages builds
   * @see https://docs.github.com/rest/pages/pages#list-apiname-pages-builds
   */
  listPagesBuilds: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(PageBuild)[]>;

  /**
   * Request a GitHub Pages build
   * @see https://docs.github.com/rest/pages/pages#request-a-apiname-pages-build
   */
  requestPagesBuild: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<PageBuildStatus>;

  /**
   * Get latest Pages build
   * @see https://docs.github.com/rest/pages/pages#get-latest-pages-build
   */
  getLatestPagesBuild: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<PageBuild>;

  /**
   * Get GitHub Pages build
   * @see https://docs.github.com/rest/pages/pages#get-apiname-pages-build
   */
  getPagesBuild: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    build_id: number;
  }) => Promise<PageBuild>;

  /**
   * Create a GitHub Pages deployment
   * @see https://docs.github.com/rest/pages/pages#create-a-github-pages-deployment
   */
  createPagesDeployment: (input: {
    /** The ID of an artifact that contains the .zip or .tar of static assets to deploy. The artifact belongs to the repository. Either `artifact_id` or `artifact_url` are required. */
    artifact_id?: number;
    /** The URL of an artifact that contains the .zip or .tar of static assets to deploy. The artifact belongs to the repository. Either `artifact_id` or `artifact_url` are required. */
    artifact_url?: string;
    /** The target environment for this GitHub Pages deployment. */
    environment?: string;
    /** A unique string that represents the version of the build for this deployment. */
    pages_build_version: string;
    /** The OIDC token issued by GitHub Actions certifying the origin of the deployment. */
    oidc_token: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<PageDeployment>;

  /**
   * Get the status of a GitHub Pages deployment
   * @see https://docs.github.com/rest/pages/pages#get-the-status-of-a-github-pages-deployment
   */
  getPagesDeployment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the Pages deployment. You can also give the commit SHA of the deployment. */
    pages_deployment_id: number | string;
  }) => Promise<PagesDeploymentStatus>;

  /**
   * Cancel a GitHub Pages deployment
   * @see https://docs.github.com/rest/pages/pages#cancel-a-github-pages-deployment
   */
  cancelPagesDeployment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the Pages deployment. You can also give the commit SHA of the deployment. */
    pages_deployment_id: number | string;
  }) => Promise<BasicError>;

  /**
   * Get a DNS health check for GitHub Pages
   * @see https://docs.github.com/rest/pages/pages#get-a-dns-health-check-for-github-pages
   */
  getPagesHealthCheck: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<PagesHealthCheck>;

  /**
   * Check if private vulnerability reporting is enabled for a repository
   * @see https://docs.github.com/rest/repos/repos#check-if-private-vulnerability-reporting-is-enabled-for-a-repository
   */
  checkPrivateVulnerabilityReporting: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<{ enabled: boolean }>;

  /**
   * Enable private vulnerability reporting for a repository
   * @see https://docs.github.com/rest/repos/repos#enable-private-vulnerability-reporting-for-a-repository
   */
  enablePrivateVulnerabilityReporting: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Disable private vulnerability reporting for a repository
   * @see https://docs.github.com/rest/repos/repos#disable-private-vulnerability-reporting-for-a-repository
   */
  disablePrivateVulnerabilityReporting: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Get all custom property values for a repository
   * @see https://docs.github.com/rest/repos/custom-properties#get-all-custom-property-values-for-a-repository
   */
  customPropertiesForReposGetRepositoryValues: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(CustomPropertyValue)[]>;

  /**
   * Create or update custom property values for a repository
   * @see https://docs.github.com/rest/repos/custom-properties#create-or-update-custom-property-values-for-a-repository
   */
  customPropertiesForReposCreateOrUpdateRepositoryValues: (input: {
    /** A list of custom property names and associated values to apply to the repositories. */
    properties: (CustomPropertyValue)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Get a repository README
   * @see https://docs.github.com/rest/repos/contents#get-a-repository-readme
   */
  getReadme: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the commit/branch/tag. Default: the repository’s default branch. */
    ref?: string;
  }) => Promise<ContentFile>;

  /**
   * Get a repository README for a directory
   * @see https://docs.github.com/rest/repos/contents#get-a-repository-readme-for-a-directory
   */
  getReadmeInDirectory: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The alternate path to look for a README file */
    dir: string;
    /** The name of the commit/branch/tag. Default: the repository’s default branch. */
    ref?: string;
  }) => Promise<ContentFile>;

  /**
   * List releases
   * @see https://docs.github.com/rest/releases/releases#list-releases
   */
  listReleases: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Release)[]>;

  /**
   * Create a release
   * @see https://docs.github.com/rest/releases/releases#create-a-release
   */
  createRelease: (input: {
    /** The name of the tag. */
    tag_name: string;
    /** Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository's default branch. */
    target_commitish?: string;
    /** The name of the release. */
    name?: string;
    /** Text describing the contents of the tag. */
    body?: string;
    /** `true` to create a draft (unpublished) release, `false` to create a published one. */
    draft?: boolean;
    /** `true` to identify the release as a prerelease. `false` to identify the release as a full release. */
    prerelease?: boolean;
    /** If specified, a discussion of the specified category is created and linked to the release. The value must be a category that already exists in the repository. For more information, see "[Managing categories for discussions in your repository](https://docs.github.com/discussions/managing-discussions-for-your-community/managing-categories-for-discussions-in-your-repository)." */
    discussion_category_name?: string;
    /** Whether to automatically generate the name and body for this release. If `name` is specified, the specified name will be used; otherwise, a name will be automatically generated. If `body` is specified, the body will be pre-pended to the automatically generated notes. */
    generate_release_notes?: boolean;
    /** Specifies whether this release should be set as the latest release for the repository. Drafts and prereleases cannot be set as latest. Defaults to `true` for newly published releases. `legacy` specifies that the latest release should be determined based on the release creation date and higher semantic version. */
    make_latest?: "true" | "false" | "legacy";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Release>;

  /**
   * Get a release asset
   * @see https://docs.github.com/rest/releases/assets#get-a-release-asset
   */
  getReleaseAsset: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the asset. */
    asset_id: number;
  }) => Promise<ReleaseAsset>;

  /**
   * Update a release asset
   * @see https://docs.github.com/rest/releases/assets#update-a-release-asset
   */
  updateReleaseAsset: (input: {
    /** The file name of the asset. */
    name?: string;
    /** An alternate short description of the asset. Used in place of the filename. */
    label?: string;
    state?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the asset. */
    asset_id: number;
  }) => Promise<ReleaseAsset>;

  /**
   * Delete a release asset
   * @see https://docs.github.com/rest/releases/assets#delete-a-release-asset
   */
  deleteReleaseAsset: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the asset. */
    asset_id: number;
  }) => Promise<BasicError>;

  /**
   * Generate release notes content for a release
   * @see https://docs.github.com/rest/releases/releases#generate-release-notes-content-for-a-release
   */
  generateReleaseNotes: (input: {
    /** The tag name for the release. This can be an existing tag or a new one. */
    tag_name: string;
    /** Specifies the commitish value that will be the target for the release's tag. Required if the supplied tag_name does not reference an existing tag. Ignored if the tag_name already exists. */
    target_commitish?: string;
    /** The name of the previous tag to use as the starting point for the release notes. Use to manually specify the range for the set of changes considered as part this release. */
    previous_tag_name?: string;
    /** Specifies a path to a file in the repository containing configuration settings used for generating the release notes. If unspecified, the configuration file located in the repository at '.github/release.yml' or '.github/release.yaml' will be used. If that is not present, the default configuration will be used. */
    configuration_file_path?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ReleaseNotesContent>;

  /**
   * Get the latest release
   * @see https://docs.github.com/rest/releases/releases#get-the-latest-release
   */
  getLatestRelease: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Release>;

  /**
   * Get a release by tag name
   * @see https://docs.github.com/rest/releases/releases#get-a-release-by-tag-name
   */
  getReleaseByTag: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** tag parameter */
    tag: string;
  }) => Promise<Release>;

  /**
   * Get a release
   * @see https://docs.github.com/rest/releases/releases#get-a-release
   */
  getRelease: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the release. */
    release_id: number;
  }) => Promise<Release>;

  /**
   * Update a release
   * @see https://docs.github.com/rest/releases/releases#update-a-release
   */
  updateRelease: (input: {
    /** The name of the tag. */
    tag_name?: string;
    /** Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository's default branch. */
    target_commitish?: string;
    /** The name of the release. */
    name?: string;
    /** Text describing the contents of the tag. */
    body?: string;
    /** `true` makes the release a draft, and `false` publishes the release. */
    draft?: boolean;
    /** `true` to identify the release as a prerelease, `false` to identify the release as a full release. */
    prerelease?: boolean;
    /** Specifies whether this release should be set as the latest release for the repository. Drafts and prereleases cannot be set as latest. Defaults to `true` for newly published releases. `legacy` specifies that the latest release should be determined based on the release creation date and higher semantic version. */
    make_latest?: "true" | "false" | "legacy";
    /** If specified, a discussion of the specified category is created and linked to the release. The value must be a category that already exists in the repository. If there is already a discussion linked to the release, this parameter is ignored. For more information, see "[Managing categories for discussions in your repository](https://docs.github.com/discussions/managing-discussions-for-your-community/managing-categories-for-discussions-in-your-repository)." */
    discussion_category_name?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the release. */
    release_id: number;
  }) => Promise<Release>;

  /**
   * Delete a release
   * @see https://docs.github.com/rest/releases/releases#delete-a-release
   */
  deleteRelease: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the release. */
    release_id: number;
  }) => Promise<BasicError>;

  /**
   * List release assets
   * @see https://docs.github.com/rest/releases/assets#list-release-assets
   */
  listReleaseAssets: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the release. */
    release_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(ReleaseAsset)[]>;

  /**
   * Upload a release asset
   * @see https://docs.github.com/rest/releases/assets#upload-a-release-asset
   */
  uploadReleaseAsset: (input: {
    /** The raw file data */
    body?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the release. */
    release_id: number;
    name: string;
    label?: string;
  }) => Promise<ReleaseAsset>;

  /**
   * Get rules for a branch
   * @see https://docs.github.com/rest/repos/rules#get-rules-for-a-branch
   */
  getBranchRules: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). */
    branch: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(RepositoryRuleDetailed)[]>;

  /**
   * Get all repository rulesets
   * @see https://docs.github.com/rest/repos/rules#get-all-repository-rulesets
   */
  getRepoRulesets: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** Include rulesets configured at higher levels that apply to this repository */
    includes_parents?: boolean;
    /** A comma-separated list of rule targets to filter by. If provided, only rulesets that apply to the specified targets will be returned. For example, `branch,tag,push`.  */
    targets?: string;
  }) => Promise<(RepositoryRuleset)[]>;

  /**
   * Create a repository ruleset
   * @see https://docs.github.com/rest/repos/rules#create-a-repository-ruleset
   */
  createRepoRuleset: (input: {
    /** The name of the ruleset. */
    name: string;
    /** The target of the ruleset */
    target?: "branch" | "tag" | "push";
    enforcement: RepositoryRuleEnforcement;
    /** The actors that can bypass the rules in this ruleset */
    bypass_actors?: (RepositoryRulesetBypassActor)[];
    conditions?: RepositoryRulesetConditions;
    /** An array of rules within the ruleset. */
    rules?: (RepositoryRule)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<RepositoryRuleset>;

  /**
   * List repository rule suites
   * @see https://docs.github.com/rest/repos/rule-suites#list-repository-rule-suites
   */
  getRepoRuleSuites: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the ref. Cannot contain wildcard characters. Optionally prefix with `refs/heads/` to limit to branches or `refs/tags/` to limit to tags. Omit the prefix to search across all refs. When specified, only rule evaluations triggered for this ref will be returned. */
    ref?: string;
    /** The time period to filter by.  For example, `day` will filter for rule suites that occurred in the past 24 hours, and `week` will filter for rule suites that occurred in the past 7 days (168 hours). */
    time_period?: "hour" | "day" | "week" | "month";
    /** The handle for the GitHub user account to filter on. When specified, only rule evaluations triggered by this actor will be returned. */
    actor_name?: string;
    /** The rule suite results to filter on. When specified, only suites with this result will be returned. */
    rule_suite_result?: "pass" | "fail" | "bypass" | "all";
    /** The evaluate status to filter on. When specified, only rule suites resulting from rulesets with the specified evaluate status will be returned.   - `all` - all rule suites will be returned.   - `active` - only rule suites resulting from rulesets in active (non-evaluate) mode will be returned.   - `evaluate` - only rule suites resulting from rulesets in evaluate mode will be returned. */
    evaluate_status?: "all" | "active" | "evaluate";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<RuleSuites>;

  /**
   * Get a repository rule suite
   * @see https://docs.github.com/rest/repos/rule-suites#get-a-repository-rule-suite
   */
  getRepoRuleSuite: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the rule suite result. To get this ID, you can use [GET /repos/{owner}/{repo}/rulesets/rule-suites](https://docs.github.com/rest/repos/rule-suites#list-repository-rule-suites) for repositories and [GET /orgs/{org}/rulesets/rule-suites](https://docs.github.com/rest/orgs/rule-suites#list-organization-rule-suites) for organizations. */
    rule_suite_id: number;
  }) => Promise<RuleSuite>;

  /**
   * Get a repository ruleset
   * @see https://docs.github.com/rest/repos/rules#get-a-repository-ruleset
   */
  getRepoRuleset: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the ruleset. */
    ruleset_id: number;
    /** Include rulesets configured at higher levels that apply to this repository */
    includes_parents?: boolean;
  }) => Promise<RepositoryRuleset>;

  /**
   * Update a repository ruleset
   * @see https://docs.github.com/rest/repos/rules#update-a-repository-ruleset
   */
  updateRepoRuleset: (input: {
    /** The name of the ruleset. */
    name?: string;
    /** The target of the ruleset */
    target?: "branch" | "tag" | "push";
    enforcement?: RepositoryRuleEnforcement;
    /** The actors that can bypass the rules in this ruleset */
    bypass_actors?: (RepositoryRulesetBypassActor)[];
    conditions?: RepositoryRulesetConditions;
    /** An array of rules within the ruleset. */
    rules?: (RepositoryRule)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the ruleset. */
    ruleset_id: number;
  }) => Promise<RepositoryRuleset>;

  /**
   * Delete a repository ruleset
   * @see https://docs.github.com/rest/repos/rules#delete-a-repository-ruleset
   */
  deleteRepoRuleset: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the ruleset. */
    ruleset_id: number;
  }) => Promise<BasicError>;

  /**
   * Get repository ruleset history
   * @see https://docs.github.com/rest/repos/rules#get-repository-ruleset-history
   */
  getRepoRulesetHistory: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the ruleset. */
    ruleset_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(RulesetVersion)[]>;

  /**
   * Get repository ruleset version
   * @see https://docs.github.com/rest/repos/rules#get-repository-ruleset-version
   */
  getRepoRulesetVersion: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the ruleset. */
    ruleset_id: number;
    /** The ID of the version */
    version_id: number;
  }) => Promise<RulesetVersionWithState>;

  /**
   * Get the weekly commit activity
   * @see https://docs.github.com/rest/metrics/statistics#get-the-weekly-commit-activity
   */
  getCodeFrequencyStats: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(CodeFrequencyStat)[]>;

  /**
   * Get the last year of commit activity
   * @see https://docs.github.com/rest/metrics/statistics#get-the-last-year-of-commit-activity
   */
  getCommitActivityStats: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(CommitActivity)[]>;

  /**
   * Get all contributor commit activity
   * @see https://docs.github.com/rest/metrics/statistics#get-all-contributor-commit-activity
   */
  getContributorsStats: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(ContributorActivity)[]>;

  /**
   * Get the weekly commit count
   * @see https://docs.github.com/rest/metrics/statistics#get-the-weekly-commit-count
   */
  getParticipationStats: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ParticipationStats>;

  /**
   * Get the hourly commit count for each day
   * @see https://docs.github.com/rest/metrics/statistics#get-the-hourly-commit-count-for-each-day
   */
  getPunchCardStats: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(CodeFrequencyStat)[]>;

  /**
   * Create a commit status
   * @see https://docs.github.com/rest/commits/statuses#create-a-commit-status
   */
  createCommitStatus: (input: {
    /** The state of the status. */
    state: "error" | "failure" | "pending" | "success";
    /** The target URL to associate with this status. This URL will be linked from the GitHub UI to allow users to easily see the source of the status.   For example, if your continuous integration system is posting build status, you would want to provide the deep link for the build output for this specific SHA:   `http://ci.example.com/user/repo/build/sha` */
    target_url?: string | null;
    /** A short description of the status. */
    description?: string | null;
    /** A string label to differentiate this status from the status of other systems. This field is case-insensitive. */
    context?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    sha: string;
  }) => Promise<Status>;

  /**
   * List repository tags
   * @see https://docs.github.com/rest/repos/repos#list-repository-tags
   */
  listTags: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Tag)[]>;

  /**
   * Download a repository archive (tar)
   * @see https://docs.github.com/rest/repos/contents#download-a-repository-archive-tar
   */
  downloadTarballArchive: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    ref: string;
  }) => Promise<unknown>;

  /**
   * List repository teams
   * @see https://docs.github.com/rest/repos/repos#list-repository-teams
   */
  listTeams: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Team)[]>;

  /**
   * Get all repository topics
   * @see https://docs.github.com/rest/repos/repos#get-all-repository-topics
   */
  getAllTopics: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<Topic>;

  /**
   * Replace all repository topics
   * @see https://docs.github.com/rest/repos/repos#replace-all-repository-topics
   */
  replaceAllTopics: (input: {
    /** An array of topics to add to the repository. Pass one or more topics to _replace_ the set of existing topics. Send an empty array (`[]`) to clear all topics from the repository. **Note:** Topic `names` will be saved as lowercase. */
    names: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Topic>;

  /**
   * Get repository clones
   * @see https://docs.github.com/rest/metrics/traffic#get-repository-clones
   */
  getClones: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The time frame to display results for. */
    per?: "day" | "week";
  }) => Promise<CloneTraffic>;

  /**
   * Get top referral paths
   * @see https://docs.github.com/rest/metrics/traffic#get-top-referral-paths
   */
  getTopPaths: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(ContentTraffic)[]>;

  /**
   * Get top referral sources
   * @see https://docs.github.com/rest/metrics/traffic#get-top-referral-sources
   */
  getTopReferrers: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(ReferrerTraffic)[]>;

  /**
   * Get page views
   * @see https://docs.github.com/rest/metrics/traffic#get-page-views
   */
  getViews: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The time frame to display results for. */
    per?: "day" | "week";
  }) => Promise<ViewTraffic>;

  /**
   * Transfer a repository
   * @see https://docs.github.com/rest/repos/repos#transfer-a-repository
   */
  transfer: (input: {
    /** The username or organization name the repository will be transferred to. */
    new_owner: string;
    /** The new name to be given to the repository. */
    new_name?: string;
    /** ID of the team or teams to add to the repository. Teams can only be added to organization-owned repositories. */
    team_ids?: (number)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<MinimalRepository>;

  /**
   * Check if vulnerability alerts are enabled for a repository
   * @see https://docs.github.com/rest/repos/repos#check-if-vulnerability-alerts-are-enabled-for-a-repository
   */
  checkVulnerabilityAlerts: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * Enable vulnerability alerts
   * @see https://docs.github.com/rest/repos/repos#enable-vulnerability-alerts
   */
  enableVulnerabilityAlerts: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * Disable vulnerability alerts
   * @see https://docs.github.com/rest/repos/repos#disable-vulnerability-alerts
   */
  disableVulnerabilityAlerts: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * Download a repository archive (zip)
   * @see https://docs.github.com/rest/repos/contents#download-a-repository-archive-zip
   */
  downloadZipballArchive: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    ref: string;
  }) => Promise<unknown>;

  /**
   * Create a repository using a template
   * @see https://docs.github.com/rest/repos/repos#create-a-repository-using-a-template
   */
  createUsingTemplate: (input: {
    /** The organization or person who will own the new repository. To create a new repository in an organization, the authenticated user must be a member of the specified organization. */
    owner?: string;
    /** The name of the new repository. */
    name: string;
    /** A short description of the new repository. */
    description?: string;
    /** Set to `true` to include the directory structure and files from all branches in the template repository, and not just the default branch. Default: `false`. */
    include_all_branches?: boolean;
    /** Either `true` to create a new private repository or `false` to create a new public one. */
    private?: boolean;
    /** The account owner of the template repository. The name is not case sensitive. */
    template_owner: string;
    /** The name of the template repository without the `.git` extension. The name is not case sensitive. */
    template_repo: string;
  }) => Promise<FullRepository>;

  /**
   * List public repositories
   * @see https://docs.github.com/rest/repos/repos#list-public-repositories
   */
  listPublic: (input: {
    /** A repository ID. Only return repositories with an ID greater than this ID. */
    since?: number;
  }) => Promise<(MinimalRepository)[]>;

  /**
   * List repositories for the authenticated user
   * @see https://docs.github.com/rest/repos/repos#list-repositories-for-the-authenticated-user
   */
  listForAuthenticatedUser: (input: {
    /** Limit results to repositories with the specified visibility. */
    visibility?: "all" | "public" | "private";
    /** Comma-separated list of values. Can include:    * `owner`: Repositories that are owned by the authenticated user.    * `collaborator`: Repositories that the user has been added to as a collaborator.    * `organization_member`: Repositories that the user has access to through being a member of an organization. This includes every repository on every team that the user is on. */
    affiliation?: string;
    /** Limit results to repositories of the specified type. Will cause a `422` error if used in the same request as **visibility** or **affiliation**. */
    type?: "all" | "owner" | "public" | "private" | "member";
    /** The property to sort the results by. */
    sort?: "created" | "updated" | "pushed" | "full_name";
    /** The order to sort by. Default: `asc` when using `full_name`, otherwise `desc`. */
    direction?: "asc" | "desc";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** Only show repositories updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** Only show repositories updated before the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    before?: string;
  }) => Promise<(Repository)[]>;

  /**
   * Create a repository for the authenticated user
   * @see https://docs.github.com/rest/repos/repos#create-a-repository-for-the-authenticated-user
   */
  createForAuthenticatedUser: (input: {
    /** The name of the repository. */
    name: string;
    /** A short description of the repository. */
    description?: string;
    /** A URL with more information about the repository. */
    homepage?: string;
    /** Whether the repository is private. */
    private?: boolean;
    /** Whether issues are enabled. */
    has_issues?: boolean;
    /** Whether projects are enabled. */
    has_projects?: boolean;
    /** Whether the wiki is enabled. */
    has_wiki?: boolean;
    /** Whether discussions are enabled. */
    has_discussions?: boolean;
    /** The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization. */
    team_id?: number;
    /** Whether the repository is initialized with a minimal README. */
    auto_init?: boolean;
    /** The desired language or platform to apply to the .gitignore. */
    gitignore_template?: string;
    /** The license keyword of the open source license for this repository. */
    license_template?: string;
    /** Whether to allow squash merges for pull requests. */
    allow_squash_merge?: boolean;
    /** Whether to allow merge commits for pull requests. */
    allow_merge_commit?: boolean;
    /** Whether to allow rebase merges for pull requests. */
    allow_rebase_merge?: boolean;
    /** Whether to allow Auto-merge to be used on pull requests. */
    allow_auto_merge?: boolean;
    /** Whether to delete head branches when pull requests are merged */
    delete_branch_on_merge?: boolean;
    /** Required when using `squash_merge_commit_message`.  The default value for a squash merge commit title:  - `PR_TITLE` - default to the pull request's title. - `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit). */
    squash_merge_commit_title?: "PR_TITLE" | "COMMIT_OR_PR_TITLE";
    /** The default value for a squash merge commit message:  - `PR_BODY` - default to the pull request's body. - `COMMIT_MESSAGES` - default to the branch's commit messages. - `BLANK` - default to a blank commit message. */
    squash_merge_commit_message?: "PR_BODY" | "COMMIT_MESSAGES" | "BLANK";
    /** Required when using `merge_commit_message`.  The default value for a merge commit title.  - `PR_TITLE` - default to the pull request's title. - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name). */
    merge_commit_title?: "PR_TITLE" | "MERGE_MESSAGE";
    /** The default value for a merge commit message.  - `PR_TITLE` - default to the pull request's title. - `PR_BODY` - default to the pull request's body. - `BLANK` - default to a blank commit message. */
    merge_commit_message?: "PR_BODY" | "PR_TITLE" | "BLANK";
    /** Whether downloads are enabled. */
    has_downloads?: boolean;
    /** Whether this repository acts as a template that can be used to generate new repositories. */
    is_template?: boolean;
  }) => Promise<FullRepository>;

  /**
   * List repository invitations for the authenticated user
   * @see https://docs.github.com/rest/collaborators/invitations#list-repository-invitations-for-the-authenticated-user
   */
  listInvitationsForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(RepositoryInvitation)[]>;

  /**
   * Accept a repository invitation
   * @see https://docs.github.com/rest/collaborators/invitations#accept-a-repository-invitation
   */
  acceptInvitationForAuthenticatedUser: (input: {
    /** The unique identifier of the invitation. */
    invitation_id: number;
  }) => Promise<BasicError>;

  /**
   * Decline a repository invitation
   * @see https://docs.github.com/rest/collaborators/invitations#decline-a-repository-invitation
   */
  declineInvitationForAuthenticatedUser: (input: {
    /** The unique identifier of the invitation. */
    invitation_id: number;
  }) => Promise<BasicError>;

  /**
   * List repositories for a user
   * @see https://docs.github.com/rest/repos/repos#list-repositories-for-a-user
   */
  listForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** Limit results to repositories of the specified type. */
    type?: "all" | "owner" | "member";
    /** The property to sort the results by. */
    sort?: "created" | "updated" | "pushed" | "full_name";
    /** The order to sort by. Default: `asc` when using `full_name`, otherwise `desc`. */
    direction?: "asc" | "desc";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MinimalRepository)[]>;
};
