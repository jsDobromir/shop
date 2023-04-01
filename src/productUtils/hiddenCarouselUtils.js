function productGalleryHash() {
    if (location.hash === '#productGallery') {
        document.body.classList.add('overfHidden');
    }
    else {
        document.body.classList.remove('overfHidden');
    }
}

function initialGalleryHash() {
    let url = new URL(window.location.href);
    if (url.hash === '#productGallery') {
        document.body.classList.add('overfHidden');
    }
}

function scaleListener() {
    // Get all the checkboxes in the carousel
    const checkboxes = document.querySelectorAll('.carousel-item input[type="checkbox"]');

    // Add a click event listener to each checkbox
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', (event) => {
            // Check if the checkbox is checked
            if (event.target.checked) {
                // If it is, find the corresponding carousel image wrapper element
                const carouselImgWrapper = event.target.closest('.carousel_img_wrapper');
                if (carouselImgWrapper) {
                    // Calculate the scroll position to center the element
                    const scrollPosition = carouselImgWrapper.scrollLeft + (carouselImgWrapper.offsetWidth / 2);

                    // Scroll to the center of the element
                    carouselImgWrapper.scrollTo({ left: scrollPosition});
                }
            }
        });
    });
}

export { productGalleryHash, initialGalleryHash, scaleListener };