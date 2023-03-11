const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const prodFolder = 'dist/prod_images/prod14';
const images = ['front_small.jpg', 'resp_xs.jpg', 'resp_sm.jpg'];
const imagesPath = [];
const imagesOutput = [];
let measures = [{width: 170, height: 320}, {width: 170, height: 320}, {width: 337, height: 640}];

for (let i=0;i<3;i++) {
    let imagePath = path.join(__dirname, prodFolder, images[i]);
    imagesPath.push(imagePath);
    let outputFile = images[i].split('.')[0].concat('_output').concat('.').concat(images[i].split('.')[1]);
    let output = path.join(__dirname, prodFolder, outputFile);
    imagesOutput.push(output);
}


function task(index, cb) {
    let image = imagesPath[index];
    console.log(image);
    let output = imagesOutput[index];
    let {width, height} = measures[index];
    sharp(image).resize({width: 252, height: 480, fit: 'cover'}).toFile(output)
    .then(function(new_file_info) {
        console.log('done')
        return cb();
    })
    .catch(function(err) {
        return cb(err);
    });
}

let completed = 0;

for(let i=0;i<imagesPath.length;i++) {
    task(i, (error) => {
        if (error) {
            console.log(`error: ${error}`);
            return;
        }
        if (++completed===imagesPath.length) {
            return finish();
        }
    })
}

function finish() {
    console.log('done');
    process.exit(1);
}


    // front_small 168 x 320
    // resp_xs 168 x 320
    // resp_sm 252 x 480