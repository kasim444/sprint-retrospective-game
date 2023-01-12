module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:@typescript-eslint/all',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react',
    '@typescript-eslint',
    "eslint-comments",
    "import",
    "prettier",
    "promise",
    "regexp",
  ],
  project: './tsconfig.eslint.json',
  rules: {
  }
}
