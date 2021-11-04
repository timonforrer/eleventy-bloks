const htmlmin = require("html-minifier");

const minifyHTML = (content, outputPath) => {
  if (outputPath && outputPath.endsWith(".html")) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    });
    return minified;
  }
  return content;
};

module.exports = minifyHTML;
