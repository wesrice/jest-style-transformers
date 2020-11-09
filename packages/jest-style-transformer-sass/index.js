const {
  createCacheKey,
  postcssProcessor,
} = require('jest-style-transformer-utils');

const TRANSFORM_VERSION = '1';
const configPath = `./node_modules/jest-style-transformer-sass/.postcssrc.js`;

module.exports = {
  getCacheKey: (fileData, filePath, configStr, options) =>
    createCacheKey(
      {
        fileData,
        filePath,
        configStr,
        options,
      },
      [TRANSFORM_VERSION],
    ),

  process: (src, filename) => postcssProcessor(src, filename, configPath),
};
