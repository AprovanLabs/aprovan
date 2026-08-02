export type EmojisOperations = {
  /**
   * Get emojis
   * @see https://docs.github.com/rest/emojis/emojis#get-emojis
   */
  get: () => Promise<{ [key: string]: string | undefined }>;
};
