import globals from 'globals';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	prettier,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
		},
	},
	{
		// eslint currently cannot parse JSON import syntax `with { type: 'json }`
		ignores: ['node_modules', 'dist', 'e2e-tests/accessibility.spec.js'],
	},
];
