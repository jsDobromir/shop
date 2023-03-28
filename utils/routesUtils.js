const fs = require('fs');

const categories = ['kozmetika', 'dobavki', 'vitamini', 'sport', 'obleklo', 'zadoma'];
const subcategories = {
    kozmetika: ['lice', 'kosa', 'tqlo'],
    dobavki: ['minerali'],
    vitamini: ['vitaminc'],
    sport: ['uredi'],
    obleklo: ['yoga'],
    zadoma: ['aroma']
};

function checkCategoryExists(req, res, next) {
    const category = req.params.category;
    const subcategory = req.params.subcategory;
    if (!categories.includes(category)) {
        const error = new Error('За съжаление категорията, която търсите, не съществува.');
        error.statusCode = 404;
        return next(error);
    }

    if (subcategory && !subcategoryExists(category, subcategory)) {
        const error = new Error('За съжаление подкатегорията, която търсите, не съществува.');
        error.statusCode = 404;
        return next(error);
    }

    next();
}

function subcategoryExists(category, subcategory) {
    // This function could check a database or a list of valid subcategories for the given category
    // For this example, we'll just hardcode some subcategories for each category
    return subcategories[category] ? subcategories[category].includes(subcategory) : false;
}

function getProducts(category, subCategory) {
  let filePath = `./${category}.json`;

  if (subCategory) {
    filePath = `./${category}_${subCategory}.json`;
  }

  const data = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(data).products;

  return products;
}

module.exports = {
    checkCategoryExists: checkCategoryExists,
    getProducts: getProducts
};
