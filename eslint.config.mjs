import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsEslintParser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import prettierRecommended from 'prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,

  recommendedConfig: js.configs.recommended,

  allConfig: js.configs.all
});

export default defineConfig([
  eslintPluginPrettierRecommended,

  {
    extends: compat.extends(
      'next',
      'next/core-web-vitals',
      'next/typescript',
      'eslint:recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:import/react',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended'
    ),
    plugins: {
      react: pluginReact
      // prittier: prettierRecommended
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        ecmaFeatures: {
          globalReturn: true, // Allow return statements in the global scope
          impliedStrict: true, // Enable global strict mode
          jsx: true // Enable JSX syntax
        }
      }
    },

    rules: {
      'linebreak-style': ['error', process.platform === 'win32' ? 'unix' : 'unix'],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ]
    }
  }
]);
