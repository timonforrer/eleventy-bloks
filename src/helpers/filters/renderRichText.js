const RichtextResolver = require('storyblok-js-client/dist/rich-text-resolver.cjs');
const resolver = new RichtextResolver();

module.exports = function(input) {
  return resolver.render(input);
}
