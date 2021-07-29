const getPages = require('./pages.js');
const resolveLink = require('../helpers/linkResolver.js');
const site_config = require('@site_config');

module.exports = async function() {
  const obj_all_pages = await getPages();
  const languages = site_config.languages;
  let localised_routes = {};

  // setup language keys in object
  for (lang in languages) {
    const lang_data = languages[lang];
    localised_routes[lang_data.key] = {};
  }

  // iterate all pages, create real_path and return object with full_slug as key, and real_path as value
  for (page in obj_all_pages) {
    const page_data = obj_all_pages[page];
    const real_path = resolveLink(page_data, obj_all_pages);
    localised_routes[page_data.lang_key][page] = {
      id: page_data.id,
      path: real_path
    };
  }

  return localised_routes
}
