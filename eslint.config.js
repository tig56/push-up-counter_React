import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      "prettier/prettier": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: [
      "js/recommended",
      ...pluginReact.configs.flat.recommended,
      prettierConfig,
    ],
  },
]);
