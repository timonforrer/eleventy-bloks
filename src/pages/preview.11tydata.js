// helper to resolve links
// const filterWebcomponents = require('../../helpers/getWebcomponents.js');

module.exports = {
  permalink: {
    dynamic: '/preview/*/'
  },
  eleventyComputed: {
    merged_pages: data => {
      // declare dependencies
      data.pages;
      const all_pages_array = [...data.pages.de.stories, ...data.pages.en.stories];
      if (Object.keys(all_pages_array[0]).length > 0) {
        const all_pages_object = {};
        for (page of all_pages_array) {
          all_pages_object[page.full_slug] = page;
        }
        return all_pages_object;
      } else {
        return
      }
    },
    // webcomponents: data => filterWebcomponents(data.pdata.content)
  }
}
