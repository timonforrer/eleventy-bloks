module.exports = {
  eleventyComputed: {
    permalink: {
      dynamic: ['/preview/*','/preview/*/']
    }
  }
}
