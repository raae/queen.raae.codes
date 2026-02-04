import eslintPluginAstro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["dist/", "node_modules/", ".astro/", "content/"],
  },
  {
    languageOptions: {
      parser: tsParser,
    },
  },
  ...eslintPluginAstro.configs["flat/recommended"],
];
