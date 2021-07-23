// plugin for caching network request (makes reloads during development more performant and reduces api requests)
const Cache = require('@11ty/eleventy-cache-assets');
const fetch = require('node-fetch');

const baseURL = 'https://api.storyblok.com/v2/cdn/stories';
// the preview site is a seperate netlify site with NODE_ENV=preview set
const token =
  process.env.ELEVENTY_SERVERLESS
  ? `${process.env.storyblok_preview}&version=draft`
  : process.env.storyblok_public;

const cached_options = {
  // if in preview environment, set cache duration to 5s to always get fresh data, else, cache for 1 day
  duration: '1d',
  directory: '.cache',
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
async function fetchCachedPages(prefix) {
  const url = `${baseURL}?starts_with=${prefix}pages&token=${token}`;
  return Cache(url, cached_options);
}

async function fetchPages(prefix) {
  const url = `${baseURL}?starts_with=${prefix}pages&token=${token}`;
  const response = await fetch(url);
  return response.json();
}

module.exports = async function() {
  if (process.env.ELEVENTY_SERVERLESS) {
    let de = await fetchPages('');
    let en = await fetchPages('en/');
    return { en, de }
  } else {
    let de = await fetchCachedPages('');
    let en = await fetchCachedPages('en/');
    return { de, en };
  }
};
