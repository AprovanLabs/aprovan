import type { GitignoreTemplate } from "./schemas.js";

export type GitignoreOperations = {
  /**
   * Get all gitignore templates
   * @see https://docs.github.com/rest/gitignore/gitignore#get-all-gitignore-templates
   */
  getAllTemplates: () => Promise<(string)[]>;

  /**
   * Get a gitignore template
   * @see https://docs.github.com/rest/gitignore/gitignore#get-a-gitignore-template
   */
  getTemplate: (input: {
    name: string;
  }) => Promise<GitignoreTemplate>;
};
