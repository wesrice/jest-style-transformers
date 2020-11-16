module.exports = {
  transform: {
    '^.+\\.js(x)?$': ['babel-jest'],
    '^.+\\.module\\.css$': 'jest-style-transformer-css-modules',
  },
};
