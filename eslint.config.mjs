import baseConfig from './config/eslint-config/base.mjs';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import globals from 'globals';

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      tsdoc: tsdocPlugin,
    },
    rules: {
      'tsdoc/syntax': 'warn',
    },
  },
];
