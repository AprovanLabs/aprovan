export type CredentialsOperations = {
  /**
   * Revoke a list of credentials
   * @see https://docs.github.com/rest/credentials/revoke#revoke-a-list-of-credentials
   */
  revoke: (input: {
    /** A list of credentials to be revoked, up to 1000 per request. */
    credentials: (string)[];
  }) => Promise<{ [key: string]: unknown }>;
};
