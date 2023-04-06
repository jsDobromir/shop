import { Carousel } from "bootstrap";
import { quantityListener, transListener, attachSlideListener} from "./productUtils/utils.js";
import { productGalleryHash, initialGalleryHash } from './productUtils/hiddenCarouselUtils.js';
import { renderer } from "./productUtils/renderer.js";
import Hammer from "hammerjs";

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

    let overlay = document.querySelector('#hiddenCarousel .carousel-item.active .carousel_img_wrapper');
    overlay.viewer = null;

    overlay.viewer = renderer({
        minScale: 1,
        maxScale: 4,
        element: overlay,
        scaleSensitivity: 10
    });

    hiddenCarouselDom.addEventListener('slid.bs.carousel', (event) => {
        const slideIndex = event.to;
        carousel.to(slideIndex);

        overlay = document.querySelector('#hiddenCarousel .carousel-item.active .carousel_img_wrapper');
        overlay.viewer = null;
        overlay.viewer = renderer({
            minScale: 1,
            maxScale: 4,
            element: overlay,
            scaleSensitivity: 10
        });
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

    let carouselHiddenInner = hiddenCarouselDom.querySelector('.carousel-inner');
    const hammerMan = new Hammer(carouselHiddenInner);

    hammerMan.on('swipeleft', (event) => {
        carouselHidden.next();
    });
    hammerMan.on('swiperight', (event) => {
        carouselHidden.prev();
    });

    let isZoomedIn = false;
    document.querySelectorAll('#hiddenCarousel .carousel-item img').forEach((img) => {
        img.addEventListener('click', (event) => {
            if (!isZoomedIn) {
                overlay.viewer.panTo({ originX: overlay.clientWidth / 2, originY: overlay.clientHeight / 2, scale: 1 });
                overlay.viewer.zoom({ x: overlay.clientWidth / 2, y: overlay.clientHeight / 2, deltaScale: 8 });
                overlay.scrollIntoView({ block: 'center', inline: 'center' });
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