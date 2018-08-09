// import resizeImage from 'resize-image';

var divz = document.getElementsByClassName('image');

// for (var i=1; i<divz.length+1; i++) {

  // var img = new Image();

  var imageCompressor = new ImageCompressor;

  var compressorSettings = {
          toWidth : 100,
          toHeight : 100
      };

  imageSrc = '../src/static/images/gallery/compressed/india/INDIA11.jpg';

  imageCompressor.run(imageSrc, compressorSettings, proceedCompressedImage);

  function proceedCompressedImage (compressedSrc) {
    // img = compressedSrc;
    console.log(compressedSrc);
  }

// }

// var imageCompressor = new ImageCompressor;

// var compressorSettings = {
//   toWidth : 100,
//   toHeight : 100,
//   mimeType : 'image/png',
//   mode : 'strict',
//   quality : 0.6,
//   grayScale : true,
//   sepia : true,
//   threshold : 127,
//   vReverse : true,
//   hReverse : true,
//   speed : 'low'
// };


// imageCompressor.run(imageSrc, compressorSettings, proceedCompressedImage);


// function proceedCompressedImage (compressedSrc) {
//     ...
// }


// var imagePath = '../src/static/images/gallery/compressed/india/INDIA11.jpg';
