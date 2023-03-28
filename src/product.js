import { Carousel } from "bootstrap";
import {quantityListener, transListener} from "./productUtils/utils.js";

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

    quantityListener();

    transListener();
});