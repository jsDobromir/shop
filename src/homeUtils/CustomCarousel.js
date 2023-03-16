import Hammer from "hammerjs";

export default class CustomCarousel {

    constructor(carouselWrapper) {
        this.carouselWrapper = carouselWrapper;
        this.carouselInner = document.querySelector(carouselWrapper).querySelector('.container__prod__cosmetics__mobile__wrapper__inner');
        this.sliderManager = new Hammer.Manager(this.carouselInner);
        this.items_to_slide = 1;
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
            activeElement.classList.remove('active');
            if (nextElement) {
                nextElement.classList.add('active');
            }
            //load next two images
            //preload the image
            let image1 = (nextElement && nextElement.nextElementSibling) ? nextElement.nextElementSibling.querySelector('.imgClass') : undefined;
            if (image1) {
                let srcset = image1.dataset.srcset;
                let imagesArray =srcset.split(',');
                imagesArray = imagesArray.map(img => {
                    return img.split(' ')[0];
                });
                console.log(imagesArray);
                for (let i=0;i<imagesArray.length;i++) {
                    const loadedimage = new Image();
                    loadedimage.src = imagesArray[i];
                }
                image1.srcset = srcset;
            }
            let image2 = (nextElement && nextElement.nextElementSibling && nextElement.nextElementSibling.nextElementSibling) ? nextElement.nextElementSibling.nextElementSibling.querySelector('.imgClass') : undefined;
            if (image2) {
                let srcset = image2.dataset.srcset;
                let imagesArray =srcset.split(',');
                imagesArray = imagesArray.map(img => {
                    return img.split(' ')[0];
                });
                console.log(imagesArray);
                for (let i=0;i<imagesArray.length;i++) {
                    const loadedimage = new Image();
                    loadedimage.src = imagesArray[i];
                }
                image2.srcset = srcset;
            }
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
            return;
        });
        this.sliderManager.on('swiperight',  (e) => {
            let activeElement = this.carouselInner.querySelector('.active');
            let prevElement = null;
            if (this.items_to_slide === 1) {
                prevElement = activeElement.previousElementSibling;
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
            this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.remove('d-none');
            if (!prevElement || !prevElement.classList.contains('container__prod__cosmetics__mobile__wrapper__inner__item')) {
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
            return;
        });
    
        this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').addEventListener('click', (ev) => {
            let activeElement = this.carouselInner.querySelector('.active');
            let nextElement = null;
            if (this.items_to_slide === 1) {
                nextElement = activeElement.nextElementSibling;
            }
            activeElement.classList.remove('active');
            if (nextElement) {
                nextElement.classList.add('active');
            }
            //load next two images
            //preload the image
            let image1 = (nextElement && nextElement.nextElementSibling) ? nextElement.nextElementSibling.querySelector('.imgClass') : undefined;
            if (image1) {
                let srcset = image1.dataset.srcset;
                const loadedimage = new Image();
                loadedimage.srcset = srcset;
                loadedimage.onload = () => console.log('image loaded');
                image1.srcset = srcset;
            }
            let image2 = (nextElement && nextElement.nextElementSibling && nextElement.nextElementSibling.nextElementSibling) ? nextElement.nextElementSibling.nextElementSibling.querySelector('.imgClass') : undefined;
            if (image2) {
                let srcset = image2.dataset.srcset;
                const loadedimage = new Image();
                loadedimage.srcset = srcset;
                loadedimage.onload = () => console.log('image loaded');
                image2.srcset = srcset;
            }
            //
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
            return;
        });
    }
}