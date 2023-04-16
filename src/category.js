document.addEventListener('DOMContentLoaded', (ev) => {

    document.querySelector('.close__icon').addEventListener('click', (ev) => {
        document.querySelector('#filter').checked = false;
    });


    //pagination
    document.querySelector('.container_prod__pagination').addEventListener('click', (event) => {
        if (event.target.classList.contains('page')) {
            event.preventDefault();
            let link = event.target;
            if (link.classList.contains('disabled')) return;
            //load the transparent background
            document.querySelector('.loader-container').classList.remove('d-none');

            const page = link.dataset.page;
            const category = link.getAttribute('href').split('/')[1];
            const subCategory = link.getAttribute('href').split('/')[2] || '';

            fetch(`/${category}/${subCategory}?page=${page}`, { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    document.querySelector('.container_prod__products__grid').querySelectorAll('.container_prod__products__grid__item').forEach((item, index) => {
                        let product = data.products[index];
                        let newItem = buildItem(product);
                        item.parentNode.replaceChild(newItem, item);
                    });
                    document.querySelector('.container_prod').scrollIntoView({ behavior: 'smooth' });
                    history.pushState({ path: data.redirectURL }, '', data.redirectURL);
                    updatePagination(data, data.category, data.subCategory);
                    document.querySelector('.loader-container').classList.add('d-none');
                })
                .catch((err) => {
                    document.querySelector('.loader-container').classList.add('d-none');
                });
        }
    });

});

function buildItem(localProduct) {
    let itemTop = document.createElement('div');
    itemTop.classList.add('container_prod__products__grid__item');
    const item = document.createElement('div');
    item.classList.add('container_prod__products__grid__item__image');

    const wrapper = document.createElement('div');
    wrapper.classList.add('container_prod__products__grid__item__image__wrapper');

    const link = document.createElement('a');
    link.setAttribute('href', '/product/retionol_cream');

    const image = document.createElement('img');
    image.classList.add('imgclass');
    image.setAttribute('src', localProduct.imageFront);
    image.setAttribute('srcset', localProduct.imagesResp);
    image.setAttribute('alt', localProduct.title);

    link.appendChild(image);
    wrapper.appendChild(link);
    item.appendChild(wrapper);

    const pricewrap = document.createElement('div');
    pricewrap.classList.add('container_prod__products__grid__item__pricewrap');

    const pricewrapInner = document.createElement('div');
    pricewrapInner.classList.add('container_prod__products__grid__item__pricewrap__inner');

    const title = document.createElement('div');
    title.classList.add('container_prod__products__grid__item__pricewrap__inner__tittle');
    let h3Elem = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.setAttribute('href', '/product/retionol_cream');
    titleLink.classList.add('container_prod__products__grid__item__pricewrap__inner__tittle__link');
    titleLink.textContent = localProduct.title;

    h3Elem.appendChild(titleLink);
    title.appendChild(h3Elem);
    pricewrapInner.appendChild(title);

    const description = document.createElement('div');
    description.classList.add('container_prod__products__grid__item__pricewrap__inner__description');
    let pElem = document.createElement('p');
    let pElemText = document.createTextNode(`${localProduct.description}`);
    pElem.appendChild(pElemText);

    description.appendChild(pElem);
    pricewrapInner.appendChild(description);
    pricewrap.appendChild(pricewrapInner);

    const price = document.createElement('div');
    price.classList.add('container_prod__products__grid__item__pricewrap__price');

    const priceValue = document.createElement('span');
    priceValue.classList.add('price');
    priceValue.textContent = `${localProduct.price}лв`;

    const bag = document.createElement('span');
    bag.classList.add('bag');

    const cartIcon = document.createElement('i');
    cartIcon.classList.add('fa-solid', 'fa-cart-plus', 'fa-lg');

    bag.appendChild(cartIcon);
    price.appendChild(priceValue);
    price.appendChild(bag);

    pricewrap.appendChild(price);

    item.appendChild(pricewrap);

    itemTop.appendChild(item);
    itemTop.appendChild(pricewrap);
    return itemTop;
}

function updatePagination(data, category, subCategory) {
    const paginationContainer = document.querySelector('.container_prod__pagination');
    paginationContainer.innerHTML = '';
    if (data.totalPages > 1) {
        const prevNextContainer = document.createElement('div');
        prevNextContainer.classList.add('container_prod__pagination__prevnext');
        const prevLink = document.createElement('a');
        prevLink.href = `/${category}${subCategory ? '/' + subCategory : ''}?page=${data.prevPage}`;
        prevLink.dataset.page = data.prevPage;
        prevLink.classList.add('page', 'previous');
        if (data.activePage === 1) {
            prevLink.classList.add('disabled');
        }
        prevLink.innerText = 'Предишна';
        prevNextContainer.appendChild(prevLink);

        const nextLinkSm = document.createElement('a');
        nextLinkSm.href = `/${category}${subCategory ? '/' + subCategory : ''}?page=${data.nextPage}`;
        nextLinkSm.dataset.page = data.nextPage;
        nextLinkSm.classList.add('page', 'next', 'd-md-none');
        if (data.activePage === data.totalPages) {
            nextLinkSm.classList.add('disabled');
        }
        nextLinkSm.innerText = 'Следваща';
        prevNextContainer.appendChild(nextLinkSm);

        paginationContainer.appendChild(prevNextContainer);

        const pagesContainer = document.createElement('div');
        pagesContainer.classList.add('container_prod__pagination__pages');
        for (let page of data.pages) {
            let pageLink;
            if (page === '...') {
                pageLink = document.createElement('span');
                pageLink.classList.add('ellipse');
                pageLink.innerText = '...';
            } else {
                pageLink = document.createElement('a');
                pageLink.href = `/${category}${subCategory ? '/' + subCategory : ''}?page=${page}`;
                pageLink.dataset.page = page;
                pageLink.classList.add('page');
                if (page === data.activePage) {
                    pageLink.classList.add('disabled');
                }
                pageLink.innerText = page;
            }
            pagesContainer.appendChild(pageLink);
        }
        paginationContainer.appendChild(pagesContainer);
        const nextLinkLg = document.createElement('div');
        nextLinkLg.classList.add('container_prod__pagination__nextlg', 'd-none', 'd-md-flex');
        const nextLink = document.createElement('a');
        nextLink.href = `/${category}${subCategory ? '/' + subCategory : ''}?page=${data.nextPage}`;
        nextLink.dataset.page = data.nextPage;
        nextLink.classList.add('page', 'next');
        if (data.activePage === data.totalPages) {
            nextLink.classList.add('disabled');
        }
        nextLink.innerText = 'Следваща';
        nextLinkLg.appendChild(nextLink);
        paginationContainer.appendChild(nextLinkLg);
    }
}
