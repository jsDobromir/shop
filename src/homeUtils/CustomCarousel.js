import Hammer from "hammerjs";

export default class CustomCarousel {

    constructor(carouselWrapper, type) {
        this.carouselWrapper = carouselWrapper;
        this.type = type;
        this.container = document.querySelector('.container__prod__cosmetics__mobile');
        this.carouselInner = document.querySelector(carouselWrapper).querySelector(`.container__prod__${this.type}__mobile__wrapper__inner`);
        this.carouselItems = Array.from(this.carouselInner.querySelectorAll(`.container__prod__${this.type}__mobile__wrapper__inner__item`));
        this.itemWidth = this.carouselItems[0].offsetWidth;
        this.sliderManager = new Hammer.Manager(this.carouselInner);
        this.items_to_slide = 1;
        let Pan = new Hammer.Pan({
            direction: Hammer.DIRECTION_HORIZONTAL,
            threshold: 10
        });
        this.sliderManager.add(Pan);
        this.currentPosition = 0;
        this.attachPanEvents();
    }

    attachPanEvents() {
        this.sliderManager.on('panleft', (event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) return;
            let activeElement = this.carouselInner.querySelector('.active');
            let nextElement = activeElement.nextElementSibling || null;
            var style = window.getComputedStyle(this.carouselInner);
            var matrix = new WebKitCSSMatrix(style.transform);
            const currentX = matrix.m41;
            const newX = currentX + event.deltaX;

            if (nextElement) {
                this.carouselInner.style.transform = `translateX(${newX}px)`;
            }

            if (nextElement) {
                let itemX = - (nextElement.offsetLeft - this.container.offsetLeft);
                let xPos = - (nextElement.offsetLeft);
                if (newX <= itemX && newX < itemX + this.itemWidth) {
                    activeElement.classList.remove('active');
                    nextElement.classList.add('active');
                    this.carouselInner.style.transform = `translateX(${xPos}px)`;
                    this.sliderManager.stop();
                    return;
                }
            }
        });
        this.sliderManager.on('panright', (event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) return;
            let activeElement = this.carouselInner.querySelector('.active');
            let prevElement = activeElement.previousElementSibling || null;
            var style = window.getComputedStyle(this.carouselInner);
            var matrix = new WebKitCSSMatrix(style.transform);
            const currentX = matrix.m41;
            const newX = currentX + event.deltaX;

            if (prevElement) {
                this.carouselInner.style.transform = `translateX(${newX}px)`;
            }
            if (prevElement) {
                let itemX = - ((prevElement.offsetLeft) - this.container.offsetLeft);
                let xPos = - (prevElement.offsetLeft);
                if (newX >= itemX && newX < itemX + this.itemWidth) {
                    activeElement.classList.remove('active');
                    prevElement.classList.add('active');
                    this.carouselInner.style.transform = `translateX(${xPos}px)`;
                    this.sliderManager.stop();
                    return;
                }
            }
        });
        // this.sliderManager.on('panleft panright', (event) => {
        //     let activeElement = this.carouselInner.querySelector('.active');
        //     let nextElement = activeElement.nextElementSibling || null;
        //     var style = window.getComputedStyle(this.carouselInner);
        //     var matrix = new WebKitCSSMatrix(style.transform);
        //     // let xPos = nextElement.getBoundingClientRect().x;
        //     // let currentXposition = this.carouselInner.getBoundingClientRect().x;
        //     // let newPosition = currentXposition - xPos;
        //     const currentX = matrix.m41;
        //     const newX = currentX + event.deltaX;
        //     //console.log(newX);
        //     // Update the position of the carousel
        //     if (newX > 0) return;
        //     if (nextElement) {
        //         let xPos = nextElement.offsetLeft - this.container.offsetLeft;
        //         console.log(`${matrix.m41}, ${xPos}`);
        //         if (deltaX >= xPos )
        //         // if (xPos <= newX) {
        //         //     this.carouselInner.style.transform = `translateX(${xPos}px)`;
        //         //     return;
        //         // }
        //     }
        //     this.carouselInner.style.transform = `translateX(${newX}px)`;
        // });
        this.sliderManager.on('panend', (event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) return;
            var panDirection = event.direction;

            if (panDirection === Hammer.DIRECTION_LEFT) {
                let activeElement = this.carouselInner.querySelector('.active');
                let nextElement = activeElement.nextElementSibling || null;
                if (nextElement) {
                    let xPos = - (nextElement.offsetLeft);
                    activeElement.classList.remove('active');
                    nextElement.classList.add('active');
                    this.carouselInner.style.transform = `translateX(${xPos}px)`;
                    return;
                }
            } else if (panDirection === Hammer.DIRECTION_RIGHT) {
                let activeElement = this.carouselInner.querySelector('.active');
                let prevElement = activeElement.previousElementSibling || null;
                if (prevElement) {
                    let xPos = - (prevElement.offsetLeft);
                    activeElement.classList.remove('active');
                    prevElement.classList.add('active');
                    this.carouselInner.style.transform = `translateX(${xPos}px)`;
                    return;
                }
            }
        })
    }

    // attachPanEvents() {
    //     if (this.items_to_slide >= 3) return;
    //     this.sliderManager.on('swipeleft', (e) => {
    //         let activeElement = this.carouselInner.querySelector('.active');
    //         let nextElement = null;
    //         if (this.items_to_slide === 1) {
    //             nextElement = activeElement.nextElementSibling;
    //         }
    //         activeElement.classList.remove('active');
    //         this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.remove('d-none');
    //         if (nextElement) {
    //             nextElement.classList.add('active');
    //         }
    //         //load next two images
    //         //preload the image
    //         let image1 = (nextElement && nextElement.nextElementSibling) ? nextElement.nextElementSibling.querySelector('.imgClass') : undefined;
    //         let promises = [];
    //         if (image1) promises.push(this.loadImage(image1));
    //         let image2 = (nextElement && nextElement.nextElementSibling && nextElement.nextElementSibling.nextElementSibling) ? nextElement.nextElementSibling.nextElementSibling.querySelector('.imgClass') : undefined;
    //         if (image2) promises.push(this.loadImage(image2));
    //         let image3 = (nextElement && nextElement.nextElementSibling && nextElement.nextElementSibling.nextElementSibling && nextElement.nextElementSibling.nextElementSibling.nextElementSibling) ? nextElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector('.imgClass') : undefined;
    //         if (image3) promises.push(this.loadImage(image3));
    //         //end loading images
    //         Promise.all(promises).then(() => {
    //             let xPos = nextElement.getBoundingClientRect().x;
    //             let currentXposition = this.carouselInner.getBoundingClientRect().x;
    //             let newPosition = currentXposition - xPos;
    //             this.currentPosition = newPosition;
    //             this.carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
    //             if (this.items_to_slide === 1) {
    //                 if (!nextElement.nextElementSibling) {
    //                     this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
    //                 }
    //             }
    //             return;
    //         });
    //     });
    //     this.sliderManager.on('swiperight', (e) => {
    //         let activeElement = this.carouselInner.querySelector('.active');
    //         let prevElement = null;
    //         if (this.items_to_slide === 1) {
    //             prevElement = activeElement.previousElementSibling;
    //         }
    //         activeElement.classList.remove('active');
    //         prevElement.classList.add('active');
    //         let xPos = prevElement.getBoundingClientRect().x;
    //         let currentXposition = this.carouselInner.getBoundingClientRect().x;
    //         let newPosition = currentXposition - xPos;
    //         this.currentPosition = newPosition;
    //         this.carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
    //         if (this.items_to_slide === 1) {
    //             if (!prevElement.previousElementSibling) {
    //                 this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
    //             }
    //         }
    //         return;
    //     });
    // }

    // attachArrowEvents() {
    //     this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').addEventListener('click', (ev) => {
    //         let activeElement = this.carouselInner.querySelector('.active');
    //         let prevElement = null;
    //         if (this.items_to_slide === 1) {
    //             prevElement = activeElement.previousElementSibling;
    //         }
    //         this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.remove('d-none');
    //         if (!prevElement || !prevElement.classList.contains(`container__prod__${this.type}__mobile__wrapper__inner__item`)) {
    //             return;
    //         }
    //         activeElement.classList.remove('active');
    //         prevElement.classList.add('active');
    //         let xPos = prevElement.getBoundingClientRect().x;
    //         let currentXposition = this.carouselInner.getBoundingClientRect().x;
    //         let newPosition = currentXposition - xPos;
    //         this.currentPosition = newPosition;
    //         this.carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
    //         if (this.items_to_slide === 1) {
    //             if (!prevElement.previousElementSibling) {
    //                 this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
    //             }
    //         }
    //         return;
    //     });

    //     this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').addEventListener('click', (ev) => {
    //         let activeElement = this.carouselInner.querySelector('.active');
    //         let nextElement = null;
    //         if (this.items_to_slide === 1) {
    //             nextElement = activeElement.nextElementSibling;
    //         }
    //         activeElement.classList.remove('active');
    //         this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.remove('d-none');
    //         if (nextElement) {
    //             nextElement.classList.add('active');
    //         }
    //         //load next two images
    //         //preload the image
    //         let image1 = (nextElement && nextElement.nextElementSibling) ? nextElement.nextElementSibling.querySelector('.imgClass') : undefined;
    //         let promises = [];
    //         if (image1) promises.push(this.loadImage(image1));
    //         let image2 = (nextElement && nextElement.nextElementSibling && nextElement.nextElementSibling.nextElementSibling) ? nextElement.nextElementSibling.nextElementSibling.querySelector('.imgClass') : undefined;
    //         if (image2) promises.push(this.loadImage(image2));
    //         let image3 = (nextElement && nextElement.nextElementSibling && nextElement.nextElementSibling.nextElementSibling && nextElement.nextElementSibling.nextElementSibling.nextElementSibling) ? nextElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector('.imgClass') : undefined;
    //         if (image3) promises.push(this.loadImage(image3));
    //         //
    //         Promise.all(promises).then(() => {
    //             let xPos = nextElement.getBoundingClientRect().x;
    //             let currentXposition = this.carouselInner.getBoundingClientRect().x;
    //             let newPosition = currentXposition - xPos;
    //             this.currentPosition = newPosition;
    //             this.carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
    //             if (this.items_to_slide === 1) {
    //                 if (!nextElement.nextElementSibling) {
    //                     this.carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
    //                 }
    //             }
    //             return;
    //         })
    //     });
    // }

    // loadImage(image) {
    //     return new Promise((resolve, reject) => {
    //         let src = image.dataset.src;
    //         image.src = src;
    //         image.onload = () => {
    //             return resolve();
    //         }
    //     })
    // }
}