const { readdirSync } = require('fs');
const dir = process.env.ELEVENTY_SERVERLESS
  ? readdirSync('.netlify/functions/dynamic/src/assets/bundled')
  : readdirSync('./src/assets/bundled');
console.log(readdirSync('.'));


module.exports = dir[0].replace(/\./g, '-');
