// helper to resolve links
const resolveLink = require('../helpers/linkResolver.js');

module.exports = {
  layout: "base.njk",
  eleventyComputed: {
    permalink: (data) => {
      const {
        pages: all_pages,
        pdata: page_to_open
      } = data;

      // appearantly, this also gets called when data not ready
      if (Object.keys(all_pages).length > 0)  {
        return resolveLink(page_to_open, all_pages);
      } else {
        return
      }
    },
    title: data => data.pdata.content.meta_tags[0]?.title,
  }
}
