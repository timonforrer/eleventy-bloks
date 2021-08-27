// here you can require all your filters in order to expose them to the eleventy config
const getYoutubeID = require('./getYoutubeID.js');
const removeDoubleSlashes = require('./removeDoubleSlashes.js');
const renderRichText = require('./renderRichText.js');
const transformDate = require('./transformDate.js')

module.exports = function(config) {
  // expose the filter to the eleventy config
  config.addFilter('getYoutubeID', getYoutubeID);
  config.addFilter('removeDoubleSlashes', removeDoubleSlashes);
  config.addFilter('transformDate', transformDate);
  config.addFilter('renderRichText', renderRichText);
}
