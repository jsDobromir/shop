import { Carousel } from "bootstrap";
import { quantityListener, transListener } from "./productUtils/utils.js";
import { productGalleryHash, initialGalleryHash } from './productUtils/hiddenCarouselUtils.js';
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
    let deltaScale = 0;
    let zoomInClicks=0;
    let nextAction ='zoomIn';

    document.querySelector('.zoom_in_button').addEventListener('click', (event) => {
        if (zoomInClicks>=3) return;
        deltaScale+=4;
        overlay.viewer.panTo({ originX: overlay.clientWidth /2, originY: overlay.clientHeight / 2, scale: 1 });
        overlay.viewer.zoom({ x: overlay.clientWidth / 2, y: overlay.clientHeight / 2, deltaScale: deltaScale });
        overlay.scrollIntoView({block: 'center', inline: 'center'});
        zoomInClicks++;
    });
    document.querySelector('.zoom_out_button').addEventListener('click', (event) => {
        if (zoomInClicks===0) return;
        zoomInClicks--;
        deltaScale-=4;
        if (zoomInClicks<=0) {
            overlay.viewer.panTo({ originX: 0, originY: 0, scale: 1 });
            return;
        }
        overlay.viewer.panTo({ originX: overlay.clientWidth /2, originY: overlay.clientHeight / 2, scale: 1 });
        overlay.viewer.zoom({ x: overlay.clientWidth / 2, y: overlay.clientHeight / 2, deltaScale: deltaScale });
        overlay.scrollIntoView({block: 'center', inline: 'center'});
    });

    quantityListener();

    transListener();

    initialGalleryHash();
    window.onhashchange = productGalleryHash;
});