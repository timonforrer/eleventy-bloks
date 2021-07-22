const path = require('path');
const alias = require('module-alias');

// custom options can be required via @site_config
// inspired by twelvety
// https://github.com/gregives/Twelvety
alias.addAlias('@site_config', path.join(__dirname, '.site.config'));

// requiring options from @siteConfig
const site_config = require('@site_config');

// getting all filters from single index.js file inside `helpers/filter` folder
const addFilters = require('./src/helpers/filters');

module.exports = function(config) {

  // hooking up our filters to the config
  addFilters(config);

  return {
    // if you want to use other templating languages other than liquid, add them to the array.
    templateFormats: ['njk'],
    dir: site_config.dir
  }
}
