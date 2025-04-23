// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
      'test/**/*',
      'components.d.ts',
    ],
  },
  {
    rules: {
      // overrides
      'no-template-curly-in-string': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': 'off',
      'regexp/no-super-linear-backtracking': 'off',
      'regexp/optimal-quantifier-concatenation': 'off',
      'ts/no-empty-object-type': 'off',
      'no-console': 'off',
      'no-restricted-globals': 'off',
      'style/indent-binary-ops': 'off',
      'regexp/no-misleading-capturing-group': 'off',
      'regexp/strict': 'off',
    },
  },
)
