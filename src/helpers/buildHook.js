const processCss = require('./assetPipeline/styles.js');
const socialImages = require('./assetPipeline/socialImages.js');

module.exports = function(config) {

  // variable to check if first run or not
  let firstRun = true;

  // function to modify firstRun value
  const afterFirstRun = () => { firstRun = false };

  // only process styles if not inside serverless function
  if (!process.env.ELEVENTY_SERVERLESS) {
    // run before build
    config.on('beforeBuild', () => { processCss() });
    config.on('afterBuild', () => {
      // only generate images if it's the first run
      if(firstRun) socialImages();
      // trigger function to modify first run value
      afterFirstRun();
    });
  }
}