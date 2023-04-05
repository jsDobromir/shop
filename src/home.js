import buildCarousel from './homeUtils/carouselUtil';
import CustomCarousel from './homeUtils/CustomCarousel';

document.addEventListener('DOMContentLoaded', (ev) => {

    let kozmCarousel = new CustomCarousel('.container__prod__cosmetics__mobile', 'cosmetics');
    let supplementsCarousel = new CustomCarousel('.container__prod__supplements__mobile', 'supplements');
    let vitCarousel = new CustomCarousel('.container__prod__vitamins__mobile', 'vitamins');

    // let caroselSm = buildCarousel('carousel_sm', 'cosmetics');
    // let caroselMd = buildCarousel('carousel_md', 'cosmetics');
    let carouselXl = buildCarousel('carousel_xl', 'cosmetics');

    // let caroselSuppSm = buildCarousel('carousel_supp_sm', 'supplements');
    // let caroselSuppMd = buildCarousel('carousel_supp_md', 'supplements');
    let carouseSupplXl = buildCarousel('carousel_supp_xl', 'supplements');

    // let carouselVitSm = buildCarousel('carousel_vit_sm', 'vitamins');
    // let carouselVitMd = buildCarousel('carousel_vit_md', 'vitamins');
    let carouselVitXl = buildCarousel('carousel_vit_xl', 'vitamins');
});
