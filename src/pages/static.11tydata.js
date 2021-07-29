// helper to resolve links
// const resolveLink = require('../helpers/linkResolver.js');

module.exports = {
  eleventyComputed: {
    permalink:  data => `${data.routes[data.pdata.lang_key][data.pdata.full_slug]}/index.html`
  }
}
