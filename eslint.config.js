import angular from 'angular-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  /* ============================================================
   * Base JS
   * ============================================================ */
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
  },

  /* ============================================================
   * TypeScript / Angular
   * ============================================================ */
  {
    files: ['**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
      prettierConfig, // ⬅ disables conflicting ESLint rules
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      /* Prettier as ESLint */
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          printWidth: 100,
          trailingComma: 'all',
          endOfLine: 'auto',
        },
      ],
      /* Optional Angular rules */
      '@angular-eslint/component-selector': ['error', { type: 'element', style: 'kebab-case' }],
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', style: 'camelCase' }],
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'never'],
    },
  },

  /* ============================================================
   * Angular Templates
   * ============================================================ */
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, prettierConfig],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
]);
