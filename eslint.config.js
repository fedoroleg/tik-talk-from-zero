const nx = require("@nx/eslint-plugin");

module.exports = [
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  {
    ignores: ["**/dist"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?js$"],
          depConstraints: [
            {
              sourceTag: "*",
              onlyDependOnLibsWithTags: ["*"],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],

    // Override or add rules here
    rules: {},
  },
  // {
  //   files: ["*.html"],
  //   extends: [
  //     "plugin:@angular-eslint/template/recommended",
  //     "plugin:@angular-eslint/template/accessibility",
  //   ],
  //   rules: {
  //     "@angular-eslint/template/click-events-have-key-events": ["off"],
  //   },
  // },
];
