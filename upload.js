require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.uploader.upload("./dist/prod_images/prod11/resp_xl.jpg", {folder: "prod11", public_id: "prod11_front", responsive_breakpoints: {create_derived: true, bytes_step: 20000, min_width: 200, max_width: 501, transformation: {crop: 'fit'}}}, function(error, result) {
    let breakpoints = (result.responsive_breakpoints);
    for(let br of breakpoints) {
        console.log(br);
    }
})

// function uploadImage(image, options) {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(image, options)
//             .then(resulte => {
//                 return resolve();
//             })
//             .catch(error => {
//                 return reject();
//             });
//     });
// }

// let promises = [
//     uploadImage("./dist/prod_images/prod11/pdp/image_1.jpg", {folder: 'prod11/pdp', public_id: 'pic_pdp_1'}),
//     uploadImage("./dist/prod_images/prod11/pdp/image_2.jpg", {folder: 'prod11/pdp', public_id: 'pic_pdp_2'}),
//     uploadImage("./dist/prod_images/prod11/pdp/image_3.jpg", {folder: 'prod11/pdp', public_id: 'pic_pdp_3'}),
//     uploadImage("./dist/prod_images/prod11/pdp/image_4.jpg", {folder: 'prod11/pdp', public_id: 'pic_pdp_4'}),
//     uploadImage("./dist/prod_images/prod11/pdp/image_5.jpg", {folder: 'prod11/pdp', public_id: 'pic_pdp_5'}),
//     uploadImage("./dist/prod_images/prod11/pdp/image_6.jpg", {folder: 'prod11/pdp', public_id: 'pic_pdp_6'}),
// ];

// Promise.all(promises).then(res => {
//     console.log('images uploaded');
// }).catch(err => {
//     console.log(err);
//     console.log('error uploading images');
// });