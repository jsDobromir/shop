//import buildCarousel from './homeUtils/carouselUtil';
import slideCarousel from './homeUtils/slideCarousel';
import {Swiper} from 'swiper';

document.addEventListener('DOMContentLoaded', (ev) => {

    // let slideCarouselobj = new slideCarousel('container__prod__cosmetics__mobile', 'cosmetics');
    // let slideCarouselsupp = new slideCarousel('container__prod__supplements__mobile', 'supplements');
    // let slideCarouselobjvit = new slideCarousel('container__prod__vitamins__mobile', 'vitamins');
    const spaceBetweenRem = 1.0; // space between slides in rem
    const spaceBetweenPixels = parseFloat(getComputedStyle(document.documentElement).fontSize) * spaceBetweenRem;
    
    var swiper1 = new Swiper(".swiper-container-cosmetics", {
        slidesPerView: 'auto',
        spaceBetween: spaceBetweenPixels, 
        breakpoints: {
            576: {
                slidesPerView: 2
            }
        },
        on: {
            transitionEnd: function() {
                const activeSlide = this.slides[this.activeIndex];  
            }
        }
    });
    
    var swiper2 = new Swiper(".swiper-container-supplements", {
        slidesPerView: 'auto',
        spaceBetween: 10,
        
    });

    var swiper3 = new Swiper(".swiper-container-vitamins", {
        slidesPerView: 'auto',
        spaceBetween: 10,
        
    });

    // let carouselXl = buildCarousel('carousel_xl', 'cosmetics');

    // let carouseSupplXl = buildCarousel('carousel_supp_xl', 'supplements');

    // let carouselVitXl = buildCarousel('carousel_vit_xl', 'vitamins');
});
