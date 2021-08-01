let { version } = require('../../package.json');
module.exports = version.replace(/\./g, '-');
