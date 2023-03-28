function getPages(currentPage, totalPages) {
    let maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    const pages = [];

    if (totalPages <= maxPagesToShow) {
        // Show all pages
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Determine the range of pages to show based on the current page
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // Adjust the range if the endPage is too close to the last page
        if (endPage < maxPagesToShow && totalPages > maxPagesToShow) {
            endPage = maxPagesToShow;
            startPage = totalPages - maxPagesToShow + 1;
        }

        // Add ellipses if necessary
        if (startPage > 1) {
            pages.push(1, '...');
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        if (endPage < totalPages) {
            pages.push('...', totalPages);
        }
    }

    return pages;
}

function getPrevNext(currentPage, totalPages) {
    if (currentPage===1) {
        return {prevPage: 1, nextPage: (currentPage+1)};
    }
    if (currentPage===totalPages) {
        return {prevPage: (currentPage-1), nextPage: currentPage}
    }

    return {prevPage: (currentPage-1), nextPage: (currentPage+1)};
}

module.exports = {
    getPages: getPages,
    getPrevNext: getPrevNext
};