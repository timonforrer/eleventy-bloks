//  options from .site.config.js
const site_config = require('@site_config');

module.exports = function(page_content) {
  // get page type
  const page_type = page_content.component;

  // get all toplevel blok names (directly inside content of a story)
  const toplevel_bloks = Object.keys(page_content);

  // get all nested blok names (inside content.body of a story)
  const nested_bloks = page_content.body.map(item => item.component);

  // merge blok names
  const bloks = [page_type, ...toplevel_bloks, ...nested_bloks];

  // get list of valid webcomponents
  const webcomponents = site_config.webcomponents.map(webcomponent => webcomponent.blok);

  // filter out valid blok names based on webcomponent list
  const filtered = bloks.filter(item => webcomponents.includes(item));

  // return sources
  return filtered.map(item => site_config.webcomponents[item]);
}