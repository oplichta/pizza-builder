// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
    {
        files: ['**/*.ts'],
        extends: [eslint.configs.recommended, tseslint.configs.recommended, tseslint.configs.stylistic, angular.configs.tsRecommended],
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'warn',
                {
                    type: 'element',
                    prefix: [],
                    style: 'kebab-case',
                },
            ],
            '@angular-eslint/prefer-inject': 'warn', // TODO: constructor DI is used throughout the app (11+ components) — migrating to inject() is a separate architectural pass, not part of this cleanup round
            '@typescript-eslint/no-explicit-any': 'warn', // TODO: mix of legitimate third-party/test-double `any` (Mapbox types, test action stubs) and real shortcuts — narrowing all of them isn't a single-step job
        },
    },
    {
        files: ['**/*.html'],
        extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
        rules: {},
    },
]);
