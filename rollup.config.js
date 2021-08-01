import { nodeResolve } from '@rollup/plugin-node-resolve';

// get version from package.json – used for cache busting
let { version } = require('./package.json');
version = version.replace(/\./g, '-');

let { webcomponents } = require('./site.config.js');
webcomponents = Object.values(webcomponents);

export default {
  input: webcomponents,
  output: {
    dir: `src/assets/bundled/${version}/js`,
    format: 'es'
  },
  plugins: [nodeResolve()]
}
