const {
  createCacheKey,
  postcssProcessor,
} = require('jest-style-transformer-utils');

const TRANSFORM_VERSION = '1';
const configPath = `./node_modules/jest-style-transformer-sass-css-modules/.postcssrc.js`;

module.exports = {
  getCacheKey: (source, path, options) =>
    createCacheKey(
      {
        source,
        path,
        options,
      },
      [TRANSFORM_VERSION],
    ),

  process: (src, filename) => postcssProcessor(src, filename, configPath),
};
