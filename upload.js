require('dotenv').config();
const cloudinary = require('cloudinary').v2;

function uploadImage(image, options) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, options)
            .then(resulte => {
                return resolve();
            })
            .catch(error => {
                return reject();
            });
    });
}

let promises = [
    uploadImage("./dist/prod_images/prod1/front_small.jpg", {folder: 'prod1/home', public_id: 'front_small'}),
    uploadImage("./dist/prod_images/prod1/resp_lg.jpg", {folder: 'prod1/home', public_id: 'resp_lg'}),
    uploadImage("./dist/prod_images/prod1/resp_md.jpg", {folder: 'prod1/home', public_id: 'resp_md'}),
    uploadImage("./dist/prod_images/prod1/resp_sm.jpg", {folder: 'prod1/home', public_id: 'resp_sm'}),
    uploadImage("./dist/prod_images/prod1/resp_xl.jpg", {folder: 'prod1/home', public_id: 'resp_xl'}),
    uploadImage("./dist/prod_images/prod1/resp_xs.jpg", {folder: 'prod1/home', public_id: 'resp_xs'})
];

Promise.all(promises).then(res => {
    console.log('images uploaded');
}).catch(err => {
    console.log('error uploading images');
})