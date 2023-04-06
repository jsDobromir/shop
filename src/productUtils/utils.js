import { toggleClasses } from "./utilsFunctions";
/**
 * attach listener to select quantity on product page
 * and show modal on center of the screen for mobiles
 */

function quantityListenerHelper() {
    const quantityFixed = document.querySelector('.quantity_fixed');
    const quantityContent = document.querySelector('.quantity_fixed__content');

    quantityFixed.addEventListener('click', (event) => {
        if (!quantityContent.contains(event.target)) {
            toggleClasses(quantityFixed, 'vis-anim-hidden', 'vis-anim');
        }
    });
    quantityFixed.querySelector('.quantity_fixed__content__title__close').addEventListener('click', (event) => {
        toggleClasses(quantityFixed, 'vis-anim-hidden', 'vis-anim');
    });

    quantityFixed.querySelectorAll('.quantity_fixed__content__menu__item').forEach(item => {
        item.addEventListener('click', (itemEvent) => {
            let activeQty = quantityContent.querySelector('.active-qty')
            if (activeQty) activeQty.classList.remove('active-qty');
            let qty = itemEvent.target.dataset.qty;
            let quantitySelect = document.querySelector('#quantity');
            itemEvent.target.classList.add('active-qty');
            quantitySelect.value = qty;
            toggleClasses(quantityFixed, 'vis-anim-hidden', 'vis-anim');
        });
    });
}

function quantityListener() {
    const quantityFixed = document.querySelector('.quantity_fixed');
    const quantityContent = document.querySelector('.quantity_fixed__content');
    document.querySelector('.container #quantity').addEventListener('mousedown', (ev) => {
        if (ev.which!=1) return;
        ev.preventDefault();
        toggleClasses(quantityFixed, 'vis-anim', 'vis-anim-hidden');
        quantityListenerHelper();

    });
    document.querySelector('.container #quantity').addEventListener('touchstart', (ev) => {
        ev.preventDefault();
        const quantityFixed = document.querySelector('.quantity_fixed');
        toggleClasses(quantityFixed, 'vis-anim', 'vis-anim-hidden');
        quantityListenerHelper();
    });
}
/**
 * Listener for transaction link click
 */
function transListener() {
    const transContainer = document.querySelector('.transaction_container');
    const transContainerContent = document.querySelector('.transaction_container__content');
    document.querySelector('.safe_trans_text').addEventListener('click', (event) => {
        toggleClasses(transContainer, 'vis-anim', 'vis-anim-hidden');

        transContainer.addEventListener('click', (event) => {
            if (!transContainerContent.contains(event.target)) {
                toggleClasses(transContainer, 'vis-anim-hidden', 'vis-anim');
            }
        });
        transContainer.querySelector('.transaction_container__content__title__close').addEventListener('click', (event) => {
            toggleClasses(transContainer, 'vis-anim-hidden', 'vis-anim');
        });
    });
}

function attachSlideListener(element, carouselHidden) {
    var touchStartX = null;
    var touchEndX = null;

    element.addEventListener('touchstart', function (event) {
        touchStartX = event.touches[0].clientX;
    });

    element.addEventListener('touchmove', function (event) {
        touchEndX = event.touches[0].clientX;
    });

    element.addEventListener('touchend', function (event) {
        if (touchStartX > touchEndX + 5) {
            carouselHidden.next();
        } else if (touchStartX < touchEndX - 5) {
            carouselHidden.prev();
        }
        touchStartX = null;
        touchEndX = null;
    });
}

export { quantityListener, transListener, attachSlideListener};