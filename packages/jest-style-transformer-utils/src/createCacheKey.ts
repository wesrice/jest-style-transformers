import crypto from 'crypto';
import type { CacheKeyOptions } from '@jest/transform';
import type { Config } from '@jest/types';

type JestCacheKeyParams = {
  fileData: string;
  filePath: Config.Path;
  configStr: string;
  options: CacheKeyOptions;
};

export const createCacheKey = (
  jest: JestCacheKeyParams,
  additionalOptions = ['1'],
) => {
  const key = crypto
    .createHash('md5')
    .update('\0', 'utf8')
    .update(jest.fileData)
    .update('\0', 'utf8')
    .update(jest.filePath)
    .update('\0', 'utf8')
    .update(jest.configStr);

  additionalOptions.forEach((option) => {
    key.update('\0', 'utf8');
    key.update(option);
  });

  return key
    .update('\0', 'utf8')
    .update(jest.options.instrument ? 'instrument' : '')
    .digest('hex');
};
