import globals from 'globals';
import js from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  daStyle,
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
