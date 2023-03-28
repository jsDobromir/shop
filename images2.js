const https = require('https');
const fs = require('fs');
const path = require('path');

const inputString = 'https://m.media-amazon.com/images/I/61WmKNhOLcL._SY450_.jpg":[450,450],"https://m.media-amazon.com/images/I/61WmKNhOLcL._SX522_.jpg":[522,522],"https://m.media-amazon.com/images/I/61WmKNhOLcL._SX425_.jpg":[425,425],"https://m.media-amazon.com/images/I/61WmKNhOLcL._SX466_.jpg":[466,466],"https://m.media-amazon.com/images/I/61WmKNhOLcL._SY355_.jpg":[355,355]';

const imageUrlRegex = /https:\/\/.+?\.(jpg|png|gif)/gi;
const dimensionsRegex = /(?<=\[)(\d+),(\d+)(?=\])/g;

const imageUrls = inputString.match(imageUrlRegex);
const dimensions = inputString.match(dimensionsRegex);

if (!fs.existsSync(path.join(__dirname, 'dist', 'prod_images', 'prod2', 'product_pdp'))) {
  fs.mkdirSync(path.join(__dirname, 'dist', 'prod_images', 'prod2', 'product_pdp'));
}

async function downloadImage(imageUrl, index) {
  const imageDimensions = dimensions[index].split(',');
  const imageName = `image${index + 1}_${imageDimensions[0]}x${imageDimensions[1]}`;
  const imagePath = path.join(__dirname, 'dist', 'prod_images', 'prod2', 'product_pdp', `${imageName}.jpg`);
  const file = fs.createWriteStream(imagePath);
  https.get(imageUrl, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${imageName}.jpg`);
    });
  }).on('error', (err) => {
    fs.unlink(imagePath);
    console.error(`Error downloading ${imageName}.jpg: ${err.message}`);
  });
}

Promise.all(imageUrls.map((url, index) => downloadImage(url, index)))
  .then(() => console.log('All images downloaded successfully!'))
  .catch((err) => console.error(`Error downloading images: ${err}`));