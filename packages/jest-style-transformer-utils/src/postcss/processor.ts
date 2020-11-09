import crossSpawn from 'cross-spawn';

export const processor = (
  src: string,
  filename: string,
  postcssConfigPath?: string,
) => {
  const postcssRunner = `${__dirname}/runner.js`;

  const script = `
    const { runner } = require("${postcssRunner}");
    runner(
      ${JSON.stringify({
        src,
        filename,
        // config,
        // options
      })},
      "${postcssConfigPath}"
    )
      .then(out => { console.log(JSON.stringify(out)) });
  `;

  const result = crossSpawn.sync('node', ['-e', script]);

  const error = result.stderr.toString();
  if (error) {
    throw error;
  }

  let css;
  let tokens;
  try {
    const parsed = JSON.parse(result.stdout.toString());
    css = parsed.css;
    tokens = parsed.tokens;
    if (Array.isArray(parsed.warnings)) {
      parsed.warnings.forEach((warning: string) => {
        console.warn(warning);
      });
    }
  } catch (e) {
    console.error(result.stderr.toString());
    console.log(result.stdout.toString());
    return `
      console.error("transform-css: Failed to load '${filename}'");
      module.exports = {};
    `;
  }

  return `
    const { recorders } = require("jest-style-transformer-utils");
    recorders.styles.set(${JSON.stringify(css)});
    module.exports = ${JSON.stringify(tokens)};
  `;
};
