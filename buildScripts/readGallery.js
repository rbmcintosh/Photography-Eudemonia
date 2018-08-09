var readDir = require('readdir');

var files = readDir.readSync('./src/static/images/gallery/', ['**.jpg']);

console.log(files);
