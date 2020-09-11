module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        '@nuxtjs',
        'plugin:nuxt/recommended',
        'plugin:vue/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        parser: 'babel-eslint',
    },
    overrides: [
        {
            files: ['**/*.vue'],
            rules: {
                indent: 0,
            },
        },
    ],
    rules: {
        indent: ['error', 4],
        'no-console': 0,
        'linebreak-style': ['error', 'unix'],
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'always-multiline'],
        'vue/require-v-for-key': 0,
        'vue/require-default-prop': 0,
        'vue/no-v-html': 0,
        'vue/valid-v-for': 0,
        'vue/max-attributes-per-line': 0,
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, {
            baseIndent: 1,
        }],
        'vue/no-unused-vars': 0,
        'vue/html-self-closing': 0,
    },
};
