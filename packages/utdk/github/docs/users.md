# Users

47 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.users.getAuthenticated`

Get the authenticated user — [API reference](https://docs.github.com/rest/users/users#get-the-authenticated-user)

```ts
github.users.getAuthenticated(): Promise<PrivateUser | PublicUser>
```

<sub>`GET /user` · `users/get-authenticated`</sub>

## `github.users.updateAuthenticated`

Update the authenticated user — [API reference](https://docs.github.com/rest/users/users#update-the-authenticated-user)

```ts
github.users.updateAuthenticated(input: {
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
}): Promise<PrivateUser>
```

<sub>`PATCH /user` · `users/update-authenticated`</sub>

## `github.users.getById`

Get a user using their ID — [API reference](https://docs.github.com/rest/users/users#get-a-user-using-their-id)

```ts
github.users.getById(input: {
  /** account_id parameter */
  account_id: number;
}): Promise<PrivateUser | PublicUser>
```

<sub>`GET /user/{account_id}` · `users/get-by-id`</sub>

## `github.users.listBlockedByAuthenticatedUser`

List users blocked by the authenticated user — [API reference](https://docs.github.com/rest/users/blocking#list-users-blocked-by-the-authenticated-user)

```ts
github.users.listBlockedByAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /user/blocks` · `users/list-blocked-by-authenticated-user`</sub>

## `github.users.unblock`

Unblock a user — [API reference](https://docs.github.com/rest/users/blocking#unblock-a-user)

```ts
github.users.unblock(input: {
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`DELETE /user/blocks/{username}` · `users/unblock`</sub>

## `github.users.checkBlocked`

Check if a user is blocked by the authenticated user — [API reference](https://docs.github.com/rest/users/blocking#check-if-a-user-is-blocked-by-the-authenticated-user)

```ts
github.users.checkBlocked(input: {
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`GET /user/blocks/{username}` · `users/check-blocked`</sub>

## `github.users.block`

Block a user — [API reference](https://docs.github.com/rest/users/blocking#block-a-user)

```ts
github.users.block(input: {
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`PUT /user/blocks/{username}` · `users/block`</sub>

## `github.users.setPrimaryEmailVisibilityForAuthenticatedUser`

Set primary email visibility for the authenticated user — [API reference](https://docs.github.com/rest/users/emails#set-primary-email-visibility-for-the-authenticated-user)

```ts
github.users.setPrimaryEmailVisibilityForAuthenticatedUser(input: {
  /** Denotes whether an email is publicly visible. */
  visibility: "public" | "private";
}): Promise<(Email)[]>
```

<sub>`PATCH /user/email/visibility` · `users/set-primary-email-visibility-for-authenticated-user`</sub>

## `github.users.deleteEmailForAuthenticatedUser`

Delete an email address for the authenticated user — [API reference](https://docs.github.com/rest/users/emails#delete-an-email-address-for-the-authenticated-user)

```ts
github.users.deleteEmailForAuthenticatedUser(input: {
  body?: { emails: (string)[] } | (string)[] | string;
}): Promise<BasicError>
```

<sub>`DELETE /user/emails` · `users/delete-email-for-authenticated-user`</sub>

## `github.users.listEmailsForAuthenticatedUser`

List email addresses for the authenticated user — [API reference](https://docs.github.com/rest/users/emails#list-email-addresses-for-the-authenticated-user)

```ts
github.users.listEmailsForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Email)[]>
```

<sub>`GET /user/emails` · `users/list-emails-for-authenticated-user`</sub>

## `github.users.addEmailForAuthenticatedUser`

Add an email address for the authenticated user — [API reference](https://docs.github.com/rest/users/emails#add-an-email-address-for-the-authenticated-user)

```ts
github.users.addEmailForAuthenticatedUser(input: {
  body?: { emails: (string)[] } | (string)[] | string;
}): Promise<(Email)[]>
```

<sub>`POST /user/emails` · `users/add-email-for-authenticated-user`</sub>

## `github.users.listFollowersForAuthenticatedUser`

List followers of the authenticated user — [API reference](https://docs.github.com/rest/users/followers#list-followers-of-the-authenticated-user)

```ts
github.users.listFollowersForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /user/followers` · `users/list-followers-for-authenticated-user`</sub>

## `github.users.listFollowedByAuthenticatedUser`

List the people the authenticated user follows — [API reference](https://docs.github.com/rest/users/followers#list-the-people-the-authenticated-user-follows)

```ts
github.users.listFollowedByAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /user/following` · `users/list-followed-by-authenticated-user`</sub>

## `github.users.unfollow`

Unfollow a user — [API reference](https://docs.github.com/rest/users/followers#unfollow-a-user)

```ts
github.users.unfollow(input: {
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`DELETE /user/following/{username}` · `users/unfollow`</sub>

## `github.users.checkPersonIsFollowedByAuthenticated`

Check if a person is followed by the authenticated user — [API reference](https://docs.github.com/rest/users/followers#check-if-a-person-is-followed-by-the-authenticated-user)

```ts
github.users.checkPersonIsFollowedByAuthenticated(input: {
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`GET /user/following/{username}` · `users/check-person-is-followed-by-authenticated`</sub>

## `github.users.follow`

Follow a user — [API reference](https://docs.github.com/rest/users/followers#follow-a-user)

```ts
github.users.follow(input: {
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`PUT /user/following/{username}` · `users/follow`</sub>

## `github.users.listGpgKeysForAuthenticatedUser`

List GPG keys for the authenticated user — [API reference](https://docs.github.com/rest/users/gpg-keys#list-gpg-keys-for-the-authenticated-user)

```ts
github.users.listGpgKeysForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(GpgKey)[]>
```

<sub>`GET /user/gpg_keys` · `users/list-gpg-keys-for-authenticated-user`</sub>

## `github.users.createGpgKeyForAuthenticatedUser`

Create a GPG key for the authenticated user — [API reference](https://docs.github.com/rest/users/gpg-keys#create-a-gpg-key-for-the-authenticated-user)

```ts
github.users.createGpgKeyForAuthenticatedUser(input: {
  /** A descriptive name for the new key. */
  name?: string;
  /** A GPG key in ASCII-armored format. */
  armored_public_key: string;
}): Promise<GpgKey>
```

<sub>`POST /user/gpg_keys` · `users/create-gpg-key-for-authenticated-user`</sub>

## `github.users.deleteGpgKeyForAuthenticatedUser`

Delete a GPG key for the authenticated user — [API reference](https://docs.github.com/rest/users/gpg-keys#delete-a-gpg-key-for-the-authenticated-user)

```ts
github.users.deleteGpgKeyForAuthenticatedUser(input: {
  /** The unique identifier of the GPG key. */
  gpg_key_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /user/gpg_keys/{gpg_key_id}` · `users/delete-gpg-key-for-authenticated-user`</sub>

## `github.users.getGpgKeyForAuthenticatedUser`

Get a GPG key for the authenticated user — [API reference](https://docs.github.com/rest/users/gpg-keys#get-a-gpg-key-for-the-authenticated-user)

```ts
github.users.getGpgKeyForAuthenticatedUser(input: {
  /** The unique identifier of the GPG key. */
  gpg_key_id: number;
}): Promise<GpgKey>
```

<sub>`GET /user/gpg_keys/{gpg_key_id}` · `users/get-gpg-key-for-authenticated-user`</sub>

## `github.users.listPublicSshKeysForAuthenticatedUser`

List public SSH keys for the authenticated user — [API reference](https://docs.github.com/rest/users/keys#list-public-ssh-keys-for-the-authenticated-user)

```ts
github.users.listPublicSshKeysForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Key)[]>
```

<sub>`GET /user/keys` · `users/list-public-ssh-keys-for-authenticated-user`</sub>

## `github.users.createPublicSshKeyForAuthenticatedUser`

Create a public SSH key for the authenticated user — [API reference](https://docs.github.com/rest/users/keys#create-a-public-ssh-key-for-the-authenticated-user)

```ts
github.users.createPublicSshKeyForAuthenticatedUser(input: {
  /** A descriptive name for the new key. */
  title?: string;
  /** The public SSH key to add to your GitHub account. */
  key: string;
}): Promise<Key>
```

<sub>`POST /user/keys` · `users/create-public-ssh-key-for-authenticated-user`</sub>

## `github.users.deletePublicSshKeyForAuthenticatedUser`

Delete a public SSH key for the authenticated user — [API reference](https://docs.github.com/rest/users/keys#delete-a-public-ssh-key-for-the-authenticated-user)

```ts
github.users.deletePublicSshKeyForAuthenticatedUser(input: {
  /** The unique identifier of the key. */
  key_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /user/keys/{key_id}` · `users/delete-public-ssh-key-for-authenticated-user`</sub>

## `github.users.getPublicSshKeyForAuthenticatedUser`

Get a public SSH key for the authenticated user — [API reference](https://docs.github.com/rest/users/keys#get-a-public-ssh-key-for-the-authenticated-user)

```ts
github.users.getPublicSshKeyForAuthenticatedUser(input: {
  /** The unique identifier of the key. */
  key_id: number;
}): Promise<Key>
```

<sub>`GET /user/keys/{key_id}` · `users/get-public-ssh-key-for-authenticated-user`</sub>

## `github.users.listPublicEmailsForAuthenticatedUser`

List public email addresses for the authenticated user — [API reference](https://docs.github.com/rest/users/emails#list-public-email-addresses-for-the-authenticated-user)

```ts
github.users.listPublicEmailsForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Email)[]>
```

<sub>`GET /user/public_emails` · `users/list-public-emails-for-authenticated-user`</sub>

## `github.users.deleteSocialAccountForAuthenticatedUser`

Delete social accounts for the authenticated user — [API reference](https://docs.github.com/rest/users/social-accounts#delete-social-accounts-for-the-authenticated-user)

```ts
github.users.deleteSocialAccountForAuthenticatedUser(input: {
  /** Full URLs for the social media profiles to delete. */
  account_urls: (string)[];
}): Promise<BasicError>
```

<sub>`DELETE /user/social_accounts` · `users/delete-social-account-for-authenticated-user`</sub>

## `github.users.listSocialAccountsForAuthenticatedUser`

List social accounts for the authenticated user — [API reference](https://docs.github.com/rest/users/social-accounts#list-social-accounts-for-the-authenticated-user)

```ts
github.users.listSocialAccountsForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SocialAccount)[]>
```

<sub>`GET /user/social_accounts` · `users/list-social-accounts-for-authenticated-user`</sub>

## `github.users.addSocialAccountForAuthenticatedUser`

Add social accounts for the authenticated user — [API reference](https://docs.github.com/rest/users/social-accounts#add-social-accounts-for-the-authenticated-user)

```ts
github.users.addSocialAccountForAuthenticatedUser(input: {
  /** Full URLs for the social media profiles to add. */
  account_urls: (string)[];
}): Promise<(SocialAccount)[]>
```

<sub>`POST /user/social_accounts` · `users/add-social-account-for-authenticated-user`</sub>

## `github.users.listSshSigningKeysForAuthenticatedUser`

List SSH signing keys for the authenticated user — [API reference](https://docs.github.com/rest/users/ssh-signing-keys#list-ssh-signing-keys-for-the-authenticated-user)

```ts
github.users.listSshSigningKeysForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SshSigningKey)[]>
```

<sub>`GET /user/ssh_signing_keys` · `users/list-ssh-signing-keys-for-authenticated-user`</sub>

## `github.users.createSshSigningKeyForAuthenticatedUser`

Create a SSH signing key for the authenticated user — [API reference](https://docs.github.com/rest/users/ssh-signing-keys#create-a-ssh-signing-key-for-the-authenticated-user)

```ts
github.users.createSshSigningKeyForAuthenticatedUser(input: {
  /** A descriptive name for the new key. */
  title?: string;
  /** The public SSH key to add to your GitHub account. For more information, see "[Checking for existing SSH keys](https://docs.github.com/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys)." */
  key: string;
}): Promise<SshSigningKey>
```

<sub>`POST /user/ssh_signing_keys` · `users/create-ssh-signing-key-for-authenticated-user`</sub>

## `github.users.deleteSshSigningKeyForAuthenticatedUser`

Delete an SSH signing key for the authenticated user — [API reference](https://docs.github.com/rest/users/ssh-signing-keys#delete-an-ssh-signing-key-for-the-authenticated-user)

```ts
github.users.deleteSshSigningKeyForAuthenticatedUser(input: {
  /** The unique identifier of the SSH signing key. */
  ssh_signing_key_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /user/ssh_signing_keys/{ssh_signing_key_id}` · `users/delete-ssh-signing-key-for-authenticated-user`</sub>

## `github.users.getSshSigningKeyForAuthenticatedUser`

Get an SSH signing key for the authenticated user — [API reference](https://docs.github.com/rest/users/ssh-signing-keys#get-an-ssh-signing-key-for-the-authenticated-user)

```ts
github.users.getSshSigningKeyForAuthenticatedUser(input: {
  /** The unique identifier of the SSH signing key. */
  ssh_signing_key_id: number;
}): Promise<SshSigningKey>
```

<sub>`GET /user/ssh_signing_keys/{ssh_signing_key_id}` · `users/get-ssh-signing-key-for-authenticated-user`</sub>

## `github.users.list`

List users — [API reference](https://docs.github.com/rest/users/users#list-users)

```ts
github.users.list(input: {
  /** A user ID. Only return users with an ID greater than this ID. */
  since?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /users` · `users/list`</sub>

## `github.users.getByUsername`

Get a user — [API reference](https://docs.github.com/rest/users/users#get-a-user)

```ts
github.users.getByUsername(input: {
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<PrivateUser | PublicUser>
```

<sub>`GET /users/{username}` · `users/get-by-username`</sub>

## `github.users.deleteAttestationsById`

Delete attestations by ID — [API reference](https://docs.github.com/rest/users/attestations#delete-attestations-by-id)

```ts
github.users.deleteAttestationsById(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** Attestation ID */
  attestation_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /users/{username}/attestations/{attestation_id}` · `users/delete-attestations-by-id`</sub>

## `github.users.listAttestations`

List attestations — [API reference](https://docs.github.com/rest/users/attestations#list-attestations)

```ts
github.users.listAttestations(input: {
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
}): Promise<{ attestations?: ({ bundle?: { mediaType?: string; verificationMaterial?: { [key: string]: unknown }; dsseEnvelope?: { [key: string]: unknown } }; repository_id?: number; bundle_url?: string; initiator?: string })[] }>
```

<sub>`GET /users/{username}/attestations/{subject_digest}` · `users/list-attestations`</sub>

## `github.users.listAttestationsBulk`

List attestations by bulk subject digests — [API reference](https://docs.github.com/rest/users/attestations#list-attestations-by-bulk-subject-digests)

```ts
github.users.listAttestationsBulk(input: {
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
}): Promise<{ attestations_subject_digests?: { [key: string]: ({ bundle?: { mediaType?: string; verificationMaterial?: { [key: string]: unknown }; dsseEnvelope?: { [key: string]: unknown } }; repository_id?: number; bundle_url?: string })[] | null | undefined }; page_info?: { has_next?: boolean; has_previous?: boolean; next?: string; previous?: string } }>
```

<sub>`POST /users/{username}/attestations/bulk-list` · `users/list-attestations-bulk`</sub>

## `github.users.deleteAttestationsBulk`

Delete attestations in bulk — [API reference](https://docs.github.com/rest/users/attestations#delete-attestations-in-bulk)

```ts
github.users.deleteAttestationsBulk(input: {
  /** The request body must include either `subject_digests` or `attestation_ids`, but not both. */
  body: { subject_digests: (string)[] } | { attestation_ids: (number)[] };
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`POST /users/{username}/attestations/delete-request` · `users/delete-attestations-bulk`</sub>

## `github.users.deleteAttestationsBySubjectDigest`

Delete attestations by subject digest — [API reference](https://docs.github.com/rest/users/attestations#delete-attestations-by-subject-digest)

```ts
github.users.deleteAttestationsBySubjectDigest(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** Subject Digest */
  subject_digest: string;
}): Promise<BasicError>
```

<sub>`DELETE /users/{username}/attestations/digest/{subject_digest}` · `users/delete-attestations-by-subject-digest`</sub>

## `github.users.listFollowersForUser`

List followers of a user — [API reference](https://docs.github.com/rest/users/followers#list-followers-of-a-user)

```ts
github.users.listFollowersForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /users/{username}/followers` · `users/list-followers-for-user`</sub>

## `github.users.listFollowingForUser`

List the people a user follows — [API reference](https://docs.github.com/rest/users/followers#list-the-people-a-user-follows)

```ts
github.users.listFollowingForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /users/{username}/following` · `users/list-following-for-user`</sub>

## `github.users.checkFollowingForUser`

Check if a user follows another user — [API reference](https://docs.github.com/rest/users/followers#check-if-a-user-follows-another-user)

```ts
github.users.checkFollowingForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  target_user: string;
}): Promise<unknown>
```

<sub>`GET /users/{username}/following/{target_user}` · `users/check-following-for-user`</sub>

## `github.users.listGpgKeysForUser`

List GPG keys for a user — [API reference](https://docs.github.com/rest/users/gpg-keys#list-gpg-keys-for-a-user)

```ts
github.users.listGpgKeysForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(GpgKey)[]>
```

<sub>`GET /users/{username}/gpg_keys` · `users/list-gpg-keys-for-user`</sub>

## `github.users.getContextForUser`

Get contextual information for a user — [API reference](https://docs.github.com/rest/users/users#get-contextual-information-for-a-user)

```ts
github.users.getContextForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** Identifies which additional information you'd like to receive about the person's hovercard. Can be `organization`, `repository`, `issue`, `pull_request`. **Required** when using `subject_id`. */
  subject_type?: "organization" | "repository" | "issue" | "pull_request";
  /** Uses the ID for the `subject_type` you specified. **Required** when using `subject_type`. */
  subject_id?: string;
}): Promise<Hovercard>
```

<sub>`GET /users/{username}/hovercard` · `users/get-context-for-user`</sub>

## `github.users.listPublicKeysForUser`

List public keys for a user — [API reference](https://docs.github.com/rest/users/keys#list-public-keys-for-a-user)

```ts
github.users.listPublicKeysForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(KeySimple)[]>
```

<sub>`GET /users/{username}/keys` · `users/list-public-keys-for-user`</sub>

## `github.users.listSocialAccountsForUser`

List social accounts for a user — [API reference](https://docs.github.com/rest/users/social-accounts#list-social-accounts-for-a-user)

```ts
github.users.listSocialAccountsForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SocialAccount)[]>
```

<sub>`GET /users/{username}/social_accounts` · `users/list-social-accounts-for-user`</sub>

## `github.users.listSshSigningKeysForUser`

List SSH signing keys for a user — [API reference](https://docs.github.com/rest/users/ssh-signing-keys#list-ssh-signing-keys-for-a-user)

```ts
github.users.listSshSigningKeysForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SshSigningKey)[]>
```

<sub>`GET /users/{username}/ssh_signing_keys` · `users/list-ssh-signing-keys-for-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
