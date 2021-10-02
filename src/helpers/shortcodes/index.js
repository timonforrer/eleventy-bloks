module.exports = function(config) {
  // add shortcodes to eleventy config
  config.addNunjucksAsyncShortcode('image', require('./responsiveImage.js'))
}
