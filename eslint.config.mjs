import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["dist"],
  },
  ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    languageOptions: { globals: { ...globals.node }, parser: tsParser, ecmaVersion: "latest", sourceType: "module" },
    rules: {
      "@typescript-eslint/naming-convention": ["warn", { selector: "import", format: ["camelCase", "PascalCase"] }],
      eqeqeq: "warn",
      "no-throw-literal": "warn",
      semi: "off",
      "func-style": ["warn", "declaration"],
      "@typescript-eslint/explicit-function-return-type": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "lines-between-class-members": [
        "error",
        {
          enforce: [
            { blankLine: "never", prev: "field", next: "field" },
            { blankLine: "always", prev: "method", next: "method" },
          ],
        },
      ],
    },
  },
];
