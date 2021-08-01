const { readdirSync } = require('fs');
const dir = readdirSync('./src/assets/bundled');
console.log(readdirSync('.'));

module.exports = dir[0].replace(/\./g, '-');
