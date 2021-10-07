module.exports = function(config) {
  // add shortcodes to eleventy config
  config.addNunjucksAsyncShortcode('image', require('./images/genericImage.js'));
  config.addNunjucksAsyncShortcode('storyblok_image', require('./images/dynamicStoryblokImage.js'));
}
