import postcss, { AcceptedPlugin, ProcessOptions } from 'postcss';
import postcssrc from 'postcss-load-config';

import * as tokenRecorder from '../recorders/tokens';

export const runner = (
  { src, filename }: { src: string; filename: string },
  postcssConfigPath: string,
): Promise<any> => {
  const ctx = {
    map: false,
    // To ensure that PostCSS generates source maps and displays better syntax
    // errors, runners must specify the from and to options. If your runner does
    // not handle writing to disk (for example, a gulp transform), you should
    // set both options to point to the same file"
    // https://github.com/postcss/postcss/blob/master/docs/guidelines/runner.md#21-set-from-and-to-processing-options
    from: filename,
    to: filename,
  };

  return postcssrc(ctx, process.cwd(), {
    searchPlaces: [postcssConfigPath],
  })
    .then(
      (config: any) => ({ ...config, plugins: config.plugins || [] }),
      (error: Error) => {
        // Support running without PostCSS cosmiconfig.
        if (error.message.startsWith('No PostCSS Config found in:')) {
          return { plugins: [], options: { from: filename, to: filename } };
        }
        throw error;
      },
    )
    .then((config: any) => {
      const { plugins, options } = config;

      return postcss(plugins as AcceptedPlugin[])
        .process(src, options as ProcessOptions)
        .then(
          (result: any) => ({
            css: result.css,
            tokens: tokenRecorder.get(),
            // Display result.warnings()
            // PostCSS runners must output warnings from result.warnings()
            // https://github.com/postcss/postcss/blob/master/docs/guidelines/runner.md#32-display-resultwarnings
            warnings: result.warnings().map((warn: any) => warn.toString()),
          }),

          // Don’t show JS stack for CssSyntaxError
          // PostCSS runners must not show a stack trace for CSS syntax errors,
          // as the runner can be used by developers who are not familiar with
          // JavaScript. Instead, handle such errors gracefully:
          // https://github.com/postcss/postcss/blob/master/docs/guidelines/runner.md#31-dont-show-js-stack-for-csssyntaxerror
          (error: any) => {
            if (error.name === 'CssSyntaxError') {
              process.stderr.write(error.message + error.showSourceCode());
            } else {
              throw error;
            }
          },
        )
        .finally(() => {
          tokenRecorder.reset();
        });
    });
};
