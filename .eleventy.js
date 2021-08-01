const path = require('path');
const alias = require('module-alias');
const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy')

// custom options can be required via @site_config
// inspired by twelvety
// https://github.com/gregives/Twelvety
alias.addAlias('@site_config', path.join(__dirname, 'site.config.js'));

// requiring options from @siteConfig
const site_config = require('@site_config');

// getting all filters from single index.js file inside `helpers/filter` folder
const addFilters = require('./src/helpers/filters');

module.exports = function(config) {

  // copy over compiled js and css
  config.addPassthroughCopy('./src/assets')
  config.addWatchTarget('./src/asset')
  

  // hooking up our filters to the config
  addFilters(config);

  config.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'dynamic',
    inputDir: './src/',
    functionsDir: './netlify/functions',
    copy: [
      { from: '.cache', to: 'cache' },
      './site.config.js',
      './src/helpers/',
      './src/pages/'
    ]
  })
  return {
    // if you want to use other templating languages other than liquid, add them to the array.
    templateFormats: ['njk'],
    dir: site_config.dir
  }
}
