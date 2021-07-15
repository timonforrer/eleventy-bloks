const Cache = require('@11ty/eleventy-cache-assets');

module.exports = async function() {
  // the preview site is a seperate netlify site with NODE_ENV=preview
  const token = process.env.NODE_ENV == 'preview' ? process.env.storyblok_preview : process.env.storyblok_public;
  const query = `starts_with=pages/`;
  const url = `https://api.storyblok.com/v2/cdn/stories?${query}&token=${token}`;

  const options = {
    // if in preview environment, set cache duration to 5s to always get fresh data
    duration: process.env.NODE_ENV == 'preview' ? '5s' : '1d',
    type: 'json',
    fetchOptions: {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  }

  return Cache(url, options);
}
