import { nodeResolve } from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals'
import { terser } from 'rollup-plugin-terser';


// get webcomponents and version
let { webcomponents, version } = require('./site.config.js');
// turn webcomponents object into array of paths
webcomponents = Object.values(webcomponents);

export default {
  // input array of webcomponents, to make use of automatic tree shaking
  input: webcomponents,
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
