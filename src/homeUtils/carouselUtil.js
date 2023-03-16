import { Carousel } from "bootstrap";

export default function buildCarousel(carouselWrapper) {
    const carouselDom = document.querySelector(`#${carouselWrapper}`);
    const carousel = new Carousel(carouselDom, {
        interval: 5000,
        keyboard: true,
        pause: false,
        ride: false,
        touch: true,
        wrap: true
    });
    const carouselLength = carouselDom.querySelectorAll('.carousel-item').length - 1;
    if (carouselLength) {
        carouselDom.querySelector('.carousel-control-next').classList.remove('d-none');
    }
    carouselDom.addEventListener('slid.bs.carousel', (e) => {
        if (e.to===0) {
            carouselDom.querySelector('.carousel-control-prev').classList.add('d-none');
            carouselDom.querySelector('.carousel-control-next').classList.remove('d-none');
        }
        else if (e.to===carouselLength) {
            carouselDom.querySelector('.carousel-control-prev').classList.remove('d-none');
            carouselDom.querySelector('.carousel-control-next').classList.add('d-none');
        }
        else {
            carouselDom.querySelector('.carousel-control-prev').classList.remove('d-none');
            carouselDom.querySelector('.carousel-control-next').classList.remove('d-none');
        }
    });
}