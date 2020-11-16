const cssModules = require('postcss-modules');

const { recorders } = require('jest-style-transformer-utils');

module.exports = {
  plugins: [
    cssModules({
      generateScopedName: '[name]--[local]--[hash:base64:5]',
      getJSON: (_, exportedTokens) => {
        recorders.tokens.set(exportedTokens);
      },
    }),
  ],
};
