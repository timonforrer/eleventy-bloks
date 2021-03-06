const slugify = require('slugify');

module.exports = {
  // tags: 'social_images',
  eleventyComputed: {
    permalink:  data => `${data.routes[data.pdata.lang_key][data.pdata.full_slug].path}/index.html`,
    social_image: data => slugify(`${data.lang}-${data.title}`).toLowerCase()
  }
}
