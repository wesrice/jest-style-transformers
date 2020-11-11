const cssModules = require('postcss-modules');
const sass = require('@csstools/postcss-sass');

const { recorders } = require('jest-style-transformer-utils');

module.exports = {
  plugins: [
    cssModules({
      generateScopedName: '[path][local]-[hash:base64:10]',
      getJSON: (_, exportedTokens) => {
        recorders.tokens.set(exportedTokens);
      },
    }),
    sass,
  ],
};
