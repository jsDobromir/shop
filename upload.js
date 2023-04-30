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
    uploadImage("./dist/prod_images/prod2/product_pdp_1/image2_522x522.jpg", {folder: 'prod2/pdp', public_id:'pic_pdp_1'}),
    uploadImage("./dist/prod_images/prod2/product_pdp_2/image_2.jpg", {folder: 'prod2/pdp', public_id: 'pic_pdp_2'}),
    uploadImage("./dist/prod_images/prod2/product_pdp_3/image_2.jpg", {folder: 'prod2/pdp', public_id: 'pic_pdp_3'}),
    uploadImage("./dist/prod_images/prod2/product_pdp_4/image_2.jpg", {folder: 'prod2/pdp', public_id: 'pic_pdp_4'}),
    uploadImage("./dist/prod_images/prod2/product_pdp_5/image_2.jpg", {folder: 'prod2/pdp', public_id: 'pic_pdp_5'}),
    uploadImage("./dist/prod_images/prod2/product_pdp_6/image_2.jpg", {folder: 'prod2/pdp', public_id: 'pic_pdp_6'}),
    uploadImage("./dist/prod_images/prod2/small_images/image_1.jpg", {folder: 'prod2/pdp/small_images', public_id: 'small_image_1'}),
    uploadImage("./dist/prod_images/prod2/small_images/image_2.jpg", {folder: 'prod2/pdp/small_images', public_id: 'small_image_2'}),
    uploadImage("./dist/prod_images/prod2/small_images/image_3.jpg", {folder: 'prod2/pdp/small_images', public_id: 'small_image_3'}),
    uploadImage("./dist/prod_images/prod2/small_images/image_4.jpg", {folder: 'prod2/pdp/small_images', public_id: 'small_image_4'}),
    uploadImage("./dist/prod_images/prod2/small_images/image_5.jpg", {folder: 'prod2/pdp/small_images', public_id: 'small_image_5'}),
    uploadImage("./dist/prod_images/prod2/small_images/image_6.jpg", {folder: 'prod2/pdp/small_images', public_id: 'small_image_6'})
];

Promise.all(promises).then(res => {
    console.log('images uploaded');
}).catch(err => {
    console.log(err);
    console.log('error uploading images');
});