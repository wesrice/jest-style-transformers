import crypto from 'crypto';
import type { TransformOptions } from '@jest/transform';
import type { Config } from '@jest/types';

export const createCacheKey = (
  jest: {
    source: string;
    path: Config.Path;
    options: TransformOptions<unknown>;
  },
  additionalOptions = ['1'], // useful for forcing cache busting
) => {
  const key = crypto
    .createHash('md5')
    .update('\0', 'utf8')
    .update(jest.source)
    .update('\0', 'utf8')
    .update(jest.path)
    .update('\0', 'utf8')
    .update(jest.options.configString);

  additionalOptions.forEach((additionalOption) => {
    key.update('\0', 'utf8');
    key.update(additionalOption);
  });

  return key
    .update('\0', 'utf8')
    .update(jest.options.instrument ? 'instrument' : '')
    .digest('hex');
};
