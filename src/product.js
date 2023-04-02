import { Carousel } from "bootstrap";
import { quantityListener, transListener } from "./productUtils/utils.js";
import { productGalleryHash, initialGalleryHash, scaleListener } from './productUtils/hiddenCarouselUtils.js';
import { renderer } from "./productUtils/renderer.js";

document.addEventListener('DOMContentLoaded', (event) => {

    const carouselDom = document.querySelector(`.container__prod #imageCarousel`);
    const carousel = new Carousel(carouselDom, {
        interval: 5000,
        keyboard: true,
        pause: false,
        ride: false,
        touch: true,
        wrap: true
    });


    const hiddenCarouselDom = document.querySelector('.product_gallery_div #hiddenCarousel');
    const carouselHidden = new Carousel(hiddenCarouselDom, {
        interval: 5000,
        keyboard: true,
        pause: false,
        ride: false,
        touch: false,
        wrap: true
    });

    carouselDom.addEventListener('slide.bs.carousel', (event) => {
        const slideIndex = event.to;
        carouselHidden.to(slideIndex);
    });

    hiddenCarouselDom.addEventListener('slid.bs.carousel', (event) => {
        const slideIndex = event.to;
        carousel.to(slideIndex);

        const carouselItems = document.querySelectorAll('#hiddenCarousel .carousel-item');

        carouselItems.forEach((item) => {
            // Get the corresponding checkbox
            const checkbox = item.querySelector('input[type="checkbox"]');

            // Check if the carousel item has the active class
            if (checkbox && !item.classList.contains('active')) {
                // If it has the active class, leave the checkbox checked
                checkbox.checked = false;
            }
        });
    });

    const overlay = document.querySelector('#hiddenCarousel .carousel_img_wrapper');
    const overlayImage = overlay.querySelector('img');

    overlay.viewer = null;
    let isZoomedIn = false;

    overlay.viewer = renderer({
        minScale: 1,
        maxScale: 4,
        element: overlay,
        scaleSensitivity: 10
    });

    document.querySelectorAll('#hiddenCarousel .carousel-item img').forEach((img) => {
        img.addEventListener('click', (event) => {
            if (!isZoomedIn) {
                overlay.viewer.panTo({ originX: overlay.clientWidth /2, originY: overlay.clientHeight / 2, scale: 1 });
                overlay.viewer.zoom({ x: overlay.clientWidth / 2, y: overlay.clientHeight / 2, deltaScale: 6 });
                console.log(overlay.viewer.state);
                overlay.scrollIntoView({block: 'center', inline: 'center'});
                isZoomedIn = true;
                img.style.cursor = 'zoom-out';
            } else {
                overlay.viewer.panTo({ originX: 0, originY: 0, scale: 1 });
                isZoomedIn = false;
                img.style.cursor = 'zoom-in';
            }
        });
    });

    quantityListener();

    transListener();

    initialGalleryHash();
    window.onhashchange = productGalleryHash;
});