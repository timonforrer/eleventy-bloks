module.exports = {
  // eleventy directories
  dir: {
    data: 'data',
    input: 'src',
    includes: 'components',
    layouts: 'layouts',
    output: 'dist'
  },

  // these use storyblok keys
  languages: {
    default: {
      key: 'de',
      prefix: ''
    },
    en: {
      key: 'en',
      prefix: '/en'
    }
  }
}
