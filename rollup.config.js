import { nodeResolve } from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals'
import { terser } from 'rollup-plugin-terser';

// get webcomponents and version
let { webcomponents, version } = require('./site.config.js');
// turn webcomponents object into array of paths
webcomponents = webcomponents.map(webcomponent => webcomponent.src);

// get custom js scripts
let { scripts } = require('./site.config.js');
scripts = scripts.map(script => script.src);

export default {
  // input array of webcomponents, to make use of automatic tree shaking
  input: [ ...webcomponents, ...scripts],
  output: {
    // specify output folder using site version
    dir: `src/assets/bundled/${version}/js`,
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    minifyHTML(),
    terser()
  ]
}
