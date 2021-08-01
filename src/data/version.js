const { readdirSync } = require('fs');
const dir = readdirSync('./src/assets/bundled');

module.exports = dir[0].replace(/\./g, '-');
