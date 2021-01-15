module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        'plugin:vue/essential',
        // '@vue/standard'       //很重要一定要注释掉
    ],

    parserOptions: {
        parser: 'babel-eslint'
    },

    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'space-before-function-paren': 0
    },

    'extends': [
      'plugin:vue/essential'
    ]
}