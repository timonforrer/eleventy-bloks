const { readdirSync } = require('fs');

// cannot access package.json inside serverless function
// getting directory name using fs package
const dir = readdirSync('./src/assets/bundled');

module.exports = dir[0];
