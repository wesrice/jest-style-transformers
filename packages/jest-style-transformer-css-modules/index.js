const fs = require('fs');
const {
  createCacheKey,
  postcssProcessor,
} = require('jest-style-transformer-utils');

const configPath = `./node_modules/jest-style-transformer-css-modules/.postcssrc.js`;

// eslint-disable-next-line security/detect-non-literal-fs-filename
const CONFIG_FILE = fs.readFileSync(configPath);
const TRANSFORM_VERSION = '1';
// eslint-disable-next-line security/detect-non-literal-fs-filename
const THIS_FILE = fs.readFileSync(__filename);

module.exports = {
  getCacheKey: (source, path, options) =>
    createCacheKey(
      {
        source,
        path,
        options,
      },
      [CONFIG_FILE, TRANSFORM_VERSION, THIS_FILE],
    ),

  process: (src, filename) => postcssProcessor(src, filename, configPath),
};
