import Hammer from 'hammerjs';
import Carousel from './homeUtils/Carousel';

document.addEventListener('DOMContentLoaded', (ev) => {

    let kozmCarousel = new Carousel('.kozmetika__carousel');
    let vitCarousel = new Carousel('.vitamini__carousel');

    window.addEventListener('resize', (event) => {
        kozmCarousel.updateSlides();
        vitCarousel.updateSlides();
    });

});
