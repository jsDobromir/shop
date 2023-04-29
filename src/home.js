import {Swiper, Navigation} from 'swiper';
import {spaceBetweenRemUtil} from './homeUtils/utils';

document.addEventListener('DOMContentLoaded', (ev) => {
    Swiper.use([Navigation]);
    let containerComst = document.querySelector('.swiper-container-cosmetics');
    var swiper1 = new Swiper(".swiper-container-cosmetics", {
        slidesPerView: 'auto',
        spaceBetween: spaceBetweenRemUtil().spaceBetweenPixels,
        breakpoints: {
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 'auto'
            },
            992: {
                slidesPerView: 3,
                spaceBetween: spaceBetweenRemUtil().spaceBetweenPixelsMD
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: spaceBetweenRemUtil().spaceBetweenPixelsLg
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: spaceBetweenRemUtil().spaceBetweenPixelsXL
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
                let lzImage = containerComst.querySelector('.lzload');
                if (lzImage) {
                    console.log(lzImage);
                    lzImage.srcset = lzImage.dataset.srcset;
                    lzImage.classList.remove('lzload');
                }
            }
        }
    });
    let containerSupp = document.querySelector('.swiper-container-supplements');
    var swiper2 = new Swiper(".swiper-container-supplements", {
        slidesPerView: 'auto',
        spaceBetween: 10,
        spaceBetween: spaceBetweenRemUtil().spaceBetweenPixels,
        breakpoints: {
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 'auto'
            },
            992: {
                slidesPerView: 3,
                spaceBetween: spaceBetweenRemUtil().spaceBetweenPixelsLg
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: spaceBetweenRemUtil().spaceBetweenPixelsXL
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: spaceBetweenRemUtil().spaceBetweenPixelsXL
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

                let lzImage = containerSupp.querySelector('.lzload');
                if (lzImage) {
                    lzImage.srcset = lzImage.dataset.srcset;
                    lzImage.classList.remove('lzload');
                }
            }
        }
    });

    let containerVit = document.querySelector('.swiper-container-vitamins');
    var swiper3 = new Swiper(".swiper-container-vitamins", {
        slidesPerView: 'auto',
        spaceBetween: 10,
        spaceBetween: spaceBetweenRemUtil().spaceBetweenPixels,
        breakpoints: {
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 'auto'
            },
            992: {
                slidesPerView: 3,
                spaceBetween: spaceBetweenRemUtil().spaceBetweenPixelsLg
            },
            1200: {
                slidesPerView: 'auto'
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: spaceBetweenRemUtil().spaceBetweenPixelsXL
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

                let lzImage = containerVit.querySelector('.lzload');
                if (lzImage) {
                    lzImage.srcset = lzImage.dataset.srcset;
                    lzImage.classList.remove('lzload');
                }
            }
        }
    });

    //lazy load images
    //document.querySelectorAll('.swiper-slide')
    let observerOptions = {
        rootMargin: '0px',
        threshold: 0.01
    }
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let imageLz = entry.target.querySelector('.lzload');
                console.log(entry.target);
                if (imageLz) {
                    imageLz.srcset = imageLz.dataset.srcset;
                    imageLz.classList.remove('lzload');
                    observer.unobserve(entry.target);
                }
            }
        })
    }, observerOptions);
    document.querySelectorAll('.swiper-slide').forEach((slide) => {
        if (slide) {
            observer.observe(slide);
        }
    })    
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
