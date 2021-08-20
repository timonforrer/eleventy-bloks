const sass = require('sass');
const postCss = require('postcss');

// postcss plugins
const postcssPresetEnv = require('postcss-preset-env');
const postCssImport = require('postcss-import');

const fs = require('fs-extra');

// get version of site for cache busting
const { version } = require('@site_config');

module.exports = function(config) {

  const processCss = () => {

    let result = sass.renderSync({
      file: 'src/styles/main.scss',
      sourceMap: false,
      outputStyle: 'compressed'
    });

    let css = result.css.toString();

    postCss([
      postcssPresetEnv,
      postCssImport
    ])
      .process(css, { from: 'src/styles/main.scss', to: `src/assets/bundled/${version}/css/main.css` })
      .then(result => {
        fs.outputFile(`src/assets/bundled/${version}/css/main.css`, result.css, err => {
          if (err) throw err;
          console.log("CSS optimized");
        });
      });
  }

  // check if not in inside serverless function
  if (!process.env.ELEVENTY_SERVERLESS) {
    // run before first build
    config.on('beforeBuild', () => processCss());
    // and before every watch
    config.on('beforeWatch', () => processCss())};
}