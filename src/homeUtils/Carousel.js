import Hammer from "hammerjs";

export default class Carousel {

    constructor(carouselWrapper) {
        this.carouselWrapper = carouselWrapper;
        this.carouselInner = document.querySelector(carouselWrapper).querySelector('.carousel__custom__wrapper__inner');
        this.sliderManager = new Hammer.Manager(this.carouselInner);
        this.items_to_slide = parseInt(window.getComputedStyle(this.carouselInner.parentElement).getPropertyValue('--item_to_slide'), 10);
        let Swipe = new Hammer.Swipe({
            direction: Hammer.DIRECTION_HORIZONTAL
        });
        this.sliderManager.add(Swipe);
        this.currentPosition = 0;
        this.attachPanEvents();
        this.attachArrowEvents();
    }

    attachPanEvents() {
        if (this.items_to_slide >= 3) return;
        this.sliderManager.on('swipeleft', (e) => {
            let activeElement = this.carouselInner.querySelector('.active');
            let nextElement = null;
            if (this.items_to_slide === 1) {
                nextElement = activeElement.nextElementSibling;
            }
            else if (this.items_to_slide === 2) {
                nextElement = activeElement.nextElementSibling ? activeElement.nextElementSibling.nextElementSibling : null;
            }
            this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.remove('d-none');
            if (!nextElement || !nextElement.classList.contains('carousel__custom__wrapper__inner__item')) {
                return;
            }
            activeElement.classList.remove('active');
            nextElement.classList.add('active');
            let xPos = nextElement.getBoundingClientRect().x;
            let currentXposition = this.carouselInner.getBoundingClientRect().x;
            let newPosition = currentXposition - xPos;
            this.currentPosition = newPosition;
            this.carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
            if (this.items_to_slide === 1) {
                if (!nextElement.nextElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                }
            }
            else if (this.items_to_slide === 2) {
                let nextElementSibling = nextElement.nextElementSibling;
                if (!nextElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                }
                if (nextElementSibling && !nextElementSibling.nextElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                }
            }
            return;
        });
        this.sliderManager.on('swiperight',  (e) => {
            let activeElement = this.carouselInner.querySelector('.active');
            let prevElement = null;
            if (this.items_to_slide === 1) {
                prevElement = activeElement.previousElementSibling;
            }
            else if (this.items_to_slide === 2) {
                prevElement = activeElement.previousElementSibling ? activeElement.previousElementSibling.previousElementSibling : null;
            }
            this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.remove('d-none');
            if (!prevElement || !prevElement.classList.contains('carousel__custom__wrapper__inner__item')) {
                return;
            }
            activeElement.classList.remove('active');
            prevElement.classList.add('active');
            let xPos = prevElement.getBoundingClientRect().x;
            let currentXposition = this.carouselInner.getBoundingClientRect().x;
            let newPosition = currentXposition - xPos;
            this.currentPosition = newPosition;
            this.carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
            if (this.items_to_slide === 1) {
                if (!prevElement.previousElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                }
            }
            else if (this.items_to_slide === 2) {
                let prevElementSibling = prevElement.previousElementSibling;
                if (!prevElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                }
                if (prevElementSibling && !prevElementSibling.previousElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                }
            }
            return;
        });
    }

    attachArrowEvents() {
        this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').addEventListener('click', (ev) => {
            let activeElement = this.carouselInner.querySelector('.active');
            let prevElement = null;
            if (this.items_to_slide === 1) {
                prevElement = activeElement.previousElementSibling;
            }
            else if (this.items_to_slide === 2) {
                prevElement = activeElement.previousElementSibling ? activeElement.previousElementSibling.previousElementSibling : null;
            }
            else if (this.items_to_slide === 3) {
                prevElement = (activeElement.previousElementSibling && activeElement.previousElementSibling.previousElementSibling) ?
                    activeElement.previousElementSibling.previousElementSibling.previousElementSibling : null;
            }
            this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.remove('d-none');
            if (!prevElement || !prevElement.classList.contains('carousel__custom__wrapper__inner__item')) {
                return;
            }
            activeElement.classList.remove('active');
            prevElement.classList.add('active');
            let xPos = prevElement.getBoundingClientRect().x;
            let currentXposition = this.carouselInner.getBoundingClientRect().x;
            let newPosition = currentXposition - xPos;
            this.currentPosition = newPosition;
            this.carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
            if (this.items_to_slide === 1) {
                if (!prevElement.previousElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                }
            }
            else if (this.items_to_slide === 2) {
                let prevElementSibling = prevElement.previousElementSibling;
                if (!prevElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                    return;
                }
                if (prevElementSibling && !prevElementSibling.previousElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                    return;
                }
            }
            else if (this.items_to_slide === 3) {
                let prevElementSibling = prevElement.previousElementSibling;
                if (!prevElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                    return;
                }
                let prevPrevElementSibling = prevElementSibling.previousElementSibling;
                if (!prevPrevElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                    return;
                }
                let prevPrevPrevElementSiblig = prevPrevElementSibling.previousElementSibling;
                if (!prevPrevPrevElementSiblig) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                    return;
                }
            }
            return;
        });
    
        this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').addEventListener('click', (ev) => {
            let activeElement = this.carouselInner.querySelector('.active');
            let nextElement = null;
            if (this.items_to_slide === 1) {
                nextElement = activeElement.nextElementSibling;
            }
            else if (this.items_to_slide === 2) {
                nextElement = activeElement.nextElementSibling ? activeElement.nextElementSibling.nextElementSibling : null;
            }
            else if (this.items_to_slide === 3) {
                nextElement = (activeElement.nextElementSibling && activeElement.nextElementSibling.nextElementSibling) ?
                    activeElement.nextElementSibling.nextElementSibling.nextElementSibling : null;
            }
            this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.remove('d-none');
            if (!nextElement || !nextElement.classList.contains('carousel__custom__wrapper__inner__item')) {
                return;
            }
            activeElement.classList.remove('active');
            nextElement.classList.add('active');
            let xPos = nextElement.getBoundingClientRect().x;
            let currentXposition = this.carouselInner.getBoundingClientRect().x;
            let newPosition = currentXposition - xPos;
            this.currentPosition = newPosition;
            this.carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
            if (this.items_to_slide === 1) {
                if (!nextElement.nextElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                }
            }
            else if (this.items_to_slide === 2) {
                let nextElementSibling = nextElement.nextElementSibling;
                if (!nextElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                    return;
                }
                if (nextElementSibling && !nextElementSibling.nextElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                    return;
                }
            }
            else if (this.items_to_slide === 3) {
                let nextElementSibling = nextElement.nextElementSibling;
                if (!nextElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                    return;
                }
                let nextNextElementSibling = nextElementSibling.nextElementSibling;
                if (!nextNextElementSibling) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                    return;
                }
                let nextNextNextElementSiblig = nextNextElementSibling.nextElementSibling;
                if (!nextNextNextElementSiblig) {
                    this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                    return;
                }
            }
            return;
        });
    }

    updateSlides() {
        this.items_to_slide = parseInt(window.getComputedStyle(this.carouselInner.parentElement).getPropertyValue('--item_to_slide'), 10);
    }
}