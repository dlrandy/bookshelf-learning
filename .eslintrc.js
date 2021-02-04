const path = require('path');

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'prettier/react',
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        requireConfigFile: false,
    },
    settings: {
        // 'import/parsers': {
        //     espree: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        // },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
            alias: {
                map: [['@FE', path.resolve(__dirname, 'src', 'FrontEnd')]],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        },
    },
    plugins: ['@babel', 'prettier', 'react'],
    rules: {
        'prettier/prettier': ['error'],
        'import/no-dynamic-require': 0,
        'import/no-unused-modules': 0,
        'global-require': 0,
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: false,
                peerDependencies: false,
            },
        ],
        'import/prefer-default-export': 0,
    },
};
