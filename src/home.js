import 'bootstrap/js/dist/util';
import Carousel from 'bootstrap/js/src/carousel';
import Hammer from 'hammerjs';

document.addEventListener('DOMContentLoaded', (ev) => {

    let bckInt = setInterval(() => {
        let home_desktop = document.querySelector('.header__desktop');
        let active = home_desktop.querySelector('.activeOpacity');
        let next = active.nextElementSibling;
        
        if (next) {
            active.classList.add('disabledOpacity');
            active.classList.remove('activeOpacity');

            next.classList.remove('disabledOpacity');
            next.classList.add('activeOpacity');
        }
        else {
            clearInterval(bckInt);
            //go to first element
            next = home_desktop.querySelector('.header__desktop__text-box-1');

            active.classList.add('disabledOpacity');
            active.classList.remove('activeOpacity');

            next.classList.remove('disabledOpacity');
            next.classList.add('activeOpacity');
        }
    }, 5000);

    const carouselInner = document.querySelector('.carousel__custom__inner');
    var sliderManager = new Hammer.Manager(carouselInner);
    let initialLeftMin = carouselInner.getBoundingClientRect().x;
    sliderManager.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
    sliderManager.on('pan', function (e) {
        let currentXposition = carouselInner.getBoundingClientRect().x;
        let newPosition = currentXposition + e.deltaX;
        let itemWidth = carouselInner.querySelector('.carousel__custom__inner__item').getBoundingClientRect().width / 4;
        carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
        if (e.isFinal) {
            let activeElement = carouselInner.querySelector('.active');
            if (e.distance > itemWidth) {
                console.log(e.additionalEvent);
                if (e.additionalEvent === 'panleft') {
                    let nextElement = activeElement.nextElementSibling;
                    if (!nextElement || !nextElement.classList.contains('carousel__custom__inner__item')) {
                        carouselInner.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                        return;
                    }
                    activeElement.classList.remove('active');
                    nextElement.classList.add('active');
                    let xPos = nextElement.getBoundingClientRect().x;
                    let currentXposition = carouselInner.getBoundingClientRect().x;
                    let newPosition = currentXposition - xPos;
                    carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
                    return;
                }
                else if (e.additionalEvent === 'panright') {
                    let prevElement = activeElement.previousElementSibling;
                    if (!prevElement || !prevElement.classList.contains('carousel__custom__inner__item')) {
                        carouselInner.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                        return;
                    }
    
                    activeElement.classList.remove('active');
                    prevElement.classList.add('active');
                    let xPos = prevElement.getBoundingClientRect().x;
                    let currentXposition = carouselInner.getBoundingClientRect().x;
                    let newPosition = currentXposition - xPos;
                    carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
                    return;
                }
            }
            
            else {
                let newPosition = currentXposition - activeElement.getBoundingClientRect().x;
                carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
                return;
            }
        }
        // let currentXposition = carouselInner.getBoundingClientRect().x;
        // let newPosition = currentXposition + e.deltaX;
        
        // if (newPosition < (-(carouselInner.scrollWidth - carouselInner.offsetWidth))) {
        //     let pos = carouselInner.scrollWidth - carouselInner.offsetWidth;
        //     carouselInner.style.transform = 'translateX(' + (-pos) + 'px)';
        //     carouselInner.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
        //     return;
        // }
        // if (newPosition > (-initialLeftMin)) {
        //     carouselInner.style.transform = `translateX(0%)`;
        //     carouselInner.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
        //     return;
        // }
        // carouselInner.parentElement.querySelector('.carousel-control-next').classList.remove('d-none');
        // carouselInner.parentElement.querySelector('.carousel-control-prev').classList.remove('d-none');
        // carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
    });

    carouselInner.parentElement.querySelector('.carousel-control-prev').addEventListener('click', (ev) => {
        let amount = getXAmount(carouselInner);
        let currentXposition = carouselInner.getBoundingClientRect().x;
        let newPosition = currentXposition + amount;
        if (newPosition > (-initialLeftMin)) {
            carouselInner.style.transform = `translateX(0%)`;
            carouselInner.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
            return;
        }
        carouselInner.parentElement.querySelector('.carousel-control-next').classList.remove('d-none');
        carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
    });

    carouselInner.parentElement.querySelector('.carousel-control-next').addEventListener('click', (ev) => {
        let activeElement = carouselInner.querySelector('.active');
        let nextElement = activeElement.nextElementSibling;
        console.log(nextElement);
        if (!nextElement || !nextElement.classList.contains('carousel__custom__inner__item')) {
            carouselInner.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
            return;
        }
        activeElement.classList.remove('active');
        nextElement.classList.add('active');
        console.log(nextElement.getBoundingClientRect());
        let xPos = nextElement.getBoundingClientRect().x;
        let currentXposition = carouselInner.getBoundingClientRect().x;
        let newPosition = currentXposition - xPos;
        carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
        // let amount = getXAmount(carouselInner);
        // let currentXposition = carouselInner.getBoundingClientRect().x;
        // let newPosition = currentXposition - amount;
        // if (newPosition < (-(carouselInner.scrollWidth - carouselInner.offsetWidth))) {
        //     let pos = carouselInner.scrollWidth - carouselInner.offsetWidth;
        //     carouselInner.style.transform = 'translateX(' + (-pos) + 'px)';
        //     carouselInner.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
        //     return;
        // }
        // carouselInner.parentElement.querySelector('.carousel-control-prev').classList.remove('d-none');
        // carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
    });

    // const carouselProductFirstSmallDom = document.querySelector('#carouselProductFirstSmall');
    // const carouselProductFistSmall = new Carousel(carouselProductFirstSmallDom, {
    //     interval: 5000,
    //     keyboard: true,
    //     pause: false,
    //     ride: false,
    //     touch: true,
    //     wrap: true
    // });

    // const carouselProductFirstMidDom = document.querySelector('#carouselProductFirstMid');
    // const carouselProdutFirstMid = new Carousel(carouselProductFirstMidDom, {
    //     interval: 5000,
    //     keyboard: true,
    //     pause: false,
    //     ride: false,
    //     touch: true,
    //     wrap: false
    // });

    const carouselProductFirstXLDom = document.querySelector('#carouselProductFirstXL');
    const carouselProductFirstXL = new Carousel(carouselProductFirstXLDom, {
        interval: 5000,
        keyboard: true,
        pause: false,
        ride: false,
        touch: true,
        wrap: false
    });

    const carouselVitaminiSmallDom = document.querySelector('#carouselVitaminiSmall');
    const carouselVitaminiSmall = new Carousel(carouselVitaminiSmallDom, {
        interval: 5000,
        keyboard: true,
        pause: false,
        ride: false,
        touch: true,
        wrap: false
    });

    const carouselVitaminiMidDom = document.querySelector('#carouselVitaminiMid');
    const carouselVitaminiMid = new Carousel(carouselVitaminiMidDom, {
        interval: 5000,
        keyboard: true,
        pause: false,
        ride: false,
        touch: true,
        wrap: false
    });

    const carouselVitaminiXLDom = document.querySelector('#carouselVitaminiXL');
    const carouselVitaminiXL = new Carousel(carouselVitaminiXLDom, {
        interval: 5000,
        keyboard: true,
        pause: false,
        ride: false,
        touch: true,
        wrap: false
    });

    // let carouselProductFistSmallLength = carouselProductFirstSmallDom.querySelectorAll('.carousel-item').length - 1;
    // if (carouselProductFistSmallLength) {
    //     carouselProductFirstSmallDom.querySelector('.carousel-control-next').classList.remove('d-none');
    // }
    // carouselProductFirstSmallDom.addEventListener('slid.bs.carousel', (e) => {
    //     if (e.to===0) {
    //         carouselProductFirstSmallDom.querySelector('.carousel-control-prev').classList.add('d-none');
    //         carouselProductFirstSmallDom.querySelector('.carousel-control-next').classList.remove('d-none');
    //     }
    //     else if (e.to===carouselProductFistSmallLength) {
    //         carouselProductFirstSmallDom.querySelector('.carousel-control-prev').classList.remove('d-none');
    //         carouselProductFirstSmallDom.querySelector('.carousel-control-next').classList.add('d-none');
    //     }
    //     else {
    //         carouselProductFirstSmallDom.querySelector('.carousel-control-prev').classList.remove('d-none');
    //         carouselProductFirstSmallDom.querySelector('.carousel-control-next').classList.remove('d-none');
    //     }
    // });

    // let carouselProductFistMidLength = carouselProductFirstMidDom.querySelectorAll('.carousel-item').length - 1;
    // if (carouselProductFistMidLength) {
    //     carouselProductFirstMidDom.querySelector('.carousel-control-next').classList.remove('d-none');
    // }
    // carouselProductFirstMidDom.addEventListener('slid.bs.carousel', (e) => {
    //     if (e.to===0) {
    //         carouselProductFirstMidDom.querySelector('.carousel-control-prev').classList.add('d-none');
    //         carouselProductFirstMidDom.querySelector('.carousel-control-next').classList.remove('d-none');
    //     }
    //     else if (e.to===carouselProductFistMidLength) {
    //         carouselProductFirstMidDom.querySelector('.carousel-control-prev').classList.remove('d-none');
    //         carouselProductFirstMidDom.querySelector('.carousel-control-next').classList.add('d-none');
    //     }
    //     else {
    //         carouselProductFirstMidDom.querySelector('.carousel-control-prev').classList.remove('d-none');
    //         carouselProductFirstMidDom.querySelector('.carousel-control-next').classList.remove('d-none');
    //     }
    // });

    let carouselProductXLLength = carouselProductFirstXLDom.querySelectorAll('.carousel-item').length - 1;
    if (carouselProductXLLength) {
        carouselProductFirstXLDom.querySelector('.carousel-control-next').classList.remove('d-none');
    }

    carouselProductFirstXLDom.addEventListener('slid.bs.carousel', (e) => {
        if (e.to===0) {
            carouselProductFirstXLDom.querySelector('.carousel-control-prev').classList.add('d-none');
            carouselProductFirstXLDom.querySelector('.carousel-control-next').classList.remove('d-none');
        }
        else if (e.to===carouselProductXLLength) {
            carouselProductFirstXLDom.querySelector('.carousel-control-prev').classList.remove('d-none');
            carouselProductFirstXLDom.querySelector('.carousel-control-next').classList.add('d-none');
        }
        else {
            carouselProductFirstXLDom.querySelector('.carousel-control-prev').classList.remove('d-none');
            carouselProductFirstXLDom.querySelector('.carousel-control-next').classList.remove('d-none');
        }
    });

    let carouselVitaminiSmallLength = carouselVitaminiSmallDom.querySelectorAll('.carousel-item').length - 1;
    if (carouselVitaminiSmallLength) {
        carouselVitaminiSmallDom.querySelector('.carousel-control-next').classList.remove('d-none');
    }

    carouselVitaminiSmallDom.addEventListener('slid.bs.carousel', (e) => {
        if (e.to===0) {
            carouselVitaminiSmallDom.querySelector('.carousel-control-prev').classList.add('d-none');
            carouselVitaminiSmallDom.querySelector('.carousel-control-next').classList.remove('d-none');
        }
        else if (e.to===carouselVitaminiSmallLength) {
            carouselVitaminiSmallDom.querySelector('.carousel-control-prev').classList.remove('d-none');
            carouselVitaminiSmallDom.querySelector('.carousel-control-next').classList.add('d-none');
        }
        else {
            carouselVitaminiSmallDom.querySelector('.carousel-control-prev').classList.remove('d-none');
            carouselVitaminiSmallDom.querySelector('.carousel-control-next').classList.remove('d-none');
        }
    });

    let carouselVitaminiMidLength = carouselVitaminiMidDom.querySelectorAll('.carousel-item').length - 1;
    if (carouselVitaminiMidLength) {
        carouselVitaminiMidDom.querySelector('.carousel-control-next').classList.remove('d-none');
    }

    carouselVitaminiMidDom.addEventListener('slid.bs.carousel', (e) => {
        if (e.to===0) {
            carouselVitaminiMidDom.querySelector('.carousel-control-prev').classList.add('d-none');
            carouselVitaminiMidDom.querySelector('.carousel-control-next').classList.remove('d-none');
        }
        else if (e.to===carouselVitaminiMidLength) {
            carouselVitaminiMidDom.querySelector('.carousel-control-prev').classList.remove('d-none');
            carouselVitaminiMidDom.querySelector('.carousel-control-next').classList.add('d-none');
        }
        else {
            carouselVitaminiMidDom.querySelector('.carousel-control-prev').classList.remove('d-none');
            carouselVitaminiMidDom.querySelector('.carousel-control-next').classList.remove('d-none');
        }
    });

    let carouselVitaminiXLLength = carouselVitaminiXLDom.querySelectorAll('.carousel-item').length - 1;
    if (carouselVitaminiXLLength) {
        carouselVitaminiXLDom.querySelector('.carousel-control-next').classList.remove('d-none');
    }

    carouselVitaminiXLDom.addEventListener('slid.bs.carousel', (e) => {
        if (e.to===0) {
            carouselVitaminiXLDom.querySelector('.carousel-control-prev').classList.add('d-none');
            carouselVitaminiXLDom.querySelector('.carousel-control-next').classList.remove('d-none');
        }
        else if (e.to===carouselVitaminiXLLength) {
            carouselVitaminiXLDom.querySelector('.carousel-control-prev').classList.remove('d-none');
            carouselVitaminiXLDom.querySelector('.carousel-control-next').classList.add('d-none');
        }
        else {
            carouselVitaminiXLDom.querySelector('.carousel-control-prev').classList.remove('d-none');
            carouselVitaminiXLDom.querySelector('.carousel-control-next').classList.remove('d-none');
        }
    });
});

function getXAmount(carouselInner) {
    let itemWidth = carouselInner.querySelector('.carousel__custom__inner__item').getBoundingClientRect().width;
    let ratio = carouselInner.offsetWidth / itemWidth;
    if (ratio < 2) {
        return itemWidth;
    }
    return itemWidth * 2;
}