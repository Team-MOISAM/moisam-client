import js from '@eslint/js'
import tseslintPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-hooks/rules-of-hooks': 'warn',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-extra-boolean-cast': 'warn',
      '@typescript-eslint/no-explicit-any': 'off', // `any` 타입 사용 허용
      '@typescript-eslint/no-unused-vars': 'warn', // 사용되지 않는 변수 경고
      'array-callback-return': 'off', // array-callback-return 규칙 끄기
      '@typescript-eslint/ban-ts-comment': 'off', // ts-comment 관련 규칙 끄기
    },
  },
]
