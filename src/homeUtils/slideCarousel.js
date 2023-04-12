
export default class slideCarousel {

    constructor(container, type) {
        this.carousel = document.querySelector(`.${container}__wrapper`);
        this.activeElement = this.carousel.querySelector(`.container__prod__${type}__mobile__wrapper__inner__item.active`);
        this.itemWidth = this.carousel.querySelectorAll(`.container__prod__${type}__mobile__wrapper__inner__item`)[0].offsetWidth;
        this.nextLeft = this.activeElement.offsetLeft - this.carousel.offsetLeft;
        this.isDragStart = false;
        this.prevPageX = undefined;
        this.prevScrollLeft = undefined;
        this.positionDiff = undefined;
        this.startX = undefined;
        this.startY = undefined;
        
        //dragstart
        this.carousel.addEventListener('touchstart', (e) => {
            console.log('touch start');
            this.isDragStart = true;
            this.prevPageX = e.touches[0].pageX;
            this.prevScrollLeft = this.carousel.scrollLeft;
            this.startX = (e.touches[0].pageX);
            this.startY = (e.touches[0].pageY);
        });

        //dragging
        this.carousel.addEventListener('touchmove', (e) => {
            if (!this.isDragStart) return;
            const currentX = (e.touches[0].pageX);
            const currentY = (e.touches[0].pageY);
            const diffX = this.startX - currentX;
            const diffY = this.startY - currentY;
            if (Math.abs(diffX) > (Math.abs(diffY) + 5)) {
                e.preventDefault();
                this.carousel.classList.add('dragging');
                this.positionDiff = (e.touches[0].pageX) - this.prevPageX;
                this.carousel.scrollLeft = this.prevScrollLeft - this.positionDiff;
            }
        });
        //dragstop
        this.carousel.addEventListener('touchend', (e) => {
            this.isDragStart = false;
            this.carousel.classList.remove('dragging');
            const endX = e.changedTouches[0].pageX;
            const endY = e.changedTouches[0].pageY;
            const diffX = this.startX - endX;
            const diffY = this.startY - endY;
            if (Math.abs(diffX) > (Math.abs(diffY)+5)) {
                // Only handle horizontal touch events
                // Your code for handling horizontal touch events goes here
                let positionDiffLocal = Math.abs(this.positionDiff);
                if (this.carousel.scrollLeft > this.prevScrollLeft) {
                    let nextElement = this.activeElement.nextSibling;
                    if (nextElement) {
                        if (nextElement.classList.contains('last-item')) {
                            let nextLeft = this.activeElement.offsetLeft - this.carousel.offsetLeft;
                            this.carousel.scrollLeft = nextLeft;
                        }
                        else {
                            if (positionDiffLocal > (this.itemWidth / 3)) {
                                let nextLeft = (nextElement.nextSibling) ? (nextElement.offsetLeft - this.carousel.offsetLeft) : nextElement.offsetLeft;
                                this.carousel.scrollLeft = nextLeft;
                                this.activeElement = nextElement;
                            }
                            else {
                                let nextLeft = this.activeElement.offsetLeft - this.carousel.offsetLeft;
                                this.carousel.scrollLeft = nextLeft;
                            }
                        }
                    }
                }
                else {
                    let prevElement = this.activeElement.previousElementSibling;
                    if (prevElement) {
                        if (positionDiffLocal > (this.itemWidth / 3)) {
                            let prevLeft = prevElement.offsetLeft - this.carousel.offsetLeft;
                            this.carousel.scrollLeft = prevLeft;
                            this.activeElement = prevElement;
                        }
                        else {
                            let prevLeft = this.activeElement.offsetLeft - this.carousel.offsetLeft;
                            this.carousel.scrollLeft = prevLeft;
                        }
                    }

                }
            }
        });
        this.carousel.querySelector('.back').addEventListener('click', (ev) => {
            let firstElem = this.carousel.querySelectorAll(`.container__prod__${type}__mobile__wrapper__inner__item`)[0];
            let firstElemXPos = firstElem.offsetLeft - this.carousel.offsetLeft;
            this.activeElement = firstElem;
            this.carousel.scrollLeft = firstElemXPos;
        });
    }
}