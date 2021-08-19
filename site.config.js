// get version from package.json
let { version } = require('./package.json');
// replace dots with dashes, so it can be used for folder names
version = version.replace(/\./g, '-');

// specify the path of the files, where each webcomponent gets defined (using `customElements.define`)
// use the tag name of the component as the key
const webcomponents_paths = {
  'sp-music-player': '@spartan-components/sp-music-player/sp-music-player.js',
  'sp-video': '@spartan-components/sp-video/sp-video.js'
}

module.exports = {
  // eleventy directories
  dir: {
    data: 'data',
    input: 'src',
    includes: 'components',
    layouts: 'layouts',
    output: 'dist'
  },
  // define language url prefixes
  // use storybloks key as object keys
  languages: {
    default: {
      key: 'de',
      urlPrefix: '',
      fetchPrefix: ''
    },
    en: {
      key: 'en',
      urlPrefix: '/en',
      fetchPrefix: 'en/'
    }
  },
  // bloks in storyblok can require a webcomponent to be loaded
  // for each blok, create a configuration object
  // use the storyblock technical name as key, followed by the path of the webcomponent in question
  webcomponents: {
    youtube_video: webcomponents_paths['sp-video'],
    tracks: webcomponents_paths['sp-music-player'],
    storage: webcomponents_paths['app-localstorage-document']
  },
  
  // return the package version for cache busting of assets
  version: version
}
