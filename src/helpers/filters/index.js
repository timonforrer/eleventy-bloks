module.exports = function(config) {
  // add filters to the eleventy config
  config.addFilter('getYoutubeID', require('./getYoutubeID.js'));
  config.addFilter('parseJson', require('./parseJson.js'));
  config.addFilter('removeDoubleSlashes', require('./removeDoubleSlashes.js'));
  config.addFilter('renderRichText', require('./renderRichText.js'));
  config.addFilter('previewImageUrl', require('./storyblokPreviewImg.js'));
  config.addFilter('transformDate', require('./transformDate.js'));
}
