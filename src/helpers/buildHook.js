module.exports = function(config) {
  // only process styles if not inside serverless function
  if (!process.env.ELEVENTY_SERVERLESS) {
    const processCss = require('../styles/index.js');
    // run before build
    config.on('beforeBuild', () => { processCss() });
  }
}
