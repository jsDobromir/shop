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

    const carouselImgWrappers = document.querySelectorAll('.carousel_img_wrapper');

    const mc = new Hammer.Manager(document.body);
    mc.add(new Hammer.Pinch());
    mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));

    let lastScale = 1;
    let lastPosX = 0;
    let lastPosY = 0;
    let isDragging = false;

    carouselImgWrappers.forEach((wrapper) => {
        const imgEl = wrapper.querySelector('img');
        const checkboxEl = wrapper.querySelector('input[type="checkbox"]');

        // disable checkbox click event while zooming
        let isPinching = false;
        mc.on('pinchstart', () => {
            isPinching = true;
        });
        mc.on('pinchend', () => {
            isPinching = false;
        });
        checkboxEl.addEventListener('click', (e) => {
            if (isPinching) {
                e.preventDefault();
            }
        });

        // enable pinch-to-zoom and panning
        mc.on('pinchmove', (e) => {
            const scale = Math.max(1, Math.min(lastScale * e.scale, 3));
            imgEl.style.transform = `scale(${scale}) translate(${lastPosX}px, ${lastPosY}px)`;
        });
        mc.on('panstart', () => {
            isDragging = true;
        });
        mc.on('panmove', (e) => {
            if (!isDragging || lastScale === 1) {
                return;
            }
            const { deltaX, deltaY } = e;
            lastPosX += deltaX;
            lastPosY += deltaY;
            imgEl.style.transform = `scale(${lastScale}) translate(${lastPosX}px, ${lastPosY}px)`;
        });
        mc.on('panend', () => {
            isDragging = false;
        });

        // reset zoom and position on checkbox change
        checkboxEl.addEventListener('change', () => {
            if (checkboxEl.checked) {
                imgEl.style.transform = '';
                lastScale = 1;
                lastPosX = 0;
                lastPosY = 0;
            }
        });

        // enable scrolling when not zoomed in
        wrapper.addEventListener('wheel', (e) => {
            if (lastScale === 1) {
                e.preventDefault();
                wrapper.scrollLeft += e.deltaY * 0.25;
            }
        });
    });

    scaleListener();

    quantityListener();

    transListener();

    initialGalleryHash();
    window.onhashchange = productGalleryHash;
});