
module.exports = {
  eleventyComputed: {
    permalink: {
      dynamic: data => {
        // apparently, this also gets called when data not ready, so check if any pages available
        if (Object.keys(data.pages).length > 0)  {
          return '/preview/*/'
        } else {
          return
        }
      }
    }
  }
}
