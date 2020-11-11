module.exports = {
  transform: {
    '^.+\\.js(x)?$': ['babel-jest'],
    '^.+\\.module\\.scss$': 'jest-style-transformer-sass-css-modules',
  },
};
