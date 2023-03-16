import buildCarousel from './homeUtils/carouselUtil';
import CustomCarousel from './homeUtils/CustomCarousel';

document.addEventListener('DOMContentLoaded', (ev) => {

    let kozmCarousel = new CustomCarousel('.container__prod__cosmetics__mobile');
    let caroselSm = buildCarousel('carousel_sm');
    let caroselMd = buildCarousel('carousel_md');
    let carouselXl = buildCarousel('carousel_xl');
});
