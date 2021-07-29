const site_config = require('@site_config');
const fetchFromStoryblok = require('../helpers/fetchFromStoryblok.js');

// function to create object of pages with storyblok slug as key
// --> slug as key is useful for creating dynamic previews
const buildObject = function(raw_pages) {
  // placeholder object to hold all pages
  let pages_object = {};

  for (let page of raw_pages) {
    // create detached copy of page (otherwise the lang attribute gets modified on the original which causes an error)
    page = { ...page };
    // create lang_key (storyblok uses different values for `lang` instead of actual language)
    // in this case, `default` will be replaced with `de`
    page.lang_key = site_config.languages[page.lang].key;
    // add page to pages_object, set full_slug as key
    pages_object[page.full_slug] = page;
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
    const pages_by_lang = await fetchFromStoryblok(`${fetchPrefix}pages`);
    // add to array
    raw_pages.push(...pages_by_lang.stories);
  }

  // return pages object
  return buildObject(raw_pages);
}
