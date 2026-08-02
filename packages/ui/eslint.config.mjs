import reactConfig from "../../config/eslint-config/react.mjs";

export default [
  ...reactConfig,
  {
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
];
