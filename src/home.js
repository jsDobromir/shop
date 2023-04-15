//import buildCarousel from './homeUtils/carouselUtil';
import slideCarousel from './homeUtils/slideCarousel';
import {Swiper} from 'swiper';

document.addEventListener('DOMContentLoaded', (ev) => {

    // let slideCarouselobj = new slideCarousel('container__prod__cosmetics__mobile', 'cosmetics');
    // let slideCarouselsupp = new slideCarousel('container__prod__supplements__mobile', 'supplements');
    // let slideCarouselobjvit = new slideCarousel('container__prod__vitamins__mobile', 'vitamins');
    const spaceBetweenRem = 1.3; // space between slides in rem
    const spaceBetweenPixels = parseFloat(getComputedStyle(document.documentElement).fontSize) * spaceBetweenRem;
    
    const spaceBetweenRemLg = 2;
    const spaceBetweenPixelsLg = parseFloat(getComputedStyle(document.documentElement).fontSize) * spaceBetweenRemLg;

    const spaceBetweenRemXL = 3;
    const spaceBetweenPixelsXL = parseFloat(getComputedStyle(document.documentElement).fontSize) * spaceBetweenRemXL;

    var swiper1 = new Swiper(".swiper-container-cosmetics", {
        slidesPerView: 'auto',
        spaceBetween: spaceBetweenPixels,
        breakpoints: {
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 'auto'
            },
            992: {
                slidesPerView: 3,
                spaceBetween: spaceBetweenPixelsLg
            },
            1200: {
                slidesPerView: 'auto'
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: spaceBetweenPixelsXL
            }
        }
    });
    
    var swiper2 = new Swiper(".swiper-container-supplements", {
        slidesPerView: 'auto',
        spaceBetween: 10,
        spaceBetween: spaceBetweenPixels,
        breakpoints: {
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 'auto'
            },
            992: {
                slidesPerView: 3,
                spaceBetween: spaceBetweenPixelsLg
            },
            1200: {
                slidesPerView: 'auto'
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: spaceBetweenPixelsXL
            }
        }
    });

    var swiper3 = new Swiper(".swiper-container-vitamins", {
        slidesPerView: 'auto',
        spaceBetween: 10,
        spaceBetween: spaceBetweenPixels,
        breakpoints: {
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 'auto'
            },
            992: {
                slidesPerView: 3,
                spaceBetween: spaceBetweenPixelsLg
            },
            1200: {
                slidesPerView: 'auto'
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: spaceBetweenPixelsXL
            }
        }
    });

    // let carouselXl = buildCarousel('carousel_xl', 'cosmetics');

    // let carouseSupplXl = buildCarousel('carousel_supp_xl', 'supplements');

    // let carouselVitXl = buildCarousel('carousel_vit_xl', 'vitamins');
});
