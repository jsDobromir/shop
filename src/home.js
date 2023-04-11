//import buildCarousel from './homeUtils/carouselUtil';
import slideCarousel from './homeUtils/slideCarousel';
import {Swiper} from 'swiper';

document.addEventListener('DOMContentLoaded', (ev) => {

    // let slideCarouselobj = new slideCarousel('container__prod__cosmetics__mobile', 'cosmetics');
    // let slideCarouselsupp = new slideCarousel('container__prod__supplements__mobile', 'supplements');
    // let slideCarouselobjvit = new slideCarousel('container__prod__vitamins__mobile', 'vitamins');

    var swiper = new Swiper(".swiper", {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        
    });
    console.log(swiper);

    // let carouselXl = buildCarousel('carousel_xl', 'cosmetics');

    // let carouseSupplXl = buildCarousel('carousel_supp_xl', 'supplements');

    // let carouselVitXl = buildCarousel('carousel_vit_xl', 'vitamins');
});
