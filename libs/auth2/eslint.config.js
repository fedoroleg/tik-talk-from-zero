import { configs } from "@nx/eslint-plugin";
import baseConfig from "../../eslint.config.js";

export default [
  ...baseConfig,
  ...configs["flat/angular"],
  ...configs["flat/angular-template"],
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "lib",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "lib",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    // Override or add rules here
    rules: {},
  },
];
