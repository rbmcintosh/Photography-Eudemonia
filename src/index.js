import './index.scss';

var albumsList = [
  { name: 'india', count: 22 },
  { name: 'nola', count: 6 },
  { name: 'atx', count: 9 }
];

var browserWidth = () => { return document.documentElement.clientWidth; };
var browserHeight = () => { return document.documentElement.clientHeight; };
var imageGallery = () => { return document.querySelector(".gallery_container"); };
var desktopGalleryMultiplier = () => { return browserWidth() > 1200 ? .8 : .98; };

var galleryElem = document.getElementById('gallery');
var galleryMain = galleryElem.querySelector('main');

var headerBg = new Image();
if (browserWidth() > browserHeight()) {
  headerBg.src = 'static/images/gallery/compressed/india/INDIA1.jpg';
} else {
  headerBg.src = 'static/images/gallery/compressed/india/INDIA1.jpg';
}
var headerMain = document.getElementById("header").querySelector('main');
var headerTitle = headerMain.firstElementChild;

headerBg.onload = () => {
  headerMain.style.backgroundImage = `url('${headerBg.src}')`;
  headerMain.style.height = browserHeight() * .95 + 'px';
  headerTitleSetter(headerBg,headerTitle);
};

var newImgHeight = (containerWidth,img) => { return ((containerWidth / img.width) * img.height); };

function headerHeightSetter(headerBg,headerMain) {
  headerMain.style.height = browserHeight() * .95 + 'px';
}

function headerTitleSetter(headerBg,headerTitle) {
  headerTitle.style.top = newImgHeight(browserWidth(),headerBg) * .58 + 'px';
  headerTitle.style.display = 'flex';
  if (headerTitle.style.opacity == 0) { setTimeout(() => {
    headerTitle.style.opacity = 1;
  }, 300)}
}

function imageSizeSetter(oldImg) {
  const coords = oldImg.getBoundingClientRect();
  const currX = coords.left;
  const currY = coords.top;
  const imgWidth = oldImg.width;
  const imgHeight = oldImg.height;
  const newX = (browserWidth() - imgWidth) / 2.1;
  const newY = (browserHeight() - imgHeight) / 2.1;
  const transX = (currX > newX) ? (currX - newX)*-1 : newX - currX;
  const transY = (currY > newY) ? (currY - newY)*-1 : newY - currY;
  let newPos = `translate(${transX}px, ${transY}px)`;
  return newPos;
}

function imageSwapper(img,thumbHeight) {
  let zoom = img.classList.contains('zoom');
  if (!zoom) {
    return swapper(/\.(\d00)?\.jpg/,`.${thumbHeight}.jpg`);
  } else {
    if (browserWidth() < 1000) {
      return swapper(/\d00\./,'800.');
    }
    return swapper(/\d00\./,'');
  }

  function swapper(pattern,replace) {
    let swapImage = img;
    swapImage.src = img.src.replace(pattern,replace);
    return swapImage;
  }
}

function documentHeight() {
  var body = document.body,
      html = document.documentElement;

  return Math.max( body.scrollHeight, body.offsetHeight,
         html.clientHeight, html.scrollHeight, html.offsetHeight );
}

buildImageArray(albumsList);

var imagesOK = 0;

var totalImages = albumsList.reduce((a,b) => {
  return a + b.count;
},0);

function buildImageArray(albums) {
  var imageArray = [];
  let galleryPicSize = browserWidth() < 600 ? '200' : '300';

  for (let j=0; j<albums.length; j++) {
    let albumName = albums[j].name;
    let albumPath = `static/images/gallery/compressed/${albumName}/`;
    albumPath += `${albumName.toUpperCase()}`;

    for (var i=1; i<=albums[j].count; i++) {
      let galleryPic = new Image();
          galleryPic.src = `${albumPath + i}.${galleryPicSize}.jpg`;
          galleryPic.alt = `Image ${albumName + i}`;
          galleryPic.className = "gallery_image";
          galleryPic.style.width = galleryPic.width + 'px';
          galleryPic.onclick = function() {
            let lightbox = document.querySelector('.gallery__lightboxbackground');
            lightbox.onclick = () => {
              lightbox.classList.toggle('dim');
              galleryPic.classList.toggle('zoom');
              galleryPic.style.transform = '';
            }
            lightbox.classList.toggle('dim');
            galleryPic.classList.toggle('zoom');
            if (galleryPic.classList.contains('zoom')) {
              galleryPic.style.transform = imageSizeSetter(galleryPic);
              setTimeout(() => {
                const scale = () => {
                  if (browserWidth() > browserHeight()) {
                    return (browserHeight() / galleryPic.height) * .9;
                  } else {
                    return (browserWidth() / galleryPic.width) * .9;
                  }
                };
                let transformer = `scale(${scale()})`;
                galleryPic.style.transform += transformer;
              }, 1);
              let newImg = imageSwapper(galleryPic,galleryPicSize);
              newImg.onload = () => {
                galleryPic = newImg;
              }
            } else {
              galleryPic.style.transform = '';
              let newImg = imageSwapper(galleryPic,galleryPicSize);
              newImg.onload = () => {
                galleryPic = newImg;
              }
            }
          }
          galleryPic.onload = function(){
            imagesOK++;
            if (imagesOK>=totalImages) {
              setTimeout(() => {
                let galleryContainer = createGalleryContainer(imageArray);
                galleryMain.appendChild(fitRowWidthToWindow(galleryContainer));
                let lightbox_background = document.querySelector(".gallery__lightboxbackground");
                lightbox_background.style.height = documentHeight() + 'px';
              }, 201);
            }
          };
      imageArray.push(galleryPic);
    }
  }
}

function createGalleryContainer(imageArray) {

  // galleryMain.style.width = (browserWidth() * desktopGalleryMultiplier()) + 'px';

  let galleryContainer = document.createElement("div");
  galleryContainer.className = "gallery_container";

  var thisRow;
  let picArray = [];

  for (var i=0; i<imageArray.length; i++) {
    if (thisRow === undefined) {
      thisRow = document.createElement("div");
      thisRow.className = "gallery_row";
    }

    thisRow.appendChild(imageArray[i]);
    picArray.push(imageArray[i].width);

    let sumTotalWidth = picArray.reduce((a,b) => {
      return a+b;
    });

    if (sumTotalWidth > (browserWidth() * desktopGalleryMultiplier())
        && !(imageArray.length-i==1)) {
      thisRow.style.width = browserWidth() * desktopGalleryMultiplier();
      galleryContainer.appendChild(thisRow);
      thisRow = undefined;
      sumTotalWidth = 0;
      picArray = [];
    }
  }
  return galleryContainer;
}

function fitRowWidthToWindow(gallery) {
  let rows = gallery.children;
  for (let i=0; i<rows.length; i++) {
    let rowImgs = rows[i].children;
    let totalWidth = [];
    for (let j=0; j<rowImgs.length; j++) {
      totalWidth.push(rowImgs[j].width);
    }
    let sumTotalWidth = totalWidth.reduce((a,b) => {
      return a+b;
    }) + ((totalWidth.length - 1) * 5);
    let newPercent = ((browserWidth() * desktopGalleryMultiplier()) / sumTotalWidth);
    for (let j=0; j<rowImgs.length; j++) {
      let imgWidth = Math.floor(newPercent * rowImgs[j].width);
      let imgHeight = Math.floor(newPercent * rowImgs[j].height);
      rowImgs[j].style.width = imgWidth + 'px';
      rowImgs[j].style.height = imgHeight + 'px';
    }
  }
  return gallery;
}

window.addEventListener('orientationchange', () => {
  headerHeightSetter(headerBg,headerMain);
  headerTitleSetter(headerBg,headerTitle);
  fitRowWidthToWindow(imageGallery());
});
