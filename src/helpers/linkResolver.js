//  options from .site.config.js
const site_config = require('@site_config');

// helper to filter all records and get the start page of the same parent folder
function getStartpageByParentID(parent_id, lang) {
  return function(element) {
    return element.parent_id === parent_id && element.is_startpage && element.lang === lang;
  };
}

/**
 * 
 * @param {object} page_to_open The entire object of the page to open
 * @param {array} all_pages All pages of the site
 * @returns 
 */
module.exports = function(page_to_open, all_pages) {
  const {
    lang,
    is_startpage,
    parent_id,
    content
  } = page_to_open;

  const all_pages_array = Object.values(all_pages);

  // adding prefixes to all other languages except for the default lang
  const prefix = site_config.languages[lang].urlPrefix

  // if not a startpage, get custom_slug from the startpage of the same root
  const parent_slug =
    ! is_startpage
    ? `/${all_pages_array.filter(getStartpageByParentID(parent_id, lang))[0].content.meta_tags[0].custom_slug}`
    : '';

  let { custom_slug } = content.meta_tags[0];

  // for all slugs other than '/', prepend '/'
  // if custom_slug only '/', replace with empty string
  custom_slug =
    custom_slug !== '/'
    ? `/${custom_slug}`
    : '';

  let entire_path = `${prefix}${parent_slug}${custom_slug}/`;
  let clean_path = entire_path.replace(/(https?:\/\/)|(\/)+/g, "$1$2");

  return clean_path;
}