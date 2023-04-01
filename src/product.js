import { Carousel } from "bootstrap";
import Hammer from "hammerjs";
import { quantityListener, transListener } from "./productUtils/utils.js";
import { productGalleryHash, initialGalleryHash, scaleListener } from './productUtils/hiddenCarouselUtils.js';

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
            if (!item.classList.contains('active')) {
                // If it has the active class, leave the checkbox checked
                checkbox.checked = false;
            }
        });
    });

    const carouselImages = document.querySelectorAll('.carousel-item img');
    carouselImages.forEach((image) => {
        const hammer = new Hammer(image);
        hammer.get('pinch').set({ enable: true });

        let lastScale = 1;

        hammer.on('pinchstart', () => {
            lastScale = 1;
        });

        hammer.on('pinchmove', (event) => {
            const scale = Math.max(1, Math.min(lastScale * event.scale, 3));
            image.style.transform = `scale(${scale})`;
        });

        hammer.on('pinchend', () => {
            lastScale = image.style.transform.replace('scale(', '').replace(')', '') || 1;
        });
    });

    scaleListener();

    quantityListener();

    transListener();

    initialGalleryHash();
    window.onhashchange = productGalleryHash;
});