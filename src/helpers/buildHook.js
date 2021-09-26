const processCss = require('./assetPipeline/styles.js');

module.exports = function(config) {
  // only process styles if not inside serverless function
  if (!process.env.ELEVENTY_SERVERLESS) {
    // run before build
    config.on('beforeBuild', () => { processCss() });
  }
}