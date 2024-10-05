import globals from "globals"
import pluginJs from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintJest from "eslint-plugin-jest"

export default [
  {
    rules: { semi: ["error", "always"] },
    languageOptions: { globals: globals.browser },
    plugins: { jest: eslintJest },
  },
  pluginJs.configs.recommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
]
