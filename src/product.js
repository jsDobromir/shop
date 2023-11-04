import { quantityListener, transListener, attachSlideListener, zoomIn, zoomOut} from "./productUtils/utils.js";
import { productGalleryHash, initialGalleryHash } from './productUtils/hiddenCarouselUtils.js';
import {Swiper, Pagination} from "swiper";

document.addEventListener('DOMContentLoaded', (event) => {
    Swiper.use([Pagination]);
    
    const swiper = new Swiper('.flipSwiper', {
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
        pagination: {
            el: '.swiper-pagination'
        }
    });
    
    quantityListener();

    transListener();

    initialGalleryHash();
    window.onhashchange = productGalleryHash;
});