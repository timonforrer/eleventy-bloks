const webcomponents = [
  {
    name: 'sp-music-player.js',
    blok: 'tracks',
    src: '@spartan-components/sp-music-player/sp-music-player.js'
  },
  {
    name: 'sp-video.js',
    blok: 'youtube_video',
    src: '@spartan-components/sp-video/sp-video.js'
  },
  {
    name: 'spartan-test.js',
    blok: 'rich_text',
    src: './src/webcomponents/spartan-test/spartan-test.js'
  }
]

const scripts = [
  {
    name: 'sentry.js',
    // load: 'async',
    src: './src/scripts/sentry'
  }
]

module.exports = {
  // eleventy directories
  dir: {
    data: 'data',
    input: 'src',
    includes: 'includes',
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
  webcomponents: webcomponents,
  scripts: scripts,
}
