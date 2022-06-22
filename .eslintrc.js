/*
 * @Author: D.Y.M
 * @Date: 2021-10-19 15:24:52
 * @LastEditTime: 2022-03-23 19:29:02
 * @FilePath: /main/.eslintrc.js
 * @Description:
 */
module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  plugins: [
    'import',
  ],

  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true
  },

  rules: {
    // your rules
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-shadow": "off",
    "array-callback-return":"off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", ["parent", "sibling"], "type"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before"
          },
          {
            pattern: "@/**",
            group: "external",
            position: "after"
          }
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ]
  }
};
