module.exports = function(config) {
  // add shortcodes to eleventy config
  config.addTransform('minifyHTML', require('./minifyHTML.js'));
}
