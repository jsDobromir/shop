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

export { productGalleryHash, initialGalleryHash };