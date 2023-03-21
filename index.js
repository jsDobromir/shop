const express = require('express');
const path = require('path');
const fs = require('fs');
const { getPages, getPrevNext } = require('./utils/pagination');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    let data = fs.readFileSync('./products.json', 'utf-8');
    data = JSON.parse(data);
    let dobavki = fs.readFileSync('./dobavki.json', 'utf-8');
    dobavki = JSON.parse(dobavki);
    let vitamini = fs.readFileSync('./vitamini.json', 'utf-8');
    vitamini = JSON.parse(vitamini);
    let products = data.products.slice(0, 30);
    let productsDobavki = dobavki.products.slice(0, 30);
    let productsVitamini = vitamini.products.slice(0, 30);
    let respLengths = { sm: Math.round(products.length / 2), md: Math.round(products.length / 3), xl: Math.round(products.length / 5) };
    let respLengthsDobavki = { sm: Math.round(productsDobavki.length / 2), md: Math.round(productsDobavki.length / 3), xl: Math.round(productsDobavki.length / 5) }
    let respLengthsVitamini = { sm: Math.round(productsVitamini.length / 2), md: Math.round(productsVitamini.length / 3), xl: Math.round(productsVitamini.length / 5) }
    res.render('index', {
        products: products, respLengths, respLengthsDobavki, productsLength: products.length, productsDobavki, productsDobavkiLength: productsDobavki.length,
        productsVitamini, productsVitaminiLength: productsVitamini.length, respLengthsVitamini
    });
});

app.get('/kozmetika/:page?', (req, res) => {
    let page = parseInt(req.params.page) || 1;
    let products = fs.readFileSync('./products.json', 'utf-8');
    let limit = 24;
    let skipIndex = (page - 1) * limit;//calculate the index of the first item to skip
    let endIndex = skipIndex + limit;
    products = JSON.parse(products);
    if (skipIndex >= products.products.length) {
        return res.redirect('/kozmetika/1');
    }
    let totalPages = Math.round(products.products.length / limit);
    products = products.products.slice(skipIndex, endIndex);
    let pages = getPages(page, totalPages);
    let { prevPage, nextPage } = getPrevNext(page, totalPages);
    res.render('category', { products, productsLength: products.length, totalPages, activePage: page, pages, prevPage, nextPage });
});

app.post('/kozmetika/:page', (req, res) => {
    const page = parseInt(req.params.page);
    const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
    const limit = 24;
    const skipIndex = (page - 1) * limit;
    const endIndex = skipIndex + limit;
    const totalPages = Math.round(products.products.length / limit);
    const slicedProducts = products.products.slice(skipIndex, endIndex);
    const pages = getPages(page, totalPages);
    const { prevPage, nextPage } = getPrevNext(page, totalPages);
    return res.json({ products: slicedProducts, totalPages, activePage: page, pages, prevPage, nextPage });  
});

app.listen(9000, () => {
    console.log('Listen on port 9000');
});