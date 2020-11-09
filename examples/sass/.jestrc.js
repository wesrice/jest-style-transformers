module.exports = {
  transform: {
    '^.+\\.js(x)?$': ['babel-jest'],
    '^.+\\.scss$': 'jest-style-transformer-sass',
  },
};
