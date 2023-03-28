const path = require('path');
const fs = require('fs');
const https = require('https');
const Stream = require('stream').Transform;
const fsPromises = fs.promises;
const fetch = require('node-fetch');

const prodFolder = 'prod2/small_images';
const images = ['https://m.media-amazon.com/images/I/31ualBb9v5L._SS40_.jpg'];

let srcset =  'https://m.media-amazon.com/images/I/41PoXB1Q3EL._SS40_.jpg, https://m.media-amazon.com/images/I/41c94Z519jL._SS40_.jpg, https://m.media-amazon.com/images/I/41GP25qe0lL._SS40_.jpg, https://m.media-amazon.com/images/I/41c584+7kRL._SS40_.jpg, https://m.media-amazon.com/images/I/41ZD-S-MI+L._SS40_.jpg';

srcset = srcset.split(', ');

srcset = srcset.map(imageUrl => {
    return imageUrl.trim();
})

srcset = srcset.map(imageUrl => {
    let url = imageUrl.split(' ')[0];
    return url;
});

images.push(...srcset);

console.log(images[0]);

function getName(index) {
    return `image_${(index+1)}`;
    // switch(index) {
    //     case 0: 
    //         return 'front_small';
    //     case 1:
    //         return 'resp_xs';
    //     case 2:
    //         return 'resp_sm';
    //     case 3:
    //         return 'resp_md';
    //     case 4:
    //         return 'resp_lg';
    //     case 5:
    //         return 'resp_xl';
    //     default:
    //         break
    // }
}

// function task(index, cb) {
//     let extension = path.extname(images[index]);
//     let name = getName(index);
//     let filename = path.join(__dirname, 'dist', 'prod_images', prodFolder, `${name}${extension}`);
    

//     https.get(images[index], function(response) {
//         var data = new Stream();

//         response.on('data', function(chunk) {
//             //let chunkC = Buffer.from(chunk);
//             console.log(chunk);
//             data.push(chunk);
//         })

//         response.on('end', function() {
//             fs.writeFileSync(filename, data);
//             return cb();
//         })
//     })
// }

async function task(index, cb) {
    let extension = path.extname(images[index]);
    let name = getName(index);
    let filename = path.join(__dirname, 'dist', 'prod_images', prodFolder, `${name}${extension}`);

    const response = await fetch(images[index]);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fsPromises.writeFile(filename, buffer);
    return cb();
}

async function iterate(index) {
    if (index===images.length) {
        return finish();
    }

    await task(index, () => iterate(index + 1));
}

function finish() {
    console.log('done');
    process.exit(1);
}

iterate(0);