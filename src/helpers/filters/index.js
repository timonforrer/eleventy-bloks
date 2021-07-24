// here you can require all your filters in order to expose them to the eleventy config
const renderRichText = require('./renderRichText.js');
const transformDate = require('./transformDate.js')

module.exports = function(config) {
  // expose the filter to the eleventy config
  config.addFilter('transformDate', transformDate);
  config.addFilter('renderRichText', renderRichText);
}
