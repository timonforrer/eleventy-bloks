module.exports = {
  eleventyComputed: {
    permalink:  data => `${data.routes[data.pdata.lang_key][data.pdata.full_slug]}/index.html`
  }
}
