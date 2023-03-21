/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/category.js":
/*!*************************!*\
  !*** ./src/category.js ***!
  \*************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', ev => {\n  document.querySelector('.close__icon').addEventListener('click', ev => {\n    document.querySelector('#filter').checked = false;\n  });\n\n  //pagination\n  document.querySelector('.container_prod__pagination').addEventListener('click', event => {\n    if (event.target.classList.contains('page')) {\n      event.preventDefault();\n      let link = event.target;\n      if (link.classList.contains('disabled')) return;\n      document.querySelector('.container_prod').scrollIntoView({\n        behavior: 'smooth'\n      });\n      document.querySelector('.loader-container').classList.remove('d-none');\n      const page = link.dataset.page;\n      fetch(`/kozmetika/${page}`, {\n        method: 'POST'\n      }).then(response => response.json()).then(data => {\n        document.querySelector('.container_prod__products__grid').querySelectorAll('.container_prod__products__grid__item').forEach((item, index) => {\n          let product = data.products[index];\n          let newItem = buildItem(product);\n          item.parentNode.replaceChild(newItem, item);\n        });\n        updatePagination(data);\n        document.querySelector('.loader-container').classList.add('d-none');\n      });\n    }\n  });\n});\nfunction buildItem(localProduct) {\n  let itemTop = document.createElement('div');\n  itemTop.classList.add('container_prod__products__grid__item');\n  const item = document.createElement('div');\n  item.classList.add('container_prod__products__grid__item__image');\n  const wrapper = document.createElement('div');\n  wrapper.classList.add('container_prod__products__grid__item__image__wrapper');\n  const link = document.createElement('a');\n  link.setAttribute('href', '/product/retionol_cream');\n  const image = document.createElement('img');\n  image.classList.add('imgclass');\n  image.setAttribute('src', localProduct.imageFront);\n  image.setAttribute('srcset', localProduct.imagesResp);\n  image.setAttribute('alt', localProduct.title);\n  link.appendChild(image);\n  wrapper.appendChild(link);\n  item.appendChild(wrapper);\n  const pricewrap = document.createElement('div');\n  pricewrap.classList.add('container_prod__products__grid__item__pricewrap');\n  const pricewrapInner = document.createElement('div');\n  pricewrapInner.classList.add('container_prod__products__grid__item__pricewrap__inner');\n  const title = document.createElement('div');\n  title.classList.add('container_prod__products__grid__item__pricewrap__inner__tittle');\n  let h3Elem = document.createElement('h3');\n  const titleLink = document.createElement('a');\n  titleLink.setAttribute('href', '/product/retionol_cream');\n  titleLink.classList.add('container_prod__products__grid__item__pricewrap__inner__tittle__link');\n  titleLink.textContent = localProduct.title;\n  h3Elem.appendChild(titleLink);\n  title.appendChild(h3Elem);\n  pricewrapInner.appendChild(title);\n  const description = document.createElement('div');\n  description.classList.add('container_prod__products__grid__item__pricewrap__inner__description');\n  let pElem = document.createElement('p');\n  let pElemText = document.createTextNode(`${localProduct.description}`);\n  pElem.appendChild(pElemText);\n  description.appendChild(pElem);\n  pricewrapInner.appendChild(description);\n  pricewrap.appendChild(pricewrapInner);\n  const price = document.createElement('div');\n  price.classList.add('container_prod__products__grid__item__pricewrap__price');\n  const priceValue = document.createElement('span');\n  priceValue.classList.add('price');\n  priceValue.textContent = `${localProduct.price}лв`;\n  const bag = document.createElement('span');\n  bag.classList.add('bag');\n  const cartIcon = document.createElement('i');\n  cartIcon.classList.add('fa-solid', 'fa-cart-plus', 'fa-xl');\n  bag.appendChild(cartIcon);\n  price.appendChild(priceValue);\n  price.appendChild(bag);\n  pricewrap.appendChild(price);\n  item.appendChild(pricewrap);\n  itemTop.appendChild(item);\n  itemTop.appendChild(pricewrap);\n  return itemTop;\n}\nfunction updatePagination(data) {\n  // Find the container for the pagination\n  const container = document.querySelector('.container_prod__pagination');\n\n  // Clear the container\n  container.innerHTML = '';\n\n  // Create and append the \"previous\" link\n  const prevLink = document.createElement('a');\n  prevLink.href = `/kozmetika/${data.prevPage}`;\n  prevLink.dataset.page = data.prevPage;\n  prevLink.classList.add('page', 'previous');\n  if (data.activePage == 1) {\n    prevLink.classList.add('disabled');\n  }\n  prevLink.textContent = 'Предишна';\n  container.appendChild(prevLink);\n\n  // Create and append the page links\n  const pagesContainer = document.createElement('div');\n  pagesContainer.classList.add('container_prod__pagination__pages');\n  for (let i = 0; i < data.pages.length; i++) {\n    const page = data.pages[i];\n\n    // Create an \"ellipsis\" span\n    if (page === '...') {\n      const ellipsis = document.createElement('span');\n      ellipsis.classList.add('ellipse');\n      ellipsis.textContent = '...';\n      pagesContainer.appendChild(ellipsis);\n    }\n    // Create a page link\n    else {\n      const pageLink = document.createElement('a');\n      pageLink.href = `/kozmetika/${page}`;\n      pageLink.dataset.page = page;\n      pageLink.classList.add('page');\n      if (page === data.activePage) {\n        pageLink.classList.add('disabled');\n      }\n      pageLink.textContent = page;\n      pagesContainer.appendChild(pageLink);\n    }\n  }\n  container.appendChild(pagesContainer);\n\n  // Create and append the \"next\" link (small screens)\n  const nextLinkSmall = document.createElement('a');\n  nextLinkSmall.href = `/kozmetika/${data.nextPage}`;\n  nextLinkSmall.dataset.page = data.nextPage;\n  nextLinkSmall.classList.add('d-md-none', 'next', 'page');\n  if (data.activePage == data.totalPages) {\n    nextLinkSmall.classList.add('disabled');\n  }\n  nextLinkSmall.textContent = 'Следваща';\n  container.appendChild(nextLinkSmall);\n\n  // Create and append the \"next\" link (large screens)\n  const nextLinkLarge = document.createElement('div');\n  nextLinkLarge.classList.add('container_prod__pagination__nextlg', 'd-none', 'd-md-flex');\n  const nextLinkLargeInner = document.createElement('a');\n  nextLinkLargeInner.href = `/kozmetika/${data.nextPage}`;\n  nextLinkLargeInner.dataset.page = data.nextPage;\n  nextLinkLargeInner.classList.add('next', 'page');\n  if (data.activePage == data.totalPages) {\n    nextLinkLargeInner.classList.add('disabled');\n  }\n  nextLinkLargeInner.textContent = 'Следваща';\n  nextLinkLarge.appendChild(nextLinkLargeInner);\n  container.appendChild(nextLinkLarge);\n}\n\n//# sourceURL=webpack://background_images/./src/category.js?");

/***/ }),

/***/ "./src/sass/category.scss":
/*!********************************!*\
  !*** ./src/sass/category.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://background_images/./src/sass/category.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./src/category.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/sass/category.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;