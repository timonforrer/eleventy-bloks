// getting all filters from single index.js file inside `helpers/filter` folder
const addFilters = require('./src/helpers/filters');

module.exports = function(config) {

  // hooking up our filters to the config
  addFilters(config);

  return {
    // if you want to use other templating languages other than liquid, add them to the array.
    templateFormats: ['njk'],
    dir: {
      data: 'data',
      input: 'src',
      includes: 'components',
      layouts: 'layouts',
      output: 'dist'
    }
  }
}
