import 'bootstrap/js/dist/util';
import Carousel from 'bootstrap/js/src/carousel';
import Hammer from 'hammerjs';

document.addEventListener('DOMContentLoaded', (ev) => {

    // let bckInt = setInterval(() => {
    //     let home_desktop = document.querySelector('.header__desktop');
    //     let active = home_desktop.querySelector('.activeOpacity');
    //     let next = active.nextElementSibling;

    //     if (next) {
    //         active.classList.add('disabledOpacity');
    //         active.classList.remove('activeOpacity');

    //         next.classList.remove('disabledOpacity');
    //         next.classList.add('activeOpacity');
    //     }
    //     else {
    //         clearInterval(bckInt);
    //         //go to first element
    //         next = home_desktop.querySelector('.header__desktop__text-box-1');

    //         active.classList.add('disabledOpacity');
    //         active.classList.remove('activeOpacity');

    //         next.classList.remove('disabledOpacity');
    //         next.classList.add('activeOpacity');
    //     }
    // }, 5000);

    const carouselInner = document.querySelector('.kozmetika__carousel').querySelector('.carousel__custom__wrapper__inner');
    var sliderManager = new Hammer.Manager(carouselInner);
    const items_to_slide = parseInt(window.getComputedStyle(carouselInner.parentElement).getPropertyValue('--item_to_slide'), 10);
    let Swipe = new Hammer.Swipe({
        direction: Hammer.DIRECTION_HORIZONTAL
    });
    sliderManager.add(Swipe);
    if (items_to_slide < 3) {
        sliderManager.on('swipeleft', function (e) {
            let activeElement = carouselInner.querySelector('.active');
            let nextElement = null;
            if (items_to_slide === 1) {
                nextElement = activeElement.nextElementSibling;
            }
            else if (items_to_slide === 2) {
                nextElement = activeElement.nextElementSibling ? activeElement.nextElementSibling.nextElementSibling : null;
            }
            carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.remove('d-none');
            if (!nextElement || !nextElement.classList.contains('carousel__custom__wrapper__inner__item')) {
                return;
            }
            activeElement.classList.remove('active');
            nextElement.classList.add('active');
            let xPos = nextElement.getBoundingClientRect().x;
            let currentXposition = carouselInner.getBoundingClientRect().x;
            let newPosition = currentXposition - xPos;
            carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
            if (items_to_slide === 1) {
                if (!nextElement.nextElementSibling) {
                    carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                }
            }
            else if (items_to_slide === 2) {
                let nextElementSibling = nextElement.nextElementSibling;
                if (!nextElementSibling) {
                    carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                }
                if (nextElementSibling && !nextElementSibling.nextElementSibling) {
                    carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                }
            }
            return;
        });
        sliderManager.on('swiperight', function (e) {
            let activeElement = carouselInner.querySelector('.active');
            let prevElement = null;
            if (items_to_slide === 1) {
                prevElement = activeElement.previousElementSibling;
            }
            else if (items_to_slide === 2) {
                prevElement = activeElement.previousElementSibling ? activeElement.previousElementSibling.previousElementSibling : null;
            }
            carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.remove('d-none');
            if (!prevElement || !prevElement.classList.contains('carousel__custom__wrapper__inner__item')) {
                return;
            }
            activeElement.classList.remove('active');
            prevElement.classList.add('active');
            let xPos = prevElement.getBoundingClientRect().x;
            let currentXposition = carouselInner.getBoundingClientRect().x;
            let newPosition = currentXposition - xPos;
            carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
            if (items_to_slide === 1) {
                if (!prevElement.previousElementSibling) {
                    carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                }
            }
            else if (items_to_slide === 2) {
                let prevElementSibling = prevElement.previousElementSibling;
                if (!prevElementSibling) {
                    carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                }
                if (prevElementSibling && !prevElementSibling.previousElementSibling) {
                    carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                }
            }
            return;
        });
    }
    carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').addEventListener('click', (ev) => {
        let activeElement = carouselInner.querySelector('.active');
        let prevElement = null;
        if (items_to_slide === 1) {
            prevElement = activeElement.previousElementSibling;
        }
        else if (items_to_slide === 2) {
            prevElement = activeElement.previousElementSibling ? activeElement.previousElementSibling.previousElementSibling : null;
        }
        else if (items_to_slide === 3) {
            prevElement = (activeElement.previousElementSibling && activeElement.previousElementSibling.previousElementSibling) ?
                activeElement.previousElementSibling.previousElementSibling.previousElementSibling : null;
        }
        carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.remove('d-none');
        if (!prevElement || !prevElement.classList.contains('carousel__custom__wrapper__inner__item')) {
            return;
        }
        activeElement.classList.remove('active');
        prevElement.classList.add('active');
        let xPos = prevElement.getBoundingClientRect().x;
        let currentXposition = carouselInner.getBoundingClientRect().x;
        let newPosition = currentXposition - xPos;
        carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
        if (items_to_slide === 1) {
            if (!prevElement.previousElementSibling) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
            }
        }
        else if (items_to_slide === 2) {
            let prevElementSibling = prevElement.previousElementSibling;
            if (!prevElementSibling) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                return;
            }
            if (prevElementSibling && !prevElementSibling.previousElementSibling) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                return;
            }
        }
        else if (items_to_slide === 3) {
            let prevElementSibling = prevElement.previousElementSibling;
            if (!prevElementSibling) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                return;
            }
            let prevPrevElementSibling = prevElementSibling.previousElementSibling;
            if (!prevPrevElementSibling) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                return;
            }
            let prevPrevPrevElementSiblig = prevPrevElementSibling.previousElementSibling;
            if (!prevPrevPrevElementSiblig) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                return;
            }
        }
        return;
    });

    carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').addEventListener('click', (ev) => {
        let activeElement = carouselInner.querySelector('.active');
        let nextElement = null;
        if (items_to_slide === 1) {
            nextElement = activeElement.nextElementSibling;
        }
        else if (items_to_slide === 2) {
            nextElement = activeElement.nextElementSibling ? activeElement.nextElementSibling.nextElementSibling : null;
        }
        else if (items_to_slide === 3) {
            nextElement = (activeElement.nextElementSibling && activeElement.nextElementSibling.nextElementSibling) ?
                activeElement.nextElementSibling.nextElementSibling.nextElementSibling : null;
        }
        carouselInner.parentElement.parentElement.querySelector('.carousel-control-prev').classList.remove('d-none');
        if (!nextElement || !nextElement.classList.contains('carousel__custom__wrapper__inner__item')) {
            return;
        }
        activeElement.classList.remove('active');
        nextElement.classList.add('active');
        let xPos = nextElement.getBoundingClientRect().x;
        let currentXposition = carouselInner.getBoundingClientRect().x;
        let newPosition = currentXposition - xPos;
        carouselInner.style.transform = 'translateX(' + (newPosition) + 'px)';
        if (items_to_slide === 1) {
            if (!nextElement.nextElementSibling) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
            }
        }
        else if (items_to_slide === 2) {
            let nextElementSibling = nextElement.nextElementSibling;
            if (!nextElementSibling) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                return;
            }
            if (nextElementSibling && !nextElementSibling.nextElementSibling) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                return;
            }
        }
        else if (items_to_slide === 3) {
            let nextElementSibling = nextElement.nextElementSibling;
            if (!nextElementSibling) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                return;
            }
            let nextNextElementSibling = nextElementSibling.nextElementSibling;
            if (!nextNextElementSibling) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                return;
            }
            let nextNextNextElementSiblig = nextNextElementSibling.nextElementSibling;
            if (!nextNextNextElementSiblig) {
                carouselInner.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                return;
            }
        }
        return;
    });

    /////////////////////////////////////////////////

    const carouselInnerVit = document.querySelector('.vitamini__carousel').querySelector('.carousel__custom__wrapper__inner');
    var sliderManagerVit = new Hammer.Manager(carouselInnerVit);
    const items_to_slideVit = parseInt(window.getComputedStyle(carouselInnerVit.parentElement).getPropertyValue('--item_to_slide'), 10);
    let SwipeVit = new Hammer.Swipe({
        direction: Hammer.DIRECTION_HORIZONTAL
    });
    sliderManagerVit.add(SwipeVit);
    if (items_to_slideVit < 3) {
        sliderManagerVit.on('swipeleft', function (e) {
            let activeElement = carouselInnerVit.querySelector('.active');
            let nextElement = null;
            if (items_to_slideVit === 1) {
                nextElement = activeElement.nextElementSibling;
            }
            else if (items_to_slideVit === 2) {
                nextElement = activeElement.nextElementSibling ? activeElement.nextElementSibling.nextElementSibling : null;
            }
            carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').classList.remove('d-none');
            if (!nextElement || !nextElement.classList.contains('carousel__custom__wrapper__inner__item')) {
                return;
            }
            activeElement.classList.remove('active');
            nextElement.classList.add('active');
            let xPos = nextElement.getBoundingClientRect().x;
            let currentXposition = carouselInnerVit.getBoundingClientRect().x;
            let newPosition = currentXposition - xPos;
            carouselInnerVit.style.transform = 'translateX(' + (newPosition) + 'px)';
            if (items_to_slideVit === 1) {
                if (!nextElement.nextElementSibling) {
                    carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                }
            }
            else if (items_to_slideVit === 2) {
                let nextElementSibling = nextElement.nextElementSibling;
                if (!nextElementSibling) {
                    carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                }
                if (nextElementSibling && !nextElementSibling.nextElementSibling) {
                    carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                }
            }
            return;
        });
        sliderManagerVit.on('swiperight', function (e) {
            let activeElement = carouselInnerVit.querySelector('.active');
            let prevElement = null;
            if (items_to_slideVit === 1) {
                prevElement = activeElement.previousElementSibling;
            }
            else if (items_to_slideVit === 2) {
                prevElement = activeElement.previousElementSibling ? activeElement.previousElementSibling.previousElementSibling : null;
            }
            carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').classList.remove('d-none');
            if (!prevElement || !prevElement.classList.contains('carousel__custom__wrapper__inner__item')) {
                return;
            }
            activeElement.classList.remove('active');
            prevElement.classList.add('active');
            let xPos = prevElement.getBoundingClientRect().x;
            let currentXposition = carouselInnerVit.getBoundingClientRect().x;
            let newPosition = currentXposition - xPos;
            carouselInnerVit.style.transform = 'translateX(' + (newPosition) + 'px)';
            if (items_to_slideVit === 1) {
                if (!prevElement.previousElementSibling) {
                    carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                }
            }
            else if (items_to_slideVit === 2) {
                let prevElementSibling = prevElement.previousElementSibling;
                if (!prevElementSibling) {
                    carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                }
                if (prevElementSibling && !prevElementSibling.previousElementSibling) {
                    carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                }
            }
            return;
        });
    }
    carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').addEventListener('click', (ev) => {
        let activeElement = carouselInnerVit.querySelector('.active');
        let prevElement = null;
        if (items_to_slideVit === 1) {
            prevElement = activeElement.previousElementSibling;
        }
        else if (items_to_slideVit === 2) {
            prevElement = activeElement.previousElementSibling ? activeElement.previousElementSibling.previousElementSibling : null;
        }
        else if (items_to_slide === 3) {
            prevElement = (activeElement.previousElementSibling && activeElement.previousElementSibling.previousElementSibling) ?
                activeElement.previousElementSibling.previousElementSibling.previousElementSibling : null;
        }
        carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').classList.remove('d-none');
        if (!prevElement || !prevElement.classList.contains('carousel__custom__wrapper__inner__item')) {
            return;
        }
        activeElement.classList.remove('active');
        prevElement.classList.add('active');
        let xPos = prevElement.getBoundingClientRect().x;
        let currentXposition = carouselInnerVit.getBoundingClientRect().x;
        let newPosition = currentXposition - xPos;
        carouselInnerVit.style.transform = 'translateX(' + (newPosition) + 'px)';
        if (items_to_slideVit === 1) {
            if (!prevElement.previousElementSibling) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
            }
        }
        else if (items_to_slideVit === 2) {
            let prevElementSibling = prevElement.previousElementSibling;
            if (!prevElementSibling) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
            }
            if (prevElementSibling && !prevElementSibling.previousElementSibling) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
            }
        }
        else if (items_to_slide === 3) {
            let prevElementSibling = prevElement.previousElementSibling;
            if (!prevElementSibling) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                return;
            }
            let prevPrevElementSibling = prevElementSibling.previousElementSibling;
            if (!prevPrevElementSibling) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                return;
            }
            let prevPrevPrevElementSiblig = prevPrevElementSibling.previousElementSibling;
            if (!prevPrevPrevElementSiblig) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').classList.add('d-none');
                return;
            }
        }
        return;
    });

    carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').addEventListener('click', (ev) => {
        let activeElement = carouselInnerVit.querySelector('.active');
        let nextElement = null;
        if (items_to_slideVit === 1) {
            nextElement = activeElement.nextElementSibling;
        }
        else if (items_to_slideVit === 2) {
            nextElement = activeElement.nextElementSibling ? activeElement.nextElementSibling.nextElementSibling : null;
        }
        else if (items_to_slide === 3) {
            nextElement = (activeElement.nextElementSibling && activeElement.nextElementSibling.nextElementSibling) ?
                activeElement.nextElementSibling.nextElementSibling.nextElementSibling : null;
        }
        carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-prev').classList.remove('d-none');
        if (!nextElement || !nextElement.classList.contains('carousel__custom__wrapper__inner__item')) {
            return;
        }
        activeElement.classList.remove('active');
        nextElement.classList.add('active');
        let xPos = nextElement.getBoundingClientRect().x;
        let currentXposition = carouselInnerVit.getBoundingClientRect().x;
        let newPosition = currentXposition - xPos;
        carouselInnerVit.style.transform = 'translateX(' + (newPosition) + 'px)';
        if (items_to_slideVit === 1) {
            if (!nextElement.nextElementSibling) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
            }
        }
        else if (items_to_slideVit === 2) {
            let nextElementSibling = nextElement.nextElementSibling;
            if (!nextElementSibling) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
            }
            if (nextElementSibling && !nextElementSibling.nextElementSibling) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
            }
        }
        else if (items_to_slide === 3) {
            let nextElementSibling = nextElement.nextElementSibling;
            if (!nextElementSibling) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                return;
            }
            let nextNextElementSibling = nextElementSibling.nextElementSibling;
            if (!nextNextElementSibling) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                return;
            }
            let nextNextNextElementSiblig = nextNextElementSibling.nextElementSibling;
            if (!nextNextNextElementSiblig) {
                carouselInnerVit.parentElement.parentElement.querySelector('.carousel-control-next').classList.add('d-none');
                return;
            }
        }
        return;
    });


});
