module.exports = {
  overrides: [
    {
      extends: ['plugin:react/recommended'],
      files: ['*.js', '*.jsx'],
      parser: 'babel-eslint',
      parserOptions: {
        sourceType: 'module',
      },
      plugins: ['react'],
    },
  ],
};
