const sass = require('sass');
const postCss = require('postcss');
const crypto = require('crypto');

// postcss plugins
const postcssPresetEnv = require('postcss-preset-env');
const postCssImport = require('postcss-import');

const fs = require('fs-extra');

module.exports = function() {

  const processCss = () => {

    let result = sass.renderSync({
      file: 'src/styles/main.scss',
      sourceMap: false,
      outputStyle: 'compressed'
    });

    let css = result.css.toString();

    const hash = crypto.createHash('md5').update(css).digest('hex');
    const filename = `main-${hash}.css`
    const manifest = JSON.stringify({ filename: filename });

    postCss([
      postcssPresetEnv,
      postCssImport
    ])
      .process(css, { from: undefined })
      .then(result => {
        fs.outputFile(`src/includes/_bundles/${filename}`, result.css, err => {
          if (err) throw err;
          console.log('CSS optimized');
        });
        fs.outputFile(`src/includes/_bundles/_css.json`, manifest, err => {
          if (err) throw err;
        });
      });
  }

  return processCss();
}
