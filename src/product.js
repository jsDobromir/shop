import { Carousel } from "bootstrap";
import { quantityListener, transListener, attachSlideListener, zoomIn, zoomOut} from "./productUtils/utils.js";
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

    let isZoomedIn = false;

    const hiddenCaroselMan = hiddenCarouselDom.querySelector('.carousel-inner');
    let hammerTime = new Hammer(hiddenCaroselMan);
    hammerTime.on('swipeleft', (event) => {
        console.log('swipeleft');
        if (!isZoomedIn) {
            carouselHidden.next();
        }
    });

    hammerTime.on('swiperight', (event) => {
        console.log('right');
        if (!isZoomedIn) {
            carouselHidden.prev();
        }
    });

    document.querySelector('.zoom-in-icon').addEventListener('click', (event) => {
        event.preventDefault();
        let carousel_item_parent = hiddenCarouselDom.querySelector('.carousel-item.active');
        if (isZoomedIn) return;
        let img = carousel_item_parent.querySelector('img');
        zoomIn(overlay, carousel_item_parent, img);
        isZoomedIn = true;
    });

    document.querySelector('.zoom-out-icon').addEventListener('click', (event) => {
        event.preventDefault();
        let carousel_item_parent = hiddenCarouselDom.querySelector('.carousel-item.active');
        if (!isZoomedIn) return;
        let img = carousel_item_parent.querySelector('img');
        zoomOut(overlay, carousel_item_parent, img);
        isZoomedIn = false;
    });

    document.querySelectorAll('#hiddenCarousel .carousel-item img').forEach((img) => {
        img.addEventListener('click', (event) => {
            let carousel_item_parent = img.closest('.carousel-item');
            if (!isZoomedIn) {
                zoomIn(overlay, carousel_item_parent, img);
                isZoomedIn = true;
            } else {
                zoomOut(overlay, carousel_item_parent, img);
                isZoomedIn = false;
            }
        });
    });



    quantityListener();

    transListener();

    initialGalleryHash();
    window.onhashchange = productGalleryHash;
});