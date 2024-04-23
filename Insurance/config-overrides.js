const path = require('path');

module.exports = function override(config, env) {
  // Add the necessary resolve.fallback configuration
  config.resolve.fallback = { "assert": require.resolve("assert/") };

  return config;
};
