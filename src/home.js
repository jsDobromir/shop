import {Swiper, Navigation} from 'swiper';


document.addEventListener('DOMContentLoaded', (ev) => {
    Swiper.use([Navigation]);
    const spaceBetweenRem = 1.3; // space between slides in rem
    const spaceBetweenPixels = parseFloat(getComputedStyle(document.documentElement).fontSize) * spaceBetweenRem;
    
    const spaceBetweenRemMd = 2;
    const spaceBetweenPixelsMD = parseFloat(getComputedStyle(document.documentElement).fontSize) * spaceBetweenRemMd;

    const spaceBetweenRemLg = 2.4;
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
                spaceBetween: spaceBetweenPixelsMD
            },
            1200: {
                slidesPerView: 'auto',
                spaceBetween: spaceBetweenPixelsLg
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: spaceBetweenPixelsXL
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            slideChange: function() {
                if (this.activeIndex > 0) {
                    document.querySelector('.swiper-container-cosmetics .swiper-button-prev').style.opacity = 1;
                }
                if (this.activeIndex===0) {
                    document.querySelector('.swiper-container-cosmetics .swiper-button-prev').style.opacity = 0.5;
                }

                if (this.isEnd) {
                    document.querySelector('.swiper-container-cosmetics .swiper-button-next').style.opacity = 0.5;
                }
                else {
                    document.querySelector('.swiper-container-cosmetics .swiper-button-next').style.opacity = 1;
                }
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
                slidesPerView: 'auto',
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: spaceBetweenPixelsXL
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            slideChange: function() {
                if (this.activeIndex > 0) {
                    document.querySelector('.swiper-container-supplements .swiper-button-prev').style.opacity = 1;
                }
                if (this.activeIndex===0) {
                    document.querySelector('.swiper-container-supplements .swiper-button-prev').style.opacity = 0.5;
                }

                if (this.isEnd) {
                    document.querySelector('.swiper-container-supplements .swiper-button-next').style.opacity = 0.5;
                }
                else {
                    document.querySelector('.swiper-container-supplements .swiper-button-next').style.opacity = 1;
                }
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
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            slideChange: function() {
                if (this.activeIndex > 0) {
                    document.querySelector('.swiper-container-vitamins .swiper-button-prev').style.opacity = 1;
                }
                if (this.activeIndex===0) {
                    document.querySelector('.swiper-container-vitamins .swiper-button-prev').style.opacity = 0.5;
                }

                if (this.isEnd) {
                    document.querySelector('.swiper-container-vitamins .swiper-button-next').style.opacity = 0.5;
                }
                else {
                    document.querySelector('.swiper-container-vitamins .swiper-button-next').style.opacity = 1;
                }
            }
        }
    });

    //checkbox navigation listener
    document.querySelector('.navigation__checkbox').addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            document.body.classList.add('overfHidden');
        }
        else {
            document.body.classList.remove('overfHidden');
        }
    });

});
