// helper to resolve links
const resolveLink = require('../helpers/linkResolver.js');

module.exports = {
  eleventyComputed: {
    permalink: data => {
      // apparently, this also gets called when data not ready, so check if any pages available
      if (Object.keys(data.pages).length > 0)  {
        return resolveLink(data.pdata, data.pages)
      } else {
        return
      }
    }
  }
}
