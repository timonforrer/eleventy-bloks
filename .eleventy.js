const path = require('path');
const alias = require('module-alias');
const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy');

// custom options can be required via @site_config
// inspired by twelvety
// https://github.com/gregives/Twelvety
alias.addAlias('@site_config', path.join(__dirname, 'site.config.js'));

// requiring options from @siteConfig
const site_config = require('@site_config');

// getting all filters and shortcodes from respecting index.js files inside `helpers` folder
const addFilters = require('./src/helpers/filters');
const addShortcodes= require('./src/helpers/shortcodes');

// getting build hooks e.g. for asset processing (css)
const addBuildHook = require('./src/helpers/buildHook.js');

module.exports = function(config) {

  // copy over compiled js and css
  config.addPassthroughCopy({'./src/includes/_bundles': 'bundles'});

  // watch these files for changes and rebuild site on change
  config.addWatchTarget('./src/styles');
  
  // hooking up filters and shortcodes to the config
  addFilters(config);
  addShortcodes(config);
  // hooking up build hooks, used for css generation
  addBuildHook(config);

  // config for serverless plugin, used for previews
  config.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'dynamic',
    inputDir: './src/',
    functionsDir: './netlify/functions',
    redirects: false,
    copy: [
      './site.config.js',
      './src/helpers/',
      './src/pages/',
      './src/includes/_bundles/',
      './package.json'
    ]
  });

  // return config
  return {
    templateFormats: ['njk'],
    dir: site_config.dir
  }
}
