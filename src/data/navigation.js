// load helper to get storyblok content
const fetchFromStoryblok = require('../helpers/fetchFromStoryblok.js');
const site_config = require('@site_config');

const buildObject = function(raw_nav) {
  // placeholder object to hold nav
  let nav_object = {};

  for (let localised_nav of raw_nav) {
    // create detached copy of nav (otherwise the lang attribute gets modified on the original which causes an error)
    localised_nav = { ...localised_nav };
    // store language key for easy access
    const lang_key = site_config.languages[localised_nav.lang].key;
    // add nav items of localised nav to nav_object with language code as key 
    nav_object[lang_key] = localised_nav.content.items;
  }

  return nav_object;
}

module.exports = async function() {
  // get list of available languages and their configuration
  let { languages } = site_config;
  // placeholder array for fetched pages
  let raw_nav = [];

  // fetch content for all languages
  for (let lang in languages) {
    // get relevant config
    let { fetchPrefix } = languages[lang];
    // fetch with fetchPrefix set
    const nav_by_lang = await fetchFromStoryblok(`${fetchPrefix}nav`);
    // add to array
    raw_nav.push(...nav_by_lang.stories);
  }

  // return nav object
  return buildObject(raw_nav);
}
