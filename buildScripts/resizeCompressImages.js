const {execFile} = require('child_process');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const resizeImage = require('resize-image');

var img = new Image('/src/static/images/gallery/raw/india/INDIA1.jpg');
img.src = '/src/static/images/gallery/raw/india/INDIA1.jpg';

img.onload= function () {
  var data = resizeImage.resize(img, 200, 100, resizeImage.PNG);
  console.log(data);
};

// imagemin(['images/*.{jpg,png}'], 'build/images', {
//     plugins: [
//       imageminMozjpeg()
//     ]
// }).then(files => {
//     console.log(files);
//     //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
// });
