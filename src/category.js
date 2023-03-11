document.addEventListener('DOMContentLoaded', (ev) => {
    
    document.querySelector('.close__icon').addEventListener('click', (ev) => {
        document.querySelector('#filter').checked = false;
    });

});