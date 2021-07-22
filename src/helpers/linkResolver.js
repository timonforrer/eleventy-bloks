// helper to filter all records and get the start page of the same parent folder
function getStartpageByParentID(parent_id) {
  return function(element) {
    return element.parent_id === parent_id && element.is_startpage;
  };
}

module.exports = function(page_to_open, all_pages) {
  const {
    lang,
    is_startpage,
    parent_id,
    content
  } = page_to_open;

  // add a prefix to english pages
  // todo: move to main config
  // https://airtable.com/tblivIzB2r25Uj5rA/viw3P1STrFCXN6Gb6/recEgn0nOCMfnL4kw
  const prefix =
    lang === 'en'
    ? '/en'
    : '';

  const language_map = {
    'default': 'de',
    'en': 'en'
  };

  // if not a startpage, get custom_slug from the startpage of the same root
  const parent_slug =
    ! is_startpage
    ? `/${all_pages[language_map[lang]].stories.filter(getStartpageByParentID(parent_id))[0].content.meta_tags[0].custom_slug}`
    : '';

  let { custom_slug } = content.meta_tags[0];

  // for all slugs other than '/', prepend '/'
  // if custom_slug only '/', replace with empty string
  custom_slug =
    custom_slug !== '/'
    ? `/${custom_slug}`
    : '';

  return `${prefix}${parent_slug}${custom_slug}/index.html`;
}