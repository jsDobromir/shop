const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    let data = fs.readFileSync('./products.json', 'utf-8');
    data = JSON.parse(data);
    let products = data.products;
    let respLengths = {sm: Math.round(products.length / 2), md: Math.round(products.length / 3), xl: Math.round(products.length / 4)};
    res.render('index', {products: products, respLengths, productsLength: products.length});
});

app.get('/kozmetika', (req, res) => {
    let file = fs.createReadStream(path.join(__dirname, 'category.html'));
    res.status(200);
    file.pipe(res);
});

app.listen(9000, () => {
    console.log('Listen on port 9000');
});