const fetchFromStoryblok = require('../helpers/fetchFromStoryblok.js');

module.exports = async function() {
  const { space } = await fetchFromStoryblok('', true);
  return space
}
