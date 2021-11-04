// plugins
import minifyHTML from 'rollup-plugin-minify-html-literals'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import outputManifest from 'rollup-plugin-output-manifest';
import { terser } from 'rollup-plugin-terser';

// get webcomponents and scripts config objects
let { webcomponents, scripts } = require('./site.config.js');
// turn objects into array of paths
webcomponents = webcomponents.map(webcomponent => webcomponent.src);
scripts = scripts.map(script => script.src);

export default {
  // input array of webcomponents, to make use of automatic tree shaking
  input: [ ...webcomponents, ...scripts],
  output: {
    dir: `src/includes/_bundles/`,
    assetFileNames: '[name]-[hash].js',
    entryFileNames: '[name]-[hash].js',
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    minifyHTML(),
    terser(),
    outputManifest({
      fileName: '_js.json',
      publicPath: '/bundles/'
    })
  ],
  watch: {
    include: '.site.config.js'
  }
}
