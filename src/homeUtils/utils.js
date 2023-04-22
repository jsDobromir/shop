function spaceBetweenRemUtil() {
    const spaceBetweenRem = 1.3; // space between slides in rem
    const spaceBetweenPixels = 10;
    
    const spaceBetweenRemMd = 2;
    const spaceBetweenPixelsMD = 13;

    const spaceBetweenRemLg = 2.4;
    const spaceBetweenPixelsLg = 16;

    const spaceBetweenRemXL = 3;
    const spaceBetweenPixelsXL = 19;

    return {
        spaceBetweenPixels,
        spaceBetweenPixelsMD,
        spaceBetweenPixelsLg,
        spaceBetweenPixelsXL
    }
}

export {spaceBetweenRemUtil};