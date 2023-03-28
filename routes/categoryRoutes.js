const express = require('express');
const { checkCategoryExists, getProducts } = require('../utils/routesUtils');
const { getPages, getPrevNext } = require('../utils/pagination');
const i18n = require('../utils/i18n.config');
const router = express.Router();

router.get('/:category/:subCategory?', checkCategoryExists,(req, res) => {
    const category = req.params.category;
    const subCategory = req.params.subCategory || null;
    const page = parseInt(req.query.page) || 1;
    const limit = 24;
    const categoryLoc = i18n.__(category);
    const products = getProducts(category, subCategory);
    const productsLength = products.length;

    const totalPages = Math.ceil(productsLength / limit);
    const skipIndex = (page - 1) * limit;
    const endIndex = skipIndex + limit;

    const pages = getPages(page, totalPages);
    const { prevPage, nextPage } = getPrevNext(page, totalPages);

    const productsToDisplay = products.slice(skipIndex, endIndex);

    res.render('category', {
        category,
        subCategory,
        products: productsToDisplay,
        productsLength,
        totalPages,
        activePage: page,
        pages,
        prevPage,
        nextPage,
        categoryLoc
    });
});


router.post('/:category/:subCategory?', (req, res) => {
    const category = req.params.category;
    const subCategory = req.params.subCategory || null;
    const page = parseInt(req.query.page);
  
    const products = getProducts(category, subCategory);
    const limit = 24;
    const skipIndex = (page - 1) * limit;
    const endIndex = skipIndex + limit;
    const totalPages = Math.round(products.length / limit);
    const slicedProducts = products.slice(skipIndex, endIndex);
    const pages = getPages(page, totalPages);
    const { prevPage, nextPage } = getPrevNext(page, totalPages);
    const redirectURL = `/${category}/${subCategory ? subCategory + '/' : ''}?page=${page}`;
  
    return res.json({ products: slicedProducts, totalPages, activePage: page, pages, prevPage, nextPage, redirectURL, category, subCategory });  
  });

module.exports = router;