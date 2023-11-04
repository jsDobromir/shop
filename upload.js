require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
let imageNum = 0;
let urls = [];

cloudinary.uploader.upload('./dist/prod_images/prod79/small_images/image_1.webp', {
    folder: 'prod79/small_images',
    public_id: `image_1`
    // responsive_breakpoints: {
    //     create_derived: false,
    //     min_width: 50,
    //     max_width: 1400,
    //     fetch_format: 'auto'
    // }
}, (error, result) => {
    // let breakpoints = result.responsive_breakpoints;
    // let localUrl = [];
    // for (let br of breakpoints[0].breakpoints) {
    //     localUrl.push(br.secure_url);
    // }
    // urls.push(localUrl);
    console.log(result);
});

//let images = ['./dist/prod_images/prod3/pdp/normal/image_1.jpg', './dist/prod_images/prod3/pdp/normal/image_2.jpg', './dist/prod_images/prod3/pdp/normal/image_3.jpg', './dist/prod_images/prod3/pdp/normal/image_4.jpg', './dist/prod_images/prod3/pdp/normal/image_5.jpg', './dist/prod_images/prod3/pdp/normal/image_6.jpg'];


// Promise.all(images.map(image => {
//     return new Promise((resolve, reject) => {
//         imageNum++;
//         cloudinary.uploader.upload(image, {
//             folder: 'prod79/pdp/normal',
//             public_id: `image_${imageNum.toString()}`,
//             responsive_breakpoints: {
//                 create_derived: false,
//                 min_width: 50,
//                 max_width: 1200,
//                 fetch_format: 'auto'
//             }
//         }, (error, result) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 let breakpoints = result.responsive_breakpoints;
//                 let localUrl = [];
//                 for (let br of breakpoints[0].breakpoints) {
//                     localUrl.push(br.secure_url);
//                 }
//                 urls.push(localUrl);
//                 resolve(urls);
//             }
//         });
//     });
// })).then(() => {
//     console.log(urls);
//     const modifiedArray = urls.map(subArray => {
//         return subArray.map(str => {
//             const width = str.match(/w_(\d+)/)[1];
//             return `${str} ${width}w`;
//         });
//     });
//     const strings = modifiedArray.map(subArr => subArr.reverse().join(','));
//     fs.writeFile('output.txt', strings.join('\n'), err => {
//         if (err) throw err;
//         console.log('File written successfully');
//     });
// }).catch(error => {
//     console.log(error);
// });
