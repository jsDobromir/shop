function spaceBetweenRemUtil() {
    const spaceBetweenRem = 1.3; // space between slides in rem
    const spaceBetweenPixels = parseFloat(getComputedStyle(document.documentElement).fontSize) * spaceBetweenRem;
    
    const spaceBetweenRemMd = 2;
    const spaceBetweenPixelsMD = parseFloat(getComputedStyle(document.documentElement).fontSize) * spaceBetweenRemMd;

    const spaceBetweenRemLg = 2.4;
    const spaceBetweenPixelsLg = parseFloat(getComputedStyle(document.documentElement).fontSize) * spaceBetweenRemLg;

    const spaceBetweenRemXL = 3;
    const spaceBetweenPixelsXL = parseFloat(getComputedStyle(document.documentElement).fontSize) * spaceBetweenRemXL;

    return {
        spaceBetweenPixels,
        spaceBetweenPixelsMD,
        spaceBetweenPixelsLg,
        spaceBetweenPixelsXL
    }
}

export {spaceBetweenRemUtil};