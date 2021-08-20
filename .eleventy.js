const path = require('path');
const alias = require('module-alias');
const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy');

// custom options can be required via @site_config
// inspired by twelvety
// https://github.com/gregives/Twelvety
alias.addAlias('@site_config', path.join(__dirname, 'site.config.js'));

// requiring options from @siteConfig
const site_config = require('@site_config');

// getting all filters from single index.js file inside `helpers/filter` folder
const addFilters = require('./src/helpers/filters');

// wire up scss processing
const addStyleProcessor = require('./src/helpers/styles.js');

module.exports = function(config) {

  // copy over compiled js and css
  config.addPassthroughCopy({'./src/assets/bundled': 'assets'})

  config.addWatchTarget('./src/asset/bundled');
  config.addWatchTarget('./src/styles');

  // hooking up our filters to the config
  addFilters(config);

  // same for styles
  addStyleProcessor(config);

  // config for serverless plugin, used for previews
  config.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'dynamic',
    inputDir: './src/',
    functionsDir: './netlify/functions',
    copy: [
      { from: '.cache', to: 'cache' },
      './site.config.js',
      './src/helpers/',
      './src/pages/',
      './src/assets/',
      './package.json'
    ]
  });

  return {
    templateFormats: ['njk'],
    dir: site_config.dir
  }
}
