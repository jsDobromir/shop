const express = require('express');
const path = require('path');
const fs = require('fs');
const categoryRoutes = require('./routes/categoryRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
    let data = fs.readFileSync('./kozmetika.json', 'utf-8');
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

app.use(categoryRoutes);

app.get('/:category/:subcategory/:produktId', (req, res) => {
    const category = req.params.category;
    const produktId = req.params.produktId;
  
    // Read the JSON file for the requested category
    const productsFilePath = path.join(__dirname, `${category}.json`);
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading JSON file: ${err}`);
        return res.status(500).send('Error reading JSON file');
      }
  
      // Parse the JSON data into an array of products
      let products = JSON.parse(data);
      products = products.products;
      
      // Find the product with the given ID
      const product = products.find(p => p.id == produktId);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      // Render the product view with the product data
      res.render('product', {product});
    });  
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).render('errors/error.pug', {errorMsg: err.message});
});

app.listen(9000, () => {
    console.log('Listen on port 9000');
});