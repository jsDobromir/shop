// import Hammer from "hammerjs";

// export default class CustomCarousel {

//     constructor(carouselWrapper, type) {
//         this.carouselWrapper = carouselWrapper;
//         this.type = type;
//         this.container = document.querySelector('.container__prod__cosmetics__mobile');
//         this.carouselInner = document.querySelector(carouselWrapper).querySelector(`.container__prod__${this.type}__mobile__wrapper__inner`);
//         this.carouselItems = Array.from(this.carouselInner.querySelectorAll(`.container__prod__${this.type}__mobile__wrapper__inner__item`));
//         this.itemWidth = this.carouselItems[0].offsetWidth;
//         this.sliderManager = new Hammer.Manager(this.carouselInner);
//         this.items_to_slide = 1;
//         let Pan = new Hammer.Pan({
//             direction: Hammer.DIRECTION_HORIZONTAL,
//             pointers: 1,
//             threshold: 10
//         });
//         this.sliderManager.add(Pan);
//         this.currentPosition = 0;
//         this.attachPanEvents();
//     }

//     attachPanEvents() {
//         this.sliderManager.on('panleft', (event) => {
//             event.preventDefault();
//             if (event.eventType !== Hammer.INPUT_MOVE) return;
//             if (event.pointerType == 'touch' && (Math.abs(event.deltaX) <= Math.abs(event.deltaY) + 5)) return;
//             if (event.srcEvent.type !== 'pointercancel') {
//                 let activeElement = this.carouselInner.querySelector('.active');
//                 let nextElement = activeElement.nextElementSibling || null;
//                 var style = window.getComputedStyle(this.carouselInner);
//                 var matrix = new WebKitCSSMatrix(style.transform);
//                 const currentX = matrix.m41;
//                 const newX = currentX + event.deltaX;

//                 if (nextElement) {
//                     this.carouselInner.style.transform = `translateX(${newX}px)`;
//                 }

//                 if (nextElement) {
//                     let itemX = - (nextElement.offsetLeft - this.container.offsetLeft);
//                     let xPos = - (nextElement.offsetLeft);
//                     if (newX <= itemX && newX < itemX + this.itemWidth) {
//                         activeElement.classList.remove('active');
//                         nextElement.classList.add('active');
//                         this.carouselInner.style.transform = `translateX(${xPos}px)`;
//                         this.sliderManager.stop();
//                         return;
//                     }
//                 }
//             }
//         });
//         this.sliderManager.on('panright', (event) => {
//             event.preventDefault();
//             if (event.eventType !== Hammer.INPUT_MOVE) return;
//             if (event.pointerType == 'touch' && (Math.abs(event.deltaX) <= Math.abs(event.deltaY) + 5)) return;
//             if (event.srcEvent.type !== 'pointercancel') {
//                 let activeElement = this.carouselInner.querySelector('.active');
//                 let prevElement = activeElement.previousElementSibling || null;
//                 var style = window.getComputedStyle(this.carouselInner);
//                 var matrix = new WebKitCSSMatrix(style.transform);
//                 const currentX = matrix.m41;
//                 const newX = currentX + event.deltaX;

//                 if (prevElement) {
//                     this.carouselInner.style.transform = `translateX(${newX}px)`;
//                 }
//                 if (prevElement) {
//                     let itemX = - ((prevElement.offsetLeft) - this.container.offsetLeft);
//                     let xPos = - (prevElement.offsetLeft);
//                     if (newX >= itemX && newX < itemX + this.itemWidth) {
//                         activeElement.classList.remove('active');
//                         prevElement.classList.add('active');
//                         this.carouselInner.style.transform = `translateX(${xPos}px)`;
//                         this.sliderManager.stop();
//                         return;
//                     }
//                 }
//             }
//         });
        
//         this.sliderManager.on('panend', (event) => {
//             var panDirection = event.direction;

//             if (panDirection === Hammer.DIRECTION_LEFT) {
//                 let activeElement = this.carouselInner.querySelector('.active');
//                 let nextElement = activeElement.nextElementSibling || null;
//                 if (nextElement) {
//                     let xPos = - (nextElement.offsetLeft);
//                     activeElement.classList.remove('active');
//                     nextElement.classList.add('active');
//                     this.carouselInner.style.transform = `translateX(${xPos}px)`;
//                     return;
//                 }
//             } else if (panDirection === Hammer.DIRECTION_RIGHT) {
//                 let activeElement = this.carouselInner.querySelector('.active');
//                 let prevElement = activeElement.previousElementSibling || null;
//                 if (prevElement) {
//                     let xPos = - (prevElement.offsetLeft);
//                     activeElement.classList.remove('active');
//                     prevElement.classList.add('active');
//                     this.carouselInner.style.transform = `translateX(${xPos}px)`;
//                     return;
//                 }
//             }
//         })
//     }
// }