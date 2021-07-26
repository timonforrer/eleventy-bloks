// plugin for caching network request (makes reloads during development more performant and reduces api requests)
const Cache = require('@11ty/eleventy-cache-assets');
const fetch = require('node-fetch');
const site_config = require('@site_config');

// function to fetch `stories` in a specific language from storyblok api
// prefix is used to specify the language
const fetchPage = async function(prefix) {
  const baseURL = 'https://api.storyblok.com/v2/cdn/stories';

  // if in serverless environment, use the preview token and set version=draft to get
  // unpublished stories
  const token =
    process.env.ELEVENTY_SERVERLESS
    ? `${process.env.storyblok_preview}&version=draft`
    : process.env.storyblok_public;

  const url = `${baseURL}?starts_with=${prefix}pages&token=${token}`;

  // if in serverless environment, use fresh data, otherwise get cached results
  if (process.env.ELEVENTY_SERVERLESS) {
    const response = await fetch(url);
    return response.json();
  } else {
    const response = await Cache(url, {
      duration: '1d',
      type: 'json'
    });
    return response;
  }
}

// function to create object of pages with storyblok slug as key
// --> slug as key is useful for creating dynamic previews
const buildObject = function(raw_pages) {
  // placeholder object to hold all pages
  let pages_object = {};

  for (let page of raw_pages) {
    // create detached copy of page (otherwise the lang attribute gets modified on the original which causes an error)
    let custom_page = { ...page };
    // create lang_key (storyblok uses different values for `lang` instead of actual language)
    // in this case, `default` will be replaced with `de`
    custom_page.lang_key = site_config.languages[page.lang].key;
    // add page to pages_object, set full_slug as key
    pages_object[custom_page.full_slug] = custom_page;
  }
  return pages_object;
}

module.exports = async function() {
  // get list of available languages and their configuration
  let { languages } = site_config;
  // placeholder array for fetched pages
  let raw_pages = [];

  // fetch content for all languages
  for (let lang in languages) {
    // get relevant config
    let { fetchPrefix } = languages[lang];
    // fetch with fetchPrefix set
    const pages_by_lang = await fetchPage(fetchPrefix);
    // add to array
    raw_pages.push(...pages_by_lang.stories);
  }

  // return pages object
  return buildObject(raw_pages);
}
