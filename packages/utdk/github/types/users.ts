import type { BasicError, Email, GpgKey, Hovercard, Key, KeySimple, PrivateUser, PublicUser, SimpleUser, SocialAccount, SshSigningKey } from "./schemas.js";

export type UsersOperations = {
  /**
   * Get the authenticated user
   * @see https://docs.github.com/rest/users/users#get-the-authenticated-user
   */
  getAuthenticated: () => Promise<PrivateUser | PublicUser>;

  /**
   * Update the authenticated user
   * @see https://docs.github.com/rest/users/users#update-the-authenticated-user
   */
  updateAuthenticated: (input: {
    /** The new name of the user. */
    name?: string;
    /** The publicly visible email address of the user. */
    email?: string;
    /** The new blog URL of the user. */
    blog?: string;
    /** The new Twitter username of the user. */
    twitter_username?: string | null;
    /** The new company of the user. */
    company?: string;
    /** The new location of the user. */
    location?: string;
    /** The new hiring availability of the user. */
    hireable?: boolean;
    /** The new short biography of the user. */
    bio?: string;
  }) => Promise<PrivateUser>;

  /**
   * List users blocked by the authenticated user
   * @see https://docs.github.com/rest/users/blocking#list-users-blocked-by-the-authenticated-user
   */
  listBlockedByAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Check if a user is blocked by the authenticated user
   * @see https://docs.github.com/rest/users/blocking#check-if-a-user-is-blocked-by-the-authenticated-user
   */
  checkBlocked: (input: {
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Block a user
   * @see https://docs.github.com/rest/users/blocking#block-a-user
   */
  block: (input: {
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Unblock a user
   * @see https://docs.github.com/rest/users/blocking#unblock-a-user
   */
  unblock: (input: {
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Set primary email visibility for the authenticated user
   * @see https://docs.github.com/rest/users/emails#set-primary-email-visibility-for-the-authenticated-user
   */
  setPrimaryEmailVisibilityForAuthenticatedUser: (input: {
    /** Denotes whether an email is publicly visible. */
    visibility: "public" | "private";
  }) => Promise<(Email)[]>;

  /**
   * List email addresses for the authenticated user
   * @see https://docs.github.com/rest/users/emails#list-email-addresses-for-the-authenticated-user
   */
  listEmailsForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Email)[]>;

  /**
   * Add an email address for the authenticated user
   * @see https://docs.github.com/rest/users/emails#add-an-email-address-for-the-authenticated-user
   */
  addEmailForAuthenticatedUser: (input: {
    body?: { emails: (string)[] } | (string)[] | string;
  }) => Promise<(Email)[]>;

  /**
   * Delete an email address for the authenticated user
   * @see https://docs.github.com/rest/users/emails#delete-an-email-address-for-the-authenticated-user
   */
  deleteEmailForAuthenticatedUser: (input: {
    body?: { emails: (string)[] } | (string)[] | string;
  }) => Promise<BasicError>;

  /**
   * List followers of the authenticated user
   * @see https://docs.github.com/rest/users/followers#list-followers-of-the-authenticated-user
   */
  listFollowersForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * List the people the authenticated user follows
   * @see https://docs.github.com/rest/users/followers#list-the-people-the-authenticated-user-follows
   */
  listFollowedByAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Check if a person is followed by the authenticated user
   * @see https://docs.github.com/rest/users/followers#check-if-a-person-is-followed-by-the-authenticated-user
   */
  checkPersonIsFollowedByAuthenticated: (input: {
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Follow a user
   * @see https://docs.github.com/rest/users/followers#follow-a-user
   */
  follow: (input: {
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Unfollow a user
   * @see https://docs.github.com/rest/users/followers#unfollow-a-user
   */
  unfollow: (input: {
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * List GPG keys for the authenticated user
   * @see https://docs.github.com/rest/users/gpg-keys#list-gpg-keys-for-the-authenticated-user
   */
  listGpgKeysForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(GpgKey)[]>;

  /**
   * Create a GPG key for the authenticated user
   * @see https://docs.github.com/rest/users/gpg-keys#create-a-gpg-key-for-the-authenticated-user
   */
  createGpgKeyForAuthenticatedUser: (input: {
    /** A descriptive name for the new key. */
    name?: string;
    /** A GPG key in ASCII-armored format. */
    armored_public_key: string;
  }) => Promise<GpgKey>;

  /**
   * Get a GPG key for the authenticated user
   * @see https://docs.github.com/rest/users/gpg-keys#get-a-gpg-key-for-the-authenticated-user
   */
  getGpgKeyForAuthenticatedUser: (input: {
    /** The unique identifier of the GPG key. */
    gpg_key_id: number;
  }) => Promise<GpgKey>;

  /**
   * Delete a GPG key for the authenticated user
   * @see https://docs.github.com/rest/users/gpg-keys#delete-a-gpg-key-for-the-authenticated-user
   */
  deleteGpgKeyForAuthenticatedUser: (input: {
    /** The unique identifier of the GPG key. */
    gpg_key_id: number;
  }) => Promise<BasicError>;

  /**
   * List public SSH keys for the authenticated user
   * @see https://docs.github.com/rest/users/keys#list-public-ssh-keys-for-the-authenticated-user
   */
  listPublicSshKeysForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Key)[]>;

  /**
   * Create a public SSH key for the authenticated user
   * @see https://docs.github.com/rest/users/keys#create-a-public-ssh-key-for-the-authenticated-user
   */
  createPublicSshKeyForAuthenticatedUser: (input: {
    /** A descriptive name for the new key. */
    title?: string;
    /** The public SSH key to add to your GitHub account. */
    key: string;
  }) => Promise<Key>;

  /**
   * Get a public SSH key for the authenticated user
   * @see https://docs.github.com/rest/users/keys#get-a-public-ssh-key-for-the-authenticated-user
   */
  getPublicSshKeyForAuthenticatedUser: (input: {
    /** The unique identifier of the key. */
    key_id: number;
  }) => Promise<Key>;

  /**
   * Delete a public SSH key for the authenticated user
   * @see https://docs.github.com/rest/users/keys#delete-a-public-ssh-key-for-the-authenticated-user
   */
  deletePublicSshKeyForAuthenticatedUser: (input: {
    /** The unique identifier of the key. */
    key_id: number;
  }) => Promise<BasicError>;

  /**
   * List public email addresses for the authenticated user
   * @see https://docs.github.com/rest/users/emails#list-public-email-addresses-for-the-authenticated-user
   */
  listPublicEmailsForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Email)[]>;

  /**
   * List social accounts for the authenticated user
   * @see https://docs.github.com/rest/users/social-accounts#list-social-accounts-for-the-authenticated-user
   */
  listSocialAccountsForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SocialAccount)[]>;

  /**
   * Add social accounts for the authenticated user
   * @see https://docs.github.com/rest/users/social-accounts#add-social-accounts-for-the-authenticated-user
   */
  addSocialAccountForAuthenticatedUser: (input: {
    /** Full URLs for the social media profiles to add. */
    account_urls: (string)[];
  }) => Promise<(SocialAccount)[]>;

  /**
   * Delete social accounts for the authenticated user
   * @see https://docs.github.com/rest/users/social-accounts#delete-social-accounts-for-the-authenticated-user
   */
  deleteSocialAccountForAuthenticatedUser: (input: {
    /** Full URLs for the social media profiles to delete. */
    account_urls: (string)[];
  }) => Promise<BasicError>;

  /**
   * List SSH signing keys for the authenticated user
   * @see https://docs.github.com/rest/users/ssh-signing-keys#list-ssh-signing-keys-for-the-authenticated-user
   */
  listSshSigningKeysForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SshSigningKey)[]>;

  /**
   * Create a SSH signing key for the authenticated user
   * @see https://docs.github.com/rest/users/ssh-signing-keys#create-a-ssh-signing-key-for-the-authenticated-user
   */
  createSshSigningKeyForAuthenticatedUser: (input: {
    /** A descriptive name for the new key. */
    title?: string;
    /** The public SSH key to add to your GitHub account. For more information, see "[Checking for existing SSH keys](https://docs.github.com/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys)." */
    key: string;
  }) => Promise<SshSigningKey>;

  /**
   * Get an SSH signing key for the authenticated user
   * @see https://docs.github.com/rest/users/ssh-signing-keys#get-an-ssh-signing-key-for-the-authenticated-user
   */
  getSshSigningKeyForAuthenticatedUser: (input: {
    /** The unique identifier of the SSH signing key. */
    ssh_signing_key_id: number;
  }) => Promise<SshSigningKey>;

  /**
   * Delete an SSH signing key for the authenticated user
   * @see https://docs.github.com/rest/users/ssh-signing-keys#delete-an-ssh-signing-key-for-the-authenticated-user
   */
  deleteSshSigningKeyForAuthenticatedUser: (input: {
    /** The unique identifier of the SSH signing key. */
    ssh_signing_key_id: number;
  }) => Promise<BasicError>;

  /**
   * Get a user using their ID
   * @see https://docs.github.com/rest/users/users#get-a-user-using-their-id
   */
  getById: (input: {
    /** account_id parameter */
    account_id: number;
  }) => Promise<PrivateUser | PublicUser>;

  /**
   * List users
   * @see https://docs.github.com/rest/users/users#list-users
   */
  list: (input: {
    /** A user ID. Only return users with an ID greater than this ID. */
    since?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Get a user
   * @see https://docs.github.com/rest/users/users#get-a-user
   */
  getByUsername: (input: {
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<PrivateUser | PublicUser>;

  /**
   * List attestations by bulk subject digests
   * @see https://docs.github.com/rest/users/attestations#list-attestations-by-bulk-subject-digests
   */
  listAttestationsBulk: (input: {
    /** List of subject digests to fetch attestations for. */
    subject_digests: (string)[];
    /** Optional filter for fetching attestations with a given predicate type. This option accepts `provenance`, `sbom`, `release`, or freeform text for custom predicate types. */
    predicate_type?: string;
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
  }) => Promise<{ attestations_subject_digests?: { [key: string]: ({ bundle?: { mediaType?: string; verificationMaterial?: { [key: string]: unknown }; dsseEnvelope?: { [key: string]: unknown } }; repository_id?: number; bundle_url?: string })[] | null | undefined }; page_info?: { has_next?: boolean; has_previous?: boolean; next?: string; previous?: string } }>;

  /**
   * Delete attestations in bulk
   * @see https://docs.github.com/rest/users/attestations#delete-attestations-in-bulk
   */
  deleteAttestationsBulk: (input: {
    /** The request body must include either `subject_digests` or `attestation_ids`, but not both. */
    body: { subject_digests: (string)[] } | { attestation_ids: (number)[] };
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Delete attestations by subject digest
   * @see https://docs.github.com/rest/users/attestations#delete-attestations-by-subject-digest
   */
  deleteAttestationsBySubjectDigest: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** Subject Digest */
    subject_digest: string;
  }) => Promise<BasicError>;

  /**
   * Delete attestations by ID
   * @see https://docs.github.com/rest/users/attestations#delete-attestations-by-id
   */
  deleteAttestationsById: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** Attestation ID */
    attestation_id: number;
  }) => Promise<BasicError>;

  /**
   * List attestations
   * @see https://docs.github.com/rest/users/attestations#list-attestations
   */
  listAttestations: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** Subject Digest */
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
   * List followers of a user
   * @see https://docs.github.com/rest/users/followers#list-followers-of-a-user
   */
  listFollowersForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * List the people a user follows
   * @see https://docs.github.com/rest/users/followers#list-the-people-a-user-follows
   */
  listFollowingForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Check if a user follows another user
   * @see https://docs.github.com/rest/users/followers#check-if-a-user-follows-another-user
   */
  checkFollowingForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    target_user: string;
  }) => Promise<unknown>;

  /**
   * List GPG keys for a user
   * @see https://docs.github.com/rest/users/gpg-keys#list-gpg-keys-for-a-user
   */
  listGpgKeysForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(GpgKey)[]>;

  /**
   * Get contextual information for a user
   * @see https://docs.github.com/rest/users/users#get-contextual-information-for-a-user
   */
  getContextForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** Identifies which additional information you'd like to receive about the person's hovercard. Can be `organization`, `repository`, `issue`, `pull_request`. **Required** when using `subject_id`. */
    subject_type?: "organization" | "repository" | "issue" | "pull_request";
    /** Uses the ID for the `subject_type` you specified. **Required** when using `subject_type`. */
    subject_id?: string;
  }) => Promise<Hovercard>;

  /**
   * List public keys for a user
   * @see https://docs.github.com/rest/users/keys#list-public-keys-for-a-user
   */
  listPublicKeysForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(KeySimple)[]>;

  /**
   * List social accounts for a user
   * @see https://docs.github.com/rest/users/social-accounts#list-social-accounts-for-a-user
   */
  listSocialAccountsForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SocialAccount)[]>;

  /**
   * List SSH signing keys for a user
   * @see https://docs.github.com/rest/users/ssh-signing-keys#list-ssh-signing-keys-for-a-user
   */
  listSshSigningKeysForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SshSigningKey)[]>;
};
