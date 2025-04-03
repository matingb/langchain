import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "import": importPlugin
    },
    rules: {
      "import/no-cycle": "error",
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
];
