module.exports = {
	settings: {
		react: {
			version: 'detect',
		},
	},
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'prettier',
		'plugin:prettier/recommended',
	],
	/*
	 * "off" || 0    ==>  disabled rule
	 * "warn" || 1   ==>  warning（not effect）
	 * "error" || 2  ==>  throw an error（effect）
	 */
	rules: {
		// eslint
		'no-var': 'error',
		'no-multiple-empty-lines': ['error', { max: 1 }],
		'prefer-const': 'off',
		'no-irregular-whitespace': 'off',
		'react/display-name': 'off',

		// typeScript (https://typescript-eslint.io/rules)
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',

		// react (https://github.com/jsx-eslint/eslint-plugin-react)
		'react-hooks/rules-of-hooks': 'off',
		'react-hooks/exhaustive-deps': 'off',
	},
};
