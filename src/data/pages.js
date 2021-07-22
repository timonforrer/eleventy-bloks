// plugin for caching network request (makes reloads during development more performant and reduces api requests)
const Cache = require('@11ty/eleventy-cache-assets');

const baseURL = 'https://api.storyblok.com/v2/cdn/stories';
// the preview site is a seperate netlify site with NODE_ENV=preview set
const token = process.env.NODE_ENV == 'preview' ? process.env.storyblok_preview : process.env.storyblok_public;

const options = {
  // if in preview environment, set cache duration to 5s to always get fresh data, else, cache for 1 day
  duration: process.env.NODE_ENV == 'preview' ? '5s' : '1d',
  type: 'json',
  fetchOptions: {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }
}

// todo: dynamically fetching all pages based on languages in .site.config.js
// https://airtable.com/tblivIzB2r25Uj5rA/viw3P1STrFCXN6Gb6/recfkMpeCyW5Uq7BD

// function for retrieving content
async function fetchPages(prefix) {
  const url = `${baseURL}?starts_with=${prefix ?? ''}pages&token=${token}`;
  return Cache(url, options);
}

module.exports = async function() {
  let de = await fetchPages();
  let en = await fetchPages('en/');
  return { de, en };
};
