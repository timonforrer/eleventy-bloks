const webcomponents_paths = {
  // specify the path of the file, where each webcomponent gets defined (using `customElements.define`)
  'sp-music-player': '@spartan-components/sp-music-player/sp-music-player.js',
  'sp-video': '@spartan-components/sp-video-player/sp-video.js'
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
  // use storybloks key for creating these objects
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
    tracks: webcomponents_paths['sp-music-player']
  }
}
