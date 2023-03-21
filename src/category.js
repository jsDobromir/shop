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
            document.querySelector('.container_prod').scrollIntoView({ behavior: 'smooth' });
            document.querySelector('.loader-container').classList.remove('d-none');

            const page = link.dataset.page;

            fetch(`/kozmetika/${page}`, { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    document.querySelector('.container_prod__products__grid').querySelectorAll('.container_prod__products__grid__item').forEach((item, index) => {
                        let product = data.products[index];
                        let newItem = buildItem(product);
                        item.parentNode.replaceChild(newItem, item);
                    });
                    updatePagination(data);
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
    cartIcon.classList.add('fa-solid', 'fa-cart-plus', 'fa-xl');

    bag.appendChild(cartIcon);
    price.appendChild(priceValue);
    price.appendChild(bag);

    pricewrap.appendChild(price);

    item.appendChild(pricewrap);

    itemTop.appendChild(item);
    itemTop.appendChild(pricewrap);
    return itemTop;
}

function updatePagination(data) {
    // Find the container for the pagination
    const container = document.querySelector('.container_prod__pagination');

    // Clear the container
    container.innerHTML = '';

    // Create and append the "previous" link
    const prevLink = document.createElement('a');
    prevLink.href = `/kozmetika/${data.prevPage}`;
    prevLink.dataset.page = data.prevPage;
    prevLink.classList.add('page', 'previous');
    if (data.activePage == 1) {
        prevLink.classList.add('disabled');
    }
    prevLink.textContent = 'Предишна';
    container.appendChild(prevLink);

    // Create and append the page links
    const pagesContainer = document.createElement('div');
    pagesContainer.classList.add('container_prod__pagination__pages');
    for (let i = 0; i < data.pages.length; i++) {
        const page = data.pages[i];

        // Create an "ellipsis" span
        if (page === '...') {
            const ellipsis = document.createElement('span');
            ellipsis.classList.add('ellipse');
            ellipsis.textContent = '...';
            pagesContainer.appendChild(ellipsis);
        }
        // Create a page link
        else {
            const pageLink = document.createElement('a');
            pageLink.href = `/kozmetika/${page}`;
            pageLink.dataset.page = page;
            pageLink.classList.add('page');
            if (page === data.activePage) {
                pageLink.classList.add('disabled');
            }
            pageLink.textContent = page;
            pagesContainer.appendChild(pageLink);
        }
    }
    container.appendChild(pagesContainer);

    // Create and append the "next" link (small screens)
    const nextLinkSmall = document.createElement('a');
    nextLinkSmall.href = `/kozmetika/${data.nextPage}`;
    nextLinkSmall.dataset.page = data.nextPage;
    nextLinkSmall.classList.add('d-md-none', 'next', 'page');
    if (data.activePage == data.totalPages) {
        nextLinkSmall.classList.add('disabled');
    }
    nextLinkSmall.textContent = 'Следваща';
    container.appendChild(nextLinkSmall);

    // Create and append the "next" link (large screens)
    const nextLinkLarge = document.createElement('div');
    nextLinkLarge.classList.add('container_prod__pagination__nextlg', 'd-none', 'd-md-flex');
    const nextLinkLargeInner = document.createElement('a');
    nextLinkLargeInner.href = `/kozmetika/${data.nextPage}`;
    nextLinkLargeInner.dataset.page = data.nextPage;
    nextLinkLargeInner.classList.add('next', 'page');
    if (data.activePage == data.totalPages) {
        nextLinkLargeInner.classList.add('disabled');
    }
    nextLinkLargeInner.textContent = 'Следваща';
    nextLinkLarge.appendChild(nextLinkLargeInner);
    container.appendChild(nextLinkLarge);
}