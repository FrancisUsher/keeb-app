/* config-overrides.js */
const { useBabelRc, addWebpackAlias, override } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    tinyqueue$: require.resolve('tinyqueue/tinyqueue.js'),
  })
);
