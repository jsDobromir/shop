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
    uploadImage("./dist/prod_images/prod2/resp_xl.jpg", {folder: 'prod2/home', public_id: 'pic_home'}),
    ];

Promise.all(promises).then(res => {
    console.log('images uploaded');
}).catch(err => {
    console.log('error uploading images');
})