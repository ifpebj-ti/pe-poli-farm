import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:prettier/recommended',
      'prettier'
    ],
    plugins: ['eslint-plugin-import-helpers'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ],
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            ['/^react/', '/^next/', '/@next/'],
            '/components/',
            'module',
            '/^@shared/',
            '/absolute/',
            ['parent', 'sibling', 'index']
          ],
          alphabetize: { order: 'asc', ignoreCase: true }
        }
      ]
    }
  })
];

export default eslintConfig;
