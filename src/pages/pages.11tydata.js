// utility to check if any webcomponents on page
const filterWebcomponents = require('../helpers/getWebcomponents.js');

module.exports = {
  layout: 'base.njk',
  eleventyComputed: {
    title: data => data.pdata.content.meta_tags[0]?.title,
    lang: data => data.pdata.lang_key,
    webcomponents: data => filterWebcomponents(data.pdata.content)
  }
}
