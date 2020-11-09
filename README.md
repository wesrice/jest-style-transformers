# Jest Style Transformers

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Testing component styles via Jest is a bit tricky. Jest utilizes
[JSDom](https://github.com/jsdom/jsdom), "a pure-JavaScript implementation of
many web standards, notably WHATWG DOM and HTML Standards" as a test
environment. For most, this implementation is sufficient. However, inspecting or
rendering component styles can be a bit tricky, depending on your styling method
of choice.

If your project's components utilize inline styles, or even some implementations
of CSS-in-JS (Emotion), component styles will be accessible in the JSDOM test
environment. Other styling methodologies – such as CSS imports, CSS Modules,
Sass, Less, etc – typically require a build tool like WebPack to collect,
bundle, and process these files. Jest is agnostic to the output of these tools.

This repo is home to a collection of Jest transformers that aim to solve this
problem, allowing users to retrieve component styles for inspection, rendering,
or whatever else you'd like to do with the styles.

## Supported Styling Methods

| CSS technique                                          | Supported |
| ------------------------------------------------------ | --------- |
| Inline Styles                                          | n/a       |
| CSS stylesheets                                        | ⬜        |
| Sass stylesheets                                       | ✅        |
| CSS Modules                                            | ⬜        |
| [Emotion](https://emotion.sh)                          | n/a       |
| [Styled Components](https://www.styled-components.com) | ⬜       |

## Inspiration
Shoutout to [React Screenshot Test](https://github.com/fwouts/react-screenshot-test)
for the prior art.
