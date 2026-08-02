import type { CodeOfConduct } from "./schemas.js";

export type CodesOfConductOperations = {
  /**
   * Get all codes of conduct
   * @see https://docs.github.com/rest/codes-of-conduct/codes-of-conduct#get-all-codes-of-conduct
   */
  getAllCodesOfConduct: () => Promise<(CodeOfConduct)[]>;

  /**
   * Get a code of conduct
   * @see https://docs.github.com/rest/codes-of-conduct/codes-of-conduct#get-a-code-of-conduct
   */
  getConductCode: (input: {
    key: string;
  }) => Promise<CodeOfConduct>;
};
