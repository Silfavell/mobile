// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        'react-native/react-native': true,
        es2020: true,
        jest: true
    },
    parser: 'babel-eslint',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings'
        // 'plugin:import/typescript'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        },
        ecmaVersion: 11,
        sourceType: 'module'
    },
    plugins: [
        'react',
        'react-native',
        // 'react-hooks', // TODO
        'prettier'
    ],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
        'comma-dangle': [2, 'never'],
        semi: [2, 'never'],
        'jsx-quotes': [2, 'prefer-single'],
        'newline-before-return': 2,

        'react-native/no-unused-styles': 2,
        'react-native/split-platform-components': 2,
        'react-native/no-inline-styles': 2,
        'react-native/no-color-literals': 2,
        // 'react-native/no-raw-text': 2,

        'react/prop-types': 'off', // TODO will open when use typescript
        'react/display-name': 'off',
        'prettier/prettier': 'error',
        'import/order': [
            'error',
            {
                'groups': ['builtin', 'external', 'internal'],
                'pathGroups': [
                    {
                        'pattern': 'react',
                        'group': 'external',
                        'position': 'before'
                    }
                ],
                'pathGroupsExcludedImportTypes': ['react'],
                'newlines-between': 'always',
                'alphabetize': {
                    'order': 'asc',
                    'caseInsensitive': true
                }
            }
        ]
    },
    settings: {
        react: {
            version: 'detect'
        },
        'import/ignore': ['react-native']
    }
}
